<template>
  <div class="bz-section-container bz-sec--iframe-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background">
      <div class="m-auto" style="width: max-content">
        <iframe :src="setting.iframe.url" :style="iframeStyle"></iframe>
      </div>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'

export default {
  extends: BzSection,
  components: { BzContainer, BzBackground },
  computed: {
    iframeStyle() {
      if (this.setting.layouts.fullPage) {
        return {
          width: this.sectionWidth + 'px',
          height: '100vh'
        }
      } else {
        return {
          width: this.setting.elements.width + 'px',
          height: this.setting.elements.height + 'px'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-sec--iframe-1-root {
  iframe {
    border: none;
    outline: none;
  }
}
</style>
