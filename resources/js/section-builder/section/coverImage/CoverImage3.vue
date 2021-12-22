<template>
  <div class="bz-section-container bz-sec--cover-image-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <div class="bz-col-12 bz-py-0">
        <div class="bz-row">
          <div class="bz-col-6 bz-p-0">
            <bz-image :edit="edit" :disable-aspect-view="true" :resize-mode="'cover'" :fit-height="true" v-model="data.elements.image" />
          </div>
          <div class="bz-col-6 bz-p-0">
            <bz-background class="bz-h-100" :background-color="theme.primaryColor">
              <bz-divider />
              <bz-divider :line="true" :background-color="theme.primaryColor" />

              <div class="bz-p-lg-2 bz-p-1">
                <bz-text :edit="edit" :background-color="theme.primaryColor" v-model="data.elements.description" />
              </div>

              <bz-divider :line="true" :background-color="theme.primaryColor" />
              <bz-divider />
            </bz-background>
          </div>
        </div>

        <bz-container class="bz-py-10">
          <bz-title :edit="edit" :background-color="backgroundColor" :shadow="true" v-model="data.elements.title" v-if="setting.elements.title" />

          <bz-text :edit="edit" :background-color="backgroundColor" :shadow="true" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

          <bz-divider />

          <div class="bz-flex-center">
            <bz-divider :line="true" :background-color="'#000000'" :style="{ marginRight: setting.elements.buttons ? '20px' : 0 }" />
            <bz-button-group :edit="edit" :background-color="backgroundColor" v-if="setting.elements.buttons" v-model="data.elements.buttons" />
          </div>
        </bz-container>
      </div>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzImage from '../../components/section/BzImage'
import BzDivider from '../../components/section/BzDivider'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzTitle from '../../components/section/BzTitle'
import BzContainer from '../../components/section/BzContainer'
import BzButtonGroup from '../../components/section/BzButtonGroup'

export default {
  extends: BzSection,
  components: { BzButtonGroup, BzContainer, BzTitle, BzText, BzSubtitle, BzDivider, BzImage, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--cover-image-3-root {
}
</style>
