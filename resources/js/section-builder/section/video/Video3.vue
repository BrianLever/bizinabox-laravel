<template>
  <div class="bz-section-container bz-sec--video-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :size="sectionSize" :setting="background" :background-color="backgroundColor">
      <bz-container>
        <div class="elements-container">
          <div class="video-container" :class="setting.alignment">
            <bz-video :edit="edit" v-model="data.video" />
          </div>
          <div class="elements-wrapper" :class="setting.alignment">
            <div class="bz-elements" :class="setting.alignment">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="theme.primaryColor" />

                <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="theme.primaryColor" />

                <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="theme.primaryColor" />

                <bz-button-group :edit="edit" v-model="data.elements.buttons" :button-color="this.theme.secondaryColor" />
              </bz-alignment>
            </div>
          </div>
        </div>
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
.bz-sec--video-3-root {
  .video-container {
    width: 100%;

    &.right {
      right: 0;
    }
  }

  .elements-container {
    position: relative;
    height: 300px;

    .elements-wrapper {
      width: 100%;
      background-color: var(--bz-primary-color);
      display: inline-block;

      .bz-elements {
        width: 100%;
        padding: 30px;
        &.left {
          margin-left: auto;
        }
      }
    }
  }

  &.bz-md {
    .elements-container {
      height: 350px;

      .elements-wrapper {
        width: calc(100% - 50px);
        height: calc(100% - 50px);
        margin-top: 50px;
        background-color: var(--bz-primary-color);
        display: inline-block;

        &.left {
          margin-left: 50px;
        }

        &.right {
          margin-right: 50px;
        }

        .bz-elements {
          width: 50%;
        }
      }
    }

    .video-container {
      position: absolute;
      width: 50%;
      height: 80%;
    }
  }

  &.bz-lg {
    .elements-container {
      height: 400px;
    }
  }
}
</style>
