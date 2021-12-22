<template>
  <div class="bz-section-container bz-sec--product-3-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :background-color="backgroundColor">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="2" :shadow="setting.layouts.shadow" :styles="cardStyle" :reverse="setting.layouts.alignment === 'right'">
          <template slot-scope="{ item, index }">
            <div class="bz-ee-product-image" :style="imageStyle">
              <bz-image
                :edit="edit"
                v-model="data.items[index].image"
                :ratio="aspectRatio"
                v-if="setting.listElements.image"
                :disable-aspect-view="setting.layouts.aspectRatio === 'original'"
                :circle="setting.layouts.aspectRatio === 'circle'"
              />
            </div>
            <div class="bz-ee-product-content">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="backgroundColor" />

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
import BzImage from '../../components/section/BzImage'

export default {
  components: { BzImage, BzButton, BzItems, BzBackground, BzContainer, BzAlignment, BzTitle, BzText, BzSubtitle },
  extends: BzSection,
  name: 'Product3',
  computed: {
    aspectRatio() {
      switch (this.setting.layouts.aspectRatio) {
        case 'portrait': {
          return 3 / 2
        }
        case 'landscape': {
          return 2 / 3
        }
        default: {
          return 1
        }
      }
    },
    cardStyle() {
      if (this.setting.layouts.alignment === 'right') {
        return {
          card: {
            display: 'flex',
            flexDirection: 'row-reverse',
            padding: '30px 20px'
          }
        }
      }
      return {
        card: {
          display: 'flex',
          flexDirection: 'row',
          padding: '30px 20px'
        }
      }
    },
    imageStyle() {
      if (this.setting.layouts.alignment === 'right') {
        return {
          marginLeft: '30px'
        }
      }
      return {
        marginRight: '30px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--product-3-root {
  .bz-ee-product-image {
    width: 30%;
  }
}
</style>
