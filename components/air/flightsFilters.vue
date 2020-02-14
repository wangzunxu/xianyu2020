<template>
  <div class="filters">
    <el-row type="flex"
            class="filters-top"
            justify="space-between"
            align="middle">
      <el-col :span="8">
        单程：
        广州 - 上海
        /
        2019-06-17
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
                     value="1"
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
  methods: {
    // 选择机场时候触发
    handleAirport (value) {
      console.log(this.data)
    },

    // 选择出发时间时候触发
    handleFlightTimes (value) {

    },

    // 选择航空公司时候触发
    handleCompany (value) {
      // 筛选符合条件的数据
      var newData = this.data.flights.filter(v => {
        // return后面条件的值如果为true，则返回符合条件的新数组(原数组flights)
        return v.airline_name = value
      })
    },

    // 选择机型时候触发
    handleAirSize (value) {

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