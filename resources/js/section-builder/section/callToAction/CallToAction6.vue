<template>
  <div class="bz-section-container bz-sec-call-to-action-6-root" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="col-12">
          <div class="row" :class="{ 'flex-row-reverse': setting.alignment === 'right' }">
            <div class="col-lg-6 d-flex align-items-center">
              <div class="image-base">
                <bz-image :edit="edit" :disable-aspect-view="true" v-model="data.elements.image" resize-mode="auto" />
              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center">
              <div class="content" :class="{ [setting.layouts.alignment]: true }">
                <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

                <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

                <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />

                <bz-button-group class="mt-3" :edit="edit" v-model="data.elements.buttons" v-if="setting.elements.buttons" :background-color="backgroundColor" />
              </div>
            </div>
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzSection from '../../components/BzSection'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzButton from '../../components/section/BzButton'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzImage from '../../components/section/BzImage'
export default {
  components: { BzImage, BzButtonGroup, BzButton, BzText, BzSubtitle, BzTitle, BzContainer, BzBackground },
  extends: BzSection
}
</script>
<style lang="scss">
.bz-sec-call-to-action-6-root {
  .image-base {
    border-radius: 10px;
    overflow: hidden;
    transform: rotate3d(0.5, 0.7, 0, 16.4deg) rotateZ(-2deg);
    transform-origin: left bottom;
    transform-style: preserve-3d;
  }

  .content {
    display: flex;
    flex-direction: column;

    &.left {
      align-items: flex-start;
      text-align: left;
    }

    &.center {
      align-items: center;
      text-align: center;
    }

    &.right {
      align-items: flex-end;
      text-align: right;
    }
  }
}
</style>
