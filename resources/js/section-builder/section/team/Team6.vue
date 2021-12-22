<template>
  <div class="bz-section-container bz-sec--team-6-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>
      </bz-container>
      <div class="col-12 px-5">
        <bz-items :edit="edit" :shadow="false" v-model="data.items" :cols="2">
          <template slot-scope="{ item, index }">
            <div class="col-12 bg-white">
              <div class="row">
                <div class="col-lg-8 p-3">
                  <bz-alignment :alignment="setting.layouts.alignment">
                    <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="'#ffffff'" />
                    <bz-text :edit="edit" v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" :background-color="'#ffffff'" />
                  </bz-alignment>
                </div>
                <div class="col-lg-4 p-0">
                  <bz-image :edit="edit" v-model="data.items[index].image" v-if="setting.listElements.image" resize-mode="full" />
                </div>
              </div>
            </div>
          </template>
        </bz-items>
      </div>
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
  name: 'Team6',
  extends: BzSection,
  components: { BzImage, BzText, BzItems, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--team-6-root {
}
</style>
