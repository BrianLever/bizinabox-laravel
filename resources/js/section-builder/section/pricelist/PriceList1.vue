<template>
  <div class="bz-section-container bz-sec--price-list-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :background-color="backgroundColor">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="setting.column" :shadow="setting.layouts.shadow">
          <template slot-scope="{ item, index }">
            <div class="bz-fl-pricing-card-top">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="theme.primaryColor" />

                <bz-text :edit="edit" :text-color="'#ffffff'" v-model="data.items[index].price" v-if="setting.listElements.price" />

                <bz-text :edit="edit" v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" :background-color="theme.primaryColor" />
              </bz-alignment>
            </div>
            <div class="bz-fl-pricing-card-bottom">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-text :edit="edit" v-model="data.items[index].description" v-if="setting.listElements.description" :background-color="backgroundColor" />

                <bz-button :edit="edit" v-model="data.items[index].button" :link="false" :background-color="backgroundColor" />
              </bz-alignment>
            </div>
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzTitle from '../../components/section/BzTitle'
import BzAlignment from '../../components/section/BzAlignment'
import BzContainer from '../../components/section/BzContainer'
import BzBackground from '../../components/section/BzBackground'
import BzItems from '../../components/section/BzItems'
import BzButton from '../../components/section/BzButton'

export default {
  components: { BzButton, BzItems, BzBackground, BzContainer, BzAlignment, BzTitle, BzText, BzSubtitle },
  extends: BzSection,
  name: 'PriceList1'
}
</script>

<style lang="scss" scoped>
.bz-sec--price-list-root {
  .bz-fl-pricing-card-top {
    padding: 30px 20px;
    background-color: var(--bz-primary-color);
  }
  .bz-fl-pricing-card-bottom {
    padding: 30px 20px;
  }
}
</style>
