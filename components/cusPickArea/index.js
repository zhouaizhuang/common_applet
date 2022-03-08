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
    region: ['江苏省', '常州市', '新北区'],
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindRegionChange(e){
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      const region = e.detail.value
      this.setData({ region })
      const { _id } = this.data.formInfo
      this.triggerEvent('changeValue', {value:region.join(','), _id})
    }
  }
})
