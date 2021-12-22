<template>
  <div class="bz-section-container bz-sec--cover-image-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="bz-col-12">
          <div class="bz-row">
            <div class="bz-col-lg-6 bz-d-flex bz-column bz-justify-center">
              <bz-text :background-color="backgroundColor" v-model="data.elements.subtitle" :edit="edit" v-if="setting.elements.subtitle" :shadow="true" />
              <bz-text :background-color="backgroundColor" v-model="data.elements.description" :edit="edit" v-if="setting.elements.description" :shadow="true" />
              <bz-button-group :edit="edit" :background-color="backgroundColor" v-model="data.elements.buttons" v-if="setting.elements.buttons" />
            </div>
            <div class="bz-col-lg-6 bz-d-flex bz-align-center">
              <bz-title
                :background-color="backgroundColor"
                v-model="data.elements.title"
                :edit="edit"
                v-if="setting.elements.title"
                :shadow="true"
                style="font-size: 72px"
                :mb="0"
              />
            </div>
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzText from '../../components/section/BzText'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzTitle from '../../components/section/BzTitle'
import BzContainer from '../../components/section/BzContainer'

export default {
  extends: BzSection,
  components: { BzContainer, BzTitle, BzButtonGroup, BzText, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--cover-image-1-root {
}
</style>
