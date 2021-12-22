<template>
  <div>
    <div class="main">
      <div class="container">
        <form method="POST" id="signup-form" class="signup-form" action="#">
          <div>
            <fieldset>
              <h2>1. Load svg logo</h2>
              <div class="fieldset-content">
                <div class="form-row">
                  <div class="form-flex">
                    <div class="form-group">
                      <br />
                      <input type="file" @change="processLogo($event)" />
                      <span class="text-input">Svg file</span>
                      <br />
                      <input type="file" @change="processPreview($event)" />
                      <span class="text-input">Preview image</span><br />
                      <div id="preview">
                        <img width="300px" height="auto" v-if="preview_url" :src="preview_url" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <h2>2. Font names</h2>
              <input type="file" @change="getFontName($event)" />
              <div v-if="states.loading.font_name">Loading...</div>
              <span v-else class="text-input" v-for="font_name in font_names">
                {{ font_name }}
              </span>
              <br /><br />
              <h2>3. Load fonts</h2>
              <div class="fieldset-content">
                <div class="form-row">
                  <div class="form-flex">
                    <div class="form-group">
                      <br />
                      <input type="file" @change="processFirstFont($event)" />
                      <span class="text-input">Font 1</span>
                    </div>
                    <div class="form-group">
                      <br />
                      <input type="file" @change="processSecondFont($event)" />
                      <span class="text-input">Font 2</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <br />

              <div v-if="errors">
                <ul>
                  <li v-for="error in errors">
                    <p class="text-danger">{{ error[0] }}</p>
                  </li>
                </ul>
              </div>
              <div v-if="link_to_editor">
                <p class="text-success" v-html="success"></p>
                <a :href="link_to_editor" target="_blank">Click for tests in editor...</a>
              </div>
              <br />
              <button @click="loadLogo" v-loading="!success" type="button">Finish</button>
              <br /><br />
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'import-logo',

  data() {
    return {
      form: new Form(),
      logotype: null,
      preview: null,
      preview_url: null,
      fonts: {
        first: null,
        second: null
      },
      states: {
        loading: {
          font_name: false
        }
      },
      font_names: [],
      errors: null,
      success: true,
      link_to_editor: null,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  },

  methods: {
    loadLogo() {
      // Prepare form
      let data = this.getData()

      this.success = false
      this.errors = null

      // Save logo
      axios
        .post(route('admin.do-import-logo'), data, {
          headers: this.headers
        })
        .then((response) => {
          this.success = response.data.success
          this.link_to_editor = response.data.link_to_editor
        })
        .catch((err) => {
          this.errors = err.response.data.errors
          this.success = true
        })
    },

    getData() {
      let formData = new FormData()
      formData.append('logotype', this.logotype)
      formData.append('preview', this.preview)
      formData.append('first_font', this.fonts.first)
      formData.append('second_font', this.fonts.second)

      return formData
    },

    processLogo(event) {
      this.logotype = event.currentTarget.files[0]
    },
    processPreview(event) {
      this.preview = event.currentTarget.files[0]
      this.preview_url = URL.createObjectURL(this.preview)
    },
    processFirstFont(event) {
      this.fonts.first = event.currentTarget.files[0]
    },
    processSecondFont(event) {
      this.fonts.second = event.currentTarget.files[0]
    },
    getFontName(event) {
      // Create and prepare form data
      let formData = new FormData()
      formData.append('font', event.currentTarget.files[0])

      // Set loading state
      this.states.loading.font_name = true

      // Make request for retrieve font name
      axios.post(route('admin.fonts.get-name'), formData, { headers: this.headers }).then((response) => {
        this.font_names.push(response.data.font.name)

        // Set loading state
        this.states.loading.font_name = false
      })
    }
  }
}
</script>
<style scoped>
body {
  font-size: 14px;
  line-height: 1.6;
  color: #222;
  font-weight: 400;
  margin: 0;
  background: #222 !important;
  position: relative;
  padding: 0;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}

/* @extend display-flex; */
display-flex,
.form-flex,
.form-date-group,
.steps ul,
.title,
.title .step-number,
.actions ul li a,
.form-radio-flex,
.form-find {
  display: flex;
  display: -webkit-flex;
}

/* @extend list-type-ulli; */
list-type-ulli,
.steps ul,
.actions ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

/* roboto-slab-300 - latin */
a:focus,
a:active {
  text-decoration: none;
  outline: none;
  transition: all 300ms ease 0s;
  -moz-transition: all 300ms ease 0s;
  -webkit-transition: all 300ms ease 0s;
  -o-transition: all 300ms ease 0s;
  -ms-transition: all 300ms ease 0s;
}

input,
select,
textarea {
  outline: none;
  appearance: unset !important;
  -moz-appearance: unset !important;
  -webkit-appearance: unset !important;
  -o-appearance: unset !important;
  -ms-appearance: unset !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none !important;
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  -o-appearance: none !important;
  -ms-appearance: none !important;
  margin: 0;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: none !important;
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -o-box-shadow: none !important;
  -ms-box-shadow: none !important;
}

input[type='checkbox'] {
  appearance: checkbox !important;
  -moz-appearance: checkbox !important;
  -webkit-appearance: checkbox !important;
  -o-appearance: checkbox !important;
  -ms-appearance: checkbox !important;
}

input[type='radio'] {
  appearance: radio !important;
  -moz-appearance: radio !important;
  -webkit-appearance: radio !important;
  -o-appearance: radio !important;
  -ms-appearance: radio !important;
}

.clear {
  clear: both;
}

h2 {
  font-size: 30px;
  margin: 0px;
}

body {
  font-size: 14px;
  line-height: 1.6;
  color: #222;
  font-weight: 400;
  font-family: 'Roboto Slab';
  margin: 0px;
  background: #222;
  position: relative;
  padding: 0px;
}

.main {
  padding: 50px 0;
  position: relative;
  z-index: 99;
}

.container {
  width: 1400px;
  margin: 0 auto;
  background: #fff;
}

fieldset {
  padding: 0px;
  margin: 0px;
  border: none;
  padding-left: 45px;
  padding-right: 55px;
  padding-top: 45px;
}

p.desc {
  margin: 0px;
  margin-bottom: 40px;
  color: #555;
}

.form-label {
  display: block;
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
}

.text-input {
  font-size: 12px;
  color: #999;
  display: block;
  margin-top: 5px;
}

.text-input span {
  color: #222;
  font-weight: bold;
}

input:not([type='file']) {
  width: 100%;
  display: block;
  border: 1px solid #ebebeb;
  height: 50px;
  box-sizing: border-box;
  padding: 0 20px;
  color: #222;
  font-weight: bold;
  font-size: 14px;
  font-family: 'Roboto Slab';
}

#steps-uid-0-p-0 .form-row,
#steps-uid-0-p-0 .form-group,
#steps-uid-0-p-0 .form-date {
  width: 680px;
}

.form-flex {
  margin: 0 -10px;
}

.form-flex .form-group {
  width: 50%;
  padding: 0 10px;
}

.form-group,
.form-date {
  margin-bottom: 18px;
  position: relative;
}

.form-date-group {
  border: 1px solid transparent;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;
}

.form-date-group select {
  border: 1px solid #ebebeb;
  width: 100%;
  box-sizing: border-box;
  appearance: none !important;
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  -o-appearance: none !important;
  -ms-appearance: none !important;
  position: relative;
  background: 0 0;
  z-index: 10;
  cursor: pointer;
  padding: 0 20px;
  height: 50px;
  font-size: 14px;
  font-family: 'Roboto Slab';
  color: #999;
  box-sizing: border-box;
  background-color: #fff;
  color: #222;
  font-weight: bold;
}

.form-date-item {
  position: relative;
  overflow: hidden;
  width: 100px;
  margin-right: 10px;
}

.vertical {
  display: block;
  width: 100%;
  overflow: hidden;
}

.vertical .steps {
  float: left;
  width: 310px;
}

.vertical .content,
.vertical .actions {
  float: right;
  width: 1090px;
}

.content {
  height: 800px;
}

.steps ul {
  flex-direction: column;
  -moz-flex-direction: column;
  -webkit-flex-direction: column;
  -o-flex-direction: column;
  -ms-flex-direction: column;
  position: relative;
  padding-left: 40px;
  padding-top: 60px;
}

.steps ul li {
  padding-bottom: 40px;
  position: relative;
  z-index: 99;
}

.steps ul li a {
  text-decoration: none;
  color: #222;
}

.steps ul:after {
  position: absolute;
  content: '';
  width: 2px;
  height: 180px;
  background: #ebebeb;
  left: 64px;
  top: 50%;
  transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  z-index: 9;
}

.title {
  align-items: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  -o-align-items: center;
  -ms-align-items: center;
}

.title .step-number {
  width: 40px;
  height: 40px;
  align-items: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  -o-align-items: center;
  -ms-align-items: center;
  justify-content: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  -o-justify-content: center;
  -ms-justify-content: center;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  -o-border-radius: 50%;
  -ms-border-radius: 50%;
  background: #ebebeb;
  color: #999;
  margin-right: 15px;
  border: 5px solid #fff;
  font-weight: bold;
}

.title .step-text {
  font-weight: bold;
  color: #999;
}

.current .title .step-number {
  background: #4966b1;
  color: #fff;
}

.current .title .step-text {
  color: #4966b1;
}

.content h3 {
  display: none;
}

.content,
.actions {
  background: #f8f8f8;
}

.actions {
  padding-bottom: 90px;
}

.actions ul {
  padding-left: 45px;
  padding-right: 55px;
}

.actions ul .disabled {
  display: none;
}

.actions ul li {
  float: right;
}

.actions ul li:first-child {
  float: left;
}

.actions ul li:first-child a {
  background: #e8e8e8;
  color: #999;
}

.actions ul li a {
  width: 140px;
  height: 50px;
  color: #fff;
  background: #4966b1;
  align-items: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  -o-align-items: center;
  -ms-align-items: center;
  justify-content: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  -o-justify-content: center;
  -ms-justify-content: center;
  text-decoration: none;
}

.form-radio-flex {
  flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -o-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  margin: 0 -15px;
}

.form-radio-flex .form-radio-item {
  padding: 0 15px;
  margin-bottom: 25px;
}

.form-radio-flex input {
  width: 0;
  height: 0;
  position: absolute;
  left: -9999px;
}

.form-radio-flex input + label {
  margin: 0px;
  width: 223px;
  height: 133px;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  text-align: center;
  background-color: transparent;
  border: 1px solid transparent;
  text-align: center;
  text-transform: none;
  transition: border-color 0.15s ease-out, color 0.25s ease-out, background-color 0.15s ease-out, box-shadow 0.15s ease-out;
}

.form-radio-flex input + label img {
  width: 100%;
  height: 100%;
}

.form-radio-flex input:checked + label {
  border: 1px solid #4966b1;
  z-index: 1;
}

.form-radio-flex input:focus + label {
  outline: none;
}

.form-radio-flex input:hover {
  border: 1px solid #4966b1;
}

label.error {
  display: block;
  position: absolute;
  top: 0px;
  right: 0;
}

label.error:after {
  font-family: 'Material-Design-Iconic-Font';
  position: absolute;
  content: '\f135';
  right: 20px;
  top: 50px;
  font-size: 13px;
  color: #f63726;
}

input.error {
  border: 1px solid #f63726;
}

#find_bank {
  padding: 0 55px;
  width: 680px;
  margin-right: 20px;
}

#find_bank::-webkit-input-placeholder {
  font-weight: 400;
}

#find_bank::-moz-placeholder {
  font-weight: 400;
}

#find_bank:-ms-input-placeholder {
  font-weight: 400;
}

#find_bank:-moz-placeholder {
  font-weight: 400;
}

.submit {
  width: 150px;
  background: #666;
  color: #fff;
  font-weight: 400;
  cursor: pointer;
}

.submit:hover {
  background-color: #4d4d4d;
}

.form-find {
  position: relative;
  padding-bottom: 70px;
  border-bottom: 1px solid #ebebeb;
}

.form-icon {
  position: absolute;
  top: 12px;
  left: 20px;
  font-size: 18px;
  color: #999;
}

.choose-bank-desc {
  color: #666;
  margin: 0px;
  padding-top: 30px;
  padding-bottom: 35px;
}

#slider-margin {
  height: 9px;
  border: none;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  -o-box-shadow: none;
  -ms-box-shadow: none;
  background: #e8e8e8;
  border-radius: 0px;
  -moz-border-radius: 0px;
  -webkit-border-radius: 0px;
  -o-border-radius: 0px;
  -ms-border-radius: 0px;
  position: relative;
  margin-top: 110px;
}

#slider-margin .noUi-marker-horizontal.noUi-marker-large,
#slider-margin .noUi-marker-horizontal.noUi-marker {
  height: 0px;
}

#slider-margin .noUi-connect {
  background: #4966b1;
}

#slider-margin .noUi-connects {
  border-radius: 0px;
  -moz-border-radius: 0px;
  -webkit-border-radius: 0px;
  -o-border-radius: 0px;
  -ms-border-radius: 0px;
}

#slider-margin .noUi-handle {
  width: 15px;
  height: 30px;
  top: -12px;
  background: #e8e8e8;
  outline: none;
  border: none;
  right: -15px;
  border: 1px solid #4966b1;
  border-radius: 0px;
}

#slider-margin .noUi-handle:after,
#slider-margin .noUi-handle:before {
  width: 0px;
}

#slider-margin .noUi-handle .noUi-tooltip {
  bottom: 33px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #4966b1;
  padding: 0px;
}

#slider-margin .noUi-pips {
  width: 96%;
}

#slider-margin .noUi-pips .noUi-value {
  top: -50px;
  font-size: 16px;
  color: #666;
}

#slider-margin .noUi-pips .noUi-value:before {
  content: '$';
}

#slider-margin .noUi-pips .noUi-value-horizontal {
  transform: none;
  -moz-transform: none;
  -webkit-transform: none;
  -o-transform: none;
  -ms-transform: none;
}

.your-money {
  font-size: 16px;
  color: #222;
  margin: 0px;
  padding-top: 62px;
}

.your-money .money {
  font-size: 28px;
  font-weight: bold;
}

@media screen and (max-width: 1024px) {
  .container {
    width: calc(100% - 40px);
    max-width: 100%;
  }

  .vertical .steps,
  .vertical .content,
  .vertical .actions {
    float: none;
    width: 100%;
  }

  #find_bank {
    width: 100%;
  }

  .form-radio-flex input + label {
    width: 190px;
    height: 120px;
  }
}

@media screen and (max-width: 992px) {
  .content {
    height: 900px;
  }

  .form-radio-flex input + label {
    width: 100px;
    height: 65px;
  }
}

@media screen and (max-width: 768px) {
  #steps-uid-0-p-0 .form-row,
  #steps-uid-0-p-0 .form-group,
  #steps-uid-0-p-0 .form-date {
    width: 100%;
  }

  .form-flex {
    flex-direction: column;
    -moz-flex-direction: column;
    -webkit-flex-direction: column;
    -o-flex-direction: column;
    -ms-flex-direction: column;
    margin: 0px;
  }

  .form-flex .form-group {
    padding: 0px;
  }

  fieldset,
  .actions ul {
    padding-left: 30px;
    padding-right: 30px;
  }

  #slider-margin .noUi-pips {
    width: 94%;
  }
}

@media screen and (max-width: 480px) {
  .form-date-group,
  .form-find {
    flex-direction: column;
    -moz-flex-direction: column;
    -webkit-flex-direction: column;
    -o-flex-direction: column;
    -ms-flex-direction: column;
  }

  .content {
    height: 1050px;
  }

  #find_bank {
    margin-bottom: 20px;
  }

  .actions ul li a {
    width: 100px;
  }

  .form-radio-flex {
    margin: 0 -5px;
  }

  .form-radio-flex .form-radio-item {
    padding: 0 5px;
  }

  .form-radio-flex input + label {
    width: 90px;
    height: 61px;
  }
}

/*# sourceMappingURL=style.css.map */
</style>
