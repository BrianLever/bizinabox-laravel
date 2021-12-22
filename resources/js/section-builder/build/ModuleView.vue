<template>
  <div class="w-100">
    <template v-if="pageHtml">
      <div class="w-100" v-html="pageHtml"></div>
    </template>
    <template v-else>
      <Loading :active="true" :is-full-page="true" color="#0076DF" />
    </template>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import axios from 'axios'
export default {
  name: 'ModuleView',
  props: {
    name: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: '/'
    }
  },
  components: { Loading },
  data() {
    return {
      pageHtml: null
    }
  },
  created() {
    axios.get(this.url).then((res) => {
      if (res.status === 200) {
        this.pageHtml = res.data
      }
    })
  }
}
</script>

<style scoped></style>
