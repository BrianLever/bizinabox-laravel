<template>
  <div class="bz-el-link d-block w-100 h-100" :class="{ edit }">
    <template v-if="link.type === 'no-link'">
      <a href="javascript:void(0)" class="bz-h-100 bz-w-100" style="display: block">
        <slot />
      </a>
    </template>
    <template v-if="link.type === 'web-address'">
      <a :href="link.webAddress" class="bz-h-100 bz-w-100" style="display: block" :target="link.target ? '_blank' : ''">
        <slot />
      </a>
    </template>
    <template v-if="link.type === 'page'">
      <router-link :to="link.page || '/'" :target="link.target ? '_blank' : ''">
        <slot />
      </router-link>
    </template>
    <template v-if="link.type === 'email-address'">
      <a :href="`mailto:${link.email}?Subject=${link.subject || ''}`" class="bz-h-100 bz-w-100" style="display: block">
        <slot />
      </a>
    </template>
    <template v-if="link.type === 'phone-number'">
      <a :href="`tel:${link.phoneNumber}`" class="bz-h-100 bz-w-100" style="display: block">
        <slot />
      </a>
    </template>
  </div>
</template>

<script>
import BzElement from '../BzElement'

export default {
  extends: BzElement,
  name: 'bz-link',
  props: {
    link: {
      type: Object,
      default: () => {
        return {
          type: 'no-link',
          value: 'javascript:void(0)'
        }
      }
    }
  }
}
</script>

<style scoped>
.bz-el-link {
}
</style>
