/* 小程序公用js代码 */
// 获取微信信息
export const getUserProfile = function () {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      lang: 'zh_CN',
      success: res => resolve(res.userInfo),
      fail: err => reject(err)
    })
  })
}
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
// 获取用户当前的权限有哪些
// 返回结果，事例：{scope.address: true, scope.invoice: true, scope.invoiceTitle: true ,scope.userInfo: true}
export const getSetting = function (){
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => resolve(res.authSetting),
      fail: err => reject(err)
    })
  })
}
// 检查更新
// 使用方法: 在app.js的onlaunch中直接调用这个方法
export const checkUpdateVersion = function () {
  if (wx.canIUse('getUpdateManager')) { //判断微信版本是否 兼容小程序更新机制API的使用
    const updateManager = wx.getUpdateManager() //创建 UpdateManager 实例
    updateManager.onCheckForUpdate(function(res) { //检测版本更新
      if (res.hasUpdate) { // 请求完新版本信息的回调
        updateManager.onUpdateReady(function() { //监听小程序有版本更新事件
          wx.showModal({ //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: res => { if (res.confirm) { updateManager.applyUpdate() } } // 调用 applyUpdate 应用新版本并重启
          })
        })
        updateManager.onUpdateFailed(function() {
          wx.showModal({ // 新版本下载失败
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
          })
        })
      }
    })
  } else {
    wx.showModal({ //TODO 此时微信版本太低（一般而言版本都是支持的）
      title: '溫馨提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}

