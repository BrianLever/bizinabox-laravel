<template>
  <div class="bz-section-container bz-sec--video-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <div class="position-relative video-container">
      <div class="element-container" :class="setting.alignment">
        <div class="bz-video-elements">
          <bz-alignment :alignment="setting.layouts.alignment">
            <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="'#ffffff'" />

            <bz-divider :line="true" :thickness="2" :height="30" :width="80" line-color="#ffffff" v-if="setting.elements.dividerLine" />

            <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :text-color="'#ffffff'" />

            <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :text-color="'#ffffff'" />

            <bz-button-group :edit="edit" v-model="data.elements.buttons" :background-color="backgroundColor" />
          </bz-alignment>
        </div>
      </div>
      <bz-video :edit="edit" v-model="data.video" />
    </div>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzAlignment from '../../components/section/BzAlignment'
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzVideo from '../../components/section/BzVideo'
import BzDivider from '../../components/section/BzDivider'

export default {
  extends: BzSection,
  components: { BzDivider, BzVideo, BzButtonGroup, BzText, BzTitle, BzAlignment, BzContainer, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--video-1-root {
  .video-container {
    width: 100%;
    height: 250px;
    z-index: 1;

    .element-container {
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: center;
      width: 40%;
      height: 100%;
      right: auto;
      left: 5%;

      &.right {
        right: 5%;
        left: auto;
      }

      .bz-video-elements {
        width: 100%;
        pointer-events: auto;
      }
    }
  }

  &.bz-md {
    .video-container {
      height: 400px;
    }
  }

  &.bz-lg {
    .video-container {
      height: 600px;
    }
  }
}
</style>
