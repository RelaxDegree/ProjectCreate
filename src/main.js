// 该文件是整个项目的入口文件
import Vue from 'vue'
// 引入vue
import VueRouter from 'vue-router'
import App from './App.vue'
// 引入app组件 是所有组件的父组件
// 引入elementUI组件库
import ElementUI from 'element-ui';
// 引入elementUI的全部样式
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css';
import {store} from './store/index'
import axios from 'axios';
// 1 导入路由模块，拿到路由实例
import router from '../src/router/index.js'
import Cookie from 'js-cookie'
// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断token
  const token = Cookie.get('token')
  if(!token && to.name !== 'login') {
    next({ name: 'login'})
  } else if (token && to.name === 'login'){
    next({name: 'home'})
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')