<template>
  <div class="bz-section-container bz-sec--faq-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-title :edit="edit" v-model="data.elements.title" :text-color="theme.primaryColor" v-if="setting.elements.title" />

        <bz-text :edit="edit" v-model="data.elements.subtitle" :background-color="backgroundColor" v-if="setting.elements.subtitle" />

        <bz-text :edit="edit" v-model="data.elements.description" :background-color="backgroundColor" v-if="setting.elements.description" />

        <bz-items :edit="edit" v-model="data.items" :cols="setting.column">
          <template slot-scope="{ item, index }">
            <div class="faq-question-wrapper">
              <bz-text :edit="edit" v-model="data.items[index].question" v-if="setting.listElements.question" :background-color="theme.primaryColor" size="20px" />
            </div>

            <div class="faq-answer-wrapper">
              <bz-text :edit="edit" v-model="data.items[index].answer" v-if="setting.listElements.answer" :background-color="backgroundColor" />
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
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'

export default {
  extends: BzSection,
  components: { BzItems, BzText, BzTitle, BzContainer, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--faq-root {
  .faq-question-wrapper {
    background-color: var(--bz-primary-color);
    padding: 15px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 15px;
      height: 15px;
      transform: rotate(45deg);
      background-color: var(--bz-primary-color);
      bottom: -8px;
      left: 15%;
    }
  }
  .faq-answer-wrapper {
    padding: 15px;
  }
}
</style>
