<template>
  <div class="container">
    <div class="block">
      <el-carousel height="700px">
        <el-carousel-item v-for="(item,index) in banners"
                          :key="index"
                          :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat; background-size:contain contain`">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banners: []
    }
  },
  mounted () {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // console.log(res)
      this.banners = res.data.data
      console.log(this.banners)
    })
  }
}
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>