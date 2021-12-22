<template>
  <div class="bz-el-menu">
    <template v-if="edit">
      <div v-for="(page, index) of allPages" :key="index" @click.stop.prevent="setActivePage({ index, type: page.type })" v-if="showMenuItem(page)">
        <slot :pageName="page.name" :active="isActiveMenu(page.url)" />
      </div>
    </template>
    <template v-else>
      <a v-for="(page, index) of allPages" :href="`/${page.url || ''}`" :key="index" v-if="showMenuItem(page)">
        <slot :pageName="page.name" :active="isActiveMenu(page.url)" />
      </a>
    </template>
  </div>
</template>

<script>
import BzElement from '../BzElement'

export default {
  extends: BzElement,
  name: 'bz-menu',
  methods: {
    showMenuItem(page) {
      if (page.type !== 'module') {
        return true
      }
      return page.name && page.data.nav_status
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-el-menu {
  display: flex;
  a {
    text-decoration: none;
  }
}
</style>
