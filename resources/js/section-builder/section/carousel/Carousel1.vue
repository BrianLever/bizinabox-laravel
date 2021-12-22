<template>
  <div
    class="bz-section-container bz-sec--carousel-1-root"
    :class="{ [breakPoint]: true, full: setting.layouts.fullSize, [sectionSize]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :background-color="backgroundColor" :setting="background">
      <carousel :perPage="1" :autoplay="setting.elements.autoPlay" :speed="500" :pagination-enabled="setting.elements.navigation" :paginationPadding="10" :paginationSize="20">
        <slide v-for="(item, key) of data.items" :data-index="key" :key="key" data-name="slide-name" @slideclick="handleSlideClick">
          <div class="carousel-item">
            <div class="add-remove-items" v-if="edit">
              <div class="add-slider-button" :class="{ disabled: data.items.length >= 7 }" @click="addItem(key)">Add slide</div>
              <div class="remove-slider-button" :class="{ disabled: data.items.length <= 2 }" @click="removeItem(key)">Remove slide</div>
            </div>
            <div class="image-wrapper">
              <bz-image v-model="item.image" :disable-aspect-view="true" resize-mode="full" :edit="edit" />
            </div>

            <div class="text-elements-wrapper">
              <bz-container>
                <bz-alignment :alignment="setting.layouts.alignment">
                  <bz-title :edit="edit" v-model="data.items[key].title" v-if="setting.listElements.title" :background-color="backgroundColor" />

                  <bz-subtitle :edit="edit" v-model="data.items[key].subtitle" v-if="setting.listElements.subtitle" :background-color="backgroundColor" />

                  <bz-text :edit="edit" v-model="data.items[key].description" v-if="setting.listElements.description" :background-color="backgroundColor" />

                  <bz-button-group :edit="edit" v-model="data.items[key].buttons" :background-color="backgroundColor" />
                </bz-alignment>
              </bz-container>
            </div>
          </div>
        </slide>
      </carousel>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import { Carousel, Slide } from 'vue-carousel'
import BzImage from '../../components/section/BzImage'
import BzText from '../../components/section/BzText'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzContainer from '../../components/section/BzContainer'
import BzAlignment from '../../components/section/BzAlignment'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzBackground from '../../components/section/BzBackground'

export default {
  extends: BzSection,
  components: {
    BzBackground,
    BzButtonGroup,
    BzAlignment,
    BzContainer,
    BzSubtitle,
    BzTitle,
    BzText,
    BzImage,
    Carousel,
    Slide
  },
  methods: {
    handleSlideClick() {},
    addItem(index) {
      if (this.data.items.length < 7) {
        this.data.items.insert(index, this.data.items[getRandomInt(this.data.items.length - 1)])
        this.data = _copy(this.data)
      }
    },
    removeItem(index) {
      if (this.data.items.length > 2) {
        this.data.items.splice(index, 1)
        this.data = _copy(this.data)
      }
    }
  }
}
</script>
<style lang="scss">
.bz-sec--carousel-1-root {
  height: 70vh;
  position: relative;

  &.s {
    height: calc(70vh - 20px);
  }

  &.l {
    height: calc(70vh + 20px);
  }

  &.xl {
    height: calc(70vh + 40px);
  }

  .add-remove-items {
    position: absolute;
    left: 10px;
    top: 10px;
    height: 28px;
    background-color: white;
    z-index: 4;
    display: flex;
    color: white;
    border-radius: 50%;
    font-weight: 400;
    font-size: 12px;

    .add-slider-button,
    .remove-slider-button {
      background-color: var(--bz-section-edit-active-color);
      display: flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      text-align: center;
      padding: 0 10px;
      cursor: pointer;

      &.disabled {
        background-color: #808080;
        cursor: not-allowed;
      }

      &:hover:not(.disabled) {
        background-color: var(--bz-section-edit-active-hover-color);
      }
    }
    .add-slider-button {
      margin-right: 1px;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
    }

    .remove-slider-button {
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
    }
  }

  .bz-el--image-root .image-wrapper .tool-bar {
    top: 20px !important;
  }

  &.full {
    height: 100vh;
  }

  .VueCarousel {
    height: 100%;
    .VueCarousel-wrapper {
      height: 100%;
      .VueCarousel-inner {
        height: 100% !important;
      }
    }
  }

  [class*='VueCarousel-pagination'] {
    position: absolute !important;
    bottom: 0 !important;
  }

  .carousel-item {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .image-wrapper {
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .text-elements-wrapper {
      position: absolute;
      width: 100%;
      height: max-content;
      z-index: 2;
    }
  }
}
</style>
