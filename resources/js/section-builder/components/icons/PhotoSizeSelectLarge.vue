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
      <path
        d="M21 15h2v2h-2v-2zm0-4h2v2h-2v-2zm2 8h-2v2c1 0 2-1 2-2zM13 3h2v2h-2V3zm8 4h2v2h-2V7zm0-4v2h2c0-1-1-2-2-2zM1 7h2v2H1V7zm16-4h2v2h-2V3zm0 16h2v2h-2v-2zM3 3C2 3 1 4 1 5h2V3zm6 0h2v2H9V3zM5 3h2v2H5V3zm-4 8v8c0 1.1.9 2 2 2h12V11H1zm2 8l2.5-3.21 1.79 2.15 2.5-3.22L13 19H3z"
      >
        <title>{{ props.title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'photo-size-select-large-icon',
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
