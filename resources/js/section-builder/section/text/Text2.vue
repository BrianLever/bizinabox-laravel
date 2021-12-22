<template>
  <div class="bz-section-container bz-sect--text-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container class="p-4">
        <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

        <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

        <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
      </bz-container>
      <bz-container>
        <bz-items :edit="edit" v-model="data.items" :cols="setting.column" category-name="text" :shadow="false">
          <template slot-scope="{ item, index }">
            <div class="w-100 p-2">
              <bz-title :edit="edit" v-model="item.title" v-if="setting.listElements.title" :background-color="backgroundColor" />
              <bz-text :edit="edit" v-model="item.description" v-if="setting.listElements.description" :background-color="backgroundColor" />
              <div class="d-flex justify-content-end" v-if="setting.listElements.buttons">
                <bz-button-group :edit="edit" v-model="item.buttons" :background-color="backgroundColor" />
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
import BzTitle from '../../components/section/BzTitle'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzItems from '../../components/section/BzItems'
import BzText from '../../components/section/BzText'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzButtonGroup from '../../components/section/BzButtonGroup'

export default {
  name: 'Text2',
  extends: BzSection,
  components: {
    BzButtonGroup,
    BzSubtitle,
    BzText,
    BzItems,
    BzContainer,
    BzBackground,
    BzTitle
  }
}
</script>
<style lang="scss" scoped>
.bz-sect--text-2-root {
  .content {
    padding: 30px 0;
  }
}
</style>
