<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 text-center">
        <div style="width: 500px; height: 500px" ref="svg">
          <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient v-bind:id="'LinearGradient' + lid" :x1="angle.x1" :y1="angle.y1" :x2="angle.x2" :y2="angle.y2">
                <stop
                  v-for="(point, key1) in attrs.points"
                  v-bind:key="key1"
                  :offset="getPercent(point.left)"
                  :stop-color="getColor(point.red, point.green, point.blue)"
                  :stop-opacity="point.alpha"
                />
              </linearGradient>
              <radialGradient ref="radial" v-bind:id="'RadialGradient' + rid" cx="0.5" cy="0.5" r="1">
                <stop
                  v-for="(point, key2) in attrs.points"
                  v-bind:key="key2"
                  :offset="getPercent(point.left)"
                  :stop-color="getColor(point.red, point.green, point.blue)"
                  :stop-opacity="point.alpha"
                />
              </radialGradient>
            </defs>

            <rect v-if="attrs.type === 'linear'" x="0" y="0" width="100%" height="100%" :fill="'url(#LinearGradient' + lid + ')'" />
            <rect v-if="attrs.type === 'radial'" x="0" y="0" width="100%" height="100%" :fill="'url(#RadialGradient' + rid + ')'" />
          </svg>
        </div>
      </div>
      <div class="col-md-6">
        <ColorPicker
          :gradient="gradient"
          :isGradient="true"
          :onStartChange="(color) => onChange(color, 'start')"
          :onChange="(color) => onChange(color, 'change')"
          :onEndChange="(color) => onChange(color, 'end')"
        />
        <div v-if="attrs.points">
          <table class="table table-centered table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Left</th>
                <th>Hex</th>
                <th>R</th>
                <th>G</th>
                <th>B</th>
                <th>Alpha</th>
              </tr>
            </thead>
            <tr v-for="(attr, i) in attrs.points" :key="i">
              <td>{{ i + 1 }}</td>
              <td><input type="number" v-model="attr.left" min="0" max="100" /></td>
              <td><input type="text" v-bind:value="getHexRow(attr)" @change="setHexRow(attr)" /></td>
              <td><input type="number" v-bind:value="attr.red" @change="setRGBRow(attr, 'red')" min="0" max="255" /></td>
              <td><input type="number" v-bind:value="attr.green" @change="setRGBRow(attr, 'green')" min="0" max="255" /></td>
              <td><input type="number" v-bind:value="attr.blue" @change="setRGBRow(attr, 'blue')" min="0" max="255" /></td>
              <td><input type="text" v-bind:value="getAlphaRow(attr.alpha)" @change="setAlphaRow(i)" /></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <input type="text" class="form-control m-input--square" v-model="name" placeholder="Name" />
          <div class="form-control-feedback error-name"></div>
        </div>
      </div>
      <div class="col-md-6">
        <a href="#" class="ml-auto btn m-btn--square btn-outline-primary mb-2" @click.prevent="gotoBack">Back</a>
        <a href="#" class="ml-auto btn m-btn--square btn-outline-success mb-2" @click.prevent="submit" v-bind:disabled="formBusy">Submit</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ColorPicker } from 'vue-color-gradient-picker'
export default {
  props: {
    category_id: Number,
    attrs_prop: '',
    name_prop: String,
    palette_id: Number
  },
  components: {
    ColorPicker
  },
  data() {
    return {
      lid: 0,
      rid: 0,
      formBusy: false,
      name: '',
      gradient: this.initGradient(),
      attrs: '',
      angle: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      }
    }
  },
  mounted() {
    this.lid = this.uuidv4()
    this.rid = this.uuidv4()
    this.name = this.name_prop
    if (this.attrs_prop) {
      this.attrs = this.attrs_prop
    }
    this.onChange(this.gradient)
  },
  methods: {
    initGradient() {
      if (this.attrs_prop) return this.attrs_prop
      return {
        type: 'linear',
        degree: 0,
        points: [
          {
            left: 0,
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1
          },
          {
            left: 100,
            red: 255,
            green: 0,
            blue: 0,
            alpha: 1
          }
        ]
      }
    },
    onChange(attrs) {
      const anglePI = (attrs.degree + 90) * (Math.PI / 180)
      const percent = '%'
      this.attrs = attrs
      this.attrs.points.sort((a, b) => a.left - b.left)
      this.angle = {
        x1: Math.round(50 + Math.cos(anglePI) * 50) + percent,
        y1: Math.round(50 + Math.sin(anglePI) * 50) + percent,
        x2: Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + percent,
        y2: Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + percent
      }
    },
    getRotate(val) {
      const rotate = 'rotate('
      const last = ')'
      return rotate + val + last
    },
    getPercent(val) {
      const percent = '%'
      return val + percent
    },
    getHexNumber(val) {
      if (val) {
        var hex = val.toString(16)
        return hex.length == 1 ? '0' + hex : hex
      } else {
        return '00'
      }
    },
    getColor(red, green, blue) {
      const prefix = '#'
      return prefix + this.getHexNumber(red) + this.getHexNumber(green) + this.getHexNumber(blue)
    },
    removePointFun(index) {
      this.$delete(this.attrs.points, index)
    },
    getHexRow(attr) {
      return this.getHexNumber(attr.red) + this.getHexNumber(attr.green) + this.getHexNumber(attr.blue)
    },
    getAlphaRow(alpha) {
      return alpha * 100
    },
    setAlphaRow(index) {
      let value = parseInt(event.target.value)
      if (value >= 0 && value <= 100) {
        this.attrs.points[index].alpha = value / 100
      } else {
        event.target.value = this.attrs.points[index].alpha * 100
      }
    },
    setRGBRow(attr, field) {
      let value = parseInt(event.target.value)
      if (value >= 0 && value <= 255) {
        attr[field] = value
      } else {
        event.target.value = attr[field]
      }
    },
    setHexRow(attr) {
      let value = '#' + event.target.value
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value)
      if (result) {
        attr.red = parseInt(result[1], 16)
        attr.green = parseInt(result[2], 16)
        attr.blue = parseInt(result[3], 16)
      } else {
        event.target.value = this.getHexRow(attr)
      }
    },
    gotoBack() {
      window.location.href = '/admin/logotypes/color/item/' + this.category_id
    },
    submit() {
      let url
      let cat_id = this.category_id
      let palette_id = this.palette_id
      let svg = this.$refs.svg.innerHTML

      if (this.palette_id === 0) {
        url = `/admin/logotypes/color/item/create/${cat_id}`
      } else {
        url = `/admin/logotypes/color/item/edit/${palette_id}`
      }
      axios
        .post(url, {
          name: this.name,
          svg: svg,
          attrs: JSON.stringify(this.attrs)
        })
        .then(function (response) {
          if (response.data.status === 1) {
            itoastr('success', 'success!')
            redirectAfterDelay('/admin/logotypes/color/item/' + cat_id)
          } else {
            dispErrors(response.data.data)
          }
        })
        .catch(function (error) {
          itoastr('error', error)
        })
    },
    setFormBusy(value = true) {
      this.formBusy = value
    },
    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
  }
}
</script>
<style lang="scss">
.gradient-degree-value p {
  margin-bottom: 0;
}
.table th,
.table td {
  vertical-align: middle !important;
  text-align: center;
}
.table td {
  padding: 5px;
  input {
    width: 100%;
    border: 0;
    outline: 0;
    text-align: center;
    &:focus {
      border: 1px solid #4d8ac9;
    }
  }
}
</style>
<style src="vue-color-gradient-picker/dist/index.css" lang="css" />
