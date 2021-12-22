<template>
  <div class="bz-select-root" :style="{ backgroundColor: variant }">
    <label v-if="label" :class="{ active: focused || value }" :style="{ backgroundColor: variant }">{{ label }}</label>
    <fieldset :style="{ 'min-height': minHeight + 'px' }" :class="{ label }">
      <div class="input-base">
        <input :class="{ [selectedClass]: true }" :value="selectedItemText" ref="inputRef" readonly @click.prevent.stop="handleFocus" />
        <div class="bz-select-spin-icon" @click="$refs.inputRef.focus()">
          <UnfoldMoreIcon />
        </div>
      </div>
    </fieldset>
  </div>
</template>
<script>
import UnfoldMoreIcon from '../icons/UnfoldMore'
export default {
  name: 'BzSelect',
  components: { UnfoldMoreIcon },
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    label: {
      default: null,
      type: String
    },
    labelKey: {
      default: 'label',
      type: String
    },
    itemKey: {
      default: 'value',
      type: String
    },
    preSelected: {
      type: Boolean,
      default: true
    },
    value: {
      default: '',
      type: [String, Number, Object, Boolean]
    },
    minHeight: {
      default: 30,
      type: Number
    },
    variant: {
      type: String,
      default: '#eff0f1'
    },
    matchWidth: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      focused: false,
      indexOfSelectedItem: -1
    }
  },
  computed: {
    selectedItemText() {
      if (typeof this.value === 'object') {
        return this.value[this.labelKey]
      } else {
        if (typeof this.options[0] === 'object') {
          if (this.indexOfSelectedItem > -1) {
            return this.options[this.indexOfSelectedItem][this.labelKey]
          } else {
            return this.options[0][this.labelKey]
          }
        }
        return this.value
      }
    },
    selectedClass() {
      if (this.indexOfSelectedItem > -1) {
        if (this.options[this.indexOfSelectedItem].name) {
          return this.options[this.indexOfSelectedItem].name
        }
      }
      return null
    }
  },
  mounted() {
    this.id = 'bzSelect' + this.$uuid.v4()
    if (this.preSelected && !this.value) {
      this.$emit('input', this.options[0])
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value) {
          if (typeof this.options[0] === 'object' && this.itemKey) {
            let index = this.options.findIndex((option) => option[this.itemKey] === value)
            if (index > -1) {
              this.indexOfSelectedItem = index
            } else {
              if (this.preSelected) {
                this.indexOfSelectedItem = 0
                this.$emit('input', this.options[0][this.itemKey])
              }
            }
          } else {
            if (this.options.indexOf(value) > -1) {
              this.indexOfSelectedItem = this.options.indexOf(value)
            } else {
              if (this.preSelected) {
                this.indexOfSelectedItem = 0
                console.log('test')
                this.$emit('input', this.options[0])
              }
            }
          }
        }
      }
    }
  },
  methods: {
    handleClick(value) {
      if (typeof this.options[0] === 'object') {
        this.$emit('input', value[this.itemKey])
      } else {
        this.$emit('input', value)
      }
      this.focused = false
    },
    itemText(option) {
      if (typeof option === 'object') {
        return option[this.labelKey]
      } else return option
    },

    handleFocus() {
      this.focused = true
      const self = this

      if (document.getElementById('bzSelectOptionsList') === null) {
        const itemListContainer = document.createElement('div')
        itemListContainer.setAttribute('id', 'bzSelectOptionsList')
        itemListContainer.className = 'bz-options-list'

        this.options.forEach((option, index) => {
          let itemDiv = document.createElement('div')
          itemDiv.className = 'select-item'
          itemDiv.innerHTML = this.itemText(option)
          if (this.indexOfSelectedItem === index) {
            itemDiv.classList.add('selected')
          }
          itemDiv.classList.add(option.name)
          itemDiv.addEventListener('click', function () {
            self.handleClick(option)
            itemListContainer.remove()
          })
          itemListContainer.appendChild(itemDiv)
        })

        // set margin height to move the selected item to where the owner select box is.
        let position = this.indexOfSelectedItem > -1 ? this.indexOfSelectedItem : -1.5

        if (position > 5) {
          position = 5
        }

        if (this.options.length > 10 && this.indexOfSelectedItem > this.options.length - 5) {
          position = 10 - (this.options.length - this.indexOfSelectedItem)
        }

        itemListContainer.style.marginTop = -position * 30 + 'px'

        function handleItemListContainerPosition() {
          // position of item list
          let elRect = self.$el.getBoundingClientRect()

          const scrollTop = $(document).scrollTop()
          const scrollLeft = $(document).scrollLeft()

          if (this.matchWidth) {
            itemListContainer.style.width = self.$el.clientWidth + 'px'
            itemListContainer.style.left = elRect.left + 'px'
          } else {
            itemListContainer.style.minWidth = self.$el.clientWidth + 'px'
            let modifyLeft = (itemListContainer.clientWidth - self.$el.clientWidth) / 2

            if (window.innerWidth - 25 < elRect.left + itemListContainer.clientWidth - modifyLeft) {
              modifyLeft = itemListContainer.clientWidth - (window.innerWidth - 25 - elRect.left)
            }

            itemListContainer.style.left = elRect.left - modifyLeft + scrollLeft + 'px'
          }

          itemListContainer.style.top = elRect.top + scrollTop + 'px'
        }

        new ResizeObserver(handleItemListContainerPosition).observe(window.document.body)

        // add animation to the item list
        itemListContainer.classList.add('animated')

        window.document.body.appendChild(itemListContainer)

        /**
         * add outside click event to hind the form
         */
        document.addEventListener('click', function (event) {
          const $target = $(event.target)
          if (!$target.closest('#bzSelectOptionsList').length) {
            itemListContainer.remove()
          }
        })

        $(window).scroll(function () {
          itemListContainer.remove()
        })

        // Scroll down itemListContainer to select item if the length of options is bigger than 5
        if (this.indexOfSelectedItem > 5) {
          itemListContainer.scrollTo({
            left: 0,
            top: (this.indexOfSelectedItem - 5) * 30
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-select-root {
  width: 100% !important;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    margin-bottom: 0.5rem;
    position: absolute;
    left: 5px;
    padding: 0 5px;
    background-color: transparent;
    line-height: 10px;
    top: calc(50% - 5px);
    transition: top 0.3s;
    font-size: 11px;

    &.active {
      top: -8px;
      transition: top 0.3s;
      background-color: inherit;
    }
  }

  fieldset {
    width: 100%;
    border: solid 1px rgba(0, 0, 0, 0.23);
    border-radius: 4px;

    &.label {
      min-height: 40px;
    }

    &:hover {
      border-color: black;
    }

    &:focus,
    &:focus-within,
    &:focus-visible {
      border: solid 2px #0069d9;
      background-color: inherit;
    }

    legend {
      color: rgba(0, 0, 0, 0.6);
      margin-left: 4px;
      width: auto;
      padding: 0 4px;
      font-size: 1em;
    }

    .input-base {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      display: flex;

      input {
        width: calc(100% - 24px);
        padding-left: 10px;
        cursor: pointer;
        text-transform: capitalize;
      }
      .bz-select-spin-icon {
        width: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .over-layer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 4;
      }
    }
  }
}
</style>
