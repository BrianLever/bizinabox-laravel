<template>
  <div class="bz-section-container bz-sect--section3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background">
      <div class="p-4">
        <bz-items :edit="edit" v-model="data.items" :cols="2" :shadow="false" :spacing="20">
          <template slot-scope="{ item, index }">
            <div class="p-3">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title :edit="edit" v-model="item.title" v-if="setting.listElements.title" :background-color="backgroundColor" />
                <bz-text :edit="edit" v-model="item.description" v-if="setting.listElements.description" :background-color="backgroundColor" />
                <div class="d-flex justify-content-end" v-if="setting.listElements.buttons">
                  <bz-button-group :edit="edit" v-model="item.buttons" :background-color="backgroundColor" />
                </div>
              </bz-alignment>
            </div>
          </template>
        </bz-items>
      </div>
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
