<template>
  <transition name="slideUp">
    <footer v-show="isMounted">
      <!-- To Home button-->
      <a :href="getBackStepUrl()" v-if="isActive(steps.choose)" class="animated-button back-button" title="home page" itemprop="url" hreflang="en">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span class="arrow-icon arrow-left-icon"></span>
        Home
      </a>
      <!-- To Home button-->

      <!-- Preview logo button-->
      <el-button
        @click="showPreview"
        v-if="isActive(steps.edit) || isActive(steps.userEdit)"
        v-loading="!states.buttons.preview.available"
        :disabled="!states.buttons.preview.available"
        type="primary"
        class="button button-preview"
        icon="el-icon-view"
        >Preview
      </el-button>
      <!-- Preview logo button-->

      <!-- Choose logo button-->
      <transition name="bounceUp">
        <a
          :href="getNextStepUrl()"
          v-if="isActive(steps.choose) && buttons.nextButton.isVisible"
          class="animated-button animate-button choose-logo-button"
          title="choose logo"
          itemprop="url"
          hreflang="en"
        >
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
          {{ editText }}
          <span class="arrow-icon arrow-right-icon"></span>
        </a>
      </transition>
      <!-- Choose logo button -->

      <el-button
        @click="saveLogo(0)"
        v-if="isActive(steps.edit) || isActive(steps.userEdit)"
        v-loading="!states.buttons.save.available"
        :disabled="!states.buttons.save.available"
        type="primary"
        class="button button-preview"
        icon="el-icon-save"
        >Save
      </el-button>

      <el-button
        @click="saveLogo(1)"
        v-if="isActive(steps.edit) || isActive(steps.userEdit)"
        v-loading="!states.buttons.save.available"
        :disabled="!states.buttons.save.available"
        type="primary"
        class="button button-preview"
        icon="el-icon-save"
        >Save & Exit
      </el-button>

      <!--Download button-->
      <el-dropdown
        @command="clickDownload"
        v-if="(isActive(steps.edit) || isActive(steps.userEdit)) && auth"
        v-loading="!states.buttons.download.available"
        :disabled="!states.buttons.download.available"
        trigger="click"
      >
        <el-button type="primary" class="button button-download"> Download<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="products.image" class="download-logotype"> <i class="fa fa-picture-o" aria-hidden="true"></i> {{ editorType }} </el-dropdown-item>
          <el-dropdown-item :command="products.package" class="download-package"> <i class="fa fa-archive" aria-hidden="true"></i> Full design package </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-button
        type="primary"
        v-loading="!states.buttons.download.available"
        :disabled="!states.buttons.download.available"
        v-if="(isActive(steps.edit) || isActive(steps.userEdit)) && !auth"
        @click="clickDownload(products.package)"
        class="button button-download"
      >
        Download
      </el-button>
      <!--Download button-->
      <div class="f_modal" v-if="modalOpen">
        <div class="f_modal_overlay" @click="modalOpen = !modalOpen"></div>
        <div class="f_modal_bg">
          <span class="f_modal_close" @click="modalOpen = !modalOpen">×</span>

          <div class="container position-relative">
            <div class="modal_area row justify-content-center">
              <div class="w-100">
                <div class="error_div" v-text="error" v-if="error"></div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" id="version1" value="override" v-model="version_type" />
                  <label class="form-check-label h-cursor" for="version1"> Override Current Version </label>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="current_version" />
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" id="version2" v-model="version_type" value="create" />
                  <label class="form-check-label h-cursor" for="version2"> Create New Version </label>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="new_version" placeholder="Name of new version" />
                </div>
                <div class="form-group">
                  <el-button
                    @click="saveLogoWindow"
                    v-loading="!states.buttons.save.available"
                    :disabled="!states.buttons.save.available"
                    type="primary"
                    class="button button-preview"
                    icon="el-icon-save"
                    >Save
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </transition>
</template>

<script>
import stepsNavigation from '../../mixins/steps-navigation'
import appMixin from '../../mixins/app-mixin'
import downloadProduct from '../../mixins/download-product'
import notification from '../../mixins/notifications'

export default {
  name: 'footer-page',

  mixins: [stepsNavigation, appMixin, downloadProduct, notification],

  data() {
    return {
      modalOpen: false,
      auth: false,
      isMounted: false,
      svgData: window.svgData,
      product: null,
      buttons: {
        nextButton: {
          isVisible: true
        }
      },
      exit: 0,
      current_version: '',
      original_version: '',
      new_version: '',
      version_type: 'override',
      error: '',
      viewLiveAfterSaving: false
    }
  },
  computed: {
    editText() {
      if (this.editorType === 'logotypes') {
        return 'Edit Logo'
      } else if (this.editorType === 'favicon') {
        return 'Edit Favicon'
      }
    }
  },
  mounted() {
    this.isMounted = true
    this.auth = !!window.user

    if (window.svgData) {
      this.original_version = window.svgData.version
      if (window.svgData.version === 'first_version') {
        this.current_version = 'default'
      } else {
        this.current_version = window.svgData.version
      }
    }

    EventBus.$on('editor.save-logo', () => {
      this.saveLogo(0)
    })
  },

  created() {
    EventBus.$on('editor.logotype.saved', () => {
      // Hide preloader on buttons
      console.log('footer page > product', this.product)
      console.log('footer page > products', this.products)
      switch (this.product) {
        case this.products.image:
          if (this.auth) {
            console.log('footer page > svgData', this.svgData)
            this.downloadLogo(this.svgData)
          } else {
            this.saveLogo(0)
          }
          break
        case this.products.package:
          if (this.auth) {
            EventBus.$emit('leave.window.allow')
            this.downloadPackage(this.svgData)
          } else {
            this.saveLogo(1)
          }
          break
      }
    })
    EventBus.$on('editor.saveLogoFinal.saved', ([exit]) => {
      // Hide preloader on buttons

      this.states.buttons.save.available = true
      this.modalOpen = false
      if (exit === 1) {
        EventBus.$emit('leave.window.allow')

        this.notification({
          title: 'Success!',
          type: 'success',
          message: 'Successfully saved! Redirecting to dashboard...'
        })
        setTimeout(function () {
          window.location.href = '/account/' + this.editorType
        }, 1000)
      } else {
        this.notification({
          title: 'Success!',
          type: 'success',
          message: 'Successfully save!'
        })
      }
    })

    EventBus.$on('editor.saveLogoFinal.failed', () => {
      // Hide preloader on buttons
      this.states.buttons.save.available = true
      this.modalOpen = false
      this.notification({
        title: "Can't save " + this.editorType,
        type: 'error',
        message: 'Something went to wrong, Try again, please'
      })
    })

    EventBus.$on('footer.button-next.hide', () => {
      this.buttons.nextButton.isVisible = false
    })

    EventBus.$on('footer.button-next.show', () => {
      this.buttons.nextButton.isVisible = true
    })

    EventBus.$on('view-live-submit', () => {
      this.viewLiveAfterSaving = true
      this.saveLogo(0)
    })
  },

  beforeDestroy() {
    EventBus.$off('logotype.preview.set')
    EventBus.$off('editor.logotype.saved')
  },

  methods: {
    saveLogoWindow() {
      let data = {}
      data.exit = this.exit
      if (this.version_type === 'override') {
        if (!this.current_version) {
          this.error = 'The name of current version is required.'
          return
        }
        data.version_type = 'override'
        data.version_name = this.current_version
      } else if (this.version_type === 'create') {
        if (!this.new_version) {
          this.error = 'The name of new version is required.'
          return
        }
        data.version_type = 'create'
        data.version_name = this.new_version
      }

      if (this.viewLiveAfterSaving) {
        data.viewLiveAfterSaving = this.viewLiveAfterSaving
      }

      this.states.buttons.save.available = false

      EventBus.$emit('editor.preview.saveLogo', [data])
    },
    saveLogo(exit = 0) {
      this.exit = exit
      if (this.original_version === 'first_version') {
        this.saveLogoWindow()
      } else {
        this.modalOpen = true
      }
      // Set preloader to "Preview" button
      // this.states.buttons.save.available = false;

      // Emit event for showing modal
      // EventBus.$emit('editor.preview.saveLogo', [exit]);
    },
    showPreview() {
      // Set preloader to "Preview" button
      this.states.buttons.preview.available = false

      // Emit event for showing modal
      EventBus.$emit('editor.preview.show')
    },

    getBackStepName() {
      if (this.currentStep) {
        if (this.currentStep.name === `user.${this.editorType}.live`) {
          return 'Home'
        }

        if (this.currentStep.name === `${this.editorType}.edit`) {
          return 'New logo'
        }

        if (this.currentStep.name === `${this.editorType}.download.package`) {
          return 'Edit logo'
        }
      }

      return 'New logo'
    },

    getBackStepUrl() {
      if (this.currentStep) {
        if (this.currentStep.name === `user.${this.editorType}.live`) {
          return route('home')
        }

        if (this.currentStep.name === `${this.editorType}.edit`) {
          return route('index')
        }
      }

      return route(`user.${this.editorType}.live`)
    },

    getNextStepUrl() {
      if (this.currentStep.name === `user.${this.editorType}.live`) {
        return _.find(this.steps, ['name', this.editorType + '.edit']).route
      }

      if (this.currentStep.name === +`${this.editorType}.edit` || this.currentStep.name === `user.${this.editorType}.edit`) {
        return route(`${this.editorType}.download.package`, this.logotype.hash)
      }
    },

    clickDownload(product) {
      // Show preloader on buttons
      this.states.buttons.download.available = false

      // Save current logo version
      EventBus.$emit('editor.logotype.save')

      switch (product) {
        case this.products.image:
          this.product = this.products.image
          break
        case this.products.package:
          this.product = this.products.package
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';

.svg-editor {
  .mobile-editor {
    footer {
      display: none;
    }
  }
}

.error_div {
  border: 1px solid red;
  margin-bottom: 10px;
  padding: 5px;
}

footer {
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
  background: #fff;
  box-shadow: 0 -6px 14px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 99;
  justify-content: flex-end;
}

.button {
  display: flex;
  height: 45px;
  min-width: 120px;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  outline: none;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 1px 8px 0 rgba(0, 0, 0, 0.12);

  &-download {
    background: #45ca82;
    border: #43c250 1px solid;

    &:hover {
      background: #4aa976;
    }
  }

  &-preview {
    margin-right: 15px;
    padding: 0 15px;
    color: #ffffff;
    border: #6319a5;
    background: #7719be;

    &:hover {
      background: #8b19d1;
    }
  }
}

.previous-step {
  width: 160px;
  height: 45px;
  border: 1px solid rgba(58, 88, 249, 0.2);
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 16px;
  text-transform: capitalize;
  display: flex;
  color: #3a58f9;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;

  @media (max-width: 767px) {
    width: 150px;
  }
}

.next-step {
  width: 160px;
  height: 45px;
  border: 1px solid rgba(58, 88, 249, 0.2);
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 16px;
  text-transform: capitalize;
  display: flex;
  color: #3a58f9;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 1px 8px 0 rgba(0, 0, 0, 0.12);

  &.active {
    background-color: #2743de;
    border: 1px solid rgba(58, 88, 249, 0.2);
    color: #fff;

    &:hover span {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.1);
    }

    span svg path {
      stroke: #fff;
    }
  }

  @media (max-width: 767px) {
    width: 150px;
  }
}

.previous-step span,
.next-step span {
  width: 45px;
  height: 45px;
  border: 1px solid #3a58f9;
  border-radius: 4px;
  display: flex;
}

.previous-step span svg,
.next-step span svg {
  margin: auto;
}

.previous-step span svg path,
.next-step span svg path {
  stroke: #3a58f9;
}

.previous-step span {
  margin-right: 18px;
}

.next-step {
  flex-direction: row-reverse;

  span {
    margin-left: 18px;
  }
}

.previous-step:hover,
.next-step:hover {
  background-color: #2743de;
  border: 1px solid rgba(58, 88, 249, 0.2);
  color: #fff;
}

.previous-step:hover span,
.next-step:hover span {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.previous-step:hover span svg path,
.next-step:hover span svg path {
  stroke: #fff;
}

a {
  text-decoration: none;
}

.animated-button {
  text-transform: none;
  letter-spacing: 0;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
}

.back-button {
  margin-left: 0;
  margin-right: auto;
}
</style>
