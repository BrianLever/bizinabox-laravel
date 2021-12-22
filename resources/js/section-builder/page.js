/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue'
import InView from 'vueinview'
import 'es6-promise/auto'
import { store } from './store'
import Carousel3d from 'vue-carousel-3d'
import draggable from 'vuedraggable'
import VTooltip from 'v-tooltip'
import VModal from 'vue-js-modal'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueMaterial from 'vue-material'
import VueMaterialSlider from 'vue-material-slider'
import UUID from 'vue-uuid'
import VueDraggable from 'vue-draggable'
import Utils from './custom/Utils'
import Directives from './custom/Directives'
import VueCarousel from 'vue-carousel'
import moment from 'moment'
import VueMoment from 'vue-moment'
import VueYoutube from 'vue-youtube'
import VueRouter from 'vue-router'
import SlideUpDown from 'vue-slide-up-down'
import VueToast from 'vue-toast-notification'
import Plugins from './plugins'

require('../bootstrap')

Vue.use(VueYoutube)
Vue.use(VueMoment, { moment })
Vue.use(VueCarousel)
Vue.use(VueDraggable)
Vue.use(UUID)
Vue.use(InView)
Vue.use(Carousel3d)
Vue.use(VTooltip)
Vue.use(VModal)
Vue.use(VueMaterialSlider)
Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCloxJK3aIK9c7wNMn1wVnGCDHXh8Xei1c',
    libraries: 'places'
  },
  installComponents: false
})
Vue.use(VueToast)
Vue.use(Plugins)

Utils.init()
Directives.init(Vue)

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

Vue.component('GoogleMap', VueGoogleMaps.Map)
Vue.component('GoogleMaker', VueGoogleMaps.Marker)
Vue.component('DraggableItem', draggable)
Vue.component('EditPage', require('./components/EditPage.vue').default)
Vue.component('SlideUpDown', SlideUpDown)

const files = require.context('./section', true, /\.vue$/i)
files.keys().map((key) => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const routes = []
const router = new VueRouter({
  routes
})
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  router
})
