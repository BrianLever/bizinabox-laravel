export const manageMarkersMutation = {
  openManageMarkers(state, payload) {
    state.manageMarkers.open = true
    state.manageMarkers.onChange = payload.onChange
    state.manageMarkers.value = payload.value
    window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  },
  closeManageMarkers(state) {
    state.manageMarkers.open = false
    window.document.getElementsByTagName('html')[0].style.overflow = ''
  }
}
