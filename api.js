import { BaseHost } from "./utils/network.js"
/* 小程序公用js代码 */
// 获取微信信息
export const getUserProfile = function (options = {}) {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      lang: 'zh_CN',
      ...options,
      success: res => resolve(res.userInfo),
      fail: err => reject(err)
    })
  })
}
// 显示loading
export const showLoading = function (title = '加载中', duration = 0, mask = true) {
  wx.showLoading({ title, mask})
  if(duration) { hideLoading(duration) }
}
// 关闭loading
export const hideLoading = (time = 0) => setTimeout(() => { wx.hideLoading() }, time)
// 显示操作菜单
export const showActionSheet = function (itemList) {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({
      itemList,
      success: res => resolve(res),
      fail: res => reject(res)
    })
  })
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
// 模态框封装
export const showModal = (title = '标题', content = '这是一个模态弹窗') => {
  if(title) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title,
        content,
        success (res) {
          if (res.confirm) {
            resolve()
          } else if (res.cancel) {
            reject('用户点击了取消')
          }
        },
        fail: err => reject(err)
      })
    })
  }
}
// 页面跳转(可返回上一个页面)
export const navigateTo = function (url = '', time = 0) {
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
export const navigateBack = function (delta = 1, time = 0) {
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
// 返回前N页，并执行返回后的页面中onload方法
export const goBack = function (delta = 1){
  return new Promise((resolve, reject) => {
    wx.navigateBack({
      delta,
      success: res => {
        var page = getCurrentPages().pop()
        if (page == undefined || page == null) { return }
        page.onLoad();
        resolve(res)
      },
      fail: err => reject(err)
    })
  })
}
// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面（不可返回）
export const switchTab = function (url = '', time = 0){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.switchTab({
        url,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 关闭当前页面，跳转到应用内的某个页面（不可返回, 不可以跳转到tabbar页面）
export const redirectTo = function (url = '', time = 0){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.redirectTo({
        url,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 关闭当前页面，跳转到应用内的某个页面（不可返回, 不可以跳转到tabbar页面）
export const reLaunch = function (url = '', time = 0){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.reLaunch({
        url,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 跳转小程序
export const navigateToMiniProgram = function (params = {}){
  return new Promise((resolve, reject) => {
    wx.navigateToMiniProgram({
      appId: '', // 要打开的小程序 appId
      path: 'pages/index/index', // 打开的页面路径，如果为空则打开首页
      extraData: '', // 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据
      envVersion: 'develop', // trial | release 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
      shortLink: '', // 小程序链接，当传递该参数后，可以不传 appId 和 path。链接可以通过【小程序菜单】->【复制链接】获取。
      ...params,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 跳转之后，返回原小程序
export const navigateBackMiniProgram = function (extraData = {}){
  return new Promise((resolve, reject) => {
    wx.navigateBackMiniProgram({
      extraData, //  举例：{foo: 'bar'}
      success: res=> resolve(res),
      fail: err => reject(err)
    })
  })
}
export const exitMiniProgram = function (){
  return new Promise((resolve, reject) => {
    wx.exitMiniProgram({
      success: res=> resolve(res),
      fail: err => reject(err)
    })
  })
}
// 设置当前页面的标题
export const setPageTitle = function (title = '') {
  return new Promise((resolve, reject) => {
    wx.setNavigationBarTitle({
      title,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 设置当前导航条风格
export const setNavigationBarColor = function (frontColor,backgroundColor, animation = {} ) {
  return new Promise((resolve, reject) => {
    wx.setNavigationBarColor({
      frontColor, // 文字颜色
      backgroundColor, // 导航条背景
      animation, // 动画时间、动画函数。举例子： {  duration: 400, timingFunc: 'easeIn'}
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 滚动到页面什么位置
export const pageScrollTo = function (scrollTop, duration) {
  wx.pageScrollTo({
    scrollTop, // 滚动到什么位置： 0代表页面顶部
    duration // 滚动执行耗时多少ms
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
// 设置localstorage
export const setLocalStorage = (key = '', val = '') => wx.setStorageSync(key, val)
// 查看localstorage
export const getLocalStorage = (key = '') => wx.getStorageSync(key)
// 清除localstorage某个字段
export const removeLocalstorage = (key = '') => wx.removeStorageSync(key)
// 清除localStorage
export const clearLocalStorage = () => wx.clearStorageSync()
/*****************图片相关api*************** */
// 获取图片信息
/**
 * 
 * @param {*} src // 注意： 需要在小程序后台配置download图片合法域名，否则无法使用
 * @returns {promise}
 */
export const getImageInfo = function (src){
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src, // 图片路径
      success: res => resolve(res), // {errMsg: "getImageInfo:ok",height: 66,orientation: "up",path: "http://tmp/rp35Y5PWoonk2ca2d1abcb9a7c0283e56df60f891ab4.png",type: "png",width: 62}
      fail: err => reject(err)
    });
  })
}
/** 保存图片到相册
 * @param {*} filePath // 小程序需要https图片文件路径，可以是临时文件路径或者永久文件路径（本地路径）。如果是网络图片，需要先使用getImageInfo获取临时路径
 * @returns {promise}
 */
export const saveImg2Album = function (filePath) {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      filePath: filePath.replace('http:', 'https:'), // 小程序需要https图片文件路径，可以是临时文件路径或者永久文件路径（本地路径）
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
/**预览图片和视频
 * https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewMedia.html
 * @param {*} sources // [{url:'http://tmp/rp35Y5PWoonk2ca2d1abcb9a7c0283e56df60f891ab4.png'}]
 * @returns 
 */
export const previewMedia = function (params = {}){
  return new Promise((resolve, reject) => {
    wx.previewMedia({
      sources: [],
      current: 0,
      showmenu: false,
      ...params,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
/** 预览图片
 * https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewImage.html
 * @param {*} params 
 * @returns 
 */
export const previewImage = function (params = {}){
  return new Promise((resolve, reject) => {
    wx.previewImage({
      urls: [],
      showmenu: false,
      current: '',
      ...params,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
/**拨打电话
 * @param {*} phoneNumber // 电话号码
 * @returns 
 */
export const makePhoneCall = function (phoneNumber){
  return new Promise((resolve, reject) => {
    wx.makePhoneCall({
      phoneNumber: String(phoneNumber),
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 调用地图导航
export const openLocation = function(params = {}){
  const {latitude, longitude } = params
  return new Promise((resolve, reject) => {
    wx.openLocation({
      ...params,
      // name,
      // address,
      scale: 18,
      latitude: Number(latitude),
      longitude: Number(longitude),
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 配置全局分享。根据不同的项目需要从不同的接口获取
/**
 * 配置全局分享。根据不同的项目需要从不同的接口获取
 * 注意分享出去的页面。比如说首页，那么首页必须手动重写分享
 * 参考一潞有你小程序
 */
export const overShare = async function () { // https://www.cnblogs.com/mlzs/p/10894777.html
  try{
    const { share_title, share_cover } = await post('/miniapp/common/get-share-config')
    const { id = '' } = getLocalStorage('userInfo') || {}
    const path = `/pages/index/index?inviter_id=${id}`
    const shareInfo = { title: share_title, imageUrl: share_cover, path }
    setLocalStorage('shareInfo', shareInfo)
    
    //监听路由切换、间接实现全局设置分享内容。(!!!!!!备注：用户默认进入index页面。此时页面栈为[]，无法设置分享，因此index页面需要取值shareInfo自定义分享)
    wx.onAppRoute(res => {
      //获取加载的页面
      let pages = getCurrentPages()
      let view = pages[pages.length - 1]
      let data = view.data
      if (view) {
        // console.log('是否重写分享方法', data.isOverShare);
        if(!data.isOverShare) {
          data.isOverShare = true;
          view.onShareAppMessage = function () {
            return shareInfo //你的分享配置
          }
        }
      }
    })
  } catch(e) {
    console.log(e)
  }
}
// 选择图片
export const chooseImage = function (params){
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 2,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => resolve(res),
      fail: err => reject(err),
      ...params
    })
  })
}
// 上传图片
export const uploadFile = function (params = {}){
  const localToken = getLocalStorage('token') || '' // 本地的token
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${BaseHost}/miniapp/common/upload-img`,
      name: 'image',
      filePath: '',
      header: {
        "Content-Type": "multipart/form-data",
        "Authorization": 'Bearer ' + localToken
      },
      formData: {},
      success: res => {
        const newRes = JSON.parse(res.data)
        resolve(newRes.data)
      },
      fail: err => reject(err),
      ...params
    })
  })
}
// 获取页面。传0代表当前页面，传-1代表上一页
export const getPage = function (index = 0){
  const pages = getCurrentPages(); // 获取页面栈
  return pages[pages.length - 1 - index]
}
// 订阅消息
export const requestSubscribeMessage = function (params = {}){
  return new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds: [''],
      ...params,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 查看文档
export const openDocument = function (params = {}){
  const { filePath, ...rest } = params
  return new Promise((resolve, reject) => {
    try{
      wx.downloadFile({
        url: filePath,
        success: function (res) {
          // showToast(res.tempFilePath)
          wx.openDocument({
            filePath: res.tempFilePath,
            showMenu: false,
            fileType: 'pdf',
            ...rest,
            success: res => resolve(res),
            fail: err => reject(err)
          })
        },
        fail: err => reject(err)
      })
    } catch(e) {
      showToast(e)
    }
  })
}