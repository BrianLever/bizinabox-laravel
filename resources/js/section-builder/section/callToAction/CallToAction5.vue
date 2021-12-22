<template>
  <div class="bz-section-container bz-sec-call-to-action-5-root" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-card :background-color="cardBackgroundColor" :padding="48">
          <div class="content" :class="{ [setting.layouts.alignment]: true }">
            <div class="text-elements" :class="{ [setting.layouts.alignment]: true }">
              <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="cardBackgroundColor" />

              <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="cardBackgroundColor" />

              <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="cardBackgroundColor" />
            </div>

            <div class="buttons" :class="{ [setting.layouts.alignment]: true }">
              <bz-button-group class="mt-3" :edit="edit" v-model="data.elements.buttons" v-if="setting.elements.buttons" :background-color="cardBackgroundColor" />
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
import BzCard from '../../components/section/BzCard'
export default {
  components: { BzCard, BzButtonGroup, BzButton, BzText, BzSubtitle, BzTitle, BzContainer, BzBackground },
  extends: BzSection,
  computed: {
    cardBackgroundColor() {
      return '#ffffff'
    }
  }
}
</script>
<style lang="scss">
.bz-sec-call-to-action-5-root {
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

  &.bz-sm {
    .content {
      flex-direction: column;

      .text-elements {
        width: 100%;
      }

      .buttons {
        width: 100%;
      }
    }
  }
}
</style>
