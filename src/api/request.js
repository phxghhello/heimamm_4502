import axios from 'axios'
import {
    getToken
} from '../utils/token.js'
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域 是否携带 cookie
    withCredentials: true,
})

//拦截器
//添加请求拦截器
instance.interceptors.request.use(function (config) {
    config.headers.token = getToken()
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default instance