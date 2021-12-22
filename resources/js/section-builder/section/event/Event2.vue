<template>
  <div class="bz-section-container bz-sec--event-2-root" :class="{ [breakPoint]: true }">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-text-element :edit="edit" v-model="data.elements" :background-color="backgroundColor" :setting="setting.elements" />

        <bz-items :edit="edit" v-model="data.items" :cols="1" :shadow="false">
          <template slot-scope="{ item, index }">
            <div class="bz-event-item-row">
              <div class="bz-event-image">
                <bz-image :edit="edit" :ratio="2 / 3" v-model="data.items[index].image" />
              </div>

              <div class="bz-event-date" v-if="setting.listElements.date">
                <bz-date :edit="edit" v-model="data.items[index].date" :variant="2" />
              </div>

              <div class="bz-event-venue" v-if="setting.listElements.venue">
                <bz-text :edit="edit" v-model="data.items[index].venue" :background-color="backgroundColor" :mb="0" />
              </div>

              <div class="bz-event-location" v-if="setting.listElements.location">
                <bz-text :edit="edit" v-model="data.items[index].location" :background-color="backgroundColor" :mb="0" />
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
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzTextElement from '../../components/section/BzTextElement'
import BzItems from '../../components/section/BzItems'
import BzImage from '../../components/section/BzImage'
import BzDate from '../../components/section/BzDate'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'

export default {
  extends: BzSection,
  components: { BzText, BzSubtitle, BzDate, BzImage, BzItems, BzTextElement, BzContainer, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--event-2-root {
  .bz-event-item-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    margin: 1rem -15px;
    min-height: 48px;

    .bz-event-image,
    .bz-event-date,
    .bz-event-venue,
    .bz-event-location {
      padding-left: 15px;
      padding-right: 15px;
    }

    .bz-event-image {
      flex: 1 1 15%;
      img {
        border-radius: 4px;
      }
    }

    .bz-event-date {
      flex: 1 1 20%;
      color: var(--bz-secondary-color);
    }

    .bz-event-venue {
      flex: 1 1 20%;
    }

    .bz-event-location {
      flex: 1 1 20%;
    }
  }
}
</style>
