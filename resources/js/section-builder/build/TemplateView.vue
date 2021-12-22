<template>
  <div class="w-100">
    <template v-if="loadingData">
      <Loading :active="true" :is-full-page="true" color="#0076DF" />
    </template>
    <template v-else>
      <component v-if="header" :is="header.name" :properties="header"></component>
      <router-view></router-view>
      <component v-if="footer" :is="footer.name" :properties="footer"></component>
    </template>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
export default {
  name: 'TemplateView',
  components: { Loading },
  mounted() {
    this.$store.commit('setTemplate')
  },
  computed: {
    header() {
      if (this.$store.state.header) {
        return this.$store.state.header
      } else {
        LOG.warn('TemplateView: header is unset')
        return null
      }
    },
    footer() {
      if (this.$store.state.footer) {
        return this.$store.state.footer
      } else {
        LOG.warn('TemplateView: footer is unset')
        return null
      }
    },
    loadingData() {
      return this.$store.state.loadingData
    }
  }
}
</script>
