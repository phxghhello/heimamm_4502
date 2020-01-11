// 定义验证手机号的方法
export const validatePhone = (rule, value, callback) => {
    if (value === "") {
        callback(new Error("手机号不能为空"));
    } else {
        // 定义正则 正则  对象
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 验证
        if (reg.test(value) == true) {
            // 对
            callback();
        } else {
            // 错
            callback(new Error("小老弟，手机号，写错了哟 O(∩_∩)O哈哈~"));
        }
    }
};
// 定义验证邮箱的方法
export const validateEmail = (rule, value, callback) => {
    if (value === "") {
        callback(new Error("邮箱不能为空"));
    } else {
        // 定义正则 正则  对象
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 验证
        if (reg.test(value) == true) {
            // 对
            callback();
        } else {
            // 错
            callback(new Error("小老弟，邮箱，写错了哟 O(∩_∩)O哈哈~"));
        }
    }
};