/**
 * 节流函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间(ms)
 * @returns {Function} - 节流后的函数
 */
export const throttle = (fn, delay = 100) => {
  let timer = null
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    const remaining = delay - (now - lastTime)
    
    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = now
      fn.apply(this, args)
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = null
        lastTime = Date.now()
        fn.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * 防抖函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间(ms)
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} - 防抖后的函数
 */
export const debounce = (fn, delay = 100, immediate = false) => {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    
    if (immediate && !timer) {
      fn.apply(this, args)
    }
    
    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(this, args)
      }
      timer = null
    }, delay)
  }
}
