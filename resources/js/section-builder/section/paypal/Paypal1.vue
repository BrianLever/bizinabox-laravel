<template>
  <div class="bz-section-container bz-sec--sectionName-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :background-color="backgroundColor">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />

          <bz-button :edit="edit" v-model="data.elements.button" v-if="setting.paypal.cartButton" :link="false" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="setting.column" :shadow="setting.layouts.shadow" :styles="cardStyles">
          <template slot-scope="{ item, index }">
            <bz-image :edit="edit" :ratio="1 / 2" v-model="data.items[index].image" v-if="setting.listElements.image" :styles="{ root: imageStyle }" />

            <div class="w-100 card-body">
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
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzAlignment from '../../components/section/BzAlignment'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzImage from '../../components/section/BzImage'
import BzButton from '../../components/section/BzButton'

export default {
  components: { BzButton, BzImage, BzItems, BzText, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground },
  extends: BzSection,
  name: 'Paypal1',
  computed: {
    imageStyle() {
      return {
        clipPath: 'ellipse(100% 90% at 50% 10%)'
      }
    },
    cardBackgroundColor() {
      let originalColor = tinycolor(this.backgroundColor)
      return originalColor.brighten(2).toString()
    }
  },
  methods: {
    cardStyles(index) {
      return {
        card: {
          backgroundColor: this.cardBackgroundColor,
          borderRadius: '10px',
          overflow: 'hidden'
        }
      }
    }
  }
}
</script>

<style scoped></style>
