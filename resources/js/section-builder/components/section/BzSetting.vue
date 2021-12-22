<template>
  <div class="bz-el-setting-root" :class="{ edit, wrapContent }" @click="handleClick">
    <slot />
    <div class="setting" v-if="edit">
      <div class="setting-icon">
        <setting-icon fill-color="#808080" />
      </div>
    </div>
  </div>
</template>

<script>
import SettingIcon from '../icons/Setting'
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    onClick: {
      type: Function,
      default: () => {
        return 0
      }
    },
    wrapContent: {
      type: Boolean,
      default: false
    }
  },
  name: 'bz-setting',
  components: { SettingIcon },
  methods: {
    handleClick(e) {
      if (this.edit) {
        e.preventDefault()
        e.stopPropagation()
        this.onClick(this.index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-el-setting-root {
  width: calc(100% + 8px);
  position: relative;
  margin: -4px;
  padding: 4px;
  height: calc(100% + 4px);

  a {
    text-decoration: none !important;
  }

  &.wrapContent {
    width: max-content;
  }

  &.edit {
    border: solid 2px transparent;
  }

  .setting {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
    left: 0;
    top: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 2;

    .setting-icon {
      background-color: white;
      padding: 5px;
      box-shadow: 0 0 4px 2px #00000022;
      border-radius: 2px;
    }
  }

  &.edit {
    &:hover {
      border: solid 2px var(--bz-edit-active);

      .setting {
        display: flex;
      }
    }
  }
}
</style>
