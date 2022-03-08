import { showActionSheet } from "../../api"
import { repeat } from "../../common"
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
  attached(){
    let { options, defaultValue } = this.data.formInfo
    let index = options.indexOf(defaultValue)
    index = index < 0 ? 0 : index
    this.setData({index})
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
    changeField(e){
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      const index = e.detail.value
      this.setData({index})
      const { _id, options} = this.data.formInfo
      this.triggerEvent('changeValue', {value: options[index], _id})
    },
  }
})
