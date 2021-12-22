<template>
  <div class="bz-section-container bz-sec--cover-image-7-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :edit="edit" :background-color="backgroundColor" :shadow="true" />

          <bz-title v-model="data.elements.title" v-if="setting.elements.title" :edit="edit" :background-color="backgroundColor" :shadow="true" style="font-size: 42px" />

          <bz-divider />

          <bz-subtitle v-model="data.elements.description" v-if="setting.elements.description" :edit="edit" :background-color="backgroundColor" :shadow="true" />

          <bz-button-group :edit="edit" v-model="data.elements.buttons" v-if="data.elements.buttons" :background-color="backgroundColor" />
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
import BzSubtitle from '../../components/section/BzSubtitle'
import BzTitle from '../../components/section/BzTitle'
import BzDivider from '../../components/section/BzDivider'
import BzButtonGroup from '../../components/section/BzButtonGroup'

export default {
  extends: BzSection,
  components: { BzButtonGroup, BzDivider, BzTitle, BzSubtitle, BzAlignment, BzContainer, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--cover-image-7-root {
}
</style>
