<template>
  <div class="v-100">
    <component v-if="header" :is="header.name" :properties="header"></component>
  </div>
</template>

<script>
import BzComponent from '../components/BzComponent'
export default {
  name: 'HeaderView',
  extends: BzComponent,
  created() {
    this.$store.commit('setTemplate')
  }
}
</script>

<style scoped></style>
