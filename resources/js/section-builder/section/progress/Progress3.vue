<template>
  <div class="bz-section-container bz-sec--progress-3-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :background-color="backgroundColor">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="1" :shadow="false">
          <template slot-scope="{ item, index }">
            <div class="bz-fl-progress-title">
              <bz-title :edit="edit" v-if="setting.listElements.title" v-model="data.items[index].title" :background-color="backgroundColor" />
            </div>
            <div class="bz-fl-progress" :class="{ edit }">
              <div class="progress-bar" :style="{ '--percent-value': data.items[index].value + '%' }">
                <div class="progress-thumb"></div>
              </div>
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
  components: {
    SettingIcon,
    BzButton,
    BzItems,
    BzBackground,
    BzContainer,
    BzAlignment,
    BzTitle,
    BzText,
    BzSubtitle
  },
  extends: BzSection,
  name: 'Progress3',
  data() {
    return {
      editing: false
    }
  },
  methods: {
    openProgressEditForm(index) {
      this.editing = index
    },
    hideProgressEditForm() {
      this.editing = false
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--progress-3-root {
  .bz-fl-progress {
    display: flex;
    justify-content: space-between;
    align-items: center;

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

    .progress-bar {
      width: 80%;
      background-color: #00000012;
      height: 3px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-start;

      .progress-thumb {
        width: var(--percent-value);
        height: 100%;
        background-color: var(--bz-primary-color);
        display: flex;
        justify-content: flex-end;
        align-items: center;

        &::after {
          position: absolute;
          content: '';
          width: 24px;
          height: 24px;
          border-radius: 24px;
          background-color: var(--bz-primary-color);
        }
      }
    }

    .progress-value {
      width: 80px;
      height: 80px;
      border-radius: 80px;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      color: var(--bz-primary-color);
    }

    .bz-form-progress-value {
      position: absolute;
      width: 200px;
      padding: 10px;
      box-shadow: 0 0 10px 2px #00000012;
      border: solid 1px #00000012;
      bottom: -10px;
      background-color: white;
      z-index: 100000;
      left: calc(50% - 100px);
    }
  }

  .bz-fl-progress-title {
    margin-bottom: 10px;
  }
}
</style>
