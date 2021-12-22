<template>
  <div id="panel_area" class="bz-setting-pannel toggle_panel_area m-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light m-quick-sidebar--on p-0 custom-scroll-h">
    <span class="m-panel-area-toggle-open panel_area_toggle_btn z-99">
      <i class="flaticon-reply" />
    </span>
    <div class="m-quick-sidebar__content py-3">
      <div class="tab-content">
        <div id="m_quick_sidebar_tabs_messenger" class="tab-pane active" role="tabpanel">
          <div class="m-messenger m-messenger--message-arrow m-messenger--skin-light">
            <div class="m-list-timeline">
              <div class="m-list-timeline__group">
                <div class="m-list-timeline__heading text-capitalize mb-0">
                  <h4 class="panel_tab_heading">Navigation</h4>
                  <div class="panel_tab_area">
                    <a href="#" class="panel_tab_btn" :class="{ panel_tab_active: nav === 'setting' }" @click.prevent="nav = 'setting'">Settings</a>
                    <a href="#" class="panel_tab_btn" :class="{ panel_tab_active: nav === 'bg' }" @click.prevent="nav = 'bg'">Background</a>
                    <div class="clearfix" />
                  </div>
                </div>

                <div class="panel_tab_content_section">
                  <div id="setting_area" class="panel_tab_content_area" :class="{ area_active: nav === 'setting' }">
                    <div class="w-100 p-3">
                      <div v-if="categorySections.length > 1" class="w-100">
                        <h6>Layout</h6>
                        <div class="layouts-wrapper">
                          <div class="back-button">
                            <arrow-back-icon fill-color="white" />
                          </div>
                          <div class="current-layout">{{ setting.layout }}/{{ categorySections.length }}</div>
                          <div class="forward-button">
                            <arrow-forward-icon fill-color="white" />
                          </div>
                        </div>
                      </div>

                      <div v-if="setting.hasOwnProperty('alignment')" class="w-100 mt-3">
                        <h6>Alignment</h6>
                        <div class="alignment-wrapper">
                          <div class="align-left" :class="{ active: setting.alignment === 'left' }" @click="setting.alignment = 'left'">
                            <align-left-icon />
                          </div>
                          <div
                            v-if="(setting.alignments || []).includes('alternate')"
                            class="align-alternate"
                            :class="{ active: setting.alignment === 'alternate' }"
                            @click="setting.alignment = 'alternate'"
                          >
                            <align-alternate-icon />
                          </div>
                          <div class="align-right" :class="{ active: setting.alignment === 'right' }" @click="setting.alignment = 'right'">
                            <align-right-icon />
                          </div>
                        </div>
                      </div>

                      <div v-if="setting.hasOwnProperty('columns')" class="w-100 mt-3">
                        <h6>Columns</h6>
                        <div class="column-wrapper">
                          <div
                            v-for="column of setting.columns"
                            :key="column"
                            class="column-item"
                            :class="{ active: setting.column === column || (column === setting.columns.last() && setting.column > setting.columns.length) }"
                            @click="setting.column = column"
                          >
                            {{ column }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="setting_accordion" class="m-accordion m-accordion--default m-accordion--solid m-accordion--section m-accordion--toggle-arrow" role="tablist">
                      <template v-for="key of Object.keys(setting)">
                        <!--begin::Item-->
                        <div v-if="key === 'paypal'" :key="key" class="m-accordion__item">
                          <div class="m-accordion__item-head" data-area="#setting_accordion_item_paypal_body">
                            <span class="m-accordion__item-title">Paypal</span>
                            <span class="m-accordion__item-mode" />
                          </div>
                          <div id="setting_accordion_item_paypal_body" class="m-accordion__item-body collapse show">
                            <div class="mb-2">
                              <div class="row">
                                <div class="col-5 d-flex align-items-center">
                                  <span>Paypal account</span>
                                </div>
                                <div class="col-7">
                                  <Input v-model="setting.paypal.paypalAccount" :height="30" />
                                </div>
                              </div>
                            </div>

                            <div class="d-flex justify-content-between align-items-center mb-2">
                              <div class="row">
                                <div class="col-5 d-flex align-items-center">
                                  <span class="element_item_label">Currency</span>
                                </div>
                                <div class="col-7">
                                  <bz-select v-model="setting.paypal.currency" :match-width="false" :options="currencies" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--end::Item-->

                        <!--begin::Item-->
                        <div v-if="key === 'elements'" :key="key" class="m-accordion__item">
                          <div class="m-accordion__item-head" data-area="#setting_accordion_item_1_body">
                            <span class="m-accordion__item-title">Elements</span>
                            <span class="m-accordion__item-mode" />
                          </div>
                          <div id="setting_accordion_item_1_body" class="m-accordion__item-body collapse show">
                            <template v-for="(item, elKey) of setting.elements">
                              <div :key="elKey" class="d-flex justify-content-between align-items-center mb-2">
                                <span class="element_item_label">
                                  {{ getSettingName(elKey) }}
                                  <template v-if="['width', 'height'].includes(key)"> (px) </template>
                                </span>
                                <template v-if="typeof item === 'boolean'">
                                  <label class="custom_switch">
                                    <input v-model="setting.elements[elKey]" type="checkbox" />
                                    <span />
                                  </label>
                                </template>
                                <template v-else>
                                  <div style="width: 120px">
                                    <Input v-model="setting.elements[elKey]" />
                                  </div>
                                </template>
                              </div>
                            </template>
                          </div>
                        </div>
                        <!--end::Item-->

                        <!--begin::Item-->
                        <div v-if="key === 'layouts'" :key="key" class="m-accordion__item">
                          <div class="m-accordion__item-head" data-area="#setting_accordion_item_3_body">
                            <span class="m-accordion__item-title">Layout Settings</span>
                            <span class="m-accordion__item-mode" />
                          </div>
                          <div id="setting_accordion_item_3_body" class="m-accordion__item-body collapse show">
                            <div v-if="setting.layouts.hasOwnProperty('fullWidth')" class="d-flex justify-content-between align-items-center mb-2">
                              <span class="element_item_label">Full Width</span>
                              <label class="custom_switch">
                                <input v-model="setting.layouts.fullWidth" type="checkbox" />
                                <span />
                              </label>
                            </div>

                            <div v-if="setting.layouts.hasOwnProperty('fullPage')" class="d-flex justify-content-between align-items-center mb-2">
                              <span class="element_item_label">Full Page</span>
                              <label class="custom_switch">
                                <input v-model="setting.layouts.fullPage" type="checkbox" />
                                <span />
                              </label>
                            </div>

                            <div v-if="setting.layouts.hasOwnProperty('animation')" class="d-flex justify-content-between align-items-center mb-2">
                              <div class="row">
                                <div class="col-6 d-flex align-items-center">
                                  <span class="element_item_label">Animation</span>
                                </div>
                                <div class="col-6">
                                  <bz-select v-model="setting.layouts.animation" :options="['bouncy', 'smooth', 'overshoot']" />
                                </div>
                              </div>
                            </div>

                            <div v-if="setting.layouts.hasOwnProperty('interval')" class="d-flex justify-content-between align-items-center mb-2">
                              <div class="row">
                                <div class="col-6 d-flex align-items-center">
                                  <span class="element_item_label">Interval (seconds)</span>
                                </div>
                                <div class="col-6">
                                  <bz-select v-model="setting.layouts.interval" :options="[2, 3, 4, 5]" />
                                </div>
                              </div>
                            </div>

                            <div v-if="setting.layouts.hasOwnProperty('fullSize')" class="d-flex justify-content-between align-items-center mb-2">
                              <span class="element_item_label">Full size</span>
                              <label class="custom_switch">
                                <input v-model="setting.layouts.fullSize" type="checkbox" />
                                <span />
                              </label>
                            </div>

                            <div v-if="setting.layouts.hasOwnProperty('sectionSize')" class="d-flex justify-content-between align-items-center mb-2">
                              <div class="row">
                                <div class="col-6 d-flex align-items-center">
                                  <span class="element_item_label">Section size</span>
                                </div>
                                <div class="col-6">
                                  <bz-select v-model="setting.layouts.sectionSize" :options="['s', 'm', 'l', 'xl']" />
                                </div>
                              </div>
                            </div>

                            <div v-if="setting.layouts.hasOwnProperty('shape')" class="d-flex justify-content-between align-items-center mb-2">
                              <div class="row">
                                <div class="col-6 d-flex align-items-center">
                                  <span class="element_item_label">Shape</span>
                                </div>
                                <div class="col-6">
                                  <template v-if="setting.layouts.hasOwnProperty('shapes') && Array.isArray(setting.layouts.shapes)">
                                    <bz-select v-model="setting.layouts.shape" :options="setting.layouts.shapes" />
                                  </template>
                                  <template v-else>
                                    <bz-select v-model="setting.layouts.shape" :options="['circle', 'square']" />
                                  </template>
                                </div>
                              </div>
                            </div>

                            <div v-if="setting.layouts.hasOwnProperty('valueSize')" class="d-flex justify-content-between align-items-center mb-2">
                              <div class="row">
                                <div class="col-6 d-flex align-items-center">
                                  <span class="element_item_label">Value Size</span>
                                </div>
                                <div class="col-6">
                                  <bz-select v-model="setting.layouts.valueSize" :options="['regular', 'medium', 'large']" />
                                </div>
                              </div>
                            </div>

                            <div v-if="setting.layouts.hasOwnProperty('shadow')" class="d-flex justify-content-between align-items-center mb-2">
                              <span class="element_item_label">Shadow</span>
                              <label class="custom_switch">
                                <input v-model="setting.layouts.shadow" type="checkbox" />
                                <span />
                              </label>
                            </div>

                            <div v-if="setting.layouts.hasOwnProperty('spacing')" class="d-flex justify-content-between align-items-center mb-2">
                              <span class="element_item_label">Spacing</span>
                              <label class="custom_switch">
                                <input v-model="setting.layouts.spacing" type="checkbox" />
                                <span />
                              </label>
                            </div>

                            <div v-if="setting.layouts.hasOwnProperty('alignment')" class="d-flex justify-content-between align-items-center mb-2">
                              <div class="row">
                                <div class="col-6 d-flex align-items-center">
                                  <span class="element_item_label">Content alignment</span>
                                </div>
                                <div class="col-6">
                                  <bz-select v-model="setting.layouts.alignment" :options="['left', 'center', 'right']" />
                                </div>
                              </div>
                            </div>

                            <div v-if="setting.layouts.hasOwnProperty('aspectRatios')" class="d-flex justify-content-between align-items-center mb-2">
                              <div class="row">
                                <div class="col-6 d-flex align-items-center">
                                  <span class="element_item_label">Aspect ratio</span>
                                </div>
                                <div class="col-6">
                                  <bz-select v-model="setting.layouts.aspectRatio" :options="setting.layouts.aspectRatios" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--end::Item-->

                        <!--begin::Item-->
                        <div v-if="key === 'listElements'" :key="key" class="m-accordion__item">
                          <div class="m-accordion__item-head" data-area="#setting_accordion_item_4_body">
                            <span class="m-accordion__item-title">List Elements</span>
                            <span class="m-accordion__item-mode" />
                          </div>
                          <div id="setting_accordion_item_4_body" class="m-accordion__item-body collapse show">
                            <template v-for="listKey in setting.listElements">
                              <div :key="listKey" class="d-flex justify-content-between align-items-center mb-2">
                                <span class="element_item_label">{{ getSettingName(listKey) }}</span>
                                <label class="custom_switch">
                                  <input v-model="setting.listElements[listKey]" type="checkbox" />
                                  <span />
                                </label>
                              </div>
                            </template>
                          </div>
                        </div>
                        <!--end::Item-->

                        <!--begin::Item-->
                        <div v-if="key === 'map'" :key="key" class="m-accordion__item">
                          <div class="m-accordion__item-head" data-area="#setting_accordion_item_map_body">
                            <span class="m-accordion__item-title">Map</span>
                            <span class="m-accordion__item-mode" />
                          </div>
                          <div id="setting_accordion_item_map_body" class="m-accordion__item-body collapse show">
                            <div v-if="setting.map.hasOwnProperty('markers')" class="d-flex justify-content-between align-items-center mb-5">
                              <button class="w-100 btn bz-btn-default mt-3" @click="openManageMarkersModal">Manage markers</button>
                            </div>

                            <div v-if="setting.map.hasOwnProperty('zoomLevel')" class="d-flex justify-content-between align-items-center mb-4">
                              <div class="row">
                                <div class="col-5 d-flex align-items-center">
                                  <span class="element_item_label">Zoom level</span>
                                </div>
                                <div class="col-7">
                                  <vue-material-slider v-model="setting.map.zoomLevel" :min="1" :max="20" thumb-label :step="1" :display-with="displayWith" />
                                </div>
                              </div>
                            </div>

                            <div v-if="setting.map.hasOwnProperty('type')" class="d-flex justify-content-between align-items-center mb-4">
                              <div class="row">
                                <div class="col-5 d-flex align-items-center">
                                  <span class="element_item_label">Section size</span>
                                </div>
                                <div class="col-7">
                                  <bz-select v-model="setting.map.type" :options="setting.map.mapTypes || ['roadmap', 'satellite']" />
                                </div>
                              </div>
                            </div>

                            <div v-if="setting.map.hasOwnProperty('grayscale')" class="d-flex justify-content-between align-items-center mb-4">
                              <span class="element_item_label">Grayscale</span>
                              <label class="custom_switch">
                                <input v-model="setting.map.grayscale" type="checkbox" />
                                <span />
                              </label>
                            </div>

                            <div v-if="setting.map.hasOwnProperty('zoomControl')" class="d-flex justify-content-between align-items-center mb-4">
                              <span class="element_item_label">Zoom control</span>
                              <label class="custom_switch">
                                <input v-model="setting.map.zoomControl" type="checkbox" />
                                <span />
                              </label>
                            </div>
                          </div>
                        </div>
                        <!--end::Item-->

                        <!--begin::Item-->
                        <div v-if="key === 'businessInformation'" :key="key" class="m-accordion__item">
                          <div class="m-accordion__item-head" data-area="#setting_accordion_item_5_body">
                            <span class="m-accordion__item-title">Business information</span>
                            <span class="m-accordion__item-mode" />
                          </div>
                          <div id="setting_accordion_item_5_body" class="m-accordion__item-body collapse show">
                            <div v-if="setting.businessInformation.hasOwnProperty('location')" class="mb-2">
                              <div class="row">
                                <div class="col-5 d-flex align-items-center">
                                  <span class="element_item_label">Location</span>
                                </div>
                                <div class="col-7">
                                  <bz-select v-model="setting.businessInformation.location" :match-width="false" :options="businessLocations" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--end::Item-->

                        <!--begin::Item-->
                        <div v-if="key === 'card'" :key="key" class="m-accordion__item">
                          <div class="m-accordion__item-head" data-area="#setting_accordion_item_6_body">
                            <span class="m-accordion__item-title">Card</span>
                            <span class="m-accordion__item-mode" />
                          </div>
                          <div id="setting_accordion_item_6_body" class="m-accordion__item-body collapse show">
                            <div v-if="setting.card.hasOwnProperty('opacity')" class="mb-2">
                              <div class="row">
                                <div class="col-5 d-flex align-items-center">
                                  <span class="element_item_label">Opacity</span>
                                </div>
                                <div class="col-7">
                                  <vue-material-slider v-model="setting.card.opacity" :min="10" :max="100" thumb-label :step="1" :display-with="displayWith" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--end::Item-->

                        <!--begin::Item-->
                        <div v-if="key === 'iframe'" :key="key" class="m-accordion__item">
                          <div class="m-accordion__item-head" data-area="#setting_accordion_item_7_body">
                            <span class="m-accordion__item-title">Card</span>
                            <span class="m-accordion__item-mode" />
                          </div>
                          <div id="setting_accordion_item_7_body" class="m-accordion__item-body collapse show">
                            <div v-if="setting.iframe.hasOwnProperty('url')" class="mb-2" @click.prevent.stop="openEmbedLinkModal">
                              <label>URL</label>
                              <Input v-model="setting.iframe.url" :height="40" />
                            </div>
                          </div>
                        </div>
                        <!--end::Item-->

                        <!--begin::Item-->
                        <div v-if="key === 'promotion'" :key="key" class="m-accordion__item">
                          <div class="m-accordion__item-head" data-area="#setting_accordion_item_8_body">
                            <span class="m-accordion__item-title">Promotion</span>
                            <span class="m-accordion__item-mode" />
                          </div>
                          <div id="setting_accordion_item_8_body" class="m-accordion__item-body collapse show">
                            <div v-if="setting.promotion.hasOwnProperty('promotionalCode')" class="mb-2">
                              <label>Promotional code</label>
                              <Input v-model="setting.promotion.promotionalCode" :height="40" />
                            </div>
                          </div>
                        </div>
                        <!--end::Item-->
                      </template>
                    </div>
                  </div>
                  <div id="background_area" class="panel_tab_content_area" :class="{ area_active: nav === 'bg' }">
                    <div class="w-100">
                      <div class="p-2 mt-4">
                        <div class="btn-group w-100 background-type">
                          <button type="button" class="btn bg-white p-2" :class="{ active: activeBackgroundType === 'color' }" @click.prevent="activeBackgroundType = 'color'">
                            Color
                          </button>
                          <button type="button" class="btn bg-white p-2" :class="{ active: activeBackgroundType === 'image' }" @click.prevent="activeBackgroundType = 'image'">
                            Image
                          </button>
                          <button type="button" class="btn bg-white p-2" :class="{ active: activeBackgroundType === 'video' }" @click.prevent="activeBackgroundType = 'video'">
                            Video
                          </button>
                        </div>
                      </div>
                      <div v-if="activeBackgroundType === 'color'" class="w-100">
                        <div class="p-2">
                          <bz-color-set v-model="activeBackgroundColor" class="mt-3" />
                          <div class="w-100 text-right py-4">
                            <div class="bz-text-active cursor-pointer" @click.prevent="openThemeSlider">More Colors</div>
                          </div>
                        </div>
                        <div class="background-effect d-flex justify-content-between align-items-center mb-2">
                          <span class="element_item_label">Pattern</span>
                          <label class="custom_switch">
                            <input v-model="activeBackground.pattern" type="checkbox" />
                            <span />
                          </label>
                        </div>
                        <div v-if="activeBackground.pattern" class="w-100 p-4 background-pattern">
                          <div class="row">
                            <div v-for="pattern of bgPatterns" :key="pattern.name" class="col-3">
                              <bz-aspect-view>
                                <img
                                  :src="pattern.url"
                                  class="bz-img-full pattern-item"
                                  :class="{ active: activeBackgroundPattern === pattern.name }"
                                  :alt="pattern.name"
                                  @click="activeBackgroundPattern = pattern.name"
                                />
                              </bz-aspect-view>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-6 d-flex align-items-center">
                              <span class="element_item_label">Strength</span>
                            </div>
                            <div class="col-6">
                              <vue-material-slider v-model="activeBackground.patternStrength" :min="0" :max="100" thumb-label :display-with="displayWith" />
                            </div>
                            <div class="col-6 d-flex align-items-center">
                              <span class="element_item_label">Animation</span>
                            </div>
                            <div class="col-6">
                              <bz-select v-model="activeBackground.animation" :options="animations" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-if="activeBackgroundType === 'image'" class="w-100">
                        <div class="w-100 p-4">
                          <template v-if="activeBackground.image">
                            <bz-aspect-view :ratio="3 / 5">
                              <img :src="activeBackground.image" class="bz-img-full" alt="" />
                            </bz-aspect-view>
                            <button class="w-100 btn bz-btn-default mt-2" @click="openImageSelector">Replace</button>
                          </template>
                          <template v-else>
                            <button class="w-100 btn bz-btn-default mt-3" @click="openImageSelector">Select Image</button>
                          </template>
                          <div class="w-100 mt-3">
                            <div class="row">
                              <div class="col-6 d-flex align-items-center">
                                <span class="element_item_label">Animation</span>
                              </div>
                              <div class="col-6">
                                <bz-select v-model="activeBackground.animation" :options="animations" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-if="activeBackgroundType === 'video'" class="w-100 background-video">
                        <div class="w-100 p-2 mt-2">
                          <div class="col-12">
                            <div class="row">
                              <div v-for="video of bgVideos" :key="video.name" class="col-6">
                                <bz-aspect-view :ratio="1 / 2">
                                  <img
                                    :src="video.url"
                                    class="bz-img-full video-item"
                                    :class="{ active: activeBackgroundVideo === video.name }"
                                    :alt="video.name"
                                    @click="activeBackgroundVideo = video.name"
                                  />
                                </bz-aspect-view>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <template v-if="activeBackgroundType === 'image' || activeBackgroundType === 'video'">
                        <div class="background-effect d-flex justify-content-between align-items-center mb-2 mt-2">
                          <span class="element_item_label">Overlay</span>
                          <label class="custom_switch">
                            <input v-model="activeBackground.overlay" type="checkbox" />
                            <span />
                          </label>
                        </div>
                        <div v-if="activeBackground.overlay" class="w-100 p-4 background-pattern">
                          <bz-color-set v-model="activeBackground.overlayColor" />
                          <div class="row mt-3">
                            <div class="col-4 d-flex align-items-center">
                              <span class="element_item_label">Opacity</span>
                            </div>
                            <div class="col-8">
                              <vue-material-slider v-model="activeBackground.overlayOpacity" :min="0" :max="100" thumb-label :display-with="displayWith" />
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BzComponent from '../BzComponent'
import BzAspectView from '../section/BzAspectView'
import BzSelect from './BzSelect'
import ArrowBackIcon from '../icons/ArrowBack'
import ArrowForwardIcon from '../icons/ArrowForward'
import AlignLeftIcon from '../icons/AlignLeft'
import AlignRightIcon from '../icons/AlignRight'
import AlignAlternateIcon from '../icons/AlignAlternate'
import Input from './BzInput'
import BzColorSet from './BzColorSet'
import bgPatterns from '../../data/bgPatterns'
import bgVideos from '../../data/bgVideos'
import currencies from '../../data/currencies'

export default {
  components: {
    BzColorSet,
    AlignAlternateIcon,
    AlignRightIcon,
    AlignLeftIcon,
    ArrowForwardIcon,
    ArrowBackIcon,
    BzSelect,
    BzAspectView,
    Input
  },
  extends: BzComponent,
  data() {
    return {
      nav: 'setting', // 'setting','bg'
      view: 'desktop',
      contents: [],
      offsetTop: 0,
      main_content_el: null,
      new_key_type: 0,
      new_insert_position: 0,
      add_between_section: 0,
      isNewSection: false,
      animations: ['none', 'parallax', 'fixed', 'contain', 'animate'],
      bgPatterns: bgPatterns,
      bgVideos: bgVideos,
      currencies: currencies
    }
  },
  computed: {
    businessLocations() {
      return this.templateSetting.businesses.map((business) => {
        return business.companyName
      })
    },
    categorySections() {
      if (this.activePosition === 'header') {
        return this.headerSections
      }

      if (this.activePosition === 'footer') {
        return this.footerSections
      }

      if (this.activeSection && this.activeSection.category) {
        return this.activeSection.category.sections
      }
      return {}
    },
    setting: {
      get() {
        return this.activeSetting
      },
      set(val) {
        this.activeSetting = val
      }
    }
  },
  watch: {
    background: {
      deep: true,
      handler(val) {
        if (val.patternStrength === undefined) {
          val.patternStrength = 100
          this.background = window._copy(this.background)
        }
        if (val.overlayOpacity === undefined) {
          val.overlayOpacity = 0
          this.background = window._copy(this.background)
        }
      }
    }
  },
  methods: {
    displayWith(value) {
      return value + '%'
    },
    openEmbedLinkModal() {
      this.$store.commit('openEmbedLink', {
        value: this.setting.iframe.url,
        onChange: (value) => {
          this.setting.iframe.url = value
        }
      })
    },
    updateActiveSectionSetting(newSetting) {
      this.activeSection.data.setting = newSetting
    },
    openImageSelector() {
      this.$store.commit('openImageEditor', {
        onChange: ({ url }) => {
          this.activeBackground.image = url
          /**
           * 2021-09-16
           * when image is undefined, changing image url didn't update the UI because it was not detected by Vue component.
           * So add this line to assign fresh object to activeBackground.
           */
          this.activeBackground = window._copy(this.activeBackground)
        }
      })
    },
    /**
     * 2021-09-21
     * open manageMarkerModal to add/remove marker of the map section
     */
    openManageMarkersModal() {
      this.$store.commit('openManageMarkers', {
        value: this.setting.map.markers,
        onChange: (markers) => {
          this.setting.map.markers = markers
          this.setting = window._copy(this.setting)
        }
      })
    },
    getSettingName(text) {
      const result = text.replace(/([A-Z])/g, ' $1')
      return result.charAt(0).toUpperCase() + result.slice(1)
    }
  }
}
</script>

<style lang="scss">
$active: #0076df;
$activeHover: #1187ef;

.bz-setting-pannel {
  position: fixed;
  top: 60px;
  right: 0;

  .layouts-wrapper {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .forward-button,
    .back-button {
      height: 30px;
      background-color: $active;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background-color: $activeHover;
      }
    }

    .forward-button {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    .back-button {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .current-layout {
      height: 30px;
      width: calc(100% - 60px);
      background-color: #00000012;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .alignment-wrapper {
    height: 35px;
    display: table;
    align-items: center;
    flex: 1;
    width: 100%;

    .align-left,
    .align-right,
    .align-alternate,
    .align-center {
      display: table-cell;
      background-color: #00000012;
      vertical-align: middle;
      text-align: center;

      &.active {
        background-color: $active;

        svg {
          color: white;
        }
      }
    }

    .align-left {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .align-right {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  .column-wrapper {
    height: 35px;
    display: table;
    align-items: center;
    flex: 1;
    width: 100%;

    .column-item {
      display: table-cell;
      background-color: #00000012;
      vertical-align: middle;
      text-align: center;
      cursor: pointer;

      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      &.active {
        background-color: $active;
        color: white;
      }
    }
  }

  .background-type {
    button {
      outline: none !important;
      border: none !important;
      background-color: #0000001a !important;

      &.active {
        background-color: $active !important;
        color: white !important;
      }
    }
  }

  .background-effect {
    background-color: #0000001a;
    padding: 18px;
    border-top: solid 1px #8080803f;
    border-bottom: solid 1px #8080803f;
  }

  .background-pattern {
    .col-3 {
      padding: 5px;
    }

    .pattern-item {
      border: solid 1px #8080803f;
      border-radius: 4px;
      cursor: pointer;

      &.active {
        border: solid 2px $active;
      }
    }
  }

  .background-video {
    .col-6 {
      padding: 5px;
    }

    .video-item {
      border: solid 1px #8080803f;
      border-radius: 4px;
      cursor: pointer;

      &.active {
        border: solid 2px $active;
      }
    }
  }
}

.custom-scroll-h::-webkit-scrollbar {
  width: 2px !important;
}
</style>
