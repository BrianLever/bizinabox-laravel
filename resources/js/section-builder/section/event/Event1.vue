<template>
  <div class="bz-section-container bz-sec--event-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-text-element :edit="edit" v-model="data.elements" :background-color="backgroundColor" :setting="setting.elements" />

        <bz-items :edit="edit" v-model="data.items" :cols="1" :shadow="false" :spacing="false">
          <template slot-scope="{ item, index }">
            <div class="bz-event-item-row">
              <div class="bz-event-image" v-if="setting.listElements.image">
                <bz-image :edit="edit" :ratio="2 / 3" v-model="data.items[index].image" />
              </div>

              <div class="bz-event-date" v-if="setting.listElements.date">
                <bz-date :edit="edit" v-model="data.items[index].date" />
              </div>

              <div class="bz-event-venue" v-if="setting.listElements.venue">
                <bz-subtitle :edit="edit" v-model="data.items[index].venue" :background-color="backgroundColor" :mb="0" />
              </div>

              <div class="bz-event-location" v-if="setting.listElements.location">
                <bz-subtitle :edit="edit" v-model="data.items[index].location" :background-color="backgroundColor" :mb="0" />
              </div>

              <div class="bz-event-tickets" v-if="setting.listElements.buttons">
                <bz-button :edit="edit" v-model="item.button" :background-color="backgroundColor" />
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
import BzTextElement from '../../components/section/BzTextElement'
import BzText from '../../components/section/BzText'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzTitle from '../../components/section/BzTitle'
import BzContainer from '../../components/section/BzContainer'
import BzItems from '../../components/section/BzItems'
import BzImage from '../../components/section/BzImage'
import BzDate from '../../components/section/BzDate'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzButton from '../../components/section/BzButton'

export default {
  extends: BzSection,
  components: {
    BzButton,
    BzSubtitle,
    BzDate,
    BzImage,
    BzItems,
    BzContainer,
    BzTitle,
    BzButtonGroup,
    BzText,
    BzTextElement,
    BzBackground
  }
}
</script>
<style lang="scss">
.bz-sec--event-1-root {
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
    .bz-event-location,
    .bz-event-tickets {
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
      font-weight: bold;
      color: var(--bz-secondary-color);

      .bz-ee-date {
        font-size: 26px;
        font-weight: bold;
      }
    }

    .bz-event-venue {
      flex: 1 1 20%;
      font-weight: bold;
    }

    .bz-event-location {
      flex: 1 1 20%;
      font-weight: bold;
    }

    .bz-event-tickets {
      flex: 1 1 10%;
      font-weight: bold;
    }
  }
}
</style>
