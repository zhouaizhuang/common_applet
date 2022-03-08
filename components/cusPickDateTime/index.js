import { dateFormater } from "../../common"

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    formInfo: {
      type: Object,
      value: {},
    },
    type: {
      type: String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowMask: false,
    minHour: 10,
    maxHour: 20,
    minDate: new Date(1970, 10, 1).getTime(),
    maxDate: new Date(2050, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    dateTimeObj:{
      isShow: false,
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    closeMask(){
      this.setData({['dateTimeObj.isShow']:false,isShowMask:false})
    },
    showDateTimePick(){
      this.setData({['dateTimeObj.isShow']:true, isShowMask:true})
    },
    changeField(e){
      console.log('picker发送选择改变，携带值为', e.detail)
      const dateTime = dateFormater('YYYY-MM-DD hh:mm', e.detail)
      const { _id } = this.data.formInfo
      this.triggerEvent('changeValue', {value:dateTime, _id})
      this.closeMask()
    },
  }
})
