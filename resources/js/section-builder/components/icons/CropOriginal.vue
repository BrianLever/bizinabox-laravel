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
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z">
        <title>{{ props.title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'DeleteIcon',
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
