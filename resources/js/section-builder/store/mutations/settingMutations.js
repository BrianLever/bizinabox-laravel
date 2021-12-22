import { cloneDeep } from 'lodash'
export const settingMutation = {
  updateBackground(state, payload) {
    if (state.activePosition === 'header') {
      state.header.data.background = { ...state.header.data.background, ...payload }
      state.header = cloneDeep(state.header)
    } else if (state.activePosition === 'footer') {
      state.header.data.background = { ...state.footer.data.background, ...payload }
      state.footer = cloneDeep(state.footer)
    } else {
      state.pages[state.indexOfActivePage].sections[state.activePosition].data.background = {
        ...state.pages[state.indexOfActivePage].sections[state.activePosition].data.background,
        ...payload
      }
      state.pages = cloneDeep(state.pages)
    }
  },
  updateTemplateSetting(state, payload) {
    state.setting = payload
  }
}
