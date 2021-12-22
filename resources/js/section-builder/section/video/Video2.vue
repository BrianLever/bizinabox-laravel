<template>
  <div class="bz-section-container bz-sec--video-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :size="!setting.layouts.fullPage && sectionSize" :setting="background" :background-color="backgroundColor">
      <bz-container>
        <div class="video-container">
          <bz-video :edit="edit" v-model="data.video" />
        </div>

        <bz-alignment style="margin: 30px 0" :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />

          <bz-button-group :edit="edit" v-model="data.elements.buttons" :background-color="backgroundColor" />
        </bz-alignment>
      </bz-container>
    </bz-background>
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

export default {
  extends: BzSection,
  components: { BzVideo, BzButtonGroup, BzText, BzTitle, BzAlignment, BzContainer, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--video-2-root {
  .fullPage {
    padding-top: 0 !important;
  }

  .video-container {
    height: 250px;
  }

  &.bz-md {
    .video-container {
      height: 350px;
    }
  }

  &.bz-md {
    .video-container {
      height: 450px;
    }
  }
}
</style>
