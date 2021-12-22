<template>
  <div class="bz-section-container bz-sect--section3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="bz-row" :class="{ 'flex-row-reverse': setting.alignment === 'right' }">
          <div class="bz-col-lg-8">
            <div :style="subtitleStyle">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

                <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />

                <bz-button-group class="mt-3" :edit="edit" v-model="data.elements.buttons" v-if="setting.elements.buttons" :background-color="backgroundColor" />
              </bz-alignment>
            </div>
          </div>
          <div class="bz-col-lg-4">
            <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />
          </div>
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
  name: 'Text7',
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
  },
  computed: {
    subtitleStyle() {
      if (this.sectionWidth > 600) {
        if (this.setting.alignment === 'left') {
          return {
            borderRight: 'solid 1px #8080807f',
            paddingRight: '50px'
          }
        }
        return {
          borderLeft: 'solid 1px #8080807f',
          paddingLeft: '50px'
        }
      }
    }
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
