<template>
  <div class="bz-section-container bz-sec--cover-image-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-subtitle :edit="edit" :background-color="backgroundColor" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />
          <bz-title :edit="edit" :background-color="backgroundColor" v-model="data.elements.title" v-if="setting.elements.title" />
          <bz-subtitle :edit="edit" :background-color="backgroundColor" v-model="data.elements.description" v-if="setting.elements.description" />

          <bz-button-group :edit="edit" :background-color="backgroundColor" v-model="data.elements.buttons" v-if="setting.elements.buttons" />
        </bz-alignment>

        <bz-divider />

        <bz-image :edit="edit" v-model="data.elements.image" :ratio="2 / 5" v-if="setting.elements.image" />
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzTitle from '../../components/section/BzTitle'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzImage from '../../components/section/BzImage'
import BzAlignment from '../../components/section/BzAlignment'
import BzDivider from '../../components/section/BzDivider'

export default {
  extends: BzSection,
  components: { BzDivider, BzAlignment, BzImage, BzButtonGroup, BzTitle, BzText, BzSubtitle, BzContainer, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--cover-image-2-root {
}
</style>
