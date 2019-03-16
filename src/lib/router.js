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
import roles from '../components/roles.vue'
import rights from '../components/rights.vue'
import goods from '../components/goods.vue'  
import categories from '../components/categories.vue'   
import orders from '../components/orders.vue'   
import params from '../components/params.vue'   
import reports from '../components/reports.vue'   



// 路由规则  //注意这里的path要跟后面写的跳转页面逻辑对应,以及与to里面的也要对应
let routes =[
    // 重定向
    {path:'',redirect:'login'},
    {path:'/login',component:login},
    {path:'/index',component:index,
       children:[
            {path:'users',component:users},
            {path:'roles',component:roles},
            {path:'rights',component:rights},
            {path:'goods',component:goods},
            {path:'categories',component:categories},
            {path:'orders',component:orders},
            {path:'params',component:params},
            {path:'reports',component:reports},
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
    // next:进行管道中的下一个钩子
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
