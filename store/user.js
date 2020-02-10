export const state = ()=> ({
  userInfo: {
    token:"",
    user: {}
  }
})
export const mutations = {
  //保存用户信息到state
  setUserInfo(state,data) {
    state.userInfo = data
  }
}
export const actions = {
  login({commit},data) {
    return this.$axios({
      method:"POST",
      url:"/accounts/login",
      data
    }).then(res=>{
      const data = res.data
      //保存到state
      commit("setUserInfo",data);
      return data
    })
  },
   handleSendCaptcha(store,data) {
    return this.$axios({
      method: "POST",
      url: "/captchas",
      data: {
        tel: data
      }
    })
  }
}