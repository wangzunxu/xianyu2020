<template>
  <div class="search-form">

    <!-- 头部tab切换 -->
    <el-row type="flex"
            class="search-tab">
      <span v-for="(item, index) in tabs"
            :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
        <i :class="item.icon"></i>{{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content"
             ref="form"
             label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 监听输入框的输入 输入框变化的时候触发queryDepartSearch函数  在这个事件中请求api数据-->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete :fetch-suggestions="queryDepartSearch"
                         placeholder="请搜索出发城市"
                         @select="handleDepartSelect"
                         class="el-autocomplete"
                         v-model="form.departCity"
                         @blur="handleDepartBlur"></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete :fetch-suggestions="queryDestSearch"
                         placeholder="请搜索到达城市"
                         @select="handleDestSelect"
                         class="el-autocomplete"
                         v-model="form.destCity"
                         @blur="handleDestBlur"></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker type="date"
                        placeholder="请选择日期"
                        style="width: 100%;"
                        @change="handleDate"
                        v-model="form.departDate">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button style="width:100%;"
                   type="primary"
                   icon="el-icon-search"
                   @click="handleSubmit">
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment"
export default {
  data () {
    return {
      form: {
        departCity: '',
        departCode: '',
        destCity: '',
        destCode: '',
        departDate: ''
      },
      // 出发城市列表
      newDataDepart: [],
      newDataDest: [],
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
    }
  },
  methods: {
    // tab切换时触发
    handleSearchTab (item, index) {
      if (index === 1) {
        this.$alert("目前暂不支持往返，请使用单程选票", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        })
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch (value, cb) {
      if (!value) {
        //如果value是空的，把原来的列表清空
        this.newDataDepart = []
        // cb传入空数组，不会出现空白加载
        cb([])
        return
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // 将数组中的data传给cb展示，data中没有value值，改造数据添加
        const { data } = res.data
        const newData = data.map(v => { //v是数组中的各项
          v.value = v.name.replace("市", "");
          // map返回的数组由return组成
          return v;
        })
        this.newDataDepart = newData
        cb(newData)
      })
      //cb 展示数组内容在列表
    },
    // 出发城市输入框失焦的时候触发，默认选择第一个
    handleDepartBlur () {
      if (this.newDataDepart.length === 0) {
        return;
      }
      this.form.departCity = this.newDataDepart[0].value
    },
    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch (value, cb) {
      if (!value) {
        this.newDataDest = []
        cb([])
        return
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // 将数组中的data传给cb展示，data中没有value值，改造数据添加
        const { data } = res.data
        const newData = data.map(v => { //v是数组中的各项
          v.value = v.name.replace("市", "");
          // map返回的数组由return组成
          return v;
        })
        this.newDataDest = newData
        cb(newData)
      })
      //cb 展示数组内容在列表
    },
    //目标城市失焦时触发的事件
    handleDestBlur () {
      if (this.newDataDest.length === 0) {
        return
      }
      this.form.destCity = this.newDataDest[0].value

    },
    // 出发城市下拉选择时触发
    handleDepartSelect (item) {
      this.form.departCity = item.value
      this.form.departCode = item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect (item) {
      this.form.destCity = item.value
      this.form.destCode = item.sort
    },

    // 确认选择日期时触发
    handleDate (value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD")
    },

    // 触发和目标城市切换时触发
    handleReverse () {
      const { departCity, departCode, destCity, destCode } = this.form
      this.form.departCity = destCity
      this.form.departCode = destCode
      this.form.destCity = departCity
      this.form.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit () {
      // console.log(this.form)
      if (!this.form.departCity) {
        this.$message.error("请输入出发城市")
        return;
      }
      if (!this.form.destCity) {
        this.$message.error("请输入到达城市")
        return;
      }
      if (!this.form.departDate) {
        this.$message.error("请输入出发时间")
        return;
      }
      this.$router.push({
        path: '/air/flights',
        //query是url的参数
        query: this.form
      })
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: '';
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: '';
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>