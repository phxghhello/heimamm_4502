<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <!-- 左侧 -->
      <div class="left">
        <i class="icon el-icon-s-fold"></i>
        <img class="logo" src="../../assets/index_logo.png" alt="" />
        <span class="title">黑马面面</span>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <img class="avatar" :src="userInfo.avatar" alt="" />
        <span class="username">{{ userInfo.username }},您好</span>
        <el-button size="small" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="my-aside" width="200px">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入api方法
import { info } from "../../api/login.js";
export default {
  name: "index",
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    info().then(res => {
      // window.console.log(res);
      // 保存数据
      this.userInfo = res.data.data;
      // 头像没有基地址 自己拼接
      this.userInfo.avatar = process.env.VUE_APP_BASEURL +'/'+ this.userInfo.avatar;
    });
  }
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .my-header {
    background: yellow;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .icon {
        font-size: 24px;
        margin-right: 22px;
      }
      .logo {
        margin-right: 11px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
        font-weight: 400;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .username {
        font-size: 14px;
        color: #636363;
        margin-right: 38px;
      }
    }
  }
  .my-aside {
    background: pink;
  }
  .my-main {
    background: #0094ff;
  }
}
</style>
