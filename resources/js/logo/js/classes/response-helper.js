export const responseHelper = {
  data() {
    return {}
  },
  methods: {
    isSuccessResponse(response) {
      try {
        if (response.status) {
          return response.status === 'success'
        } else if (response.alert) {
          return true
        }
      } catch (err) {
        return false
      }
    }
  }
}
