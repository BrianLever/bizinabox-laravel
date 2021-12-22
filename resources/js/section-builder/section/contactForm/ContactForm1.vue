<template>
  <div class="bz-section-container bz-sec--contact-form-1-root" :class="{ [breakPoint]: true }" :data-section="section.id">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment" class="col-12">
          <bz-title :edit="edit" v-model="data.elements.title" :background-color="backgroundColor" v-if="setting.elements.title" />

          <bz-subtitle :edit="edit" v-model="data.elements.subtitle" :background-color="backgroundColor" v-if="setting.elements.subtitle" />

          <bz-text :edit="edit" v-model="data.elements.description" :background-color="backgroundColor" v-if="setting.elements.description" />
        </bz-alignment>

        <bz-contact-form v-model="data.form" :edit="edit">
          <div class="col-12">
            <div class="row">
              <div class="col-lg-6">
                <bz-form-group
                  :label="data.form.formFields.firstName.label"
                  v-if="data.form.formFields.firstName.enabled"
                  v-model="firstName"
                  :background-color="backgroundColor"
                />

                <bz-form-group :label="data.form.formFields.lastName.label" v-if="data.form.formFields.lastName.enabled" v-model="lastName" :background-color="backgroundColor" />

                <bz-form-group :label="data.form.formFields.email.label" v-if="data.form.formFields.email.enabled" v-model="email" :background-color="backgroundColor" />

                <bz-form-group :label="data.form.formFields.subject.label" v-if="data.form.formFields.subject.enabled" v-model="subject" :background-color="backgroundColor" />

                <bz-form-group :label="data.form.formFields.phone.label" v-if="data.form.formFields.phone.enabled" v-model="phone" :background-color="backgroundColor" />

                <bz-form-group
                  :label="data.form.formFields.date.label"
                  v-if="data.form.formFields.date.enabled"
                  v-model="date"
                  :background-color="backgroundColor"
                  type="date"
                  placeholder="mm/dd/yyy"
                />

                <bz-form-group :label="data.form.formFields.address.label" v-if="data.form.formFields.address.enabled" v-model="address" :background-color="backgroundColor" />
              </div>
              <div class="col-lg-6">
                <bz-form-group
                  :label="data.form.formFields.message.label"
                  v-if="data.form.formFields.message.enabled"
                  v-model="message"
                  type="textarea"
                  :background-color="backgroundColor"
                  :stretch="true"
                />
              </div>
            </div>
          </div>
        </bz-contact-form>

        <div class="d-flex col-12">
          <input type="checkbox" class="m-1" :id="'bz-checkbox-' + section.id" />
          <label :for="'bz-checkbox-' + section.id">
            <bz-text v-model="data.form.permissionMessage" :background-color="backgroundColor" />
          </label>
        </div>

        <bz-alignment :alignment="setting.layouts.alignment" class="col-12">
          <bz-button :edit="edit" v-model="data.submitButton" :link="false" :background-color="backgroundColor" />
        </bz-alignment>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzTitle from '../../components/section/BzTitle'
import BzContainer from '../../components/section/BzContainer'
import BzAlignment from '../../components/section/BzAlignment'
import BzText from '../../components/section/BzText'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzContactForm from '../../components/section/BzContactForm'
import BzButton from '../../components/section/BzButton'
import BzFormGroup from '../../components/section/BzFormGroup'

export default {
  extends: BzSection,
  components: {
    BzFormGroup,
    BzButton,
    BzContactForm,
    BzSubtitle,
    BzText,
    BzAlignment,
    BzContainer,
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
  }
}
</script>
<style lang="scss">
.bz-sec--contact-form-1-root {
}
</style>
