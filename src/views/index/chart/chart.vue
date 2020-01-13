<template>
  <div class="chart-container">
    <el-card class="header-card">
      <ul class="circle-box">
        <li class="circle-item">
          <div class="circle primary">0</div>
          <span>今日新增用户</span>
        </li>
        <li class="circle-item">
          <div class="circle primary">1</div>
          <span>今日新增用户</span>
        </li>
        <li class="circle-item">
          <div class="circle warning">2</div>
          <span>总用户量</span>
        </li>
        <li class="circle-item">
          <div class="circle warning">3</div>
          <span>新增试题</span>
        </li>
        <li class="circle-item">
          <div class="circle success">4</div>
          <span>总试题量</span>
        </li>
        <li class="circle-item">
          <div class="circle success">5</div>
          <span>今日新增用户</span>
        </li>
      </ul>
    </el-card>
    <el-card class="body-card"></el-card>
  </div>
</template>

<script>
export default {
  name: "chart"
};
</script>

<style lang="less">
.chart-container {
  .header-card {
    height: 149px;
    margin-bottom: 20px;
    .el-card__body {
      padding-top: 10px;
    }
    .circle-box {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .circle {
        width: 99px;
        height: 99px;
        border: 2px solid black;
        border-radius: 50%;
        font-size: 35px;
        text-align: center;
        line-height: 99px;

        &.primary {
          border-color: #0086fa;
          color: #0086fa;
        }
        &.warning {
          border-color: #f76137;
          color: #f76137;
        }
        &.success {
          border-color: #55cd78;
          color: #55cd78;
        }
      }
      .circle-item {
        span {
          font-size: 16px;
          margin-top: 10px;
          color: #737373;
          display: block;
          margin-top: 10px;
          text-align: center;
        }
      }
    }
  }
}
</style>