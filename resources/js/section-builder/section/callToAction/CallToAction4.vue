<template>
  <div class="bz-section-container bz-sec-call-to-action-2-root" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-card :background-color="'#ffffffff'">
          <div class="content" :class="{ [setting.layouts.alignment]: true }">
            <bz-icon :edit="edit" v-model="data.elements.icon" v-if="data.elements.icon" :background-color="'#ffffffff'" :text-color="theme.primaryColor" />

            <bz-divider />

            <div class="text-elements" :class="{ [setting.layouts.alignment]: true }">
              <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="'#ffffffff'" />

              <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="'#ffffffff'" />

              <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="'#ffffffff'" />
            </div>

            <div class="buttons" :class="{ [setting.layouts.alignment]: true }">
              <bz-button-group :edit="edit" v-model="data.elements.buttons" v-if="setting.elements.buttons" :background-color="'#ffffffff'" />
            </div>
          </div>
        </bz-card>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzSection from '../../components/BzSection'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzButton from '../../components/section/BzButton'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzIcon from '../../components/section/BzIcon'
import BzDivider from '../../components/section/BzDivider'
import BzCard from '../../components/section/BzCard'
export default {
  components: {
    BzCard,
    BzDivider,
    BzIcon,
    BzButtonGroup,
    BzButton,
    BzText,
    BzSubtitle,
    BzTitle,
    BzContainer,
    BzBackground
  },
  extends: BzSection
}
</script>
<style lang="scss">
.bz-sec-call-to-action-2-root {
  .content {
    flex-direction: column;
    display: flex;
    padding: 20px;

    &.left {
      align-items: flex-start;
    }

    &.center {
      align-items: center;
    }

    &.right {
      align-items: flex-end;
    }

    .text-elements {
      &.left {
        text-align: left;
      }
      &.center {
        text-align: center;
      }
      &.right {
        text-align: right;
      }
    }

    .buttons {
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      justify-content: flex-start;

      &.center {
        align-items: center;
        justify-content: center;
      }

      &.right {
        justify-content: flex-end;
      }
    }
  }
}
</style>
