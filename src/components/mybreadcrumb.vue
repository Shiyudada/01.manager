<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{second}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{third}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    props:["second","third"]
}
</script>
<style>
  .el-breadcrumb.my-breadcrumb {
  height: 45px;
  line-height: 45px;
  padding-left: 5px;
  background-color: #d3dce6;
}
</style>