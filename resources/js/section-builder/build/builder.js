import Vue from 'vue'

import * as VueGoogleMaps from 'vue2-google-maps'
import VueDraggable from 'vue-draggable'
import { store } from './store'
import VTooltip from 'v-tooltip'
import VueMaterial from 'vue-material'
import Vuetify from 'vuetify'
import Utils from '../custom/Utils'
import VueYoutube from 'vue-youtube'
import VueRouter from 'vue-router'
import PageView from '../build/PageView'
import moment from 'moment'
import VueMoment from 'vue-moment'
import SlideUpDown from 'vue-slide-up-down'
import UUID from 'vue-uuid'

window.Vue = require('vue').default

Vue.use(UUID)
Vue.use(VueMoment, { moment })
window.tinycolor = require('tinycolor2')
Vue.use(VueYoutube)
Vue.use(Vuetify)
Vue.use(VueMaterial)
Vue.use(VTooltip)
Vue.use(VueDraggable)
Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCloxJK3aIK9c7wNMn1wVnGCDHXh8Xei1c',
    libraries: 'places'
  },
  installComponents: false
})

// Build components
Vue.component('GoogleMap', VueGoogleMaps.Map)
Vue.component('GoogleMaker', VueGoogleMaps.Marker)
Vue.component('EditSection', require('../components/EditSection').default)
Vue.component('TemplateView', require('../build/TemplateView').default)
Vue.component('HeaderView', require('../build/HeaderView').default)
Vue.component('FooterView', require('../build/FooterView').default)
Vue.component('SlideUpDown', SlideUpDown)

// Initialize Util functions
Utils.init()

// Build Section Component
const files = require.context('../section', true, /\.vue$/i)
files.keys().map((key) => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

if (window.template) {
  const routes = []

  // const moduleUrls = window.template.module_url || []

  /*
    for (let module in moduleUrls){
        routes.push({
            path: `/${moduleUrls[module] || ''}`,
            component: ModuleView,
            meta: { title: module },
            props: {
                name: module,
                url: moduleUrls[module] || ''
            }
        })
    }
    */

  for (const page of window.template.pages) {
    routes.push({
      path: `/${page.url || ''}`,
      component: PageView,
      meta: { title: page.name },
      props: {
        sections: page.sections || []
      }
    })
  }

  const router = new VueRouter({
    mode: 'history', // remove hashbang (#) from url
    routes
  })

  if (document.getElementById('app')) {
    new Vue({
      router,
      store,
      watch: {
        $route: {
          immediate: true,
          handler(to, from) {
            document.title = to.meta.title || 'Bizinabox Template'
          }
        }
      }
    }).$mount('#app')
  } else {
    // eslint-disable-next-line no-new
    new Vue({
      el: '#header',
      store
    })
    // eslint-disable-next-line no-new
    new Vue({
      el: '#footer',
      store
    })
  }
}
