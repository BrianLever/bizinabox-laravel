<template>
  <div class="bz-section-container bz-sec--header-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor">
      <header class="bz-header">
        <bz-button v-if="setting.elements.headerButton" v-model="data.elements.headerButton" :edit="edit" :button-color="headerButtonColor" />
        <button class="menu-button" @click.prevent="toggleMenu">
          <HamburgerIcon :hamburger-open="openMenu" />
        </button>
      </header>
    </bz-background>
    <div class="menu-container">
      <slide-up-down :active="openMenu" :duration="500">
        <div class="menu-content">
          <div v-for="(page, index) of allPages" :key="index" style="margin-top: 20px" @click="toggleMenu">
            <router-link :to="`/${page.url || ''}`">
              <span class="link-text">
                {{ page.name }}
              </span>
            </router-link>
          </div>

          <bz-social-icons :edit="edit" />
        </div>
      </slide-up-down>
    </div>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzButton from '../../components/section/BzButton'
import HamburgerIcon from '../../components/icons/Hamburger'
import BzBackground from '../../components/section/BzBackground'
import BzSocialIcons from '../../components/section/BzSocialIcons'

export default {
  components: { BzSocialIcons, BzBackground, HamburgerIcon, BzButton },
  extends: BzSection,
  data() {
    return {
      openMenu: false
    }
  },
  computed: {
    headerButtonColor() {
      return this.theme.primaryColor.brighten(30)
    }
  },
  methods: {
    toggleMenu() {
      if (!this.edit) {
        this.openMenu = !this.openMenu
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-sec--header-1-root {
  .bz-header {
    width: 100%;
    display: flex;
    padding: 20px;
    justify-content: flex-end;
  }

  .menu-button {
    background-color: var(--bz-primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    margin-left: 20px;
    z-index: 10001;
  }

  .menu-container {
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 10000;

    .menu-content {
      width: 100%;
      height: 100vh;
      background-color: white;
      position: relative;
      padding-top: 10%;
      padding-bottom: 20%;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;

      a {
        &:hover {
          text-decoration: none !important;
        }
      }

      .link-text {
        text-decoration: none;
        font-size: 36px;
        margin-top: 20px;
        color: #555555;
        font-weight: 100;

        &:hover {
          text-decoration: none;
          color: var(--bz-primary-color);
        }
      }
    }
  }
}
</style>
