<template>
  <div class="bz-section-container bz-sec--header-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :background-color="backgroundColor">
      <header class="bz-header">
        <bz-social-icons :edit="edit" :size="24" />
        <bz-title v-if="setting.elements.siteTitle" v-model="template.name" :edit="edit" :text-color="theme.primaryColor" :mb="0" />
        <bz-button v-if="setting.elements.headerButton" v-model="data.elements.headerButton" :edit="edit" :button-color="headerButtonColor" />
      </header>
      <bz-divider :line="true" :line-color="lineColor" />
      <div class="menu-container">
        <bz-menu>
          <template slot-scope="{ pageName, active }">
            <span class="menu-item" :class="{ active }">{{ pageName }}</span>
          </template>
        </bz-menu>
      </div>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzButton from '../../components/section/BzButton'
import BzBackground from '../../components/section/BzBackground'
import BzSocialIcons from '../../components/section/BzSocialIcons'
import BzDivider from '../../components/section/BzDivider'
import BzTitle from '../../components/section/BzTitle'
import BzMenu from '../../components/section/BzMenu'

export default {
  components: { BzMenu, BzTitle, BzDivider, BzSocialIcons, BzBackground, BzButton },
  extends: BzSection,
  computed: {
    headerButtonColor() {
      return this.theme.primaryColor.brighten(30)
    },
    headerStyle() {
      return {
        backgroundColor: this.backgroundColor
      }
    },
    lineColor() {
      return this.textColor.brighten(80)
    }
  }
}
</script>
<style lang="scss">
.bz-sec--header-2-root {
  .bz-header {
    width: 100%;
    display: flex;
    padding: 20px;
    justify-content: space-between;
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
        text-decoration: none;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
