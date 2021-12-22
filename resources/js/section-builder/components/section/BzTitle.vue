<template>
  <div
    style="font-size: 1.5em; line-height: 1em; display: flex; align-items: center; font-weight: bold"
    :class="{ [theme.titleFont]: true }"
    :style="{ color: color, marginBottom: mb + 'em', textShadow: shadow && 'rgba(0, 0, 0, 0.7) 0px 1px 3px', fontSize: size }"
  >
    <text-editor v-if="edit" v-model="data" :editable-colors="editableColors"></text-editor>
    <read-mode v-else :content="data" />
  </div>
</template>

<script>
import BzElement from '../BzElement'
import TextEditor from '../editor/TextEditor'
import ReadMode from 'vuejs-medium-editor/src/libs/ReadMode'

export default {
  extends: BzElement,
  components: { TextEditor, ReadMode },
  name: 'bz-title',
  props: {
    mb: {
      type: Number,
      default: 0.5
    },
    shadow: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '24px'
    }
  }
}
</script>
