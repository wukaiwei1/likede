// 自定义指令
export const imgError = {
  inserted(el, binding) {
    // 图片加载失败事件
    // 图片路径为空
    if (el.src.length === 0) {
      el.src = binding.value
    }
    el.onerror = () => {
      el.src = binding.value
    }
  },
  update(el, binding) {
    // 图片加载失败事件
    // 图片路径为空
    if (el.src.length === 0) {
      el.src = binding.value
    }
    el.onerror = () => {
      el.src = binding.value
    }
  },
}
