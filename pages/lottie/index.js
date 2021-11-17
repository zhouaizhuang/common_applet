// pages/lottie/index.js
import lottie from 'lottie-miniprogram'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    wx.createSelectorQuery().in(this).select('#canvas').node(res => {
      const canvas = res.node
      const context = canvas.getContext('2d')
      canvas.width = 200
      canvas.height = 200
      lottie.setup(canvas)
      lottie.loadAnimation({
        loop: true,
        autoplay: true,
        animationData: require('./lottie.js'),
        rendererSettings: {
          context,
        },
      })
    }).exec()
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