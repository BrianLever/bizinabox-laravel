<template>
  <modal :classes="['subscribe']" width="90%" height="600" name="subscribe" @closed="onClose()">
    <div style="background-color: rgb(246, 246, 246)" class="p-3">
      <h5>Subscribe options</h5>
    </div>

    <md-tabs id="subscribe">
      <md-tab id="tab-form-address" md-label="Form Address">
        <div class="p-2">
          <div class="bz-col-12">
            <div class="bz-row">
              <p>Emails get sent to the email address attached to your account by default. You can change the email address for this contact form in the field below</p>
              <div class="bz-col-12 my-4">
                <bz-input label="Email Address" :height="40" v-model="subscribe.formAddress" />
              </div>
            </div>
          </div>
        </div>
      </md-tab>
      <md-tab id="tab-success-message" md-label="Success message">
        <div class="p-2">
          <div class="bz-col-12">
            <div class="bz-row">
              <p>This is the message you present to users when they have successfully submitted the form.</p>
              <div class="bz-col-12 my-4">
                <bz-input label="Title" :height="40" v-model="subscribe.successMessage.title" />
              </div>
              <div class="bz-col-12 my-4">
                <bz-input label="Message" :multiple="true" :rows="5" v-model="subscribe.successMessage.message" />
              </div>
            </div>
          </div>
        </div>
      </md-tab>
      <md-tab id="tab-permission-message" md-label="Permission message">
        <div>
          <div class="p-2">
            <div class="bz-col-12">
              <div class="bz-row">
                <p>Add a custom message to inform users they need to give their permission to be contacted.</p>
                <div class="bz-col-12 my-4">
                  <bz-input label="Title" :multiple="true" :rows="5" v-model="subscribe.permissionMessage" />
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
  name: 'subscribe-modal',
  components: { BzInput },
  data() {
    return {
      loading: false,
      subscribe: {
        formAddress: '',
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
    getSubscribe() {
      let subscribe = this.$store.state.subscribe
      return subscribe.value
    },
    onConfirm() {
      this.$store.state.subscribe.onChange(this.subscribe)
      this.closeSubscribe()
    },
    onClose() {
      this.closeSubscribe()
    },
    ...mapMutations(['closeSubscribe'])
  },
  mounted() {
    this.$modal.show('subscribe')
    this.subscribe = this.getSubscribe()
  }
}
</script>

<style lang="scss">
.subscribe {
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
