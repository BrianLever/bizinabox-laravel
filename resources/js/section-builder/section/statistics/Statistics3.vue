<template>
  <div class="bz-section-container bz-sec--statistic-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :size="sectionSize" :setting="background" :background-color="backgroundColor">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />
          <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" text-color="#ffffff" />
          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" text-color="#ffffff" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :shadow="false" :cols="setting.column">
          <template slot-scope="{ item, index }">
            <div class="bz-item-container">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-text
                  :bold="true"
                  :edit="edit"
                  v-if="setting.listElements.value"
                  v-model="data.items[index].value"
                  :background-color="backgroundColor"
                  text-color="#ffffff"
                  :size="valueSize"
                  :shadow="true"
                />

                <bz-text :edit="edit" v-if="setting.listElements.subtitle" v-model="data.items[index].subtitle" text-color="#ffffff" :shadow="true" :bold="true" />
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
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzDivider from '../../components/section/BzDivider'

export default {
  extends: BzSection,
  components: { BzDivider, BzItems, BzText, BzTitle, BzAlignment, BzContainer, BzBackground },
  computed: {
    valueSize() {
      if (this.setting.layouts.valueSize === 'large') {
        return '2.5em'
      }
      if (this.setting.layouts.valueSize === 'medium') {
        return '2em'
      }
      return '1.5em'
    },
    itemValueStyle() {
      const backgroundColor = this.theme.primaryColor.brighten(70)

      if (this.setting.layouts.shape === 'circle') {
        return {
          borderRadius: '1000px',
          backgroundColor
        }
      } else if (this.setting.layouts.shape === 'square') {
        return {
          backgroundColor
        }
      } else {
        return {
          clipPath: 'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)',
          backgroundColor
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--statistic-3-root {
  .bz-item-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
