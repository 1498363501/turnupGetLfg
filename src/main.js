import Vue from 'vue';
import App from './App.vue';
import router from './router';
//引入store
import store from '@/store';
import axios from 'axios';
//引入element
import './plugins/element.js';
//引入axios
import './plugins/axios.js';
//引入markdown编辑器
import './plugins/markdown.js';
//引入代码高亮
import './plugins/highlight.js'
//引入图标库
import './assets/icon/iconfont.css';
//引入自定义全局样式
import './assets/css/global.css';
//引入echarts
import './plugins/echarts.js';
//权限指令
import './plugins/permission.js';



Vue.config.devtools = false;
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
