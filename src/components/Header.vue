<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image2"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
                {
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/
        },
                {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'image2', // 다른 곳에서 사용할 떄는 그냥 this.image로 사용하면된다.
      'name'
    ]),
    ...mapState('movie', [
      'movies',
      'loading',
      'message',
      'theMovie'
    ])
  },
  methods: {
    isMatch(path) {
      if (!path) return false
      console.log(this.$route)
      return path.test(this.$route.fullPath) // test메소드를 통해서 route에서 주는 path와 path에 지정해논 값이 같으면 true
    },
    toAbout() {
      console.log("!!!")
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo {
      margin-right: 40px;
    }
    .user {
      width: 40px;
      height: 40px;
      padding: 6px;
      border-radius: 50%;
      box-sizing: border-box; // padding이 추가된 만큼 요소가 커지지 않게
      background-color: pink;
      cursor: pointer;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      margin: auto;
      transition: .4s;
      overflow: hidden;
      &:hover {
        background-color: darken(pink, 10%);
      }
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    @include media-breakpoint-down(sm) { // 보고있는 Viewport(웹사이트)의 크기가 sm보다 작을 경우 안에 선택자 실행
      .nav {
        display: none;
      }
    }
  }
</style>