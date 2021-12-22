<template>
  <div :class="{ [theme.paragraphFont]: true }" :style="style">
    <text-editor v-if="edit" v-model="data" :editable-colors="editableColors" />
    <read-mode v-else :content="data" />
  </div>
</template>

<script>
import BzElement from '../BzElement'
import TextEditor from '../editor/TextEditor'
import ReadMode from 'vuejs-medium-editor/src/libs/ReadMode'

export default {
  extends: BzElement,
  components: {
    TextEditor,
    ReadMode
  },
  name: 'bz-text',
  props: {
    shadow: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '1em'
    },
    bold: {
      type: Boolean,
      default: false
    },
    mb: {
      type: [Number, String],
      default: '0.5em'
    }
  },
  computed: {
    style() {
      return {
        lineHeight: '1.2em',
        marginBottom: typeof this.mb === 'string' ? this.mb : this.mb + 'px',
        color: this.color,
        textShadow: this.shadow && 'rgba(0, 0, 0, 0.7) 0px 1px 3px',
        fontSize: this.size,
        fontWeight: this.bold ? 'bold' : 'normal'
      }
    }
  }
}
</script>
