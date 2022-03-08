import { chooseImage, uploadFile, previewImage } from "../../api"
import { dateFormater, showToast, guID } from "../../common"
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
    if(defaultValue) {
      let uploadArrRes = defaultValue.split(',').filter(Boolean).map(v => ({url: v}))
      this.setData({uploadArrRes})
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    uploadArrRes:[]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    previewItem(){
      const {uploadArrRes} = this.data
      const urls = uploadArrRes.map(v => v.url)
      previewImage({urls, current: urls[0]})
    },
    async selectImg(){
      // const count = 2 - this.data.uploadArrRes.length
      // if(count <= 0) { return showToast('最多只能上传两张图片') }
      const imgObj = await chooseImage({count:1})
      const uploads = imgObj.tempFilePaths.map(item => uploadFile({filePath: item}))
      let uploadArrRes = await Promise.all(uploads)
      uploadArrRes = [...this.data.uploadArrRes, ...uploadArrRes]
      this.setData({ uploadArrRes })
      this.changeField(uploadArrRes)
    },
    delIdentity(e){
      const { url } = e.currentTarget.dataset
      const uploadArrRes = this.data.uploadArrRes.filter(v => v.url !== url)
      this.setData({uploadArrRes})
      this.changeField(uploadArrRes)
    },
    changeField(uploadArrRes){
      const value = uploadArrRes.reduce((prev, item) => prev + item.url, '')
      const { _id } = this.data.formInfo
      this.triggerEvent('changeValue', {value, _id})
    },
  }
})
