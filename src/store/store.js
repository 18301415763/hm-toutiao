// 约定好本地存储的 key
// const KEY = 'hm-toutiao'

export default {
  setUser (userData) {
    // 获取当前用户信息
    const localUser = this.getUser()
    // 修改后的信息
    const newUserData = { ...localUser, ...userData }
    //   存储用户信息
    window.sessionStorage.setItem('hm-toutiao', JSON.stringify(newUserData))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem('hm-toutiao') || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem('hm-toutiao')
  }
}
