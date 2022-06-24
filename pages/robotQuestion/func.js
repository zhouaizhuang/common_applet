import { round, wait, adjust, searchCover, getField } from "../../common.js"
import { getLocalStorage, pageScrollTo } from "../../api.js"
// 选择性别
export const selectGender = function (e) {
  const {index, id, item} = e.currentTarget.dataset
  const { formList } = this.data
  this.setData({formList: adjust(formList, index, v => ({...v, defaultValue: id, showValue: id == 0 ? '男' : '女'}))})
  this.nextQuestion(index, item)
}
// 改变数据
export const onChangeSelect = function (e) {
  const { value } = e.detail
  const { bigindex } = e.currentTarget.dataset
  const { formList } = this.data
  this.setData({
    formList: adjust(formList, bigindex, v => (
      {
        ...v,
        defaultValue: value,
        showValue: value + (v.unit || ''),
        index: e.detail.index
      })
    )
  })
}
// 改变体重数据
export const changeWeight = function (e) {
  const { value } = e.detail;
  const { bigindex } = e.currentTarget.dataset
  const { formList } = this.data
  const [weightInt, weightFloat] = value
  const result = round(weightInt + weightFloat * .1, 1)
  this.setData({
    formList: adjust(formList, bigindex, v => {
      return {
        ...v,
        options: v.options.map((j, i) => {
          return  {
            ...j,
            defaultIndex: j.values.indexOf(value[i])
          }
        }),
        defaultValue: result,
        showValue: result + (v.unit || '')
      }
    })
  })
  console.log(this.data.formList)
}
// 改变高级选择器
export const changeHighSelect = function (e) {
  const res = e.detail.value
  const { bigindex } = e.currentTarget.dataset
  const { formList } = this.data
  const {text, value} = res
  this.setData({
    formList: adjust(formList, bigindex, v => (
      {
        ...v, 
        defaultValue: value, 
        showValue: text + (v.unit || ''),
        index: e.detail.index
      })
    )
  })
}
// 用户点击继续
export const goContinue = function (e){
  let { index, item } = e.currentTarget.dataset
  this.nextQuestion(index, item)
}
// 下一题
export const nextQuestion = function (index, item) {
  const { formList } = this.data
  // 新增状态, 新增状态需要进行题目显示，页面滚动
  this.setData({formList: adjust(formList, index, v => ({...v, formState: 2, isEdit:false }))})
  // 不管是否新增。都要重置为填写为表单的状态 2
  if(!item.isEdit) {
    setTimeout(async () => {
      let { formList } = this.data
      const currentQuestion = this.data.currentQuestion + 1
      this.setData({
        currentQuestion,
        formList: adjust(formList, currentQuestion, v => ({...v, formState: -1})), // 机器人询问
      })
      wx.createSelectorQuery().select('#dom-' + (index + 1)).boundingClientRect(rect =>{
        // 节点的上边界坐标
        let top = rect.top;
        // console.log(top)
        const scrollTop = this.data.scrollTop + top - 40
        pageScrollTo(scrollTop, 800)
        this.setData({scrollTop})
      }).exec()
      await wait(300)
      this.setData({formList: adjust(formList, currentQuestion, v => ({...v, formState: 0}))}) // 显示题目
      await wait(50)
      this.setData({formList: adjust(formList, currentQuestion, v => ({...v, formState: 1}))}) // 显示表单
    }, 600)
  }
}
// 提示用户选择用药情况
export const tipSelect = async function () {
  this.setData({isTipSelect:true})
  await wait(600)
  this.setData({isTipSelect:false})
}
// 保存表单
export const submitForm = function () {
  const params = this.data.formList.reduce((prev, item) => {
    prev[item.field] = item.defaultValue
    return prev
  }, {})
  // const {} = getLocalStorage('')
  // const newParams = {
  //   username:
  // }
  console.log(params)
}
// 状态3代表放开表单填写
export const showEdit = function (e){
  const {index} = e.currentTarget.dataset
  const { formList } = this.data
  this.setData({formList: adjust(formList, index, v => ({...v, formState: 3, isEdit: true}))})
}
// 单选
export const selectRadio = function (e) {
  const { item, bigindex, bigitem } = e.currentTarget.dataset
  const { formList } = this.data
  const newFormList = adjust(formList, bigindex, v => {
    const newOptions = searchCover(v.options, item, j => ({ ...j, isChecked: true }), j => ({ ...j, isChecked: false }))
    return {
        ...v,
        options: newOptions,
        defaultValue: getField(newOptions, 'value', {isChecked:true}),
        showValue: getField(newOptions, 'text', {isChecked:true}),
      }
    }
  ) 
  this.setData({ formList: newFormList })
  this.nextQuestion(bigindex, bigitem)
}
// 多选
export const selectCheckBox = function (e) {
  const { item, bigindex, bigitem } = e.currentTarget.dataset
  const { formList } = this.data
  let newOptions = []
  let newFormList = adjust(formList, bigindex, v => {
    newOptions = searchCover(v.options, item, j => ({ ...j, isChecked: !j.isChecked }))
    return {
      ...v,
      options: newOptions,
      defaultValue: getField(newOptions, 'value', {isChecked:true}) || '',
      showValue: getField(newOptions, 'text', {isChecked:true}) || '无',
    }
  })
  // 更新用药情况(等到最后获取报告的时候直接取出medicalLevel的用药情况中的defaultValue值)
  if(bigitem.field == 'disease') {
    newFormList = searchCover(newFormList, { type:'medicalLevel' }, v => {
      return {
        ...v,
        options: newOptions.filter(v => v.isChecked).map(v => ({ ...v, level: 0 }))
      }
    })
  }
  this.setData({ formList: newFormList })
}
// 更新服药情况
export const toogleMedicalLevel = function (e) {
  const { i, level, bigindex } = e.currentTarget.dataset
  const { formList } = this.data
  const newFormList = adjust(formList, bigindex, v => {
    const newOptions = adjust(v.options, i, k => ({...k, level}))
    const mapLevel = {
      1: '经常服药',
      2: '偶尔服药',
      3: '不服药',
    }
    const defaultValue = newOptions.filter(m => m.level > 0).map(j => ({kdis: j.value, level: j.level}))
    return {
      ...v,
      options: newOptions,
      defaultValue: defaultValue,
      showValue: newOptions.filter(m => m.level > 0).map(j => `${j.text}：${mapLevel[j.level]}`)
    }
  })
  // console.log(newFormList)
  // 还需要更新disease中的level
  this.setData({ formList: newFormList })
}