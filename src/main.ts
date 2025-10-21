import Vue from 'vue'
import App from './App.vue'
import './assets/style/page.css'
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.config.productionTip = false

// Vue 2 + Pinia setup
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  pinia,
  render: h => h(App),
}).$mount('#app')
