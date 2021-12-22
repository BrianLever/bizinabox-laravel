<template>
  <div class="bz-section-container bz-sec--team-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <div class="bz-item-container">
          <bz-items :edit="edit" :shadow="setting.layouts.shadow" v-model="data.items" :cols="setting.column" :styles="{ card: { marginTop: '20px' } }">
            <template slot-scope="{ item, index }">
              <div class="col-12 bg-white">
                <bz-alignment alignment="center">
                  <bz-image
                    :edit="edit"
                    v-model="data.items[index].image"
                    v-if="setting.listElements.image"
                    resize-mode="full"
                    :styles="{ root: { marginTop: '-50px', width: '50%', boxShadow: '0 0 20px 4px #00000034' }, base: { boxShadow: '0 0 10px 2px #00000012' } }"
                    :rounded="rounded"
                    :disable-aspect-view="disableAspectView"
                    :ratio="ratio"
                  />

                  <bz-divider :height="10" />

                  <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="'#ffffff'" />
                  <bz-text :edit="edit" v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" :background-color="'#ffffff'" />
                  <bz-text :edit="edit" v-model="data.items[index].description" v-if="setting.listElements.description" :background-color="'#ffffff'" />
                </bz-alignment>
              </div>
            </template>
          </bz-items>
        </div>
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
import BzDivider from '../../components/section/BzDivider'

export default {
  name: 'Team3',
  extends: BzSection,
  components: { BzDivider, BzImage, BzText, BzItems, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground },
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
.bz-sec--team-3-root {
  .bz-item-container {
    margin-top: 30px;
  }
}
</style>
