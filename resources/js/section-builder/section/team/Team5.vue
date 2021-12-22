<template>
  <div class="bz-section-container bz-sec--team-5-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor" :size="sectionSize">
      <bz-container>
        <div class="mb-3">
          <bz-alignment :alignment="setting.layouts.alignment">
            <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

            <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

            <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
          </bz-alignment>
        </div>

        <bz-items :edit="edit" :shadow="false" v-model="data.items" :cols="2">
          <template slot-scope="{ item, index }">
            <div class="col-12">
              <div class="row">
                <div class="col-lg-5 p-0">
                  <bz-image :edit="edit" v-model="data.items[index].image" v-if="setting.listElements.image" resize-mode="full" />
                </div>

                <div class="col-lg-7 p-3">
                  <bz-alignment :alignment="setting.layouts.alignment">
                    <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="'#ffffff'" />
                    <bz-text :edit="edit" v-model="data.items[index].description" v-if="setting.listElements.description" :background-color="'#ffffff'" />
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

export default {
  name: 'Team5',
  extends: BzSection,
  components: { BzImage, BzText, BzItems, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--team-5-root {
}
</style>
