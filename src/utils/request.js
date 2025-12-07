import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { Message } from 'element-ui';
export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const request = axios.create({
    baseURL
});
request.interceptors.request.use(function (config) {
    // 为请求头挂载 Authorization 字段
    if (store.state.token) {
        config.headers.Authorization = store.state.token
    }
    return config
}, function (error) {
    return Promise.reject(error)
})
request.interceptors.response.use(function (response) {
    return response
}, function (error) {
    // 响应拦截器：处理 401 错误 身份过期
    if (error.response.status === 401) {
        store.commit('updateToken', '');
        store.commit('updateUserInfo', {});
        router.push('/login');
        Message.error('身份过期，请重新登录');
    }
    return Promise.reject(error)
})


export default request;
