<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <!-- 左侧 -->
      <div class="left">
        <i class="icon el-icon-s-fold" @click="collapse=!collapse"></i>
        <img class="logo" src="../../assets/index_logo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <img class="avatar" :src="userInfo.avatar" alt />
        <span class="username">{{ userInfo.username }},您好</span>
        <el-button size="small" @click="logout" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- width=auto 宽度自适应 -->
      <el-aside class="my-aside" width="auto">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="collapse"
        >
          <el-menu-item index="1">
            <!-- e-charts -->
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入api方法
import { info, logout } from "../../api/login.js";
//导入token
import { removeToken } from "../../utils/token.js";
export default {
  name: "index",
  data() {
    return {
      userInfo: {},
      collapse: false
    };
  },
  methods: {
    logout() {
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            if (res.data.code === 200) {
              removeToken();
              this.$router.push("/login");
            }
          });
          // this.$message({
          //   type: "success",
          //   message: "退出成功!"
          // });
        })
        .catch(() => {
          // 什么也不用干
          // this.$message({
          //   type: "info",
          //   message: "已取消!"
          // });
        });
    }
  },
  created() {
    info().then(res => {
      // window.console.log(res);
      // 保存数据
      this.userInfo = res.data.data;
      // 头像没有基地址 自己拼接
      this.userInfo.avatar =
        process.env.VUE_APP_BASEURL + "/" + this.userInfo.avatar;
    });
  }
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .my-header {
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
    // background: pink;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  }

  .my-main {
    background: #0094ff;
  }
}
</style>
