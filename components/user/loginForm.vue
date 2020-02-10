<template>
  <el-form :model="ruleForm"
           :rules="rules"
           ref="ruleForm"
           class="form">
    <el-form-item prop="username"
                  class="form-item">
      <el-input v-model="ruleForm.username"
                class="form-text"
                placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item prop="password"
                  class="form-item">
      <el-input v-model="ruleForm.password"
                class="form-text"
                placeholder="密码"
                type="password"></el-input>
    </el-form-item>
    <el-form-item class="form-item">
      <el-button type="primary"
                 class="submit"
                 @click="handleLoginSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        username: '13800138000',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLoginSubmit () {
      //表单验证
      this.$refs.ruleForm.validate((vaild) => {
        //使用仓库里的方法进行登录操作
        this.$store.dispatch("user/login", this.ruleForm).then(() => {
          //成功提示
          this.$message({
            message: "登录成功，正在跳转",
            type: "success"
          })
          setTimeout(() => {
            this.$router.replace("/")
          }, 2000)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
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