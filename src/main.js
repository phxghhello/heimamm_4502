import Vue from 'vue'
import App from './App.vue'
// 导入路由对象
import router from './router/index.js'
// 导入 饿了么 ui的库
import ElementUI from 'element-ui';
// 导入 饿了么 的css
import 'element-ui/lib/theme-chalk/index.css';
// 导入自己的初始化样式
import './style/base.css'

// 注册 饿了么 ui
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载 注入 Vue实例
  router
}).$mount('#app')
