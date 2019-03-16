<template>
  <!-- 饿了么ui里面的布局容器 -->
  <el-container class="index-contain">
    <el-header class="index-heard">
      <el-row>
        <el-col :span="4" class="heard-left">
          <div class="grid-content bg-purple">
            <img src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="16" class="heard-center">
          <div class="grid-content bg-purple-light">电商后台管理系统</div>
        </el-col>
        <el-col :span="4" class="heard-right">
          <div class="grid-content bg-purple">
            <!-- 退出 -->
            <!-- 给他绑定一个点击事件,点击后让他实现登出效果 -->
            <el-button type="success" @click="logout">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="index-aside" width="200px">
        <!-- 饿了么ui里面的导航插件        这个导航插件  router必须要写他控制是否跳转,而  
                                          index="地址"   index里面填哪一页的path就控制跳到那一页-->
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
            <el-submenu :index="index+''"    v-for="(item,index) in $store.state.menuList"   >
            <template slot="title"  >
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>

        <el-menu-item v-for="it in item.children" :index="'/index/'+it.path">
              <span class="el-icon-menu"></span>
             {{it.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="index-main">
        <!-- 渲染 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  // 在进入首页的时候先判断是否登录,如果不是登录状态下进入,那么就返回登录页面
  // 因为之前保存了token,这里只需要获取登录页保存的token不需要获取data或者methods,所以在beforecreate生命周期阶段去操作就可以了
  // beforeCreate() {
  //   // window.sessionStorage.getItem('token');
  //   if (window.sessionStorage.getItem("token")) {
  //     // 有token,那么不用管,他自己会进入首页
  //   } else {
  //     // 没有token,这个时候需要强制让他回到登录页面
  //     this.$message.warning("兄弟,你还未登陆,请先登录");
  //     //  给他一个计时器,让他3秒之后回到登录页
  //     setTimeout(() => {
  //       // 回到首页,编程式导航 this.$router.push('地址')    // router-link声明式导航
  //       this.$router.push("/login");
  //     }, 3000);
  //   }
  // },

  data() {
    return {
      // menuList:[]
    }
  },

  // 左侧菜单获取
 async created() {
    let res = await  this.$http.get('menus')
    console.log(res)
    // this.menuList=res.data.data;
     this.$store.commit('setMenu',res.data.data)
  },

  methods: {
    // 在这里去做登出的一系列逻辑代码
    logout() {
      // 登出的时候,删除token就好.在删除之前,先给用户考虑是否真的删除,避免失误而删除 // window.sessionStorage.removeItem('token')

      // 在这里使用饿了么ui的messagebox弹框判断是否退出
      this.$confirm("小可爱,你真的要退出吗", "提示", {
        confirmButtonText: "残忍退出😭",
        cancelButtonText: "取消退出😄",
        type: "warning"
      })
        .then(() => {
          // 这个其实就是弹框的样式,我在这里不需要要弹框,所以就直接删了
          //   this.$message({
          //     type: "success",
          //     message: "删除成功!"

          //   });
          // 残忍退出时,删除token并且返回登陆页面
          window.sessionStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {
          // 取消退出时
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>
<style>
.index-contain {
  height: 100%;
}
.index-heard {
  height: 60px;
  background-color: #b3c0d1;
  line-height: 60px;
}
/*饿了么里面我用到的组件对我的页面宽度有影响,他自带了宽度,我就给他重新设置宽度 */
.heard-left > div {
  height: 60px;
}
.heard-center {
  text-align: center;
  font-size: 30px;
  color: white;
  font-weight: 700;
}
.heard-right {
  text-align: right;
}
.index-aside {
  width: 300px;
}
.index-main {
  background-color: #e9eef3;
}
.el-main.index-main{
  padding-top: 0px;
 
}
</style>
