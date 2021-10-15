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
    console.log(e)
    const { iv, encryptedData } = e.detail
    console.log(iv)
    wx.login({
      success: res => {
        const { code } = res 
        // code用于获取用户的openID和sessionKey
        // 后台根据参数【encryptedData】 、【iv】 、【sessionKey】解密获取用户手机号
        console.log(iv, encryptedData, code)
        
      }
    })
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