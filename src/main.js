import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import bootstrap from './core/bootstrap'
// import './mock'
import './core/use'
import './permission'
import './utils/filter'
import './assets/style/index.styl'

Vue.config.productionTip = false
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: bootstrap,
  render: (h) => h(App)
}).$mount('#app')
