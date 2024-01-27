import Vue from 'vue';
//引入代码高亮 以及样式
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block);
    });
});