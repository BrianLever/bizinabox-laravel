<template>
  <div class="w-100 d-flex align-items-center justify-content-center">
    <div class="section-container" :class="{ fullSize, verticalCenter, horizontalCenter }">
      <slot />
    </div>
  </div>
</template>

<script>
import BzElement from '../BzElement'

export default {
  extends: BzElement,
  name: 'bz-container',
  props: {
    fullSize: {
      type: Boolean,
      default: false
    },
    verticalCenter: {
      type: Boolean,
      default: false
    },
    horizontalCenter: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.section-container {
  max-width: 1024px;
  width: 80%;

  @media screen and (max-width: 768px) {
    width: 90%;
  }

  &.fullSize {
    width: 100%;
    max-width: 100vw;
  }

  &.horizontalCenter {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  &.verticalCenter {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
