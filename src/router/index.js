import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import axios from "axios";
import Login from '@/views/Login.vue';
import LFG from '@/views/LfgMint.vue'
import Batch from '@/views/BatchImport.vue'
import menuList from "@/utils/menus";
// import {formatMenu} from "@/utils/initMenu";

Vue.use(VueRouter);

export const constantRoutes = [
    {
        path: '/',
        component: Login,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/lfg',
        component: LFG,
    },
    {
        path: '/batch',
        component: Batch,
    },
];

const router = new VueRouter({
    routes: constantRoutes,
    mode: 'hash' //用history 生产环境配合nginx
});

export const formatMenu =(menus) =>{
    const  route = menus.filter(item =>{
        item.component = (item.component ==='lfg')?lfg: loadView(item.component);
        item.meta = {
            title:item.title
        };
        //处理子菜单
        if(item.children && item.children.length>0){
            formatMenu(item.children);
        }
        return true;
    });
    //将格式化后的菜单进行返回
    return route;
    // let arr = [];
    // menus.forEach(item => {
    //     if (item.children !== null) {
    //         item.children.forEach(i => {
    //             i.component = loadView(i.component);
    //             arr.push(i);
    //         });
    //     }
    // });
    // return arr;
}

export const loadView = (view) => {
    return (resolve) => require([`@/views/${view}.vue`], resolve);
};

/**
 * 挂载路由导航守卫
 * to:将要访问的路径
 * from:从哪里访问的路径
 * next:之后要做的任务，是一个函数
 * next（）放行， next（'/URL'）强制跳转的路径。
 */
router.beforeEach((to, from, next) => {
    // 获取token
    const token = sessionStorage.getItem('token');
    if (token) {
        next();
    } else {
        if (to.path === '/login') {
            next();
        } else {
            next(`/login`);
        }
    }
});



export default router
