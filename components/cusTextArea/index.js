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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputTextArea(e){
      const { value } = e.detail
      const { _id } = this.data.formInfo
      this.triggerEvent('changeValue', {value, _id})
    },
  }
})
