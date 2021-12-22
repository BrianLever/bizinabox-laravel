<script>
import BzComponent from './BzComponent'
import { deepClone } from 'lodash'
export default {
  extends: BzComponent,
  props: {
    properties: {
      type: Object,
      default: () => {
        return {}
      }
    },
    edit: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isNewSection: true,
      breakPoint: 'bz-xl',
      section: {},
      sectionWidth: 0
    }
  },
  computed: {
    data: {
      get() {
        return this.section.data.data
      },
      set(val) {
        this.section.data.data = val
      }
    },
    isActive() {
      return this.activeSection.sectionUUID === this.section.sectionUUID
    },
    setting() {
      return this.section.data.setting
    },
    background() {
      return this.section.data.background
    },
    fullSize() {
      return this.setting.layouts.fullSize
    },
    sectionSize() {
      return this.setting.layouts.sectionSize
    },
    backgroundColor() {
      if (
        (this.background.type || 'color') === 'color' ||
        (this.background.type === 'image' && !this.background.image) ||
        (this.background.type === 'video' && !this.background.video)
      ) {
        const backgroundColor = this.section.data.background.color

        if (backgroundColor) {
          return backgroundColor.darken(3)
        }

        if (this.themeMode === 'dark') {
          return this.theme.darkModeColor.darken(3)
        }

        return this.theme.lightModeColor.darken(3)
      } else {
        return '#000000'
      }
    },
    textColor() {
      return this.getTextColor(this.backgroundColor, 'primaryColor')
    }
  },
  watch: {
    theme: {
      deep: true,
      handler(val) {
        this.setFontSize()
      }
    },
    properties: {
      immediate: true,
      deep: true,
      handler(val) {
        if (this.preview) {
          this.section = deepClone(val)
          if (typeof this.section.data.data === 'object') {
            if (Object.prototype.hasOwnProperty.call(this.section.data.data, 'items')) {
              this.section.data.data.items = this.section.data.data.items.slice(0, 3)
            }
          }
        } else {
          this.section = val
        }
      }
    }
  },
  mounted() {
    if (this.$store.state.edit) {
      this.setFontSize()
    }
    const self = this
    new ResizeObserver(function (entries) {
      const rect = entries[0].contentRect
      const width = rect.width
      self.setBreakPoints(width)
    }).observe(self.$el)
  },
  methods: {
    setFontSize() {
      const root = this.$el
      let rootFontSize = 16
      switch (this.theme.fontSize) {
        case 's':
          rootFontSize = 14
          break
        case 'm':
          rootFontSize = 16
          break
        case 'l':
          rootFontSize = 18
          break
      }
      root.style.fontSize = rootFontSize + 'px'
    },
    setBreakPoints(width) {
      this.sectionWidth = width
      if (width < 576) {
        this.breakPoint = 'bz-xs'
      }
      if (width >= 576) {
        this.breakPoint = 'bz-sm'
      }
      if (width >= 768) {
        this.breakPoint += ' bz-md'
      }
      if (width >= 992) {
        this.breakPoint += ' bz-lg'
      }
      if (width >= 1200) {
        this.breakPoint += ' bz-xl'
      }
    }
  }
}
</script>
