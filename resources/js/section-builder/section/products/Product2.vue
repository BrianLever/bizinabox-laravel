<template>
  <div class="bz-section-container bz-sec--product-2-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :background-color="backgroundColor">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="1" :shadow="false">
          <template slot-scope="{ item, index }">
            <div class="bz-fl-product-card" :style="cardAlignmentStyle(index)">
              <div class="bz-ee-product-image" :style="imageStyle(index)">
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
                <bz-alignment :alignment="alignment(index)">
                  <bz-divider :line="true" v-if="setting.listElements.dividerLine" :line-color="theme.primaryColor" width="50" :thickness="2" />

                  <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="backgroundColor" />

                  <bz-text :edit="edit" v-model="data.items[index].description" v-if="setting.listElements.description" :background-color="backgroundColor" />

                  <bz-button :edit="edit" v-model="data.items[index].button" :link="false" :background-color="backgroundColor" />
                </bz-alignment>
              </div>
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
import BzDivider from '../../components/section/BzDivider'

export default {
  components: {
    BzDivider,
    BzImage,
    BzButton,
    BzItems,
    BzBackground,
    BzContainer,
    BzAlignment,
    BzTitle,
    BzText,
    BzSubtitle
  },
  extends: BzSection,
  name: 'Product2',
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
    }
  },
  methods: {
    imageStyle(index) {
      let boxShadow = '0 0 0 0 #00000000'
      let borderRadius = 0

      if (this.setting.layouts.aspectRatio === 'circle') {
        borderRadius = '10000px'
      }

      if (this.setting.layouts.shadow) {
        boxShadow = '0 0 10px 2px #00000034'
      }
      if (this.setting.alignment === 'alternate') {
        if (index % 2) {
          return {
            boxShadow: boxShadow,
            marginLeft: '30px',
            borderRadius
          }
        }
      } else if (this.setting.alignment === 'right') {
        return {
          boxShadow: boxShadow,
          marginLeft: '30px',
          borderRadius
        }
      }
      return {
        boxShadow: boxShadow,
        marginRight: '30px',
        borderRadius
      }
    },
    alignment(index) {
      if (this.setting.alignment === 'alternate') {
        if (index % 2) {
          if (this.setting.layouts.alignment === 'right') {
            return 'left'
          } else if (this.setting.layouts.alignment === 'left') {
            return 'right'
          }
        }
      } else if (this.setting.alignment === 'right') {
        if (this.setting.layouts.alignment === 'left') {
          return 'right'
        }
      }

      return this.setting.layouts.alignment
    },
    cardAlignmentStyle(index) {
      if (this.setting.alignment === 'alternate') {
        if (index % 2) {
          return {
            flexDirection: 'row-reverse'
          }
        }
      } else if (this.setting.alignment === 'right') {
        return {
          flexDirection: 'row-reverse'
        }
      }
      return {
        flexDirection: 'row'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--product-2-root {
  .bz-fl-product-card {
    display: flex;

    .bz-ee-product-image {
      width: 30%;
    }
    .bz-fl-product-card {
      display: flex;
    }
  }
}
</style>
