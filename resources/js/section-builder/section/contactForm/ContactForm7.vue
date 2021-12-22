<template>
  <div class="bz-section-container bz-sec--contact-form-7-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="backgroundColor" :setting="background" :size="sectionSize">
      <bz-container>
        <div class="bz-col-12">
          <div class="bz-row">
            <div class="bz-col-lg-8 bz-d-flex bz-column">
              <bz-contact-form v-model="data.form" :edit="edit">
                <bz-alignment class="bz-pr-lg-3" :alignment="setting.layouts.alignment" :stretch="false">
                  <bz-form-group
                    :label="data.form.formFields.firstName.label"
                    v-if="data.form.formFields.firstName.enabled"
                    v-model="firstName"
                    :background-color="backgroundColor"
                    :inline="true"
                  />

                  <bz-form-group
                    :label="data.form.formFields.lastName.label"
                    v-if="data.form.formFields.lastName.enabled"
                    v-model="lastName"
                    :background-color="backgroundColor"
                    :inline="true"
                  />

                  <bz-form-group
                    :label="data.form.formFields.email.label"
                    v-if="data.form.formFields.email.enabled"
                    v-model="email"
                    :background-color="backgroundColor"
                    :inline="true"
                  />

                  <bz-form-group
                    :label="data.form.formFields.subject.label"
                    v-if="data.form.formFields.subject.enabled"
                    v-model="subject"
                    :background-color="backgroundColor"
                    :inline="true"
                  />

                  <bz-form-group
                    :label="data.form.formFields.phone.label"
                    v-if="data.form.formFields.phone.enabled"
                    v-model="phone"
                    :background-color="backgroundColor"
                    :inline="true"
                  />

                  <bz-form-group
                    :label="data.form.formFields.date.label"
                    v-if="data.form.formFields.date.enabled"
                    v-model="date"
                    :background-color="backgroundColor"
                    type="date"
                    placeholder="mm/dd/yyy"
                    :inline="true"
                  />

                  <bz-form-group
                    :label="data.form.formFields.address.label"
                    v-if="data.form.formFields.address.enabled"
                    v-model="address"
                    :background-color="backgroundColor"
                    :inline="true"
                  />

                  <bz-form-group
                    :label="data.form.formFields.message.label"
                    v-if="data.form.formFields.message.enabled"
                    v-model="message"
                    type="textarea"
                    :background-color="backgroundColor"
                    :inline="true"
                  />

                  <div class="bz-d-flex bz-w-lg-70 bz-align-self-end">
                    <input type="checkbox" class="m-1" :id="'bz-checkbox-' + section.id" />
                    <label :for="'bz-checkbox-' + section.id">
                      <bz-text v-model="data.form.permissionMessage" :background-color="backgroundColor" />
                    </label>
                  </div>
                </bz-alignment>
              </bz-contact-form>

              <bz-divider :height="20" />

              <div class="bz-w-lg-70 bz-d-flex bz-align-self-end">
                <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
                  <bz-button v-model="data.submitButton" :link="false" :background-color="backgroundColor" />
                </bz-alignment>
              </div>
            </div>
            <div class="bz-col-lg-4 bz-py-3">
              <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
                <bz-title :edit="edit" v-model="data.elements.title" :background-color="backgroundColor" v-if="setting.elements.title" />

                <bz-subtitle :edit="edit" v-model="data.elements.subtitle" :background-color="backgroundColor" v-if="setting.elements.subtitle" />

                <bz-text :edit="edit" v-model="data.elements.description" :background-color="backgroundColor" v-if="setting.elements.description" />
              </bz-alignment>
            </div>
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzSection from '../../components/BzSection'
import BzBackground from '../../components/section/BzBackground'
import BzTitle from '../../components/section/BzTitle'
import BzContactForm from '../../components/section/BzContactForm'
import BzContainer from '../../components/section/BzContainer'
import BzAlignment from '../../components/section/BzAlignment'
import BzFormGroup from '../../components/section/BzFormGroup'
import BzButton from '../../components/section/BzButton'
import BzText from '../../components/section/BzText'
import BzDivider from '../../components/section/BzDivider'
import BzSubtitle from '../../components/section/BzSubtitle'

export default {
  extends: BzSection,
  components: {
    BzSubtitle,
    BzDivider,
    BzText,
    BzButton,
    BzFormGroup,
    BzAlignment,
    BzContainer,
    BzContactForm,
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
<style lang="scss" scoped>
.bz-sec--contact-form-7-root {
}
</style>
