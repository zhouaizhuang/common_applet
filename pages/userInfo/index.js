// pages/userInfo/index.js
import { getUserProfile } from "../../api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '', // 用户信息
    canIUse: wx.canIUse('button.open-type.getUserInfo'), // 当前环境是否可以使用wx.getuserInfo
    canIUseGetUserProfile: false, // 当前环境是否可以使用wx.getUserProfile。默认是false
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    code: '',
  },
  async getUserData(){
    const userInfo = await getUserProfile()
    this.setData({userInfo})
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({ userInfo: e.detail.userInfo })
  },
  // 目前该接口针对非个人开发者
  // https://blog.csdn.net/chen_pan_pan/article/details/80606658
  getPhoneNumber (e) {
    // 需要这5个值：code, iv, encryptedData, avatar、nickName都传给后端。肯定能注册成功的了
    const { iv, encryptedData } = e.detail // 用于解析手机号
    const { code } = this.data // 用于解析openid
    const { avatar, nickName } = this.data.userInfo// 如果后台还需要存储用户的头像和微信昵称，那么在用户信息授权的时候把这两个值avatar、nickName保存。
    // await post('xxxx', { code, iv, encryptedData, avatar,nickName })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true // 检测成功，则置为true
      })
    }
    // 必须在页面一开始先获取code. 因为微信有个bug就是。放在获取code的回调用调用解密手机号接口。概率失败
    // https://developers.weixin.qq.com/community/develop/doc/000466ea294fe0c50266ac5b15b800
    const token = getLocalStorage('token') || ''
    if(!token) {
      wx.login({
        success: res => {
          this.setData({code: res.code})
        },
        fail: err => {
          showToast('获取微信code失败' + err)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})