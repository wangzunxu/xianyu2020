<template>
  <section class="contianer">
    <el-row type="flex"
            justify="space-between">

      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- 父传子 传入机票总数据 -->
        <FlightsFilters :data="catchFlightsData"
                        @getData="getData"></FlightsFilters>
        <div>

        </div>

        <!-- 航班头部布局 -->
        <FlightsListHead></FlightsListHead>

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList"
                     :key="index"
                     :data="item"></FlightsItem>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="margin-top:10px;">
      <!-- 分页组件 -->
      <!-- size-change切换条数时候触发的事件 -->
      <!-- current-change切换页数时候触发的事件 -->
      <!-- current-page 当前页数 -->
      <!-- total 总页数 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageIndex"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="flightsData.total">
      </el-pagination>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead"
import FlightsItem from "@/components/air/flightsItem"
import FlightsFilters from "@/components/air/flightsFilters"
export default {
  components: {
    FlightsListHead, FlightsItem, FlightsFilters
  },
  data () {
    return {
      // 机票总数据
      flightsData: {
        // 页面加载需要时间，影响子组件数据的传入
        // 给所使用的数据赋空值，避免报错
        info: {},
        options: {}
      },
      catchFlightsData: {
        info: {},
        options: {}
      },
      // opt: {
      //   airport: []
      // },
      // 当前页数
      pageIndex: 1,
      pageSize: 5,
    }
  },
  // computed监视函数内部是否发生变化，如果发生变化，重新计算，并返回新的值
  computed: {
    // 当前要展示的数据数组
    dataList () {
      if (!this.flightsData.flights) {
        return []
      }
      const arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      ) //slice切割返回包含0不包含5索引
      return arr
    }
  },
  methods: {
    handleSizeChange (value) {
      this.pageSize = value

    },
    handleCurrentChange (value) {
      this.pageIndex = value
    },
    // arr是过滤后的数组
    getData (arr) {
      this.flightsData.flights = arr
      this.flightsData.total = arr.length
    }
  },
  mounted () {
    // 请求机票列表数据
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      this.flightsData = res.data
      // this.opt = res.data.options
      // console.log(this.opt)
      this.catchFlightsData = { ...res.data }
    })
  }
}
</script>

<style lang="less" scoped>
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>