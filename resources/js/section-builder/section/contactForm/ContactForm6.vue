<template>
  <div class="bz-section-container bz-sec--contact-form-6-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="theme.secondaryColor" :setting="background">
      <div class="bz-col-12">
        <div class="bz-row">
          <div class="bz-col-lg-4">
            <bz-card :background-color="whiteCardBackgroundColor">
              <bz-section-size :size="sectionSize">
                <bz-address :edit="edit" :location="setting.businessInformation.location" v-if="setting.elements.address" :background-color="whiteCardBackgroundColor" />

                <bz-divider />

                <bz-phone-number :edit="edit" :location="setting.businessInformation.location" :background-color="whiteCardBackgroundColor" />

                <bz-divider />

                <bz-email :edit="edit" :location="setting.businessInformation.location" v-if="setting.elements.email" :background-color="whiteCardBackgroundColor" />
              </bz-section-size>
            </bz-card>
          </div>
          <div class="bz-col-lg-8">
            <bz-card :background-color="primaryCardBackgroundColor">
              <bz-section-size :size="sectionSize">
                <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
                  <bz-title :edit="edit" v-model="data.elements.title" :background-color="primaryCardBackgroundColor" v-if="setting.elements.title" />

                  <bz-subtitle :edit="edit" v-model="data.elements.subtitle" :background-color="primaryCardBackgroundColor" v-if="setting.elements.subtitle" />

                  <bz-text :edit="edit" v-model="data.elements.description" :background-color="primaryCardBackgroundColor" v-if="setting.elements.description" />
                </bz-alignment>

                <bz-contact-form v-model="data.form" :edit="edit">
                  <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
                    <bz-form-group
                      :label="data.form.formFields.firstName.label"
                      v-if="data.form.formFields.firstName.enabled"
                      v-model="firstName"
                      :background-color="primaryCardBackgroundColor"
                    />

                    <bz-form-group
                      :label="data.form.formFields.lastName.label"
                      v-if="data.form.formFields.lastName.enabled"
                      v-model="lastName"
                      :background-color="primaryCardBackgroundColor"
                    />

                    <bz-form-group
                      :label="data.form.formFields.email.label"
                      v-if="data.form.formFields.email.enabled"
                      v-model="email"
                      :background-color="primaryCardBackgroundColor"
                    />

                    <bz-form-group
                      :label="data.form.formFields.subject.label"
                      v-if="data.form.formFields.subject.enabled"
                      v-model="subject"
                      :background-color="primaryCardBackgroundColor"
                    />

                    <bz-form-group
                      :label="data.form.formFields.phone.label"
                      v-if="data.form.formFields.phone.enabled"
                      v-model="phone"
                      :background-color="primaryCardBackgroundColor"
                    />

                    <bz-form-group
                      :label="data.form.formFields.date.label"
                      v-if="data.form.formFields.date.enabled"
                      v-model="date"
                      :background-color="primaryCardBackgroundColor"
                      type="date"
                      placeholder="mm/dd/yyy"
                    />

                    <bz-form-group
                      :label="data.form.formFields.address.label"
                      v-if="data.form.formFields.address.enabled"
                      v-model="address"
                      :background-color="primaryCardBackgroundColor"
                    />

                    <bz-form-group
                      :label="data.form.formFields.message.label"
                      v-if="data.form.formFields.message.enabled"
                      v-model="message"
                      type="textarea"
                      :background-color="primaryCardBackgroundColor"
                    />

                    <div class="d-flex w-100">
                      <input type="checkbox" class="m-1" :id="'bz-checkbox-' + section.id" />
                      <label :for="'bz-checkbox-' + section.id">
                        <bz-text v-model="data.form.permissionMessage" :background-color="primaryCardBackgroundColor" />
                      </label>
                    </div>

                    <bz-button v-model="data.submitButton" :link="false" :background-color="backgroundColor" />
                  </bz-alignment>
                </bz-contact-form>
              </bz-section-size>
            </bz-card>
          </div>
        </div>
      </div>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzTitle from '../../components/section/BzTitle'
import BzCard from '../../components/section/BzCard'
import BzAddress from '../../components/section/BzAddress'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzEmail from '../../components/section/BzEmail'
import BzDivider from '../../components/section/BzDivider'
import BzSectionSize from '../../components/section/BzSectionSize'
import BzAlignment from '../../components/section/BzAlignment'
import BzContactForm from '../../components/section/BzContactForm'
import BzFormGroup from '../../components/section/BzFormGroup'
import BzButton from '../../components/section/BzButton'
import BzText from '../../components/section/BzText'

export default {
  extends: BzSection,
  components: {
    BzText,
    BzButton,
    BzFormGroup,
    BzContactForm,
    BzAlignment,
    BzSectionSize,
    BzDivider,
    BzEmail,
    BzPhoneNumber,
    BzAddress,
    BzCard,
    BzTitle,
    BzBackground
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      subject: '',
      address: '',
      date: ''
    }
  },
  computed: {
    whiteCardBackgroundColor() {
      return '#ffffff'
    },
    primaryCardBackgroundColor() {
      return this.theme.primaryColor
    }
  }
}
</script>
<style lang="scss">
.bz-sec--contact-form-6-root {
  .bz-form-item {
    border: none !important;
    border-radius: 0.2em !important;
    background-color: white !important;
  }
}
</style>
