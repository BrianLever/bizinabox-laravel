export const altTextMutation = {
  openAltText(state, payload) {
    state.altText.open = true
    state.altText.onChange = payload.onChange
    state.altText.value = payload.value
    window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  },
  closeAltText(state) {
    state.altText.open = false
    window.document.getElementsByTagName('html')[0].style.overflow = ''
  }
}
