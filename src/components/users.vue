<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right"   class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
  <!-- 栅格   栅格选择自己需要几分就好,剩下的不用管,不要超过总份数-->
    <el-row>
  <el-col :span="6"><div class="grid-content bg-purple">
      <!-- 搜索栏// v-model="input5" //--> 
     <el-input placeholder="请输入内容"  class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    </div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light">
      <!-- 按钮 -->
     <el-button type="success" plain>成功按钮</el-button>
    
    </div></el-col>
</el-row>
   
  
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>
<script>
export default {
    // 表格数据
       data() {
        return {

          sendData:{
          query:'',
          pagenum:'1',
          pagesize:'10'
          },

          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      // 数据获取
    async  created() {
     let res= await this.$http.get('users',{
      //  需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
          headers:{'Authorization':window.sessionStorage.getItem('token')
            },
            // 数据
          params:this.sendData
        })

        console.log(res)
        // 把我获取到的数据里面的数组赋值给tabledata
         this.tableData = res.data.data.users
      },
};
</script>
<style>
.el-breadcrumb.my-breadcrumb{
  height: 45px;
  line-height: 45px;
  padding-left: 5px;
  background-color: #d3dce6;
}
</style>