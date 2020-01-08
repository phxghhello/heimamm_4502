// 导入axios
// import axios from "axios";
import request from './request.js'

// 定义一个登陆的方法 并暴露出去
export function login(data) {
  return request({
    url:"/login",
    method: "post",
    data // data: data
  });
}

// 定义一个 获取短信的 方法 并暴露出去
export function sendsms(data) {
  return request({
    url:"/sendsms",
    method: "post",
    data // data: data
  });
}
// 定义一个 用户注册的 方法 并暴露出去
export function register(data) {
  return request({
    url:"/register",
    method: "post",
    data 
  });
}


// 获取用户信息
export function info() {
  return request({
    url:"/info",
    method: "get",
  });
}

//退出登录
export function logout() {
  return request({
    url:"/logout",
    method: "get",
  });
}