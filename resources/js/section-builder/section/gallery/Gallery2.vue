<template>
  <div class="bz-section-container bz-sec--gallery2-root" :class="{ [breakPoint]: true }" :data-section-id="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

        <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

        <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
      </bz-container>
      <bz-container :fillSize="fullSize">
        <div class="w-100">
          <bz-items :edit="edit" v-model="data.items" :cols="setting.column" :has-shadow="true">
            <template slot-scope="{ item, index }">
              <div class="w-100">
                <bz-image :edit="edit" v-model="data.items[index]" />
              </div>
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
import Subtitle from '../../components/section/BzSubtitle'
import Background from '../../components/section/BzBackground'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzText from '../../components/section/BzText'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzTitle from '../../components/section/BzTitle'
import BzItems from '../../components/section/BzItems'
import BzImage from '../../components/section/BzImage'

export default {
  extends: BzSection,
  components: {
    BzImage,
    BzItems,
    BzTitle,
    BzSubtitle,
    BzText,
    BzContainer,
    BzBackground,
    Background,
    Subtitle,
    Container
  }
}
</script>

<style lang="scss">
.bz-sec--gallery2-root {
  .content {
    padding: 30px 0;
  }
}
</style>
