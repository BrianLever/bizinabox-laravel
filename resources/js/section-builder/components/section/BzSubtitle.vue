<template>
  <div
    style="font-size: 1.25em; line-height: 1em"
    :class="{ [theme.paragraphFont]: true }"
    :style="{ color: color, marginBottom: mb + 'em', textShadow: shadow && 'rgba(0, 0, 0, 0.7) 0px 1px 3px' }"
  >
    <text-editor v-if="edit" v-model="data" :editable-colors="editableColors" />
    <read-mode v-else :content="data" />
  </div>
</template>

<script>
import TextEditor from '../editor/TextEditor'
import ReadMode from 'vuejs-medium-editor/src/libs/ReadMode'
import BzElement from '../BzElement'

export default {
  components: { TextEditor, ReadMode },
  extends: BzElement,
  name: 'bz-subtitle',
  props: {
    shadow: {
      type: Boolean,
      default: false
    },
    mb: {
      type: Number,
      default: 0.5
    }
  }
}
</script>
