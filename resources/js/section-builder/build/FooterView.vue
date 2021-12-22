<template>
  <div class="w-100">
    <component v-if="footer" :is="footer.name" :properties="header"></component>
  </div>
</template>

<script>
import BzSection from '../components/BzSection'
export default {
  name: 'FooterView',
  extends: BzSection
}
</script>

<style scoped></style>
