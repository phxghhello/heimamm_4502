import request from './request.js'

//新增试题
export function questionAdd(data) {
    return request({
        url: "/question/add",
        method: "post",
        data
    });
}

//获取单个题目详细信息
export function questionOne(data) {
    return request({
        url: "/question/one",
        method: "post",
        data
    });
}

//修改题目状态
export function questionStatus(data) {
    return request({
        url: "/question/status",
        method: "post",
        data
    });
}

//删除题目
export function questionRemove(data) {
    return request({
        url: "/question/remove",
        method: "post",
        data
    });
}

//编辑题目
export function questionEdit(data) {
    return request({
        url: "/question/edit",
        method: "post",
        data
    });
}

//题目列表
export function questionList(params) {
    return request({
        url: "/question/list",
        method: "get",
        params
    });
}

//题库添加上传选项图片、视频解析文件
export function questionUpload(params) {
    return request({
        url: "/question/upload",
        method: "get",
        params
    });
}