<template>
  <div class="bz-section-container bz-sec--count-down-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-card :background-color="cardBackgroundColor" class="bz-p-0">
          <div class="card-top-bar"></div>
          <div class="bz-p-lg-6 bz-p-2">
            <bz-text-element :edit="edit" v-model="data.elements" :setting="setting.elements" :background-color="backgroundColor" :alignment="setting.layouts.alignment" />

            <bz-count-down :edit="edit && isActive" v-model="data.countTime">
              <div class="counter-wrapper">
                <div class="counter-item-wrapper">
                  <div class="counter-item">
                    {{ dates }}
                  </div>
                  <span>Days</span>
                </div>
                <div class="counter-divider-dot"></div>
                <div class="counter-item-wrapper">
                  <div class="counter-item">
                    {{ hours }}
                  </div>
                  <span>Hours</span>
                </div>
                <div class="counter-divider-dot"></div>
                <div class="counter-item-wrapper">
                  <div class="counter-item">
                    {{ minutes }}
                  </div>
                  <span>Minutes</span>
                </div>
                <div class="counter-divider-dot"></div>
                <div class="counter-item-wrapper">
                  <div class="counter-item">
                    {{ seconds }}
                  </div>
                  <span>Seconds</span>
                </div>
              </div>
            </bz-count-down>
          </div>
        </bz-card>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzTextElement from '../../components/section/BzTextElement'
import CountDown1 from './CountDown1'
import BzCard from '../../components/section/BzCard'

export default {
  name: 'CountDown2',
  extends: CountDown1,
  components: {
    BzCard,
    BzTextElement,
    BzContainer,
    BzBackground
  },
  computed: {
    cardBackgroundColor() {
      return '#ffffff'
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-sec--count-down-2-root {
  .card-top-bar {
    width: 100%;
    height: 10px;
    background-color: var(--bz-secondary-color);
  }

  .counter-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .counter-divider-dot {
      display: none;
    }

    .counter-item-wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 40%;

      .counter-item {
        font-size: 5.4em;
        line-height: 1.5em;
        width: 1.5em;
        font-weight: bold;
        text-align: center;
        color: var(--bz-secondary-color);
      }
    }
  }

  &.bz-md {
    .counter-wrapper {
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .counter-divider-dot {
        display: flex;
        width: 10px;
        height: 10px;
        background-color: #8080803f;
        border-radius: 50%;
        margin-top: -20px;
      }
      .counter-item-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 20%;

        .counter-item {
          font-size: 5.4em;
          line-height: 1.5em;
          width: 100%;
          font-weight: bold;
          text-align: center;
          color: var(--bz-secondary-color);
        }
      }
    }
  }
}
</style>
