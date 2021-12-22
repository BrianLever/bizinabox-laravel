<template>
  <div class="bz-section-container bz-sec--sectionName-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" size="m">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="setting.column" :shadow="false" :spacing="false">
          <template slot-scope="{ item, index }">
            <div class="bz-col-12 py-0">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-text :bold="true" :edit="edit" v-model="item.title" v-if="setting.listElements.title" :size="'1.1em'" />

                <bz-text :bold="true" :edit="edit" v-model="item.price" v-if="setting.listElements.price" />

                <bz-divider :line="true" :height="10" :width="50" v-if="setting.listElements.dividerLine" />

                <bz-text :edit="edit" v-model="item.subtitle" v-if="setting.listElements.description" />
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
import BzDivider from '../../components/section/BzDivider'

export default {
  components: { BzDivider, BzItems, BzText, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground },
  extends: BzSection,
  name: 'Menu3'
}
</script>

<style scoped></style>
