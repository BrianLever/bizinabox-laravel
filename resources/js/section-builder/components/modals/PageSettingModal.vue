<template>
  <modal :classes="['page-setting-modal']" name="page-setting-modal" @closed="onClose()">
    <div style="background-color: rgb(246, 246, 246)" class="p-3">
      <h5>Home</h5>
    </div>
    <div>
      <md-tabs>
        <md-tab id="tab-home" md-label="Properties">
          <md-field :class="{ 'md-invalid': !page.name }">
            <label class="text-capitalize">Page Name</label>
            <md-input v-model="page.name" required></md-input>
            <span class="md-error">Page name is required</span>
          </md-field>
        </md-tab>
        <md-tab id="tab-pages" md-label="Seo">
          <p>Improve the way this page shows up in search results by setting a good title and description.</p>
          <md-field>
            <label class="text-capitalize">Page Title</label>
            <md-input></md-input>
          </md-field>

          <md-field>
            <label class="text-capitalize">Description</label>
            <md-textarea></md-textarea>
          </md-field>
        </md-tab>
      </md-tabs>
    </div>
    <hr style="margin-top: auto" />
    <div class="w-100 d-flex justify-content-end pb-2">
      <button class="btn bz-btn-default-outline mr-3" @click="onClose()">
        <b>Cancel</b>
      </button>
      <button class="btn bz-btn-default mr-4 d-flex align-items-center" @click="onConfirm()">
        <b>Apply</b>
      </button>
    </div>
  </modal>
</template>

<script>
import BzComponent from '../BzComponent'

export default {
  extends: BzComponent,
  mounted() {
    this.$modal.show('page-setting-modal')
    this.page = this.activePage
  },
  data() {
    return {
      page: {}
    }
  },
  methods: {
    onClose() {
      this.openPageSettingModal = false
    },
    onConfirm() {
      this.onClose()
    }
  }
}
</script>
<style lang="scss">
.page-setting-modal {
  height: 500px !important;
  display: flex;
  flex-direction: column;
  top: 150px !important;

  .md-tabs {
    .md-button-content {
      text-transform: capitalize;
    }
    .md-tabs-navigation.md-elevation-0 {
      background-color: rgb(246, 246, 246) !important;
      padding: 0 20px;
    }
  }

  .md-field .md-input,
  .md-field .md-textarea {
    height: 32px;
    padding: 0;
    display: block;
    flex: 1;
    border: none;
    background: none;
    transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-property: font-size, padding-top, color;
    font-family: inherit;
    font-size: 16px;
    line-height: 32px;
  }
}
</style>
