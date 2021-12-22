<template>
  <multiselect @input="changeFont" v-model="models.font" :options="fonts" track-by="name" label="name" :allow-empty="false" deselect-label="Selected">
    <template slot="singleLabel" slot-scope="font">
      <div :style="{ 'font-family': font.option.name }">{{ font.option.name }}</div>
    </template>
    <template slot="option" slot-scope="font">
      <div :style="{ 'font-family': font.option.name }">{{ font.option.name }}</div>
    </template>
  </multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'select-font',

  props: ['font'],

  components: {
    Multiselect
  },

  data() {
    return {
      models: {
        font: this.font
      },

      fonts: []
    }
  },

  mounted() {
    this.loadFonts()
  },

  watch: {
    font: function (font) {
      this.models.font = font
    }
  },

  methods: {
    loadFonts() {
      let self = this

      axios.get(route('fonts.get')).then(function (response) {
        self.fonts = response.data
      })
    },

    changeFont() {
      this.$emit('input', this.models.font.name)
    }
  }
}
</script>
