<template>
  <div class="content-login">
    <el-form v-show="!form.successful" v-loading="form.busy">
      <span class="title">Contact us</span>
      <span class="form-group">
        <el-form-item :error="form.errors.get('email')">
          <el-input v-model="models.email" name="email" size="large" placeholder="Email" class="email font-catamaran" type="email"></el-input>
        </el-form-item>
      </span>
      <span class="form-group">
        <el-form-item :error="form.errors.get('message')">
          <el-input
            v-model="models.message"
            class="message font-catamaran"
            placeholder="Brief description of how Freelogomaker can help you"
            type="textarea"
            name="password"
            maxlength="255"
            show-word-limit
          ></el-input>
        </el-form-item>
      </span>
      <button @click.prevent="send">Send</button>
      <!--            <span class="or">-->
      <!--                    or-->
      <!--                </span>-->
      <!--            <a href="mailto:support@freelogomaker.net" class="contact-us-email" itemprop="email">-->
      <!--                support@freelogomaker.net-->
      <!--            </a>-->
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
  </div>
</template>

<script>
import appMixin from '../mixins/app-mixin'

export default {
  name: 'contact-us',

  mixins: [appMixin],

  mounted() {
    if (this.user) {
      this.models.email = null
    }
  },

  data() {
    return {
      user: this.getUser(),
      form: new Form(),
      models: {
        email: null,
        message: null
      },
      response: {}
    }
  },

  methods: {
    send() {
      FormProcessor.post(route('contact-us.create'), this.getForm()).then((response) => {
        this.response = response
      })
    },

    getForm() {
      // Set form data
      this.form.email = this.models.email
      this.form.message = this.models.message

      return this.form
    }
  }
}
</script>

<style lang="scss">
form > svg {
  margin: auto auto 20px;
}

.el-form-item--small.el-form-item {
  margin-bottom: 0;
}

textarea.el-textarea__inner {
  height: 100px;
}

.contact-us-email {
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  text-align: center;
  color: #939393;
  margin-bottom: 0;
}

.wrapper {
  &.forgot-password {
    form {
      .email {
        input {
          font-size: 13px;
        }
      }

      .message {
        textarea {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
