import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'


const _defaultMessage = 'Search for the movie title!!'

export default {
  // module
  namespaced: true,
  // data, store에서는 data를 state라고 부른다.
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  // computed
  // getters: {
  //   movieIds(state) {
  //     return state.movies.map(m => m.imdbID)
  //   }
  // },
  // methods
  // 변이, mutations안에서만 state(data)를 변경할 수 있다.
  mutations: {
    updateState(state, payload) { // state(data)들을 갱신 해주는 로직
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
        state[key] = payload[key]
      }) // Object.keys는 객체데이터 들의 이름가지고 새로운 배열데이터 만들어줌
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },
  // 비동기 처리, actions안에서는 async,await를 붙이지 않아도 비동기 처리 된다.
  actions: {
    async searchMovies({ state, commit }, payload) { // 매개변수로 context가 올 수있는데 그러면 매번 context.state context.commit을 개속 붙여줘야한다. 그래서 state, commit이라는 이름으로 구조분해해서 사용
      if (state.loading) return // 함수 내부에서 return === 함수 종료되고 아래쪽 코드는 실행 안됨
      

      commit('updateState', { // 변이 상태
        message: '',
        loading: true
      })
      
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID'),
        })
        console.log(totalResults) // 272 => 1번에 10개니까 28번
        console.log(typeof totalResults) // string
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10) // 올림처리 왜냐하면 272 / 10 => 27.2 우리는 28번 해야되서 
  
        // 추가 요청 전송!!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {                                                          
            if (page > (payload.number / 10)) break
            const res = await _fetchMovie({
              ...payload,
              page: page
            })// 추가요청은 page 바뀌는값으로
            const { Search } = res.data
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')] // 새로운 데이터가 들어오면 덮어쓰기말고 추가 되는 로직
            })
          }
        }
      } catch ({ message }) { // state변경 메소드를 이용해서 전체 컴포넌트로 에러 메시지를 가져 갈 수 있고 화면에 뿌린다.
        commit('updateState', {
          movies: [], // 에러가 나면 초기화
          message: message // 같은 이름이면 생략가능
        })
      } finally { // 로딩 spinner가 돌고 검색이 끝나면 없어져야 하니까 finally로 loading을 false로 지정
        commit('updateState', {
          loading: false
        })
      }
    },

    async searchMovieWithId({ state, commit }, payload) { // 매개변수로 context가 올 수있는데 그러면 매번 context.state context.commit을 개속 붙여줘야한다. 그래서 state, commit이라는 이름으로 구조분해해서 사용
      if (state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true
      })

      try {
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

async function _fetchMovie(payload) { // fetchMovie가 복잡해 질 수록 반대로 재활용성이 올라간다.
  return await axios.post('/.netlify/functions/movie', payload) // Serverless 함수로 post로 요청
  // get은 쿼리스트링으로 요청을하게 되면 풀어서 하나하나 넣어야되서 되게 불편함 그래서 post
}

