// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import ElementUI from 'element-ui'
import elementLocale from 'element-ui/lib/locale/lang/en'
import NProgress from 'nprogress'

import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-default/index.css'
import 'nprogress/nprogress.css'

import Mock from './api/mock'
Mock.bootstrap()

Vue.config.productionTip = false

Vue.use(ElementUI, {locale: elementLocale})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
