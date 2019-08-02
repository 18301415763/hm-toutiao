import Vue from 'vue'
import App from './App.vue'
// 导入element-ui文件
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// @是一个路径的别名，是src路径，该写法在vue-cli项目下有效
// index文件是目录默认的索引文件，在没有其他文件时，默认引入index文件
// index.js  >  index.vue  >  index.json
import router from '@/router'
// 引入公共样式
import '@/styles/index.css'
// 导入axios
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(Element)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

/*
  main.js文件的职责：
    1.引入依赖的包，模块，js等等其他资源
    2.创建实例化Vue对象

*/
