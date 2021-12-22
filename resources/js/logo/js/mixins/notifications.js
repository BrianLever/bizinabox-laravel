export default {
  mounted() {
    this.showNotification()
  },

  methods: {
    showNotification() {
      let title = this.getParameterByName('type')
      let type = this.getParameterByName('type')
      let message = this.getParameterByName('message')
      let duration = this.getParameterByName('duration')

      if (type && message) {
        setTimeout(() => {
          this.notification({
            title: title,
            type: type,
            message: message,
            duration: duration === null ? 4000 : parseInt(duration)
          })
        }, 1000)

        window.history.replaceState(null, null, window.location.pathname)
      }
    },

    notification(config) {
      let title = config.title ? this.ucFirst(config.title) : null

      if (title) {
        config.title = title
      }

      this.$notify(config)
    },

    getParameterByName(name, url) {
      if (!url) url = window.location.href
      name = name.replace(/[\[\]]/g, '\\$&')
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    },

    ucFirst(string) {
      if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }

      return string
    }
  }
}
