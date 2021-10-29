// 分享海报，绘制方式：https://www.cnblogs.com/makergyt/p/13227364.html

import Poster from 'poster.js';
Page({
  data: {
    shareShow: false
  },
  toShare: function(e) {
    this.setData({
      shareShow: true
    })
  },
  toMoments: function () {
    this.setData({
      palette: new Poster().palette()
    })
  },
})