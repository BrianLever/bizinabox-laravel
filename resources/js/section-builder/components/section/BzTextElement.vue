<template>
  <div class="bz-el--text-element-root">
    <bz-alignment :alignment="alignment">
      <bz-title :edit="edit" v-model="data.title" :background-color="backgroundColor" v-if="setting.title" :shadow="shadow" />

      <bz-subtitle :edit="edit" v-model="data.subtitle" :background-color="backgroundColor" v-if="setting.subtitle" :shadow="shadow" />

      <bz-text :edit="edit" v-model="data.description" :background-color="backgroundColor" v-if="setting.description" :shadow="shadow" />

      <bz-divider :line="true" :edit="edit" :width="dividerWidth" :background-color="backgroundColor" v-if="setting.dividerLine" />
    </bz-alignment>
  </div>
</template>

<script>
import BzElement from '../BzElement'
import BzAlignment from './BzAlignment'
import BzTitle from './BzTitle'
import BzSubtitle from './BzSubtitle'
import BzText from './BzText'
import BzDivider from './BzDivider'

export default {
  components: { BzDivider, BzText, BzSubtitle, BzTitle, BzAlignment },
  extends: BzElement,
  props: {
    setting: {
      type: Object,
      default: () => {
        return {}
      }
    },
    alignment: {
      type: String,
      default: 'left'
    },
    dividerWidth: {
      type: Number,
      default: 80
    },
    shadow: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
.bz-el--text-element-root {
  width: 100%;
}
</style>
