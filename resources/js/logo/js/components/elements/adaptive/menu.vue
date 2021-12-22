<template>
  <el-row class="mobile-menu">
    <el-col :span="24">
      <el-menu default-active="1">
        <el-submenu index="1">
          <template slot="title">
            <span class="mobile-logo">
              <svg width="30" viewBox="0 0 41 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.873291 6.01654L4.73662 1.35994C5.45157 0.498183 6.51015 0 7.62633 0H33.4553C34.5674 0 35.6225 0.49452 36.3375 1.35085L40.1191 5.88007C41.2274 7.20736 41.2969 9.12195 40.288 10.527L23.1223 34.4313C21.6003 36.5509 18.4497 36.5166 16.9735 34.3645L0.665154 10.5876C-0.293694 9.18959 -0.208593 7.32058 0.873291 6.01654ZM6.71528 3.77176L3.08118 7.87723C2.85803 8.12931 2.83411 8.5017 3.02313 8.78055L18.6503 31.8344C19.3452 32.8594 20.842 32.8781 21.5619 31.8706L35.2006 12.7835C35.5484 12.2968 35.2024 11.6186 34.6063 11.6186H23.4466C23.1966 11.6186 22.9639 11.4903 22.8295 11.2783L22.0622 10.0676C21.7519 9.57786 22.1017 8.93666 22.6793 8.93666H36.6107C37.2248 8.93666 37.5657 8.22198 37.1813 7.74051L33.5699 3.21763C33.431 3.04371 33.2211 2.94252 32.9993 2.94252H11.4129C10.8273 2.94252 10.479 3.59972 10.8056 4.0884L19.0078 16.3617C19.1437 16.565 19.3714 16.687 19.6151 16.687H23.3576C23.9729 16.687 24.3135 17.4043 23.9265 17.8853L20.6128 22.004C20.2992 22.3938 19.6979 22.3608 19.4283 21.939L7.87746 3.86318C7.61565 3.45348 7.03728 3.40799 6.71528 3.77176Z"
                  fill="white"
                ></path>
              </svg>
              FreeLogoMaker
            </span>
          </template>
          <template v-if="user">
            <el-menu-item index="1-1" @click="goTo(routes.chooseLogo)">
              <i class="el-icon-picture-outline-round"></i>
              New logo
            </el-menu-item>
            <el-menu-item index="1-2" @click="goTo(routes.profile)">
              <i class="el-icon-user-solid"></i>
              Profile
            </el-menu-item>
            <el-menu-item index="1-3" @click="goTo(routes.pricing)">
              <i class="el-icon-price-tag"></i>
              Pricing
            </el-menu-item>
            <el-menu-item index="1-4" @click="goTo(routes.contactUs)">
              <i class="el-icon-message"></i>
              Contact us
            </el-menu-item>
            <el-menu-item index="1-5" @click="goTo(routes.logout)">
              <i class="el-icon-minus"></i>
              Logout
            </el-menu-item>
          </template>
          <template v-else>
            <el-menu-item index="1-1" @click="goTo(routes.login)">
              <i class="el-icon-user"></i>
              Login
            </el-menu-item>
            <el-menu-item index="1-2" @click="goTo(routes.register)">
              <i class="el-icon-plus"></i>
              Create account
            </el-menu-item>
            <el-menu-item index="1-3" @click="goTo(routes.chooseLogo)">
              <i class="el-icon-picture-outline-round"></i>
              New logo
            </el-menu-item>
            <el-menu-item index="1-4" @click="goTo(routes.pricing)">
              <i class="el-icon-price-tag"></i>
              Pricing
            </el-menu-item>
            <el-menu-item index="1-5" @click="goTo(routes.contactUs)">
              <i class="el-icon-message"></i>
              Contact us
            </el-menu-item>
          </template>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style lang="scss">
.mobile-menu {
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 2001;

  .el-submenu__title {
    background-color: #3a58f9;
    color: #fff;

    i {
      color: #fff;
    }
  }

  .mobile-logo {
    font-size: 17px;

    svg {
      margin-right: 10px;
    }
  }

  .el-submenu__title {
    display: flex;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: bold;
    padding-left: 0 !important;
    line-height: normal;
    font-size: 14px;
    color: #fff;

    span {
      margin: auto;
    }
  }
}

.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background: transparent;
}

@media only screen and (min-width: 1199px) {
  .mobile-menu {
    display: none;
  }
}
</style>

<script>
import appMixin from '../../../mixins/app-mixin'

export default {
  mixins: [appMixin],

  name: 'mobile-menu',

  data() {
    return {
      user: window.user
    }
  },

  mounted() {
    //
  },

  methods: {
    method() {
      //
    }
  }
}
</script>
