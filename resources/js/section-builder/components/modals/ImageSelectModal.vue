<template>
  <modal :classes="['select-image']" width="90%" name="select-image" @closed="onClose()">
    <div class="bz-modal">
      <div class="bz-modal-header">
        <div v-if="backPage != null" class="back-icon cursor-pointer" @click="handleBack()">
          <BackIcon />
        </div>
        <div class="close-icon cursor-pointer">
          <button v-if="deleteItems.length > 0" class="delete-button mr-2" @click="toggleDeleteConfirmModal()">
            <DeleteIcon />
            <b class="ml-2">Delete ({{ deleteItems.length }})</b>
          </button>
          <button v-if="currentPage === 'edit'" class="btn bz-btn-default-outline mr-2" @click="downloadCroppedImage()">
            <b>Download</b>
          </button>
          <button v-if="currentPage === 'edit'" class="btn bz-btn-default d-flex align-items-center mr-2" @click="saveCroppedImage()">
            <md-progress-spinner v-if="loading" :md-diameter="16" :md-stroke="2" md-mode="indeterminate" class="text-white mr-2"></md-progress-spinner>
            <b>Save and use</b>
          </button>
          <CloseIcon @click="onClose()" />
        </div>
      </div>
      <div class="bz-modal-body" v-if="currentPage === 'home'">
        <div class="bz-modal-section-1">
          <h2 class="bz-text-black bz-fw-700">Image library</h2>
          <div class="pull-right">
            <button
              class="btn bz-btn-default-outline mr-3"
              @click="
                currentPage = 'search'
                backPage = 'home'
              "
            >
              <SearchIcon /> Search stock photos
            </button>
            <button
              class="btn bz-btn-default"
              @click="
                currentPage = 'upload'
                backPage = 'home'
              "
            >
              <UploadIcon /> Upload image
            </button>
          </div>
        </div>
        <div class="bz-modal-section-2">
          <md-progress-spinner v-if="loading" md-mode="indeterminate"></md-progress-spinner>
          <VueJustifiedLayout v-else :items="myImages" :options="galleryOption" v-slot="{ item, style, index }">
            <div class="position-relative my-image-container" :class="{ delete: deleteItems.includes(item.id) }">
              <div class="over-layer" @click="updateImage(item)">
                <div class="control" @click.stop="photoEdit(item)">
                  <button><CropRotateIcon :fillColor="'#0076df'" /> <b>Edit</b></button>
                  <button @click.stop="deleteItems.toggle(item.id)"><DeleteIcon :fillColor="'#0076df'" /> <b>Delete</b></button>
                </div>
              </div>
              <img :src="item.url" />
            </div>
          </VueJustifiedLayout>
        </div>
      </div>
      <div class="bz-modal-body" v-if="currentPage === 'upload'" :class="{ disabledClick }">
        <div class="w-100 h-100 d-flex align-items-center justify-content-center position-relative">
          <vueDropzone
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
            class="bz-dropzone"
            :useCustomSlot="true"
            :acceptedFiles="'image/*'"
            @vdropzone-files-added="handleFilesAdded"
          >
            <div class="select-photo-container">
              <div>Drag & drop files here</div>
              <div>or</div>
              <button class="btn bz-btn-default" @mouseenter="disabledClick = false" @mouseleave="disabledClick = true">Select a photo</button>
              <div class="mt-5">
                Click here to
                <a @click.stop="fromLink = true" class="link" @mouseenter="disabledClick = false" @mouseleave="disabledClick = true"> use image link </a>
              </div>
            </div>
            <div class="w-100 text-left mt-1" style="max-width: 600px">
              or
              <a @click.stop="currentPage = 'search'" @mouseenter="disabledClick = false" @mouseleave="disabledClick = true" class="link"> search our stock photo library </a>
            </div>
          </vueDropzone>
          <div class="image-link-form" :class="{ active: fromLink }">
            <div>Enter image link</div>
            <div class="d-flex align-items-center">
              <input class="form-control" placeholder="Add from link" />
              <button class="btb bz-btn-default ml-3 py-2 px-3">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div class="bz-modal-body" v-if="currentPage === 'uploading'">
        <div class="w-100 h-100 d-flex align-items-center justify-content-center position-relative">
          <VueJustifiedLayout :items="uploadingImages" :options="galleryOption" v-slot="{ item, style, index }">
            <img :src="item.url" class="uploading-image" :class="{ uploading }" @click="updateImage(item)" />
            <md-progress-bar v-if="uploading" md-mode="indeterminate"></md-progress-bar>
          </VueJustifiedLayout>
        </div>
      </div>
      <div class="bz-modal-body p-0" style="margin-top: 1px" v-if="currentPage === 'edit'">
        <div class="image-editor w-100 d-flex">
          <div class="side-bar">
            <div class="side-menu">
              <hr />
              <div class="menu-item" @click.prevent="tab = 'tune'" :class="{ active: tab === 'tune' }">
                <FilterIcon />
                <span class="pt-1">Tune</span>
              </div>
              <hr />
              <div class="menu-item" @click.prevent="tab = 'crop'" :class="{ active: tab === 'crop' }">
                <CropIcon />
                <span class="pt-1">Crop</span>
              </div>
              <hr />
            </div>
            <div class="side-panel" :class="{ active: tab === 'tune' }">
              <div class="d-flex align-items-center my-1" @click.prevent="turnFilter()"><b class="px-2">Tune</b> <TurnIcon /></div>
              <div class="label">Saturation</div>
              <input type="range" :min="0" :max="2" :step="0.01" v-model="saturation" @input="handleFilterChange" />

              <div class="label">Brightness</div>
              <input type="range" :min="0" :max="2" :step="0.01" v-model="brightness" @input="handleFilterChange" />

              <div class="label">Contrast</div>
              <input type="range" :min="0" :max="2" :step="0.01" v-model="contrast" @input="handleFilterChange" />

              <div class="label">Hue</div>
              <input type="range" :min="0" :max="6.28" :step="0.01" v-model="hue" @input="handleFilterChange" />

              <div class="label">Intensity</div>
              <input type="range" :min="0" :max="1" :step="0.01" v-model="intensity" @input="handleFilterChange" />
            </div>
            <div class="side-panel" :class="{ active: tab === 'crop' }">
              <div class="d-flex align-items-center my-1">
                <b class="px-2">Sizing</b>
              </div>
              <div class="row mt-3">
                <div class="col-4">
                  <div class="d-flex flex-column align-items-center crop-item" :class="{ active: sizing === 'original' }" @click.prevent="sizing = 'original'">
                    <CropOriginalIcon />
                    <span>Original</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="d-flex flex-column align-items-center crop-item" :class="{ active: sizing === 'square' }" @click.prevent="sizing = 'square'">
                    <CropSquareIcon />
                    <span>Square</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="d-flex flex-column align-items-center crop-item" :class="{ active: sizing === 'portrait' }" @click.prevent="sizing = 'portrait'">
                    <CropPortraitIcon />
                    <span>Portrait</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="d-flex flex-column align-items-center crop-item" :class="{ active: sizing === '32' }" @click.prevent="sizing = '32'">
                    <Crop32Icon />
                    <span>3:2</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="d-flex flex-column align-items-center crop-item" :class="{ active: sizing === '169' }" @click.prevent="sizing = '169'">
                    <Crop169Icon />
                    <span>16:9</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="d-flex flex-column align-items-center crop-item" :class="{ active: sizing === '75' }" @click.prevent="sizing = '75'">
                    <Crop75Icon />
                    <span>7:5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="editor-body" :class="{ [tab]: true }" v-if="editingImage">
            <div class="zoomArea" v-if="tab === 'crop'">
              <ZoomOut :fillColor="'#555555'" />
              <input :value="zoom" type="range" :min="1" :max="3" step="any" @input="handleZoomInput" />
              <ZoomIn :fillColor="'#555555'" />
            </div>
            <Cropper
              :src="editingImage.base64"
              ref="cropper"
              :stencilProps="{
                movable: false,
                aspectRatio: aspectRatio
              }"
              class="cropper"
              :auto-zoom="true"
              :resize-image="{ adjustStencil: false }"
              image-restriction="stencil"
              :defaultPosition="{ left: 0, top: 0 }"
              :stencilSize="stencilSize"
              :defaultBoundaries="defaultBoundaries"
              :default-size="defaultSize"
              :debounce="1"
              @change="handleChange"
              @ready="handleReady"
            />

            <div class="rotateArea" v-if="tab === 'crop'">
              <input v-model="rotate" @input="handleRotateChange" type="range" min="0.01" max="180" step="0.01" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ImageDeleteConFirmModal v-if="openDeleteConfirmModal" :onConfirm="deleteMyMedia" :onClose="toggleDeleteConfirmModal" />
  </modal>
</template>

<script>
import BackIcon from '../icons/Back'
import CloseIcon from '../icons/Close'
import SearchIcon from '../icons/Search'
import UploadIcon from '../icons/Upload'
import { mapMutations } from 'vuex'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { VueJustifiedLayout } from 'vue-justified-layout'
import axios from 'axios'
import CropRotateIcon from '../icons/CropRotate'
import DeleteIcon from '../icons/Delete'
import ImageDeleteConFirmModal from './ImageDeleteConFirmModal'
import { Cropper } from 'vue-advanced-cropper'
import FilterIcon from '../icons/Filter'
import CropIcon from '../icons/Crop'
import TurnIcon from '../icons/Turn'
import CropOriginalIcon from '../icons/CropOriginal'
import CropPortraitIcon from '../icons/CropPortrait'
import CropSquareIcon from '../icons/CropSquare'
import Crop32Icon from '../icons/Crop32'
import Crop75Icon from '../icons/Crop75'
import Crop169Icon from '../icons/Crop169'
import ZoomOut from '../icons/ZoomOut'
import ZoomIn from '../icons/ZoomIn'

export default {
  components: {
    ZoomIn,
    ZoomOut,
    ImageDeleteConFirmModal,
    vueDropzone: vue2Dropzone,
    VueJustifiedLayout,
    CropRotateIcon,
    DeleteIcon,
    SearchIcon,
    UploadIcon,
    CloseIcon,
    BackIcon,
    Cropper,
    FilterIcon,
    CropIcon,
    TurnIcon,
    CropOriginalIcon,
    CropPortraitIcon,
    CropSquareIcon,
    Crop32Icon,
    Crop75Icon,
    Crop169Icon
  },
  name: 'ImageSelectModal',
  computed: {
    position() {
      return this.$store.state.imageEditor.position
    },
    path() {
      return this.$store.state.imageEditor.path
    },
    aspectRatio() {
      switch (this.sizing) {
        case 'original': {
          return this.editingImage.width / this.editingImage.height
        }
        case 'square': {
          return 1
        }
        case 'portrait': {
          return this.editingImage.height / this.editingImage.width
        }
        case '32': {
          return 3 / 2
        }
        case '169': {
          return 16 / 9
        }
        case '75': {
          return 7 / 5
        }
      }
    },
    myImages: {
      get() {
        return this.$store.state.stockImages
      },
      set(value) {
        this.$store.commit('setStockImages', value)
      }
    },
    loading() {
      return this.myImages === null
    }
  },
  mounted() {
    this.$modal.show('select-image')
    this.getMyFiles()
  },
  data() {
    return {
      currentPage: 'home', // home, search, edit, upload
      backPage: null,
      disabledClick: true,
      fromLink: false,
      uploadingImages: [],
      uploading: false,
      dropzoneOptions: { url: '/' },
      deleteItems: [],
      openDeleteConfirmModal: false,
      galleryOption: {
        targetRowHeight: 200
      },
      useDefaultUI: true,
      tab: 'tune',
      editingImage: null,
      croppedImage: null,

      zoom: 1,
      rotate: 0,
      zoomInput: false,
      initialScale: 1,
      saturation: 1,
      brightness: 1,
      contrast: 1,
      hue: 3.14,
      intensity: 1,
      timer: null,
      sizing: 'original' //original, square, portrait, 32, 169, 75
    }
  },
  watch: {
    sizing() {
      this.$refs.cropper.reset()
    }
  },
  methods: {
    async getMyFiles() {
      axios.get('/admin/userManage/getStockFiles').then(async ({ data }) => {
        console.log('ImageSelectModal getStockFiles Response', data)
        if (data.status) {
          const promiseImages = data.data.map((item) => this.getImageFromURL(item.url))
          const resolvedImages = await Promise.all(promiseImages)
          this.myImages = resolvedImages.filter((image) => image)
          this.deleteItems = []
        }
      })
    },
    onClose() {
      this.closeImageEditor()
    },
    handleBack() {
      this.currentPage = this.backPage
      switch (this.backPage) {
        case 'home': {
          this.backPage = null
          break
        }
        default: {
          this.backPage = null
        }
      }
    },
    async handleFilesAdded(files) {
      this.uploading = true
      this.currentPage = 'uploading'
      this.uploadingImages = []
      let images = []
      for (let file of files) {
        images.push(this.getImageFromFile(file))
      }
      images = await Promise.all(images)
      this.uploadingImages = images.filter((img) => img)

      axios.post('/admin/userManage/uploadStockFiles', { images: this.uploadingImages }).then((res) => {
        if (res.data.status) {
          let newImages = this.uploadingImages.map((image, index) => {
            return {
              ...image,
              url: res.data.data[index]
            }
          })
          this.uploadingImages = Object.assign([], newImages)
          this.uploading = false
          if (this.uploadingImages.length === 1) {
            this.updateImage(this.uploadingImages[0])
            this.closeImageEditor()
          }
        }
      })
    },
    updateImage(item) {
      if (this.deleteItems.length === 0) {
        if (!this.uploading) {
          this.$store.state.imageEditor.onChange(item)
          this.closeImageEditor()
        }
      } else {
        this.deleteItems.toggle(item.id)
      }
    },
    async getImageFromURL(url) {
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = function () {
          resolve({
            width: img.width,
            height: img.height,
            url: url
          })
        }
        img.onerror = function (e) {
          resolve(false)
        }
        img.src = url
      })
    },
    deleteMyMedia() {
      axios.post('/admin/userManage/deleteStockFiles', { ids: this.deleteItems }).then(({ data }) => {
        if (data.status) {
          this.toggleDeleteConfirmModal()
          this.myImages = this.myImages.filter((item) => !this.deleteItems.includes(item.id))
          this.myImages = Object.assign([], this.myImages)
          this.deleteItems = []
        }
      })
    },
    toggleDeleteConfirmModal() {
      this.openDeleteConfirmModal = !this.openDeleteConfirmModal
    },
    async getImageFromFile(file) {
      return new Promise((resolve) => {
        let img = new Image()
        img.onload = function () {
          let oFReader = new FileReader()
          oFReader.readAsDataURL(file)
          oFReader.onload = function () {
            resolve({
              width: img.width,
              height: img.height,
              url: this.result
            })
          }
        }
        img.onerror = function () {
          resolve(false)
        }
        img.src = window.URL.createObjectURL(file)
      })
    },
    async photoEdit(item) {
      this.currentPage = 'edit'
      this.backPage = 'home'
      let base64 = await this.getBase64FromUrl(item.url)
      this.editingImage = {
        ...item,
        base64: base64
      }
    },
    async getBase64FromUrl(url) {
      const data = await fetch(url + '?1')
      const blob = await data.blob()
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          const base64data = reader.result
          resolve(base64data)
        }
      })
    },
    defaultBoundaries({ cropper, imageSize }) {
      return {
        width: cropper.clientWidth,
        height: cropper.clientHeight
      }
    },
    defaultSize({ imageSize, visibleArea }) {
      return {
        width: (visibleArea || imageSize).width,
        height: (visibleArea || imageSize).height
      }
    },
    stencilSize({ boundaries, aspectRatio }) {
      return {
        height: boundaries.height * 0.6,
        width: boundaries.height * 0.6 * this.aspectRatio
      }
    },
    handleChange(e) {
      if (this.zoomInput === false) {
        this.zoom = e.image.transforms.scaleX / this.initialScale
      }
      this.applyFilter()
    },
    handleReady() {
      this.initialScale = this.$refs.cropper.image.transforms.scaleX
    },
    handleZoomInput(e) {
      this.zoomInput = true
      if (this.timer) {
        clearTimeout(this.timer)
      }
      let value = e.target.value
      this.timer = setTimeout(() => {
        let currentScale = this.$refs.cropper.image.transforms.scaleX
        let newScale = parseFloat(value) * this.initialScale
        this.$refs.cropper.zoom(newScale / currentScale)
        this.zoomInput = false
        this.timer = null
      }, 10)
    },
    handleRotateChange() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        let currentRotate = this.$refs.cropper.image.transforms.rotate
        this.$refs.cropper.rotate(this.rotate - currentRotate)
        this.timer = null
      }, 10)
    },
    getFilter() {
      return `saturate(${this.saturation * 100}%) brightness(${this.brightness})  contrast(${this.contrast * 100}%) hue-rotate(${((this.hue - 3.14) * 180) / Math.PI}deg)`
    },
    applyFilter() {
      let canvas = this.$refs.cropper.getResult().canvas
      let ctx = canvas.getContext('2d')
      ctx.filter = this.getFilter()
      ctx.drawImage(canvas, 0, 0)
      this.croppedImage = canvas.toDataURL()
    },
    handleFilterChange() {
      let filter = this.getFilter()
      this.$refs.cropper.$el.getElementsByTagName('img')[0].style.filter = filter
      this.$refs.cropper.$el.getElementsByTagName('img')[1].style.filter = filter
      this.applyFilter()
    },
    downloadCroppedImage() {
      let image = this.croppedImage
      const link = document.createElement('a')
      link.href = image
      link.setAttribute('download', 'cropped')
      document.body.appendChild(link)
      link.click()
    },
    saveCroppedImage() {
      this.loading = true
      axios
        .post('/admin/userManage/uploadStockFiles', { images: [{ url: this.croppedImage }] })
        .then((res) => {
          if (res.data.status) {
            this.updateImage({ url: res.data.data[0] })
            this.closeImageEditor()
          }
          this.loading = false
        })
        .catch((e) => {
          console.log(e)
          this.loading = false
        })
    },
    turnFilter() {
      this.saturation = 1
      this.brightness = 1
      this.contrast = 1
      this.hue = 3.14
      this.handleFilterChange()
    },
    ...mapMutations(['closeImageEditor', 'updateSectionData'])
  }
}
</script>

<style lang="scss">
$activeColor: #0076df;
.select-image {
  max-width: 1480px;
  align-self: center;
  left: 0 !important;
  margin: auto;
  height: 80vh !important;
  top: 10vh !important;
  overflow: hidden;
  .justified-container {
    width: 100%;
    height: 100% !important;
    background-color: white;
    overflow-y: auto;
    overflow-x: hidden;
    .justified-item {
      height: 200px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .bz-modal {
    width: 100%;
    height: 100%;
    .bz-modal-header {
      width: 100%;
      height: 60px;
      box-shadow: 0 0 8px 4px #00000034;
      align-items: center;
      display: flex;
      padding: 5px 20px;

      .close-icon {
        display: flex;
        margin-left: auto;
        align-items: center;

        .delete-button {
          margin: 4px 4px;
          border: none;
          outline: none;
          border-radius: 4px;
          box-shadow: 0 0 4px 2px #00000012;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #ff850f;
          padding: 7px 15px;

          &:hover {
            background-color: #d93f02;
          }
        }
      }
    }

    .bz-modal-body {
      width: 100%;
      height: calc(100% - 60px);
      padding: 20px;

      .bz-modal-section-1 {
        width: 100%;
        align-items: center;
        display: flex;

        .pull-right {
          margin-left: auto;
        }
      }

      .bz-modal-section-2 {
        margin-top: 20px;
        width: 100%;
        align-items: center;
        display: flex;
        justify-content: center;
        height: calc(100% - 70px);
      }

      .bz-dropzone {
        width: 100%;
        height: 100%;
        border: none;
        box-shadow: none;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;

        .dz-message {
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
          flex-direction: column;
        }
      }

      &.disabledClick {
        &:hover {
          pointer-events: none;
        }
      }

      .select-photo-container {
        width: 100%;
        height: 100%;
        border: 2px dashed rgb(204, 204, 204);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 600px;
        max-height: min(300px, 100% - 200px);
      }

      .image-link-form {
        bottom: -100px;
        width: 100%;
        position: absolute;
        left: 0;
        &.active {
          bottom: 0;
          transition: 0.5s;
        }
      }
    }
  }
  .link {
    color: #0076df;
    text-decoration: underline;
    padding: 10px 5px;
    border-radius: 4px;
    &:hover {
      background-color: rgba(0, 118, 223, 0.04);
      cursor: pointer;
    }
  }
  .uploading-image {
    &.uploading {
      pointer-events: none;
    }
    &:not(.uploading) {
      &:hover {
        border: solid 4px #0076df;
        cursor: pointer;
      }
    }
  }
  .my-image-container {
    height: inherit;

    &.delete {
      border: solid 3px crimson;
    }

    .control {
      position: absolute;
      right: 0;
      top: 0;
      align-items: center;
      justify-content: space-between;
      margin-top: 5px;
      display: none;

      button {
        margin: 4px 4px;
        border: none;
        outline: none;
        border-radius: 4px;
        box-shadow: 0 0 4px 2px #00000012;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        padding: 4px 10px;

        &:hover {
          background-color: wheat;
        }

        b {
          padding-left: 4px;
          color: $activeColor;
        }
      }
    }

    &:hover {
      .control {
        display: flex;
      }

      .over-layer {
        height: inherit;
        width: 100%;
        position: absolute;
        background-color: #00000034;
      }

      &:not(.delete) {
        img {
          border: solid 3px #0076df;
          cursor: pointer;
        }
      }
    }
  }
  .image-editor {
    .side-bar {
      width: 280px;
      display: flex;

      hr {
        margin-top: 0;
        margin-bottom: 0;
      }

      .side-menu {
        background-color: rgb(246, 246, 246);
        width: 80px;
        height: 100%;
        padding-top: 30px;
        box-shadow: inset 0 0 0 1px #8080803f;

        .menu-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          padding: 14px 0;
          cursor: pointer;

          &.active {
            color: $activeColor;
            background-color: white;
          }
        }
      }
      .side-panel {
        width: 200px;
        background-color: white;
        display: none;
        flex-direction: column;
        padding: 5px;

        &.active {
          display: flex;
        }

        .slider-horizontal {
          height: 10px;
          min-width: 190px;
          padding: 0;
          margin: 0;

          .slider-wrapper {
            top: 5px;
          }
          .slider-thumb,
          .slider-thumb-label,
          .slider-track-fill {
            background-color: $activeColor;
          }
        }

        .label {
          padding-left: 7px;
          margin-top: 20px;
        }

        .row {
          margin-right: -5px;
          margin-left: -5px;
          flex: unset;
        }

        .col-4 {
          padding-right: 6px;
          padding-left: 6px;
        }

        .crop-item {
          padding: 6px;
          border-radius: 4px;
          &.active,
          &:hover {
            background-color: rgba(0, 118, 223, 0.1);
          }
        }
      }
    }
    .editor-body {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(240, 240, 240);
      width: calc(100% - 280px);
      height: 100%;
      position: relative;
      overflow: hidden;

      .zoomArea {
        position: absolute;
        width: 100%;
        top: calc(10% - 30px);
        left: 0;
        z-index: 99999999;
        display: flex;
        align-items: center;
        justify-content: center;

        input {
          width: 50%;
        }
      }

      .rotateArea {
        position: absolute;
        width: 100%;
        bottom: calc(10% - 30px);
        left: 0;
        z-index: 99999999;
        display: flex;
        align-items: center;
        justify-content: center;

        input {
          width: 50%;
        }
      }

      .cropper {
        height: 100%;
        width: 100%;
        .vue-advanced-cropper__image-wrapper {
          overflow: unset !important;
        }
        .vue-advanced-cropper__background {
          background-color: transparent !important;
        }
        img {
          object-fit: contain !important;
        }
      }

      &.crop {
        .vue-advanced-cropper__foreground {
          opacity: 0.7;
          background-color: white !important;
        }
      }

      &.tune {
        .vue-advanced-cropper__foreground {
          opacity: 1;
          background-color: rgb(240, 240, 240) !important;
        }
      }
    }
  }
}
</style>
