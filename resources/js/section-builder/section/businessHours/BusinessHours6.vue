<template>
  <section class="bz-section-container bz-sec--address1-root" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="w-100 h-100 d-flex justify-content-around flex-column p-lg-4">
          <bz-text-element :edit="edit" v-model="data.elements" :setting="setting.elements" :background-color="backgroundColor" :alignment="setting.layouts.alignment" />

          <div class="col-12">
            <div class="row">
              <div class="col-lg-6">
                <bz-business-hours :edit="edit" :location="setting.businessInformation.location" :background-color="backgroundColor" :design="4" />
              </div>
              <div class="col-lg-6">
                <div class="text-wrapper" :class="{ [setting.layouts.alignment]: true }">
                  <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </bz-container>
    </bz-background>
  </section>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzBusinessHours from '../../components/section/BzBusinessHours'
import BzAddress from '../../components/section/BzAddress'
import BzText from '../../components/section/BzText'
import BzDivider from '../../components/section/BzDivider'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzEmail from '../../components/section/BzEmail'
import BzGoogleMap from '../../components/section/BzGoogleMap'
import BzContainer from '../../components/section/BzContainer'
import BzTextElement from '../../components/section/BzTextElement'

export default {
  name: 'BusinessHours6',
  components: {
    BzTextElement,
    BzContainer,
    BzGoogleMap,
    BzEmail,
    BzPhoneNumber,
    BzDivider,
    BzText,
    BzAddress,
    BzBusinessHours,
    BzBackground
  },
  extends: BzSection,
  mounted() {}
}
</script>
<style lang="scss">
.bz-sec--address1-root {
  .title-sub-title-wrapper,
  .text-wrapper {
    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }
    &.center {
      text-align: center;
    }
  }

  .text-wrapper {
    margin: 30px 0;
  }
}
</style>
