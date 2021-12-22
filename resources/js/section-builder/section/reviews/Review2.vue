<template>
  <div class="bz-section-container bz-sec--reviews-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="theme.primaryColor" />

          <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-items :edit="edit" v-model="data.items" :cols="setting.column" :shadow="false">
          <template slot-scope="{ item, index }">
            <bz-card :padding="25" class="position-relative">
              <div class="d-flex">
                <bz-image :edit="edit" :ratio="1" v-model="data.items[index].image" width="100px" rounded v-if="setting.listElements.image" />
                <div class="d-flex flex-column justify-content-end pl-4">
                  <bz-title :edit="edit" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="cardBackgroundColor" :mb="0" />

                  <bz-setting :edit="edit" :index="index" :on-click="openStarForm">
                    <star-rating
                      v-model:rating="data.items[index].review"
                      :max-rating="data.items[index].review"
                      :read-only="true"
                      :show-rating="false"
                      :star-size="18"
                      active-color="#fd9d20"
                    />

                    <div class="bz-form-review-stars" v-if="editing === index" v-click-outside="{ onClick: hideReviewsEditForm }">
                      <div class="mr-2" style="font-size: 12px">Stars</div>
                      <vue-material-slider
                        :min="0"
                        :max="5"
                        v-model="data.items[index].review"
                        thumbLabel
                        :step="1"
                        :displayWith="
                          function (value) {
                            return value
                          }
                        "
                      />
                    </div>
                  </bz-setting>

                  <bz-text :edit="edit" v-model="data.items[index].date" v-if="setting.listElements.date" :background-color="cardBackgroundColor" :mb="0" />
                </div>
              </div>

              <bz-text class="my-3" :edit="edit" v-model="data.items[index].description" v-if="setting.listElements.title" :background-color="cardBackgroundColor" />

              <div class="bz-ee-button-container">
                <bz-button :edit="edit" v-model="data.items[index].button" :background-color="backgroundColor" :link="false" v-if="setting.listElements.buttons" :rounded="true" />
              </div>
            </bz-card>
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzContainer from '../../components/section/BzContainer'
import BzBackground from '../../components/section/BzBackground'
import BzAlignment from '../../components/section/BzAlignment'
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzDivider from '../../components/section/BzDivider'
import BzButton from '../../components/section/BzButton'
import StarRating from 'vue-star-rating'
import BzImage from '../../components/section/BzImage'
import BzSetting from '../../components/section/BzSetting'
import BzCard from '../../components/section/BzCard'

export default {
  components: {
    BzCard,
    BzSetting,
    BzImage,
    BzButton,
    BzDivider,
    BzItems,
    BzText,
    BzTitle,
    BzAlignment,
    BzBackground,
    BzContainer,
    StarRating
  },
  extends: BzSection,
  name: 'Review2',
  data() {
    return {
      editing: false
    }
  },
  computed: {
    cardBackgroundColor() {
      return '#ffffff'
    }
  },
  methods: {
    openStarForm(index) {
      this.editing = index
    },
    hideReviewsEditForm() {
      this.editing = false
    }
  }
}
</script>

<style lang="scss">
.bz-sec--reviews-2-root {
  .bz-form-review-stars {
    position: absolute;
    display: flex;
    align-items: center;
    width: 200px;
    padding: 10px;
    box-shadow: 0 0 10px 2px #00000012;
    border: solid 1px #00000012;
    bottom: -50px;
    background-color: white;
    z-index: 100000;
  }

  .bz-ee-button-container {
    position: absolute;
    bottom: -20px;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    left: 0;
  }
}
</style>
