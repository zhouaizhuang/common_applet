import { navigateTo } from "../../api"
// components/cusVillage/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    village: {
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
      this.triggerEvent('changeValue', {value:this.data.village.name, _id})
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
    goSelectVillage(){
      navigateTo(`../selectVillage/index?villageId=${this.data.village.id || ''}`)
    },
  }
})
