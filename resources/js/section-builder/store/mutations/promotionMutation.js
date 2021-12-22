export const promotionMutaion = {
  openPromotion(state, payload) {
    state.promotion.open = true
    state.promotion.onChange = payload.onChange
    state.promotion.value = payload.value
    window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  },
  closePromotion(state) {
    state.promotion.open = false
    window.document.getElementsByTagName('html')[0].style.overflow = ''
  }
}
