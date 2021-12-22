<template>
  <div class="bz-section-container bz-sec--count-down-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="bz-count-down-3-content-container">
          <bz-text-element
            :edit="edit"
            v-model="data.elements"
            :setting="setting.elements"
            :background-color="backgroundColor"
            :alignment="setting.layouts.alignment"
            :shadow="true"
          />
          <div class="counter-container">
            <bz-count-down :edit="edit && isActive" v-model="data.countTime" class="bz-mt-3">
              <div class="counter-wrapper">
                <div class="counter-item-wrapper">
                  <div class="counter-item">
                    {{ dates }}
                  </div>
                  <span>Days</span>
                </div>
                <div class="counter-item-wrapper">
                  <div class="counter-item">
                    {{ hours }}
                  </div>
                  <span>Hours</span>
                </div>
                <div class="counter-item-wrapper">
                  <div class="counter-item">
                    {{ minutes }}
                  </div>
                  <span>Minutes</span>
                </div>
                <div class="counter-item-wrapper">
                  <div class="counter-item">
                    {{ seconds }}
                  </div>
                  <span>Seconds</span>
                </div>
              </div>
            </bz-count-down>
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzTextElement from '../../components/section/BzTextElement'
import CountDown1 from './CountDown1'

export default {
  name: 'CountDown3',
  extends: CountDown1,
  components: {
    BzTextElement,
    BzContainer,
    BzBackground
  }
}
</script>
<style lang="scss">
.bz-sec--count-down-3-root {
  .bz-count-down-3-content-container {
    width: 70%;
    max-width: 1000px;
    margin: auto;

    .counter-container {
      margin-top: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px) saturate(1.25);
    }
  }

  &.bz-sm,
  &.bz-xs {
    .bz-count-down-3-content-container {
      width: 100%;
    }
  }

  &.bz-lg {
    .bz-count-down-3-content-container {
      width: 70%;
      max-width: 1000px;
    }
  }

  .counter-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 30px;

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
        color: white !important;
      }

      span {
        color: white;
        font-weight: bold !important;
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
