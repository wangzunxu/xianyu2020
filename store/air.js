export const state = () => {
  // 点击机票首页搜索按钮的时候，将表单信息传给机票列表侧边栏
  return {
    //历史查询数组
    history:[],
    // 订单详情
    orderDetail:{
      seat_infos: {}
    },
    allPrice:0
  }
}

export const mutations = {
    // 把传入的表单存储到history中
    // 在搜索跳转之前调用方法传值
  setHistory(state,data) {
    state.history.unshift(data)
    // state.history.slice(-5,-1)
    // console.log(state.history)
  },
  // 修改oderInfo的方法
  setOrderDetail(state,data) {
    state.orderDetail = data
  },
  //修改总价格
  setAllPrice(state,data) {
    state.allPrice = data
  }
}