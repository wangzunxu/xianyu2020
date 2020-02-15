export const store = () => {
  // 点击机票首页搜索按钮的时候，将表单信息传给机票列表侧边栏
  return {
    //历史查询数组
    history:[]
  }
}

export const mutations = {
    // 把传入的表单存储到history中
  setHistory(state,data) {
    state.history.push(data)
  }
}