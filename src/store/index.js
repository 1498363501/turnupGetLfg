import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

//统一管理
export default new Vuex.Store({
    state: {
        //如果初始化没有则赋值为空
        userName: sessionStorage.getItem('userName') || '',
        avatar: sessionStorage.getItem('avatar') || '',
        menus: [],
        roles: [],
        premissions: []
    },
    //同步执行
    mutations: {
        setRoutes(state, data) {
            state.menus = data;
        },
        setRoles(state, data) {
            state.roles = data;
        },
        setPremission(state, data) {
            state.premissions = data;
        },
        //用户名
        setUserName(state, data) {
            state.userName = data;
            sessionStorage.setItem('userName', data);
        },
        //用户头像
        setAvatar(state, data) {
            state.avatar = data;
            sessionStorage.setItem('avatar', data);
        }
    },
    //异步执行
    actions: {

    },
    modules: {

    }
});
