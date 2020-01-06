// 导入axios
import axios from "axios";
import {getToken} from "../utils/token.js"

// 定义一个登陆的方法 并暴露出去
export function login(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/login",
    method: "post",
    // 跨域 是否携带 cookie
    withCredentials: true,
    data // data: data
  });
}

// 定义一个 获取短信的 方法 并暴露出去
export function sendsms(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/sendsms",
    method: "post",
    // 跨域 是否携带 cookie
    withCredentials: true,
    data // data: data
  });
}
// 定义一个 用户注册的 方法 并暴露出去
export function register(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/register",
    method: "post",
    // 跨域 是否携带 cookie
    withCredentials: true,
    data // data: data
  });
}


// 获取用户信息
export function info() {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/info",
    method: "get",
    // 跨域 是否携带 cookie
    withCredentials: true,
    headers:{
      // 从缓存中获取
      // token:window.localStorage.getItem("heimammtoken")
      token:getToken()

    }
  });
}

//退出登录
export function logout() {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/logout",
    method: "get",
    // 跨域 是否携带 cookie
    withCredentials: true,
    headers:{
      // 从缓存中获取
      token:getToken()
    }
  });
}