<template>
  <div class="bz-section-container bz-sec--sectionName-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID"></div>
</template>

<script>
import BzSection from '../components/BzSection'

export default {
  extends: BzSection,
  components: {}
}
</script>
<style lang="scss" scoped>
.bz-sec--sectionName-root {
}
</style>
