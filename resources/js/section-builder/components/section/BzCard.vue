<template>
  <div
    class="bz-card-root"
    :class="{ shadow }"
    :style="{
      backgroundColor: cardBgColor,
      padding: padding + 'px',
      borderRadius: rounded + 'px'
    }"
  >
    <slot />
  </div>
</template>

<script>
import BzElement from '../BzElement'

export default {
  extends: BzElement,
  name: 'bz-card',
  props: {
    shadow: {
      type: Boolean,
      default: true
    },
    padding: {
      type: Number,
      default: 10
    },
    rounded: {
      type: Number,
      default: 0
    }
  },
  computed: {
    cardBgColor() {
      let originalColor = tinycolor(this.backgroundColor)
      return originalColor.brighten(5).toString()
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-card-root {
  width: 100%;
  height: 100%;
  &.shadow {
    box-shadow: rgb(0 0 0 / 24%) 0px 0.5rem 1rem -0.25rem !important;
  }
}
</style>
