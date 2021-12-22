<template>
  <div class="bz-section-container bz-sec--header-5-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor">
      <header class="bz-header" :style="headerStyle">
        <bz-button :edit="edit" v-model="data.elements.headerButton" v-if="setting.elements.headerButton" :button-color="headerButtonColor" />
        <button class="menu-button">
          <HamburgerIcon />
        </button>
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

export default {
  extends: BzSection,
  components: { BzBackground, HamburgerIcon, BzButton, MenuIcon },
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
.bz-sec--header-5-root {
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
  }
}
</style>
