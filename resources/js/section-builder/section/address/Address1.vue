<template>
  <div class="bz-section-container address1" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background">
      <div class="col-12">
        <div class="row" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
          <div class="col-lg-6">
            <bz-google-map :type="setting.map.type" :zoom="setting.map.zoomLevel" :height="600" />
          </div>
          <div class="col-lg-6">
            <div class="w-100 h-100 d-flex justify-content-around flex-column p-lg-4">
              <bz-text-element :edit="edit" v-model="data.elements" :setting="setting.elements" :background-color="backgroundColor" />

              <bz-business-hours :edit="edit" :location="setting.businessInformation.location" :background-color="backgroundColor" />

              <bz-divider :line="true" v-if="setting.elements.dividerLine" :background-color="backgroundColor" />

              <div class="row">
                <div class="col-lg-6">
                  <bz-title :edit="edit" v-model="data.elements.address" v-if="setting.elements.address" :background-color="backgroundColor" />

                  <bz-address :edit="edit" :location="setting.businessInformation.location" v-if="setting.elements.address" :background-color="backgroundColor" />
                </div>

                <div class="col-lg-6">
                  <bz-title :edit="edit" v-model="data.elements.phone" v-if="setting.elements.phone" :background-color="backgroundColor" :mb="0" />

                  <bz-phone-number :edit="edit" :location="setting.businessInformation.location" v-if="setting.elements.phone" :background-color="backgroundColor" />

                  <bz-divider />

                  <bz-title :edit="edit" v-model="data.elements.email" v-if="setting.elements.email" :background-color="backgroundColor" :mb="0" />

                  <bz-email :edit="edit" :location="setting.businessInformation.location" v-if="setting.elements.email" :background-color="backgroundColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzBusinessHours from '../../components/section/BzBusinessHours'
import BzAddress from '../../components/section/BzAddress'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzDivider from '../../components/section/BzDivider'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzEmail from '../../components/section/BzEmail'
import BzGoogleMap from '../../components/section/BzGoogleMap'
import BzTextElement from '../../components/section/BzTextElement'

export default {
  components: {
    BzTextElement,
    BzGoogleMap,
    BzEmail,
    BzPhoneNumber,
    BzDivider,
    BzText,
    BzSubtitle,
    BzAddress,
    BzBusinessHours,
    BzBackground,
    BzTitle
  },
  extends: BzSection,
  mounted() {}
}
</script>
<style lang="scss">
.address1 {
}
</style>
