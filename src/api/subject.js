import request from './request.js'

//添加学科
export function addSubject(data) {
    return request({
        url: "/subject/add",
        method: "post",
        data 
    });
}

//学科列表
export function subjectList(params) {
    return request({
        url: "/subject/list",
        method: "get",
        params 
    });
}

//修改学科状态
export function subjectStatus(data) {
    return request({
        url: "/subject/status",
        method: "post",
        data 
    });
}

//学科编辑接口
export function subjectEdit(data) {
    return request({
        url: "/subject/edit",
        method: "post",
        data 
    });
}

//学科删除
export function subjectRemove(data) {
    return request({
        url: "/subject/remove",
        method: "post",
        data
    });
}