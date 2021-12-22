<template>
  <modal width="90%" :classes="['bz-modal--icon-selector-root']" name="icon-selector" @closed="onClose()">
    <div class="modal-header p-3" style="background-color: rgb(246, 246, 246)">
      <h5>Icons</h5>

      <div class="d-flex align-items-center">
        <div class="search-box-wrapper">
          <input class="form-control" placeholder="Search Icon" type="text" v-model="searchText" />
        </div>
        <div class="d-flex align-items-center justify-content-center ml-3" @click="onClose">
          <close-icon :fill-color="'#555555'" />
        </div>
      </div>
    </div>
    <div class="p-4 modal-content">
      <div class="w-100 h-100 overflow-y-auto">
        <div class="no-icon" @click="select('')">No Icon</div>
        <div class="flex-row" v-for="(group, groupName) in iconNames">
          <h6 class="w-100 text-capitalize">{{ groupName }}</h6>
          <div class="flex-cell" v-for="icon in group" @click="select(icon)" v-if="group.includes(searchText.toLowerCase()) || icon.includes(searchText.toLowerCase())">
            <i :class="icon"></i>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import icons from '../../data/icons'
import CloseIcon from '../icons/Close'
import { mapMutations } from 'vuex'

export default {
  name: 'icon-selector-modal',
  components: { CloseIcon },
  data() {
    return {
      searchText: '',
      iconNames: []
    }
  },
  methods: {
    onClose() {
      this.closeIconSelector()
    },
    select(selection) {
      this.$store.state.iconSelector.onChange(selection)
      this.closeIconSelector()
    },
    ...mapMutations(['closeIconSelector'])
  },
  mounted() {
    this.$modal.show('icon-selector')
    this.iconNames = icons
  }
}
</script>

<style lang="scss">
.bz-modal--icon-selector-root {
  max-width: 800px;
  height: 70vh !important;
  top: 15vh !important;
  padding-bottom: 15px;
  margin: auto;
  left: 0 !important;

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search-box-wrapper {
      width: 200px;
    }
  }

  .modal-content {
    width: 100%;
    height: calc(100% - 70px);
    overflow-y: auto;
    border: none;

    .no-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s;
      border-radius: 4px;
      width: 80px;
      height: 48px;
      margin: 2px;
      background-color: #0000000d;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: 0.5s;
      }
    }

    .flex-row {
      display: flex;
      flex-flow: row wrap;
      margin-top: 20px;
    }
    .flex-cell {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s;
      border-radius: 4px;
      width: 48px;
      height: 48px;
      margin: 2px;
      background-color: #0000000d;
    }
    .flex-cell:hover {
      background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: 0.5s;
    }
  }
}
</style>
