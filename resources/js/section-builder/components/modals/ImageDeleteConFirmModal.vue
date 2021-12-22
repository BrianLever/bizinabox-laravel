<template>
  <modal :classes="['delete-my-images']" name="delete-my-images" @closed="onClose()">
    <div style="background-color: rgb(246, 246, 246)" class="p-3">
      <h5>Are you sure?</h5>
    </div>
    <p class="p-4" style="font-size: 14px">
      Are you sure you want to delete these images from My Images? This will also remove the images from your website in case they are being used.
    </p>
    <hr />
    <div class="w-100 d-flex justify-content-end">
      <button class="btn btn-default" @click="onClose()">No</button>
      <button
        class="btn btn-danger mr-4 d-flex align-items-center"
        @click="
          loading = true
          onConfirm()
        "
      >
        <md-progress-spinner v-if="loading" :md-diameter="16" :md-stroke="2" md-mode="indeterminate" class="text-white"></md-progress-spinner>
        <span class="pl-2">{{ loading ? 'Deleting...' : 'Yes' }}</span>
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  props: ['onClose', 'onConfirm'],
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    this.$modal.show('delete-my-images')
  }
}
</script>

<style lang="scss">
.delete-my-images {
  max-width: 450px;
  height: 255px !important;
}
</style>
