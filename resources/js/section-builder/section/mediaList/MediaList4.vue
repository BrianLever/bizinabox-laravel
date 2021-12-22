<template>
  <div class="bz-section-container bz-sec--media-list-4-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize">
      <bz-container>
        <div style="width: 100%; max-width: 600px; margin: auto">
          <bz-alignment :alignment="setting.layouts.alignment">
            <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

            <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

            <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" />
          </bz-alignment>
          <bz-items :edit="edit" v-model="data.items" :cols="2" :styles="cardStyle">
            <template slot-scope="{ item, index }">
              <bz-image :edit="edit" :ratio="3 / 5" v-model="data.items[index].image" v-if="setting.listElements.image" />

              <div class="card-text-wrapper">
                <bz-alignment>
                  <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="backgroundColor" />

                  <bz-text :edit="edit" v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" :background-color="backgroundColor" />

                  <bz-divider :line="true" v-if="setting.listElements.dividerLine" :background-color="backgroundColor" />

                  <bz-text :edit="edit" v-model="data.items[index].description" v-if="setting.listElements.description" :background-color="backgroundColor" />
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
  name: 'MediaList4',
  methods: {
    cardStyle(index) {
      return {
        card: {
          borderRadius: '10px',
          overflow: 'hidden'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--media-list-4-root {
  .card-text-wrapper {
    padding: 4px 10px;
  }
}
</style>
