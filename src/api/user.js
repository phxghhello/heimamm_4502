//导入 axios副本
import request from './request.js'
//导入 token工具函数
import {getToken} from '../utils/token.js'

//暴露 用户信息方法
export function userInfo(){
    return request({
        url:'/info',
        method:'get',
        headers:{
            Authorization:getToken()
        },
    })
}