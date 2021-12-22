<template>
  <div class="bz-el--image-root" :style="imageWrapperStyle">
    <div class="image-wrapper" :class="{ [resizeMode]: true }">
      <div class="tool-bar" :class="{ editing: editing }" v-if="edit">
        <button v-tooltip="'Edit image'" @click.prevent.stop="openSizeForm">
          <photo-size-select-large-icon :fillColor="'#555555'" />
        </button>
        <button v-tooltip="'Select image'" @click.prevent="openSelectImage()">
          <image-icon :fillColor="'#555555'" />
        </button>
        <button v-tooltip="'Link'" @click.prevent="openAttachLinkModal()">
          <link-icon :fillColor="'#555555'" />
        </button>
        <button v-tooltip="'Edit alt text'" @click.prevent="openAltTextModal()">
          <alt-icon :fillColor="'#555555'" />
        </button>
      </div>
      <div class="image" :class="{ edit }" :style="imageStyle2">
        <template v-if="fitHeight">
          <a v-if="disableAspectView" :href="data.link" class="bz-h-100 bz-w-100" style="display: block; position: absolute">
            <div class="image-container" :style="imageContainerStyle">
              <img :src="imageHost + data.src" :style="imageStyle" ref="imageRef" class="bz-image" :alt="data.alt" />
            </div>
          </a>
        </template>
        <template v-else>
          <a v-if="disableAspectView" :href="data.link" class="bz-h-100 bz-w-100" style="display: block">
            <div class="image-container" :style="imageContainerStyle">
              <img :src="imageHost + data.src" :style="imageStyle" ref="imageRef" class="bz-image" :alt="data.alt" />
            </div>
          </a>
          <aspect-view v-else :ratio="ratio">
            <bz-link :link="link">
              <div class="image-container" ref="imageContainerRef" :style="imageContainerStyle">
                <div :style="backgroundImageStyle" ref="imageRef" @mousedown.prevent.stop="handleMouseDown"></div>
              </div>
            </bz-link>
          </aspect-view>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import BzElement from '../BzElement'
import AspectView from './BzAspectView'
import ImageIcon from '../icons/Image'
import PhotoSizeSelectLargeIcon from '../icons/PhotoSizeSelectLarge'
import LinkIcon from '../icons/Link'
import AltIcon from '../icons/Alt'
import { mapMutations } from 'vuex'
import ZoomInIcon from '../icons/ZoomIn'
import ZoomOutIcon from '../icons/ZoomOut'
import BzLink from './BzLink'

export default {
  components: {
    BzLink,
    ZoomOutIcon,
    ZoomInIcon,
    AltIcon,
    LinkIcon,
    PhotoSizeSelectLargeIcon,
    ImageIcon,
    AspectView
  },
  props: {
    disableAspectView: {
      type: Boolean,
      default: false
    },
    ratio: {
      type: Number,
      default: 1
    },
    maxHeight: {
      type: Number,
      default: 0
    },
    resizeMode: {
      type: String,
      default: 'full'
    },
    fitHeight: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object,
      default: () => {
        return {}
      }
    },
    circle: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    rounded: {
      type: [Boolean, Number],
      default: false
    }
  },
  extends: BzElement,
  name: 'bz-image',
  data() {
    return {
      editing: false,
      form: '',
      uuid: null,
      mouseMoveEventTimer: null,
      replacing: false
    }
  },
  created() {
    this.uuid = this.$uuid.v4()
  },
  computed: {
    imageStyle2() {
      if (this.rounded === true) {
        return {
          borderRadius: '100%',
          ...(this.styles.base || {})
        }
      }

      if (typeof this.rounded === 'number') {
        return {
          borderRadius: this.rounded + 'px',
          ...(this.styles.base || {})
        }
      }
    },
    imageWrapperStyle() {
      let borderRadius = 0

      if (this.rounded === true) {
        borderRadius = '100%'
      }

      if (typeof this.rounded === 'number') {
        borderRadius = this.rounded + 'px'
      }

      if (this.maxHeight) {
        return {
          borderRadius,
          width: this.width,
          maxHeight: this.maxHeight + 'px',
          ...(this.styles.root || {})
        }
      }
      return {
        borderRadius,
        ...(this.styles.root || {})
      }
    },
    imageContainerStyle() {
      return {
        ...(this.circle ? { borderRadius: '10000px' } : {}),
        ...(this.styles.image || {})
      }
    },
    backgroundImageStyle() {
      let backgroundSize = this.resizeMode
      if (this.resizeMode === 'full') {
        backgroundSize = 'cover'
      }
      const backgroundPositionX = this.style.backgroundPositionX === undefined ? 50 : this.style.backgroundPositionX
      const backgroundPositionY = this.style.backgroundPositionY === undefined ? 50 : this.style.backgroundPositionY

      // Bizina sites loaded sample image (for template) from bizinabox so we need to prepend image host domain (dev, test, production popose)
      // But if user customize that images, we don't have to prepend host since they are stored on the S3 storage
      let imageUrl = this.data.src
      if (imageUrl.indexOf('http') === -1) {
        imageUrl = this.imageHost + imageUrl
      }

      return {
        width: '100%',
        height: '100%',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: backgroundSize,
        backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
        transform: `scale(${this.style.scale || 1})`,
        position: 'absolute',
        left: (this.style.left || 0) + 'px',
        top: (this.style.top || 0) + 'px'
      }
    },
    imageStyle() {
      if (this.resizeMode === 'full') {
        return {
          transform: `scale(${this.style.scale || 1})`,
          height: '100%',
          width: '100%',
          objectFit: 'cover'
        }
      } else {
        return {
          transform: `scale(${this.style.scale || 1})`,
          objectFit: this.resizeMode
        }
      }
    },
    link() {
      if (this.data.link) {
        return this.data.link
      }
      return {
        type: 'no-link',
        value: 'javascript:void(0)'
      }
    },
    src() {
      return this.data.src
    },
    altText() {
      return this.data.altText
    },
    style: {
      get() {
        return this.data.style || {}
      },
      set(value) {
        this.data = {
          ...this.data,
          style: value
        }
      }
    },
    scale: {
      get() {
        return this.style.scale || 1
      },
      set(value) {
        this.style = {
          ...this.style,
          scale: value
        }
      }
    }
  },
  watch: {
    style(newStyle) {
      this.$nextTick(() => {
        const imageRect = this.$refs['imageRef'].getBoundingClientRect()
        const containerRect = this.$refs['imageContainerRef'].getBoundingClientRect()

        if (containerRect.top < imageRect.top) {
          newStyle.top = newStyle.top - (imageRect.top - containerRect.top)
          this.style = newStyle
        }

        if (containerRect.bottom > imageRect.bottom) {
          newStyle.top = newStyle.top + (containerRect.bottom - imageRect.bottom)
          this.style = newStyle
        }

        if (containerRect.left < imageRect.left) {
          newStyle.left = newStyle.left - (imageRect.left - containerRect.left)
          this.style = newStyle
        }

        if (containerRect.right > imageRect.right) {
          newStyle.left = newStyle.left + (containerRect.right - imageRect.right)
          this.style = newStyle
        }
      })
    }
  },
  methods: {
    handleMouseDown(e) {
      const self = this
      self.$refs['imageRef'].addEventListener('click', this.closeSizeForm)
      if (this.edit && this.replacing && self.mouseMoveEventTimer === null) {
        this.mouseMoveEventTimer = setTimeout(() => {
          self.$refs['imageRef'].removeEventListener('click', self.closeSizeForm)

          let clientX = e.clientX
          let clientY = e.clientY

          let left = this.style.left || 0
          let top = this.style.top || 0
          let backgroundPositionX = self.style.backgroundPositionX === undefined ? 50 : self.style.backgroundPositionX
          let backgroundPositionY = self.style.backgroundPositionY === undefined ? 50 : self.style.backgroundPositionY

          function handleMouseMove(e) {
            if (self.$refs['imageRef']) {
              const deltaX = e.clientX - clientX
              const deltaY = e.clientY - clientY

              const imageRect = self.$refs['imageRef'].getBoundingClientRect()
              const containerRect = self.$refs['imageContainerRef'].getBoundingClientRect()

              if (deltaX < 0 && imageRect.right <= containerRect.right) {
                backgroundPositionX += 2
                backgroundPositionX = Math.min(backgroundPositionX, 100)
              } else if (deltaX > 0 && imageRect.left >= containerRect.left) {
                backgroundPositionX -= 2
                backgroundPositionX = Math.max(backgroundPositionX, 0)
              }

              if (deltaY < 0 && imageRect.bottom >= containerRect.bottom) {
                backgroundPositionY += 2
                backgroundPositionY = Math.min(backgroundPositionY, 100)
              } else if (deltaY > 0 && imageRect.top <= containerRect.top) {
                backgroundPositionY -= 2
                backgroundPositionY = Math.max(backgroundPositionY, 0)
              }

              self.style = {
                ...self.style,
                left: left + deltaX,
                top: top + deltaY,
                backgroundPositionX,
                backgroundPositionY
              }
            }
          }

          document.addEventListener('mousemove', handleMouseMove)
          document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', handleMouseMove)
            clearTimeout(self.mouseMoveEventTimer)
            self.mouseMoveEventTimer = null
          })
        }, 100)
      } else {
        clearTimeout(this.mouseMoveEventTimer)
        self.mouseMoveEventTimer = null
      }
    },
    closeSizeForm(event) {
      const $target = $(event.target)
      let formId = `bzFormZoomingImage-${this.uuid}`
      const sizeForm = $(`#${formId}`)
      if (!$target.closest(`#${formId}`).length) {
        sizeForm.remove()
        this.editing = false
        this.replacing = false
      }
    },
    openSizeForm() {
      const self = this
      this.editing = true
      let rect = this.$el.getBoundingClientRect()
      let formId = `bzFormZoomingImage-${this.uuid}`

      $('[id^="bzFormZoomingImage-"]')
        .not('#' + formId)
        .remove()

      if (document.getElementById(formId) === null) {
        self.replacing = true

        const sizeForm = document.createElement('div')

        sizeForm.setAttribute('id', formId)

        /**
         * add style to the form zooming out/in image
         */
        const elementWidth = rect.right - rect.left
        sizeForm.style.left = rect.left + elementWidth / 2 - 140 + 'px'
        sizeForm.style.top = rect.bottom + 20 + 'px'
        sizeForm.style.position = 'absolute'
        sizeForm.style.width = '280px'
        sizeForm.style.height = '40px'
        sizeForm.style.backgroundColor = 'white'
        sizeForm.style.borderRadius = '2px'
        sizeForm.style.boxShadow = '0 0 2px 1px #00000023'
        sizeForm.style.display = 'flex'
        sizeForm.style.alignItems = 'center'
        sizeForm.style.justifyContent = 'space-between'
        sizeForm.style.padding = '0 5px'
        sizeForm.style.zIndex = 13

        /**
         * add outside click event to hind the form
         */
        document.addEventListener('mousedown', self.closeSizeForm)

        /**
         * add zoom-in icon
         */
        const zoomInIcon = document.createElement('span')
        zoomInIcon.className = 'material-design-icon delete-icon'
        zoomInIcon.innerHTML = `
                    <svg fill="#555555" class="material-design-icon__svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path>
                    </svg>`

        sizeForm.appendChild(zoomInIcon)

        /**
         * add input to control zoom level of the image
         */

        const input = document.createElement('input')
        input.setAttribute('value', this.scale)
        input.setAttribute('type', 'range')
        input.setAttribute('min', '1')
        input.setAttribute('max', '10')
        input.setAttribute('hidden', 'true')
        input.setAttribute('any', 'any')
        input.style.width = '70%'

        sizeForm.appendChild(input)

        const slider = document.createElement('span')
        slider.className = 'bz-slider'

        const rail = document.createElement('span')
        rail.className = 'bz-rail'

        const track = document.createElement('span')
        track.className = 'bz-track'

        const thumb = document.createElement('span')
        thumb.className = 'bz-thumb'

        slider.appendChild(rail)
        slider.appendChild(track)
        slider.appendChild(thumb)

        sizeForm.appendChild(slider)

        /**
         * add zoom-out icon
         */
        const zoomOutIcon = document.createElement('span')
        zoomOutIcon.className = 'material-design-icon delete-icon'
        zoomOutIcon.innerHTML = `
                    <svg fill="#555555" class="material-design-icon__svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                      <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path>
                    </svg>`

        sizeForm.appendChild(zoomOutIcon)

        document.body.appendChild(sizeForm)

        this.$nextTick(() => {
          let oldX = 0
          let pickX = $(rail).width() / (parseInt(input.max) - parseInt(input.min))

          function getWith() {
            return pickX * (parseFloat(self.scale) - parseInt(input.min)) + 'px'
          }

          track.style.width = getWith()
          thumb.style.left = getWith()

          const handleInputChange = function () {
            track.style.width = getWith()
            thumb.style.left = getWith()
          }

          const handleThumbDrag = function (e) {
            e.preventDefault()

            const currentScale = parseFloat(self.scale)
            const minValue = parseFloat(input.min)
            const maxValue = parseFloat(input.max)

            if (oldX === 0) {
              oldX = e.pageX
            } else {
              let deltaX = e.pageX - oldX
              let newValue = currentScale + deltaX / pickX

              if (newValue > maxValue) {
                newValue = maxValue
              }

              if (newValue < minValue) {
                newValue = minValue
              }

              self.scale = newValue

              handleInputChange()

              oldX = e.pageX
            }
          }

          thumb.addEventListener('mousedown', function (e) {
            e.preventDefault()
            this.classList.add('active')
            document.addEventListener('mousemove', handleThumbDrag)
          })

          document.addEventListener('mouseup', function (e) {
            e.preventDefault()
            thumb.classList.remove('active')
            document.removeEventListener('mousemove', handleThumbDrag)
          })
        })
      }
    },
    openSelectImage() {
      this.editing = true
      this.openImageEditor({
        onChange: ({ url }) => {
          this.$emit('input', { ...this.value, src: url })
        }
      })
    },
    openAttachLinkModal() {
      this.editing = true
      this.openAttachLink({
        link: this.link,
        onChange: (link) => {
          this.$emit('input', { ...this.value, link: link })
        }
      })
    },
    openAltTextModal() {
      this.editing = true
      this.openAltText({
        onChange: (text) => {
          this.$emit('input', { ...this.value, altText: text })
        },
        value: this.altText
      })
    },
    ...mapMutations({
      openImageEditor: 'openImageEditor',
      openAttachLink: 'openAttachLink',
      openAltText: 'openAltText'
    })
  }
}
</script>
<style lang="scss">
.bz-el--image-root {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  .image-wrapper {
    width: 100%;
    position: relative;
    cursor: pointer;
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
    height: inherit;

    &.full {
      height: 100%;
    }

    .image {
      width: 100%;
      height: 100%;
      overflow: hidden;

      .image-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        transform: scale(1);
        transition: 0.4s;
        position: relative;

        img {
          position: absolute;
        }
      }

      &.edit {
        .image-container {
          &:hover {
            transition: 0.4s;
            transform: scale(1.1);
          }
        }
      }

      .bz-image {
        width: 100%;
        height: 100%;
      }
    }

    .tool-bar {
      position: absolute;
      top: calc(50% - 30px);
      left: calc(50% - 70px);
      width: 140px;
      height: 35px;
      background-color: white;
      border-radius: 2px;
      opacity: 0;
      box-shadow: 0 0 2px 1px #00000012;
      z-index: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;

      button {
        background-color: transparent;
        border: none;
        outline: none;
        padding: 2px;
        margin: 0;
        border-radius: 2px;

        &:hover {
          background-color: #cfcfcf;
        }
      }
    }

    &:hover {
      .tool-bar {
        &:not(.editing) {
          opacity: 1;
          transition: 0.2s;
          z-index: 12;
        }
      }
    }
  }

  .image-size {
    margin-top: calc(50% - 50px);
    margin-left: calc(50% - 120px);
    position: fixed;
    width: 240px;
    height: 40px;
    background-color: white;
    border-radius: 2px;
    box-shadow: 0 0 2px 1px #00000023;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    z-index: 13;

    input {
      width: 180px;

      &[type='range']::-webkit-slider-runnable-track {
        height: 3px;
        border-radius: 2px;
      }

      &[type='range']::-webkit-slider-thumb {
        margin-top: -7px;
        width: 6px !important;
        height: 6px !important;
        background: #ffffff;
        border: 1px solid #000000;
        border-radius: 3px;
        cursor: pointer;
        -webkit-appearance: none;
      }
    }
  }
}
</style>
