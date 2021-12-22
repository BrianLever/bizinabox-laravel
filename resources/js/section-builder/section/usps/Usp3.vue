<template>
  <div class="bz-section-container bz-sec--usp-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />
          <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />
          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-divider />

        <bz-items :edit="edit" v-model="data.items" :cols="setting.column" :shadow="setting.layouts.shadow" :spacing="20">
          <template slot-scope="{ item, index }">
            <bz-alignment :alignment="setting.layouts.alignment" :style="{ paddingBottom: '20px' }">
              <div class="usp-item-container" v-if="setting.listElements.icon">
                <bz-icon :edit="edit" v-model="data.items[index].icon" :text-color="'#ffffffff'" />
              </div>

              <bz-divider />

              <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="backgroundColor" />

              <bz-text :edit="edit" v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" :background-color="backgroundColor" />

              <bz-text :edit="edit" v-model="data.items[index].description" v-if="setting.listElements.description" :background-color="backgroundColor" />
            </bz-alignment>
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzAlignment from '../../components/section/BzAlignment'
import BzContainer from '../../components/section/BzContainer'
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzDivider from '../../components/section/BzDivider'
import BzIcon from '../../components/section/BzIcon'

export default {
  extends: BzSection,
  components: { BzIcon, BzDivider, BzItems, BzText, BzTitle, BzContainer, BzAlignment, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--usp-3-root {
  .usp-item-container {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bz-primary-color);
  }
}
</style>
