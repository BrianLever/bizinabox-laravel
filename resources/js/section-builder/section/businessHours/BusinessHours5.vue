<template>
  <section class="bz-section-container address1" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="w-100 h-100 d-flex justify-content-around flex-column pt-5">
          <bz-text-element :edit="edit" v-model="data.elements" :setting="setting.elements" :background-color="backgroundColor" :alignment="setting.layouts.alignment" />

          <bz-business-hours class="mt-3" :edit="edit" :location="setting.businessInformation.location" :background-color="backgroundColor" :design="3" />
        </div>
      </bz-container>
    </bz-background>
  </section>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzBusinessHours from '../../components/section/BzBusinessHours'
import BzContainer from '../../components/section/BzContainer'
import BzTextElement from '../../components/section/BzTextElement'

export default {
  name: 'BusinessHours5',
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
.address1 {
}
</style>
