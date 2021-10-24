// index.js
// 获取应用实例
const app = getApp()
import { navigateTo, navigateToMiniProgram, showLoading, previewImage } from "../../api"
Page({
  data: {
  },
  goUserInfo(){
    navigateTo('../userInfo/index')
  },
  goOtherApplet(){
    navigateToMiniProgram({appId: 'wx26e3647f5b46bf93'})
  },
  test(){
    previewImage({urls:['http://tmp/rp35Y5PWoonk2ca2d1abcb9a7c0283e56df60f891ab4.png']})
  },
  async onLoad() {
  }
})
