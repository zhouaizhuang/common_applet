// index.js
// 获取应用实例
const app = getApp()
import { navigateTo, navigateToMiniProgram, makePhoneCall, previewImage } from "../../api"
Page({
  data: {
  },
  goUserInfo(){
    navigateTo('../userInfo/index')
  },
  goOtherApplet(){
    navigateToMiniProgram({appId: 'wx26e3647f5b46bf93'})
  },
  goFeedBack(){
    navigateTo('../feedBack/index')
  },
  async previewImg(){
    previewImage({
      urls:['https://upload.qianfanyun.com/yjyn/ylyn_index_bg_03.png', 'https://upload.qianfanyun.com/yjyn/ylyn_hat.png'],
      showmenu: true, // 是否显示长按菜单
      current: 'https://upload.qianfanyun.com/yjyn/ylyn_hat.png', // 设置默认显示的图片为第二张图片链接
    })
  },
  callPhone(){
    makePhoneCall('0523-83234302')
  },
  async onLoad() {
  }
})
