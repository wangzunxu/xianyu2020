<template>
  <div class="filters">
    <el-row type="flex"
            class="filters-top"
            justify="space-between"
            align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini"
                   v-model="airport"
                   placeholder="起飞机场"
                   @change="handleAirport">
          <el-option :label="item"
                     :value="item"
                     v-for="(item,index) in data.options.airport"
                     :key="index">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini"
                   v-model="flightTimes"
                   placeholder="起飞时间"
                   @change="handleFlightTimes">
          <el-option :label="`${item.from}:00 - ${item.to}:00`"
                     :value="`${item.from},${item.to}`"
                     v-for="(item,index) in data.options.flightTimes"
                     :key="index">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini"
                   v-model="company"
                   placeholder="航空公司"
                   @change="handleCompany">
          <el-option :label="item"
                     :value="item"
                     v-for="(item,index) in data.options.company"
                     :key="index">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini"
                   v-model="airSize"
                   placeholder="机型"
                   @change="handleAirSize">
          <el-option :label="item.label"
                     :value="item.value"
                     v-for="(item,index) in airSizeList"
                     :key="index">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary"
                 round
                 plain
                 size="mini"
                 @click="handleFiltersCancel">
        撤销
      </el-button>
    </div>
    <!-- 渲染空的字符串，只需监听功能 -->
    <span>{{filter}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      airport: "",        // 机场
      flightTimes: "",    // 出发时间
      company: "",        // 航空公司
      airSize: "",        // 机型大小
      airSizeList: [
        {
          label: "大", value: "L"
        },
        {
          label: "中", value: "M"
        },
        {
          label: "小", value: "S"
        },
      ]
    }
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    filter () {
      const newData = this.data.flights.filter(v => {
        //假设当前数据符合条件
        var vaild = true
        // 找到不符合条件的
        // 公司
        if (this.company && v.airline_name !== this.company) {
          vaild = false
        }
        // 机场
        if (this.airport && v.org_airport_name !== this.airport) {
          vaild = false
        }
        // 机型
        if (this.airSize && v.plane_size !== this.airSize) {
          vaild = false
        }
        // 起飞时间
        if (this.flightTimes) {
          // 选中的时间段
          const arr = this.flightTimes.split(",")
          //当前航班小时
          const hour = Number(v.dep_time.split(":")[0]);
          if (Number(arr[0] > hour) || hour >= Number(arr[1]))
            vaild = false
        }
        return vaild
      })
      this.$emit("getData", newData)
      return ""
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport (value) {
      // console.log(this.data)
      // var newData = this.data.flights.filter(v => {
      //   return v.org_airport_name === value
      // })
      // this.$emit("getData", newData)
    },

    // 选择出发时间时候触发
    handleFlightTimes (value) {
      // 筛选符合条件的数据
      // var time = value.split(",")
      // var newData = this.data.flights.filter(v => {
      //   // return后面条件的值如果为true，则返回符合条件的新数组(原数组flights)
      //   // 出发的小时
      //   var start = Number(v.dep_time.split(":")[0]);

      //   return Number(time[0]) < start && Number(time[1])
      // })
      // this.$emit("getData", newData)
    },

    // 选择航空公司时候触发
    handleCompany (value) {
      // 筛选符合条件的数据
      // var newData = this.data.flights.filter(v => {
      //   // return后面条件的值如果为true，则返回符合条件的新数组(原数组flights)
      //   return v.airline_name === value
      // })
      // // console.log(newData)
      // this.$emit("getData", newData)
    },

    // 选择机型时候触发
    handleAirSize (value) {
      // // 筛选符合条件的数据
      // var newData = this.data.flights.filter(v => {
      //   // return后面条件的值如果为true，则返回符合条件的新数组(原数组flights)
      //   return v.plane_size === value
      // })
      // // console.log(newData)
      // this.$emit("getData", newData)
    },

    // 撤销条件时候触发
    handleFiltersCancel () {

    },
  },
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>