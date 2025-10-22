import { describe, it, expect } from 'vitest'
import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import { PiniaVuePlugin, createPinia } from 'pinia'
import ProductDisplay from '@/components/ProductDisplay.vue'

const localVue = createLocalVue()
localVue.use(PiniaVuePlugin)

function mountWithPinia() {
  const pinia = createPinia()
  return mount(ProductDisplay as any, { localVue, pinia })
}

describe('ProductDisplay', () => {
  it('renders and shows Next product button', () => {
    const wrapper = mountWithPinia()
    expect(wrapper.text()).toContain('Next product')
  })
})
