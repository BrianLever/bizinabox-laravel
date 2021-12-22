<template>
  <div class="bz-section-container bz-sect--text-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background">
      <bz-container>
        <div class="col-12 py-0">
          <div class="row" :class="{ 'flex-row-reverse': setting.alignment === 'right' }">
            <div class="col-lg-6">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

                <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

                <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
              </bz-alignment>
            </div>
            <div class="col-lg-6 d-flex align-items-center">
              <bz-card :background-color="backgroundColor" :shadow="setting.layouts.shadow">
                <bz-items :edit="edit" v-model="data.items" :cols="1" category-name="text" :shadow="false">
                  <template slot-scope="{ item, index }">
                    <bz-alignment :alignment="setting.layouts.alignment">
                      <bz-title :edit="edit" v-model="item.title" v-if="setting.listElements.title" :background-color="backgroundColor" />
                      <bz-text :edit="edit" v-model="item.description" v-if="setting.listElements.description" :background-color="backgroundColor" />
                      <div class="d-flex justify-content-end" v-if="setting.listElements.buttons">
                        <bz-button-group :edit="edit" v-model="item.buttons" :background-color="backgroundColor" />
                      </div>
                    </bz-alignment>
                  </template>
                </bz-items>
              </bz-card>
            </div>
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
.bz-sect--text-1-root {
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
