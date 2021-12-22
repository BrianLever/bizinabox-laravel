import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import EditPage from '../section-builder/components/EditPage.vue'
import { store } from '../section-builder/store'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ExampleComponent', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(EditPage, { store, localVue })
    expect(wrapper.isVueInstance).toBeTruthy()
  })
})
