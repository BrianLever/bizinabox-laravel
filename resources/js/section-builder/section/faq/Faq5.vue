<template>
  <div class="bz-section-container bz-sec--faq5-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-title :edit="edit" v-model="data.elements.title" :text-color="theme.primaryColor" v-if="setting.elements.title" />

        <bz-text :edit="edit" v-model="data.elements.subtitle" :background-color="backgroundColor" v-if="setting.elements.subtitle" />

        <bz-text :edit="edit" v-model="data.elements.description" :background-color="backgroundColor" v-if="setting.elements.description" />

        <bz-items :edit="edit" v-model="data.items" :cols="1" :shadow="false">
          <template slot-scope="{ item, index }">
            <slide-up-down>
              <template slot="header">
                <div class="bz-fq-question-wrapper">
                  <bz-title :edit="edit" v-model="data.items[index].question" v-if="setting.listElements.question" :background-color="theme.primaryColor" />
                </div>
              </template>
              <template slot="content">
                <div class="bz-fq-answer-wrapper">
                  <bz-text :edit="edit" v-model="data.items[index].answer" v-if="setting.listElements.answer" :background-color="backgroundColor" />
                </div>
              </template>
            </slide-up-down>
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
import SlideUpDown from '../../components/elements/SlideUpDown'

export default {
  components: { SlideUpDown, BzItems, BzText, BzTitle, BzContainer, BzBackground },
  extends: BzSection,
  name: 'Faq5'
}
</script>

<style lang="scss" scoped>
.bz-sec--faq5-root {
  .bz-fq-question-wrapper {
    background-color: var(--bz-primary-color);
    padding: 15px 5px 5px;
    border-radius: 2px;
  }

  .bz-fq-answer-wrapper {
    padding: 10px 0;
  }
}
</style>
