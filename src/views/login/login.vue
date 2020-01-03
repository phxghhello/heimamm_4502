<template>
  <div class="login-container">
    <!-- 左侧的盒子 -->
    <div class="left">
      <!-- 标题盒子 -->
      <div class="title-box">
        <img src="../../assets/logo.png" alt="">
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
    </div>
    <!-- 右边的图片 -->
    <img class="bg" src="../../assets/login_banner_ele.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="less">
.login-container {
  display: flex;
  /* 侧轴方向 居中 */
  align-items: center;
  /* 线型渐变 */
  background: linear-gradient(225deg, rgba(1, 198, 250, 1), rgba(20, 147, 250, 1));
  /* 主轴方向 均分 */
  justify-content: space-around;
  height: 100%;
  .left {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 44px;
    // 盒模型 让padding不会撑开盒子
    box-sizing: border-box;
    // 标题盒子
    .title-box{
      display: flex;
      // 上下居中
      align-items: center;
      margin-left: 48px;
      img{
        margin-right: 16px;
        width: 22px;
        height: 17px;
      }
      .title{
        font-size:24px;
        font-weight: 400;
        margin-right: 14px;
      }
      .line{
        width: 1px;
        background-color: #dfdfdf;
        margin-right: 12px;
        height: 28px;
      }
      .sub-title{
        font-size: 22px;
        font-weight: 400;

      }
    }
  }
  .bg {
  }
}
</style>
