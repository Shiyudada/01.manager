// 抽取路由出来,单独放个文件夹


import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
// 登录
import login from '../components/login.vue'
// 主页
import index from '../components/index.vue'
import users from '../components/users.vue'
// 路由规则  //注意这里的path要跟后面写的跳转页面逻辑对应,以及与to里面的也要对应
let routes =[
    // 重定向
    {path:'',redirect:'login'},
    {path:'/login',component:login},
    {path:'/index',component:index,
       children:[
           {path:'users',component:users}
       ]}
]
// /路由实例化
let router = new VueRouter({
    routes
})

// 注册添加导航守卫去判断是否登录'
router.beforeEach((to, from, next) => {
    // to :去哪儿
    // from:从哪儿来
//   console.log(to)
//   console.log(from)
if(to.path=='/login'){
    // 如果是就表明有,那么就直接next()就可以了
    next()
}else {
    if(window.sessionStorage.getItem('token')){
        next()
    }else{
        // 说明没登录,请先登录
        Vue.prototype.$message.warning('哥们,请先登录呀')
        next('/login')
    }
}
  })
// 暴露出去路由
export default router
