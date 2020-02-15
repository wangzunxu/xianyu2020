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
        <FlightsAside></FlightsAside>
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
import FlightsAside from "@/components/air/flightsAside"
export default {
  components: {
    FlightsListHead, FlightsItem, FlightsFilters, FlightsAside
  },
  data () {
    return {
      // 机票总数据
      flightsData: {
        // 页面加载需要时间，影响子组件数据的传入
        // 给所使用的数据赋空值，避免报错
        info: {},
        flights: [],
        options: {}
      },
      catchFlightsData: {
        info: {},
        flights: [],
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
    },
    getList () {
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
  },
  // watch、data、computed中的变量不用加this
  // watch: {
  //   $route () {
  //     // 请求机票列表数据
  //     // 每次url变化，数据刷新的前，初始化当前显示的页面为1，避免多页影响少页的bug
  //     this.pageIndex = 1
  //     this.getList()
  //   }
  // },
  // 使用导航守卫监听，beforeRouteEnter、beforeRouteUpload、beforeRouteLeave （to，from，next）
  // to将要跳转的页面，from要离开的页面，next（）必须要调用的（理解为执行） 
  // 在当前页面路径改变，但该组件被调复用时调用
  beforeRouteUpdate (to, from, next) {
    // 请求机票列表数据
    //     // 每次url变化，数据刷新的前，初始化当前显示的页面为1，避免多页影响少页的bug
    this.pageIndex = 1
    this.getList();
    next()
  },
  mounted () {
    // 请求机票列表数据
    this.getList()
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