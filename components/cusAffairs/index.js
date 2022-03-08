import { navigateTo } from "../../api"

// components/cusAffairs/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    serviceItem: {
      type: Object,
      value: {},
    },
    formInfo: {
      type: Object,
      value: {},
    },
    type: {
      type: String,
      value:''
    }
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      // console.log(this.data.village)
      const { _id } = this.data.formInfo
      this.triggerEvent('changeValue', {value:this.data.serviceItem.name, _id})
    },
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
    goSelectService(){
      let id = ''
      const {serviceItem} = this.data
      if(serviceItem.id) {
        id = serviceItem.id
      }
      navigateTo(`/pages/selectService/index?id=${id}`)
    },
  }
})
