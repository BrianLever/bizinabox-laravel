<template>
  <div @mouseover="isHover = true" @mouseleave="isHover = false">
    <div :hash="hash" class="modal_logo_preview_img_a">
      <img :src="url" alt="logo" height="auto" class="modal_logo_preview_img" />
    </div>
    <div class="hover_preview_img_a d-flex" v-if="isHover">
      <img :src="url" alt="logo" height="auto" class="modal_logo_preview_img" />
      <logo-hover :ref="'logo-hover-' + hash" :preview-url="url"></logo-hover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-on-modal',

  props: {
    url: String,
    hash: String
  },

  data() {
    return {
      isHover: false
    }
  },

  methods: {}
}
</script>

<style lang="scss">
.modal_logo_preview_img {
  width: 100%;
}
.hover_preview_img_a {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 600px;
  max-width: 100%;
  background: #fff;
  z-index: 99;
  transform: translate(-50%, -50%);
  border: 1px solid #3a58f9;
  box-shadow: 1px 8px 25px #3333;
}
</style>
