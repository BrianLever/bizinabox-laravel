/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Main components
Vue.component('choose-logo', require('./components/choose-logo').default)
Vue.component('logo-hover', require('./components/logo-hover').default)
Vue.component('item-on-modal', require('./components/item-on-modal').default)
Vue.component('header-page', require('./components/layouts/header-page').default)
Vue.component('footer-page', require('./components/layouts/footer-page').default)
Vue.component('login', require('./components/login').default)
Vue.component('register', require('./components/register').default)
Vue.component('forgot-password', require('./components/forgot-password').default)
Vue.component('reset-password', require('./components/reset-password').default)
Vue.component('login-password', require('./components/login-password').default)
Vue.component('contact-us', require('./components/contact-us').default)

// Elements
Vue.component('preview', require('./components/elements/preview').default)
Vue.component('top-right-menu', require('./components/elements/top-right-menu').default)

// Admin components
Vue.component('import-logo', require('./components/admin/import-logo').default)

// Client components
Vue.component('profile', require('./components/client/profile').default)

// Home page
Vue.component('home-slider', require('./components/home/slider').default)

import Fragment from 'vue-fragment'
import Vuex from 'vuex'
import { store } from './store'

Vue.use(Vuex)
Vue.use(Fragment.Plugin)
//

import babelPolyfill from 'babel-polyfill'

import VueHtml2Canvas from 'vue-html2canvas'
Vue.use(VueHtml2Canvas)

Vue.config.devtools = true
Vue.config.debug = true
Vue.config.silent = false
Vue.config.productionTip = true

import notifications from './mixins/notifications'

const app = new Vue({
  el: '#app',
  mixins: [notifications],
  store: store
})
