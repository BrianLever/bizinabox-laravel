<template>
  <div class="bz-section-container bz-sec--subscribe-4-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :size="sectionSize" :setting="background" :background-color="backgroundColor">
      <bz-container>
        <div class="subscribe-form-container">
          <div class="subscribe-image">
            <bz-image :edit="edit" v-model="data.elements.image" resize-mode="full" :disable-aspect-view="true" />
          </div>

          <div class="bz-col-12 bz-col-md-6 bz-col-lg-5 position-relative" style="z-index: 2">
            <bz-card :background-color="'#ffffff'" :padding="30">
              <bz-icon v-model="data.elements.icon" :edit="edit" :rounded="false" :border-radius="0" :full="true" :background-color="'#ffffff'" :fill="false" :size="30" />

              <bz-alignment :alignment="setting.layouts.alignment" :stretch="false" class="my-3">
                <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" size="32px" />

                <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="'#ffffff'" />

                <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="'#ffffff'" />
              </bz-alignment>

              <bz-setting :edit="edit" :on-click="openSubscribeModal">
                <div class="bz-fl-email-address">
                  <input class="bz-be-input" placeholder="Enter your e-mail address" />
                </div>
              </bz-setting>

              <bz-button :edit="edit" v-model="data.elements.button" :link="false" :background-color="backgroundColor" class="my-3" :width="'100%'" />

              <bz-text class="text-left" :value="data.subscribe.permissionMessage" :background-color="'#ffffff'" />
            </bz-card>
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzCard from '../../components/section/BzCard'
import BzAlignment from '../../components/section/BzAlignment'
import BzIcon from '../../components/section/BzIcon'
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzSetting from '../../components/section/BzSetting'
import BzButton from '../../components/section/BzButton'
import BzImage from '../../components/section/BzImage'

export default {
  components: { BzImage, BzButton, BzSetting, BzText, BzTitle, BzIcon, BzAlignment, BzCard, BzContainer, BzBackground },
  extends: BzSection,
  name: 'Subscribe4',
  computed: {
    cardBackgroundColor() {
      return this.backgroundColor.brighten(5)
    }
  },
  methods: {
    openSubscribeModal() {
      this.$store.commit('openSubscribe', {
        value: this.data.subscribe,
        onChange: this.handleSubscribeChange
      })
    },
    handleSubscribeChange(subscribe) {
      this.data.subscribe = subscribe
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--subscribe-4-root {
  .bz-fe-button {
    margin: 20px 0;
  }

  .bz-fl-email-address {
    width: 100%;
    background-color: #efefef;
    padding: 10px;
    border-radius: 4px;

    input {
      width: 100%;
      border: none;
      outline: none;
      font-family: inherit;
    }
  }

  .subscribe-form-container {
    position: relative;
    width: 100%;
    height: min-content;

    .subscribe-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
}
</style>
