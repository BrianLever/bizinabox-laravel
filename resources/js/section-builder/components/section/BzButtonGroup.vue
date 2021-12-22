<template>
  <div class="bz-el--button-group-root">
    <bz-button
      v-for="(button, index) of data"
      v-model="data[index]"
      :key="index"
      :edit="edit"
      :index="index"
      :multiple="true"
      :last="index === data.length - 1"
      :start="index === 0"
      :button-color="buttonColor"
      @add="handleAddButton"
      @delete="handleDeleteButton"
      @swap="handleSwap"
    />
  </div>
</template>

<script>
import BzElement from '../BzElement'
import BzButton from './BzButton'

export default {
  components: {
    BzButton
  },
  extends: BzElement,
  name: 'bz-button-group',
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    buttonColor: {
      type: [String]
    }
  },
  methods: {
    handleAddButton(index) {
      this.data.push({
        ...this.data[index],
        title: 'Button ' + (this.data.length + 1)
      })
      this.data = _copy(this.data)
    },
    handleDeleteButton(index) {
      if (this.data.length > 1) {
        this.data.splice(index, 1)
      } else {
        this.activeSetting.elements.buttons = false
      }
    },
    handleSwap(index1, index2) {
      this.data.swap(index1, index2)
      this.data = _copy(this.data)
    }
  }
}
</script>
<style lang="scss">
.bz-el--button-group-root {
  width: max-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
</style>
