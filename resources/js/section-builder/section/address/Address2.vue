<template>
  <div class="bz-section-container address2" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background">
      <div class="col-12">
        <div class="row" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
          <div class="col-lg-8">
            <bz-google-map :type="setting.map.type" :zoom="setting.map.zoomLevel" :height="400" />
          </div>
          <div class="col-lg-4 d-flex flex-column justify-content-center">
            <bz-title :edit="edit" v-model="data.elements.address" v-if="setting.elements.address" :background-color="backgroundColor" />

            <bz-address :edit="edit" :location="setting.businessInformation.location" v-if="setting.elements.address" :background-color="backgroundColor" />

            <bz-divider />

            <bz-title :edit="edit" v-model="data.elements.phone" v-if="setting.elements.phone" :background-color="backgroundColor" :mb="0" />

            <bz-phone-number :edit="edit" :location="setting.businessInformation.location" v-if="setting.elements.phone" :background-color="backgroundColor" />

            <bz-divider />

            <bz-title :edit="edit" v-model="data.elements.email" v-if="setting.elements.email" :background-color="backgroundColor" :mb="0" />

            <bz-email :edit="edit" :location="setting.businessInformation.location" v-if="setting.elements.email" :background-color="backgroundColor" />
          </div>
        </div>
      </div>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzDivider from '../../components/section/BzDivider'
import BzBackground from '../../components/section/BzBackground'
import BzEmail from '../../components/section/BzEmail'
import BzTitle from '../../components/section/BzTitle'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzAddress from '../../components/section/BzAddress'
import BzGoogleMap from '../../components/section/BzGoogleMap'
export default {
  components: { BzGoogleMap, BzAddress, BzPhoneNumber, BzTitle, BzEmail, BzBackground, BzDivider },
  extends: BzSection
}
</script>
<style lang="scss">
.address2 {
}
</style>
