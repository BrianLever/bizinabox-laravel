<template>
  <div class="bz-section-container bz-sec--team-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>
        <bz-items :edit="edit" :shadow="false" v-model="data.items" :cols="1">
          <template slot-scope="{ item, index }">
            <div class="col-12">
              <div class="row" :class="{ 'flex-row-reverse': reverse(index) }">
                <div class="col-lg-3 p-0">
                  <bz-image
                    :edit="edit"
                    v-model="data.items[index].image"
                    v-if="setting.listElements.image"
                    resize-mode="full"
                    :disable-aspect-view="disableAspectView"
                    :rounded="rounded"
                    :ratio="aspectRatio"
                  />
                </div>
                <div class="col-lg-9 p-3">
                  <bz-alignment :alignment="alignment(index)">
                    <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="backgroundColor" />

                    <bz-text :edit="edit" v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" :background-color="backgroundColor" />

                    <bz-text :edit="edit" v-model="data.items[index].description" v-if="setting.listElements.description" :background-color="backgroundColor" />

                    <bz-divider :line="true" :width="50" :thickness="3" :background-color="backgroundColor" />
                  </bz-alignment>
                </div>
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
  name: 'Team2',
  extends: BzSection,
  components: { BzDivider, BzImage, BzText, BzItems, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground },
  computed: {
    disableAspectView() {
      return this.setting.layouts.aspectRatio === 'original'
    },
    rounded() {
      return this.setting.layouts.aspectRatio === 'circle'
    },
    aspectRatio() {
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
  },
  methods: {
    reverse(index) {
      if (this.setting.alignment === 'alternate') {
        return index % 2
      }
      return this.setting.alignment === 'right'
    },
    alignment(index) {
      if (this.setting.alignment === 'alternate') {
        if (this.setting.layouts.alignment === 'center') {
          return 'center'
        }

        if (index % 2) {
          if (this.setting.layouts.alignment === 'left') {
            return 'left'
          }
          return 'right'
        } else {
          if (this.setting.layouts.alignment === 'left') {
            return 'right'
          }
          return 'left'
        }
      }

      return this.setting.layouts.alignment
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-sec--team-2-root {
}
</style>
