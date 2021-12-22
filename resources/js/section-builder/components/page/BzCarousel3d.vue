<template>
  <div class="bz-el-carousel-3d-root">
    <carousel-3d
      :display="3"
      :perspective="1"
      :startIndex="startIndex"
      :height="height"
      :width="width"
      :animationSpeed="600"
      :controlsVisible="true"
      :controlsPrevHtml="`<svg style='position:absolute; background-color: #0076df; border-radius: 50%; right: 75px; top: 20px' width='24' height='24' viewBox='0 0 24 24' fill='white'><path d='M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z'/></svg>`"
      :controlsNextHtml="`<svg style='position:absolute; background-color: #0076df; border-radius: 50%; left: 75px; top: 20px' width='24' height='24' viewBox='0 0 24 24' fill='white'><path d='M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'/></svg>`"
      :onMainSlideClick="onMainSlideClick"
    >
      <slide v-for="(categorySection, index) of sections" :key="index" :index="index">
        <div style="pointer-events: none" :style="{ width: width + 'px' }">
          <component :is="categorySection.name" :properties="{ ...categorySection, data: { ...categorySection.data, data: currentSection.data.data } }" :preview="true" />
        </div>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
  name: 'bz-carousel-3d',
  components: {
    Carousel3d,
    Slide
  },
  props: {
    onMainSlideClick: {
      type: Function,
      default: () => {}
    },
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    startIndex: {
      type: Number,
      default: 0
    },
    sections: {
      type: Array,
      default: []
    },
    currentSection: {
      type: Object,
      default: {}
    }
  },
  computed: {
    sectionContentStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-el-carousel-3d-root {
  .section-wrapper {
    pointer-events: none;
    position: relative;
    background-color: rebeccapurple;
    display: flex;
    justify-content: center;
    align-items: center;

    .section-content {
      position: absolute;
    }
  }
}
</style>
