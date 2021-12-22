<template>
  <div class="text edit-mode bz-editor--text-root">
    <list-handler v-if="editor" :editor="editor" :onChange="triggerChange"> </list-handler>
    <div class="editor" v-bind:class="editorClass" v-html="prefill" :style="{ color: color }" ref="editor"></div>
  </div>
</template>

<script>
import MediumEditor from '../../custom/MediumEditor'
import ListHandler from './ListHandler'

import ReadMode from 'vuejs-medium-editor/src/libs/ReadMode'
import _ from 'underscore'
import { mapMutations } from 'vuex'

export default {
  name: 'text-editor',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    editableColors: {
      default: () => ['primaryColor', 'secondaryColor', 'lightModeColor', 'darkModeColor', 'whiteColor', 'blackColor'],
      type: Array
    }
  },
  created() {
    this.prefill = this.value
    this.content = this.value
  },
  data() {
    return {
      editor: null,
      defaultOptions: {
        forcePlainText: false,
        placeholder: {
          text: '',
          hideOnClick: true
        },
        colors: ['primaryColor', 'secondaryColor', 'lightModeColor', 'darkModeColor', 'whiteColor', 'blackColor'], // available font colors
        uploadUrl: 'https://api.imgur.com/3/image',
        uploadUrlHeader: { Authorization: 'Client-ID db856b43cc7f441' },
        file_input_name: 'image',
        imgur: true,
        toolbar: {
          allowMultiParagraphSelection: true,
          buttons: ['bold', 'italic', 'underline', 'fontsize', 'colorPicker'],
          static: true,
          align: 'center',
          updateOnEmptySelection: true
        },
        imageDragging: false
      },
      hasContent: false,
      autoLink: true,
      prefill: '',
      content: ''
    }
  },
  computed: {
    editorOptions() {
      return _.extend(this.defaultOptions, this.options)
    },
    editorClass() {
      return {
        'has-content': this.hasContent
      }
    },
    color() {
      return this.$store.state.color
    }
  },
  components: {
    ListHandler,
    ReadMode
  },
  mounted() {
    this.createElm()
  },
  watch: {
    value(newValue) {
      if (this.content !== newValue) {
        /**
         * it's important to real update prefill value, because v-html doesn't change it's content when it's same with old value.
         */
        this.prefill = newValue + '&nbsp'
        this.$nextTick(() => {
          this.prefill = newValue
          this.content = newValue
        })
      }
    },
    editableColors: {
      immediate: true,
      handler(value) {
        this.defaultOptions.colors = value
      }
    }
  },
  methods: {
    createElm() {
      this.editor = new MediumEditor(this.$refs.editor, this.editorOptions)
      this.editor.subscribe('editableInput', this.triggerChange)
      this.editor.subscribe('openAttachLinkForm', this.openAttachLinkModal)
      this.editor.subscribe('openTheme', this.openTheme)
    },
    destroyElm() {
      if (this.editor) {
        this.editor.destroy()
      }
    },
    triggerChange() {
      const content = this.editor.getContent()
      if (/<[a-z][\s\S]*>/i.test(content)) {
        this.hasContent = true
      } else {
        this.hasContent = false
      }
      this.$emit('input', content)
      this.content = content
    },
    openAttachLinkModal() {
      console.log('ppp')
    },
    openTheme() {
      console.log('open theme')
    },
    ...mapMutations(['openAttachLink'])
  },
  destroyed() {
    this.destroyElm()
  }
}
</script>
<style lang="scss">
.bz-editor--text-root {
  .editor {
    padding: 3px 10px;
    margin: -3px -10px;
  }
}
</style>
