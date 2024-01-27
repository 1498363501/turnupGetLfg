import Vue from 'vue';
//引入axios
import axios from 'axios';
//引入element ui message
import {Message} from 'element-ui';
//配置请求拦截器
axios.interceptors.request.use((config) => {
    let token = sessionStorage.getItem('token');
    //如果存在token，则将携带token
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
}, (error) => {
    console.log(error);
});

Vue.prototype.$ajax = axios;
//配置axios访问根路径
//axios.defaults.baseURL = 'http://localhost:9000/vue';
//允许携带cookie
// axios.defaults.withCredentials = true;
// //配置拦截器
// const req = axios.create();
// req.interceptors.request.use((config) => {
//     config.headers.authorization = localStorage.getItem('token');
//     return config;
// });

// req.interceptors.response.use((res) => {
//     return res;
// }, (err) => {
//     if (err.response.status === 401) {

//     }
// });
//让Vue挂载axios