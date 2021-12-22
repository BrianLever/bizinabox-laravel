<template>
  <div class="bz-section-container bz-sec--testimonials-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-alignment :alignment="setting.layouts.alignment">
        <bz-title v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" :edit="edit" />

        <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

        <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
      </bz-alignment>

      <bz-items :edit="edit" v-model="data.items" :cols="setting.column" :shadow="false">
        <template slot-scope="{ item, index }">
          <div class="bz-testimonial-item">
            <div class="bz-testimonial-icon"></div>
          </div>
        </template>
      </bz-items>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzAlignment from '../../components/section/BzAlignment'
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'

export default {
  extends: BzSection,
  components: { BzItems, BzText, BzTitle, BzAlignment, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--testimonials-1-root {
  .bz-testimonial-item {
    display: flex;

    .bz-testimonial-icon {
      width: 80px;
      padding-right: 20px;
      border-right: solid 2px #000000;
    }

    .bz-testimonial-body {
      width: calc(100% - 80px);
      padding: 10px;
    }
  }
}
</style>
