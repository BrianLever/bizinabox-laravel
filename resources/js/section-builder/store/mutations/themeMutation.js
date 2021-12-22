export const themeMutation = {
  updateTheme: (state, payload) => {
    state.theme = _copy(payload)
  }
}
