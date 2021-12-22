<template>
  <div class="bz-section-container bz-sec--business-hours-3-root" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="w-100 h-100 d-flex justify-content-around flex-column p-lg-4">
          <bz-text-element :edit="edit" v-model="data.elements" :setting="setting.elements" :background-color="backgroundColor" :alignment="setting.layouts.alignment" />

          <div class="col-12">
            <div class="row">
              <div class="col-lg-4">
                <div class="address-phone-number">
                  <bz-title :edit="edit" v-model="data.elements.address" v-if="setting.elements.address" :background-color="backgroundColor" />

                  <bz-address :edit="edit" :location="setting.businessInformation.location" v-if="setting.elements.address" :background-color="backgroundColor" />

                  <bz-divider />

                  <bz-title :edit="edit" v-model="data.elements.phone" :background-color="backgroundColor" :mb="0" />

                  <bz-phone-number :edit="edit" :location="setting.businessInformation.location" :background-color="backgroundColor" />
                </div>
              </div>

              <div class="col-lg-8">
                <bz-business-hours
                  :edit="edit"
                  :location="setting.businessInformation.location"
                  v-if="setting.elements.dividerLine"
                  :background-color="backgroundColor"
                  class="business-hours"
                />
              </div>
            </div>
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzBusinessHours from '../../components/section/BzBusinessHours'
import BzAddress from '../../components/section/BzAddress'
import BzTitle from '../../components/section/BzTitle'
import BzDivider from '../../components/section/BzDivider'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzEmail from '../../components/section/BzEmail'
import BzContainer from '../../components/section/BzContainer'
import BzTextElement from '../../components/section/BzTextElement'

export default {
  name: 'BusinessHours3',
  components: {
    BzTextElement,
    BzContainer,
    BzEmail,
    BzPhoneNumber,
    BzDivider,
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
.bz-sec--business-hours-3-root {
  .text-elements {
    display: flex;
    flex-direction: column;

    &.left {
      align-items: flex-start;
      text-align: left;
    }

    &.right {
      align-items: flex-end;
      text-align: right;
    }

    &.center {
      align-items: center;
      text-align: center;
    }
  }

  .business-hours {
    display: flex;
    margin: 0;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
}
</style>
