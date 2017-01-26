import Vue from 'vue'
import VueMaterial from 'vue-material'
// import Vuex from 'vuex'
import App from './App.vue'
import Router from './routes.js'

import VueResource from 'vue-resource'

Vue.use(VueMaterial)
Vue.use(VueResource)
// Vue.use(Vuex)
Vue.http.options.root = 'http://localhost:8000'

Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'yellow',
  warn: 'red',
  background: 'white'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: Router
})
