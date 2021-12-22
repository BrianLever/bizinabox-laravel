<template>
  <main class="w-100">
    <template v-if="loadingData">
      <Loading :active="true" :is-full-page="true" color="#0076DF" />
    </template>
    <template v-else>
      <manage-markers-modal v-if="openManageMarkers" />
      <embed-link-modal v-if="openEmbedLink" />
      <image-select-modal v-if="openImageEditor" />
      <attach-link-modal v-if="openAttachLink" />
      <alt-text-modal v-if="openAltText" />
      <icon-selector-modal v-if="openIconSelector" />
      <page-setting-modal v-if="openPageSettingModal" />
      <contact-form-setting-modal v-if="openContactFormSetting" />
      <bz-time-picker v-if="openTimePicker" />
      <promotion-modal v-if="openPromotionModal" />
      <subscribe-modal v-if="openSubscribeModal" />
      <video-modal v-if="openVideoModal" />
      <div class="edit_page_container">
        <div class="content_body w-100 bg-transparent">
          <NavBar />
          <SliderBar />
          <SettingPanel v-if="showSettingPanel" />
          <template v-if="activeSlider === 'theme'">
            <PageView />
          </template>
          <template v-else>
            <div class="bz-page-content" :class="{ [activeSlider]: true, showSettingPanel }">
              <PageContent />
            </div>
          </template>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import PageContent from './page/PageContent'
import NavBar from './page/NavBar'
import SliderBar from './page/SliderBar'
import SettingPanel from './page/SettingPanel'
import BzComponent from './BzComponent'
import PageView from './page/PageView'
import Loading from 'vue-loading-overlay'

// modals
import ImageSelectModal from './modals/ImageSelectModal'
import EmbedLinkModal from './modals/EmbedLinkModal'
import AttachLinkModal from './modals/AttachLinkModal'
import AltTextModal from './modals/AltTextModal'
import PageSettingModal from './modals/PageSettingModal'
import IconSelectorModal from './modals/IconSelectorModal'
import ContactFormSettingModal from './modals/ContactFormSettingModal'
import BzTimePicker from './page/BzTimePicker'
import ManageMarkersModal from './modals/ManageMarkersModal'
import PromotionModal from './modals/PromotionModal'
import SubscribeModal from './modals/SubscribeModal'
import VideoModal from './modals/VideoModal'

export default {
  components: {
    VideoModal,
    SubscribeModal,
    PromotionModal,
    ManageMarkersModal,
    EmbedLinkModal,
    BzTimePicker,
    ContactFormSettingModal,
    IconSelectorModal,
    PageView,
    PageSettingModal,
    AltTextModal,
    AttachLinkModal,
    ImageSelectModal,
    SettingPanel,
    SliderBar,
    NavBar,
    PageContent,
    Loading
  },
  extends: BzComponent,
  computed: {
    openImageEditor() {
      return this.$store.state.imageEditor.open
    },
    openAttachLink() {
      return this.$store.state.attachLink.open
    },
    openAltText() {
      return this.$store.state.altText.open
    },
    openIconSelector() {
      return this.$store.state.iconSelector.open
    },
    openContactFormSetting() {
      return this.$store.state.contactFormSetting.open
    },
    openTimePicker() {
      return this.$store.state.timePicker.open
    },
    openEmbedLink() {
      return this.$store.state.embedLink.open
    },
    openManageMarkers() {
      return this.$store.state.manageMarkers.open
    },
    openPromotionModal() {
      return this.$store.state.promotion.open
    },
    openSubscribeModal() {
      return this.$store.state.subscribe.open
    },
    openVideoModal() {
      return this.$store.state.youtubeVideo.open
    }
  },
  created() {
    this.$store.commit('enableEdit')
    this.$store.commit('setTemplate')
  }
}
</script>
<style lang="scss">
.edit_page_container {
  position: relative;
  height: 100%;

  .content_body {
    width: 100%;

    .bz-page-content {
      position: absolute;
      margin-left: 70px;
      width: calc(100% - 70px);
      margin-right: 320px;
      background-color: rgb(217, 222, 227);
      min-height: calc(100vh - 60px);
      height: min-content;
      display: flex;
      justify-content: center;
      padding-bottom: 1000px;

      &.showSettingPanel {
        width: calc(100% - 390px);
      }
    }
  }
}
.item-dropzone-area {
  height: 300px;
  background: transparent;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
}
</style>
