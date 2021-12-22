<template>
  <div v-click-outside="closeMenu" class="top-right-menu">
    <el-menu v-if="user" mode="horizontal" menu-trigger="click" ref="top-right-menu">
      <el-submenu :index="menuIndex">
        <template slot="title"
          ><span class="user-name">{{ user.name }}</span></template
        >
        <el-menu-item @click="clickMenu(url.admin)" v-if="isAdmin()">
          <i class="el-icon-setting"></i>
          Admin Panel
        </el-menu-item>
        <el-menu-item @click="clickMenu(url.user)">
          <i class="el-icon-setting"></i>
          My Panel
        </el-menu-item>
        <el-menu-item @click="clickMenu(url.profile)">
          <i class="el-icon-user-solid"></i>
          Profile
        </el-menu-item>
        <el-menu-item @click="clickMenu(url.logout)">
          <i class="el-icon-minus"></i>
          Logout
        </el-menu-item>
      </el-submenu>
    </el-menu>

    <div class="nav-button login-register-buttons" v-else>
      <slot name="login"></slot>
      <slot name="register"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../sass/variables';

.nav {
  display: flex;
  align-items: center;
  .nav-links {
    a {
      font-family: 'Poppins', sans-serif;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      font-size: 14px;
      color: #505050;
      margin-right: 36px;
      text-decoration: none;
      position: relative;
      transition: all 0.3s ease;
      &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        background-color: $accent-color;
        bottom: 0;
        left: 0;
        transition: all 0.3s ease;
      }
      &:hover {
        color: $accent-color;
        &:after {
          width: 100%;
        }
      }
    }
  }
  .register-person {
    cursor: pointer;
  }

  .login-register-buttons {
    padding: 0 20px 0 20px;
  }

  .nav-button {
    a {
      display: inline-flex;
      justify-content: center;
      border: 2px solid $accent-color;
      background-color: #fff;
      box-sizing: border-box;
      box-shadow: 0 4px 14px rgba(58, 88, 249, 0.3);
      border-radius: 6px;
      font-family: 'Poppins', sans-serif;
      font-style: normal;
      font-weight: 600;
      padding: 10px 30px;
      line-height: normal;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      color: $accent-color;
      text-decoration: none;
      transition: all 0.2s ease;

      @media (max-width: 992px) {
        padding: 10px 12px;
        min-width: 100px;
      }

      &:first-child {
        margin-right: 20px;
        &:hover {
          background: #2743de;
          box-shadow: 0 2px 4px rgba(58, 88, 249, 0.5);
          color: #fff;
        }
      }
      &:last-child {
        color: #fff;
        background-color: $accent-color;
        &:hover {
          background: #2743de;
          box-shadow: 0 2px 4px rgba(58, 88, 249, 0.5);
        }
      }
      &.white-button {
        color: $accent-color;
        background-color: #fff;
        &:hover {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.2);
        }
      }
      &.blue-button {
        color: #fff;
        background-color: $accent-color;
        border-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: transparent !important;
}
</style>

<script>
import vClickOutside from 'v-click-outside'

export default {
  name: 'top-right-menu',

  directives: {
    clickOutside: vClickOutside.directive
  },

  data() {
    return {
      user: window.user,
      url: {
        logout: route('logout'),
        login: route('login'),
        register: route('register'),
        admin: route('admin.dashboard'),
        user: route('user.logotypes.index')
      },
      menuIndex: '1'
    }
  },
  methods: {
    clickMenu(routeName) {
      window.location.href = routeName
    },
    closeMenu() {
      if (this.$refs['top-right-menu']) {
        this.$refs['top-right-menu'].closeMenu(this.menuIndex)
      }
    },
    isAdmin() {
      if (window.user.roles.length && window.user.roles[0].name === 'admin') {
        return true
      }
      return false
    }
  }
}
</script>
