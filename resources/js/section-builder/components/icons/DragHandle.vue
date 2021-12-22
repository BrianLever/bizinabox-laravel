<template functional>
  <span
    :aria-hidden="props.decorative"
    :aria-label="props.title"
    :class="[data.class, data.staticClass]"
    class="material-design-icon drag-vertical-icon"
    role="img"
    v-bind="data.attrs"
    v-on="listeners"
    :style="{ pointerEvents: 'none' }"
  >
    <svg :fill="props.fillColor" class="material-design-icon__svg" :width="props.size" :height="props.size" viewBox="0 0 24 24">
      <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z">
        <title>{{ props.title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'DragVerticalIcon',
  props: {
    title: {
      type: String,
      default: 'Drag Vertical icon'
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
