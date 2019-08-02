import Vue from 'vue'
// 导入vue-router文件
import VueRouter from 'vue-router'
import login from '../login/login.vue'
import register from '../register/register.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: login },
    { path: '/register', name: 'register', component: register }
  ]
})
export default router
