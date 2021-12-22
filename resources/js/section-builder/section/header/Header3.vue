<template>
  <div class="bz-section-container bz-sec--header-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor">
      <header class="bz-header" :style="headerStyle">
        <bz-title :edit="edit" v-model="template.name" :text-color="theme.primaryColor" />

        <div class="d-flex align-items-center">
          <div class="menu-container">
            <template v-if="edit">
              <div class="menu-item" v-for="(page, index) of allPages" :key="index" :class="{ active: isActiveMenu(page.url) }" @click.stop.prevent="setActivePage(index)">
                <span :style="{ color: textColor, fontSize: 18 + 'px', fontWeight: 100 }">
                  {{ page.name }}
                </span>
              </div>
            </template>
            <template v-else>
              <div class="menu-item" v-for="(page, index) of allPages" :key="index" :class="{ active: isActiveMenu(page.url) }">
                <router-link :to="`/${page.url || ''}`">
                  <span :style="{ color: textColor, fontSize: 18 + 'px', fontWeight: 100 }">
                    {{ page.name }}
                  </span>
                </router-link>
              </div>
            </template>
          </div>
          <bz-button :edit="edit" v-model="data.elements.headerButton" v-if="setting.elements.headerButton" :button-color="headerButtonColor" />
        </div>
      </header>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import MenuIcon from '../../components/icons/Menu'
import BzButton from '../../components/section/BzButton'
import HamburgerIcon from '../../components/icons/Hamburger'
import BzBackground from '../../components/section/BzBackground'
import BzTitle from '../../components/section/BzTitle'

export default {
  extends: BzSection,
  components: { BzTitle, BzBackground, HamburgerIcon, BzButton, MenuIcon },
  computed: {
    headerButtonColor() {
      return this.theme.primaryColor.brighten(30)
    },
    headerStyle() {
      return {
        backgroundColor: this.backgroundColor
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-sec--header-3-root {
  .bz-header {
    width: 100%;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
  }

  .menu-button {
    background-color: var(--bz-primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    margin-left: 20px;
  }

  .menu-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;
    margin-right: 20px;

    .menu-item {
      width: max-content;
      margin: 0 8px;
      padding-bottom: 2px;
      border-bottom: solid 2px transparent;
      cursor: pointer;

      &.active {
        border-bottom: solid 2px var(--bz-primary-color);
      }

      a {
        text-decoration: none !important;
        &:hover {
          text-decoration: none !important;
        }
      }
    }
  }
}
</style>
