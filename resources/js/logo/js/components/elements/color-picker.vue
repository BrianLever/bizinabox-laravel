<template>
  <div>
    <div v-click-outside="hidePicker">
      <input :value="colors.hex" @click="showPicker" @keyup="colorChange" ref="input-color-picker" type="text" />
      <transition name="fade">
        <core-picker v-model="colors" v-show="visible" ref="color-picker">
          <template slot="buttons">
            <div class="color-palette">
              <span class="default-colors">Color palette</span>
              <div class="colors">
                <div @click="applyPalette(color)" v-for="color in palette" class="palette" :style="{ 'background-color': color }"></div>
              </div>
            </div>
            <el-button @click="deleteColor" type="primary" class="clear-color" icon="el-icon-delete">Clear</el-button>
          </template>
        </core-picker>
      </transition>

      <span @click="showPicker" :style="{ 'background-color': colors.hex || '#FFFFFF' }" class="color-span"></span>

      <label class="color-btn color-eyedrop-btn" :class="{ selected: eyedrop_selected }" title="Pick color from Canvas" @click="onClickEyeDrop">
        <i class="el-icon-aim"></i>
      </label>

      <label class="color-btn color-upload-btn" title="Pick color from Image">
        <i class="el-icon-upload"></i>
        <input type="file" class="d-none" @change="showPickerModal" />
      </label>
    </div>
    <div class="picker_modal custom-scroll-h" :class="{ show: modalShow }" id="colorPickerModal">
      <a href="javascript:void(0);" class="btn btn-danger m-btn--sm jgjmodalclosebtn" @click="modalShow = false"><span>×</span></a>
      <canvas id="canvas_picker" class="jgjcanvas" ref="canRef" @mousedown="mouseDownHandler" @mouseup="mouseDown = false" @mousemove="pickCanvasColor"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  props: ['color'],

  data() {
    return {
      colors: {
        hex: null
      },
      visible: false,
      modalShow: false,
      eyedrop_selected: false,
      canvasObj: null,
      canvasCtx: null,
      mouseDown: false,
      palette: ['#ff1493', '#ff5c5c', '#ffbd4a', '#fff952', '#99e265', '#7FFF00', '#35b729', '#44d9e6', '#2eb2ff', '#5271ff', '#8a2be2', '#b760e6', '#ff63b1', '#ffc4fc']
    }
  },

  methods: {
    showPickerModal(e) {
      var F = e.target.files[0]
      if (F) {
        this.modalShow = true
        var reader = new FileReader()
        reader.onload = this.imageIsLoaded
        reader.readAsDataURL(F)
      } else {
        this.modalShow = false
      }
    },
    mouseDownHandler(e) {
      this.mouseDown = true
      this.performAction(e)
    },
    pickCanvasColor(e) {
      if (!this.mouseDown) return false

      this.performAction(e)
    },
    performAction(e) {
      let x = e.pageX - e.target.getBoundingClientRect().left
      let y = e.pageY - e.target.getBoundingClientRect().top
      let img_data = this.canvasCtx.getImageData(x, y, 1, 1).data
      let hex = this.rgbToHex(img_data[0], img_data[1], img_data[2])
      let color = '#' + hex
      this.colorSyncAfterValidate(color)
    },
    rgbToHex(R, G, B) {
      return this.toHex(R) + this.toHex(G) + this.toHex(B)
    },
    toHex(n) {
      n = parseInt(n, 10)
      if (isNaN(n)) return '00'
      n = Math.max(0, Math.min(n, 255))
      return '0123456789ABCDEF'.charAt((n - (n % 16)) / 16) + '0123456789ABCDEF'.charAt(n % 16)
    },
    imageIsLoaded(e) {
      var img = new Image()
      let canvasObj = this.$refs.canRef
      let canvasCtx = canvasObj.getContext('2d')

      this.canvasObj = canvasObj
      this.canvasCtx = canvasCtx

      img.onload = function () {
        canvasObj.width = this.width
        canvasObj.height = this.height

        let old_width = canvasObj.width
        canvasCtx.drawImage(this, 0, 0)
        canvasObj.width = 345
        canvasObj.height = (canvasObj.height * canvasObj.width) / old_width

        canvasCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasObj.width, canvasObj.height)
      }
      img.src = e.target.result
    },

    onClickEyeDrop() {
      this.eyedrop_selected = !this.eyedrop_selected

      this.$emit(`eyeDrop`, this.eyedrop_selected)
    },
    showPicker() {
      // Update child component
      this.getPickerComponent().inputChange(this.colors)

      // Set visible state
      this.visible = true
    },

    hidePicker() {
      let picker = this.$refs['input-color-picker']

      if (picker) {
        // Blur input with color
        picker.blur()

        // Set visible state
        this.visible = false
      }

      this.eyedrop_selected = false
      // this.$emit('eyeDrop', this.eyedrop_selected);
    },

    colorChange(e) {
      this.colorSyncAfterValidate(e.target.value)
      // If color is valid hex color
    },
    colorSyncAfterValidate(color) {
      if (color.length === 7 && this.getPickerComponent().isValidHex(color)) {
        this.colors.hex = color

        // Update child component
        this.$refs['color-picker'].inputChange(this.colors)
      }
    },
    getPickerComponent() {
      return this.$refs['color-picker']
    },

    deleteColor() {
      // Set hex value to null
      this.colors = {}

      // Emit this changes
      this.$emit('input', null)

      // Update data in base component
      this.$refs['color-picker'].inputChange(this.colors)

      // Set visible state
      this.visible = false
    },

    applyPalette(color) {
      // Set hex value from palette
      this.colors.hex = color

      // Update data in base component
      this.$refs['color-picker'].inputChange(this.colors)

      // Emit this changes
      this.$emit('input', this.colors.hex)
    }
  },

  watch: {
    colors: function (colors) {
      this.$emit('input', colors.hex)
    },
    color(value) {
      if (value === 'none') {
        value = null
      }

      // Set color
      this.colors.hex = value
    }
  }
}

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here we check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }

    $(document).ready(function () {
      // Add event click for body
      document.body.addEventListener('click', el.clickOutsideEvent)

      // Add event click for svg content
      let canvas = document.getElementById('svgcanvas')

      if (canvas) {
        canvas.addEventListener('click', el.clickOutsideEvent)
      }
    })
  },

  unbind: function (el) {
    window.removeEventListener('click', el.clickOutsideEvent)
  }
})
</script>

<style lang="scss" scoped>
.picker_modal {
  display: none;
  position: absolute;
  top: 40px;
  left: -20px;
  z-index: 99;
}
.picker_modal.show {
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  width: 324px !important;
  height: auto;
  max-height: 60vh;
  .jgjcanvas {
    background: transparent !important;
    display: inline-block !important;
    vertical-align: baseline !important;
    border: 1px solid #3a58f9;
    cursor: crosshair;
  }
  .jgjmodalclosebtn {
    font-size: 20px !important;
    border-radius: 0;
    padding: 10px;
    line-height: 10px;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    span {
      margin: auto;
    }
  }
}
.color-span {
  cursor: pointer;
  right: 80px !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.color-btn {
  position: absolute;
  height: 40px;
  width: 40px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-bottom: 0 !important;

  &.color-eyedrop-btn {
    right: 40px;
    &.selected {
      background: #3333;
    }
  }
  &.color-upload-btn {
    right: 0;
  }
  i {
    font-size: 36px;
  }
  &:hover {
    background: #3333;
  }
}

//.color-upload-btn {
//  position:absolute;
//  height:40px;
//  right:0;
//  width:40px;
//  border-top-right-radius: 3px;
//  border-bottom-right-radius: 3px;
//  border:1px solid rgba(0, 0, 0, 0.1);
//  cursor:pointer;
//  margin-bottom:0 !important;
//  i {
//    font-size:36px;
//  }
//  &:hover {
//    background:#3333;
//  }
//}
.default-colors {
  color: rgba(14, 19, 24, 0.45);
  margin-left: 4px;
  font-size: 12px;
  text-transform: uppercase;
}
.color-palette {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
  .colors {
    display: flex;
    flex-wrap: wrap;
  }
  .palette {
    display: flex;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
    margin: 4px;
    transition: transform 0.2s;
  }
  .palette:hover {
    transform: scale(1.1);
  }
}
.clear-color {
  margin-left: 4px;
}
</style>
