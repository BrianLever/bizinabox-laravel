<template>
  <li class="accordion__item">
    <div class="accordion__trigger" :class="{ accordion__trigger_active: visible }" @click="open">
      <!-- This slot will handle the title/header of the accordion and is the part you click on -->
      <slot name="accordion-trigger"></slot>
    </div>

    <transition name="accordion" @enter="start" @after-enter="end" @before-leave="start" @after-leave="end">
      <div class="accordion__content" v-show="visible">
        <ul>
          <!-- This slot will handle all the content that is passed to the accordion -->
          <slot name="accordion-content" :visible="visible"></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>

<script>
export default {
  name: 'accordion-item',
  props: {},
  inject: ['accordion'],
  data() {
    return {
      index: null
    }
  },
  computed: {
    visible() {
      return this.index === this.accordion.active
    }
  },
  methods: {
    open() {
      if (this.visible) {
        this.accordion.active = null
      } else {
        this.accordion.active = this.index
      }
    },
    start(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    end(el) {
      el.style.height = ''
    }
  },
  created() {
    this.index = this.accordion.count++
  }
}
</script>

<style lang="scss" scoped>
.accordion__item {
  cursor: pointer;
  padding: 0 10px;
  position: relative;
}

.accordion__trigger {
  display: flex;
  justify-content: space-between;
}

.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}

.accordion__content {
  ul {
    margin: 0;
    padding: 5px;
  }
}
</style>
