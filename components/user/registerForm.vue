<template>
  <el-form :model="form"
           ref="form"
           :rules="rules"
           class="form">
    <el-form-item class="form-item"
                  prop="username">
      <el-input placeholder="用户名/手机"
                v-model="form.username">
      </el-input>
    </el-form-item>

    <el-form-item class="form-item"
                  prop="captcha">
      <el-input placeholder="验证码"
                v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item"
                  prop="nickname">
      <el-input placeholder="你的名字"
                v-model="form.nickname">
      </el-input>
    </el-form-item>

    <el-form-item class="form-item"
                  prop="password">
      <el-input placeholder="密码"
                type="password"
                v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item"
                  prop="checkPassword">
      <el-input placeholder="确认密码"
                type="password"
                v-model="form.checkPassword">
      </el-input>
    </el-form-item>

    <el-button class="submit"
               type="primary"
               @click="handleRegSubmit">
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword');
        }
        callback();
      }
    };
    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: '',
        captcha: '',
        nickname: '',
        password: '',
        checkPassword: ''
      },
      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        captcha: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
        nickname: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkPassword: [
          {
            validator: validateCheckPass,
            trigger: 'blur'
          }
        ]
      },
    }
  },
  methods: {
    // 发送验证码
    handleSendCaptcha () {
      if (!this.form.username) {
        this.$confirm('手机号码不能为空', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
        return
      }
      if (!/^[1][3-9][0-9]{9}$/.test(this.form.username)) {
        this.$confirm('手机号码格式错误', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
        return
      }
      this.$store.dispatch("user/handleSendCaptcha", this.form.username).then(res => {
        this.$message({
          message: `验证码是：${res.data.code}`,
          type: "success"
        })
      })
    },


    // 注册
    handleRegSubmit () {
      //验证表单
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          //删除不需要的信息(确认密码)
          const { checkPassword, ...props } = this.form
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: props
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                message: "注册成功,已帮您登录",
                type: "success"
              })
              this.$store.commit("user/setUserInfo", res.data)
              this.$router.push("/")
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>