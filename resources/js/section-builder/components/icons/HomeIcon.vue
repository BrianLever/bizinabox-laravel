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
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z">
        <title>{{ props.title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'HomeIcon',
  props: {
    title: {
      type: String,
      default: 'Home icon'
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
