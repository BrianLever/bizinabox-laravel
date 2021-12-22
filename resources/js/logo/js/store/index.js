import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    editorType: window.editorType || 'logotypes'
  },
  mutations: mutations
})
