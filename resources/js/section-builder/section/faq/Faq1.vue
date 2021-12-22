<template>
  <div class="bz-section-container bz-sec--faq-1-root" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-title :edit="edit" v-model="data.elements.title" :text-color="theme.primaryColor" v-if="setting.elements.title" />

        <bz-text :edit="edit" v-model="data.elements.subtitle" :background-color="backgroundColor" v-if="setting.elements.subtitle" />

        <bz-text :edit="edit" v-model="data.elements.description" :background-color="backgroundColor" v-if="setting.elements.description" />

        <bz-items :edit="edit" v-model="data.items" :cols="setting.column" :shadow="false">
          <template slot-scope="{ item, index }">
            <bz-title :edit="edit" v-model="data.items[index].question" v-if="setting.listElements.question" :background-color="backgroundColor" />

            <bz-text :edit="edit" v-model="data.items[index].answer" v-if="setting.listElements.answer" :background-color="backgroundColor" />
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
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzSubtitle from '../../components/section/BzSubtitle'

export default {
  extends: BzSection,
  components: { BzSubtitle, BzItems, BzText, BzTitle, BzContainer, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--sectionName-root {
}
</style>
