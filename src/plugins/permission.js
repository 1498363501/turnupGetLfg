import Vue from 'vue';
import store from "@/store";

/**
 * 权限数据自定义指令
 */
Vue.directive('hasPermi', {
    inserted(el, binding) {
        //按钮权限
        const { value } = binding;
        //用户权限
        const permission = store.state.premissions;
        if (value && value instanceof Array && value.length > 0) {
            const valueFlag = value;
            //迭代查找元素
            const hasPermi = permission.some(per => {
                return valueFlag.includes(per);
            });
            //不存在该权限
            if (!hasPermi) {
                el.parentNode.removeChild(el);
            }
        } else {
            throw new Error('请设置操作权限标签值')
        }
    }
});

Vue.directive('hasRole', {
   inserted(el, binding) {
       const { value } = binding;
       const roles = store.state.roles;
       if (roles && roles instanceof Array && roles.length > 0) {
           const valueFlag = value;
           const hasRole = roles.some(role => {
               return valueFlag.includes(role);
           });
           if (!hasRole) {
               el.parentNode.removeChild(el);
           }
       } else {
           throw new Error('请设置操作角色标签值');
       }
   }
});