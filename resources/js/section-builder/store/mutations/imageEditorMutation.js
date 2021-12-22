export const imageEditorMutation = {
  openImageEditor(state, payload) {
    state.imageEditor.open = true
    state.imageEditor.onChange = payload.onChange
    window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  },
  closeImageEditor(state) {
    state.imageEditor.open = false
    window.document.getElementsByTagName('html')[0].style.overflow = ''
  },
  setStockImages(state, payload) {
    state.stockImages = payload
  }
}
