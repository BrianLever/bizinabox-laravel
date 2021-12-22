<template>
  <div class="content-login">
    <el-form v-show="!form.successful" v-loading="form.busy">
      <span class="title">Forgot Password?</span>
      <span class="description">Enter your email, it will be sent instruction for password recovery</span>
      <span class="form-group">
        <el-form-item :error="form.errors.get('email')">
          <el-input v-model="models.email" size="large" placeholder="Email" type="email" name="email"></el-input>
        </el-form-item>
      </span>
      <button @click.prevent="sendReset">Send</button>
    </el-form>
    <transition name="fade">
      <el-form v-if="response">
        <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="37" cy="37" r="35" stroke="#13CC73" stroke-width="4" />
          <path d="M20 41.4L29.7143 51L54 27" stroke="#13CC73" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="title">Successful</span>
        <span class="description">{{ response.message }}</span>
        <button @click.prevent="goTo('/login')">Sign In</button>
      </el-form>
    </transition>
    <div class="link-registration">
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
  name: 'forgot-password',

  mixins: [appMixin],

  data() {
    return {
      form: new Form(),
      models: {
        email: null
      },
      response: null
    }
  },

  methods: {
    sendReset() {
      FormProcessor.post(route('password.email'), this.getForm()).then((response) => {
        this.response = response
      })
    },

    getForm() {
      // Set form data
      this.form.email = this.models.email

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
