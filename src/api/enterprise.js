import request from './request.js'

//企业列表
export function enterpriseList(params) {
    return request({
        url: "/enterprise/list",
        method: "get",
        params 
    });
}

//添加企业
export function enterpriseAdd(data) {
    return request({
        url: "/enterprise/add",
        method: "post",
        data 
    });
}

//企业状态设置
export function enterpriseStatus(data) {
    return request({
        url: "/enterprise/status",
        method: "post",
        data 
    });
}

//删除企业
export function enterpriseRemove(data) {
    return request({
        url: "/enterprise/remove",
        method: "post",
        data
    });
}

//编辑企业
export function enterpriseEdit(data) {
    return request({
        url: "/enterprise/edit",
        method: "post",
        data
    });
}