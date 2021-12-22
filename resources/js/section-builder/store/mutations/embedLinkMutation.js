export const embedLinkMutaion = {
  openEmbedLink(state, payload) {
    state.embedLink.open = true
    state.embedLink.onChange = payload.onChange
    state.embedLink.value = payload.value
    window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  },
  closeEmbedLink(state) {
    state.embedLink.open = false
    window.document.getElementsByTagName('html')[0].style.overflow = ''
  }
}
