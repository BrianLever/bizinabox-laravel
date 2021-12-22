<template>
  <nav class="z-99 w-100 bz-navbar shadow-sm bg-white">
    <div class="w-100 row px-3">
      <div class="col-5">
        <div class="d-flex flex-nowrap align-items-center">
          <div class="nav-item">
            <a href="/admin/template/item" class="btn bz-btn-default-outline mr-1">Back</a>
          </div>
          <template>
            <div class="nav-item" v-dropdown="{ autoClose: true }">
              <span class="page_select h-hover d-flex align-items-center justify-content-between minw-150px" dropdown-toggle>
                <span class="mr-2"
                  >Page: <b class="text-capitalize">{{ activePage.name }}</b></span
                >
                <span class="fs-12px ml-2"
                  ><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                    <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" /></svg
                ></span>
              </span>
              <div class="bz-dropdown-menu-container">
                <div v-for="(page, index) of allPages" :key="index" class="bz-dropdown-menu cursor-pointer" @click.stop.prevent="setActivePage(index)">
                  {{ page.name }}
                </div>
                <hr class="w-100" style="margin: 0" />
                <div class="text-center pt-2">
                  <a href="javascript:void(0)" @click.prevent.stop="openPageSlider()">Manage pages</a>
                </div>
              </div>
            </div>
            <div class="nav-item px-2">
              <a class="switch_item d-inline-block mx-1 flip-x" href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#b6b6b6">
                  <path d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z" />
                </svg>
              </a>
              <a class="switch_item d-inline-block mx-1" href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#b6b6b6">
                  <path d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z" />
                </svg>
              </a>
              <a class="switch_item d-none d-md-inline-block mx-1" href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#b6b6b6">
                  <path
                    d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"
                  />
                </svg>
              </a>
            </div>
            <div class="nav-item">
              <div @click="saveAllPages">
                <button class="btn bz-btn-default-outline d-flex align-items-center">
                  Save
                  <bz-spinner style="margin-left: 5px" v-if="savingAllPages" />
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
      <template>
        <div class="col-2">
          <ul v-if="activeSlider === 'sections'" class="mb-0 pl-0 list-style-none d-none d-md-flex flex-row justify-content-center">
            <li class="nav-item">
              <a class="switch_item d-inline-block mx-1" href="" :class="{ active: viewMode === 'desktop' }" @click.prevent="setViewMode('desktop')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M0 0v19h24v-19h-24zm22 14h-20v-12h20v12zm-6.599 7l2.599 3h-12l2.599-3h6.802z" />
                </svg>
              </a>
            </li>
            <li class="nav-item">
              <a class="switch_item d-inline-block mx-1" href="" :class="{ active: viewMode === 'mobile' }" @click.prevent="setViewMode('mobile')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M19 2c0-1.104-.896-2-2-2h-10c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-20zm-8.5 0h3c.276 0 .5.224.5.5s-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm1.5 20c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm5-3h-10v-14.024h10v14.024z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-5">
          <ul class="mb-0 pl-0 list-style-none d-none d-md-flex flex-row justify-content-end">
            <li class="nav-item">
              <a class="btn btn-outline-info m-1" :href="previewUrl" target="_blank"> Preview </a>
            </li>
            <li class="nav-item">
              <a class="btn btn-info m-1 text-white" href=""> Publish </a>
            </li>
            <li class="nav-item">
              <a class="btn btn-outline-info m-1 text-white text-dark" href="">
                <i class="fas fa-ellipsis-v"></i>
              </a>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex'
import BzComponent from '../BzComponent'
import Button from '../section/BzButton'
import BzSpinner from './BzSpinner'

export default {
  components: { BzSpinner, Button },
  extends: BzComponent,
  data() {
    return {
      savingAllPages: false
    }
  },
  methods: {
    ...mapMutations({
      save: 'saveAllPages',
      setViewMode: 'setViewMode'
    }),
    saveAllPages() {
      this.savingAllPages = true
      this.save(() => {
        this.savingAllPages = false
        this.$toast.success('Successfully saved!')
      })
    }
  },
  computed: {
    viewMode() {
      return this.$store.state.viewMode
    },
    pages() {
      return this.$store.state.pages
    },
    previewUrl() {
      if (this.template) {
        if (this.template.domain) {
          if (window.appEnv === 'local') {
            console.log(`http://${this.template.domain}/${this.activePage.url || ''}`)
            return `http://${this.template.domain}/${this.activePage.url || ''}`
          } else {
            return `https://${this.template.domain}/${this.activePage.url || ''}`
          }
        }
        if (window.appEnv === 'development') {
          return `${window.appURL}/admin/template/item/preview/${this.template.slug}/${this.activePage.url || ''}`
        }
        return `http://${this.template.slug}.tpl.${appDomain}/${this.activePage.url || ''}`
      } else {
        LOG.error('NavBar: Template is not defined')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-navbar {
  height: 60px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.bz-dropdown-menu-container {
  width: 150px;
  border-radius: 5px;
  border: solid 1px #8080803f;
  margin-top: 7px;
  box-shadow: unset;

  .bz-dropdown-menu {
    font-size: 14px;
  }
}
</style>
