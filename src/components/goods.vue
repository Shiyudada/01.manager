<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="商品管理" third="商品列表"></mybreadxie>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>-->
    <!-- 栅格   栅格选择自己需要几分就好,剩下的不用管,不要超过总份数-->
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <!-- 搜索栏// v-model="input5" //-->
          <el-input placeholder="请输入内容" class="input-with-select">
            <!-- v-model绑定数据  回车键事件和点击事件,点击搜索或者回车搜索,在饿了么的表单中,要加native点击回车才会起作用@keyup.enter.native -->
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <!-- 按钮 -->
          <el-button type="danger" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <!-- 添加border显示纵向边框 -->
    <el-table :data="tableData" style="width: 100%" border>
      <!-- 添加显示索引 -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>

      <el-table-column label="操作">
        <template >       <!-- slot-scope="current" -->
          <!-- 自定义的内容  plain控制边框样式,size控制大小,circle默认是圆形,这里是方的去掉就好 -->
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :page-sizes="[2,4,6,8]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{}, {}]
    };
  }
};
</script>
<style>
</style>