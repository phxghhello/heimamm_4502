import request from './request.js'

//面板数据
export function dataTitle() {
    return request({
        url: "/data/title",
        method: "post",
    });
}

//企业题目数据统计
export function dataStatistics() {
    return request({
        url: "/data/statistics",
        method: "post",
    });
}

//热门城市题目统计
export function dataHotcities() {
    return request({
        url: "/data/hot_cities",
        method: "post",
    });
}