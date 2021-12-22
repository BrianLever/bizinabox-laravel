<template>
  <div class="bz-business-hours-root" :class="{ edit }">
    <div class="w-100 open-hour-item" v-for="(hour, day) of businessHours">
      <div class="w-100 d-flex align-items-center justify-content-between">
        <div class="day-item">{{ day }}</div>
        <div class="hour-item">
          <div class="arrow-back-icon" @click="prev(day)">
            <arrow-back-ios-icon :size="14" :fill-color="'#555555'" />
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <template v-if="hour.dayTime">
              <div class="day-time">
                <div class="start-time" @click="editDayStartTime(day)">{{ hour.dayTime.start }}</div>
                <span>-</span>
                <div class="end-time" @click="editDayEndTime(day)">{{ hour.dayTime.end }}</div>
              </div>
            </template>
            <template v-if="hour.type">
              <span style="font-size: 12px; padding: 0 10px">{{ hour.type }}</span>
            </template>
            <template v-if="hour.nightTime">
              <div class="night-time">
                <div class="start-time" @click="editNightStartTime(day)">{{ hour.nightTime.start }}</div>
                <span>-</span>
                <div class="end-time" @click="editNightEndTime(day)">{{ hour.nightTime.start }}</div>
              </div>
            </template>
          </div>
          <div class="arrow-forward-icon" @click="next(day)">
            <arrow-forward-ios-icon :size="14" :fill-color="'#555555'" />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <hr />
      <div class="d-flex justify-content-end align-items-center">
        <button class="btn bz-btn-default-outline mr-3" @click="">Cancel</button>
        <button class="btn bz-btn-default" @click="handleApply">Apply</button>
      </div>
    </div>
  </div>
</template>

<script>
import BzElement from '../BzElement'
import SettingIcon from '../icons/Setting'
import ArrowBackIosIcon from '../icons/ArrowBackIos'
import ArrowForwardIosIcon from '../icons/ArrowForwardIos'
import BzTimePicker from '../page/BzTimePicker'

export default {
  components: {
    BzTimePicker,
    ArrowForwardIosIcon,
    ArrowBackIosIcon,
    SettingIcon
  },
  extends: BzElement,
  name: 'business-hours-editor',
  props: {
    location: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      businessHours: {},
      format: { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }
    }
  },
  mounted() {
    let selectedBusiness = this.templateSetting.businesses.find((business) => business.companyName === this.location)
    this.businessHours = selectedBusiness.businessHours
  },
  methods: {
    editDayStartTime(day) {
      this.$store.commit('openTimePicker', {
        time: this.businessHours[day].dayTime.start,
        onChange: (val) => {
          this.businessHours[day].dayTime.start = val
        }
      })
    },
    editDayEndTime(day) {
      this.$store.commit('openTimePicker', {
        time: this.businessHours[day].dayTime.end,
        onChange: (val) => {
          this.businessHours[day].dayTime.end = val
        }
      })
    },
    editNightStartTime(day) {
      this.$store.commit('openTimePicker', {
        time: this.businessHours[day].nightTime.start,
        onChange: (val) => {
          this.businessHours[day].nightTime.start = val
        }
      })
    },
    editNightEndTime(day) {
      this.$store.commit('openTimePicker', {
        time: this.businessHours[day].nightTime.end,
        onChange: (val) => {
          this.businessHours[day].nightTime.end = val
        }
      })
    },
    next(day) {
      let status = this.status(this.businessHours[day])
      if (status === 8) {
        this.changeHour(day, 1)
      } else {
        this.changeHour(day, status + 1)
      }
    },
    prev(day) {
      let status = this.status(this.businessHours[day])
      if (status === 1) {
        this.changeHour(day, 8)
      } else {
        this.changeHour(day, status - 1)
      }
    },
    status(hour) {
      if (hour.type === 'open') {
        return 1
      }
      if (hour.type === 'closed') {
        return 2
      }

      if (hour.type === 'appointment only') {
        if (!hour.dayTime || !hour.nightTime) {
          return 3
        }
        if (hour.dayTime && !hour.nightTime) {
          return 5
        }
        if (!hour.dayTime && hour.nightTime) {
          return 6
        }
      }

      if (!hour.type && hour.dayTime && !hour.nightTime) {
        return 4
      }

      if (hour.dayTime && hour.nightTime) {
        return 7
      }

      if (hour.type === 'non-stop') {
        return 8
      }

      return 1
    },
    changeHour(day, status) {
      let hour = {}
      if (status === 1) {
        hour = {
          type: 'open',
          label: 'open'
        }
      } else if (status === 2) {
        hour = {
          type: 'closed',
          label: 'closed'
        }
      } else if (status === 3) {
        hour = {
          type: 'appointment only',
          label: 'appointment only'
        }
      } else if (status === 4) {
        hour = {
          dayTime: {
            start: '09:00 am',
            end: '12:00 pm'
          }
        }
      } else if (status === 5) {
        hour = {
          type: 'appointment only',
          dayTime: {
            start: '09:00 am',
            end: '12:00 pm'
          }
        }
      } else if (status === 6) {
        hour = {
          type: 'appointment only',
          nightTime: {
            start: '01:00 pm',
            end: '06:00 pm'
          }
        }
      } else if (status === 7) {
        hour = {
          dayTime: {
            start: '09:00 am',
            end: '12:00 pm'
          },
          nightTime: {
            start: '01:00 pm',
            end: '06:00 pm'
          }
        }
      } else if (status === 8) {
        hour = {
          type: 'non-stop'
        }
      }

      this.businessHours[day] = hour
    },
    handleApply() {}
  }
}
</script>

<style lang="scss" scoped>
.bz-business-hours-root {
  width: 100%;
  margin: 30px 0;
  border: solid 2px transparent;
  position: relative;

  .open-hour-item {
    padding: 15px 10px;
    border: solid 1px #aeaeae;
    border-top: none;

    &:first-child {
      border-top: solid 1px #aeaeae;
    }

    .day-item {
      width: 20%;
    }
    .hour-item {
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-transform: capitalize;
    }

    .arrow-forward-icon,
    .arrow-back-icon {
      padding: 2px;
      cursor: pointer;
      &:hover {
        background-color: #00000010;
      }
    }

    .day-time,
    .night-time {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .start-time,
      .end-time {
        border-bottom: solid 1px #8080807f;
        padding-bottom: 0;
        padding-right: 4px;
        padding-left: 4px;
        text-transform: uppercase;

        &:hover {
          border-color: #555555;
        }
      }

      span {
        padding: 0 5px;
      }
    }
  }
}
</style>
