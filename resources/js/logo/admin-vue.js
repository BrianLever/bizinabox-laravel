window.Vue = require('vue').default
window.axios = require('axios')

Vue.component('gradient-palette', require('../components/logo/admin/gradient-palette.vue').default)

const app = new Vue({
  el: '#admin_vue'
})
