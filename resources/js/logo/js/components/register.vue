<template>
  <div class="content-login">
    <form v-loading="form.busy">
      <span class="title">Create account</span>
      <span class="form-group" :class="{ error: form.errors.has('email') }">
        <input v-model="email" type="email" placeholder="Email" name="email" />
        <span class="error-block">{{ form.errors.get('email') }}</span>
      </span>
      <span class="form-group" :class="{ error: form.errors.has('password') }">
        <input v-model="password" type="password" name="password" placeholder="Password" />
        <span class="error-block">{{ form.errors.get('password') }}</span>
      </span>
      <span class="form-group">
        <el-checkbox-group v-model="newsletter" size="small">
          <el-checkbox border checked> Subscribe to the newsletter </el-checkbox>
        </el-checkbox-group>
      </span>
      <p class="agree_text">
        By proceeding I agree to the
        <a :href="url.term_of_use" target="_blank">Terms of Service</a>
        and
        <a :href="url.privacy_policy" target="_blank">Privacy Policy</a>
      </p>
      <div class="g_captcha_area">
        <vue-recaptcha :sitekey="sitekey" ref="recaptcha" @verify="onVerify" :load-recaptcha-script="true"></vue-recaptcha>
        <span class="error-block">{{ form.errors.get('recaptcha') }}</span>
      </div>

      <button type="submit" @click.prevent="send">Next</button>
      <span class="link-forgot-password"><a href="/password/reset">Forgot password?</a></span>
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
.content-login {
  .checkbox-group {
    .form-group {
      .el-checkbox {
        width: 320px;
        padding: 9px 10px 7px 11px;
      }
    }
  }

  .form-group {
    .el-checkbox-group {
      .el-checkbox {
        display: flex;
        align-items: center;

        .el-checkbox__label {
          font-size: 11px;
        }
      }
    }
  }
}
.agree_text {
  font-size: 12px;
}
</style>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  name: 'register',
  components: { VueRecaptcha },
  data() {
    return {
      form: new Form(),
      email: null,
      password: null,
      newsletter: false,
      recaptcha: null,
      sitekey: process.env.MIX_NOCAPTCHA_SITEKEY,
      url: {
        login: route('login'),
        register: route('register'),
        term_of_use: route('legal.terms-of-service'),
        privacy_policy: route('legal.privacy-policy')
      }
    }
  },

  methods: {
    onVerify(response) {
      this.recaptcha = response
    },
    send() {
      FormProcessor.post(this.url.register, this.getForm())
        .then((response) => {
          if (response.redirect_url) {
            window.location.href = response.redirect_url
          }
        })
        .catch((response) => {
          this.$refs.recaptcha.reset()
        })
    },
    getForm() {
      this.form.email = this.email
      this.form.password = this.password
      this.form.newsletter = this.newsletter
      this.form.recaptcha = this.recaptcha

      return this.form
    }
  }
}
</script>
