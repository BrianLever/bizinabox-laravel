<template>
  <div class="bz-el--button-root" :class="{ multiple }" :style="{ width: width || 'max-content' }">
    <button :style="buttonStyle" :class="{ [buttonSize]: true }" v-click-outside="{ onClick: closeEditor }">
      <div class="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
        <div class="title" @click="editing = true">
          <i v-if="data.icon" :class="data.icon" style="padding-bottom: 2px" class="mr-1"></i>
          <span contenteditable :class="{ edit }" @input="handleTitleEditor">{{ titleText }}</span>
        </div>

        <div class="editor" v-if="edit && editing">
          <template v-if="link">
            <div class="item-wrapper" v-tooltip="'Link'">
              <div class="item link" @click="openLink">
                <link-icon :fill-color="'#555555'" :size="20" />
              </div>
            </div>

            <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />
          </template>

          <div class="item-wrapper" v-tooltip="'Small Text'" @click.prevent="size = 's'">
            <div class="item size small" :class="{ selected: size === 's' }">S</div>
          </div>

          <div class="item-wrapper" v-tooltip="'Medium Text'" @click.prevent="size = 'm'">
            <div class="item size medium" :class="{ selected: size === 'm' }">M</div>
          </div>

          <div class="item-wrapper" v-tooltip="'Large Text'" @click.prevent="size = 'l'">
            <div class="item size large" :class="{ selected: size === 'l' }">L</div>
          </div>

          <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />

          <div class="item-wrapper" v-tooltip="'Filled'" @click.prevent="outline = false">
            <div class="item" :class="{ selected: !outline }">
              <div class="fill" />
            </div>
          </div>

          <div class="item-wrapper" v-tooltip="'Bordered'" @click.prevent="outline = true">
            <div class="item" :class="{ selected: outline }">
              <div class="outline" />
            </div>
          </div>

          <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />

          <div class="item-wrapper" v-tooltip="'Color'" @click.prevent.stop="openColorForm = true">
            <div class="item color">
              <div class="before" :style="{ backgroundColor: colorItemOpacityBackground }"></div>
              <div class="color" :style="{ backgroundColor: data.backgroundColor || theme.primaryColor }" />
            </div>
          </div>

          <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />

          <div class="item-wrapper" v-tooltip="'Color'" @click="openIconSelector">
            <div class="item icon">
              <dvr-icon :size="16" :fill-color="'#555555'" />
            </div>
          </div>

          <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />

          <template v-if="multiple">
            <div class="item-wrapper" v-tooltip="'Add Button'" @click="handleAddButton">
              <div class="item icon">
                <add-icon :size="16" :fill-color="'#555555'" />
              </div>
            </div>

            <div class="item-wrapper" v-tooltip="'Delete Button'" @click="handleRemoveButton">
              <div class="item icon">
                <delete-icon :size="16" :fill-color="'#555555'" />
              </div>
            </div>

            <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />

            <div class="item-wrapper" :class="{ disabled: start }" v-tooltip="'Move Button'" @click="moveToLeft">
              <div class="item icon">
                <arrow-back-icon :size="16" :fill-color="start ? '#8080807f' : '#555555'" />
              </div>
            </div>

            <div class="item-wrapper" :class="{ disabled: last }" v-tooltip="'Move Button'" @click="moveToRight">
              <div class="item icon">
                <arrow-forward-icon :size="16" :fill-color="last ? '#8080807f' : '#555555'" />
              </div>
            </div>
          </template>

          <div class="color-form-root" v-if="openColorForm" v-click-outside="{ onClick: closeColorForm }">
            <div v-for="color of editableBackgroundColors" class="color-item-wrapper" @click.prevent="handleChangeColor(color)">
              <div class="color-item" :style="editColorItemStyle(color)"></div>
            </div>
            <div class="color-item-wrapper palette">
              <div class="color-item palette" @click="openThemeSlider">
                <palette-icon :fill-color="'#555555'" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import BzElement from '../BzElement'
import LinkIcon from '../icons/Link'
import BzDivider from './BzDivider'
import DvrIcon from '../icons/Dvr'
import AddIcon from '../icons/Add'
import DeleteIcon from '../icons/Delete'
import ArrowBackIcon from '../icons/ArrowBack'
import ArrowForwardIcon from '../icons/ArrowForward'
import PaletteIcon from '../icons/Palette'
import { mapMutations } from 'vuex'

export default {
  components: { PaletteIcon, ArrowForwardIcon, ArrowBackIcon, DeleteIcon, AddIcon, DvrIcon, BzDivider, LinkIcon },
  extends: BzElement,
  name: 'bz-button',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    last: {
      type: Boolean,
      default: false
    },
    start: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    link: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: ''
    },
    rounded: {
      type: [Boolean, String, Number],
      default: 4
    },
    buttonColor: {
      type: [String]
    }
  },
  mounted() {
    this.titleText = this.data.title
  },
  data() {
    return {
      editing: false,
      titleText: '',
      openColorForm: false,
      content: '',
      defaultData: {
        title: 'Button Title',
        size: 's',
        outline: false
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        if (this.content !== val.title) {
          this.titleText = val.title
          this.content = val.title
        }
      }
    }
  },
  computed: {
    outline: {
      get() {
        return this.data.outline
      },
      set(val) {
        this.data.outline = val
        this.data = _copy(this.data)
      }
    },
    size: {
      get() {
        return this.data.size
      },
      set(val) {
        this.data.size = val
        this.data = _copy(this.data)
      }
    },
    colorItemOpacityBackground() {
      let originalColor = tinycolor(this.data.backgroundColor || this.theme.primaryColor)
      return originalColor.darken(30).toString()
    },
    buttonBackgroundColor() {
      return this.outline ? 'transparent' : this.data.backgroundColor || this.buttonColor || this.theme.primaryColor
    },
    buttonSize() {
      return this.data.size || 's'
    },
    buttonStyle() {
      return {
        backgroundColor: this.buttonBackgroundColor,
        color: this.getColor(this.buttonBackgroundColor),
        borderStyle: 'solid',
        borderRadius: this.rounded === true ? '1000px' : this.rounded + 'px',
        borderColor: this.data.backgroundColor || this.theme.primaryColor,
        ...(this.width ? { width: this.width } : {})
      }
    },
    editableBackgroundColors() {
      let originalColors = {
        primaryColor: this.theme.primaryColor,
        secondaryColor: this.theme.secondaryColor,
        lightModeColor: this.theme.lightModeColor,
        darkModeColor: this.theme.darkModeColor
      }
      let brightNess = []
      let editableColors = []
      let brightNessOfBackgroundColor = getBrightness(this.backgroundColor)
      brightNess.push(brightNessOfBackgroundColor)
      for (let colorName in originalColors) {
        let b = getBrightness(originalColors[colorName])
        if (brightNess.every((item) => Math.abs(item - b) > 10)) {
          editableColors.push(colorName)
        }
        brightNess.push(b)
      }
      return editableColors
    }
  },
  methods: {
    openLink() {
      this.openAttachLink({
        onChange: (link) => {
          this.data = { ...this.data, link }
        }
      })
    },
    editColorItemStyle(color) {
      return {
        backgroundColor: `var(--bz-${color.dashed()})`,
        border: 'solid 1px #8080803f'
      }
    },
    handleTitleEditor(e) {
      this.content = e.target.innerText
      this.data.title = e.target.innerText
      this.data = _copy(this.data)
    },
    handleChangeColor(color) {
      this.data.backgroundColor = this.theme[color]
      this.data = _copy(this.data)
    },
    closeEditor() {
      this.editing = false
    },
    closeColorForm() {
      this.openColorForm = false
    },
    openIconSelector() {
      this.$store.commit('openIconSelector', {
        onChange: (icon) => {
          this.data.icon = icon
          this.data = _copy(this.data)
        }
      })
    },
    handleAddButton() {
      this.$emit('add', this.index)
    },
    handleRemoveButton() {
      this.$emit('delete', this.index)
    },
    moveToRight() {
      if (!this.last) {
        this.editing = false
        this.$emit('swap', this.index, this.index + 1)
      }
    },
    moveToLeft() {
      if (!this.first) {
        this.editng = false
        this.$emit('swap', this.index, this.index - 1)
      }
    },
    ...mapMutations(['openAttachLink'])
  }
}
</script>
<style lang="scss" scoped>
.bz-el--button-root {
  width: max-content;
  display: flex;
  position: relative;

  &.multiple {
    margin-right: 10px;
    margin-top: 10px;
  }

  button {
    &.s {
      padding: 6px 15px;
      font-size: 14px;
    }

    &.m {
      padding: 6px 25px;
      font-size: 16px;
    }

    &.l {
      padding: 6px 35px;
      font-size: 18px;
    }

    .title:first-child {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        padding: 2px;
        border: solid 2px transparent;
        cursor: text;
        border-radius: 2px;

        &.edit {
          &:focus,
          &:active,
          &:hover {
            border: solid 2px var(--bz-section-edit-active-color);
            transition: border 0.5s;
          }
        }
      }
    }

    .editor {
      position: absolute;
      height: 30px;
      padding: 3px 5px;
      border-right: 4px;
      background-color: white;
      box-shadow: 0 0 20px 5px #00000012;
      top: -45px;
      display: flex;
      align-items: center;

      .item-wrapper {
        width: 24px;
        height: 24px;
        border-radius: 2px;
        padding: 4px;

        &:hover:not(.disabled) {
          background-color: #8080803f;
        }

        &.disabled {
          cursor: not-allowed;
        }

        .item {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          &.selected {
            background-color: #0a6aa13f;
          }

          &.size {
            text-transform: uppercase;
            font-size: 14px;
            color: #555555;
          }

          .outline,
          .fill {
            width: 10px;
            height: 10px;
            margin: 3px;
            padding: 0;
          }

          .fill {
            border-radius: 2px;
            background-color: var(--bz-section-edit-active-color);
          }

          .outline {
            border-radius: 2px;
            background-color: white;
            border: solid 1px #808080;
          }

          &.color {
            position: relative;
            .before {
              content: ' ';
              position: absolute;
              left: 0;
              top: 0;
              background-color: inherit;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              filter: opacity(30%);
              z-index: 1;
            }
          }

          .color {
            width: 12px;
            height: 12px;
            margin: 2px;
            padding: 0;
            border-radius: 6px;
            z-index: 2;
          }
        }
      }

      .color-form-root {
        position: absolute;
        height: 40px;
        padding: 1px 4px;
        border-right: 4px;
        background-color: white;
        box-shadow: 0 0 20px 5px #00000012;
        border-radius: 2px;
        top: -50px;
        display: flex;
        align-items: center;
        right: 0;

        .color-item-wrapper {
          border-radius: 2px;
          width: 50px;
          height: 100%;
          padding: 1px;
          margin: 0 2px;
          border: solid 2px transparent;

          &:not(.palette) {
            &:hover {
              border: solid 2px #0a8cf07f;
            }

            &.selected {
              border: solid 2px var(--bz-section-edit-active-color);
            }
          }

          .color-item {
            width: 100%;
            height: 100%;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;

            &.palette {
              &:hover {
                background-color: #8080803f;
              }
            }
          }
        }
      }
    }
  }
}
</style>
