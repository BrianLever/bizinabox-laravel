export const attachLinkMutation = {
  openAttachLink(state, payload) {
    state.attachLink.open = true
    state.attachLink.onChange = payload.onChange
    state.attachLink.value = payload.link
    window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  },
  closeAttachLink(state) {
    state.attachLink.open = false
    window.document.getElementsByTagName('html')[0].style.overflow = ''
  }
}
