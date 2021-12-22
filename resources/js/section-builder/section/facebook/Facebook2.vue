<template>
  <div class="bz-section-container bz-sec--facebook-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID"></div>
</template>

<script>
import BzSection from '../../components/BzSection'

export default {
  extends: BzSection,
  components: {}
}
</script>
<style lang="scss" scoped>
.bz-sec--facebook-2-root {
}
</style>
