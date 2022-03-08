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
    date: dateFormater('YYYY-MM-DD'),
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeField(e){
      console.log('picker发送选择改变，携带值为', e.detail.value)
      const date = e.detail.value
      const { _id } = this.data.formInfo
      this.setData({ date })
      this.triggerEvent('changeValue', {value:date, _id})
    },
  }
})
