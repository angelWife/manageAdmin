import Vue from 'vue'
import App from './App'
import router from './router'
import api from './http'
import i18n from './i18n'
import store from './store'
import global from '@/utils/global'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'
import axios from 'axios'
// import {post,fetch,patch,put} from './http/axios_new'
//定义全局变量
// Vue.prototype.$post=post;
// Vue.prototype.$fetch=fetch;
// Vue.prototype.$patch=patch;
// Vue.prototype.$put=put;
Vue.use(ElementUI)
Vue.use(api)
Vue.prototype.global = global;

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
});
