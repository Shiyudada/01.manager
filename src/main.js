import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 导入饿了么ui

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


// 导入暴露的路由
import router from './lib/router'
// 导入暴露的axios
import myhttp from './lib/myhttp'
Vue.use(myhttp)
// 全局导入面包屑组件,并且记得注册
import mybreadxie from './components/mybreadcrumb.vue'
Vue.component('mybreadxie',mybreadxie)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
