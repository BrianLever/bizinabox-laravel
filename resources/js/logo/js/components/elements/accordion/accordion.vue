<template>
  <ul class="accordion">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: ['active'],
  data() {
    return {
      accordion: {
        count: 0,
        active: null
      }
    }
  },
  watch: {
    active: {
      immediate: true,
      handler(value) {
        if (typeof value !== 'undefined') {
          this.accordion.active = value
        }
      }
    }
  },
  provide() {
    return { accordion: this.accordion }
  }
}
</script>

<style lang="scss" scoped>
.accordion {
  list-style: none;
  margin: 0;
  padding: 0;
  &__item:last-child {
    border-bottom: none;
  }
}
</style>
