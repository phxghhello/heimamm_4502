//导入axios请求对象
import request from './request.js'

//暴露登录的接口
export function login(data){
    return request({
        url:"/login",
        method:"post",
        data,
    })
}

//暴露短信的接口
export function sendsms(data){
    return request({
        url:"/sendsms",
        method:"post",
        data
    })
}

//暴露注册的接口
export function register(data){
    return request({
        url:"/register",
        method:"post",
        data
    })
}