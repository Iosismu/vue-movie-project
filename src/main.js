import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import loadImage from './plugins/loadImage'

createApp(App)
  .use(router) // $route <use 는 플러그인을 연결할때 사용.>
  .use(store) // $store
  .use(loadImage)
  .mount('#app')