<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      timer1: null,
      appURL: '',
      appDomain: '',
      imageHost: ''
    }
  },
  computed: {
    isWebsite() {
      return this.template.domain
    },
    loadingData() {
      return this.$store.state.loadingData
    },
    viewMode() {
      return this.$store.state.viewMode
    },
    indexOfActivePage() {
      if (this.$store.state.edit) {
        return this.$store.state.indexOfActivePage
      } else {
        return this.allPages.findIndex((page) => this.$route.path === `/${page.url || ''}`)
      }
    },
    allCategories() {
      return this.$store.state.allCategories
    },
    headerSections() {
      const headerCategory = this.allCategories.find((category) => category.name === 'Header')
      return headerCategory.sections || []
    },
    footerSections() {
      const footerCategory = this.allCategories.find((category) => category.name === 'Footer')
      if (footerCategory) {
        return footerCategory.sections
      }
      return []
    },
    openSlider() {
      return this.$store.state.openSlider
    },
    activeSlider() {
      return this.$store.state.activeSlider
    },
    activePosition: {
      get() {
        return this.$store.state.activePosition
      },
      set(value) {
        this.setActivatePosition(value)
      }
    },
    template: {
      get() {
        return this.$store.state.template
      },
      set(value) {
        this.$store.commit('updateTemplate', value)
      }
    },
    moduleUrls() {
      if (this.template) {
        return this.template.module_url
      }
      return {}
    },
    addPosition: {
      get() {
        return this.$store.state.addPosition
      },
      set(value) {
        this.setAddPosition(value)
      }
    },
    allPages: {
      get() {
        return this.$store.state.pages
      },
      set(value) {
        this.updatePages(value)
      }
    },
    activePage: {
      get() {
        return this.allPages[this.indexOfActivePage] || {}
      },
      set(val) {
        this.allPages[this.indexOfActivePage] = val
      }
    },
    activeSections: {
      get() {
        if (this.activePage) {
          return this.activePage.sections || []
        }
        return []
      },
      set(val) {
        this.activePage.sections = val
      }
    },
    header: {
      get() {
        return this.$store.state.header
      },
      set(value) {
        this.$store.commit('updateHeader', value)
      }
    },
    footer: {
      get() {
        return this.$store.state.footer
      },
      set(value) {
        this.$store.commit('updateFooter', value)
      }
    },
    activeSection: {
      get() {
        if (this.activePosition === 'header') {
          return this.header
        }
        if (this.activePosition === 'footer') {
          return this.footer
        }
        return this.activeSections[this.activePosition]
      },
      set(val) {
        return (this.activeSections[this.activePosition] = val)
      }
    },
    activeSetting() {
      if (this.activeSection) {
        return this.activeSection.data.setting
      }
      return null
    },
    openPageSettingModal: {
      get() {
        return this.$store.state.openPageSettingModal
      },
      set(value) {
        if (value) {
          this.$store.commit('openPageSetting')
        } else {
          this.$store.commit('closePageSetting')
        }
      }
    },
    showSettingPanel() {
      return this.activeSlider !== 'theme' && this.activeSetting
    },
    activeCompanyIndex: {
      get() {
        return this.$store.state.activeCompanyIndex
      },
      set(val) {
        this.$store.commit('setActiveCompanyIndex', val)
      }
    },
    theme: {
      get() {
        return this.$store.state.theme
      },
      set(value) {
        this.$store.commit('updateTheme', value)
      }
    },
    templateSetting: {
      get() {
        return this.$store.state.setting
      },
      set(val) {
        this.$store.commit('updateTemplateSetting', val)
      }
    },
    themeMode: {
      get() {
        return this.theme.mode
      },
      set(value) {
        this.theme.mode = value
      }
    },
    activeBackgroundColor: {
      get() {
        let backgroundColor
        if (this.activeSection.data.background.color) {
          backgroundColor = this.activeSection.data.background.color
        }
        if (backgroundColor) {
          return backgroundColor
        }
        if (this.themeMode === 'dark') {
          return '#000000'
        }
        return '#ffffff'
      },
      set(value) {
        this.updateBackground({ color: value })
      }
    },
    activeBackgroundType: {
      get() {
        return this.activeSection.data.background.type || 'color'
      },
      set(value) {
        this.updateBackground({ type: value })
      }
    },
    activeBackgroundVideo: {
      get() {
        return this.activeSection.data.background.video
      },
      set(value) {
        this.updateBackground({ video: value })
      }
    },
    activeBackgroundPattern: {
      get() {
        return this.activeSection.data.background.patternName
      },
      set(value) {
        this.updateBackground({ patternName: value })
      }
    },
    activeBackground: {
      get() {
        return this.activeSection.data.background || {}
      },
      set(value) {
        this.$store.commit('updateBackground', value)
      }
    },
    activeBackgroundOverlayColor: {
      get() {
        return this.activeBackground.overlayColor
      },
      set(value) {
        this.activeBackground.overlayColor = value
        this.activeBackground = window._copy(this.activeBackground)
      }
    }
  },
  mounted() {
    this.appURL = window.appURL
    this.appDomain = window.appDomain
    this.imageHost = window.imageHost
  },
  methods: {
    isActiveMenu(url) {
      if (this.edit) {
        return this.activePage.url === url
      } else {
        if (this.$route) {
          return this.$route.path === `/${url || ''}`
        } else {
          return window.location.pathname === `/${url || ''}`
        }
      }
    },
    modeColor(active = true) {
      if (this.theme.mode === 'dark') {
        return active ? this.theme.darkModeColor : this.theme.lightModeColor
      } else {
        return active ? this.theme.lightModeColor : this.theme.darkModeColor
      }
    },
    assignSection(section) {
      const sectionUUID = `bz-page-${this.activePage.name}-section-${this.$uuid.v4()}`
      this.activeSections[this.addPosition] = window._copy({ sectionUUID, ...section })
      this.updatePages(this.allPages)
    },
    prependSection(section) {
      if (this.activePosition !== null) {
        this.insertSection({ position: this.activePosition, section })
        this.setActivatePosition(this.activePosition + 1)
      } else {
        this.insertSection({ section })
      }
    },
    appendSection(section) {
      if (this.activePage) {
        if (this.activePosition === 'header' || this.activeSections.length === 0) {
          this.insertSection({ position: 0, section })
        } else if (this.activePosition === 'footer') {
          this.insertSection({ position: this.activeSections.length, section })
        } else {
          this.insertSection({ position: this.activePosition + 1, section })
        }
      }
    },
    openPageSlider() {
      // this.addPosition = null;
      if (!this.openSlider || this.activeSlider !== 'pages') {
        this.enableEdit()
        this.setOpenSlider({ sliderName: 'pages' })
      }
    },
    openThemeSlider() {
      this.addPosition = null
      if (!this.openSlider || this.activeSlider !== 'theme') {
        this.disableEdit()
        this.setOpenSlider({ sliderName: 'theme' })
      }
    },
    openSettingSlider(activeTab, activeSubTab) {
      if (!this.openSlider || this.activeSlider !== 'settings') {
        this.enableEdit()
        this.setOpenSlider({ sliderName: 'settings', activeTab, activeSubTab })
      }
    },
    componentFromStr(numStr, percent) {
      const num = Math.max(0, parseInt(numStr, 10))
      return percent ? Math.floor((255 * Math.min(100, num)) / 100) : Math.min(255, num)
    },
    getColor(bgColor) {
      bgColor = bgColor.replace(/ /g, '')
      if (bgColor.includes('rgb')) {
        bgColor = this.rgbToHex(bgColor)
      }
      const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
      const r = parseInt(color.substring(0, 2), 16) // hexToR
      const g = parseInt(color.substring(2, 4), 16) // hexToG
      const b = parseInt(color.substring(4, 6), 16) // hexToB
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#555555' : '#ffffff'
    },
    rgbToHex(rgb) {
      const rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/
      let result
      let r
      let g
      let b
      let hex = ''
      if ((result = rgbRegex.exec(rgb))) {
        r = this.componentFromStr(result[1], result[2])
        g = this.componentFromStr(result[3], result[4])
        b = this.componentFromStr(result[5], result[6])
        hex = '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)
      }
      return hex
    },
    getBrightness(color) {
      if (color.includes('rgb')) {
        color = this.rgbToHex(color)
      }
      color = color.replace(/ /g, '').replace('#', '')
      const r = parseInt(color.substring(0, 2), 16)
      const g = parseInt(color.substring(2, 4), 16)
      const b = parseInt(color.substring(4, 6), 16)

      return (299 * r + 587 * g + 114 * b) / 1000
    },
    isBrighter(color1, color2) {
      return this.getBrightness(color1) > this.getBrightness(color2)
    },
    getTextColor(bgColor, defaultColor = '#ffffff', whiteOrBlack = true) {
      const bgBrightNess = window.getBrightness(bgColor || defaultColor)

      if (whiteOrBlack) {
        if (bgBrightNess < 190) {
          return '#ffffff'
        } else {
          return '#000000'
        }
      }

      if (bgBrightNess < 50) {
        return '#ffffff'
      }
      if (bgBrightNess > 200) {
        return '#000000'
      }
      if (Math.abs(window.getBrightness(defaultColor) - bgBrightNess) > 50) {
        return defaultColor
      }
      if (Math.abs(window.getBrightness(this.theme.primaryColor) - bgBrightNess) > 50) {
        return this.theme.primaryColor
      }
      if (Math.abs(window.getBrightness(this.theme.secondaryColor) - bgBrightNess) > 50) {
        return this.theme.secondaryColor
      }
      if (Math.abs(window.getBrightness(this.theme.darkModeColor) - bgBrightNess) > 50) {
        return this.theme.darkModeColor
      }
      if (Math.abs(window.getBrightness(this.theme.lightModeColor) - bgBrightNess) > 50) {
        return this.theme.lightModeColor
      }
      return window.getColor(bgColor)
    },
    ...mapMutations({
      setOpenSlider: 'setOpenSlider',
      closeSlider: 'closeSlider',
      setActivePage: 'setActivePage',
      updatePages: 'updatePages',
      insertSection: 'insertSection',
      setActivatePosition: 'setActivatePosition',
      enableEdit: 'enableEdit',
      disableEdit: 'disableEdit',
      setAddPosition: 'setAddPosition',
      setViewMode: 'setViewMode',
      updateBackground: 'updateBackground'
    })
  }
}
</script>
