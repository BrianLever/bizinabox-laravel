export const contactFormSettingMutation = {
  openContactFormSetting(state, payload) {
    state.contactFormSetting.form = payload.form
    state.contactFormSetting.onChange = payload.onChange
    state.contactFormSetting.open = true
    window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  },
  closeContactFormSetting(state) {
    state.contactFormSetting.open = false
    window.document.getElementsByTagName('html')[0].style.overflow = ''
  }
}
