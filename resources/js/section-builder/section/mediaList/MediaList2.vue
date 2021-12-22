<template>
  <div class="bz-section-container bz-sec--sectionName-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="setting.column" :shadow="false">
          <template slot-scope="{ item, index }">
            <div :style="imageStyle">
              <bz-image :edit="edit" :ratio="aspectRatio" v-model="data.items[index].image" v-if="setting.listElements.image" />
            </div>

            <div class="card-text-wrapper">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="backgroundColor" />

                <bz-text :edit="edit" v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" :background-color="backgroundColor" />

                <bz-divider :line="true" v-if="setting.listElements.dividerLine" :background-color="backgroundColor" :thickness="2" width="20%" :height="10" />

                <bz-text :edit="edit" v-model="data.items[index].description" v-if="setting.listElements.description" :background-color="backgroundColor" />
              </bz-alignment>
            </div>
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzAlignment from '../../components/section/BzAlignment'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzImage from '../../components/section/BzImage'
import BzDivider from '../../components/section/BzDivider'
import MediaList1 from './MediaList1'

export default {
  components: { BzDivider, BzImage, BzItems, BzText, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground },
  extends: MediaList1,
  name: 'MediaList2',
  computed: {
    imageStyle() {
      if (this.setting.layouts.shadow) {
        return {
          boxShadow: '0 .5rem 1rem -.25rem #0000007f'
        }
      } else {
        return {}
      }
    }
  }
}
</script>

<style scoped></style>
