//定义token的属性名
const KEY = 'mmtoken'

//暴露 保存token的方法
export function setToken(token){
    window.localStorage.setItem(KEY,token)
}

//暴露 获取token的语法
export function getToken(){
    return window.localStorage.setItem(KEY)
}

//暴露 删除token的方法
export function removeToken(){
    window.localStorage.removeItem(KEY)
}