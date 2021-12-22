<template>
  <div class="bz-section-container bz-sec--map-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background">
      <bz-container :full-size="setting.layouts.fullWidth">
        <bz-google-map :type="setting.map.type" :zoom="setting.map.zoomLevel" :height="600" :options="options" :grayscale="setting.map.grayscale" />
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzGoogleMap from '../../components/section/BzGoogleMap'
import BzContainer from '../../components/section/BzContainer'
import BzBackground from '../../components/section/BzBackground'

export default {
  extends: BzSection,
  components: { BzBackground, BzContainer, BzGoogleMap },
  computed: {
    options() {
      return {
        zoomControl: this.setting.map.zoomControl
      }
    },
    grayscale() {
      if (this.setting.map.type === 'roadmap' || this.setting.map.type === 'terrain') {
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-sec--map-1-root {
}
</style>
