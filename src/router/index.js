import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: () => import('@/views/layout/index.vue'),
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: () => import('@/views/home/index.vue')
            },
            {
                path: 'user-info',
                component: () => import('@/views/user/userInfo.vue')
            },
            {
                path: 'user-avatar',
                component: () => import('@/views/user/userAvatar.vue')
            },
            {
                path: 'user-pwd',
                component: () => import('@/views/user/userPwd.vue')
            },
            {
                path: 'art-cate',
                component: () => import('@/views/article/artCate.vue')
            },
            {
                path: 'art-list',
                component: () => import('@/views/article/artList.vue')
            },
        ]
    },
    {
        path: '/reg',
        component: () => import('@/views/register/index.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue')
    },

];

const router = new VueRouter({
    routes
});

let whiteList = ['/login', '/reg'];

router.beforeEach((to, from, next) => {
    const token = store.state.token;
    if (token) {
        if (!store.state.userInfo.username) {
            store.dispatch("getUserInfoActions");
        }
        next();
    } else {
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next('/login');
        }
    }




});


export default router;
