// pages/dynmaicForm/index.js
import { wait, adjust, guID } from "../../common.js"
import * as func from "./func.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEdit: false,
    currentQuestion: 0, // 当前开启的题号
    scrollTop: 0, // 滚动距离
    clearTimeId: null,
    formList: [
      {
        options: [],
        field: "gender", // 字段名(必须)
        label: "您的性别？", // 字段中文名(必须)
        defaultValue: "", // 参数的值(必须)
        showValue:'', // 用于展示给用户看的数据
        index: -1, // 默认值的所在index
        id: guID(), // 字段id
        type: "gender", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: new Array(120).fill(10).map((v, i) => v + i),
        field: "age", // 字段名(必须)
        unit:'岁',
        label: "您的年龄？", // 字段中文名(必须)
        defaultValue: '26', // 参数的值(必须)
        showValue:'26岁', // 用于展示给用户看的数据
        index: 16, // 默认值的所在index
        id: guID(), // 字段id
        type: "select", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: new Array(100).fill(100).map((v, i) => v + i),
        field: "height", // 字段名(必须)
        unit:'cm',
        label: "您的身高？", // 字段中文名(必须)
        defaultValue: '170', // 参数的值(必须)
        showValue: '170cm', // 用于展示给用户看的数据
        index: 70, // 默认值的所在index
        id: guID(), // 字段id
        type: "select", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [
          {
            values: new Array(100).fill(40).map((v, i) => v + i),
            defaultIndex: 25,
          },
          {
            values: new Array(10).fill(0).map((v, i) => v + i),
            defaultIndex: 0
          }
        ],
        split:'.',
        unit:'kg',
        field: "weight", // 字段名(必须)
        label: "您的体重？", // 字段中文名(必须)
        defaultValue: "65.0", // 参数的值(必须)
        showValue:'65.0kg', // 用于展示给用户看的数据
        index: -1, // 默认值的所在index
        id: guID(), // 字段id
        type: "floatSelect", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: new Array(100).fill(100).map((v, i) => v + i),
        field: "waist", // 字段名(必须)
        unit:'cm',
        label: "您的腰围？", // 字段中文名(必须)
        defaultValue: '170', // 参数的值(必须)
        showValue: '170cm', // 用于展示给用户看的数据
        index: 70, // 默认值的所在index
        id: guID(), // 字段id
        type: "select", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: new Array(100).fill(100).map((v, i) => v + i),
        field: "hip", // 字段名(必须)
        unit:'cm',
        label: "您的臀围？", // 字段中文名(必须)
        defaultValue: '170', // 参数的值(必须)
        showValue: '170cm', // 用于展示给用户看的数据
        index: 70, // 默认值的所在index
        id: guID(), // 字段id
        type: "select", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [
          {text:'中国',value:'9999'}, {text:'中国香港',value:'4401'}, {text:'中国台湾',value:'0000'}, {text:'江苏',value:'3200'}, {text:'上海',value:'3100'},
          {text:'北京',value:'1100'}, {text:'天津',value:'1200'}, {text:'浙江',value:'3300'}, {text:'广东',value:'4400'}, {text:'辽宁',value:'2100'},
          {text:'山东',value:'3700'}, {text:'内蒙古',value:'1500'}, {text:'重庆',value:'5000'}, {text:'福建',value:'3500'}, {text:'海南',value:'4600'},
          {text:'湖北',value:'4200'}, {text:'湖南',value:'4300'}, {text:'陝西',value:'6100'}, {text:'河南',value:'4100'}, {text:'黑龙江',value:'2300'},
          {text:'青海',value:'6300'}, {text:'云南',value:'5300'}, {text:'安徽',value:'3400'}, {text:'四川',value:'5100'}, {text:'贵州',value:'5200'},
          {text:'甘肃',value:'6200'}, {text:'江西',value:'3600'}, {text:'吉林',value:'2200'}, {text:'山西',value:'1400'}, {text:'河北',value:'1300'},
          {text:'宁夏',value:'6400'}, {text:'广西',value:'4500'}, {text:'新疆',value:'6500'}, {text:'西藏',value:'5400'}
        ],
        field: "area", // 字段名(必须)
        unit:'',
        label: "您的居住地？", // 字段中文名(必须)
        defaultValue: '9999', // 参数的值(必须)
        showValue: '中国', // 用于展示给用户看的数据
        index: 0, // 默认值的所在index
        id: guID(), // 字段id
        type: "highSelect", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [{text:'已婚',value:1}, {text:'未婚',value:2}, {text:'丧偶(男)',value:3}, {text:'丧偶(女)',value:4}, {text:'分居',value:5}],
        field: "marry", // 字段名(必须)
        unit:'',
        label: "您的婚姻状况？", // 字段中文名(必须)
        defaultValue: 1, // 参数的值(必须)
        showValue: '已婚', // 用于展示给用户看的数据
        index: -1, // 默认值的所在index
        id: guID(), // 字段id
        type: "radio", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [{text:'没有',value:0}, {text:'1名',value:1}, {text:'2名',value:2}, {text:'3名及以上',value:3}],
        field: "childcnt", // 字段名(必须)
        unit:'',
        label: "您的子女数目？", // 字段中文名(必须)
        defaultValue: 0, // 参数的值(必须)
        showValue: '没有', // 用于展示给用户看的数据
        index: -1, // 默认值的所在index
        id: guID(), // 字段id
        type: "radio", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [{text:'不喝',value:1}, {text:'天天喝',value:2}, {text:'经常喝',value:3}, {text:'偶尔喝',value:4}],
        field: "drink", // 字段名(必须)
        unit:'',
        label: "您是否饮酒？", // 字段中文名(必须)
        defaultValue: 1, // 参数的值(必须)
        showValue: '不喝', // 用于展示给用户看的数据
        index: -1, // 默认值的所在index
        id: guID(), // 字段id
        type: "radio", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [{text:'不抽',value:1}, {text:'天天抽',value:2}, {text:'经常抽',value:3}, {text:'偶尔抽',value:4}],
        field: "smoke", // 字段名(必须)
        unit:'',
        label: "您是否吸烟？", // 字段中文名(必须)
        defaultValue: 0, // 参数的值(必须)
        showValue: '不抽', // 用于展示给用户看的数据
        index: -1, // 默认值的所在index
        id: guID(), // 字段id
        type: "radio", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [{text:'定时定量',value:1}, {text:'不定时且不定量',value:2}, {text:'定时但不定量',value:3}, {text:'不定时但定量',value:4}],
        field: "habeat", // 字段名(必须)
        unit:'',
        label: "您的用餐习惯？", // 字段中文名(必须)
        defaultValue: '定时但不定量', // 参数的值(必须)
        showValue: '定时但不定量', // 用于展示给用户看的数据
        index: -1, // 默认值的所在index
        id: guID(), // 字段id
        type: "radio", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [{text:'不是',value:1}, {text:'是',value:2}],
        field: "vege", // 字段名(必须)
        unit:'',
        label: "您是否是全日素食者？", // 字段中文名(必须)
        defaultValue: '1', // 参数的值(必须)
        showValue: '不是', // 用于展示给用户看的数据
        index: -1, // 默认值的所在index
        id: guID(), // 字段id
        type: "radio", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [{text:'没有或每周少于1小时',value:1}, {text:'每周运动1~2小时',value:2}, {text:'每周运动3~4小时',value:3}, {text:'每周运动5~6小时',value:4}, {text:'每周运动7小时以上',value:5}],
        field: "habsport", // 字段名(必须)
        unit:'',
        label: "您的运动习惯？", // 字段中文名(必须)
        defaultValue: '1', // 参数的值(必须)
        showValue: '每周运动1~2小时', // 用于展示给用户看的数据
        index: -1, // 默认值的所在index
        id: guID(), // 字段id
        type: "radio", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [{text:'无',value:1},{text:'有严重睡眠障碍且非常困扰',value:2},{text:'经常有睡眠障碍',value:3},{text:'偶尔有睡眠障碍',value:4}],
        field: "sleep", // 字段名(必须)
        unit:'',
        label: "您是否有睡眠障碍？", // 字段中文名(必须)
        defaultValue: '1', // 参数的值(必须)
        showValue: '无', // 用于展示给用户看的数据
        index: -1, // 默认值的所在index
        id: guID(), // 字段id
        type: "radio", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [
          {text:'高血压',value:'K01', level: 0},{text:'高血脂',value:'K02', level: 0 },{text:'糖尿病',value:'K03', level: 0},{text:'慢性肝病',value:'K04', level: 0}, 
          {text:'慢性肾脏病',value:'K05', level: 0},{text:'癌症',value:'K06', level: 0},{text:'肝硬化',value:'K07', level: 0},{text:'慢性阻塞性肺炎',value:'K08', level: 0},{text:'关节炎',value:'K09', level: 0}, 
          {text:'心脏病',value:'K10', level: 0},{text:'脑中风',value:'K11', level: 0},{text:'胃肠溃疡',value:'K12', level: 0},{text:'睡眠障碍',value:'K13', level: 0},{text:'贫血',value:'K14', level: 0},
          {text:'疼痛',value:'K15', level: 0}, {text:'哮喘',value:'K16', level: 0},{text:'痛风',value:'K17', level: 0},{text:'痔疮',value:'K18', level: 0},{text:'甲状腺疾病',value:'K19', level: 0}
        ],
        field: "disease", // 字段名(必须)
        unit:'',
        label: "您患有过下列疾病吗？", // 字段中文名(必须)
        defaultValue: '', // 参数的值(必须)
        showValue: '无', // 用于展示给用户看的数据
        index: 1, // 默认值的所在index
        id: guID(), // 字段id
        type: "checkBox", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [],
        field: "medicalLevel", // 字段名(必须)
        unit:'',
        label: "请选择患病的用药情况", // 字段中文名(必须)
        defaultValue: [], // 参数的值(必须)
        showValue: '无', // 用于展示给用户看的数据
        index: 1, // 默认值的所在index
        id: guID(), // 字段id
        type: "medicalLevel", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [
          {text:'头或脑部',value:'1'}, {text:'眼鼻耳',value:'2'}, {text:'口腔、食道',value:'3'}, {text:'胸部（心、肺等）',value:'4'},
          {text:'腹部（胃、肝、胆、胰、肾等）',value:'5'}, {text:'关节与骨',value:'6'}, {text:'妇科手术',value:'7'}, {text:'泌尿系统',value:'8'}, 
        ],
        field: "oper", // 字段名(必须)
        unit:'',
        label: "您是否做过以下手术？", // 字段中文名(必须)
        defaultValue: '', // 参数的值(必须)
        showValue: '无', // 用于展示给用户看的数据
        index: 1, // 默认值的所在index
        id: guID(), // 字段id
        type: "checkBox", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [
          {text:'癌症',value:'1'}, {text:'脑中风',value:'2'}, {text:'心肌梗塞',value:'3'}, {text:'肝硬化',value:'4'},
          {text:'老年失智',value:'5'}, {text:'慢性阻塞性肺炎',value:'6'}, {text:'结核病',value:'7'}, {text:'先天疾病',value:'8'}, 
        ],
        field: "famdis", // 字段名(必须)
        unit:'',
        label: "您的直系亲属有下列疾病吗？", // 字段中文名(必须)
        defaultValue: '', // 参数的值(必须)
        showValue: '无', // 用于展示给用户看的数据
        index: 1, // 默认值的所在index
        id: guID(), // 字段id
        type: "checkBox", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      },
      {
        options: [],
        field: "questionSubmit", // 字段名(必须)
        unit:'',
        label: "恭喜！测评题目已完成，快来看看结果吧~", // 字段中文名(必须)
        defaultValue: '', // 参数的值(必须)
        showValue: '', // 用于展示给用户看的数据
        index: 1, // 默认值的所在index
        id: guID(), // 字段id
        type: "questionSubmit", // 表单类型(必须)
        formState: -2, // -2: 不显示  -1：机器人询问的三个点等待状态  0：显示问题    1：显示表单    2：填写后，收起表单     3: 编辑，显示表单
        isEdit: false, // 是否正在编辑
      }
    ],
  },
  ...func,
  onPageScroll(e) {
    clearTimeout(this.data.clearTimeId)
    const clearTimeId = setTimeout(() => {
      console.log('123213')
      this.setData({scrollTop: e.scrollTop})
    }, 50)
    this.setData({clearTimeId})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 进去页面之后先显示第一个题目
    const { formList } = this.data 
    this.setData({formList: adjust(formList, 0, v => ({...v, formState: -1}))}) // 机器人询问
    await wait(400)
    console.log(adjust(formList, 0, v => ({...v, formState: 0})))
    this.setData({formList: adjust(formList, 0, v => ({...v, formState: 0}))}) // 显示题目
    await wait(50)
    this.setData({formList: adjust(formList, 0, v => ({...v, formState: 1}))}) // 显示表单
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})