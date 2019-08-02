import Vue from 'vue'
// 导入vue-router文件
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import register from '../views/register/register.vue'
import index from '../views/index/index.vue'
import welcome from '../views/welcome/welcome.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: login },
    { path: '/register', name: 'register', component: register },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        { path: '/index', component: welcome }
      ]
    }
  ]
})
export default router
