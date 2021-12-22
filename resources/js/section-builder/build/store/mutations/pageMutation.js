import axios from 'axios'

export const pageMutation = {
  setTemplate(state) {
    axios
      .get('/')
      .then((res) => {
        if (res.data.status) {
          const { template } = res.data.data

          LOG.info('PageMutation:: Template', template)

          state.template = template

          if (Array.isArray(template.pages)) {
            state.pages = template.pages
          } else {
            LOG.warn('PageMutation:: Page is unset')
          }

          if (template.data) {
            if (template.data.setting) {
              state.setting = template.data.setting
            } else {
              LOG.warn('PageMutation:: Template setting is undefined')
            }

            if (template.data.theme) {
              state.theme = template.data.theme
              _setThemeColors(state.theme)
            } else {
              LOG.warn('PageMutation:: Template theme is undefined')
            }

            if (template.data.header) {
              state.header = template.data.header
            } else {
              LOG.warn('PageMutation:: Template header is undefined')
            }

            if (template.data.footer) {
              state.footer = template.data.footer
            } else {
              LOG.warn('PageMutation:: Template footer is undefined')
            }
          }

          $(document).ready(() => {
            state.loadingData = false
          })
        }
      })
      .catch((err) => {
        console.log('get Template data Error', err)
        state.loadingData = false
      })
  }
}
