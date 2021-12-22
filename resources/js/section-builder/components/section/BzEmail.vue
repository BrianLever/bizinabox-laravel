<template>
  <div class="bz-el--business-email-root" :style="{ fontFamily: theme.paragraphFont, color: color }" :class="{ edit }">
    <div class="text-email">{{ business.contact.email }}</div>
    <div class="business-email-setting">
      <div class="icon" @click="openSettingSlider(1, 'tab-contact')">
        <setting-icon fill-color="#808080" />
      </div>
    </div>
  </div>
</template>

<script>
import SettingIcon from '../icons/Setting'
import BzElement from '../BzElement'
export default {
  extends: BzElement,
  components: { SettingIcon },
  name: 'bz-email',
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
.bz-el--business-email-root {
  position: relative;
  border: solid 2px transparent;

  .text-email {
    text-decoration: underline;
    height: 2rem;
    display: flex;
    align-items: center;
  }

  .business-email-setting {
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

      .business-email-setting {
        display: flex;
      }
    }
  }
}
</style>
