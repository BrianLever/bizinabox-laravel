import axios from 'axios'
import { cloneDeep } from 'lodash'

export const pageMutation = {
  setTemplate(state) {
    axios
      .get(window.location.pathname)
      .then((res) => {
        if (res.data.status) {
          const { categories, template } = res.data.data
          state.allCategories = categories
          state.template = template

          window.LOG.info('Template data loaded', template)

          if (Array.isArray(template.pages)) {
            state.pages = template.pages
          }

          if (template.data) {
            if (template.data.setting) {
              state.setting = template.data.setting
            }

            if (template.data.theme) {
              state.theme = template.data.theme
              window._setThemeColors(state.theme)
            }

            if (template.data.header) {
              state.header = template.data.header
            }

            if (template.data.footer) {
              state.footer = template.data.footer
            }

            state.activePosition = 'header'
          }
        }
        state.loadingData = false
      })
      .catch((err) => {
        window.LOG.error("pageMutation: can't get template data", err)
        state.loadingData = false
      })
  },
  updatePages(state, payload) {
    if (payload) {
      state.pages = cloneDeep(payload)
    } else {
      state.pages = cloneDeep(state.pages)
    }
  },
  setActivePage(state, payload) {
    if (payload.type !== 'module') {
      state.indexOfActivePage = payload.index
    }
  },
  updateTemplate(state, payload) {
    state.template = cloneDeep(payload)
  },
  updateHeader(state, payload) {
    state.header = cloneDeep(payload)
  },
  updateFooter(state, payload) {
    state.footer = cloneDeep(payload)
  },
  saveAllPages(state, callback) {
    const promise = []
    const isTemplate = !state.template.domain
    for (const page of state.pages) {
      const sections = (page.sections || []).map((item) => {
        return {
          ...item,
          data: JSON.stringify(item.data)
        }
      })
      const updatePageUrl = isTemplate ? window.route('admin.template.page.updatePage', page.id) : window.route('user.website.updatePages', page.id)
      promise.push(axios.post(updatePageUrl, { sections }))
    }

    promise.push(storeTemplate(state))

    Promise.all(promise).then((res) => {
      console.log('Successfully saved all pages & template', res)
      if (typeof callback === 'function') {
        callback()
      }
    })
  },
  saveTemplate(state) {
    storeTemplate(state).then(({ success }) => {
      if (success) {
        window.LOG.success('Saved template successfully')
      } else {
        window.LOG.error('in updating template')
      }
    })
  },
  duplicatePage(state) {
    const clonePage = cloneDeep(state.pages[state.indexOfActivePage])
    let url
    if (state.template.domain) {
      url = window.route('user.website.duplicatePage', clonePage.id)
    } else {
      url = window.route('admin.template.page.duplicatePage', clonePage.id)
    }
    axios
      .post(url)
      .then((res) => {
        const newPage = res.data.data
        console.log(newPage)
        state.pages.push(newPage)
        state.pages = cloneDeep(state.pages)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updatePageStatus(state, pageId) {},
  deletePage(state, pageId) {
    if (!pageId) {
      const activePage = cloneDeep(state.pages[state.indexOfActivePage])
      pageId = activePage.id
    }
    let deleteUrl = window.route('admin.template.page.deletePage', pageId)
    if (state.template.domain) {
      deleteUrl = window.route('user.website.deletePage', pageId)
    }
    axios
      .post(deleteUrl)
      .then((res) => {
        const indexOfDeletePage = state.indexOfActivePage
        if (state.indexOfActivePage === state.pages.length - 1) {
          state.indexOfActivePage = state.indexOfActivePage - 1
        }
        state.pages.splice(indexOfDeletePage, 1)
        state.pages = cloneDeep(state.pages)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updatePagesOrder(state) {
    const pageIds = (state.pages || []).map((page) => page.id)
    let updateOrderUrl = window.route('admin.template.page.updateOrder')
    if (state.template.domain) {
      updateOrderUrl = window.route('user.website.updatePagesOrder')
    }
    axios
      .post(updateOrderUrl, { ids: pageIds.join(',') })
      .then((res) => {
        if (res.data.status) {
          window.LOG.success('update page order success')
        } else {
          window.LOG.error('update page order failed', res.data)
        }
      })
      .catch((err) => {
        window.LOG.error('update page order failed', err)
      })
  }
}

const storeTemplate = (state) => {
  return new Promise((resolve) => {
    const templateData = {
      theme: state.theme,
      setting: state.setting,
      header: state.header,
      footer: state.footer
    }
    if (state.template) {
      let url

      if (state.template.domain) {
        url = window.route('user.website.updateData', state.template.id)
      } else {
        url = window.route('admin.template.item.update', state.template.id)
      }

      axios
        .post(url, {
          ...state.template,
          data: JSON.stringify(templateData)
        })
        .then((res) => {
          if (res.status) {
            resolve({ success: true })
          } else {
            resolve({ success: false })
          }
        })
        .catch((err) => {
          console.log('storeTemplate', err)
          resolve({ success: false })
        })
    }
  })
}
