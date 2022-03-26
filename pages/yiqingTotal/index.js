// pages/yiqingTotal/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    count:{}, // 统计各个风险的数量
    dateline:{}, // 截止日期
    highDangerArea: [], // 高风险地区
    middleDangerArea: [], // 高风险地区
  },
  getYQdata: function () {
    //抓取的这个网页的数据：https://vt.sm.cn/api/NCoVInfo/riskArea#/risk-areas
    var data = {      
      method: "Huoshenshan.riskArea",
      format: "json",
      // _:'1635407552057',
      // callback:axiosJsonpCallback1
    };
    var url = 'https://m.sm.cn/api/rest?';
    wx.request({
      type: "get",
      dataType: 'jsonp',
      data: data,
      jsonp: "callback",
      jsonpCallback: "axiosJsonpCallback1",
      url: url,
      success: res => {
        const info =  JSON.parse(res.data)
        if(info.status == 0) {
          let { count, dateline, map } = info.data || {}
          const middleDangerNameArr = Object.keys(map[1] || {}) // 中风险地区名字
          const highDangerNameArr = Object.keys(map[2] || {}) // 高风险地区名字
          const middleDangerArea = middleDangerNameArr.map(item => ({ label: item, list: map[1][item] || [] })) // 中风险地区数据
          const highDangerArea = highDangerNameArr.map(item => ({ label: item, list: map[2][item] || [] })) // 搞风险地区数据
          this.setData({count, dateline, highDangerArea, middleDangerArea})
        }
      },
      fail: function (res) {
        console.log(res)
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getYQdata()
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