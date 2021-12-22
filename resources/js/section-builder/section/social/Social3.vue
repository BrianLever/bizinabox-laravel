<template>
  <div class="bz-section-container bz-sec--social-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title :edit="edit" v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-text :edit="edit" v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="backgroundColor" />

          <bz-text :edit="edit" v-model="data.elements.description" v-if="setting.elements.description" :background-color="backgroundColor" />
        </bz-alignment>

        <bz-setting :edit="edit" :on-click="openSocialLinksForm" class="mt-5">
          <div class="bz-row">
            <div class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6" v-if="templateSetting.socialAccounts.pinterest">
              <a :href="templateSetting.socialAccounts.pinterest" class="w-100 social-link" target="_blank">
                <div class="social-item" :style="itemStyle">
                  <i class="text-white fa fa-pinterest fa-2x"></i>
                </div>
                <bz-text value="Pinterest" text-color="#ffffff" />
              </a>
            </div>

            <div class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6" v-if="templateSetting.socialAccounts.youtube">
              <a :href="templateSetting.socialAccounts.youtube" class="w-100 social-link" target="_blank">
                <div class="social-item" :style="itemStyle">
                  <i class="text-white fa fa-youtube-play fa-2x"></i>
                </div>
                <bz-text value="Youtube" text-color="#ffffff" />
              </a>
            </div>

            <div class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6" v-if="templateSetting.socialAccounts.openTable">
              <a :href="templateSetting.socialAccounts.openTable" class="w-100 social-link" target="_blank">
                <div class="social-item" :style="itemStyle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 535 512" fill="#ffffff" width="32px" height="32px">
                    <circle cx="48.64" cy="256" r="48.64"></circle>
                    <path
                      d="M340.45,61.45C233,61.45,145.91,148.55,145.91,256S233,450.55,340.45,450.55,535,363.44,535,256,447.9,61.45,340.45,61.45Zm0,243.19A48.64,48.64,0,1,1,389.09,256,48.64,48.64,0,0,1,340.45,304.64Z"
                    ></path>
                  </svg>
                </div>
                <bz-text value="Open Table" text-color="#ffffff" />
              </a>
            </div>

            <div class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6" v-if="templateSetting.socialAccounts.linkedin">
              <a :href="templateSetting.socialAccounts.linkedin" class="w-100 social-link" target="_blank">
                <div class="social-item" :style="itemStyle">
                  <i class="text-white fa fa fa-linkedin-square fa-2x"></i>
                </div>
                <bz-text value="Linkedin" text-color="#ffffff" />
              </a>
            </div>

            <div class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6" v-if="templateSetting.socialAccounts.instagram || placeholder">
              <a :href="templateSetting.socialAccounts.instagram" class="w-100 social-link" target="_blank">
                <div class="social-item" :style="itemStyle">
                  <i class="text-white fa fa-instagram fa-2x"></i>
                </div>
                <bz-text value="Instagram" text-color="#ffffff" />
              </a>
            </div>

            <div class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6" v-if="templateSetting.socialAccounts.twitter || placeholder">
              <a :href="templateSetting.socialAccounts.twitter" class="w-100 social-link" target="_blank">
                <div class="social-item" :style="itemStyle">
                  <i class="text-white fa fa fa-twitter fa-2x"></i>
                </div>
                <bz-text value="Twitter" text-color="#ffffff" />
              </a>
            </div>

            <div class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6" v-if="templateSetting.socialAccounts.facebook || placeholder">
              <a :href="templateSetting.socialAccounts.facebook" class="w-100 social-link" target="_blank">
                <div class="social-item" :style="itemStyle">
                  <i class="text-white fa fa-facebook-official fa-2x"></i>
                </div>
                <bz-text value="Facebook" text-color="#ffffff" />
              </a>
            </div>
          </div>
        </bz-setting>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzAlignment from '../../components/section/BzAlignment'
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzSetting from '../../components/section/BzSetting'

export default {
  components: { BzSetting, BzText, BzTitle, BzAlignment, BzContainer, BzBackground },
  extends: BzSection,
  name: 'Social1',
  computed: {
    itemStyle() {
      if (this.setting.layouts.shape === 'circle') {
        return { borderRadius: '1000px' }
      }
    },
    placeholder() {
      for (let key in this.templateSetting.socialAccounts) {
        if ((this.templateSetting.socialAccounts[key] || '').isURL()) {
          return false
        }
      }

      return this.edit
    }
  },
  methods: {
    openSocialLinksForm() {
      this.openSettingSlider(2)
    }
  }
}
</script>

<style lang="scss">
.bz-sec--social-3-root {
  .social-link {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .social-item {
    border-style: solid;
    border-width: 2px;
    border-color: white;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-bottom: 5px;
  }
}
</style>
