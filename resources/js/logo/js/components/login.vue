<template>
  <div class="content-login">
    <form v-loading="form.busy">
      <span class="title">Log in to your account</span>
      <div class="social">
        <a href="/login/facebook" class="facebook">
          <span class="icon">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.10547 14.75V8.48828H0V6H2.10547V4.03125C2.10547 2.99219 2.39714 2.1901 2.98047 1.625C3.5638 1.04167 4.33854 0.75 5.30469 0.75C6.08854 0.75 6.72656 0.786458 7.21875 0.859375V3.07422H5.90625C5.41406 3.07422 5.07682 3.18359 4.89453 3.40234C4.7487 3.58464 4.67578 3.8763 4.67578 4.27734V6H7L6.67188 8.48828H4.67578V14.75H2.10547Z"
                fill="white"
              />
            </svg>
          </span>
          <span class="name-button">Facebook</span>
        </a>

        <a href="/login/google" class="google-plus">
          <span class="icon">
            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5547 4.98438C10.6094 5.29427 10.6367 5.58594 10.6367 5.85938C10.6367 6.86198 10.4271 7.75521 10.0078 8.53906C9.58854 9.30469 8.99609 9.90625 8.23047 10.3438C7.46484 10.7812 6.58984 11 5.60547 11C4.65755 11 3.77344 10.763 2.95312 10.2891C2.15104 9.8151 1.51302 9.17708 1.03906 8.375C0.583333 7.57292 0.355469 6.69792 0.355469 5.75C0.355469 4.80208 0.583333 3.92708 1.03906 3.125C1.51302 2.32292 2.15104 1.6849 2.95312 1.21094C3.77344 0.736979 4.65755 0.5 5.60547 0.5C6.97266 0.5 8.13932 0.955729 9.10547 1.86719L7.68359 3.23438C7.13672 2.70573 6.44401 2.44141 5.60547 2.44141C5.02214 2.44141 4.47526 2.58724 3.96484 2.87891C3.47266 3.17057 3.08073 3.57161 2.78906 4.08203C2.4974 4.59245 2.35156 5.14844 2.35156 5.75C2.35156 6.35156 2.4974 6.90755 2.78906 7.41797C3.08073 7.92839 3.47266 8.32943 3.96484 8.62109C4.47526 8.91276 5.02214 9.05859 5.60547 9.05859C6.24349 9.05859 6.79948 8.92188 7.27344 8.64844C7.65625 8.42969 7.96615 8.11979 8.20312 7.71875C8.40365 7.40885 8.53125 7.10807 8.58594 6.81641H5.60547V4.98438H10.5547ZM15.6133 5.17578V3.64453H14.082V5.17578H12.5781V6.70703H14.082V8.23828H15.6133V6.70703H17.1445V5.17578H15.6133Z"
                fill="white"
              />
            </svg>
          </span>
          <span class="name-button">Google</span>
        </a>
      </div>
      <span class="or"> or </span>
      <span class="form-group" :class="{ error: form.errors.has('email') }">
        <input v-model="email" type="email" name="email" placeholder="Email" autofocus />
        <span class="error-block">{{ form.errors.get('email') }}</span>
      </span>
      <span class="form-group" :class="{ error: form.errors.has('password') }">
        <input v-model="password" type="password" name="password" placeholder="Password" />
        <span class="error-block">{{ form.errors.get('password') }}</span>
      </span>
      <div class="g_captcha_area">
        <vue-recaptcha :sitekey="sitekey" ref="recaptcha" @verify="onVerify" :load-recaptcha-script="true"></vue-recaptcha>
        <span class="error-block">{{ form.errors.get('recaptcha') }}</span>
      </div>
      <button type="submit" @click.prevent="send">Log In</button>
      <span class="link-forgot-password"><a href="/password/reset">Forgot password?</a></span>
    </form>
    <div class="link-registration">
      <span>Don't have an account?</span>
      <a :href="url.register">
        <span>
          Sign up
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L1 9" stroke="#3A58F9" />
          </svg>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  name: 'login',
  components: { VueRecaptcha },
  data() {
    return {
      form: new Form(),
      email: null,
      password: null,
      sitekey: process.env.MIX_NOCAPTCHA_SITEKEY,
      recaptcha: null,
      url: {
        login: route('login'),
        register: route('register')
      }
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
          window.grecaptcha.reset()
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

<style lang="scss" scoped>
.title {
  font-size: 15px;
  color: #2a2a2a;
}
.g_captcha_area {
  margin-bottom: 20px;
  min-height: 80px;
}
</style>
