const axios = require('axios')

exports.handler = async function (event) {
  console.log(event)
  const payload = JSON.parse(event.body) // 네트워크로 데이터가 이동할때는 여러가지 문제때문에 문자데이터로 전송하게 되는데 밑에 객체구조분해를 해야되나까 다시 parse해서 객체데이터로 변환해서 사용 
  const { title, type, year, page, id } = payload
  const OMDB_APY_KEY = '7035c60c'
  const url = id // 삼항 연산자로 id값이 있을 경우 앞에 없을경우 뒤에꺼 넣는다
  ? `https://www.omdbapi.com/?apikey=${OMDB_APY_KEY}&i=${id}` // 영화 개별로 요청
  : `https://www.omdbapi.com/?apikey=${OMDB_APY_KEY}&s=${title}&type=${type}&y=${year}&page=${page}` // 전체 영화 검색 정보 요청

  try {
    const { data } = await axios.get(url)
    if (data.Error) {
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
  // return new Promise((resolve, reject) => {
  //   axios.get(url)
  //     .then(res => {
  //       if (res.data.Error) { // 에러가 then에서 실행 될때 예외 처리 해줘야함
  //         reject(res.data.Error)
  //       }
  //       resolve(res)
  //     })
  //     .catch((err) => {
  //       reject(err.message)
  //     })
  // })
}