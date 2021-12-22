<template>
  <div class="bz-section-container bz-sec--media-list-3-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="column" :shadow="false">
          <template slot-scope="{ item, index }">
            <div class="card-body" :style="alignmentStyle(index)">
              <div class="card-image-wrapper" :style="imageStyle">
                <bz-image :edit="edit" :ratio="aspectRatio" v-model="data.items[index].image" v-if="setting.listElements.image" />
              </div>

              <div class="card-text-wrapper">
                <bz-alignment :alignment="textAlignment(index)">
                  <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="backgroundColor" />

                  <bz-text :edit="edit" v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" :background-color="backgroundColor" />

                  <bz-divider :line="true" v-if="setting.listElements.dividerLine" :background-color="backgroundColor" />

                  <bz-text :edit="edit" v-model="data.items[index].description" v-if="setting.listElements.description" :background-color="backgroundColor" />
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
  name: 'MediaList3',
  computed: {
    column() {
      if (this.setting.column > 2) {
        return 2
      }
      return this.setting.column
    },
    imageStyle() {
      if (this.setting.layouts.shadow) {
        return {
          boxShadow: '0 .5rem 1rem -.25rem #0000007f'
        }
      } else {
        return {}
      }
    }
  },
  methods: {
    textAlignment(index) {
      if (this.setting.column === 1) {
        if (index % 2 && this.setting.alignment === 'alternate') {
          if (this.setting.layouts.alignment === 'left') {
            return 'right'
          } else if (this.setting.layouts.alignment === 'right') {
            return 'left'
          }
        }
      }
      return this.setting.layouts.alignment
    },
    alignmentStyle(index) {
      if (this.setting.column === 1) {
        if (this.setting.alignment === 'right') {
          return {
            flexDirection: 'row-reverse'
          }
        } else if (this.setting.alignment === 'alternate') {
          if (index % 2) {
            return {
              flexDirection: 'row-reverse'
            }
          }
        }
      }
      return {}
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--media-list-3-root {
  .card-body {
    display: flex;
    width: 100%;
    flex-direction: row;
    padding: 0;

    .card-image-wrapper {
      width: 20%;
    }
    .card-text-wrapper {
      padding: 0 10px;
      width: 80%;
    }
  }
}
</style>
