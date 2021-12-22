<template>
  <div class="bz-section-container bz-sect--text-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <div class="element-container">
      <bz-section-size :section-size="sectionSize">
        <bz-container>
          <bz-alignment :alignment="setting.layouts.alignment">
            <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="theme.primaryColor" />

            <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="theme.primaryColor" />

            <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="theme.primaryColor" />
          </bz-alignment>
        </bz-container>
      </bz-section-size>
    </div>
    <bz-background :background-color="backgroundColor" :setting="background" class="mt-0 d-flex">
      <div class="card-container">
        <bz-container>
          <bz-card :background-color="backgroundColor" :shadow="setting.layouts.shadow">
            <bz-items :edit="edit" v-model="data.items" :cols="setting.column" category-name="text" :shadow="false">
              <template slot-scope="{ item, index }">
                <div class="w-100 p-2">
                  <bz-title :edit="edit" v-model="item.title" v-if="setting.listElements.title" :background-color="backgroundColor" />
                  <bz-text :edit="edit" v-model="item.description" v-if="setting.listElements.description" :background-color="backgroundColor" />
                  <div class="d-flex justify-content-end" v-if="setting.listElements.buttons">
                    <bz-button-group :edit="edit" v-model="item.buttons" :background-color="backgroundColor" />
                  </div>
                </div>
              </template>
            </bz-items>
          </bz-card>
        </bz-container>
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
import BzSectionSize from '../../components/section/BzSectionSize'
import BzAlignment from '../../components/section/BzAlignment'

export default {
  name: 'Text3',
  extends: BzSection,
  components: {
    BzAlignment,
    BzSectionSize,
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
.bz-sect--text-3-root {
  .element-wrapper {
    padding: 60px;
    min-height: 200px;
  }

  &.bz-sm {
    .element-wrapper {
      padding: 0;
    }
  }

  .element-container {
    background-color: var(--bz-primary-color);
    padding-bottom: 100px;
  }

  .card-container {
    margin-top: -100px;
  }
}
</style>
