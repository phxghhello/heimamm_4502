// 导入Vue
import Vue from "vue";
// 导入路由
import VueRouter from "vue-router";
import {
  getToken,
  removeToken
} from '../utils/token.js'
import {
  userInfo
} from '../api/user.js'
// 导入 组件
import login from "../views/login/login.vue";
import index from "../views/index/index.vue";
import {
  Message
} from 'element-ui';

// 注册
Vue.use(VueRouter);
//重写push方法, 屏蔽重复跳转错误
//解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 创建路由对象
const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "/index",
      component: index
    }
  ]
});

//地址白名单
const whitePaths = ['/login']

router.beforeEach((to, from, next) => {
  // 首页才需要判断token
  if (!whitePaths.includes(to.path)) {
    if (!getToken()) {
      Message.error("必须登录才可以访问首页");
      return next("/login");
    }
    // token正确性判断
    userInfo().then(res=>{
      //为什么是 0
        if(res.data.code===0){
            // token验证失效
            Message.error("登录状态有误，请重新登录")
            // 删除错误的token
            removeToken()
            // 跳转去登录页
            next('/login')
        }else{
            // token验证成功
            next('/index')
        }
    })
  } else {
    // 放过去
    next();
  }
});




// 暴露出去
export default router;