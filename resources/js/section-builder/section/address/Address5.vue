<template>
  <div class="bz-section-container bz-sec--address5--root" :class="{ [breakPoint]: true }">
    <div class="w-100">
      <bz-google-map :type="setting.map.type" :zoom="setting.map.zoomLevel" :height="400" />
    </div>
    <div class="w-100">
      <bz-background :background-color="backgroundColor" :setting="background">
        <bz-container>
          <div class="row py-3" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
            <div class="col-lg-4">
              <bz-title :edit="edit" v-model="data.elements.address" v-if="setting.elements.address" :background-color="backgroundColor" />

              <bz-address :edit="edit" :location="setting.businessInformation.location" v-if="setting.elements.address" :background-color="backgroundColor" />
            </div>
            <div class="col-lg-4">
              <bz-title :edit="edit" v-model="data.elements.phone" v-if="setting.elements.phone" :background-color="backgroundColor" :mb="0" />

              <bz-phone-number :edit="edit" :location="setting.businessInformation.location" v-if="setting.elements.phone" :background-color="backgroundColor" />
            </div>
            <div class="col-lg-4">
              <bz-title :edit="edit" v-model="data.elements.email" v-if="setting.elements.email" :background-color="backgroundColor" :mb="0" />

              <bz-email :edit="edit" :location="setting.businessInformation.location" v-if="setting.elements.email" :background-color="backgroundColor" />
            </div>
          </div>
        </bz-container>
      </bz-background>
    </div>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzTitle from '../../components/section/BzTitle'
import BzAddress from '../../components/section/BzAddress'
import BzEmail from '../../components/section/BzEmail'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzGoogleMap from '../../components/section/BzGoogleMap'
export default {
  components: { BzGoogleMap, BzPhoneNumber, BzEmail, BzAddress, BzTitle, BzContainer, BzBackground },
  extends: BzSection
}
</script>
<style lang="scss">
.bz-sec--address5--root {
}
</style>
