<template>
  <div class="bz-section-container bz-sec--progress-1-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :background-color="backgroundColor">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="1" :shadow="false">
          <template slot-scope="{ item, index }">
            <div class="bz-fl-progress-header">
              <bz-title :edit="edit" v-if="setting.listElements.title" v-model="data.items[index].title" :background-color="backgroundColor" />

              <div class="bz-ee-progress-value">
                <bz-text :bold="true" :edit="edit" v-if="setting.listElements.title" v-model="data.items[index].value" :background-color="backgroundColor" />
                <bz-text :bold="true" v-if="setting.listElements.title" value="%" :background-color="backgroundColor" />
              </div>
            </div>
            <div class="bz-fl-progress-bar" :class="{ edit }">
              <div class="business-address-setting">
                <div class="icon" @click.stop.prevent="openProgressEditForm(index)">
                  <setting-icon fill-color="#808080" />
                </div>
              </div>

              <div class="bz-fl-progress-bar-container" :style="containerStyle">
                <div class="bz-fl-progress-bar-container" :style="contentStyle(data.items[index].value)"></div>
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
  components: { SettingIcon, BzButton, BzItems, BzBackground, BzContainer, BzAlignment, BzTitle, BzText, BzSubtitle },
  extends: BzSection,
  name: 'Progress1',
  data() {
    return {
      editing: false
    }
  },
  computed: {
    containerStyle() {
      return {
        backgroundColor: this.theme.primaryColor.brighten(50)
      }
    }
  },
  methods: {
    contentStyle(value) {
      return {
        backgroundColor: this.theme.primaryColor,
        width: value + '%'
      }
    },
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
.bz-sec--progress-1-root {
  .bz-fl-progress-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    .bz-ee-progress-value {
      display: flex;
      align-items: center;
      flex-direction: row;
    }
  }

  .bz-fl-progress-bar {
    position: relative;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 10px 0;

    .bz-fl-progress-bar-container {
      width: 100%;
      height: 15px;
      border-radius: 100px;

      .bz-fl-progress-bar-content {
        height: 100%;
        border-radius: 100px;
      }
    }

    &.edit {
      .business-address-setting {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        border: solid 2px transparent;

        .icon {
          box-shadow: 0 0 10px 5px #00000012;
          background-color: white;
          padding: 6px;
          border-radius: 4px;
          cursor: pointer;
        }
      }

      &:hover {
        border: solid 2px var(--bz-section-edit-active-color);
        .business-address-setting {
          display: flex;
        }
      }
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
}
</style>
