// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import {ToastPlugin, TransferDom} from 'vux'
require('promise.prototype.finally').shim()
// import formatDate from '../static/js/formatDate.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
// Vue.use(formatDate)

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if(!role && to.path !== '/login'){
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})

Vue.use(ToastPlugin, {position: 'middle'})
Vue.directive('transfer-dom', TransferDom)
// var defaultHost = window.location.protocol + "//" + window.location.hostname
var defaultHost = 'http://47.74.177.128'
axios.defaults.baseURL = defaultHost

axios.interceptors.response.use(
    response => {
        if (response.data.code != 200) {
        	Vue.$vux.toast.show({
        		text: response.data.message,
        		type: 'warn'
        	})
        	// Toast(response.data.message);
            // ElementUI.Message.error(response.data.message)
        }
        return response
    },
    error => {
        ElementUI.Message.error('服务器更新中')
    }
    )

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
