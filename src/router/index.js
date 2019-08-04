import Vue from 'vue'
// 导入vue-router文件
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'
import welcome from '../views/welcome/welcome.vue'
import Article from '../views/article/article.vue'
import NotFound from '../views/404/404.vue'
import Images from '../views/images/image.vue'
import Publish from '../views/publish/publish.vue'
import Comments from '../views/comment/comment.vue'
import Fans from '../views/fans/fans.vue'
import Setting from '../views/setting/setting.vue'
import store from '../store/store'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: login },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        { path: '/index', component: welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/images', name: 'image', component: Images },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/comment', name: 'comment', component: Comments },
        { path: '/fans', name: 'fans', component: Fans },
        { path: '/setting', name: 'setting', component: Setting }
      ]
    },
    // 路径通配符：*
    { path: '*', name: '404', component: NotFound }
  ]
})
// 设置导航守卫 判断sessionStorage是否存储了用户信息
// 若存储了用户信息,放行
// 若没有,则无论进入那个页面都会跳到登录页
/*
  router.beforeEach(to,from,next){}
  to：要进入的路由对象
  from：从那个路由对象来
  next()：接下来去哪个地址
*/
router.beforeEach((to, from, next) => {
  // 如果是去登录页,则不需要判断,直接进行下一个
  if (to.path === '/login') {
    return next()
  }
  // 如果没有用户信息,直接跳到登录页
  if (!store.getUser().token) {
    return next('/login')
  }
  // if (to.path !== '/login' && !store.getUser().token) {
  //   return next('/login')
  // }
  next()
})
export default router
