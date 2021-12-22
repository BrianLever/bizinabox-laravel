<template>
  <div class="bz-section-container bz-sec--usp-4-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor" :size="sectionSize">
      <div class="background-attachment" :class="setting.alignment"></div>
      <bz-container>
        <div class="bz-row" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
          <div class="bz-col-lg-7">
            <bz-image :edit="edit" v-model="data.elements.image" v-if="setting.elements.image" :ratio="2 / 3" />
          </div>
          <div class="bz-col-lg-5">
            <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
              <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />
              <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />
              <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
            </bz-alignment>

            <bz-items :edit="edit" v-model="data.items" :cols="1" :shadow="false" :spacing="false">
              <template slot-scope="{ item, index }">
                <div class="bz-item">
                  <div class="bz-usp-item-container" v-if="setting.listElements.icon">
                    <bz-icon :edit="edit" v-model="data.items[index].icon" :text-color="'#ffffffff'" :size="60" />
                  </div>
                  <div class="bz-item-content">
                    <bz-alignment :alignment="setting.layouts.alignment">
                      <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="backgroundColor" />

                      <bz-text :edit="edit" v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" :background-color="backgroundColor" />

                      <bz-text :edit="edit" v-model="data.items[index].description" v-if="setting.listElements.description" :background-color="backgroundColor" />
                    </bz-alignment>
                  </div>
                </div>
              </template>
            </bz-items>
          </div>
        </div>
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
import BzImage from '../../components/section/BzImage'

export default {
  extends: BzSection,
  components: {
    BzImage,
    BzIcon,
    BzDivider,
    BzItems,
    BzText,
    BzTitle,
    BzContainer,
    BzAlignment,
    BzBackground
  }
}
</script>
<style lang="scss" scoped>
.bz-sec--usp-4-root {
  .bz-item {
    display: flex;
  }

  .bz-usp-item-container {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bz-primary-color);
  }

  .bz-item-content {
    width: calc(100% - 40px);
    padding-left: 30px;
  }

  // Background
  .background-attachment {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30%;
    background-color: var(--bz-primary-color);

    &.right {
      right: auto;
      top: auto;
      bottom: 0;
    }
  }

  &.bz-md {
    .background-attachment {
      top: 0;
      width: 30%;
      height: 100%;

      &.right {
        right: 0;
        top: 0;
        bottom: auto;
      }
    }
  }
}
</style>
