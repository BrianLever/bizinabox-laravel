<template>
  <div class="bz-section-container bz-sec--sectionName-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background">
      <div class="bz-row" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
        <div class="bz-col-lg-6 py-0">
          <bz-background size="m">
            <bz-container>
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :background-color="backgroundColor" />

                <bz-subtitle :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

                <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
              </bz-alignment>

              <bz-items :edit="edit" v-model="data.items" :cols="1" :shadow="false" :spacing="false">
                <template slot-scope="{ item, index }">
                  <div class="bz-col-12 py-0">
                    <div class="bz-row" :class="{ 'bz-row-reverse': setting.layouts.alignment === 'right' }">
                      <div class="bz-col-8 py-0">
                        <bz-alignment :alignment="setting.layouts.alignment">
                          <bz-text :bold="true" :edit="edit" v-model="item.title" v-if="setting.listElements.title" :size="'1.1em'" />
                        </bz-alignment>
                      </div>
                      <div class="bz-col-4 py-0">
                        <bz-alignment :alignment="setting.layouts.alignment">
                          <bz-text :bold="true" :edit="edit" v-model="item.price" v-if="setting.listElements.price" :size="'1.1em'" />
                        </bz-alignment>
                      </div>
                    </div>
                  </div>
                  <div class="bz-col-12 py-0">
                    <bz-alignment :alignment="setting.layouts.alignment">
                      <bz-text :edit="edit" v-model="item.subtitle" v-if="setting.listElements.description" />
                    </bz-alignment>
                  </div>
                </template>
              </bz-items>
            </bz-container>
          </bz-background>
        </div>
        <div class="bz-col-lg-6 py-0"></div>
      </div>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzAlignment from '../../components/section/BzAlignment'
import BzContainer from '../../components/section/BzContainer'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzItems from '../../components/section/BzItems'

export default {
  components: { BzItems, BzSubtitle, BzContainer, BzAlignment, BzText, BzTitle, BzBackground },
  extends: BzSection,
  name: 'Menu1'
}
</script>

<style scoped></style>
