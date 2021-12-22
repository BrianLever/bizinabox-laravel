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
        d="M21 5l-9-4-9 4v6c0 5.55 3.84 10.74 9 12 2.3-.56 4.33-1.9 5.88-3.71l-3.12-3.12c-1.94 1.29-4.58 1.07-6.29-.64-1.95-1.95-1.95-5.12 0-7.07 1.95-1.95 5.12-1.95 7.07 0 1.71 1.71 1.92 4.35.64 6.29l2.9 2.9C20.29 15.69 21 13.38 21 11V5z"
      >
        <title>{{ props.title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'PolicyIcon',
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
