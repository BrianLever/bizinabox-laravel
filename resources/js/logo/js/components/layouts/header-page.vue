<template>
  <transition name="slideDown">
    <header v-show="isMounted">
      <div class="logo d-flex align-items-center justify-content-between ml-3">
        <a href="/" title="Logomate" hreflang="en">
          <img src="/assets/img/logo_sm.png" style="max-width: 40px; object-fit: contain" />
        </a>
        <div>
          <a href="javascript:void(0)" @click="handleQuickView" class="quick-view-button" hreflang="en"> View Quick Video </a>
        </div>
      </div>
      <div class="steps">
        <a href="javascript:void(0)" title="Choose the logo you like the most" hreflang="en" @click.prevent="chooseLogo"> Choose {{ chooseText }} </a>
        <a href="javascript:void(0)" title="Update the logo to fit your needs" hreflang="en" @click.prevent="saveLogo" v-if="!liveView"> Save {{ chooseText }} </a>
        <a href="javascript:void(0)" title="Update the logo to fit your needs" hreflang="en" @click.prevent="viewLive" v-if="!liveView"> View Live </a>
        <a :href="'javascript:void(0)'" title="Get the designed logo!" hreflang="en" @click.prevent="dashboard"> Dashboard </a>
      </div>
      <div class="right-content">
        <div class="nav">
          <div class="nav-login-wrapper">
            <top-right-menu class="choose-steps-header">
              <template slot="login">
                <a :href="getUrlByRoute('login')" class="blue-button" hreflang="en"> Login </a>
              </template>
              <template slot="register">
                <a :href="getUrlByRoute('register')" class="white-button" hreflang="en"> Create account </a>
              </template>
            </top-right-menu>
          </div>
        </div>
      </div>
    </header>
  </transition>
</template>

<script>
import stepsNavigation from '../../mixins/steps-navigation'
import appMixin from '../../mixins/app-mixin'
import downloadProduct from '../../mixins/download-product'

export default {
  name: 'header-page',
  mixins: [stepsNavigation, appMixin, downloadProduct],
  props: {
    userLogo: {
      type: String,
      default: ''
    },
    liveView: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isMounted: false,
      logotype: window.logotype,
      saved: false
    }
  },
  computed: {
    chooseText() {
      if (this.editorType === 'logotypes') {
        return 'Logo'
      }
      return this.editorType
    }
  },
  created() {
    if (this.userLogo) {
      const userLogo = JSON.parse(this.userLogo)
      this.saved = userLogo.user_id
    }
  },
  mounted() {
    this.isMounted = true
    EventBus.$on('editor.saveLogoFinal.saved', () => {
      this.saved = true
    })
    EventBus.$on('editor-logo-changed', () => {
      this.saved = false
    })
  },
  methods: {
    handleQuickView() {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight

      const left = screenWidth * 0.2
      const top = screenHeight * 0.2
      const width = screenWidth * 0.6
      const height = screenHeight * 0.6

      window.open('/videos', '_blank ', `menubar=1,resizable=1,width=${width},height=${height},left=${left},top=${top}`)
    },
    viewLive() {
      if (this.liveView || this.saved) {
        window.location.href = `/account/${this.editorType}/live`
      } else {
        EventBus.$emit('logo-save-confirm', `/account/${this.editorType}/live`)
      }
    },
    saveLogo() {
      EventBus.$emit('editor.save-logo')
    },
    chooseLogo() {
      if (this.liveView || this.saved) {
        window.location.href = `/${this.editorType}/categories`
      } else {
        EventBus.$emit('logo-save-confirm', `/${this.editorType}/categories`)
      }
    },
    dashboard() {
      if (this.liveView || this.saved) {
        window.location.href = `/account/${this.editorType}`
      } else {
        EventBus.$emit('logo-save-confirm', `/account/${this.editorType}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  height: 70px;
  background-color: #4d8ac9;
  align-items: center;
  z-index: 3000;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media only screen and (max-width: 1198px) {
    display: none;
  }
}

a {
  text-decoration: none;
}

.logo {
  width: 280px;
  height: 80px;
  display: flex;
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  a:first-child {
    margin: auto 10px;

    svg path {
      fill-opacity: 0.5;
      transition: all 0.5s ease;
    }

    &:hover svg path {
      fill-opacity: 1;
    }
  }

  img {
    cursor: pointer;
  }

  .quick-view-button {
    display: inline-flex;
    justify-content: center;
    border: 2px solid #3a58f9;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 4px 14px rgb(58 88 249 / 30%);
    border-radius: 6px;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 600;
    padding: 10px 15px;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    cursor: pointer;
    color: #3a58f9;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background: #2743de;
      box-shadow: 0 2px 4px rgb(58 88 249 / 50%);
      color: #fff;
      border-color: rgba(255, 255, 255, 0.2);
    }
  }
}

.steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 3;
  position: relative;
  margin: 0 auto;
  max-width: 720px;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #4d68fa;
  }

  a {
    text-transform: capitalize;
    border: 1px solid #4d68fa;
    border-radius: 3px;
    background-color: #3a58f9;
    padding: 8px 15px;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 14px;
    color: #fff;
    display: flex;
    cursor: pointer;
    z-index: 1;
    align-items: center;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }

    &.disabled {
      background-color: #dbdbdb;
    }

    &:hover:not(.disabled) {
      background-color: #fff;
      color: #3a58f9;

      svg path {
        fill: #24d977;
      }
    }
  }

  .current {
    background-color: #fff;
    color: #3a58f9;
  }

  a svg {
    margin-right: 10px;

    path {
      fill: rgba(255, 255, 255, 0.3);
    }
  }

  .success svg path {
    fill: #24d977;
  }

  .current svg path {
    fill: rgba(41, 158, 231, 0.2);
  }
}

.right-content {
  height: 80px;
  display: flex;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  background: none;

  .register-person {
    width: 180px;
    margin: 0 10%;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    svg {
      margin-left: 8px;
      cursor: pointer;
    }

    span {
      font-family: 'Poppins', sans-serif;
      font-style: normal;
      font-weight: normal;
      line-height: normal;
      color: rgba(255, 255, 255, 0.5);
      margin: auto;
      transition: all 0.3s ease;
    }

    &:hover span {
      color: #fff;
    }

    svg path {
      transition: all 0.3s ease;
    }

    &:hover svg path {
      stroke-opacity: 1;
    }

    span span {
      color: #fff;
    }
  }
}

.nav-menu {
  display: flex;

  .submenu {
    top: 65px;
    right: -18px;

    .submenu {
      right: calc(100% + 10px);
      top: 0;
    }
  }
}

@media only screen and (max-width: 1200px) {
  .steps {
    margin: auto 10%;
  }
}

@media only screen and (max-width: 920px) {
  .steps {
    margin: auto 5%;
  }
}

@media only screen and (max-width: 720px) {
  .logo {
    border-right: none;
  }
  .steps {
    display: none;
  }
  .right-content {
    margin-left: auto;
    border-left: none;
  }
}

.login-register-buttons {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
</style>
