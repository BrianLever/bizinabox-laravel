<template>
  <div class="bz-section-container bz-sec--timeline-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />
          <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />
          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />

          <div class="timeline-items-field">
            <bz-items :edit="edit" v-model="data.items" :cols="1" :shadow="false" :spacing="false">
              <template slot-scope="{ item, index }">
                <div class="time-line-item" :style="listItemStyle(index)">
                  <div class="timeline-dot" :style="dotStyle" v-if="setting.listElements.date">
                    <bz-title :edit="edit" v-model="data.items[index].date" :background-color="theme.primaryColor" :mb="0" />
                  </div>
                  <div class="timeline-content" :style="listContentStyle(index)">
                    <bz-alignment :alignment="contentAlignment(index)">
                      <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="backgroundColor" />

                      <bz-text :edit="edit" v-model="data.items[index].description" v-if="setting.listElements.description" :background-color="backgroundColor" />
                    </bz-alignment>
                  </div>
                </div>
              </template>
            </bz-items>
          </div>
        </bz-alignment>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzTitle from '../../components/section/BzTitle'
import BzContainer from '../../components/section/BzContainer'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzAlignment from '../../components/section/BzAlignment'
import BzDivider from '../../components/section/BzDivider'

export default {
  extends: BzSection,
  components: { BzDivider, BzAlignment, BzItems, BzText, BzSubtitle, BzContainer, BzTitle, BzBackground },
  computed: {
    dotStyle() {
      if (this.setting.layouts.shape === 'circle') {
        return {
          borderRadius: '1000px'
        }
      }
      if (this.setting.layouts.shape === 'hexagon') {
        return {
          clipPath: 'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)'
        }
      }
    }
  },
  methods: {
    listItemStyle(index) {
      if (this.setting.alignment === 'alternate') {
        if (index % 2) {
          return {
            flexDirection: 'row-reverse'
          }
        }
      }

      if (this.setting.alignment === 'right') {
        return {
          flexDirection: 'row-reverse'
        }
      }
    },
    listContentStyle(index) {
      if (this.setting.alignment === 'alternate') {
        if (index % 2) {
          return {
            paddingRight: '30px'
          }
        }
      }

      if (this.setting.alignment === 'right') {
        return {
          paddingRight: '30px'
        }
      }

      return {
        paddingLeft: '30px'
      }
    },
    contentAlignment(index) {
      if (this.setting.alignment === 'alternate') {
        if (index % 2) {
          return 'right'
        }
      }

      if (this.setting.alignment === 'right') {
        return 'right'
      }

      return 'left'
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-sec--timeline-3-root {
  .timeline-items-field {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
  }

  &.bz-md {
    .timeline-items-field {
      align-items: center;
    }
  }

  .timeline-items-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    max-width: 600px;
    width: 100%;

    .time-line-item {
      position: relative;
      width: 100%;
      display: flex;

      .timeline-dot {
        width: 80px;
        height: 80px;
        background-color: var(--bz-primary-color);
        margin-left: 7px;
        margin-top: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .timeline-content {
        width: max-content;
      }
    }
  }
}
</style>
