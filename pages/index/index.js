// index.js
// 获取应用实例
const app = getApp()
import { navigateTo, navigateToMiniProgram } from "../../api"
Page({
  data: {
  },
  goUserInfo(){
    navigateTo('../userInfo/index')
  },
  goOtherApplet(){
    navigateToMiniProgram({appId: 'wx26e3647f5b46bf93'})
  },
  async onLoad() {
  }
})
