<template>
  <div class="bz-section-container bz-sec--subscribe-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :size="sectionSize" :setting="background" :background-color="backgroundColor">
      <bz-container>
        <div class="bz-row">
          <div class="bz-col-lg-6">
            <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
              <bz-icon v-model="data.elements.icon" :edit="edit" :rounded="false" :border-radius="0" :full="true" :background-color="backgroundColor" :fill="false" :size="60" />

              <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" size="32px" />

              <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

              <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
            </bz-alignment>

            <div class="my-4">
              <bz-setting :edit="edit" :on-click="openSubscribeModal">
                <div class="bz-fl-email-address">
                  <input class="bz-be-input" placeholder="Enter your e-mail address" />
                </div>
              </bz-setting>
            </div>

            <div class="mb-3">
              <bz-button :edit="edit" v-model="data.elements.button" :link="false" :background-color="backgroundColor" />
            </div>

            <bz-text class="text-left" :value="data.subscribe.permissionMessage" :background-color="backgroundColor" />
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
  name: 'Subscribe3',
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
.bz-sec--subscribe-3-root {
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
}
</style>
