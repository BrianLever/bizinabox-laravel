<template>
  <div class="zb_el-address-root" :style="{ fontFamily: theme.paragraphFont, color: color }" :class="{ edit }">
    <div>{{ business.address }}</div>
    <div>{{ business.city }}, {{ business.state }}</div>
    <div>{{ business.country }}</div>

    <div class="business-address-setting">
      <div class="icon" @click="openSettingSlider(1, 'tab-address')">
        <setting-icon fill-color="#808080" />
      </div>
    </div>
  </div>
</template>

<script>
import BzElement from '../BzElement'
import SettingIcon from '../icons/Setting'

export default {
  components: { SettingIcon },
  extends: BzElement,
  name: 'bz-address',
  props: {
    location: {
      type: String,
      default: ''
    }
  },
  computed: {
    business() {
      let selectedBusiness = this.templateSetting.businesses.find((business) => business.companyName === this.location)

      if (typeof selectedBusiness === 'undefined') {
        selectedBusiness = this.templateSetting.businesses[0]
      }

      return selectedBusiness
    }
  }
}
</script>
<style lang="scss" scoped>
.zb_el-address-root {
  position: relative;
  border: solid 2px transparent;

  .business-address-setting {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;

    .icon {
      box-shadow: 0 0 10px 5px #00000012;
      background-color: white;
      padding: 6px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  &.edit {
    &:hover {
      border: solid 2px var(--bz-section-edit-active-color);

      .business-address-setting {
        display: flex;
      }
    }
  }
}
</style>
