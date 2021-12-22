window.Vue = require('vue')

Vue.component('live-chat', require('./components/section/LiveChat.vue').default)

const app = new Vue({
  el: '#livechat'
})
