<template>
  <div class="bz-section-container bz-sec-call-to-action-2-root" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="content" :class="{ [setting.layouts.alignment]: true }">
          <bz-icon :edit="edit" v-model="data.elements.icon" v-if="data.elements.icon" :background-color="backgroundColor" />

          <bz-divider />

          <bz-text-element :edit="edit" v-model="data.elements" :setting="setting.elements" :background-color="backgroundColor" :alignment="setting.layouts.alignment" />

          <div class="buttons" :class="{ [setting.layouts.alignment]: true }">
            <bz-button-group class="mt-3" :edit="edit" v-model="data.elements.buttons" v-if="setting.elements.buttons" :background-color="backgroundColor" />
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzSection from '../../components/BzSection'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzIcon from '../../components/section/BzIcon'
import BzDivider from '../../components/section/BzDivider'
import BzTextElement from '../../components/section/BzTextElement'
export default {
  components: {
    BzTextElement,
    BzDivider,
    BzIcon,
    BzButtonGroup,
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
