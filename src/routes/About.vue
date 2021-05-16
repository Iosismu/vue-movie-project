<template>
  <div class="about">
    <div class="photo">
      <Loader 
        v-if="imageLoading"
        absolute />
      <img
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex' 
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    ...mapState('about', [
      'image',  // 다른 곳에서 사용할 떄는 그냥 this.image로 사용하면된다.
      'name',
      'blog',
      'phone'
    ]),
  },
  mounted() { // 라이프 사이클에서는 비동기 처리가 않되니 별도로 init을 비동기 처리하고 mounted에서 실행만 해준다.
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .about {
    text-align: center;
    .photo {
      width: 250px;
      height: 250px;
      margin: 40px auto 20px;
      padding: 30px;
      border: 10px solid pink;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: $gray-200;
      overflow: hidden;
      position: relative;
      img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        border-radius: 20%;
      }
    }
    .name {
      font-size: 40px;
      font-display: "Oswald", sans-serif;
      margin-bottom: 20px;
    }
  }
</style>