<template>
  <div class="bz-section-container bz-sec--media-text-7-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container horizontal-center>
        <div class="bz-ss-container-out" :style="{ borderColor: `rgba(255,255,255, ${setting.card.opacity / 100})` }">
          <div class="bz-ss-container-inner" :style="{ backgroundColor: `rgba(255,255,255, ${setting.card.opacity / 100})` }">
            <bz-alignment :alignment="setting.layouts.alignment">
              <div class="bz-ss-title">
                <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" />
              </div>

              <div class="bz-ss-subtitle">
                <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />
              </div>

              <bz-divider :line="true" :style="{ backgroundColor: `rgba(255,255,255,${setting.card.opacity})` }" :thickness="0.1" />

              <div class="bz-ss-description">
                <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" />
              </div>

              <div class="bz-ss-buttons">
                <bz-button-group class="mt-3" :edit="edit" v-model="data.elements.buttons" v-if="setting.elements.buttons" />
              </div>
            </bz-alignment>
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
import BzImage from '../../components/section/BzImage'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzAlignment from '../../components/section/BzAlignment'
import BzDivider from '../../components/section/BzDivider'

export default {
  components: { BzDivider, BzAlignment, BzButtonGroup, BzText, BzSubtitle, BzTitle, BzImage, BzContainer, BzBackground },
  extends: BzSection
}
</script>
<style lang="scss" scoped>
.bz-sec--media-text-7-root {
  .bz-ss-container-out {
    border: solid 5px;
    padding: 10px;
    max-width: 800px;
  }

  .bz-ss-container-inner {
    padding: 100px;
    width: 100%;
    backdrop-filter: blur(20px) saturate(125%);
  }
}
</style>
