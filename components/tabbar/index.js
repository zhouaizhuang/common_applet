// components/tabbar.js
import { redirectTo, getQrCode, navigateTo, getLocalStorage  } from "../../api"
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    selectTab: {
      type: String,
      value: 'index',
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShowLogin:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goIndex(){
      if(this.data.selectTab !== 'index') {
        redirectTo('/pages/index/index') // 常用api演示
      }
    },
    goInteractive(){
      if(this.data.selectTab !== 'interactive') {
        redirectTo('/pages/interactive/index') // 交互动效
      }
    },
    // async goQrcode(){
    //   const token = getLocalStorage('token') || ''
    //   if(!token) {
    //     return this.setData({isShowLogin:true})
    //   }
    //   const {path} = await getQrCode()
    //   navigateTo(path)
    // },
    goProblem(){
      if(this.data.selectTab !== 'problem') {
        redirectTo('/pages/problem/index')
      }
    },
  }
})
