/* 小程序公用js代码 */
// 显示loading
export const showLoading = function (title = '加载中', duration = 0, mask = true) {
  wx.showLoading({ title, mask})
  if(duration) {
    hideLoading(duration)
  }
}
// 关闭loading
export const hideLoading = function (time = 0) {
  setTimeout(() => { wx.hideLoading() }, time)
}
// 显示提示弹框
export const showToast = (title, delay = 0, duration = 3000, icon='none') => {
  if(title) {
    setTimeout(() => {
      wx.showToast({ title: String(title), icon, duration})
      setTimeout(() => wx.hideToast(),duration)
    }, delay)
  }
}
// 页面跳转
export const go = function (url = '', time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.navigateTo({
        url,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 返回页面栈前面N页, 延时time毫秒执行, 返回promise对象
export const goBack = function (delta = 1, time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.navigateBack({
        delta,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 设置当前页面的标题
export const setPageTitle = function (title = '') {
  return new Promise((resolve, reject) => {
    wx.setNavigationBarTitle({
      title,
      success: res => { resolve(res) },
      fail: err => { reject(err) }
    })
  })
}
