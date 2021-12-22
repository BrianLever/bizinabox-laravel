<template>
  <div class="bz-section-container bz-sec--menu-5-root" :class="{ [breakPoint]: true }">
    <bz-background size="m">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="setting.column" :shadow="false" :spacing="false">
          <template slot-scope="{ item, index }">
            <bz-alignment :alignment="setting.layouts.alignment">
              <div class="bz-col-8 py-0">
                <div class="item-title-price-wrapper">
                  <bz-text :bold="true" :edit="edit" v-model="item.title" v-if="setting.listElements.title" :size="'1.1em'" />

                  <div class="horizontal-bar" v-if="setting.column < 3"></div>

                  <bz-text :bold="true" :edit="edit" v-model="item.price" v-if="setting.listElements.price" />
                </div>
              </div>
              <div class="bz-col-8 py-0">
                <bz-text :edit="edit" v-model="item.subtitle" v-if="setting.listElements.description" />
              </div>
            </bz-alignment>
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzAlignment from '../../components/section/BzAlignment'
import BzText from '../../components/section/BzText'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzItems from '../../components/section/BzItems'
import BzDivider from '../../components/section/BzDivider'

export default {
  components: { BzDivider, BzItems, BzSubtitle, BzTitle, BzText, BzAlignment, BzContainer, BzBackground },
  extends: BzSection,
  name: 'Menu5'
}
</script>

<style lang="scss" scoped>
.bz-sec--menu-5-root {
  .item-title-price-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .horizontal-bar {
    flex-grow: 1;
    height: 1px;
    margin: 0 10px 8px 10px;
    background-color: #555555;
  }
}
</style>
