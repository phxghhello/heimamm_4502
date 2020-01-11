// 导入Vue
import Vue from "vue";
// 导入路由
import VueRouter from "vue-router";

// 导入 组件
// 注册组件
import login from "../views/login/login.vue";
// 首页组件
import index from "../views/index/index.vue";
// 导入index页面的子组件
import chart from '../views/index/chart/chart.vue'
import user from '../views/index/user/user.vue'
import question from '../views/index/question/question.vue'
import enterprise from '../views/index/enterprise/enterprise.vue'
import subject from '../views/index/subject/subject.vue'
//导入token
import {
  getToken,removeToken
} from '@/utils/token.js'
//导入信息框
import {
  Message
} from 'element-ui';
//导入获取用户信息的接口
import {
  info
} from '@/api/login.js'
// 导入仓库
import store from "@/store/store.js";
// 注册
Vue.use(VueRouter);

// 创建路由对象
const router = new VueRouter({
  routes: [{
      path: "/login",
      component: login
    },
    {
      path: "/index",
      component: index,
      redirect: "/index/subject",
      meta: {
        roles: ["超级管理员", "管理员", "老师", "学生"]
      },
      children: [{
          path: "chart",
          component: chart,
          meta: {
            roles: ["超级管理员", "管理员", "老师"]
          }
        },
        {
          path: "user",
          component: user,
          meta: {
            roles: ["超级管理员", "管理员"]
          }
        },
        {
          path: "question",
          component: question,
          meta: {
            roles: ["超级管理员", "管理员", "老师"]
          }
        },
        {
          path: "enterprise",
          component: enterprise,
          meta: {
            roles: ["超级管理员", "管理员", "老师"]
          }
        },
        {
          path: "subject",
          component: subject,
          meta: {
            roles: ["超级管理员", "管理员", "老师", "学生"]
          }
        },
      ],
    }
  ]
});

//定义路由白名单--不需要token即可访问的页面
const whitePaths = ['/login'];
//导航守卫
router.beforeEach((to, from, next) => {
  if (whitePaths.includes(to.path.toLocaleLowerCase())) {
    next()
  } else {
    //判断有无token
    const token = getToken();
    //没有token
    if (token == null) {
      //提示用户请先登录
      Message.warning("请登录");
      next('/login');
    } else {
      //本地有token ->判断token的对错->需要调用用户信息的接口校验token的正误
      info().then(res => {
        //token错误
        if (res.code == 206) {
          //提示用户请先登录
          Message.warning("token无效,请登录");
          removeToken();
          next('/login');
        } else {
          //判断用户状态是禁用还是启用
          if (res.data.status == 0) {
            Message.warning("被禁用中,请联系管理员启用");
          } else {
            
            if (to.meta.roles.includes(res.data.role)) {
              if (from.path==="/login" &&to.path==="/index/subject") {
                Message.success("老铁，你可算回来啦！！！");
              }
              next();
              // 保存数据
              store.state.userInfo = res.data;
              store.state.userInfo.avatar = process.env.VUE_APP_BASEURL + "/" + store.state.userInfo.avatar;
            } else {
              Message.warning("您没有访问的权限");
            }

          }
        }
      });
    }
  }

})

// 暴露出去
export default router;