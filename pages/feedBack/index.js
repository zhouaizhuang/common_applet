import { hideLoading, showLoading, showActionSheet, showModal } from "../../api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowVantLoading: false, // 是否显示vantui的loading
    isShowTip: false, // 是否显示模态框
    content: '提示文字'
  },
  loading(){
    showLoading()
    setTimeout(() => {
      hideLoading()
    }, 600);
  },
  vantLoading(){
    this.setData({isShowVantLoading: true})
    setTimeout(() => {
      this.setData({isShowVantLoading:false})
    }, 1e3)
  },
  async simpleChoose(){
    showActionSheet(['男', '女']).then(({tapIndex}) => {
      console.log(`用户选择了${tapIndex}`)
    }).catch(e => {
      console.log(e)
    })
  },
  showWxModal(){
    showModal().then(e => {
      console.log('用户点击了确定')
    }).catch(e => {
      console.log('用户点击了取消')
    })
  },
  showTip(){
    this.setData({isShowTip:true})
  },
  closeTip(){
    this.setData({isShowTip:false})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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