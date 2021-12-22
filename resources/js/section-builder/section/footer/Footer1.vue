<template>
  <div class="bz-section-container bz-sec--footer-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor" size="m">
      <bz-container>
        <bz-title :edit="edit" v-model="template.name" v-if="setting.elements.siteTitle" :text-color="theme.primaryColor" />
        <div class="d-flex align-items-end justify-content-between">
          <div class="bz-pages-menu">
            <bz-menu>
              <template slot-scope="{ pageName }">
                <span class="menu-item">{{ pageName }}</span>
              </template>
            </bz-menu>
          </div>
          <bz-social-icons :edit="edit" />
        </div>
        <bz-divider :line="true" :line-color="lineColor" v-if="setting.elements.dividerLine" />
        <div class="bz-row">
          <div class="bz-col-lg-4 bz-col-md-6">
            <template v-if="setting.elements.address">
              <bz-title :edit="edit" v-model="data.elements.addressTitle" :background-color="backgroundColor" />

              <bz-address :edit="edit" :location="setting.businessInformation.location" :background-color="backgroundColor" />
            </template>

            <bz-phone-number :edit="edit" v-if="setting.elements.phoneNumber" :background-color="backgroundColor" />

            <bz-email :edit="edit" v-if="setting.elements.email" :background-color="backgroundColor" />
          </div>
          <div class="bz-col-lg-8 bz-col-md-6">
            <template v-if="setting.elements.description">
              <bz-title :edit="edit" v-model="activePage.name" :background-color="backgroundColor" />

              <bz-text :edit="edit" v-model="data.elements.description" :background-color="backgroundColor" />
            </template>
          </div>
        </div>
        <bz-divider :line="true" :line-color="lineColor" v-if="setting.elements.dividerLine" />
        <div class="w-100 d-flex align-items-center">
          <bz-setting :edit="edit" :on-click="openBusinessSetting" :wrap-content="true">
            <span style="font-size: 14px; font-weight: 300"> &copy; {{ new Date().getFullYear() }} {{ templateSetting.businesses[0].companyName }} </span>
          </bz-setting>
          <div class="site-map">Sitemap</div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzTitle from '../../components/section/BzTitle'
import BzDivider from '../../components/section/BzDivider'
import BzText from '../../components/section/BzText'
import BzAddress from '../../components/section/BzAddress'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzEmail from '../../components/section/BzEmail'
import BzSetting from '../../components/section/BzSetting'
import BzSocialIcons from '../../components/section/BzSocialIcons'
import BzMenu from '../../components/section/BzMenu'

export default {
  extends: BzSection,
  components: {
    BzMenu,
    BzSocialIcons,
    BzSetting,
    BzEmail,
    BzPhoneNumber,
    BzAddress,
    BzText,
    BzDivider,
    BzTitle,
    BzContainer,
    BzBackground
  },
  methods: {
    openBusinessSetting() {
      this.openSettingSlider(1, 'tab-address')
    }
  },
  computed: {
    lineColor() {
      const color = this.getTextColor(this.backgroundColor, this.theme.primaryColor)
      return color.brighten(80)
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-sec--footer-1-root {
  .bz-pages-menu {
    display: flex;
    flex-direction: row;
    padding: 4px;

    .menu-item {
      color: #555555;
      font-weight: 300;
      text-decoration: underline;
      font-size: 14px;
      margin-right: 24px;
      cursor: pointer;
    }
  }

  .site-map {
    text-decoration: underline;
    font-size: 14px;
    margin-left: 20px;
    font-weight: 300;
  }
}
</style>
