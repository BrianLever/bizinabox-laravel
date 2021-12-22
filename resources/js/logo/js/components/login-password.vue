<template>
  <div class="content-login">
    <form v-loading="form.busy">
      <div v-if="!show">
        <span class="title">Success!</span>

        <p>Please check your mail box and spam folder to get password. Once you find your password, <a href="#" class="underline" @click="show = !show">click here</a> to enter.</p>
      </div>
      <template v-if="show">
        <span class="title">Enter Password!</span>

        <p v-if="!show">
          Success! Please check your spam (junk) folder and inbox to receive your password and verify your email. Once you find your password,
          <a href="#" class="underline" @click="show = !show">click here</a> to enter.
        </p>
        <input type="hidden" name="email" v-model="email" />
        <span class="form-group" :class="{ error: form.errors.has('password') }">
          <input v-model="password" type="password" placeholder="Password" name="password" />
          <span class="error-block">{{ form.errors.get('password') }}</span>
          <span class="error-block" v-show="form.errors.has('email')">The password you entered is incorrect.</span>
        </span>

        <div class="g_captcha_area">
          <vue-recaptcha :sitekey="sitekey" ref="recaptcha" @verify="onVerify" :load-recaptcha-script="true"></vue-recaptcha>
          <span class="error-block">{{ form.errors.get('recaptcha') }}</span>
        </div>

        <button type="submit" @click.prevent="send">Submit</button>
      </template>
    </form>
    <div class="link-registration">
      <span>Already have an account?</span>
      <a :href="url.login">
        <span>
          Log In
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L1 9" stroke="#3A58F9" />
          </svg>
        </span>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.g_captcha_area {
  margin-bottom: 20px;
  min-height: 80px;
}
</style>
<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  name: 'login-password',
  components: { VueRecaptcha },
  data() {
    return {
      form: new Form(),
      show: false,
      email: null,
      password: null,
      recaptcha: null,
      sitekey: process.env.MIX_NOCAPTCHA_SITEKEY,
      url: {
        login: route('login'),
        register: route('register')
      }
    }
  },
  mounted() {
    let url = new URL(window.location.href)
    this.email = url.searchParams.get('email')
    if (url.searchParams.get('show') === 'true') {
      this.show = true
    }
  },
  methods: {
    onVerify(response) {
      this.recaptcha = response
    },
    send() {
      FormProcessor.post(this.url.login, this.getForm())
        .then((response) => {
          if (response.redirect_url) {
            window.location.href = response.redirect_url
          }
        })
        .catch((response) => {
          // Unknown error
          this.$refs.recaptcha.reset()
          if (response.status === 419) {
            window.location.reload()
          }
        })
    },

    getForm() {
      this.form.email = this.email
      this.form.password = this.password
      this.form.recaptcha = this.recaptcha

      return this.form
    }
  }
}
</script>
