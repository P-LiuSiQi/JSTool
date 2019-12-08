/**
 * 深拷贝
 * @param {object} obj 进行深拷贝的对象
 */
function deepClone(obj = {}) {
  if (typeof obj == null || typeof obj !== 'object') {
    return obj
  }

  // 初始化返回结果
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }
  for (let item in obj) {
    // 判断是否是对象本身的属性
    if (obj.hasOwnProperty(item)) {
      result[item] = deepClone(obj[item]);
    }
  }

  // 返回结果
  return result
}

/**
 * @description 防抖函数
 *
 * @param func 回调函数
 * @param wait 延迟执行时间（ 毫秒）
 * @param immediate true立即执行（前沿触发），false非立即执行（后沿触发）
 */
function debounce(func, wait, immediate) {
  let timeout

  return function () {
    let that = this // 将当前作用域的函数保存起来，以便闭包执行时，仍能够访问到当前函数。
    let args = arguments // 保存参数对象，原因同上。

    if (timeout) clearTimeout(timeout) // timeout是定时器ID，只有初始化状态下第一次触发的时候才不会执行；

    if (immediate) {
      let isFirst = !timeout // true 第一次执行

      timeout = setTimeout(() => {
        timeout = null // 如果周期内db函数未触发，则重新初始化timeout
      }, wait);
      if (isFirst) func.apply(that, args) // 初始化状态下，立即执行事件函数。
    } else {
      timeout = setTimeout(() => { // 在周期内函数被触发会更新定时器，延迟事件函数的执行。
        func.apply(that, args)
      }, wait);
    }
  }
}

/**
 * @description 节流函数
 *
 * @param func 回调函数
 * @param wait 时间（毫秒）
 * @param type 1 表示时间戳版（前沿触发），2 表示定时器版（后沿触发）
 */
function throttle(func, wait, type) {
  if (type === 1) {
    var previous = 0
  } else if (type === 2) {
    var timeout
  }

  return function () {
    let that = this
    let args = arguments
    if (type === 1) {
      let now = new Date()
      if (now - previous > wait) {
          func.apply(that, args)
          previous = now
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(that, args)
        }, wait);
      }
    }
  }
}