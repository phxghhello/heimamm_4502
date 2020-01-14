import request from './request.js'

//面板数据接口
export function chatTitle() {
    // 调用接口
    return request({
        url: process.env.VUE_APP_BASEURL + "/data/title",
        method: "post",
    })
}

//企业题目数据统计
export function enterpriseData() {
    // 调用接口
    return request({
        url: process.env.VUE_APP_BASEURL + "/data/statistics",
        method: "post",
    })
}

//热门城市题目统计
export function dataCities() {
    // 调用接口
    return request({
        url: process.env.VUE_APP_BASEURL + "/data/hot_cities",
        method: "post",
    })
}
