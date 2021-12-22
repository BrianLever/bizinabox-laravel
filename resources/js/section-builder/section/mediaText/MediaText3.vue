<template>
  <div class="bz-section-container bz-sec--media-text-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="bz-row">
          <div class="bz-col-md-6">
            <div class="bz-ss-image">
              <bz-image :edit="edit" :ratio="2 / 3" v-model="data.elements.image" v-if="setting.elements.image" />
            </div>
          </div>
          <div class="bz-col-md-6">
            <div class="bz-ss-title">
              <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />
            </div>

            <div class="bz-ss-subtitle">
              <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />
            </div>

            <div class="bz-ss-description">
              <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
            </div>

            <div class="bz-ss-buttons">
              <bz-button-group class="mt-3" :edit="edit" v-model="data.elements.buttons" v-if="setting.elements.buttons" :background-color="backgroundColor" />
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
import BzContainer from '../../components/section/BzContainer'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzText from '../../components/section/BzText'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzTitle from '../../components/section/BzTitle'
import BzImage from '../../components/section/BzImage'

export default {
  components: { BzImage, BzTitle, BzSubtitle, BzText, BzButtonGroup, BzContainer, BzBackground },
  extends: BzSection
}
</script>
<style lang="scss" scoped>
.bz-sec--media-text-3-root {
}
</style>
