<template>
  <div class="w-100 bz-aspect-view">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BzAspectView',
  props: {
    ratio: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    const self = this
    new ResizeObserver(function () {
      self.$emit('bzEventAdjustAspectView')
    }).observe(this.$el)

    this.$on('bzEventAdjustAspectView', function () {
      const self = this
      let width = self.$el.clientWidth
      let height = width * this.ratio
      self.$el.style.height = height + 'px'
    })
  },
  watch: {
    ratio: {
      immediate: true,
      handler() {
        this.$emit('bzEventAdjustAspectView')
      }
    }
  }
}
</script>
<style lang="scss">
.bz-aspect-view {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
