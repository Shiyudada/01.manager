// 抽取路由出来,单独放个文件夹


import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import login from '../components/login.vue'
// 路由规则
let routes =[
    {path:'/login',component:login}
]
// /路由实例化
let router = new VueRouter({
    routes
})
// 暴露出去路由
export default router
