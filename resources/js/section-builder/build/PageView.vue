<template>
  <div class="w-100">
    <component v-for="(section, index) of sections" :key="index" :is="section.name" :properties="section"></component>
  </div>
</template>

<script>
export default {
  name: 'PageView',
  props: {
    sections: {
      type: Array,
      default: []
    }
  },
  mounted() {}
}
</script>

<style scoped></style>
