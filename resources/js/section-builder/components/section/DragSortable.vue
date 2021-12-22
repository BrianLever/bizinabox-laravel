<template>
  <div class="item" :class="{ dragging: dragging }">
    <div class="drag-sortable" :class="{ dragging: dragging, reversing: reversing, edit }" ref="draggingItem">
      <div class="handler" @mousedown="onMouseDown">
        <DragHandle fillColor="white" />
      </div>
      <div class="remove" @click.prevent="remove(index)">
        <Delete fillColor="white" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import DragHandle from '../icons/DragHandle'
import Delete from '../icons/Delete'
let overlappingVue
export default {
  components: {
    DragHandle,
    Delete
  },
  data() {
    return {
      keyPath: 'items',
      dragging: false,
      reversing: false,
      center: {},
      original: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      },
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      offsetX: 0,
      offsetY: 0,
      targetIndex: 0
    }
  },
  name: 'DragSortable',
  props: ['value', 'index', 'dragDirection', 'replaceDirection', 'edit'],
  watch: {
    value(newValue) {
      if (this.dragging) {
        let closest = newValue[0]
        let shortestDistance = 10000000000
        for (let index in newValue) {
          const item = newValue[index]
          if (item.index != this.index) {
            item.$el.style.backgroundColor = ''
            item.$refs.draggingItem.style = ''
            const distance = this.distance(item.center, newValue[this.index].center)
            if (shortestDistance > distance) {
              closest = item
              shortestDistance = distance
            }
          }
        }

        if ((Math.abs(this.offsetX) > this.width / 2 || Math.abs(this.offsetY) > this.height / 2) && Math.abs(shortestDistance) < Math.max(this.width, this.height)) {
          // set the background color of dragging item as white
          this.$el.style.backgroundColor = 'transparent'

          closest.$el.style.backgroundColor = '#80808034'
          closest.$el.style.height = closest.original.height + 'px'

          closest.$refs.draggingItem.style.position = 'absolute'
          closest.$refs.draggingItem.style.left = newValue[this.index].left - closest.$el.offsetLeft + 'px'
          closest.$refs.draggingItem.style.top = newValue[this.index].top - closest.$el.offsetTop + 'px'
          closest.$refs.draggingItem.style.width = newValue[this.index].width + 'px'
          closest.$refs.draggingItem.style.height = newValue[this.index].height + 'px'

          this.targetIndex = closest.index
        } else {
          this.$el.style.backgroundColor = '#80808034'
          this.targetIndex = this.index
        }
      }
    }
  },
  mounted() {
    const self = this

    self.value[self.index] = self
    self.$emit('input', self.value)
    self.targetIndex = self.index

    setTimeout(() => {
      self.original.top = self.$el.offsetTop
      self.original.left = self.$el.offsetLeft
      self.original.width = self.$el.offsetWidth
      self.original.height = self.$el.offsetHeight
    }, 100)
  },
  updated() {
    const self = this
    if (!self.dragging) {
      self.center = {
        x: self.$el.offsetLeft + self.$el.offsetWidth / 2,
        y: self.$el.offsetTop + self.$el.offsetHeight / 2
      }
    }
  },
  methods: {
    remove(index) {
      delete this.value[Object.keys(this.value).length - 1]
      this.$emit('input', Object.assign({}, this.value))
      this.$emit('remove', index)
    },
    distance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
    },
    clearStyle(el) {
      el.style.height = ''
      el.style.left = ''
      el.style.top = ''
      el.style.width = ''
      el.style.position = ''
      el.style.backgroundColor = ''
    },
    onMouseDown(e) {
      if (e.target.className === 'handler') {
        const self = this
        const root = self.$el
        const width = root.offsetWidth
        const height = root.offsetHeight
        const clientX = e.clientX
        const clientY = e.clientY

        self.width = width
        self.height = height
        self.left = root.offsetLeft
        self.top = root.offsetTop

        root.style.width = this.original.width + 'px'
        root.style.height = this.original.height + 'px'
        root.style.backgroundColor = '#80808034'

        function getMouseEventParams(e) {
          self.offsetX = e.clientX - clientX
          self.offsetY = e.clientY - clientY
          return {
            top: self.offsetY,
            left: self.offsetX,
            width,
            height
          }
        }

        const onMouseMove = function (e) {
          let { top, width, left, height } = getMouseEventParams(e)
          if (self.dragging) {
            self.$refs.draggingItem.style.position = 'absolute'
            self.$refs.draggingItem.style.top = top + 'px'
            self.$refs.draggingItem.style.left = left + 'px'
            self.$refs.draggingItem.style.width = width + 'px'
            self.$refs.draggingItem.style.height = height + 'px'
          }
          self.dragging = true
          self.center = {
            x: root.offsetLeft + left + width / 2,
            y: root.offsetTop + top + height / 2
          }
          self.value[self.index] = self
          self.$emit('input', Object.assign({}, self.value))
        }
        const mouseupHandler = function () {
          self.dragging = false
          self.reversing = true

          if (self.index !== self.targetIndex) {
            self.$refs.draggingItem.style.top = self.value[self.targetIndex].original.top - self.original.top + 'px'
            self.$refs.draggingItem.style.left = self.value[self.targetIndex].original.left - self.original.left + 'px'
            self.$refs.draggingItem.style.width = self.value[self.targetIndex].original.width + 'px'
            self.$refs.draggingItem.style.height = self.value[self.targetIndex].original.height + 'px'

            setTimeout(() => {
              self.clearStyle(self.$el)
              self.clearStyle(self.value[self.targetIndex].$el)
              self.clearStyle(self.$refs.draggingItem)
              self.clearStyle(self.value[self.targetIndex].$refs.draggingItem)

              self.$emit('sortEnd', {
                oldIndex: self.index,
                newIndex: self.targetIndex
              })
            }, 400)
          } else {
            self.$refs.draggingItem.style.top = 0
            self.$refs.draggingItem.style.left = 0
          }

          self.$el.style.backgroundColor = ''

          window.removeEventListener('mousemove', onMouseMove)
          window.removeEventListener('mouseup', mouseupHandler)
        }
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', mouseupHandler)
      }
    }
  }
}
</script>

<style lang="scss">
.list {
  position: relative;

  .item {
    position: relative;
    &.dragging {
      background-color: #80808034;
    }
  }
}

.drag-sortable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  transition: margin 0.2s linear;
  outline: solid 2px transparent;
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;

  .remove,
  .handler {
    width: 35px;
    height: 30px;
    position: absolute;
    top: -30px;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
  }

  .remove {
    right: 5px;
  }

  .handler {
    right: 40px;
  }

  &.edit {
    &:active,
    &:focus,
    &:hover {
      outline: solid 2px #0076df;
      border-radius: 4px;
      transition: 0.5s;
      color: black;
      z-index: 2;

      .remove,
      .handler {
        visibility: visible;
        background-color: #0076df;
        transition: 0.5s;
        &:hover {
          background-color: #025bab;
        }
      }
    }

    &.dragging {
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
      transition: none !important;
      z-index: 3 !important;
    }
  }
}
.drag-sortable.reversing {
  // reserving animation
  //transition:  all 0.4s;

  &.dragging {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    transition: none !important;
  }
}
</style>
