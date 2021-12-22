<template>
  <section @scroll.prevent.stop="">
    <NewPageModal v-if="openNewPageModal" @close="openNewPageModal = false" />
    <div class="sidebar bg-white d-flex">
      <ul class="mb-0 pl-0 list-style-none flex-column item_list">
        <li class="side-item">
          <div class="item_div" :class="{ active: activeSlider === 'sections' }" @click.prevent="openSectionSlider">
            <add-circle-icon :fill-color="activeSlider === 'sections' ? '#ffffff' : '#555555'" />
            <div class="text-capitalize mt-1">sections</div>
          </div>
        </li>
        <template v-if="activePage">
          <li class="side-item">
            <div class="item_div" :class="{ active: activeSlider === 'pages' }" @click.prevent="openPageSlider">
              <insert-drive-file-icon :fill-color="activeSlider === 'pages' ? '#ffffff' : '#555555'" />
              <div class="text-capitalize mt-1">pages</div>
            </div>
          </li>

          <li class="side-item">
            <div class="item_div" :class="{ active: activeSlider === 'theme' }" @click.prevent="openThemeSlider">
              <ColorLensIcon :fill-color="activeSlider === 'theme' ? '#ffffff' : '#555555'" />
              <div class="text-capitalize mt-1">theme</div>
            </div>
          </li>

          <li class="side-item">
            <div :class="{ active: activeSlider === 'settings' }" class="item_div" @click.prevent="openSettingSlider">
              <SettingIcon :fill-color="activeSlider === 'settings' ? '#ffffff' : '#555555'" />
              <div class="text-capitalize mt-1">settings</div>
            </div>
          </li>
        </template>
      </ul>
    </div>

    <div class="sections_area z-index-999" :class="{ active: activeSlider === 'sections' && openSlider }">
      <div class="section_heading py-2 px-3">
        <div class="row align-items-center">
          <div class="col-4">
            <h5 class="mb-0 text-dark"><b>Sections</b></h5>
          </div>
          <div class="col-6">
            <input type="text" class="form-control w-150px" placeholder="Search sections" />
          </div>
          <div class="col-2 text-right">
            <div class="bz-close-section-area text-dark cursor-pointer" @click.prevent="closeSlider()">
              <close-icon fill-color="#555555" />
            </div>
          </div>
        </div>
      </div>
      <div class="section_content h-100 d-flex">
        <div class="section_category_area w-50 p-3 preview_content_ul custom-scroll-h scroll-w-5">
          <div v-if="recommendedCategories.length">
            <p class="heading mb-0 fs-18px font-weight-bold pb-2">Recommended</p>
            <ul class="ml-0 pl-2 list-style-none">
              <li v-for="(cat, key1) in recommendedCategories" :key="key1" class="side_category_item">
                <a href="" class="mb-1" :class="{ active: activeCategory.id === cat.id }" @click.prevent="activeCategory = cat">
                  {{ cat.name }}
                </a>
              </li>
            </ul>
          </div>
          <p class="heading mb-0 fs-18px font-weight-bold pb-2">All categories</p>
          <ul class="ml-0 mb-0 pl-2 list-style-none">
            <template v-for="(cat, key2) in restCategories">
              <li v-if="cat.name !== 'Header' && cat.name !== 'Footer'" :key="key2" class="side_category_item">
                <a href="" class="mb-1" :class="{ active: activeCategory.id === cat.id }" @click.prevent="activeCategory = cat">{{ cat.name }}</a>
              </li>
            </template>
          </ul>
        </div>
        <div class="section_category_preview_area w-100">
          <div class="ml-0 mb-0 p-3 list-style-none preview_content_ul custom-scroll-h scroll-w-5">
            <template v-if="categorySections.length">
              <div v-for="(section, key3) in categorySections" :key="key3">
                <div ref="sectionPreView" class="section_preview_item cursor-pointer" :title="section.name" :class="{ active: true }" @click.prevent.stop="assignSection(section)">
                  <div ref="sectionBase" class="section-preview-base" style="pointer-events: none">
                    <component :is="section.name" :properties="section" />
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <li class="w-100">
                <span>No sections</span>
              </li>
            </template>
          </div>
        </div>
      </div>
    </div>

    <template v-if="activePage">
      <div class="pages_area z-index-999" :class="{ active: openSlider && activeSlider === 'pages' }">
        <div class="py-2 px-3">
          <div class="row align-items-center">
            <div class="col-10">
              <h5 class="mb-0 text-dark">
                <b>Pages</b> <span>({{ allPages.length }}/50)</span>
              </h5>
            </div>
            <div class="col-2 text-right">
              <span class="bz-close-section-area text-dark cursor-pointer fs-20" @click.prevent="closeSlider()">
                <CloseIcon />
              </span>
            </div>
          </div>
        </div>
        <div class="mt-3 px-3">
          <button class="btn bz-btn-default w-100" @click.prevent="openNewPageModal = true">New Page</button>
          <div class="w-100">
            <draggable-item v-model="allPages" draggable=".item" @end="handlePageDragEnd">
              <div
                v-for="(page, index) in allPages"
                :key="index"
                v-ripple
                class="page_item item cursor-pointer"
                :class="{ active: index === indexOfActivePage }"
                @click="setActivePage({ index })"
              >
                {{ page.name }}
                <div class="icons">
                  <div v-if="!page.url" class="d-flex align-items-center">
                    <home-icon :size="18" fill-color="#8080807f" />
                  </div>
                  <div v-dropdown="{ autoClose: true }" class="more-vert">
                    <button dropdown-toggle>
                      <MoreVertIcon />
                    </button>
                    <div class="bz-dropdown-menu-container">
                      <div class="bz-dropdown-menu" @click.stop.prevent="openPageSettingModal = true">Settings</div>
                      <div class="bz-dropdown-menu" @click.stop.prevent="duplicatePage">Duplicate</div>
                      <div v-if="page.url" class="bz-dropdown-menu" @click.stop.prevent="deletePage(page.id)">Delete</div>
                      <div v-if="isWebsite && page.url" class="bz-dropdown-menu" @click.stop.prevent="updatePageStatus(page.id)">
                        {{ pageStatus(page) ? 'Inactivate' : 'Activate' }}
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                    <drag-indicator-icon :size="18" fill-color="#8080807f" />
                  </div>
                </div>
              </div>
            </draggable-item>
          </div>
        </div>
      </div>

      <div class="theme_area z-index-999" :class="{ active: openSlider && activeSlider === 'theme' }">
        <div class="pb-2 px-3 pt-4">
          <div class="row align-items-center">
            <div class="col-10 d-flex align-self-center">
              <h5 class="mb-0 text-dark"><b>Theme</b></h5>
            </div>
            <div class="col-2 text-right">
              <span class="text-dark cursor-pointer fs-20" @click.prevent="closeSlider()">
                <CloseIcon />
              </span>
            </div>
          </div>
        </div>
        <div class="w-100">
          <md-tabs>
            <md-tab id="tab-colors" md-label="Colors">
              <div class="theme-mode">
                <div :class="{ active: theme.mode === 'light' }">
                  <button :style="{ backgroundColor: theme.lightModeColor, color: getColor(theme.lightModeColor) }" @click.prevent="theme.mode = 'light'">Light</button>
                </div>
                <div :class="{ active: theme.mode === 'dark' }">
                  <button :style="{ backgroundColor: theme.darkModeColor, color: getColor(theme.darkModeColor) }" @click.prevent="theme.mode = 'dark'">Dark</button>
                </div>
              </div>
              <p class="mt-3">Theme</p>
              <div v-click-outside="{ onClick: closeEditor }" class="w-100">
                <div class="theme-colors">
                  <div :class="{ active: editor === 'primary' }" :style="{ backgroundColor: theme.primaryColor }" @click.prevent="openSketch('primary')" />
                  <div :class="{ active: editor === 'secondary' }" :style="{ backgroundColor: theme.secondaryColor }" @click.prevent="openSketch('secondary')" />
                  <div
                    :class="{ active: editor === (theme.mode === 'light' ? 'lightMode' : 'darkMode') }"
                    :style="{ backgroundColor: modeColor() }"
                    @click.prevent="openSketch(theme.mode === 'light' ? 'lightMode' : 'darkMode')"
                  />
                  <div
                    :class="{ active: editor === (theme.mode === 'light' ? 'darkMode' : 'lightMode') }"
                    :style="{ backgroundColor: modeColor(false) }"
                    @click.prevent="openSketch(theme.mode === 'light' ? 'darkMode' : 'lightMode')"
                  />
                </div>
                <div class="w-100 position-fixed" :style="sketchStyle">
                  <Sketch v-if="editor" :value="colorValue" @input="updateThemeColor" />
                </div>
              </div>
              <div v-click-outside="{ onClick: hideShowMore }" class="w-100">
                <p class="w-100 bz-text-active text-right pt-4 cursor-pointer" @click="showMoreColors = !showMoreColors">Explore color themes</p>
                <transition name="bounce" enter-active-class="fade" leave-active-class="fade">
                  <div class="w-100 more-colors" v-if="showMoreColors">
                    <md-tabs>
                      <md-tab id="tab-vibrant" md-label="Vibrant">
                        <div class="color-panel">
                          <div v-for="color of colors.variants" :key="color" class="color-group" :class="{ active: isActiveColor(color) }" @click="setThemeColors(color)">
                            <div class="color-item" :style="{ backgroundColor: color.primaryColor }" />
                            <div class="color-item" :style="{ backgroundColor: color.secondaryColor }" />
                            <div class="color-item" :style="{ backgroundColor: color.lightModeColor }" />
                            <div class="color-item" :style="{ backgroundColor: color.darkModeColor }" />
                          </div>
                        </div>
                        <div class="load-more">Load More</div>
                      </md-tab>
                      <md-tab id="tab-subtle" md-label="Subtle">
                        <div class="color-panel">
                          <div v-for="color of colors.subtle" :key="color" class="color-group" :class="{ active: isActiveColor(color) }" @click="setThemeColors(color)">
                            <div class="color-item" :style="{ backgroundColor: color.primaryColor }" />
                            <div class="color-item" :style="{ backgroundColor: color.secondaryColor }" />
                            <div class="color-item" :style="{ backgroundColor: color.lightModeColor }" />
                            <div class="color-item" :style="{ backgroundColor: color.darkModeColor }" />
                          </div>
                        </div>
                        <div class="load-more">Load More</div>
                      </md-tab>
                      <md-tab id="tab-pastel" md-label="Pastel">
                        <div class="color-panel">
                          <div v-for="color of colors.pastel" :key="color" class="color-group" :class="{ active: isActiveColor(color) }" @click="setThemeColors(color)">
                            <div class="color-item" :style="{ backgroundColor: color.primaryColor }" />
                            <div class="color-item" :style="{ backgroundColor: color.secondaryColor }" />
                            <div class="color-item" :style="{ backgroundColor: color.lightModeColor }" />
                            <div class="color-item" :style="{ backgroundColor: color.darkModeColor }" />
                          </div>
                        </div>
                        <div class="load-more">Load More</div>
                      </md-tab>
                    </md-tabs>
                  </div>
                </transition>
              </div>
            </md-tab>
            <md-tab id="tab-fonts" md-label="Fonts">
              <p class="mt-3"><b>Font Size</b></p>
              <div class="btn-group w-100" role="group">
                <button type="button" class="btn bg-white p-2" :class="{ active: theme.fontSize === 's' }" @click="theme.fontSize = 's'">Small</button>
                <button type="button" class="btn bg-white p-2" :class="{ active: theme.fontSize === 'm' }" @click="theme.fontSize = 'm'">Medium</button>
                <button type="button" class="btn bg-white p-2" :class="{ active: theme.fontSize === 'l' }" @click="theme.fontSize = 'l'">Large</button>
              </div>
              <p class="mt-3"><b>Font Style</b></p>
              <div class="btn-group w-100" role="group">
                <button type="button" class="btn bg-white p-2" :class="{ active: fontStyleView === 'presets' }" @click="fontStyleView = 'presets'">Presets</button>
                <button type="button" class="btn bg-white p-2" :class="{ active: fontStyleView === 'custom' }" @click="fontStyleView = 'custom'">Custom</button>
              </div>

              <div v-if="fontStyleView === 'presets'" class="w-100 mt-3 font-presets">
                <div
                  v-for="(font, index) of fonts.presets"
                  :key="index"
                  class="font-item"
                  :class="{ active: theme.titleFont === font.titleFont && theme.paragraphFont === font.paragraphFont, [font.titleFont]: true }"
                  @click="
                    theme.titleFont = font.titleFont
                    theme.paragraphFont = font.paragraphFont
                  "
                >
                  {{ font.label }}
                </div>
              </div>

              <div v-if="fontStyleView === 'custom'" class="w-100 mt-3">
                <bz-select v-model="theme.titleFont" label="Title Font" :options="fonts.title" :pre-selected="false" :item-key="'name'" :min-height="40" class="mt-5" />

                <bz-select v-model="theme.paragraphFont" label="Paragraph Font" :options="fonts.title" :pre-selected="false" :item-key="'name'" :min-height="40" class="mt-5" />
              </div>
            </md-tab>
            <md-tab id="tab-animations" md-label="Animations">
              <div class="d-flex justify-content-between align-items-center my-3">
                <span class="element_item_label">Enable animation</span>
                <label class="custom_switch">
                  <input v-model="theme.animation" type="checkbox" />
                  <span />
                </label>
              </div>
              <div class="d-flex justify-content-between align-items-center my-3">
                <div class="row">
                  <div class="col-7 d-flex align-items-center">
                    <span class="element_item_label">Animation Duration</span>
                  </div>
                  <div class="col-5">
                    <bz-select v-model="theme.animationDuration" :options="['short', 'long']" />
                  </div>
                </div>
              </div>
            </md-tab>
          </md-tabs>
        </div>
      </div>

      <div class="settings_area z-index-999" :class="{ active: openSlider && activeSlider === 'settings' }">
        <div class="settings_menu">
          <div class="pb-2 px-3 pt-4">
            <div class="row align-items-center">
              <div class="col-10 d-flex align-self-center">
                <h5 class="mb-0 text-dark"><b>Settings</b></h5>
              </div>
            </div>
            <div class="setting-menu-item" :class="{ active: activeTab === 0 }" @click="activeTab = 0">
              <WebIcon fill-color="#555555" />
              <div class="menu-text">Template Setting</div>
            </div>
            <div
              class="setting-menu-item"
              :class="{ active: activeTab === 1 }"
              @click="
                activeTab = 1
                activeSubTab = 'tab-address'
              "
            >
              <business-icon fill-color="#555555" />
              <div class="menu-text">Business</div>
            </div>
            <div
              v-for="(business, index) of templateSetting.businesses"
              :key="index"
              class="company-name"
              :class="{ active: activeCompanyIndex === index && activeTab === 1 }"
              @click="activeCompanyIndex = index"
            >
              {{ business.companyName }}
            </div>
            <div class="setting-menu-item" :class="{ active: activeTab === 2 }" @click="activeTab = 2">
              <AccountCircleIcon fill-color="#555555" />
              <div class="menu-text">Social accounts</div>
            </div>
            <div class="setting-menu-item" :class="{ active: activeTab === 3 }" @click="activeTab = 3">
              <MultilineChart fill-color="#555555" />
              <div class="menu-text">Tracking & Analytics</div>
            </div>
            <div class="setting-menu-item" :class="{ active: activeTab === 4 }" @click="activeTab = 4">
              <PolicyIcon fill-color="#555555" />
              <div class="menu-text">Legal</div>
            </div>
            <div class="setting-menu-item" :class="{ active: activeTab === 5 }" @click="activeTab = 5">
              <CodeIcon fill-color="#555555" />
              <div class="menu-text">HTML injection</div>
            </div>
          </div>
        </div>
        <div class="settings_content">
          <div v-if="activeTab === 0">
            <div class="w-100 p-3">
              <div class="row">
                <div class="col-10">
                  <h4>Template Setting</h4>
                </div>
                <div class="col-2 text-right">
                  <div class="bz-close-section-area text-dark cursor-pointer" @click.prevent="closeSlider()">
                    <close-icon fill-color="#555555" />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100">
              <md-tabs id="template-setting">
                <md-tab id="tab-template-name" md-label="Template Name">
                  <div class="p-3">
                    <bz-input v-model="template.name" label="Template Name" />
                  </div>
                </md-tab>
                <md-tab id="tab-logo" md-label="Logo" />
                <md-tab id="tab-favicon" md-label="Favicon" />
                <md-tab id="tab-seo" md-label="Seo" />
                <md-tab id="tab-accessibility" md-label="Accessibility" />
              </md-tabs>
            </div>
          </div>

          <template v-if="activeTab === 1">
            <div class="w-100 p-3">
              <div class="row">
                <div class="col-10">
                  <h4>Business</h4>
                </div>
                <div class="col-2 text-right">
                  <div class="bz-close-section-area text-dark cursor-pointer" @click.prevent="closeSlider()">
                    <close-icon fill-color="#555555" />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100">
              <md-tabs id="businesses" :md-active-tab="activeSubTab">
                <md-tab id="tab-address" md-label="Address">
                  <div class="p-2">
                    <div class="row">
                      <div class="col-12">
                        <Input v-model="templateSetting.businesses[activeCompanyIndex].companyName" label="Company Name" />
                      </div>
                      <div class="col-12">
                        <Input v-model="templateSetting.businesses[activeCompanyIndex].address" label="Address" />
                      </div>
                      <div class="col-6">
                        <Input v-model="templateSetting.businesses[activeCompanyIndex].zipCode" label="Zip code" />
                      </div>
                      <div class="col-6">
                        <Input v-model="templateSetting.businesses[activeCompanyIndex].city" label="City" />
                      </div>
                      <div class="col-12">
                        <Input v-model="templateSetting.businesses[activeCompanyIndex].country" label="Country" />
                      </div>
                    </div>
                  </div>
                </md-tab>
                <md-tab id="tab-contact" md-label="Contact">
                  <div class="p-2">
                    <div class="row">
                      <div class="col-12">
                        <bz-input v-model="templateSetting.businesses[activeCompanyIndex].contact.email" label="Email Address" />
                      </div>
                      <div class="col-12">
                        <bz-input v-model="templateSetting.businesses[activeCompanyIndex].contact.phoneNumber" label="Phone number" />
                      </div>
                    </div>
                  </div>
                </md-tab>
                <md-tab id="tab-business-hours" md-label="Business Hours">
                  <div class="p-3">
                    <business-hours-editor :location="templateSetting.businesses[activeCompanyIndex].companyName" />
                  </div>
                </md-tab>
              </md-tabs>
            </div>
          </template>

          <div v-if="activeTab === 2">
            <div class="w-100">
              <div class="w-100 p-3 bottom-bordered">
                <div class="row">
                  <div class="col-10">
                    <h4>Social Accounts</h4>
                  </div>
                  <div class="col-2 text-right">
                    <div class="bz-close-section-area text-dark cursor-pointer" @click.prevent="closeSlider()">
                      <close-icon fill-color="#555555" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100">
              <div class="p-2">
                <p class="p-4">
                  Here you can add the URLs of your social accounts which will be shown in your site's footer, allowing your visitors to go directly to yoru social accounts.
                </p>
                <div class="row">
                  <div class="col-12">
                    <bz-input v-model="templateSetting.socialAccounts.facebook" label="Facebook" :height="42" />
                  </div>
                  <div class="col-12">
                    <bz-input v-model="templateSetting.socialAccounts.twitter" label="Twitter" :height="42" />
                  </div>
                  <div class="col-12">
                    <bz-input v-model="templateSetting.socialAccounts.instagram" label="Instagram" :height="42" />
                  </div>
                  <div class="col-12">
                    <bz-input v-model="templateSetting.socialAccounts.linkedin" label="LinkedIn" :height="42" />
                  </div>
                  <div class="col-12">
                    <bz-input v-model="templateSetting.socialAccounts.pinterest" label="Pinterest" :height="42" />
                  </div>
                  <div class="col-12">
                    <bz-input v-model="templateSetting.socialAccounts.youtube" label="YouTube" :height="42" />
                  </div>
                  <div class="col-12">
                    <bz-input v-model="templateSetting.socialAccounts.openTable" label="OpenTable" :height="42" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <template v-if="activeTab === 3">
            <div class="w-100 p-3 bottom-bordered">
              <div class="row">
                <div class="col-10">
                  <h4>Tracking and Analytics</h4>
                </div>
                <div class="col-2 text-right">
                  <div class="bz-close-section-area text-dark cursor-pointer" @click.prevent="closeSlider()">
                    <close-icon fill-color="#555555" />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100">
              <div class="p-2">
                <p class="p-4">Add your Google Analytics Tracking ID to here to add Google's tracking code to every page of your website.</p>
                <div class="row">
                  <div class="col-12">
                    <Input v-model="templateSetting.googleAnalyticsTrackingId" label="Google analytics tracking ID" placeholder="US-XXXXXXX(-YY)" />
                  </div>
                </div>
                <div class="mt-4">
                  <div>Don't have a Google Analytics ID?</div>
                  <a href="https://google.com/analytics" target="_blank">Create a Google Analytics account</a>
                </div>
              </div>
            </div>
          </template>
          <div v-if="activeTab === 4">
            <div class="w-100 p-3">
              <div class="row">
                <div class="col-10">
                  <h4>Legal</h4>
                </div>
                <div class="col-2 text-right">
                  <div class="bz-close-section-area text-dark cursor-pointer" @click.prevent="closeSlider()">
                    <close-icon fill-color="#555555" />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100">
              <md-tabs>
                <md-tab id="tab-terms-of-service" md-label="Terms of Service">
                  <div class="w-100 mt-3">
                    <div class="row">
                      <div class="col-12">
                        <bz-input v-model="templateSetting.termsOfService" :multiple="true" label="Terms of Service" />
                      </div>
                    </div>
                  </div>
                </md-tab>
                <md-tab id="tab-privacy-policy-and-gdpr" md-label="Privacy Policy and GDPR">
                  <div class="w-100 mt-3">
                    <div class="row">
                      <div class="col-12">
                        <bz-select v-model="templateSetting.cookieBannerPosition" :options="['top', 'bottom']" :min-height="38" variant="white" label="Cookie banner position" />
                      </div>
                      <div class="col-12">
                        <bz-input v-model="templateSetting.bannerText" label="Banner text" />
                      </div>
                      <div class="col-12">
                        <bz-input v-model="templateSetting.agreeButtonText" label="Agree button text" />
                      </div>
                      <div class="col-12">
                        <bz-input v-model="templateSetting.privacyPolicy" :multiple="true" label="Privacy Policy" />
                      </div>
                    </div>
                  </div>
                </md-tab>
              </md-tabs>
            </div>
          </div>
          <template v-if="activeTab === 5">
            <div class="w-100 p-3">
              <div class="row">
                <div class="col-10">
                  <h4>HTML injection</h4>
                </div>
                <div class="col-2 text-right">
                  <div class="bz-close-section-area text-dark cursor-pointer" @click.prevent="closeSlider()">
                    <CloseIcon fill-color="#555555" />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100">
              <md-tabs>
                <md-tab id="tab-head-html" md-label="Head HTML" />
                <md-tab id="tab-body-and-html" md-label="Body and HTML" />
              </md-tabs>
            </div>
          </template>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import CloseIcon from '../icons/Close'
import draggable from 'vuedraggable'
import MoreVertIcon from '../icons/MoreVert'
import DragIndicatorIcon from '../icons/DragIndicator'
import BzComponent from '../BzComponent'
import { mapMutations } from 'vuex'
import NewPageModal from '../modals/NewPageModal'
import { Sketch } from 'vue-color'
import colors from '../../data/colors'
import ColorLensIcon from '../icons/ColorLens'
import SettingIcon from '../icons/Setting'
import fonts from '../../data/fonts'
import WebIcon from '../icons/Web'
import BusinessIcon from '../icons/Business'
import AccountCircleIcon from '../icons/AccountCircle'
import MultilineChart from '../icons/MultilineChart'
import PolicyIcon from '../icons/Policy'
import CodeIcon from '../icons/Code'
import AddCircleIcon from '../icons/AddCircle'
import InsertDriveFileIcon from '../icons/InsertDriveFile'
import BzSelect from './BzSelect'
import BusinessHoursEditor from '../editor/BusinessHoursEditor'
import BzInput from './BzInput'
import HomeIcon from '../icons/HomeIcon'

export default {
  components: {
    HomeIcon,
    BzInput,
    BusinessHoursEditor,
    BzSelect,
    InsertDriveFileIcon,
    AddCircleIcon,
    CodeIcon,
    PolicyIcon,
    MultilineChart,
    AccountCircleIcon,
    BusinessIcon,
    WebIcon,
    CloseIcon,
    draggable,
    MoreVertIcon,
    DragIndicatorIcon,
    NewPageModal,
    Sketch,
    SettingIcon,
    ColorLensIcon
  },
  extends: BzComponent,
  data() {
    return {
      recommendedCategories: [],
      restCategories: [],
      activeCategory: {},
      dragData: {},
      categorySections: [],
      openNewPageModal: false,
      editor: null,
      showMoreColors: false,
      colors: colors,
      fontStyleView: 'presets',
      fonts: fonts
    }
  },
  computed: {
    activeTab: {
      get() {
        return this.$store.state.activeTab
      },
      set(val) {
        this.$store.commit('layoutSetActiveTab', val)
      }
    },
    activeSubTab: {
      get() {
        return this.$store.state.activeSubTab
      },
      set(val) {
        this.$store.commit('layoutSetActiveSubTab', val)
      }
    },
    colorValue() {
      switch (this.editor) {
        case 'primary':
          return this.theme.primaryColor
        case 'secondary':
          return this.theme.secondaryColor
        case 'lightMode':
          return this.theme.lightModeColor
        case 'darkMode':
          return this.theme.darkModeColor
        default:
          return '#000000'
      }
    },
    sketchStyle() {
      let paddingLeft = 0
      switch (this.editor) {
        case 'primary':
          paddingLeft = 0
          break
        case 'secondary':
          paddingLeft = 15
          break
        case 'lightMode':
          paddingLeft = 30
          break
        case 'darkMode':
          paddingLeft = 47
          break
        default:
          paddingLeft = 0
      }
      return {
        marginTop: '10px',
        paddingLeft: paddingLeft + 'px'
      }
    }
  },
  watch: {
    allCategories: {
      deep: true,
      immediate: true,
      handler(value) {
        const recommendedCategories = []
        const restCategories = []
        window.$.each(value, function (key, item) {
          if (item.recommended) {
            recommendedCategories.push(item)
          } else {
            restCategories.push(item)
          }
        })
        this.recommendedCategories = recommendedCategories
        this.restCategories = restCategories
        if (restCategories.length) {
          this.activeCategory = restCategories[0] || {}
        }
      }
    },
    activeCategory: {
      deep: true,
      immediate: true,
      handler(val) {
        this.categorySections = val.sections || []
      }
    },
    theme: {
      deep: true,
      immediate: true,
      handler(val) {
        if (this.timer1 !== null) {
          clearTimeout(this.timer1)
        }
        this.timer1 = setTimeout(() => {
          this.$store.commit('saveTemplate')
          window._setThemeColors(val)
          clearTimeout(this.timer1)
        }, 500)
      }
    },
    templateSetting: {
      deep: true,
      handler() {
        if (this.timer1 !== null) {
          clearTimeout(this.timer1)
        }
        this.timer1 = setTimeout(() => {
          this.$store.commit('saveTemplate')
          clearTimeout(this.timer1)
        }, 500)
      }
    },
    categorySections: {
      deep: true,
      immediate: true,
      handler(value) {
        if (value.length) {
          this.$nextTick(() => {
            this.$refs.sectionBase.forEach((item, index) => {
              const sectionPreView = this.$refs.sectionPreView[index]
              new ResizeObserver(function (entries) {
                const rect = entries[0].contentRect
                sectionPreView.style.height = rect.height * 0.214285 + 'px'
              }).observe(item)
            })
          })
        }
      }
    },
    openSlider(value) {
      if (value) {
        window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
      } else {
        window.document.getElementsByTagName('html')[0].style.overflow = ''
      }
    }
  },
  methods: {
    pageStatus(page) {
      let active = page.active
      if (page.type === 'module') {
        active = active && page.data.nav_status
      }
      return active
    },
    openSectionSlider() {
      if (!this.openSlider || this.activeSlider !== 'sections') {
        this.setViewMode('desktop')
        this.enableEdit()
        this.setOpenSlider({ sliderName: 'sections' })
        if (this.addPosition === null) {
          this.appendSection()
        }
      }
    },
    openSketch(editor) {
      if (this.editor === editor) {
        this.editor = null
      } else {
        this.editor = editor
      }
    },
    updateThemeColor(color) {
      switch (this.editor) {
        case 'primary': {
          this.theme.primaryColor = color.hex8
          break
        }
        case 'secondary': {
          this.theme.secondaryColor = color.hex8
          break
        }
        case 'lightMode': {
          const newColor = color.hex8
          if (this.isBrighter(newColor, this.theme.darkModeColor)) {
            this.theme.lightModeColor = newColor
          } else {
            this.theme.darkModeColor = newColor
            this.themeMode = 'dark'
            this.editor = 'darkMode'
          }
          break
        }
        case 'darkMode': {
          const newColor = color.hex8
          if (this.isBrighter(this.theme.lightModeColor, newColor)) {
            this.theme.darkModeColor = newColor
          } else {
            this.theme.lightModeColor = newColor
            this.themeMode = 'light'
            this.editor = 'lightMode'
          }
          break
        }
      }
    },
    closeEditor() {
      if (this.editor) {
        this.editor = null
      }
    },
    handlePageDragEnd() {
      this.updatePagesOrder()
    },
    hideShowMore() {
      this.showMoreColors = false
    },
    isActiveColor(color) {
      return (
        this.theme.primaryColor === color.primaryColor &&
        this.theme.secondaryColor === color.secondaryColor &&
        this.theme.lightModeColor === color.lightModeColor &&
        this.theme.darkModeColor === color.darkModeColor
      )
    },
    setThemeColors(color) {
      this.theme.primaryColor = color.primaryColor
      this.theme.secondaryColor = color.secondaryColor
      this.theme.lightModeColor = color.lightModeColor
      this.theme.darkModeColor = color.darkModeColor
    },
    deletePage(pageId) {
      this.$dialog.confirm().then((res) => {
        if (res) {
          this.$store.commit('deletePage', pageId)
        }
      })
    },
    ...mapMutations({
      duplicatePage: 'duplicatePage',
      updatePagesOrder: 'updatePagesOrder',
      updatePageStatus: 'updatePageStatus'
    })
  }
}
</script>
<style lang="scss">
$active: #0076df;
.sidebar {
  height: 100vh;
  width: 70px;
  position: fixed;
  top: 60px;
  left: 0;
  box-sizing: border-box;

  .item_list {
    box-shadow: rgb(0 0 0 / 10%) 1px 0 0 !important;
    width: 100%;

    .side-item {
      width: 100%;

      .item_div {
        height: 60px;
        display: flex;
        color: #555555;
        background-color: transparent;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        width: 100%;
        cursor: pointer;

        i {
          font-size: 18px;
        }

        &.active {
          background-color: $active;
          color: white;
        }
      }
    }
  }
}

.sections_area {
  position: fixed;
  top: 60px;
  height: calc(100vh - 60px);
  background-color: #eff0f1;
  width: 0;
  transition: 0.3s;
  overflow: hidden;
  transition-delay: 0.4s;
  left: 70px;
  z-index: 3;

  .bz-close-section-area {
    font-size: 26px;

    &::after {
      width: calc(100vw - 570px);
      height: 100vh;
      position: fixed;
      top: 0;
      left: 570px;
      content: '';
      display: none;
    }
  }

  &.active {
    width: 500px;
    transition: 0.3s;
    transition-delay: 0.4s;

    .bz-close-section-area {
      &::after {
        display: block;
      }
    }
  }

  .section_heading {
    border-bottom: 1px solid #d7d8d8;
  }

  .section_content {
    .preview_content_ul {
      max-height: calc(100vh - 130px);
    }

    .section_category_area {
      border-right: 1px solid #d7d8d8;

      .side_category_item {
        a {
          color: #000;
          padding: 5px 10px;
          display: block;
          border-radius: 4px;

          &:hover,
          &.active {
            text-decoration: none;
            background-color: #d9dee3;
          }
        }
      }
    }
  }
}

.pages_area {
  width: 0;
  height: calc(100vh - 60px);
  position: fixed;
  left: 70px;
  top: 60px;
  background-color: rgb(239, 240, 241);
  z-index: 3;
  overflow: hidden;
  transition: 0.3s;
  transition-delay: 0.4s;

  .bz-close-section-area {
    font-size: 26px;

    &::after {
      width: calc(100vw - 370px);
      height: 100vh;
      position: fixed;
      top: 0;
      left: 370px;
      content: '';
      display: none;
    }
  }

  &.active {
    width: 300px;
    transition: 0.3s;
    transition-delay: 0.4s;

    .bz-close-section-area {
      &::after {
        display: block;
      }
    }
  }

  .list {
    position: relative; /* position of list container must be set to `relative` */
  }

  /* dragging item will be added with a `dragging` class */
  /* so you can use this class to define the appearance of it */
  .list > *.dragging {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  }

  .page_item {
    width: 100%;
    background-color: white;
    border-radius: 4px;
    padding: 10px;
    height: 40px;
    margin-top: 10px;
    box-shadow: 0 0 6px 3px #00000023;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;

    &.active {
      border: solid 2px #2196f3;
    }

    &[draggable='true'] {
      box-shadow: 0 0 2px 1px #00000012;
      background-color: #f3f3f3;
    }

    .icons {
      display: flex;
      margin-left: auto;

      .more-vert {
        display: flex;
        color: #8080807f;
      }
    }

    &:hover {
      .icons {
        .more-vert {
          color: #555555;
        }
      }
    }
  }
}

.theme_area {
  width: 0;
  height: calc(100vh - 60px);
  position: fixed;
  left: 70px;
  top: 60px;
  background-color: rgb(239, 240, 241);
  z-index: 3;
  overflow: hidden;

  &.active {
    width: 300px;
    transition: all 0.3s;
    transition-delay: 0.4s;

    .bz-close-section-area {
      &::after {
        display: block;
      }
    }
  }

  .md-tabs {
    .md-tab {
      min-height: 500px !important;
    }

    .md-button-content {
      text-transform: capitalize;
    }

    .md-tabs-navigation.md-elevation-0 {
      background-color: rgb(239, 240, 241) !important;
      border-bottom: solid 1px #8080803f;
    }

    .md-content.md-theme-default {
      background-color: transparent !important;
    }

    .theme-mode {
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        padding: 1px;
        border-radius: 5px;
        width: 48%;
        height: 38px;

        &.active {
          border: solid 2px #0076df;
        }

        button {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          border: solid 1px #8080803f;
        }
      }
    }
  }

  .more-colors {
    box-shadow: 0 0 4px 2px #00000012;
    background-color: white;
    border: solid 1px #8080803f;
    height: 325px;
    border-radius: 4px;

    .md-tabs {
      .md-tabs-navigation.md-elevation-0 {
        background-color: white !important;
        border-bottom: solid 1px #8080803f;
      }

      .color-panel {
        height: 214px;
        overflow-y: scroll;
      }

      .load-more {
        width: 100%;
        padding: 10px 0;
        color: $active;
        border-top: solid 1px #8080807f;
        cursor: pointer;
      }
    }

    .color-group {
      margin: 5px 0;
      width: 100%;
      height: 30px;
      border: solid 1px #8080803f;
      border-radius: 4px;
      overflow: hidden;
      display: flex;

      &:hover {
        border: solid 2px rgb(123, 236, 214);
      }

      &.active {
        border: solid 2px $active;
      }

      .color-item {
        width: 25%;
        height: 100%;
        cursor: pointer;
      }
    }
  }

  #tab-fonts {
    button {
      outline: none !important;
      border: none !important;

      &.active {
        background-color: $active !important;
        color: white !important;
      }
    }

    .font-presets {
      .font-item {
        width: 100%;
        background-color: white;
        padding: 12px;
        border: solid 2px transparent;
        box-shadow: 0 0 2px 1px #00000012;
        margin-top: 10px;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          border: solid 2px #9ddeff;
        }

        &.active {
          border: solid 2px $active;
        }
      }
    }
  }

  .bz-select {
    width: 100px;
    border-radius: 2px;
    border: solid 1px #80808034;
    padding: 4px;
    background-color: white;
  }
}

.settings_area {
  width: 0;
  height: calc(100vh - 60px);
  position: fixed;
  left: 70px;
  top: 60px;
  background-color: rgb(239, 240, 241);
  z-index: 3;
  overflow: hidden;
  display: flex;
  transition: width 0.3s;
  box-shadow: 2px 0 2px 1px #00000027;

  &.active {
    width: 900px;
    transition: 0.3s;

    .bz-close-section-area {
      &::after {
        display: block;
      }
    }
  }

  .bottom-bordered {
    border-bottom: solid 1px #0000001a;
  }

  .settings_menu {
    width: 300px;
    background-color: #eff0f1;
    border: solid 1px #8080801a;

    .setting-menu-item {
      border-radius: 4px;
      padding: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-top: 10px;

      &:first-child {
        margin-top: 30px;
      }

      .menu-text {
        padding-left: 10px;
        color: #555555;
      }

      &.active {
        background-color: #0000001a;

        .menu-text {
          font-weight: bold;
        }
      }
    }

    .company-name {
      margin-left: 45px;
      padding: 5px 0;
      margin-top: 5px;
      margin-bottom: 5px;
      cursor: pointer;

      &.active {
        font-weight: bold;
      }
    }
  }

  .settings_content {
    width: 600px;
    background-color: white;
  }

  .md-tabs {
    .md-button-content {
      text-transform: capitalize;
    }

    .md-tabs-navigation.md-elevation-0 {
      background-color: white;
      border-bottom: solid 1px #8080803f;
    }

    .md-content.md-theme-default {
      background-color: white !important;
    }
  }
}
</style>
