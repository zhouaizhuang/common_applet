/*
**********************************************************************************************
******************************************公共方法*********************************************
**********************************************************************************************
*/
export const isType = type => val => type === Object.prototype.toString.call(val).slice(8, -1)
export const isArray = isType('Array')
export const isObject = isType('Object')
export const isReference = val => isArray(val) || isObject(val)
export const isNull = isType('Null')
export const isUndefined = isType('Undefined')
export const isFunction = isType('Function')
export const isRegExp = isType('RegExp')
export const isString = isType('String')
export const isNumber = isType('Number')
export const isDate = isType('Date')
export const isError = isType('Error')
export const isGt0 = val => /^\+?[1-9][0-9]*$/.test(val) // 是否是大于0的整数
export const isGtEq0 = val => /^\+?[1-9][0-9]*$/.test(val) || String(val) === '0' // 是否是大于等于0的整数
export const isIdentity = val => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val) // 身份证 321281155121152489
export const isEmail = val => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val)
// 执行此函数，可以做一个延时功能。在需要延时执行一段逻辑的时候可以使用
// 举例子: await wait(500);   那么程序会在此处阻塞等待500ms
export const wait = t => new Promise(resolve => setTimeout(() => resolve(), t))
/**
 * 深拷贝
 * @param {*} obj 传入任意类型都可以做深拷贝
 * @returns 返回深拷贝的数据
 * @举例子 const obj = {name:'a', age:'18'};  deepCopy(obj) ----> {name:'a', age:'18'}
 */
export const deepCopy = function (obj) {
  if(!isReference(obj)) { return obj }  // 数字、日期、正则、函数、字符串、undefined、null、Symbol直接返回
  let res = isArray(obj) ? [] : {}
  return Object.keys(obj).reduce((prev, item) => (prev[item] = isReference(obj[item]) ? deepCopy(obj[item]) : obj[item], prev), res)
}
/**
 * 获取唯一ID。用于模板渲染的唯一key值
 * @returns 
 * @举例子 [{name:'a'}, {name:'b'}].map(v => ({...v, _id:guID()})) ---->  [{name:'a', _id: '1vc49wwugp3400'}, {name:'b', _id:'4vvfl6wivx4000'}]
 */
export const guID = () => Number(Math.random().toString().substr(3, 8) + Date.now()).toString(36)
// 函数防抖
export const debounce = function (fn, wait=3e3) {
  if(!isFunction(fn)){throw new Error('传入的参数必须是个函数')}
  let timeout = null  // 使用闭包，让每次调用时点击定时器状态不丢失
  return function () { 
    clearTimeout(timeout) // 如果用户在定时器（上一次操作）执行前再次点击，那么上一次操作将被取消
    timeout = setTimeout(()=> fn(...arguments), wait)
  }
}
// 函数节流
export const throttling = function  (fn, wait=3e3) {
  let timeout = null // 使用闭包，让每次调用时点击定时器状态不丢失
  let start = +new Date() // 记录第一次点击时的时间戳
  return function () {
    clearTimeout(timeout)
    let end = +new Date() // 记录第一次以后的每次点击的时间戳
    if (end - start >= wait) { // 当时间到达设置的延时时间则立即调用数据处理函数
      fn(...arguments)
      start = end // 执行处理函数后，将结束时间设置为开始时间，重新开始记时
    } else {
      timeout = setTimeout(() => fn(...arguments), wait) // 后续点击没有到达设置的延时，定时器设定延时进行调用
    }
  }
}
/*
**********************************************************************************************
******************************************数组方法*********************************************
**********************************************************************************************
*/
/**洗牌算法**/
// [1,2,3,4,5,6].sort(() => .5 - Math.random()) // 基础版本
export const shuffle = function (arr){
  if(!isArray(arr)) { arr = [arr] }
  let n = arr.length, random
  while(0!=n){
    random =  (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
    [arr[n], arr[random]] = [arr[random], arr[n]] // ES6的结构赋值实现变量互换
  }
  return arr
}
/**
 *  缓存函数计算结果
 * @举例 const cachedComputed = cached(function(val){ return val + 'ZZZ' })
 * @测试 cachedComputed('abc') ---> 'absZZZ' 第二次调用就不需要计算了直接取值 cachedComputed('abc') ---> 'absZZZ'
 * */ 
export const cached = function (fn) {
  const cache = {}
  return function (str) {
    return !cache[str] && (cache[str] = fn(str)), cache[str]
  }
}
// 扩展对象
// extend({}, {name:1}) ====> {name: 1}
export const extend = function(to, _from) {
  for (var key in _from) {
    to[key] = _from[key]
  }
  return to
}
// 对象数组转对象
// toObject([{name: 1}, {age:2}]) ====> {name:1, age:2}
export const toObject = function (arr) {
  var res = {}
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}
/**
 * 扁平数组转对象tree树形结构
 * https://juejin.cn/post/6983904373508145189#heading-8
 * @param {Array} arr 需要转换的数组
 * @returns {Array} 转换之后的数组
 * @举例 
 * let arr = [{id: 1, name: '部门1', pid: 0},{id: 2, name: '部门2', pid: 1},{id: 3, name: '部门3', pid: 1},{id: 4, name: '部门4', pid: 3},{id: 5, name: '部门5', pid: 4}]
 * arrayToTree(arr) ==> 
 * [{
    "id": 1,
    "name": "部门1",
    "pid": 0,
    "children": [ { "id": 2, "name": "部门2", "pid": 1, "children": [] }, { "id": 3, "name": "部门3", "pid": 1, "children": [{...},{...}] } ]
   }]
 */
export const array2Tree = function (arr) {
  const itemMap = arr.reduce((prev, item) => (prev[item.id] = { ...item, children: [] }, prev), {})
  return arr.reduce((prev, item) => {
    const { id, pid } = item
    const curItem = itemMap[id]
    itemMap[pid] = itemMap[pid] || { children: [] } // 防止有的pid不存在
    pid === 0 ? prev.push(curItem) : itemMap[pid].children.push(curItem)
    return prev
  }, [])
}
// 一次性函数。只执行一次。后面再调用,没有任何函数内代码执行
// 示例：const aa = once(function (a, b){console.log(a + b)})
// aa(1,2) ===> 3   ------>  aa(3, 4) ===> undefined
export const once = function(fn) {
  var called = false
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}
// 生成一个映射函数，生成一个判断函数，用于判断
// const isMyStudent = makeMap('小明,小王') // 柯里化生成不同的判断函数
// isMyStudent('张三')   ===>  false
export const makeMap = function(str,expectsLowerCase = false) {
  var map = Object.create(null)
  var list = isString(str) ? str.split(',') : str
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? function (val) { return map[val.toLowerCase()]; } : function (val) { return map[val]; }
}
// 删除数组中某个元素
// const arr = ['a', 'b', 'c']
// remove(arr, 'b') ====> arr变更为['a', 'c']
export const remove = function(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) { return arr.splice(index, 1) }
  }
}
// 数组、字符串元素复制N次 
// 举例(重复生成数组元素)： repeat([{age:1}], 2) ====>[{age:1, _id: 'asdasd2j2'}, {age:1, _id: '123123c'}]  // 备注增加_id是为了for循环的key值不重复
// 举例（重复生成字符串）： repeat('abc', 2) ====>  'abcabc'
// 字符串复制实现： Array(3).join(0) ====> '00'    "0".repeat(2) ===> '00'
// 引用类型复制实现： Array(2).fill([{name: '张三'}]) ====> [[{name: '张三'}], [{name: '张三'}]]
export const repeat = function(obj = '', times = 1) {
  let res = isArray(obj) ? [] : ''
  if(isArray(obj)) {
    if(isObject(obj[0])) {
      for(let i =0; i < range(times, 1); i++) {
        const tmp = deepCopy(obj).map(v => ({...v, _id: guID()}))
        res = [...res, ...tmp]
      }
    } else {
      for(let i =0; i < range(times, 1); i++) { res = [...res, ...obj] }
    }
  } else {
    for(let j = 0; j < range(times, 1); j++) { res += obj }
  }
  return res
}
// 按照某个字段进行排序。
// 举例：sortByProp([{name:'ss', age:30}, {name:'dd', age:14}], 'age') ----> [{name:'dd', age:14}, {name:'ss', age:30}]
// increase不传默认升序， 传false降序
export const sortByProp = function (arr, str, increase = true) {
  return arr.sort((a, b) => increase ? a[str] - b[str] : b[str] - a[str])
}
/**
* 数组去重
* 举例： noSame([1,2,3,4,'1'])
*/
export const noSame = function(arr) {
  const newData = arr.reduce((prev, item) => (prev.set(item, item), prev), new Map())
  return [...newData.keys()]
}
//递归解析数组中某个字段最深层该字段数组平铺。举例子：获取数组中每个对象的最深层的child属性
// const arr = [{ 
//   name: 'a',
//   child:[{
//       name:'b',
//       child: [ { name:'c' }]
//   }]
// }]
//getAreaFlat(arr, 'child')------> [{name:'c'}]
export const getAreaFlat = function (arr, props) {
  if(arr.some(item => isArray(item[props]) && item[props].length)) {
    arr = arr.reduce((prev, item) => isArray(item[props]) && item[props].length ? [...prev, ...item[props]] : [...prev, item], [])
    return getAreaFlat(arr, props)
  } else {
    return arr
  }
}
// 获取某个数组中某个字段的值，拼接成字符串。
// 举例： const arr = [{name:'a'}, {name:'b'}]
// getField(arr, 'name')----> 'a,b'
export const getField = function (arr, field, split = ',') {
  return arr.reduce((prev, item) => [...prev, item[field]], []).join(split)
}
// 获取某个数组中字段isChecked为true的条目。并取出其中特定字段。
// 举例：const arr = [{id:1, isChecked: true}, {id:2, isChecked:false}, {id:2, isChecked:true}]
// getChecked(arr, 'id')  ---> 1,2
export const getChecked = function (arr, field, checkStr = 'isChecked', split = ',') {
  return arr.reduce((prev, item) => (item[checkStr] && prev.push(item[field]), prev), []).join(split)
}
// 数组分块
// 举例子： chunk([1,2,3,4,5], 2) ====>   [[1,2], [3, 4], [5]]
export const chunk = function (arr, size = 0) {
  if(!isArray(arr)) {throw new Error('arr必须是数组类型')}
  size = Number(size)
  if(!isGt0(size)) {throw new Error('size必须为大于0的整数')}
  var targetArr = []
  for(var i = 0; i < arr.length; i += size) {
    targetArr.push(arr.slice(i, i + size));
  }
  return targetArr
}
// 数组（a 相对于 b 的）交集
// 举例子: intersect([1,2,3], [1,2]) ====> [1, 2]
export const intersect = function (arr1, arr2){
  if(!isArray(arr1) || !isArray(arr2)) {throw new Error('参数必须是数组类型')}
  const tmp = new Set(arr2)
  return arr1.filter(x => tmp.has(x))
}
// 数组（a 相对于 b 的）差集
// 举例子: difference([1,2,3], [1,2]) ====> [3]
export const difference = function (arr1, arr2){
  if(!isArray(arr1) || !isArray(arr2)) {throw new Error('参数必须是数组类型')}
  const b = new Set(arr2)
  return arr1.filter(x => !b.has(x))
}
/*
**********************************************************************************************
******************************************字符串操作*********************************************
**********************************************************************************************
*/
// 去除字符串的首尾空格
export const trim = function (str = '') {
  return String(str).replace(/(^\s*)|(\s*$)/g, '')
}
// 固定裁剪几个字符之后显示省略号。举例：sliceStr('张三李四王五', 2) ----> "张三..."
export const sliceStr = function (str, num) {
  str = String(str)
  let newStr = str.substr(0, num)
  str.length > num && (newStr += '...')
  return newStr
}
// 字符串前置补0。举例: addZero('1', 2) ==> '01'
export const addZero = function (str = '', num = 2) {
  return (Array(num+1).join('0') + str).slice(-num)
}
// 完美的统计字符串长度，能正确统计占四个字节的Unicode字符。举例：length('x\uD83D\uDE80y') ----> 3
export const length = function (str) {
  return [...str].length
}
/*
**********************************************************************************************
******************************************JSON操作*********************************************
**********************************************************************************************
*/
// 格式化JSON, 将null, undefined,转换为''，否则后端会认为undefined和null为字符串导致bug
// 举例子：formatJSON({name:null, age:undefined, school: '清华大学'}) ---> {name:'', age:'', school: '清华大学'}
export const formatJSON = function (obj) {
  if(!isObject(obj)) { return {} }
  return Object.keys(obj).reduce((prev, item) => {
    prev[item] = isNull(obj[item]) || isUndefined(obj[item]) || ['undefined', 'null'].includes(obj[item]) ? '' : obj[item]
    return prev
  }, {})
}
// 检查表单必填项是否为空，空则返回第一个为空的字段名。
// 举例：checkParams({name:'张三', age:'', school:''}) ----> 'age'
export const checkJSON = function (obj) {
  return Object.keys(obj).find(item => !Boolean(obj[item])) || ''
}
/**
 * JSON转url（这个函数将数据进行了编码。将来再解码使用。可以规避一些特殊字符产生的bug）
 * 函数还兼容传入 {info: {name:'zz', age:18}, school: 'qinghua'} 这种复杂的数据。之后通过url2JSON可以完美解析
 * @param {String} url 跳转地址的域名。在小程序中那就是路径
 * @param {Object} params 跳转地址中药传递的参数的json格式
 * @param {String || Number} type  0不需要编码 1: 需要编码(默认值)
 * @returns {String} 返回拼接好的带有参数的链接地址
 * @举例子 JSON2url('../advise/index', { from: 'index', id_str:'1243' }) -----> '../advise/index?from=index&id_str=1243'
 */
export const JSON2url = function (url = '', params = {}, type = 1){
  return Object.keys(formatJSON(params)).reduce((prev, item) => {
    let val = JSON.stringify(params[item])
    val = type == 1 ? encodeURIComponent(val) : val // 为了适配更多的场景，开发了自定义是否编码
    return prev + (prev.includes('?') ? '&' : '?') + `${item}=${val}`
  }, url) || ''
}
/**
 * url转JSON(函数内与解码操作，与JSON2url相对应)
 * @param {String} url 传入带有参数的url链接地址
 * @param {String || Number} type 0: 不需要解码  1需要解码(默认值)
 * @returns {Object} 返回参数拼接的json对象
 * @举例 url2JSON('http://www.baidu.com?name=asd&age=12') ----> {name: "asd", age: "12"}
 */
export const url2JSON = function (url = '', type = 1) {
  let paramsStr = url.includes('?') ? (url.split('?')[1] || '') : url
  paramsStr = paramsStr.split('#')[0] || '' // 防止一些url中混入#号放在?号之后，此处做一个适配
  return paramsStr.split('&').reduce((prev, item) => {
    let [key, val] = item.split('=')
    val = type == 1 ? decodeURIComponent(val) : val // 为了适配更多的场景，开发了自定义是否解码（如果传入的url是编码过的，那么必须解码，否则报错）
    return { ...prev, [key]: JSON.parse(val) } // 此处需要转码，否则中文和一些特殊字符就无法支持了
  }, {})
}
/**
 * 将数组中的数据进行分类，分类成JSON。键名为类别名称，键值为数组，存放数据集合
 * @param {Array} arr 需要分类的数组
 * @param {Function} callback 分类函数
 * @举例子 
 * const arr = [{name: 'asd', score: 100}, {name: '3dd', score: 60}, {name: 'dfg', score: 80}, {name: 'zrr', score: 90}]
 * groupBy(arr, item => {
 *   const { score } = item
 *   return score < 65 ? 'E' :
 *          score < 70 ? 'D' :
 *          score < 80 ? 'C' :  
 *          score < 90 ? 'B' : 'A';
 *   })
 * }
 * @result 根据分类函数分类好的结果：{A: [{...},{...}], B: [{...}], C: [{...}], D: [{...}]}
 */
 export const groupBy = function (arr, callback){
  return arr.reduce((prev, item) => {
    const key = callback(item)
    ;(prev[key] || (prev[key] = [])).push(item)
    return prev
  }, {})
}
/**
 * 将后台数据同步过来
 * 场景举例：比如表单编辑的时候，用户之前有一些是选中状态的，但是查到的列表没这个状态，你只知道哪些id是选中的。那么就需要做同步。将列表数据中特定id的条目进行字段更新
 * @param {Array} arr 列表数据
 * @param {String || Array} ids 需要更新的id集合
 * @param {String} key 更新的键值
 * @param {*} val 目标id更新之后的值
 * @param {*} defVal 非目标id更新之后的值
 * @returns {Array}
 * 举例 syncBgData([{id:'1'}, {id:'2'}, {id:'3'}], '2,3')
 * [{id:'1', isChecked:false}, {id:'2', isChecked:true}, {id:'3', isChecked:true}]
 */
export const syncBgData = (arr, ids, key = 'isChecked', val = true, defVal = false) => arr.map(v => (v[key] = ids.includes(v.id) ? val : defVal, v))
/**
 * 返回一个lower - upper之间的随机数
 * @param lower 下限
 * @param upper 上限
 * @param type 数据类型  float：浮点型    int：整型
 * @举例 random(0, 0.5) ==> 0.3567039135734613
 * @举例 random(1, 2) ===> 1.6718418553475423
 * @举例 random(-2, -1) ==> -1.4474325452361945
 * 原生参考代码:  a = new Date % 100; // 两位整数随机数
 * a = new Date % 1000; // 三位整数随机数
 * a = new Date % 10000; // 四位整数随机数...依次类推
 */
export const random = function (lower, upper, type = 'float') {
  lower = +lower || 0
  upper = +upper || 0
  let res = Math.random() * (upper - lower) + lower
  if(type !== 'float') { res = round(res) }
  return res
}
/**
 * 获取随机颜色
 * @returns 
 */
 export const randomColor = function () {
  const [r, g, b, a] = [random(0, 255,'int'), random(0, 255,'int'), random(0, 255,'int'), 1]
  return `rgba(${r}, ${g}, ${b}, ${a})`
}
// 禁止复制
/*
['contextmenu', 'selectstart', 'copy'].forEach(function(ev){
    document.addEventListener(ev, function(event){
      return event.returnValue = false
    })
})
*/
/**
 * 获取部分字段。举例：
 * @param obj 需要读取的对象
 * @param props 需要得到的字段
 * @举例 const obj = {name:'', age:123,school:{hh:11, kj:true}, asd:'qqwq'}
 * @举例 getProps(obj, {name:'', school:{hh:''}, asd:''}) ----> 得到其中部分字段。这个函数可以用户提升小程序列表页和详情页大量数据的渲染性能
 * 还可以直接传入对象数组像这种[{...},{...},{...},{...}]，返回相应字段的对象数组
 * 主要运用于优化移动端大量数据下拉加载更多导致setData的数据很庞大
 */
export const getProps = function (obj, props) {
  if(!isObject(props)) { throw new Error('参数有误，参数必须为object') }
  if(isArray(obj)) {
    return obj.map(item => {
      return Object.keys(props).reduce((prev, v) => {
        prev[v] = isObject(props[v]) ? getProps(item[v], props[v]) : item[v] || ''
        return prev
      }, {})
    })
  }else if(isObject(obj)) {
    return Object.keys(props).reduce((prev, item) => {
      prev[item] = isObject(props[item]) ? getProps(obj[item], props[item]) : obj[item] || ''
      return prev
    }, {})
  } else {
    return obj
  }
}

/**
 * 保证json格式数据的可靠获取
 * @param run 需要执行的函数
 * @param defaultVal 默认值
 * @举例 const obj = { area: { city: null, cityName:'北京' }, areaName: '中国' }
 * @举例 safeGet(() => obj.area.city.town, '') ---> ''
 * @举例 避免了这种写法： obj.area && obj.area.city && obj.area.city.town ? obj.area.city.town : ''
 */
export const safeGet = function (run, defaultVal = '') {
  try {
    return run() || defaultVal
  } catch(e) {
    return defaultVal 
  } 
}

/*
**********************************************************************************************
******************************************金额操作*********************************************
**********************************************************************************************
*/
/**
 * 四舍五入返回N位有效数字（常用于金额计算）
 * @param num 要格式化的数字
 * @param type float->小数形式。  intFloat->当整数的时候不需要带两个小数0，带小数时，保留几位小数
 * @param prec 保留几位小数
 * @param sep 千分位符号
 * @举例 formatMoney(12322.1223, 'float') ====> "12,322.12" // 保留0位小数四舍五入得到 12
 * @举例 formatMoney(12322.1223, 'float', 1) ------> "12,322.1"  固定显示1位小数
 * @举例 formatMoney(12322, 'intFloat') ------> "12322"  当没有小数点就显示整数，否则显示整数
 */
 export const formatMoney = function (num = 0, type = 'float', prec = 2, dec = '.', sep = ',') {
  num = String(num).replace(/[^0-9+-Ee.]/g, '') || '0'
  prec = Number(prec)
  if((type === 'intFloat' && !num.includes('.')) || num === '0') { return num }
  let [intStr = '', floatStr = ''] = round(num, prec).split(dec) // 分割出整数和小数部分
  let re = /(-?\d+)(\d{3})/ // 匹配整数部分每个三位数
  while (re.test(intStr)) {
    intStr = intStr.replace(re, "$1" + sep + "$2") // 整数部分三位数添加分隔符如','
  }
  floatStr += new Array(prec + 1).join('0')
  return `${intStr}${dec}${floatStr.slice(0, prec)}`
}
/**
 * 四舍五入返回N位有效数字（常用于金额计算）
 * @param num 需要处理的的数字、支持传入字符串
 * @param prec 保留的小数位数
 * @举例 round(12.35) ==> 12  // 12.35 保留0位小数四舍五入得到 12
 * @举例 round(12.35, 1) ==> 12.4 // 12.35 保留1位小数四舍五入得到 12.4
 */
export const round = function (num, prec = 0) {
  prec = Number(prec)
  prec < 0 && (prec = 0)
  const k = Math.pow(10, prec)
  return String(Math.round(Number(num) * k) / k)
}
/**
 * 数据范围
 * @param num 需要限制的数字
 * @param min 限制最小值
 * @param max 限制最大值
 * @举例 range(12.23, 7, 10)  ===> 10 // 上限为10 因此返回10
 * @举例 range(12.23, 14, 20)  ===> 14 // 下限为14 因此返回10
 */
export const range = function (num, min = null, max = null) {
  if(min !== null) {
    num = Number(num) < Number(min) ? min : num
  }
  if(max !== null) {
    num = Number(num) > Number(max) ? max : num
  }
  return num
}
/*
**************日期时间操作********************
*/
/**
 * 获取日期字符串。
 * @param AddDayCount 传0代表今天，传1代表明天
 * @param split 日期分割符
 * @举例 getDateStr(0) ---> 20200904    getDateStr(1) ---> 20200905
 * @举例 分割：getDateStr(1, '-')--->2020-09-05
 */
export const getDateStr = function (AddDayCount = 0, split = '') {
  const dt = new Date()
  dt.setDate(dt.getDate() + AddDayCount) // 获取AddDayCount天后的日期
  return `0000${dt.getFullYear()}`.slice(-4) + split + `00${(dt.getMonth() + 1)}`.slice(-2) + split + `00${dt.getDate()}`.slice(-2)
}
/**
 * 获取星期几， 不传默认是今天
 * @param t 时间格式字符串比如： '2021-10-01'   当然，也同时支持传入new date('2021-10-01')生成的对象
 * @举例 getDay('2020-03-05') ---> 返回的就是这个日期对应的星期几
 * @举例 getDay() // 默认返回当天星期几
 */
export const getDay = function (t = new Date()) {
  if(!isDate(t)) { t = t.replace(/[-]/g, "/") } // 为了兼容ios
  let day = t ? new Date(t).getDay() : new Date().getDay()
  return '星期' + "日一二三四五六"[day]
}
/**
 * 获取时间
 * @param t 时间格式字符串比如： '2021-10-01'   当然，也同时支持传入new date('2021-10-01')生成的对象
 * @举例 socketTime('2020-03-05') ---> 返回的就是2020年3月5日的年月日数据
 * @举例 socketTime() // 默认返回当天数据
 */
export const socketTime = function (t = new Date()) {
  if(!isDate(t)) { t = t.replace(/[-]/g, "/") }
  const dt = new Date(t)
  const year = String(dt.getFullYear())
  const _month = String(dt.getMonth() + 1)
  const month = addZero(_month, 2)
  const day = addZero(dt.getDate(), 2)
  const _day = String(dt.getDate())
  const weekDay = String(dt.getDay())
  const _weekDay = '星期' + "日一二三四五六"[weekDay]
  const hour = addZero(dt.getHours(), 2)
  const minutes = addZero(dt.getMinutes(), 2)
  const seconds = addZero(dt.getSeconds(), 2)
  return { year, month, _month, day, _day, weekDay, _weekDay, hour, minutes, seconds }
}
/**
 * 生成格式化时间字符串
 * @举例 dateFormater('YYYY-MM-DD HH:mm') ==> 2019-06-26 18:30
 * @举例 dateFormater('YYYYMMDD-hh:mm:ss', '2020-08-12 09:13:54') ==> 20200812-09:13:54
*/
export const dateFormater = function (formater, t = new Date()){
  if(!isDate(t) && isString(t)) { t = t.replace(/[-]/g, "/") }
  const dt = new Date(t)
  const [Y, M, D, h, m, s] = [dt.getFullYear() + '', dt.getMonth() + 1, dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds()]
  return formater.replace(/YYYY|yyyy/g, Y)
    .replace(/YY/g, Y.substr(2,2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/hh/g, (h < 10 ? '0' : '') + h)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}
/**得到当前时间之后N秒的时间
 * @param {*} after 多少秒之后的时间
 * @举例 afterNsecond(20)  // 20s之后的时间
 */
export const afterNsecond = function (after = 60) {
  const dt = new Date()
  return new Date(dt.getTime() + after * 1000)
}
/**
 * 将毫秒数转换成天、时、分、秒、毫秒
 * @param {*} leftMs 毫秒数
 * @举例 afterNsecond(60)
 */
 export const sec2Dhs = function (leftMs){
  const d = Math.floor(leftMs / 1000 / 60 / 60 / 24)
  const h = addZero(Math.floor(leftMs / 1000 / 60 / 60 % 24), 2)
  const m = addZero(Math.floor(leftMs / 1000 / 60 % 60), 2)
  const s = addZero(Math.floor(leftMs / 1000 % 60), 2)
  const ms = addZero(Math.floor(leftMs % 1000), 2)
  return { d, h, m, s, ms }
}
/**
 * 根据年和月，得出该年月有多少天。（原理：计算出他的下个月， 用它的下个月生成毫秒数-当前月毫秒数再除以一天的毫秒数===天数）
 * @param {String} whichYear 
 * @param {String} whichMonth 
 * @returns 
 * @举例子 getDays(2021, 11) ---> 30
 */
 export const getDays = function(whichYear, whichMonth) {
  let nextMoth = Number(whichMonth) + 1
  let nextYear = Number(whichYear)
  if (nextMoth === 13) {
    nextMoth = 1
    nextYear++
  }
  let theCurrentDate = whichYear + '-' + whichMonth + '-1'
  let theNextDate = nextYear + '-' + nextMoth + '-1'
  let yearObjOne = new Date(theCurrentDate)
  let yearObjTwo = new Date(theNextDate)
  let milliseconds = yearObjTwo.getTime() - yearObjOne.getTime()
  let daymilliseconds = 3600 * 24 * 1000
  return (milliseconds / daymilliseconds)
}
/*
**********************************************************************************************
******************************************正则校验*********************************************
**********************************************************************************************
*/
/**正则校验返回true || false
 * @param {*} val 需要正则校验的值
 * @param {reg} reg 正则表达式
 * @returns {Boolean}
 */
 export const regTest = (val, reg) => new RegExp(reg).test(val)

/*
**********************************************************************************************
******************************************业务函数*********************************************
**********************************************************************************************
*/
/**
 * 逆转对象。
 * @举例子 invert({ 'a': 1, 'b': 2, 'c': 1 }) -----> {1: 'c', 2: 'b'}
 * @param {*} obj 需要逆转的对象
 * @returns 
 */
 export const invert = obj => Object.keys(obj).reduce((prev, item) => ((prev[obj[item]] = item), prev), {})
 /**
  * 逆转对象。并且重复的键，将对应的值存在一起
  * @举例子 invertBy({ 'a': 1, 'b': 2, 'c': 1 }) -----> {1: ['a', 'c'], 2: ['b']}
  * @param {*} obj 需要逆转并且分类的对象
  * @returns
  */
 export const invertBy = obj => Object.keys(obj).reduce((prev, item) => ((prev[obj[item]] || (prev[obj[item]] = [])).push(item), prev), {})
/**
 * 链表
 */