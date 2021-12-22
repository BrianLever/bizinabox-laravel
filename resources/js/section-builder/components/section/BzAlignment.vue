<template>
  <div class="bz-el--alignment-root" :class="{ [alignment]: true, stretch }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'bz-alignment',
  props: {
    alignment: {
      type: String,
      default: 'left'
    },
    stretch: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss">
.bz-el--alignment-root {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  &.stretch {
    height: 100%;
  }

  &.left {
    text-align: left;
    align-items: flex-start;
  }

  &.center {
    text-align: center;
    align-items: center;
  }

  &.right {
    text-align: right;
    align-items: flex-end;
  }
}
</style>
