<template>
  <div class="bz-page-view-content" :class="{ open: openSlider, close: !openSlider }">
    <div class="wrapper">
      <div v-for="(list, key) of dataList" :key="key" class="main_content_area" id="main_content" ref="mainContent">
        <div class="sections-wrapper">
          <header class="page-browser-bar">
            <div class="fake-browser-bar">
              {{ list.name }}
            </div>
          </header>
          <div class="bz-content-section" ref="headerSectionRef">
            <div class="component-root" ref="headerComponentRef">
              <component :is="header.name" :edit="true" :properties="header"></component>
            </div>
          </div>
          <draggable-item class="list-group" :move="onMove" :list="list[list.listName]" group="page" @change="log">
            <div class="bz-content-section list-group-item" :ref="'sectionRef' + key" v-for="(section, position) in list[list.listName]" :key="position">
              <div class="component-root" :ref="'componentRef' + key">
                <component :is="section.name" :properties="section"></component>
              </div>
            </div>
          </draggable-item>
          <div class="bz-content-section" ref="footerSectionRef">
            <div class="component-root" ref="footerComponentRef">
              <component :is="footer.name" :edit="true" :properties="footer"></component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Delete from '../icons/Delete'
import ZoomOut from '../icons/ZoomOut'
import BzComponent from '../BzComponent'
import draggable from 'vuedraggable'

export default {
  extends: BzComponent,
  components: {
    Delete,
    ZoomOut,
    draggable
  },
  mounted() {
    window.document.getElementsByTagName('html')[0].style.overflow = 'unset'
    this.dataList = this.allPages.map((page, index) => {
      return {
        name: page.name,
        listName: 'list' + index,
        ['list' + index]: page.sections
      }
    })
  },
  data() {
    return {
      dataList: []
    }
  },
  computed: {
    header() {
      return this.$store.state.header
    },
    footer() {
      return this.$store.state.footer
    }
  },
  methods: {
    log: function (evt) {
      if (evt.removed) {
        this.allPages = this.allPages.map((page, index) => {
          return {
            ...page,
            sections: this.dataList[index][this.dataList[index].listName] || []
          }
        })
        this.$store.commit('saveAllPages')
      }
    },
    onMove(e) {
      console.log(e)
    }
  },
  watch: {
    dataList: {
      deep: true,
      handler(value) {
        this.$nextTick(() => {
          if (value.length) {
            value.forEach((list, key) => {
              if (list[list.listName].length) {
                this.$refs['componentRef' + key].forEach((item, index) => {
                  const section = this.$refs['sectionRef' + key][index]
                  new ResizeObserver(function (entries) {
                    let rect = entries[0].contentRect
                    section.style.height = rect.height * 0.5 + 'px'
                  }).observe(item)
                })
              }
            })

            const self = this

            this.$refs['headerComponentRef'].forEach((item, index) => {
              new ResizeObserver(function (entries) {
                let rect = entries[0].contentRect
                self.$refs['headerSectionRef'][index].style.height = rect.height * 0.5 + 'px'
              }).observe(item)
            })

            this.$refs['footerComponentRef'].forEach((item, index) => {
              new ResizeObserver(function (entries) {
                let rect = entries[0].contentRect
                self.$refs['footerSectionRef'][index].style.height = rect.height * 0.5 + 'px'
              }).observe(item)
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$active: #0076df;
$dark_active: #0067c1;
$danger: darkred;

.bz-page-view-content {
  position: absolute;
  margin-left: 70px;
  width: calc(100% - 370px);
  margin-right: 300px;
  background-color: rgb(217, 222, 227);
  overflow: auto;
  transition: 0.5s;
  display: flex;
  height: calc(100vh - 60px);
  margin-bottom: 1000px;

  &.open {
    animation-fill-mode: forwards;
    animation-name: open;
    animation-duration: 0.5s;
    animation-delay: 0.4s;
  }

  &.close {
    animation-fill-mode: forwards;
    animation-name: close;
    animation-duration: 0.5s;
  }

  @keyframes open {
    from {
      margin-left: 70px;
    }
    to {
      margin-left: 370px;
    }
  }

  @keyframes close {
    from {
      margin-left: 370px;
      width: calc(100% - 370px);
    }
    to {
      margin-left: 70px;
      width: calc(100% - 70px);
    }
  }

  .wrapper {
    display: flex;
    transform-origin: left top;
    padding: 50px 50px 500px 50px;
    transition: all 0.5s;
    height: min-content;
  }

  .main_content_area {
    padding: 20px;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 60px);
    transition: 0.8s ease-in-out;
    transition-delay: 0.1s;
    width: 644px;

    .page-browser-bar {
      width: calc(100% - 4px);
      margin: 0 auto !important;

      .fake-browser-bar {
        width: 100%;
        height: 30px;
        background-color: white;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        display: flex;
        padding: 0 15px;
        align-items: center;
        font-weight: bold;
        font-size: 14px;
      }
    }

    .bz-component-container {
      position: relative;
      z-index: 1;
      height: 100%;
    }

    .sections-wrapper {
      position: relative;
      width: 100%;
      transition: 0.8s;
      transition-delay: 0.4s;

      .list-group {
        border-radius: 0 !important;

        .list-group-item {
          padding: 0 !important;
          background-color: #00000000 !important;
          &[draggable='true'],
          &.sortable-ghost,
          &.sortable-chosen {
            background-color: white;
            opacity: 1;
          }
        }
      }

      &.openSlider {
        .empty_section {
          border: 3px solid $active;
          transition-delay: 0.1s;
          transition: 0.4s;
        }
      }
    }

    .bz-content-section {
      position: relative;
      height: min-content;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2px;
      outline: solid 2px transparent;

      .component-root {
        position: absolute;
        width: 1200px;
        transform: scale(0.5);
      }

      &:hover {
        outline: solid 2px $active;
        transition: all 0.5s;
        cursor: move;
      }
    }
  }
}
</style>
