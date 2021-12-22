export const youtubeVideoMutation = {
  openYoutubeVideo(state, payload) {
    state.youtubeVideo.open = true
    state.youtubeVideo.onChange = payload.onChange
    state.youtubeVideo.value = payload.value
    window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  },
  closeYoutubeVideo(state) {
    state.youtubeVideo.open = false
    window.document.getElementsByTagName('html')[0].style.overflow = ''
  }
}
