<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // 组件的名字 在插件中可以看到 建议写上
  name: "app"
};
</script>

<style>
.app-container {
  height: 100%;
}
</style>
