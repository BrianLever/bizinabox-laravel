export const iconSelectorMutation = {
  openIconSelector(state, payload) {
    state.iconSelector.open = true
    state.iconSelector.onChange = payload.onChange
    state.iconSelector.value = payload.value
    window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  },
  closeIconSelector(state) {
    state.iconSelector.open = false
    window.document.getElementsByTagName('html')[0].style.overflow = ''
  }
}
