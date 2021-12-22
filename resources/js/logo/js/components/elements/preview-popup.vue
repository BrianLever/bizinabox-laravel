<template>
  <sweet-modal ref="modal">
    <preview v-show="modal.isOpened" ref="preview"></preview>
  </sweet-modal>
</template>

<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {
  name: 'preview-popup',

  components: {
    SweetModal,
    SweetModalTab
  },

  data() {
    return {
      modal: {
        isOpened: false
      }
    }
  },

  mounted() {
    this.listen()
  },

  methods: {
    listen() {
      EventBus.$on('logotype.preview.popup.show', () => {
        this.show()
      })
      EventBus.$on('logotype.preview.popup.hide', () => {
        this.$refs.modal.close()
      })
    },

    show() {
      // Open modal
      this.$refs.modal.open()

      // Make preview visible
      this.modal.isOpened = true

      // Rerender swiper component
      this.$refs.preview.swiper.update()

      // Emit event when modal is showed
      EventBus.$emit('logotype.preview.popup.showed')
    }
  }
}
</script>

<style lang="scss">
.svg-editor {
  .sweet-content {
    padding-bottom: 12px;
    overflow: hidden;
  }

  .sweet-modal-overlay {
    z-index: 10001;
  }
}
</style>
