// import axios from 'axios';
// import welcome from "@/views/welcome";
// //引入公共路由
// import { constantRoutes } from '@/router/index';
// /**
//  * 菜单信息
//  * @type {{}}
//  */
// const menuList = {
//     state: {
//         route: [],
//         addRoute: []
//     },
//     mutations: {
//         setRoutes(state, data) {
//             state.route = constantRoutes.concat(data);
//             state.addRoute = data;
//         }
//     }
// }
//
// export const GenerateRoutes = ({ commit }) => {
//     return new Promise((resolve) => {
//         //发送获取菜单信息请求
//         axios.get('/system/menu/findMenu').then((res) => {
//             //将菜单信息转换成 路由信息
//             const accessedRoutes = formatMenus(res.data);
//             commit('setRoutes', accessedRoutes);
//             resolve(accessedRoutes);
//         });
//     });
// }
//
// /**
//  * 遍历后台传来的路由字符串，转换为组件对象
//  */
// function formatMenus(asyncRouterMap) {
//     return asyncRouterMap.filter((route) => {
//         if (route.component) {
//             if (route.component === '/home') {
//                 route.component = welcome;
//             } else {
//                 route.component = loadView(route.path);
//             }
//         }
//         if (route.children !== null && route.children.length > 0) {
//             formatMenus(route.children);
//         } else {
//             delete route['children'];
//         }
//         return true;
//     });
// }
//
// export const loadView = (view) => {
//     return (resolve) => require([`@/views${view}.vue`], resolve);
// }
//
// export default menuList
