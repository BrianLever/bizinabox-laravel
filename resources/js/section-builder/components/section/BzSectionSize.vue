<template>
  <div class="w-100 bz-el--section-size-root" :class="'bz-' + sectionSize">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'bz-section-size',
  props: {
    sectionSize: {
      type: [String, Boolean],
      default: 'm'
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-el--section-size-root {
  width: 100%;
  height: 100%;
  padding: 0;

  &.bz-s {
    padding: 20px 0;
  }
  &.bz-m {
    padding: 50px 0;
  }
  &.bz-l {
    padding: 90px 0;
  }
  &.bz-xl {
    padding: 140px 0;
  }
}
</style>
