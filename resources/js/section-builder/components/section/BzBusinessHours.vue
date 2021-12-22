<template>
  <div class="bz-business-hours-root" :style="{ fontFamily: theme.paragraphFont, color: color }" :class="{ edit }">
    <div :class="'business-hour-wrapper-' + design">
      <div class="open-hour-item" v-for="hour of businessHours">
        <div class="day" :style="{ fontFamily: theme.titleFont, color: dayColor }">{{ hour.day }}</div>
        <div class="line" v-if="design === 4">
          <div :style="{ backgroundColor: color }"></div>
        </div>
        <div class="label">{{ hour.openHour.label }}</div>
      </div>
    </div>
    <div class="business-hour-setting">
      <div class="icon" @click="openSettingSlider(1, 'tab-business-hours')">
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
  name: 'bz-business-hours',
  props: {
    location: {
      type: String,
      default: ''
    },
    design: {
      type: Number,
      default: 1
    }
  },
  computed: {
    dayColor() {
      let originalColor = tinycolor(this.color)
      return originalColor.darken(20).toString()
    },
    businessHours() {
      let businessHours = []
      let selectedBusiness = this.templateSetting.businesses.find((business) => business.companyName === this.location)

      if (typeof selectedBusiness === 'undefined') {
        selectedBusiness = this.templateSetting.businesses[0]
      }

      if (selectedBusiness) {
        for (let key in selectedBusiness.businessHours) {
          if (businessHours.length > 0) {
            let lastBusinessHour = businessHours[businessHours.length - 1]
            if (lastBusinessHour.openHour.type === selectedBusiness.businessHours[key].type && lastBusinessHour.openHour.label === selectedBusiness.businessHours[key].label) {
              lastBusinessHour.day = lastBusinessHour.day.split('-')[0] + '-' + key
              continue
            }
          }
          businessHours.push({
            day: key,
            openHour: selectedBusiness.businessHours[key]
          })
        }
      }

      return businessHours
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-business-hours-root {
  width: 100%;
  margin: 30px 0;
  border: solid 2px transparent;
  position: relative;

  .business-hour-wrapper {
    &-1,
    &-3 {
      width: 100%;
      .open-hour-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .label,
        .day {
          text-transform: capitalize !important;
        }
      }
    }

    &-2 {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .open-hour-item {
        width: max-content;
        padding: 10px;
        .day {
          font-size: 1.5em;
          font-weight: bold;
          margin-bottom: 10px;
        }
      }
    }

    &-3 {
      .open-hour-item {
        margin: 20px 0;
        .day,
        .label {
          text-transform: uppercase;
        }
      }
    }

    &-3 {
      .open-hour-item {
        margin: 20px 0;
        .day,
        .label {
          text-transform: uppercase;
        }
      }
    }

    &-4 {
      width: 100%;
      .open-hour-item {
        width: 100%;
        display: table;
        .day,
        .label,
        .line {
          display: table-cell;
          width: auto;
          text-transform: capitalize;
        }
        .day,
        .label {
          white-space: nowrap;
        }
        .line {
          width: 100%;
          div {
            width: calc(100% - 20px);
            height: 1px;
            margin: 2px 10px;
            opacity: 0.3;
          }
        }
      }
    }
  }

  .business-hour-setting {
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

      .business-hour-setting {
        display: flex;
      }
    }
  }

  .open-hour-item {
    margin-bottom: 16px;
  }
}
</style>
