import { getLocalStorage, setLocalStorage, setPageTitle, navigateTo } from '../../api'
import { isIdentity, isPhoneNum, isEmail, guID } from '../../common'
import { post } from '../../utils/network'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'
 let cusForm = [
  {
    id: 1,
    name: '基本信息',
    child: [
      {
        created_at: "2022-03-04 11:17:52", // 字段创建时间
        defaultValue: "", // 参数的值(必须)
        description: "", // 描述信息
        field: "xingming", // 字段名(必须)
        group: "基本信息", // 所属大类
        id: 803, // 字段id
        name: "姓名", // 字段中文名(必须)
        options: [], // 如果是select这种筛选的话，那么筛选项(必须)
        required: 1, // 是否必填(必须)
        sort: 803, // 排序字段
        template_id: "2936537852827140983", // 模板id
        type: "text", // 表单类型(必须)
        validate: "", // 校验类型。空：不校验，有则按照规则校验(必须)
      },
      { created_at: "2022-03-04 11:17:52", defaultValue: "",description: "", field: "xingbie", group: "基本信息", id: 804, name: "性别", options: ["男", "女"], required: 1, sort: 804, template_id: "2936537852827140983", type: "radio", validate: "",  },
      { created_at: "2022-03-04 11:17:52", defaultValue: "", description: "", field: "chushengnianyue", group: "基本信息", id: 805, name: "出生年月", options: [], required: 1, sort: 805, template_id: "2936537852827140983", type: "date", validate: "", },
      { defaultValue: "", field: "live_area", name: "居住地区", required: 1, type: "area", validate: "" },
      { defaultValue: "", field: "my_intro", name: "自我介绍", required: 1, type: "textarea", validate: "" },
      { defaultValue: "", field: "detail_time", name: "具体时间", required: 1, type: "datetime", validate: "" },
      { defaultValue: "", field: "selec_like", name: "选择擅长", required: 1, options: ['擅长1', '擅长2', '擅长3'], type: "select", validate: "" },
      { defaultValue: "", field: "identity", name: "身份证号", required: 1, type: "person", validate: "" },
      // { defaultValue: "", field: "village", name: "选择小区", required: 1, type: "village", validate: "" }, // 这个需要当前页面增加适配的
      // { defaultValue: "", field: "affairs", name: "事务", required: 1, type: "affairs", validate: "" }, // 这个需要当前页面增加适配的
      { defaultValue: "", field: "img", name: "上传证件", required: 0, type: "image", validate: "" },
    ]
  }
]
// 对数据进行加工
cusForm = cusForm.map(item => {
  item._id = guID()
  item.child = item.child.map(v => { v._id = guID(); return v })
  return item
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    enableSave: true, // 是否允许提交
    cusForm, // 自定义表单格式
  },
  // 表单改变数据之后，变更数据
  changeValue(e) {
    const { value, _id } = e.detail
    let cusForm = this.data.cusForm.map(item => {
      item.child = item.child.map(v => {
        if (v._id === _id) { v.defaultValue = value }
        return v
      })
      return item
    })
    this.setData({ cusForm })
  },
  // 检查表单数据是否正确
  checkForm() {
    let msg = ''
    let { cusForm } = this.data
    for (let item of cusForm) {
      for (let v of item.child) {
        const { type, name, required, defaultValue, validate } = v
        if (required && !defaultValue) {
          msg = `${name}为必填项`
        } else if (type == 'person' && defaultValue && !isIdentity(defaultValue)) {
          msg = `请输入正确的身份证号码`
        } else if (type == 'text' && defaultValue) {
          if (validate) {
            const mapFunc = {
              email: isEmail,
              mobile: isPhoneNum,
              idcard: isIdentity,
              number: val => /^[0-9]*$/.test(val)
            }
            const func = mapFunc[validate] ||function () { return true }
            if (!func(defaultValue)) { msg = `请输入正确的${name}` }
          }
        }
        if (msg) { return msg }
      }
    }
    return msg
  },
  // 保存表单
  async saveForm() {
    let { cusForm } = this.data
    // 参数校验
    const message = this.checkForm()
    if (message) { return Notify({ type: 'danger', message }) }
    // 整理字段
    const content = cusForm.reduce((prev, item) => {
      item.child.forEach(v => (prev[v.field] = v.defaultValue))
      return prev
    }, {})
    // 禁止点击（防止重复点击）
    if (!this.data.enableSave) { return false }
    this.setData({ enableSave: false })
    // 开始请求
    const res = await post('/miniapp/affairs/submit', {
      affairs_id: this.data.options.id,
      content: JSON.stringify(content),
    })
    // 允许点击
    this.setData({ enableSave: true })
    if (res) { return Notify({ type: 'success', message: '保存成功' }) }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options // 传入表单的id。真实项目，是需要根据这个id到后台查出对应的cusForm数据的
    this.setData({options})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
