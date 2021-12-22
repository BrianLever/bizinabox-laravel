import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    template: window.template,
    allCategories: [],
    theme: null,
    edit: false,
    setting: null,
    activeCompanyIndex: 0,
    indexOfActivePage: 0,
    header: null,
    footer: null,
    pages: [],
    loadingData: true,
    stockImages: []
  },
  mutations: mutations
})
