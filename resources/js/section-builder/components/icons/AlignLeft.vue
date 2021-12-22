<template functional>
  <span
    :aria-hidden="props.decorative"
    :aria-label="props.title"
    :class="[data.class, data.staticClass]"
    class="material-design-icon delete-icon"
    role="img"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <svg :fill="props.fillColor" class="material-design-icon__svg" :width="props.size" :height="props.size" viewBox="0 0 24 24">
      <path d="M1,5 L11,5 L11,19 L1,19 L1,5 Z M13,5 L23,5 L23,7 L13,7 L13,5 Z M13,9 L19,9 L19,11 L13,11 L13,9 Z M13,13 L21,13 L21,15 L13,15 L13,13 Z">
        <title>{{ props.title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'align-left-icon',
  props: {
    title: {
      type: String,
      default: 'Delete icon'
    },
    decorative: {
      type: Boolean,
      default: false
    },
    fillColor: {
      type: String,
      default: 'currentColor'
    },
    size: {
      type: Number,
      default: 24
    }
  }
}
</script>
