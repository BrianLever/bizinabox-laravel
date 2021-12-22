<template>
  <div class="bz-section-container bz-sec-call-to-action-3-root" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-card :background-color="'#ffffff'" :padding="0">
          <div class="col-12">
            <div class="row" :class="{ 'flex-row-reverse': setting.alignment === 'right' }">
              <div class="col-lg-6 p-0">
                <bz-image v-model="data.elements.image" :ratio="2 / 3" />
              </div>
              <div class="col-lg-6 d-flex align-items-center">
                <div class="content" :class="{ [setting.layouts.alignment]: true }">
                  <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="'#ffffff'" />

                  <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="'#ffffff'" />

                  <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="'#ffffff'" />

                  <bz-button-group class="mt-3" :edit="edit" v-model="data.elements.buttons" v-if="setting.elements.buttons" :background-color="'#ffffff'" />
                </div>
              </div>
            </div>
          </div>
        </bz-card>
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
import BzCard from '../../components/section/BzCard'
import BzImage from '../../components/section/BzImage'
export default {
  components: {
    BzImage,
    BzCard,
    BzButtonGroup,
    BzButton,
    BzText,
    BzSubtitle,
    BzTitle,
    BzContainer,
    BzBackground
  },
  extends: BzSection
}
</script>
<style lang="scss">
.bz-sec-call-to-action-3-root {
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.left {
      align-items: flex-start;
      text-align: left;
    }

    &.center {
      align-items: center;
      text-align: center;
    }

    &.right {
      text-align: right;
      align-items: flex-end;
    }
  }
}
</style>
