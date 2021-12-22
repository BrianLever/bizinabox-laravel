<template>
  <div class="f_modal" v-if="open">
    <div class="f_modal_overlay" @click="$emit('toggle')"></div>
    <div class="f_modal_bg p-5">
      <span class="f_modal_close" @click="$emit('toggle')">×</span>
      <div class="container position-relative">
        <div class="modal_area row justify-content-center">
          <p>Would you like to save changes to your logo?</p>
          <div class="w-100 d-flex flex-row">
            <div class="form-group">
              <el-button @click="exit" v-loading="!canSave" :disabled="!canSave" type="primary" class="button button-preview" icon="el-icon-save">Exit </el-button>
            </div>

            <div class="form-group ml-3">
              <el-button @click="saveLogoWindow" v-loading="!canSave" :disabled="!canSave" type="primary" class="button button-preview" icon="el-icon-save">Save </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'save-confirm-modal',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    exitCallBack: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      canSave: true
    }
  },
  methods: {
    exit() {
      this.$emit('toggle')
      window.location.href = this.exitCallBack
    },
    saveLogoWindow() {
      this.$emit('toggle')
      EventBus.$emit('view-live-submit')
    }
  }
}
</script>
