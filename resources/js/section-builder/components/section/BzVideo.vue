<template>
  <div class="bz-el-video-root" :class="{ [breakPoint]: true }">
    <bz-setting :edit="edit" :on-click="openVideoModal">
      <youtube :video-id="videoId" width="100%" height="500px" :resize="true" :resize-delay="0" :player-vars="playerVars" />
    </bz-setting>
  </div>
</template>

<script>
import BzSetting from './BzSetting'
import BzElement from '../BzElement'
import { mapMutations } from 'vuex'
import { cloneDeep } from 'lodash'

export default {
  name: 'BzVideo',
  components: { BzSetting },
  extends: BzElement,
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          source: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
          setting: {
            autoPlay: false,
            loop: false,
            controls: true
          }
        }
      }
    }
  },
  data() {
    return {
      breakPoint: 'bz-xl'
    }
  },
  computed: {
    playerVars() {
      return {
        autoplay: this.autoPlay
      }
    },
    videoId() {
      const url = new URL(this.value.source)
      return url.searchParams.get('v')
    }
  },
  methods: {
    openVideoModal() {
      this.openYoutubeVideo({
        onChange: (value) => {
          this.$emit('input', value)
        },
        value: cloneDeep(this.value)
      })
    },
    ...mapMutations(['openYoutubeVideo'])
  }
}
</script>

<style lang="scss">
.bz-el-video-root {
  height: 100%;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
