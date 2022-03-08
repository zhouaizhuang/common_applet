import { guID } from "../../common"

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
    options = options.map(v => {
      return {
        id: guID(),
        isChecked: defaultValue.includes(v),
        name: v
      }
    })
    // console.log(options)
    this.setData({options})
  },
  /**
   * 组件的初始数据
   */
  data: {
    options:[],
    isShowCheckBox:false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    catchTask(){}, // 阻止时间冒泡
    showCheckBox(){
      this.setData({isShowCheckBox: true})
    },
    onClose(){
      this.setData({isShowCheckBox: false})
    },
    changeField(e){
      const { item } = e.currentTarget.dataset // 当前点击的条目的ID
      let { _id } = this.data.formInfo
      let { options } = this.data
      options = options.map(v => {
        if(v.id == item.id) { v.isChecked = !v.isChecked }
        return v
      })
      this.setData({options})
      let defaultValue = options.reduce((prev, item) => item.isChecked ? [...prev, item.name] : prev, []).join(',')
      this.triggerEvent('changeValue', {value:defaultValue, _id})
    },
  }
})
