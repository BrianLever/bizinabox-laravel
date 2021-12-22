<template>
  <div class="bz-input-root" :style="style">
    <label v-if="label" :class="{ active: value, focused }" style="pointer-events: none">{{ label }}</label>
    <div class="bz-input-base">
      <template v-if="multiple">
        <textarea v-model="data" :rows="rows" @focus="focused = true" @focusout="focused = false"></textarea>
      </template>
      <template v-else>
        <input v-model="data" :placeholder="placeholder || label" @focus="focused = true" @focusout="focused = false" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BzInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 10
    },
    height: {
      type: Number,
      default: 32
    }
  },
  data() {
    return {
      focused: false
    }
  },
  computed: {
    data: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    style() {
      if (!this.multiple) {
        return { height: this.height + 'px' }
      }
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
$active: #0069d9;
.bz-input-root {
  width: 100%;
  min-height: 32px;
  position: relative;
  border: solid 1px #8080807f;
  border-radius: 4px;
  display: flex;
  align-items: center;
  background-color: white;

  label {
    position: absolute;
    left: 5px;
    padding: 0 5px;
    top: min(calc(50% - 9px), 12px);
    background-color: white;
    line-height: 18px;
    font-size: 16px;
    transition: all 0.3s;
    color: #808080;
    font-weight: 300;

    &.active,
    &.focused {
      top: -8px;
      line-height: 10px;
      background-color: inherit;
      font-size: 10px;
      transition: all 0.3s;
    }
    &.focused {
      color: $active;
    }
  }

  &:focus,
  &:focus-within,
  &:focus-visible {
    border: solid 2px #0069d9;
  }

  .bz-input-base {
    width: 100%;
    textarea,
    input {
      padding-left: 10px;
      background-color: transparent;
      border: none;
      width: 100%;
      font-size: 16px;
      font-weight: 300;
    }
    textarea {
      padding-top: 10px;
    }
  }
}
</style>
