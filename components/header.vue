<template>
  <el-row type="flex"
          class="container"
          justify="space-around">
    <div class="logo">
      <img src="@/static/images/logo.jpg"
           width="156px"
           height="42px">
    </div>
    <el-row type="flex"
            class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/post">旅游攻略</router-link>
      <router-link to="/hotel">酒店</router-link>
      <router-link to="/air">国内机票</router-link>
    </el-row>
    <div class="user"
         v-if="!$store.state.user.userInfo.token">
      <a href="/user/login"
         style="height:60px;line-height:60px"> 登录/注册</a>
    </div>
    <el-dropdown v-if="$store.state.user.userInfo.token"
                 @command="handleCommand">
      <el-row type="flex"
              align="middle"
              class="el-dropdown-link"
              style="height:60px;line-height:60px">
        <nuxt-link to="#">
          <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"
               width="36px"
               height="36px"
               style="margin:24px 10px 0 0" />
        </nuxt-link>
        {{$store.state.user.userInfo.user.nickname}}
        <i class="el-icon-caret-bottom el-icon--right">
        </i>
        <el-dropdown-menu>
          <el-dropdown-item command="">个人中心</el-dropdown-item>
          <el-dropdown-item command="a">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-row>
      <!-- 其他代码... -->
    </el-dropdown>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleCommand (command) {
      this.$store.commit("user/setUserInfo", {})
      this.$message({
        message: "退出成功",
        type: "success"
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 60px;
  width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  .logo {
    margin-right: 20px;
    padding: 8px 0 0;
  }
  .nav {
    flex: 1;
    color: #000;
    a {
      display: block;
      padding: 0 20px;
      line-height: 60px;
      box-sizing: border-box;
      &:hover,
      &:focus,
      &:active {
        border-bottom: #409eff 5px solid;
        color: #409eff;
      }
    }
    a.nuxt-link-exact-active {
      color: #fff;
    }
  }
  .user {
    font-size: 14px;
    color: #666;
  }
}
.nuxt-link-exact-active {
  background-color: #409eff;
  color: #fff;
}
</style>