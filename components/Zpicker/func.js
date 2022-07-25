const range = function (num, min = null, max = null) {
  num = Number(num)
  if(min !== null) { num = Math.max(num, Number(min)) }
  if(max !== null) { num = Math.min(num, Number(max)) }
  return num
}
// 触摸开始
export const touchStart = function (e) {
  // console.log(e)
  const optObj = this.data.optObj
  optObj.startY = e.touches[0].pageY
  optObj.startTime = e.timeStamp
  optObj.style.transition = 'none'
  this.setData({optObj})
}
// 触摸中
export const touchMove = function (e) {
  const { optObj } = this.data
  let moveY = e.changedTouches[0].pageY // 触摸并且移动事件触发，实时的横坐标
  optObj.direction = moveY - optObj.startY
  optObj.style.transform = `translate3d(0px,${(optObj.prevY + optObj.direction)}px,0px)`
  this.setData({optObj})
}
// 触摸结束
export const touchEnd = function (e) {
  const { optObj, optionHeight, list} = this.data
  optObj.endTime = e.timeStamp // 保存结束时间
  optObj.endY = e.changedTouches[0].pageY
  let distance = optObj.endY - optObj.startY // 计算用户手指移动的距离
  let interval = optObj.endTime - optObj.startTime // 计算用户操作的时间间隔
  let lastDistance = Number(optObj.style.transform.split(',')[1].slice(0, -2)) // 保存上一次移动的距离
  if (interval < 300 && Math.abs(distance) > 30) { // 滚动
    lastDistance += Math.round(distance / interval) * 5 * optionHeight
  }
  lastDistance = range(lastDistance, -1 * optionHeight * (list.length - 1), 0)
  optObj.activeIndex = Math.abs(Math.round(lastDistance / optionHeight))
  lastDistance = -(optObj.activeIndex * optionHeight)
  optObj.prevY = lastDistance
  optObj.style.transition = 'transform .4s'// 设置过渡动画
  optObj.style.transform = `translate3d(0px,${optObj.prevY}px,0px)`
  this.setData({optObj})
}