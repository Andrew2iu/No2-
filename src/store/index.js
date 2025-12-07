import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { getUserInfoAPI } from '@/api';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',// 登录成功后，服务器返回的 token 字符串
        userInfo: {}// 用户基本资料
    },
    getters: {
        username: state => state.userInfo.username,//用户名
        nickname: state => state.userInfo.nickname,//昵称
        user_pic: state => state.userInfo.user_pic,//用户头像
    },
    mutations: {
        updateToken(state, val) {
            state.token = val;
        },
        // 更新用户基本资料
        updateUserInfo(state, val) {
            state.userInfo = val;
        }
    },
    actions: {
        async getUserInfoActions(store) {
            const { data: res } = await getUserInfoAPI();
            if (res.code === 0) {
                store.commit('updateUserInfo', res.data);
            }
        }
    },
    modules: {
    },
    plugins: [
        createPersistedState()
    ]
});
