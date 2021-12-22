<template>
  <div class="bz-section-container bz-sec--business-hours-4-root" :class="{ [breakPoint]: true }">
    <bz-background :background-color="mainBackgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-card :background-color="backgroundColor" :shadow="false">
          <div class="col-12">
            <div class="row" :class="{ 'flex-row-reverse': setting.alignment === 'right' }">
              <div class="col-lg-6" v-if="setting.elements.image">
                <bz-image :edit="edit" v-model="data.elements.image" :disable-aspect-view="true" v-if="setting.elements.image" resize-mode="full" :max-height="500" />
              </div>
              <div :class="setting.elements.image ? 'col-lg-6' : 'col-12'">
                <div class="w-100 h-100 d-flex justify-content-around flex-column pt-5">
                  <bz-text-element :edit="edit" v-model="data.elements" :setting="setting.elements" :background-color="backgroundColor" />

                  <bz-divider />

                  <bz-business-hours :edit="edit" :location="setting.businessInformation.location" :background-color="backgroundColor" :design="2" />
                </div>
              </div>
            </div>
          </div>
        </bz-card>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzBusinessHours from '../../components/section/BzBusinessHours'
import BzGoogleMap from '../../components/section/BzGoogleMap'
import BzContainer from '../../components/section/BzContainer'
import BzDivider from '../../components/section/BzDivider'
import BzImage from '../../components/section/BzImage'
import BzCard from '../../components/section/BzCard'
import BzTextElement from '../../components/section/BzTextElement'

export default {
  name: 'BusinessHours4',
  components: {
    BzTextElement,
    BzCard,
    BzImage,
    BzDivider,
    BzContainer,
    BzGoogleMap,
    BzBusinessHours,
    BzBackground
  },
  extends: BzSection,
  computed: {
    mainBackgroundColor() {
      let originalColor = tinycolor(this.backgroundColor)
      return originalColor.darken(4).toString()
    }
  }
}
</script>
<style lang="scss">
.bz-sec--business-hours-4-root {
}
</style>
