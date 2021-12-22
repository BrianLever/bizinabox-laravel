// import "@babel/polyfill";

// Set popper
window.Popper = require('popper.js').default

// Set axios
window.axios = require('axios')
window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

// Set vuejs
window.Vue = require('vue').default

// Set event bus
window.EventBus = new Vue({})

// Init empty object.
window.FormProcessor = {}
window.Requester = require('./classes/requester')

// Load the Form helper class.
require('./classes/form')

// Define the FormError collection class.
require('./classes/form-errors')

// Add additional HTTP / form helpers.
Object.assign(FormProcessor, require('./classes/http'), require('./classes/form-sender'))
Object.assign(Requester, require('./classes/http'))
