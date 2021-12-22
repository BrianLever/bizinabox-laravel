<template>
  <div class="bz-section-container bz-sect--section3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="col-12">
          <bz-alignment :alignment="setting.layouts.alignment">
            <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

            <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

            <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />

            <bz-button-group class="mt-3" :edit="edit" v-model="data.elements.buttons" v-if="setting.elements.buttons" :background-color="backgroundColor" />
          </bz-alignment>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzTitle from '../../components/section/BzTitle'
import BzCard from '../../components/section/BzCard'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzAlignment from '../../components/section/BzAlignment'

export default {
  name: 'Text1',
  extends: BzSection,
  components: {
    BzAlignment,
    BzButtonGroup,
    BzSubtitle,
    BzItems,
    BzText,
    BzContainer,
    BzBackground,
    BzCard,
    BzTitle
  }
}
</script>
<style lang="scss" scoped>
.bz-sect--section3-root {
  .element-wrapper {
    padding: 60px;
    min-height: 200px;
  }

  &.bz-sm {
    .element-wrapper {
      padding: 0;
    }
  }
}
</style>
