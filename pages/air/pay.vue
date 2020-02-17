<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额 <span class="pay-price">￥ {{$store.state.air.allPrice}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex"
                justify="space-between"
                align="middle"
                class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg"
                 alt="">
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 导入生成二维码的插件
import QRCode from "qrcode"
export default {
  data () {
    return {
      // 订单详情
      orderDetial: {}
    }
  },
  mounted () {
    // 请求支付数据
    // 组件加载比仓库快，组件加载过程中使用到仓库的token，但是仓库还没加载完。延迟使用仓库中的token可以解决问题
    //第一次进入支付页面，因为前面的页面已经加载过了token，所以不会报错，但是刷新以后所有组件重新加载就会出现这个问题 
    // mounted中使用仓库加setTimeout
    setTimeout(() => {
      this.$axios({
        url: 'airorders/' + this.$route.query.id,
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        this.orderDetial = res.data
        // console.log(res)
        //付款二维码的链接
        const { code_url } = this.orderDetial.payInfo
        const canvas = document.getElementById("qrcode-stage")
        //第一个参数dom元素，要渲染的地方 
        // 第二个参数，要生成为二维码的链接 
        // 第三个参数（可选），样式设置
        QRCode.toCanvas(canvas, code_url, {
          width: 200
        })
      })
    }, 0)
  }
}
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>