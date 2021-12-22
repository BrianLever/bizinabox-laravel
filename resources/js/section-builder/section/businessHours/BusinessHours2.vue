<template>
  <div class="bz-section-container bz-sec-business-hours-1-root" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="w-100 h-100 d-flex justify-content-around flex-column p-lg-4">
          <bz-text-element :edit="edit" v-model="data.elements" :setting="setting.elements" :background-color="backgroundColor" :alignment="setting.layouts.alignment" />

          <bz-business-hours :edit="edit" :location="setting.businessInformation.location" :background-color="backgroundColor" />
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzBusinessHours from '../../components/section/BzBusinessHours'
import BzContainer from '../../components/section/BzContainer'
import BzTextElement from '../../components/section/BzTextElement'

export default {
  name: 'BusinessHours2',
  components: {
    BzTextElement,
    BzContainer,
    BzBusinessHours,
    BzBackground
  },
  extends: BzSection,
  mounted() {}
}
</script>
<style lang="scss">
.bz-sec-business-hours-1-root {
}
</style>
