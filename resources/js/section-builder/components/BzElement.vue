h n/.,mnm,.
<script>
import BzComponent from './BzComponent'

export default {
  extends: BzComponent,
  props: {
    value: {
      type: [Object, String, Boolean, Number, Array, Date, undefined],
      default: undefined
    },
    editMode: {
      type: [Boolean, undefined],
      default: undefined
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    textColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      color: 'black',
      dividerColor: '#808080'
    }
  },
  computed: {
    edit() {
      if (typeof this.editMode === 'undefined') {
        return this.$store.state.edit || false
      }
      return this.editMode
    },
    data: {
      get() {
        if (typeof this.defaultData !== 'undefined') {
          if (typeof this.value === 'object' && typeof this.defaultData === 'object') {
            if (!Array.isArray(this.value) && !Array.isArray(this.defaultData)) {
              return { ...this.defaultData, ...this.value }
            }

            if (Array.isArray(this.value) && Array.isArray(this.defaultData)) {
              if (this.value.length === 0) {
                return this.defaultData
              }
            }
          }
          if (!this.value) {
            return this.defaultData
          }
        }
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    editableColors() {
      const originalColors = {
        primaryColor: this.theme.primaryColor,
        secondaryColor: this.theme.secondaryColor,
        lightModeColor: this.theme.lightModeColor,
        darkModeColor: this.theme.darkModeColor,
        whiteColor: '#ffffff',
        blackColor: '#000000'
      }

      const brightNess = []
      const editableColors = []
      const brightNessOfBackgroundColor = window.getBrightness(this.backgroundColor)
      brightNess.push(brightNessOfBackgroundColor)
      for (const colorName in originalColors) {
        const b = window.getBrightness(originalColors[colorName])
        if (brightNess.every((item) => Math.abs(item - b) > 10)) {
          editableColors.push(colorName)
        }
        brightNess.push(b)
      }
      return editableColors
    }
  },
  watch: {
    backgroundColor: {
      immediate: true,
      handler(value) {
        if (this.textColor) {
          this.color = this.textColor
        } else {
          this.color = this.getTextColor(value, this.theme.primaryColor)
        }
        const originalColor = window.tinycolor(this.color)
        this.dividerColor = originalColor.brighten(50).toString()
      }
    }
  },
  methods: {
    stopPreventEvent(e) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
}
</script>
