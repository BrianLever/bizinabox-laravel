<template>
  <el-row class="main-padding" v-loading="!states.buttons.download.available" :disabled="!states.buttons.download.available">
    <el-col :xs="24" :span="16" class="logotypes-block">
      <el-card class="box-card" v-loading="!logotypes" element-loading-text="Generation logo previews...">
        <div slot="header" class="clearfix">
          <span>Recent logotypes</span>
        </div>
        <template v-if="hasLogotypes">
          <el-card v-for="(logotype, key) in logotypes" :key="key" v-loading="!logotype.preview" class="logo-card">
            <div class="top-logo-card">
              <time class="time">{{ logotype.updated_at }}</time>
              <el-link :href="logotype.url" class="button-edit" target="_blank" icon="el-icon-edit">Edit</el-link>
            </div>
            <div class="logo-card-content">
              <div class="image-logo-wrapper">
                <img :src="logotype.preview" class="image" />
              </div>

              <div class="logo-card-buttons">
                <el-row>
                  <el-dropdown trigger="click">
                    <el-button type="primary" class="button button-download"> Download<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="downloadLogo(logotype)" class="download-logotype">
                        <i class="fa fa-picture-o" aria-hidden="true"></i> Logotype
                      </el-dropdown-item>
                      <el-dropdown-item @click.native="downloadPackage(logotype)" class="download-package">
                        <i class="fa fa-archive" aria-hidden="true"></i> Full design package
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!--                                    <el-link :href="routes.pricing" :underline="false" class="link-pricing" target="_blank">Pricing</el-link>-->
                </el-row>
              </div>
            </div>
          </el-card>
        </template>
        <template v-else>
          <div class="message-empty-logos" v-show="logotypes && !hasLogotypes">You don't have any logos yet</div>
        </template>
      </el-card>
    </el-col>
    <el-col :xs="24" :span="8" class="client-form">
      <div class="grid-content bg-purple-dark">
        <el-tabs type="border-card">
          <el-tab-pane label="Profile" icon="user-solid">
            <el-form label-position="top">
              <el-form-item class="email-input" label="Name" :error="forms.profile.errors.get('name')">
                <el-input v-model="models.profile.name" size="small"></el-input>
              </el-form-item>
              <el-form-item label="Email" :error="forms.profile.errors.get('email')">
                <el-input v-model="models.profile.email" size="small">
                  <template v-if="user.email_verified_at" slot="append"> <i class="el-icon-success icon-success"></i> Verified </template>
                  <template v-else slot="append"> <i class="el-icon-warning icon-warning"></i> Not verified </template>
                </el-input>

                <el-button v-if="!user.email_verified_at" @click="resendEmailVerification" :loading="forms.resend.busy" size="mini" class="resend-button">
                  Resend verification
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="updateProfile()" :loading="forms.profile.busy" type="primary" size="small" icon="el-icon-refresh">Update </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="Password">
            <el-form label-position="top">
              <el-form-item label="Password" :error="forms.password.errors.get('password')">
                <el-input placeholder="Please input password" v-model="models.password.password" size="small" show-password></el-input>
              </el-form-item>
              <el-form-item label="Repeat password" :error="forms.password.errors.get('password_confirmation')">
                <el-input placeholder="Please repeat password" v-model="models.password.password_confirmation" size="small" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="updatePassword()" :loading="forms.password.busy" size="mini" type="primary" icon="el-icon-refresh">Set new password </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss">
@import 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';

.logotypes-block {
  .box-card {
    min-height: 263px;

    > .el-card__body {
      @media (min-width: 768px) {
        display: grid;
        grid-gap: 15px;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      }
    }
  }

  .el-card__body {
    padding: 30px;
    position: relative;

    .message-empty-logos {
      font-family: Raleway Regular, sans-serif;
      position: absolute;
      top: 80px;
      left: 50%;
      margin-left: -114px;
      font-size: 17px;
      color: #acacac;
    }
  }

  @media (min-width: 768px) {
    padding-bottom: 110px;
  }

  .link-pricing {
    display: flex;
    padding-top: 10px;
    .el-link--inner {
      font-size: 13px;
    }
  }
}

.el-tabs--border-card {
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
}

.logo-card {
  padding: 0;

  @media (min-width: 768px) {
    max-width: 580px;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  .image {
    width: 100%;
    display: block;

    @media (max-width: 768px) {
      max-height: 120px;
      width: auto;
      margin: auto;
    }
  }

  .el-card__body {
    padding: 0;

    .top-logo-card {
      display: flex;
      align-items: center;
      padding: 0 15px;
      height: 40px;
      justify-content: space-between;
      border-bottom: 1px solid #f1efef;

      .button-edit {
        color: #999;

        .el-icon-edit {
          color: #999;
        }

        &.is-underline:hover:after {
          border-bottom: 1px solid #999;
        }

        &:hover {
          text-decoration: none;
        }
      }
    }

    .logo-card-content {
      padding: 8px 15px;

      @media (min-width: 768px) {
        display: flex;
      }

      .image-logo-wrapper {
        @media (min-width: 768px) {
          width: 55%;
          padding-right: 15px;
          margin: auto;
        }
      }

      .logo-card-buttons {
        width: 45%;
        display: flex;
        margin: 10px auto 30px;
        padding-left: 15px;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        @media (min-width: 768px) {
          border-left: 1px solid #c4c4c4;
          margin: 10px 0 10px;
        }

        @media (max-width: 768px) {
          padding-left: 0;
        }

        .low-quality {
          width: 112px;
          border: 1px solid #dcdfe6;
          font-size: 12px;
          height: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
        }

        .button {
          width: 120px;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          outline: none;
          box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 1px 8px 0 rgba(0, 0, 0, 0.12);

          &-download {
            background: #45ca82;
            border: #43c250 1px solid;

            &:hover {
              background: #4aa976;
            }
          }
        }

        .el-dropdown-menu {
          margin-top: 0;

          .el-dropdown-menu__item {
            font-size: 12px;
          }
        }
      }
    }
  }
}

.main-padding {
  padding-top: 110px;
}

.logotypes-block {
  padding-right: 20px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom-block {
  margin-top: 13px;
  line-height: 12px;
}

.edit-logo-button {
  padding-top: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.icon-success {
  color: #67c23a;
}

.icon-warning {
  color: #e6a23c;
}

.resend-button {
  margin-top: 10px;
}

.email-input {
  min-width: 150px;
}

.no-previews-alert {
  min-height: 50px;
}

.client-form {
  .el-tabs__content {
    padding: 15px 15px 0 15px;
  }

  .el-tabs__nav {
    z-index: 1;
  }

  @media (min-width: 768px) {
    padding-bottom: 60px;
  }
}

@media screen and (max-width: 767px) {
  .logotypes-block {
    padding-right: 0;
    margin-bottom: 20px;
  }
}
</style>

<script>
import appMixin from '../../mixins/app-mixin'
import downloadProduct from '../../mixins/download-product'
import notification from '../../mixins/notifications'

export default {
  name: 'profile',
  mixins: [appMixin, notification, downloadProduct],
  props: {
    customUser: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      user: this.customUser || window.user,
      logotypes: null,

      forms: {
        profile: new Form(),
        resend: new Form(),
        password: new Form()
      },

      models: {
        profile: {
          name: user.name,
          email: user.email
        },
        password: {
          password: null,
          password_confirmation: null
        }
      }
    }
  },
  computed: {
    hasLogotypes: function () {
      return this.logotypes && this.logotypes.length > 0
    }
  },

  mounted() {
    this.downloadProtection()
    this.loadLogos().then(() => {
      this.placeholderForPackageButton()
      this.placeholderForLogotypeButton()
    })
  },

  methods: {
    loadLogos() {
      return Requester.get(route('client.logotypes.previews.get')).then((response) => {
        return new Promise((resolve, reject) => {
          if (Array.isArray(response.data)) {
            this.logotypes = response.data
          }

          return resolve()
        })
      })
    },

    updateProfile() {
      // Actualize form object
      this.forms.profile.email = this.models.profile.email
      this.forms.profile.name = this.models.profile.name

      // Send request
      FormProcessor.post(route('client.profile.update'), this.forms.profile).then((response) => {
        // Set updated user
        this.user = response.user

        this.notification({
          title: response.status,
          type: response.status,
          message: response.message
        })
      })
    },

    resendEmailVerification() {
      FormProcessor.post(route('verification.resend'), this.forms.resend).then((response) => {
        this.notification({
          title: response.status,
          type: response.status,
          message: response.message
        })
      })
    },

    updatePassword() {
      // Actualize form object
      this.forms.password.password = this.models.password.password
      this.forms.password.password_confirmation = this.models.password.password_confirmation

      // Send request
      FormProcessor.post(route('client.profile.password.update'), this.forms.password).then((response) => {
        // Clear form with passwords
        this.models.password.password = null
        this.models.password.password_confirmation = null

        this.notification({
          title: response.status,
          type: response.status,
          message: response.message
        })
      })
    }
  }
}
</script>
