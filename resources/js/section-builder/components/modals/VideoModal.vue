<template>
  <modal :classes="['youtube-video']" name="youtube-video" @closed="onClose()">
    <div style="background-color: rgb(246, 246, 246)" class="p-3">
      <h5>Youtube Video</h5>
    </div>
    <div class="p-4">
      <bz-input label="YouTube Video URL" v-model="video.source" :height="40" />
      <div class="row mt-3">
        <div class="col-6">Auto Play</div>
        <div class="col-6">
          <bz-switch v-model="video.setting.autoPlay" />
        </div>

        <div class="col-6">Loop</div>
        <div class="col-6">
          <bz-switch v-model="video.setting.loop" />
        </div>

        <div class="col-6">Controls</div>
        <div class="col-6">
          <bz-switch v-model="video.setting.controls" />
        </div>
      </div>
    </div>
    <hr />
    <div class="w-100 d-flex justify-content-end">
      <button class="btn bz-btn-default-outline mr-3" @click="onClose()">
        <b>Cancel</b>
      </button>
      <button class="btn bz-btn-default mr-4 d-flex align-items-center" @click="onConfirm()">
        <b>Save</b>
      </button>
    </div>
  </modal>
</template>

<script>
import { mapMutations } from 'vuex'
import BzInput from '../page/BzInput'
import BzSwitch from '../page/BzSwitch'

export default {
  name: 'video-modal',
  components: { BzSwitch, BzInput },
  data() {
    return {
      loading: false,
      video: {
        source: '',
        setting: {
          autoPlay: false,
          loop: false,
          controls: true
        }
      }
    }
  },
  methods: {
    getVideo() {
      let video = this.$store.state.youtubeVideo
      return video.value
    },
    onConfirm() {
      this.$store.state.youtubeVideo.onChange(this.video)
      this.closeYoutubeVideo()
    },
    onClose() {
      this.closeYoutubeVideo()
    },
    ...mapMutations(['closeYoutubeVideo'])
  },
  mounted() {
    this.$modal.show('youtube-video')
    this.video = this.getVideo()
  }
}
</script>

<style lang="scss">
.youtube-video {
  max-width: 500px;
  height: min-content !important;
  padding-bottom: 15px;
}
</style>
