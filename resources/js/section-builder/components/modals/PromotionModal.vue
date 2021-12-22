<template>
  <modal :classes="['promotion']" width="90%" height="600" name="promotion" @closed="onClose()">
    <div style="background-color: rgb(246, 246, 246)" class="p-3">
      <h5>Promotion options</h5>
    </div>

    <md-tabs id="promotion">
      <md-tab id="tab-colors" md-label="Success message">
        <div class="p-2">
          <div class="bz-col-12">
            <div class="bz-row">
              <p>This is the message you present to users when they have successfully submitted the form.</p>
              <div class="bz-col-12 my-4">
                <bz-input label="Title" :height="40" v-model="promotion.successMessage.title" />
              </div>
              <div class="bz-col-12 my-4">
                <bz-input label="Message" :multiple="true" :rows="5" v-model="promotion.successMessage.message" />
              </div>
              <div class="bz-col-12 my-4">
                <bz-input label="Footnote" :multiple="true" :rows="5" v-model="promotion.successMessage.footNote" />
              </div>
            </div>
          </div>
        </div>
      </md-tab>
      <md-tab id="tab-fonts" md-label="Permission message">
        <div>
          <div class="p-2">
            <div class="bz-col-12">
              <div class="bz-row">
                <p>Add a custom message to inform users they need to give their permission to be contacted.</p>
                <div class="bz-col-12 my-4">
                  <bz-input label="Title" :multiple="true" :rows="5" v-model="promotion.permissionMessage" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </md-tab>
    </md-tabs>

    <hr />
    <div class="w-100 d-flex justify-content-end">
      <button class="btn bz-btn-default-outline mr-3" @click="onClose()">
        <b>Cancel</b>
      </button>
      <button class="btn btn-success mr-4 d-flex align-items-center" @click="onConfirm()">
        <b>Save</b>
      </button>
    </div>
  </modal>
</template>

<script>
import { mapMutations } from 'vuex'
import BzInput from '../page/BzInput'

export default {
  name: 'promotion-modal',
  components: { BzInput },
  data() {
    return {
      loading: false,
      promotion: {
        successMessage: {
          title: '',
          message: '',
          footNote: ''
        },
        permissionMessage: ''
      }
    }
  },
  methods: {
    getPromotion() {
      let promotion = this.$store.state.promotion
      return promotion.value
    },
    onConfirm() {
      this.$store.state.promotion.onChange(this.promotion)
      this.closePromotion()
    },
    onClose() {
      this.closePromotion()
    },
    ...mapMutations(['closePromotion'])
  },
  mounted() {
    this.$modal.show('promotion')
    this.promotion = this.getPromotion()
  }
}
</script>

<style lang="scss">
.promotion {
  max-width: 1000px;
  height: max-content !important;
  margin: auto;
  left: 0 !important;
  padding-bottom: 15px;

  .md-tabs {
    .md-button-content {
      text-transform: capitalize;
    }
    .md-tabs-navigation.md-elevation-0 {
      background-color: rgb(246, 246, 246) !important;
      border-bottom: solid 1px #8080803f;
    }
    .md-content.md-theme-default {
      background-color: transparent !important;
    }
  }
}
</style>
