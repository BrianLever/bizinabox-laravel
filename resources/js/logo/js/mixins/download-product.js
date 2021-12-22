import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import appMixin from './app-mixin'

export default {
  mixins: [appMixin],

  data() {
    return {
      purchases: {
        types: {
          logotype: 'logotype',
          package: 'package'
        }
      }
    }
  },

  created() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.placeholderForPackageButton()
        this.placeholderForLogotypeButton()
      }, 1000)
    })
  },

  methods: {
    downloadLogo(svgData) {
      if (!svgData || !svgData.hash) return

      this.downloadGaEvent(svgData, this.purchases.types.logotype)

      // Spinner for buttons
      this.states.buttons.download.available = false

      Requester.get(route(`${this.editorType}.download`, svgData.hash)).then((response) => {
        if (response.data.type === this.http.statuses.error) {
          this.notification({
            title: response.data.error,
            type: response.data.status,
            message: response.data.error
          })

          return
        }

        if (response.data.isPurchased) {
          console.log('footer page downloadLogo response', response.data)
          const linkSource = response.data.content
          const downloadLink = document.createElement('a')
          const fileName = this.editorType + '.png'

          downloadLink.href = linkSource
          downloadLink.download = fileName

          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)

          this.states.buttons.download.available = true
        } else {
          // Redirect to server for this purchase or downloading
          this.notification({
            title: 'Limited',
            type: 'info',
            message: response.data.message
          })
          EventBus.$emit('leave.window.allow')
          window.setTimeout(function () {
            window.location.href = response.data.redirect
          }, 1000)
        }
      })
    },

    downloadPackage(logotype) {
      this.downloadGaEvent(logotype, this.purchases.types.package)

      // Spinner for buttons
      this.states.buttons.download.available = false

      // Redirect to server for this purchase or downloading
      window.location.href = route(this.editorType + '.download.package', logotype.hash)
    },

    placeholderForPackageButton() {
      // Show placeholder for editor page
      tippy(this.editorType + '.download-package', {
        placement: 'top',
        theme: 'light',
        animation: 'fade',
        trigger: 'mouseenter',
        content(reference) {
          return (
            '<ul class="benefits-on-purchase-button">' +
            '<li>High-quality logo images</li>' +
            '<li>Resizable vector SVG/PDF files</li>' +
            '<li>Social media logo (Facebook, Twitter, etc.)</li>' +
            '<li>Font names & color palette</li>' +
            '<li>Print-ready</li>' +
            '</ul>'
          )
        }
      })
    },

    placeholderForLogotypeButton() {
      tippy(this.editorType + '.download', {
        placement: 'top',
        theme: 'light',
        animation: 'fade',
        trigger: 'mouseenter',
        content(reference) {
          return '<ul class="benefits-on-purchase-button">' + '<li>High quality PNG logotype</li>' + '</ul>'
        }
      })
    }
  }
}
