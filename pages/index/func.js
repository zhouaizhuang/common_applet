import { navigateTo, navigateToMiniProgram, makePhoneCall, prevewImage, showToast } from "../../api"
import { toString } from "../../common.js"
export const goUserInfo = function (){
  navigateTo('../userInfo/index')
}
export const goOtherApplet = function (){
  navigateToMiniProgram({appId: 'wx26e3647f5b46bf93'})
}
export const goFeedBack = function (){
  navigateTo('../feedBack/index')
}
export const previewImg = async function (){
  previewImage({
    urls:['https://upload.qianfanyun.com/yjyn/ylyn_index_bg_03.png', 'https://upload.qianfanyun.com/yjyn/ylyn_hat.png'],
    showmenu: true, // 是否显示长按菜单
    current: 'https://upload.qianfanyun.com/yjyn/ylyn_hat.png', // 设置默认显示的图片为第二张图片链接
  })
}
export const callPhone = function (){
  makePhoneCall('0523-83234302')
}
// 扫码
export const scanCode = function () {
  wx.scanCode({
    success (res) {
      showToast(JSON.stringify(res.result))
    }
  })
}