<template>
  <div class="bz-section-container bz-sec--cover-image-5-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="bz-col-12">
          <div class="bz-row" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
            <div class="bz-col-lg-6 bz-column-center">
              <bz-subtitle v-if="setting.elements.subtitle" v-model="data.elements.subtitle" :background-color="backgroundColor" :edit="edit" />

              <bz-title v-if="setting.elements.title" v-model="data.elements.title" :background-color="backgroundColor" :edit="edit" />

              <bz-divider />

              <bz-subtitle v-if="setting.elements.description" v-model="data.elements.description" :background-color="backgroundColor" :edit="edit" />

              <bz-button-group :edit="edit" v-model="data.elements.buttons" v-if="setting.elements.buttons" />
            </div>
            <div class="bz-col-lg-6">
              <bz-image :edit="edit" :ratio="2 / 3" v-model="data.elements.image" v-if="setting.elements.image" />
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
import BzImage from '../../components/section/BzImage'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzTitle from '../../components/section/BzTitle'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzDivider from '../../components/section/BzDivider'

export default {
  extends: BzSection,
  components: { BzDivider, BzButtonGroup, BzTitle, BzSubtitle, BzImage, BzContainer, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--cover-image-5-root {
}
</style>
