<template>
  <div class="bz-section-container bz-sec--gallery3-root" :class="{ [breakPoint]: true }" :data-section-id="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

        <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

        <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        <div class="w-100">
          <bz-items :edit="edit" v-model="data.items" :grid="true">
            <template slot-scope="{ item, index }">
              <bz-image :edit="edit" v-model="data.items[index]" />
            </template>
          </bz-items>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import Container from '../../components/section/BzContainer'
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzImage from '../../components/section/BzImage'

export default {
  extends: BzSection,
  components: {
    BzImage,
    BzItems,
    BzText,
    BzSubtitle,
    BzTitle,
    BzContainer,
    BzBackground,
    Container
  },
  props: ['position']
}
</script>

<style lang="scss">
.bz-sec--gallery3-root {
  .content {
    padding: 30px 0;
  }
}
</style>
