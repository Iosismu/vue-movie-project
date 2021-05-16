<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader
        :size="3"
        :z-index="9"
        fixed />
    </template>
    <div
      v-else
      class="movie-details">
      <div
        :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})`}"
        class="poster">
        <Loader 
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div
              v-for="{ Source: name, Value: score } in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <img
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
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
    ...mapState('movie', [
      'theMovie',
      'loading'
    ])
  },
  created()  {
    console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithId', {
      // movie/tt12345
      id: this.$route.params.id // url로 id(route > index.js에서 '/movie/:id' :id값을 가져온다.) 값을 넘겨 준다 > store의 searchMovieWithId action 으로
    })
  },
  methods: {
    requestDiffSizeImage(url, size = 700) {
      const src = url.replace('SX300', `SX${size}`)
      if (!url || url === 'N/A') {
        this.imageLoading = false
        return ''
      } 
      this.$loadImage(src) // async await를 사용하면 저 코드가 끝날떄까지 기다려야하는데 쓰지 못한다. 
        .then(() => {
          this.imageLoading = false 
        })
      return src // 여기 return은 별개로 처리해야하니까 then
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 40px;
  

  .skeletons {
    display: flex;
    .poster {
      flex-shrink: 0; // 감소 너비는 사용하지 않겠다. 그래서 포스터가 찌그러지지 않게
      width: 500px;
      height: 500px * 3 / 2;
      margin-right: 70px;
    }
    .specs {
      flex-grow: 1;
    }
    .skeleton { // .poster도 skeleton을 가지고 있어서 내부에 넣지 않는다.
      border-radius: 10px;
      background-color: $gray-200;
      &.title {
        width: 80%;
        height: 70px;
      }
      &.spec {
        width: 60%;
        height: 30px;
        margin-top: 20px;
      }
      &.plot {
        width: 100%;
        height: 250px;
        margin-top: 20px;
      }
      &.etc {
        width: 50%;
        height: 50px;
        margin-top: 20px;
      }
    }
  }
  .movie-details {
    display: flex;
    color: $gray-600;
    .poster {
      flex-shrink: 0;
      width: 500px;
      height: 500px * 3 / 2;
      margin-right: 70px;
      border-radius: 10px;
      background-color: $gray-200;
      background-size: cover; // width, height중에 저 넣은 너비에 마춘다.
      background-position: center;
      position: relative;
    }
    .specs {
      flex-grow: 1;
      .title {
        color: $black;
        font-family: 'Oswald', sans-serif;
        font-size: 70px;
        line-height: 1; // 1배로 설정해서 글자크기에 맞게만 줄 높이 설정
        margin-bottom: 30px;
      }
      .labels {
        color: $primary;
        span {
          &::after {
            content: "\00b7";
            margin: 0 6px;
          }
          &:last-child::after {
            display: none;
          }
        }
      }
      .plot {
        margin-top: 20px;
      }
      .ratings {
        .rating-wrap {
          display: flex;
          .rating {
            display: flex;
            align-items: center;
            margin-right: 32px;
            img {
              height: 30px;
              flex-shrink: 0;
              margin-right: 6px;
            }
          }
        }
      }
      h3 {
        margin: 24px 0 6px;
        color: $black;
        font-family: 'Oswald', sans-serif;
        font-size: 20px;
      }
    }
    @include media-breakpoint-down(xl) {
      .poster {
        width: 300px;
        height: 300px * 3 / 2;
        margin-right: 40px;
      }
    }
    @include media-breakpoint-down(lg) {
      display: block;
      .poster {
        margin-bottom: 40px;
      }
    }
    @include media-breakpoint-down(md) {
      .specs {
        .title {
          font-size: 50px;
        }
        .ratings {
          .rating-wrap {
            display: block;
            .rating {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>