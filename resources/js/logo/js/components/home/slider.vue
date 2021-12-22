<template>
  <div class="home-slider-wrapper">
    <!-- Swiper -->
    <div class="home-slider swiper-container">
      <!-- Pagination -->
      <div class="pagination"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="/images/slider/1.png" class="img-responsive workflow-img" alt="workflow" />
        </div>
        <div class="swiper-slide">
          <img src="/images/slider/2.png" class="img-responsive workflow-img" alt="workflow" />
        </div>
        <div class="swiper-slide">
          <img src="/images/slider/3.png" class="img-responsive workflow-img" alt="workflow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import appMixin from '../../mixins/app-mixin'

export default {
  name: 'home-slider',

  mixins: [appMixin],

  data() {
    return {
      swiper: {},
      sliderContent: {
        0: {
          index: 1,
          title: 'Choose',
          description: 'the logo you like'
        },
        1: {
          index: 2,
          title: 'Edit',
          description: 'your logo'
        },
        2: {
          index: 3,
          title: 'Download',
          description: 'free or get premium'
        }
      }
    }
  },

  mounted() {
    this.init()

    // @TODO Temporary redirect to choose logo
    let slides = document.getElementsByClassName('swiper-slide')

    Array.from(slides).forEach((slide) => {
      slide.addEventListener('click', () => {
        this.goTo(this.routes.chooseLogo)
      })
    })
  },

  methods: {
    init() {
      this.swiper = new Swiper('.home-slider', {
        speed: 400,
        slidesPerView: 1,
        effect: 'cube',
        cubeEffect: {
          slideShadows: false,
          shadow: false
        },
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: '.pagination',
          type: 'bullets',
          clickable: true,
          renderBullet: (index, className) => {
            let content = this.sliderContent[index]

            return (
              '<div class="pagination__item ' +
              className +
              '" >' +
              '<div class="pagination__line">' +
              '</div>' +
              '<div class="pagination__index">' +
              content.index +
              '</div>' +
              '<div class="pagination__title">' +
              content.title +
              '</div>' +
              '<div class="pagination__description">' +
              content.description +
              '</div>' +
              '</div>'
            )
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.content-home-page .home-slider-wrapper .home-slider {
  position: relative;
}

.content-home-page {
  .swiper-wrapper {
    @media (max-width: 767px) {
      align-items: center;
    }
  }

  .home-slider-wrapper .home-slider .swiper-pagination-bullet {
    width: 100%;
    height: auto;
    line-height: initial;
    position: relative;
    padding: 40px 0 28px;
    margin: 0 0 80px;
    background: transparent;
    border-radius: 0;
    z-index: 14;
    color: #808080;

    @media (max-width: 767px) {
      margin: 0 0 32px;
      padding: 12px;
    }
  }

  .home-slider-wrapper .home-slider .swiper-pagination-bullet:last-child {
    .pagination__line {
      display: none;
    }
  }

  .home-slider-wrapper .home-slider .swiper-pagination-bullet-active {
    color: #808080;

    .pagination__title {
      font-weight: bold;
      color: #3a58f9;
    }

    .pagination__index {
      opacity: 0.4;
    }
  }

  .home-slider-wrapper .home-slider .swiper-pagination-bullet-active:before {
    border: 2px solid #3a58f9;
    background: #3a58f9;
    box-shadow: 0 0 8px 1px rgba(59, 89, 250, 0.6);
  }

  .home-slider-wrapper .home-slider .swiper-pagination-bullet-active:after {
    content: '';
    width: 14px;
    height: 14px;
    position: absolute;
    left: 0;
    bottom: 3px;
    right: 0;
    margin: auto;
    border-radius: 50px;
    border: 1.5px solid #fff;
    display: block;
  }
}

.home-slider-wrapper {
  .pagination {
    width: 80px;
    text-align: center;
    display: block;
    position: absolute;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    height: fit-content;
    margin: auto;

    @media (min-width: 768px) {
      left: -132px;
      width: 132px;
    }

    &__line {
      width: 2px;
      height: 80px;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin: auto;
      background: #a3dcff;
      display: block;

      @media (max-width: 767px) {
        height: 48px;
      }
    }

    &__index {
      position: absolute;
      top: 16px;
      left: 0;
      right: 0;
      font-size: 80px;
      line-height: 80px;
      color: #3a58f9;
      opacity: 0.1;
      margin: auto;

      @media (max-width: 1280px) {
        font-size: 64px;
        line-height: 64px;
      }

      @media (max-width: 768px) {
        font-size: 48px;
        line-height: 48px;
        display: none;
      }
    }

    &__title {
      color: #a3dcff;
      font-size: 20px;

      @media (max-width: 1280px) {
        font-size: 16px;
      }

      @media (max-width: 767px) {
        font-size: 12px;
        display: none;
      }
    }

    &__description {
      font-size: 16px;
      font-weight: 300;

      @media (max-width: 1280px) {
        font-size: 14px;
      }

      @media (max-width: 767px) {
        font-size: 10px;
        display: none;
      }
    }

    &__item {
      $self: &;

      &:before {
        content: '';
        width: 20px;
        height: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border-radius: 50px;
        border: 2px solid #a3dcff;
        display: block;
        background: #fff;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .workflow-img {
    max-width: 100%;
    height: auto;

    @media (max-width: 767px) {
      max-height: 280px;
      width: auto;
    }
  }

  .home-slider {
    width: 100%;
    height: 100%;

    .swiper-slide {
      width: 650px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .swiper-pagination-bullet {
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      color: #000;
      opacity: 1;
      background: rgba(0, 0, 0, 0.2);
    }

    .swiper-pagination-bullet-active {
      color: #fff;
      background: #007aff;
    }
  }

  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
  width: 100%;
  align-items: center;

  @media (min-width: 768px) {
    height: 100%;
    width: calc(100% - 360px);
    padding: 60px 15px 0 160px;
  }

  @media (min-width: 992px) {
    width: 50%;
  }

  @media (min-width: 1280px) {
    padding: 0 15px 0 132px;
  }
}
</style>
