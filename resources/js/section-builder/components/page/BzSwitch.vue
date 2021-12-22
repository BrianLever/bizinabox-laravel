<template>
  <div class="bz-el--switch-root">
    <span class="element_item_label">{{ label }}</span>
    <label class="custom_switch">
      <input type="checkbox" v-model="data" />
      <span></span>
    </label>
  </div>
</template>

<script>
import BzElement from '../BzElement'

export default {
  extends: BzElement,
  name: 'bz-switch',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
.bz-el--switch-root {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .custom_switch {
    position: relative;
    display: inline-block;
    width: 38px;
    height: 20px;
    margin-bottom: 0px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    span {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 34px;
      &:before {
        position: absolute;
        content: '';
        height: 18px;
        width: 18px;
        left: 2px;
        bottom: 1px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
      }
    }
    input:checked + span {
      background-color: #2196f3;
    }
    input:focus + span {
      box-shadow: 0 0 1px #2196f3;
    }

    input:checked + span:before {
      -webkit-transform: translateX(16px);
      -ms-transform: translateX(16px);
      transform: translateX(16px);
    }
  }
}
</style>
