<template>
  <div class="bz-section-container bz-sec--count-down-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-text-element
          :edit="edit"
          v-model="data.elements"
          :setting="setting.elements"
          :background-color="backgroundColor"
          :alignment="setting.layouts.alignment"
          :shadow="true"
        />

        <bz-count-down :edit="edit" v-model="data.countTime">
          <div class="bz-col-12">
            <div class="bz-row">
              <div class="bz-col-md-3 bz-col-6 bz-d-flex bz-column bz-align-center counter-item-wrapper">
                <bz-aspect-view>
                  <div class="counter-item">
                    {{ dates }}
                  </div>
                </bz-aspect-view>
                <span>Days</span>
              </div>
              <div class="bz-col-md-3 bz-col-6 bz-d-flex bz-column bz-align-center counter-item-wrapper">
                <bz-aspect-view>
                  <div class="counter-item">
                    {{ hours }}
                  </div>
                </bz-aspect-view>
                <span>Hours</span>
              </div>
              <div class="bz-col-md-3 bz-col-6 bz-d-flex bz-column bz-align-center counter-item-wrapper">
                <bz-aspect-view>
                  <div class="counter-item">
                    {{ minutes }}
                  </div>
                </bz-aspect-view>
                <span>Minutes</span>
              </div>
              <div class="bz-col-md-3 bz-col-6 bz-d-flex bz-column bz-align-center counter-item-wrapper">
                <bz-aspect-view>
                  <div class="counter-item">
                    {{ seconds }}
                  </div>
                </bz-aspect-view>
                <span>Seconds</span>
              </div>
            </div>
          </div>
        </bz-count-down>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzTextElement from '../../components/section/BzTextElement'
import BzCountDown from '../../components/section/BzCountDown'
import BzAspectView from '../../components/section/BzAspectView'

export default {
  name: 'CountDown1',
  extends: BzSection,
  components: {
    BzAspectView,
    BzCountDown,
    BzContainer,
    BzTextElement,
    BzBackground
  },
  data() {
    return {
      refresh: true,
      dates: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  },
  mounted() {
    let _this = this
    _this.updateCounter()
    setInterval(function () {
      _this.updateCounter()
    }, 1000)
  },
  methods: {
    updateCounter() {
      let currentTime = this.$moment()
      let countTime = this.$moment(this.data.countTime)

      if (countTime.isAfter(currentTime)) {
        let duration = this.$moment.duration(countTime.diff(currentTime))._data
        this.dates = duration.days < 10 ? '0' + duration.days : duration.days
        this.hours = duration.hours < 10 ? '0' + duration.hours : duration.hours
        this.minutes = duration.minutes < 10 ? '0' + duration.minutes : duration.minutes
        this.seconds = duration.seconds < 10 ? '0' + duration.seconds : duration.seconds
      } else {
        this.dates = '00'
        this.hours = '00'
        this.minutes = '00'
        this.seconds = '00'
      }
    }
  }
}
</script>
<style lang="scss">
.bz-sec--count-down-1-root {
  .counter-item-wrapper {
    color: white;

    .counter-item {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      font-size: 3em;
      border-radius: 50%;
      border: solid 2px;
      max-width: 150px;
      max-height: 150px;
    }
  }
}
</style>
