// pages/useCanvas/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 曲线拟合
  polyLineInit(res){
    const width = res[0].width
    const height = res[0].height
    console.log(width)
    console.log(height)
    const canvas = res[0].node
    const ctx = canvas.getContext('2d')
    const dpr = wx.getSystemInfoSync().pixelRatio
    // canvas.width = width
    // canvas.height = height
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr) // 等比缩放
    // y轴
    this.drawText(ctx, '100%', 0, 20)
    this.drawText(ctx, '80%', 6, 60)
    this.drawText(ctx, '60%', 6, 100)
    this.drawText(ctx, '40%', 6, 140)
    this.drawText(ctx, '20%', 6, 180)
    this.drawText(ctx, '0%', 11, 220)
    // 横线
    this.drawLine(ctx, 40, 15, 350, 15)
    this.drawLine(ctx, 40, 55, 350, 55)
    this.drawLine(ctx, 40, 95, 350, 95)
    this.drawLine(ctx, 40, 135, 350, 135)
    this.drawLine(ctx, 40, 175, 350, 175)
    this.drawLine(ctx, 40, 215, 350, 215)
    // X轴
    this.drawText(ctx, '51岁', 40, 235)
    this.drawText(ctx, '52岁', 80, 235)
    this.drawText(ctx, '55岁', 120, 235)
    this.drawText(ctx, '58岁', 160, 235)
    this.drawText(ctx, '61岁', 200, 235)
    this.drawText(ctx, '70岁', 240, 235)
    this.drawText(ctx, '72岁', 280, 235)
    this.drawText(ctx, '75岁', 320, 235)
    // y轴： 0 ----> 220         100 ----> 20  
    // x轴： 0 ----> 50          8 ----> 300
    const healthArr = [[0, 81], [1, 80], [2, 75], [3, 73], [4, 65], [5, 65], [6, 64], [7, 63], [8, 61]]
    const disableArr = [[0, 19], [1, 22], [2, 26], [3, 29], [4, 31], [5, 32], [6, 32], [7, 33], [8, 34]]
    this.drawPath(ctx, healthArr, '#01B09A')
    this.drawPath(ctx, disableArr, '#ff0000')
  },
  drawText(ctx, text, x0, y0){
    ctx.beginPath()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 1
    ctx.strokeStyle  = '#000' // 设置圆环的颜色
    ctx.font = '12px "微软雅黑"'
    ctx.fillStyle = "#999"
    ctx.fillText(text, x0, y0)
    ctx.closePath()
  },
  // 绘制平滑路径
  drawPath(ctx, arr, color){
    ctx.beginPath()
    ctx.strokeStyle = color // 设置圆环的颜色
    const newArr = arr.map(v => {
      const [x0, y0] = v
      return [40 + 40 * x0, 220 * (100 - y0) * 0.01]
    })
    newArr.forEach((item, index) => {
      if(index == 0) {
        ctx.moveTo(...item)
      }else if(index < newArr.length - 1) {
        this.quadraticCurveTo(ctx, item[0], item[1], (item[0] + newArr[index+1][0])/2, (item[1] + newArr[index+1][1]) / 2)
      } else {
        ctx.lineTo(...item)
      }
    })
    ctx.stroke()
    ctx.closePath()
  },
  // 绘制直线
  drawLine(ctx, x0, y0, x1, y1){
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = '#eee'; // 设置圆环的颜色
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.stroke()
    ctx.closePath()
  },
  // 平滑拟合
  quadraticCurveTo(ctx, cpx, cpy, x, y){
    ctx.quadraticCurveTo(cpx, cpy, x, y);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.createSelectorQuery().select('#polyLine').fields({ node: true,size: true }).exec(this.polyLineInit.bind(this))
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})