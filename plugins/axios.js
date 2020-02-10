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
  })
}