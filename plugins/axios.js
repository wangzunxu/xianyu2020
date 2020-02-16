//错误拦截
import {Message} from "element-ui"
// 拦截页面的所有请求错误，并弹出对应的提示 //data是插件中本来就有的
export default (data) => {
  // console.log(data)
  data.$axios.onError(err=>{
    // console.log(err.response.data)
    const {statusCode,message} = err.response.data
    if(statusCode===400) {
      Message.error(message)
    }
    // 当前请求的token有问题，对于案例的接口：401 token传递是错误的，403没有传token
    if(statusCode===401||statusCode===403) {
      // 跳转到登录页 当前文件不是组件不能用this.$router
      // location.href("") 不推荐
      // 重定向
      // 状态码，跳转路径，完整路径query
      data.redirect(200,'/user/login',{
        returnUrl:data.route.fullPath
      })
    }
  })
}