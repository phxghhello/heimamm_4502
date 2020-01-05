<template>
  <el-container class="index-container">
    <el-header class="header">
      <div class="header-left">
        <i></i>
      </div>
      <div class="header-right"></div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang="less" scoped>
  .index-container{
    height: 100%;
    background-color: #ccc;
    .header{
      height: 60px;
      background-color: #fff;
      box-shadow:0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    }
    .aside{
      height: 100%;
      background-color: skyblue;
    }
  }
</style>