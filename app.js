// app.js
import {checkUpdateVersion} from "./api"
App({
  onLaunch() {
    checkUpdateVersion()
  },
  globalData: {
    userInfo: null
  }
})


// https://www.muyu007.cn/Home/Service/details/nid/308/cid/41.html
// 小程序分享图片宽高比5:4  并且大小不要超过2M。这样不会变形且能显示出比较好的效果