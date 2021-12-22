<template>
  <vue-slider
    @callback="changeRange"
    v-model="options.value"
    :width="options.width"
    :tooltip="options.tooltip"
    :bgStyle="options.bgStyle"
    :speed="options.speed"
    :height="options.height"
    :dotSize="options.dotSize"
    :sliderStyle="options.sliderStyle"
    :processStyle="options.processStyle"
    :useKeyboard="options.keyboard"
    :min="options.min"
    :max="options.max"
    :interval="options.interval"
    ref="slider"
  ></vue-slider>
</template>
<script>
import vueSlider from 'vue-slider-component'

export default {
  components: {
    vueSlider
  },

  props: ['value', 'min', 'max', 'interval'],

  data() {
    return {
      options: {
        value: parseFloat(this.value),
        min: parseFloat(this.min),
        max: parseFloat(this.max),
        interval: parseFloat(this.interval),

        width: '100%',
        tooltip: 'none',
        height: 4,
        keyboard: true,
        bgStyle: {
          backgroundColor: 'rgba(58, 88, 249, 0.1)'
        },
        processStyle: {
          backgroundColor: 'rgba(58, 88, 249, 0.8)'
        },
        sliderStyle: {
          backgroundColor: '#3A58F9'
        },
        speed: 1,
        dotSize: 25
      }
    }
  },

  methods: {
    changeRange(value) {
      this.$emit('input', parseFloat(value))
    }
  },

  watch: {
    value: function (value) {
      value = parseFloat(value)

      // Set value out of range
      if (value > this.max) {
        this.options.max = value
      }

      if (value < this.min) {
        this.options.min = value
      }

      this.options.value = value
    }
  }
}
</script>
