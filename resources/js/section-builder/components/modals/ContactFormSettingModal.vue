<template>
  <modal width="90%" :classes="['bz-modal--contact-form-setting-root']" name="contact-form-setting-modal" @closed="onClose()">
    <div style="background-color: rgb(246, 246, 246)" class="modal-header p-3">
      <h5>Contact form options</h5>
      <div class="d-flex align-items-center">
        <div class="d-flex align-items-center justify-content-center ml-3" @click="onClose">
          <close-icon :fill-color="'#555555'" />
        </div>
      </div>
    </div>
    <div style="height: calc(100% - 115px); overflow-y: auto">
      <md-tabs>
        <md-tab id="tab-form-fields" md-label="Form Fields">
          <div class="col-12">
            <bz-warning class="my-3"> Enable or disable specific form field types, as well as provide a custom label for them. </bz-warning>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-9">
                <bz-input label="First Name" v-model="form.formFields.firstName.label" />
              </div>
              <div class="col-3 d-flex align-items-center justify-content-end">
                <bz-switch v-model="form.formFields.firstName.enabled" />
              </div>

              <div class="col-9">
                <bz-input label="First Name" v-model="form.formFields.lastName.label" />
              </div>
              <div class="col-3 d-flex align-items-center justify-content-end">
                <bz-switch v-model="form.formFields.lastName.enabled" />
              </div>

              <div class="col-9">
                <bz-input label="First Name" v-model="form.formFields.subject.label" />
              </div>
              <div class="col-3 d-flex align-items-center justify-content-end">
                <bz-switch v-model="form.formFields.subject.enabled" />
              </div>

              <div class="col-9">
                <bz-input label="First Name" v-model="form.formFields.message.label" />
              </div>
              <div class="col-3 d-flex align-items-center justify-content-end">
                <bz-switch v-model="form.formFields.message.enabled" />
              </div>

              <div class="col-9">
                <bz-input label="First Name" v-model="form.formFields.email.label" />
              </div>
              <div class="col-3 d-flex align-items-center justify-content-end">
                <bz-switch v-model="form.formFields.email.enabled" />
              </div>

              <div class="col-9">
                <bz-input label="First Name" v-model="form.formFields.phone.label" />
              </div>
              <div class="col-3 d-flex align-items-center justify-content-end">
                <bz-switch v-model="form.formFields.phone.enabled" />
              </div>

              <div class="col-9">
                <bz-input label="First Name" v-model="form.formFields.date.label" />
              </div>
              <div class="col-3 d-flex align-items-center justify-content-end">
                <bz-switch v-model="form.formFields.date.enabled" />
              </div>

              <div class="col-9">
                <bz-input label="First Name" v-model="form.formFields.address.label" />
              </div>
              <div class="col-3 d-flex align-items-center justify-content-end">
                <bz-switch v-model="form.formFields.address.enabled" />
              </div>
            </div>
          </div>
        </md-tab>
        <md-tab id="tab-form-address" md-label="Form Address">
          <div class="col-12">
            <bz-warning class="my-3">
              Emails get sent to the email address attached to your account by default. You can change the email address for this contact form in the field below
            </bz-warning>
          </div>
          <div class="col-12">
            <bz-input :label="'E-mail'" v-model="form.formAddress" />
          </div>
        </md-tab>
        <md-tab id="tab-success-message" md-label="Success message">
          <div class="col-12">
            <bz-warning class="my-3"> This is the message you present to users when they have successfully submitted the form. </bz-warning>
          </div>
          <div class="col-12">
            <bz-input :label="'Title'" v-model="form.successMessage.title" />
          </div>
          <div class="col-12">
            <bz-input :label="'Message'" v-model="form.successMessage.message" :multiple="true" :rows="4" />
          </div>
        </md-tab>
        <md-tab id="tab-permission-message" md-label="Permission message">
          <div class="col-12">
            <bz-warning class="my-3"> Add a custom message to inform users they need to give their permission to be contacted. </bz-warning>
          </div>
          <div class="col-12">
            <bz-input :label="'Title'" v-model="form.successMessage.message" :multiple="true" :rows="3" />
          </div>
        </md-tab>
      </md-tabs>
    </div>
    <hr style="margin-top: auto" />
    <div class="w-100 d-flex justify-content-end pb-2">
      <button class="btn bz-btn-default-outline mr-3" @click="onClose()">
        <b>Cancel</b>
      </button>
      <button class="btn bz-btn-default mr-4 d-flex align-items-center" @click="onConfirm()">
        <b>Save</b>
      </button>
    </div>
  </modal>
</template>

<script>
import BzComponent from '../BzComponent'
import CloseIcon from '../icons/Close'
import BzWarning from '../section/BzWarning'
import BzInput from '../page/BzInput'
import BzSwitch from '../page/BzSwitch'

export default {
  name: 'contact-form-setting-modal',
  components: { BzSwitch, BzInput, BzWarning, CloseIcon },
  extends: BzComponent,
  created() {
    this.form = this.$store.state.contactFormSetting.form
  },
  mounted() {
    this.$modal.show('contact-form-setting-modal')
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    onClose() {
      this.$store.commit('closeContactFormSetting')
    },
    onConfirm() {
      this.$store.state.contactFormSetting.onChange(this.form)
      this.onClose()
    }
  }
}
</script>
<style lang="scss">
.bz-modal--contact-form-setting-root {
  max-width: 800px;
  height: 84vh !important;
  top: 8vh !important;
  padding-bottom: 15px;
  margin: auto;
  left: 0 !important;

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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
