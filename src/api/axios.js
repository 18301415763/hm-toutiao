import axios from 'axios'
import store from '../store/store'
import JSONBIG from 'json-bigint'
// 配置默认项
// 路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求头
// axios.defaults.headers = {
//   Authorization: 'Bearer ' + store.getUser().token
// }

/*
    【添加请求拦截器】
axios.interceptors.request.use(function (config) {
    在发送请求之前做些什么
    return config;
  }, function (error) {
    对请求错误做些什么
    return Promise.reject(error);
  });
*/
axios.interceptors.request.use(function (config) {
  // 在请求之前把token信息给了请求头,所以需要修改 config
  // console.log(config)
  config.headers.Authorization = 'Bearer ' + store.getUser().token
  // console.log(store.getUser())
  return config
}, function (error) {
  return Promise.reject(error)
})
// 移出拦截器
// axios.interceptors.request.eject(myInterceptor);
/*
    【添加响应拦截器】
axios.interceptors.response.use(function (response) {
    对响应数据做点什么
    return response;
  }, function (error) {
    对响应错误做点什么
    return Promise.reject(error);
  });
*/
axios.interceptors.response.use(function (response) {
  // console.log(response)

  return response
}, function (error) {
  // 由于后台保存token不是永久的,所以当token失效时,监听所由接口的响应状态是不是401,如果是就重新登录
  // console.log(error.response)
  if (error.response.status === '401') {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

// axios默认的JSON.parse不能转换数字最大安全值,需要使用第三方包 JOSN-Bigint
// 在响应给then或catch前把数据转换成JSON对象
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONBIG.parse(data)
  } catch (error) {
    return data
  }
}]

export default axios
