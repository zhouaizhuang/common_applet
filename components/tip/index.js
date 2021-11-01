// components/tips.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isShowTip: {
      type: Boolean,
      value: false,
    },
    content: {
      type: String,
      value: '您已填报为志愿者，无法重复填报党员信息哦~',
    },
    sureMsg: {
      type: String,
      value: '我已知晓',
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    catchTap(){},
    closeTip(){
      this.triggerEvent('closeTip');
    },
    confirm(){
      this.triggerEvent('closeTip');
    },
  }
})
