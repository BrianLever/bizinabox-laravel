<template>
  <div class="bz-section-container bz-sec--team-4-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-items :edit="edit" :shadow="false" v-model="data.items" :cols="setting.column">
          <template slot-scope="{ item, index }">
            <bz-alignment :alignment="setting.layouts.alignment">
              <bz-image
                :edit="edit"
                v-model="data.items[index].image"
                v-if="setting.listElements.image"
                resize-mode="full"
                :styles="{ root: { width: '40%' } }"
                :rounded="rounded"
                :disable-aspect-view="disableAspectView"
                :ratio="ratio"
              />
            </bz-alignment>
            <div class="mt-3">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="'#ffffff'" />
                <bz-text :edit="edit" v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" :background-color="'#ffffff'" />
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
import BzItems from '../../components/section/BzItems'
import BzText from '../../components/section/BzText'
import BzImage from '../../components/section/BzImage'

export default {
  name: 'Team4',
  extends: BzSection,
  components: { BzImage, BzText, BzItems, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground },
  computed: {
    rounded() {
      return this.setting.layouts.aspectRatio === 'circle'
    },
    disableAspectView() {
      return this.setting.layouts.aspectRatios === 'original'
    },
    ratio() {
      if (this.setting.layouts.aspectRatio === 'circle' || this.setting.layouts.aspectRatio === 'square') {
        return 1
      }
      if (this.setting.layouts.aspectRatio === 'landscape') {
        return 3 / 4
      }
      if (this.setting.layouts.aspectRatio === 'portrait') {
        return 4 / 3
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-sec--team-4-root {
}
</style>
