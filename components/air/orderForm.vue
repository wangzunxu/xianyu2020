<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item"
             v-for="(item,index) in form.users"
             :key="index">

          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名"
                      class="input-with-select"
                      v-model="form.users[index].username">
              <el-select slot="prepend"
                         value="1"
                         placeholder="请选择">
                <el-option label="成人"
                           value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码"
                      class="input-with-select"
                      v-model="form.users[index].id">
              <el-select slot="prepend"
                         value="1"
                         placeholder="请选择">
                <el-option label="身份证"
                           value="1"
                           :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user"
                @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member"
                 type='primary'
                 @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item"
             v-for="(item,index) in infoData.insurances"
             :key="index">
          <el-checkbox :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
                       border
                       @change="handleInsurance(item.id)">
          </el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容"
                      v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning"
                   class="submit"
                   @click="handleSubmit">提交订单</el-button>
      </div>
      {{allPrice}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 后台需要的数据
      form: {
        users: [
          { username: '', id: '' }//不能为空
        ],//用户列表
        insurances: [],//保险id 可以为空
        contactName: '',//联系人名字
        contactPhone: '',//联系电话
        captcha: '',
        invoice: false,//是否需要发票
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      },
      //当前机票的详细信息
      infoData: {}
    }
  },
  computed: {
    // 计算总价格
    allPrice () {
      // 判断是否有数据
      if (!this.infoData.seat_infos) return
      let price = 0;
      // 票价
      price += this.infoData.seat_infos.org_settle_price;
      // 燃油费
      price += this.infoData.airport_tax_audlet;
      // 保险
      this.infoData.insurances.forEach(v => {
        //判断保险的id是否在数组里
        if (this.form.insurances.indexOf(v.id) > -1) {   //数组.indexOf(id) id不存在返回-1，否则返回0
          price += v.price
        }
      })
      //人数
      price *= this.form.users.length
      this.$store.commit("air/setAllPrice", price)
      return '';
    }
  },
  mounted () {
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: "/airs/" + id,
      params: {
        seat_xid
      }
    }).then(res => {
      //赋值给机票详细信息
      this.infoData = res.data

      // 把订单详情存到store
      this.$store.commit("air/setOrderDetail", this.infoData)
    })
  },
  methods: {
    // 添加乘机人
    handleAddUsers () {
      this.form.users.push({
        username: '',
        id: ''
      })
    },
    handleInsurance (id) {
      //先判断数组中是否存在该id，如果存在说明这个操作是要取消，反之，添加
      const index = this.form.insurances.indexOf(id);
      if (index > -1) {
        // 删除此id
        this.form.insurances.splice(index, 1)
      } else {
        // 没有次id，就添加进数组
        this.form.insurances.push(id)
      }
    },

    // 移除乘机人
    handleDeleteUser (index) {
      this.form.users.splice(index, 1)  //split切割 splice... slice分割 sbtstr...
    },

    // 发送手机验证码
    handleSendCaptcha () {
      // 判断手机号码是否填写
      if (!this.form.contactPhone) {
        this.$message.error("手机号码不能为空")
        return
      }
      this.$store.dispatch('user/handleSendCaptcha', this.form.contactPhone).then(res => {
        this.$message.success("验证码发送成功：000000")
      })
    },

    // 提交订单
    handleSubmit () {
      // 自定义表单验证
      const rules = {
        // 校验用户信息
        users: {
          errorMessage: "乘机人信息不能为空",
          //返回值是true通过，否则失败
          validator: () => {
            var valid = true
            // 两个属性只要有一个是空的就判断不通过
            this.form.users.forEach(v => {
              if (!v.username || !v.id) {
                valid = false
              }
            })
            return valid
          }
        },
        // 校验联系人
        contactName: {
          errorMessage: "联系人不能为空",
          validator: () => {
            return !!this.form.contactName
          }
        },
        // 校验手机号码
        contactName: {
          errorMessage: "手机号码不能为空",
          validator: () => {
            return !!this.form.contactPhone
          }
        },
        // 校验验证码
        contactName: {
          errorMessage: "验证码不能为空",
          validator: () => {
            return !!this.form.captcha
          }
        }
      }
      //循环rules对象，判断信息是否全部验证通过
      // Object.keys返回对象中的key（返回一个由对象中所有属性的key组成的数组） 可以用for in
      let valid = true
      Object.keys(rules).forEach(v => {
        // 假设所有的校验都是通过的
        if (!valid) return;   //forEach map filter 不能用breake中断 for循环可以  return只阻止后面代码的解析，不中断循环  
        const item = rules[v]
        valid = item.validator();//validator是个函数要加（）
        if (!valid) {
          this.$message.error(item.errorMessage)
        }
      })
      // 如果没全部通过就不执行，否则，提交代码
      if (!valid) return
      // 提交订单
      this.$axios({
        url: "/airorders",
        method: "POST",
        data: this.form,
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        // console.log(res)
        this.$message.success("订单提交成功")
        // 延迟1.5秒跳转到付款页
        setTimeout(() => {
          this.$router.push({
            path: '/air/pay',
            query: {
              id: res.data.data.id
            }
          })
        }, 1500)

      })
    }
  }
}
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>