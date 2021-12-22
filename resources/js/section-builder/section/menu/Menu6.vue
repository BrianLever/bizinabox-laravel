<template>
  <div class="bz-section-container bz-sec--menu-6-root" :class="{ [breakPoint]: true }">
    <bz-background size="m">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="setting.column" :shadow="false" :spacing="false">
          <template slot-scope="{ item, index }">
            <bz-alignment :alignment="setting.layouts.alignment">
              <div class="bz-col-12 py-0">
                <div class="bz-row">
                  <div class="bz-col-6">
                    <bz-text :bold="true" :edit="edit" v-model="item.title" v-if="setting.listElements.title" />
                  </div>
                  <div class="bz-col-6">
                    <bz-text :bold="true" :edit="edit" v-model="item.price" v-if="setting.listElements.price" />
                  </div>
                </div>
              </div>
              <div class="bz-col-12 py-0" v-if="setting.listElements.dividerLine">
                <div class="item-divider-line"></div>
              </div>
              <div class="bz-col-12 py-0">
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
.bz-sec--menu-6-root {
  .item-title-price-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .item-divider-line {
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #555555;
    margin-bottom: 8px;
  }
}
</style>
