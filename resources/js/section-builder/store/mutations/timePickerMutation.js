export const timePickerMutation = {
  openTimePicker(state, payload) {
    state.timePicker.open = true
    state.timePicker.time = payload.time
    state.timePicker.onChange = payload.onChange
    window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  },
  closeTimePicker(state) {
    state.timePicker.open = false
    window.document.getElementsByTagName('html')[0].style.overflow = ''
  }
}
