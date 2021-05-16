import { createRouter, createWebHashHistory} from 'vue-router'
import Home from './Home' // .vue 확장자 생략 webpack 설정 해놈
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'


export default createRouter({
  // Hash , History 우리는 Hash 사용.
  // https://google.com/#/search <Hash모드를 사용하는 이유는 페이지 새로고침했을때 페이지 없다 를 방지 할 수 있다>
  // History 모드는 기본적으로 서버에다가 세팅 해야됨.
  history: createWebHashHistory(),
  scrollBehavior() { // 항상 스크롤 맨위로 돌아감
    return { top: 0 }
  },
  // pages
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:pathMatch(.*)', // 위 경로를 제외한 나머지 페이지들을 NotFound페이지로 이동 시킨다.
      component: NotFound
    }
  ]
})