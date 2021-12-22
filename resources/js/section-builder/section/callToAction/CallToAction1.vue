<template>
  <div class="bz-section-container bz-sec-call-to-action-1-root" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="content" :class="{ [setting.layouts.alignment]: true }">
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
import BzTextElement from '../../components/section/BzTextElement'
export default {
  components: {
    BzTextElement,
    BzButtonGroup,
    BzContainer,
    BzBackground
  },
  extends: BzSection
}
</script>
<style lang="scss">
.bz-sec-call-to-action-1-root {
  .content {
    .text-elements {
      width: 70%;

      &.left {
        text-align: left;
      }

      &.center {
        text-align: center;
        width: 100%;
      }

      &.right {
        text-align: right;
      }
    }

    .buttons {
      width: 30%;
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      justify-content: flex-end;

      &.center {
        width: 100%;
        align-items: center;
        justify-content: center;
      }

      &.right {
        justify-content: flex-start;
      }
    }

    &.right,
    &.left {
      display: flex;
      align-items: flex-end;
    }

    &.center {
      flex-direction: column;
    }

    &.right {
      flex-flow: row-reverse;
    }
  }
}
</style>
