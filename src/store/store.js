// 约定好本地存储的 key
// const KEY = 'hm-toutiao'

export default {
  setUser (userData) {
    //   存储用户信息
    window.sessionStorage.setItem('hm-toutiao', JSON.stringify(userData))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem('hm-toutiao') || '{}')
  }
}
