<template>
  <div class="theme-colors">
    <div :class="{ active: value === theme.primaryColor }" :style="{ backgroundColor: theme.primaryColor }" @click.prevent="handleClick(theme.primaryColor)"></div>
    <div
      :class="{ active: activeBackgroundColor === theme.secondaryColor }"
      :style="{ backgroundColor: theme.secondaryColor }"
      @click.prevent="handleClick(theme.secondaryColor)"
    ></div>
    <div
      :class="{ active: activeBackgroundColor === (theme.mode === 'light' ? theme.lightModeColor : theme.darkModeColor) }"
      :style="{ backgroundColor: theme.mode === 'light' ? theme.lightModeColor : theme.darkModeColor }"
      @click.prevent="handleClick(theme.mode === 'light' ? theme.lightModeColor : theme.darkModeColor)"
    ></div>
    <div
      :class="{ active: activeBackgroundColor === (theme.mode === 'dark' ? theme.lightModeColor : theme.darkModeColor) }"
      :style="{ backgroundColor: theme.mode === 'dark' ? theme.lightModeColor : theme.darkModeColor }"
      @click.prevent="handleClick(theme.mode === 'dark' ? theme.lightModeColor : theme.darkModeColor)"
    ></div>
  </div>
</template>

<script>
import BzComponent from '../BzComponent'

export default {
  name: 'BzColorSet',
  extends: BzComponent,
  props: {
    value: {
      type: String,
      default: '#ffffff'
    }
  },
  methods: {
    handleClick(color) {
      this.$emit('input', color)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-colors {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: relative;

  div {
    width: 23%;
    height: 34px;
    border-radius: 4px;
    border: solid 1px #8080803f;
    outline: solid 2px transparent;

    &:hover {
      outline: solid 2px rgb(157, 222, 255);
      border: solid 1px white;
    }

    &.active {
      border: solid 1px white;
      outline: solid 2px #0076df;
    }
  }
}
</style>
