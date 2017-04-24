import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'
import iView from 'iview'

import 'iview/dist/styles/iview.css'

import App from './App'
import routes from './routes'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(VueRouter)
Vue.use(iView)

Vue.config.debug = true

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
