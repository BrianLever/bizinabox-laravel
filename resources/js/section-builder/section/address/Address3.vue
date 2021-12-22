<template>
  <div class="bz-section-container bz-sec--address3--root" :class="{ [breakPoint]: true }">
    <div class="col-12">
      <div class="row flex-column-reverse flex-lg-row">
        <bz-background :background-color="theme.primaryColor" class="col-lg-4" :size="sectionSize">
          <div class="col-12 left-box"></div>
        </bz-background>
        <bz-background class="col-lg-8" :background-color="backgroundColor" :setting="background" :size="sectionSize">
          <div class="col-12 right-box"></div>
        </bz-background>
      </div>
    </div>
    <div class="section-content d-flex align-items-center">
      <div class="col-12">
        <div class="row flex-column-reverse flex-lg-row" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
          <div class="col-lg-8 p-lg-5">
            <bz-google-map :type="setting.map.type" :zoom="setting.map.zoomLevel" :height="360" />
          </div>
          <div class="col-lg-4 d-flex justify-content-center flex-column">
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
    </div>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzTitle from '../../components/section/BzTitle'
import BzAddress from '../../components/section/BzAddress'
import BzDivider from '../../components/section/BzDivider'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzEmail from '../../components/section/BzEmail'
import BzGoogleMap from '../../components/section/BzGoogleMap'
export default {
  components: { BzGoogleMap, BzEmail, BzPhoneNumber, BzDivider, BzAddress, BzTitle, BzBackground },
  extends: BzSection
}
</script>
<style lang="scss">
.bz-sec--address3--root {
  position: relative;

  .left-box,
  .right-box {
    min-height: 320px;
  }

  &.bz-sm {
    .left-box {
      min-height: 200px;
    }
    .right-box {
      min-height: 420px;
    }
  }

  .section-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
