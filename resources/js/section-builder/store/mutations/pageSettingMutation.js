export const pageSettingMutation = {
  openPageSetting: (state) => {
    state.openPageSettingModal = true
  },
  closePageSetting: (state) => {
    state.openPageSettingModal = false
  }
}
