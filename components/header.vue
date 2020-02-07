<template>
  <el-row type="flex"
          class="container"
          justify="space-around">
    <div class="logo">
      <img src="@/static/images/logo.jpg"
           width="156px"
           height="42px">
    </div>
    <div class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/post">旅游攻略</router-link>
      <router-link to="/hotel">酒店</router-link>
      <router-link to="/air">国内机票</router-link>
    </div>
    <div class="user">
      <a href="/user/login">登录/注册</a>
    </div>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.container {
  height: 60px;
  width: 1000px;
  margin: 0 auto;
  .logo {
    margin-right: 20px;
    padding: 8px 0 0;
  }
  .nav {
    flex: 1;
    color: #000;
  }
  .user {
    font-size: 14px;
    color: #666;
  }
  a {
    display: inline-block;
    padding: 0 20px;
    line-height: 60px;
  }
}
.nuxt-link-exact-active {
  background-color: #409eff;
}
</style>