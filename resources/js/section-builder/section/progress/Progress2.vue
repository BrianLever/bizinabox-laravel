<template>
  <div class="bz-section-container bz-sec--progress-2-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :background-color="backgroundColor">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="setting.column" :shadow="false">
          <template slot-scope="{ item, index }">
            <div class="bz-fl-progress" :class="{ edit }" :style="progressStyle(data.items[index].value)">
              <span class="progress-left">
                <span class="progress-bar"></span>
              </span>
              <span class="progress-right">
                <span class="progress-bar"></span>
              </span>
              <div class="progress-value" v-if="setting.listElements.value">{{ data.items[index].value }}%</div>

              <div class="setting">
                <div class="setting-icon" @click.stop.prevent="openProgressEditForm(index)">
                  <setting-icon fill-color="#808080" />
                </div>
              </div>

              <div class="bz-form-progress-value" v-if="editing === index" v-click-outside="{ onClick: hideProgressEditForm }">
                <vue-material-slider
                  :min="0"
                  :max="100"
                  v-model="data.items[index].value"
                  thumbLabel
                  :step="1"
                  :displayWith="
                    function (value) {
                      return value
                    }
                  "
                />
              </div>
            </div>

            <div class="bz-fl-progress-title">
              <bz-title :edit="edit" v-if="setting.listElements.title" v-model="data.items[index].title" :background-color="backgroundColor" />
            </div>
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzTitle from '../../components/section/BzTitle'
import BzAlignment from '../../components/section/BzAlignment'
import BzContainer from '../../components/section/BzContainer'
import BzBackground from '../../components/section/BzBackground'
import BzItems from '../../components/section/BzItems'
import BzButton from '../../components/section/BzButton'
import SettingIcon from '../../components/icons/Setting'

export default {
  components: { SettingIcon, BzButton, BzItems, BzBackground, BzContainer, BzAlignment, BzTitle, BzText, BzSubtitle },
  extends: BzSection,
  name: 'Progress2',
  data() {
    return {
      editing: false
    }
  },
  computed: {
    containerStyle() {}
  },
  methods: {
    openProgressEditForm(index) {
      this.editing = index
    },
    hideProgressEditForm() {
      this.editing = false
    },
    contentStyle(value) {},
    progressStyle(value) {
      const degreePerPercent = 180 / 50
      if (value < 50) {
        return {
          '--degree-1': value * degreePerPercent + 'deg',
          '--degree-2': '0deg'
        }
      } else {
        return {
          '--degree-1': '180deg',
          '--degree-2': (value - 50) * degreePerPercent + 'deg'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--progress-2-root {
  .bz-fl-progress {
    width: 150px;
    height: 150px;
    background: none;
    margin: 0 auto;
    box-shadow: none;
    position: relative;

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

    &:hover {
      .setting {
        display: flex;
      }
    }

    .bz-form-progress-value {
      position: absolute;
      width: 200px;
      padding: 10px;
      box-shadow: 0 0 10px 2px #00000012;
      border: solid 1px #00000012;
      bottom: -50px;
      background-color: white;
      z-index: 100000;
    }

    &:after {
      content: '';
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 8px solid #f2f5f5;
      position: absolute;
      top: 0;
      left: 0;
    }

    & > span {
      width: 50%;
      height: 100%;
      overflow: hidden;
      position: absolute;
      top: 0;
      z-index: 1;
    }

    & .progress-left {
      left: 0;
    }

    & .progress-bar {
      width: 100%;
      height: 100%;
      background: none;
      border-width: 8px;
      border-style: solid;
      position: absolute;
      top: 0;
    }

    & .progress-left .progress-bar {
      left: 100%;
      border-top-right-radius: 80px;
      border-bottom-right-radius: 80px;
      border-left: 0;
      transform-origin: center left;
    }

    & .progress-right {
      right: 0;
    }

    & .progress-right .progress-bar {
      left: -100%;
      border-top-left-radius: 80px;
      border-bottom-left-radius: 80px;
      border-right: 0;
      transform-origin: center right;
      animation: loading-1 0.8s linear forwards;
    }

    & .progress-value {
      width: 100%;
      height: 100%;
      font-size: 36px;
      color: var(--bz-primary-color);
      text-align: center;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & .progress-bar {
      border-color: var(--bz-primary-color);
    }

    & .progress-left .progress-bar {
      animation: loading-2 0.8s linear forwards 0.8s;
    }

    @keyframes loading-1 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(var(--degree-1));
        transform: rotate(var(--degree-1));
      }
    }
    @keyframes loading-2 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(var(--degree-2));
        transform: rotate(var(--degree-2));
      }
    }
  }

  .bz-fl-progress-title {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
