import request from '@/utils/request';
import store from '@/store';
// 注册的接口函数
export const registerAPI = ({ username, password, repassword }) => {
    return request({
        method: 'POST',
        url: '/api/reg',
        data: {
            username,
            password,
            repassword
        }
    });
};
// 登录的接口函数
export const loginAPI = ({ username, password }) => {
    return request({
        method: 'POST',
        url: '/api/login',
        data: {
            username,
            password
        }
    });
}
//获取-用户基本资料
export const getUserInfoAPI = () => {
    return request({
        method: 'GET',
        url: '/my/userinfo',
    });
}
//获取-侧边栏数据
export const getMenusListAPI = () => {
    return request({
        method: 'GET',
        url: '/my/menus',
    });
}
//更新-用户基本资料
export const updateUserInfoAPI = ({ id, username, nickname, email, user_pic }) => {
    return request({
        method: 'PUT',
        url: '/my/userinfo',
        data: {
            id,
            username,
            nickname,
            email,
            user_pic
        }
    });
}
//更新-用户头像
export const updateUserAvatarAPI = (avatar) => {
    return request({
        method: 'PATCH',
        url: '/my/update/avatar',
        data: {
            avatar
        }
    });
}
//更新-用户密码
export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
    return request({
        method: 'PATCH',
        url: '/my/updatepwd',
        data: {
            old_pwd,
            new_pwd,
            re_pwd
        }
    });
}
//获取-文章分类
export const getCateListAPI = () => {
    return request({
        method: 'GET',
        url: '/my/cate/list',
    });
}
//添加-文章分类
export const addCateAPI = ({ cate_name, cate_alias }) => {
    return request({
        method: 'POST',
        url: '/my/cate/add',
        data: {
            cate_name,
            cate_alias
        }
    });
}
//更新-文章分类
export const updateCateAPI = ({ id, cate_name, cate_alias }) => {
    return request({
        method: 'PUT',
        url: '/my/cate/info',
        data: {
            id,
            cate_name,
            cate_alias
        }
    });
}
//删除-文章分类
export const delCateAPI = ({ id }) => {
    return request({
        method: 'DELETE',
        url: '/my/cate/del',
        params: {
            id
        }
    });
}
//发布-文章
export const uploadArticleAPI = (formData) => {
    return request({
        method: 'POST',
        url: '/my/article/add',
        data: formData
        // 接口文档要求要Formdata类型
    });
}
//获取-文章列表
export const getArticleListAPI = ({ pagenum, pagesize, cate_id, state }) => {
    return request({
        method: 'GET',
        url: '/my/article/list',
        params: {
            pagenum,
            pagesize,
            cate_id,
            state
        }
    });
}
//获取-文章详情
export const getArticleDetailAPI = (id) => {
    return request({
        method: 'GET',
        url: '/my/article/info',
        params: {
            id
        }
    });
}
//删除-文章
export const delArticleAPI = (id) => {
    return request({
        method: 'DELETE',
        url: '/my/article/info',
        params: {
            id
        }
    });
}
