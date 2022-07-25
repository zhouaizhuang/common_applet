import * as func from "./func.js"
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    val: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    optionHeight: 50, // 每一个选项的高度
    optObj: {
      style: {
        transform: 'translate3d(0px,0px,0px)',
        transition: 'transform .3s',
        paddingTop: `1.05rem` // 0.35 * 3上方空出三个单位高度
      },
      activeIndex: 0, // 当前激活的索引
      curItem: 0, // 当前选中的选项
      startY: 0, // 触摸开始位置
      startTime: 0, // 开始时间
      endY: 0, // 结束位置
      endTime: 0, // 结束时间
      prevY: 0, // 上次移动距离
      direction: 0 // 滑动方向
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ...func
  },
})
