export const subscribeMutation = {
  openSubscribe(state, payload) {
    state.subscribe.open = true
    state.subscribe.onChange = payload.onChange
    state.subscribe.value = payload.value
    window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  },
  closeSubscribe(state) {
    state.subscribe.open = false
    window.document.getElementsByTagName('html')[0].style.overflow = ''
  }
}
