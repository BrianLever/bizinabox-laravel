<template>
  <div class="bz-section-container bz-sec--promotion-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :size="sectionSize" :setting="background" :background-color="backgroundColor">
      <bz-alignment alignment="center">
        <div class="bz-col-lx-4 bz-col-lg-6">
          <bz-card :shadow="setting.layouts.shadow" style="padding: 30px" :backgroundColor="cardBackgroundColor">
            <bz-alignment :alignment="setting.layouts.alignment">
              <bz-icon v-model="data.elements.icon" :edit="edit" :rounded="false" :border-radius="0" :full="true" :background-color="backgroundColor" :fill="false" :size="40" />

              <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" size="32px" />

              <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

              <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
            </bz-alignment>

            <bz-setting :edit="edit" :on-click="openPromotionModal">
              <div class="bz-fl-email-address">
                <input class="bz-be-input" placeholder="Enter your e-mail address" />
              </div>
            </bz-setting>

            <div class="bz-fe-button">
              <bz-button :edit="edit" v-model="data.elements.button" :link="false" :background-color="backgroundColor" />
            </div>

            <bz-text class="text-left" :value="data.promotion.permissionMessage" :background-color="backgroundColor" />
          </bz-card>
        </div>
      </bz-alignment>
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

export default {
  components: { BzButton, BzSetting, BzText, BzTitle, BzIcon, BzAlignment, BzCard, BzContainer, BzBackground },
  extends: BzSection,
  name: 'Promotion1',
  computed: {
    cardBackgroundColor() {
      return this.backgroundColor.brighten(5)
    }
  },
  methods: {
    openPromotionModal() {
      this.$store.commit('openPromotion', {
        value: this.data.promotion,
        onChange: this.handlePromotionChange
      })
    },
    handlePromotionChange(promotion) {
      this.data.promotion = promotion
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--promotion-1-root {
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
