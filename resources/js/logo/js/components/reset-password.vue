<template>
  <div class="content-login">
    <el-form v-show="!form.successful" v-loading="form.busy">
      <span class="title">Reset Password</span>
      <span class="form-group">
        <el-form-item :error="form.errors.get('email')">
          <el-input v-model="models.email" size="large" placeholder="Email" type="email" name="email"></el-input>
        </el-form-item>
      </span>
      <span class="form-group">
        <el-form-item :error="form.errors.get('password')">
          <el-input v-model="models.password" size="large" placeholder="Password" type="password" name="password"></el-input>
        </el-form-item>
      </span>
      <span class="form-group">
        <el-form-item :error="form.errors.get('password_confirmation')">
          <el-input v-model="models.password_confirmation" size="large" placeholder="Re-enter password" type="password" name="password"></el-input>
        </el-form-item>
      </span>
      <button @click.prevent="reset">Send</button>
    </el-form>
    <transition name="fade">
      <el-form v-if="form.successful">
        <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="37" cy="37" r="35" stroke="#13CC73" stroke-width="4" />
          <path d="M20 41.4L29.7143 51L54 27" stroke="#13CC73" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="title">Successful</span>
        <span class="description">{{ response.message }}</span>
      </el-form>
    </transition>
    <div v-show="!form.successful" class="link-registration">
      <span>Remember your password?</span>
      <span @click.prevent="goTo('/login')">
        Sign In
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L1 9" stroke="#3A58F9" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
import appMixin from '../mixins/app-mixin'

export default {
  name: 'reset-password',

  mixins: [appMixin],

  props: {
    token: String
  },

  data() {
    return {
      form: new Form(),
      models: {
        email: null,
        password: null,
        password_confirmation: null
      },
      response: null
    }
  },

  methods: {
    reset() {
      FormProcessor.post(route('password.update'), this.getForm()).then((response) => {
        this.response = response

        setTimeout(() => {
          this.goTo('/')
        }, 2000)
      })
    },

    getForm() {
      // Set form data
      this.form.email = this.models.email
      this.form.password = this.models.password
      this.form.password_confirmation = this.models.password_confirmation
      this.form.token = this.token

      return this.form
    }
  }
}
</script>

<style scoped>
form > svg {
  margin: auto auto 20px;
}

.el-form-item--small.el-form-item {
  margin-bottom: 0;
}
</style>
