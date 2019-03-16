<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="权限管理" third="权限列表"></mybreadxie>
    <!-- 表格 -->
    <el-table style="width: 100%" border>
      <!-- 添加显示索引 -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="email" label="路径" width="180"></el-table-column>
      <el-table-column prop="mobile" label="层级"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
   data() {
       return {
           
     editFormVisiable :false
           
       }
   },

    methods: {
            // 编辑用户信息
    async handleEdit(item) {
      // console.log(index, row);
      // 点击编辑弹出编辑弹框,并且把用户数据也带到编辑框上面
      this.editFormVisiable = true;
      // this.editForm.username = row.username;
      // this.editForm.email = row.email;
      // this.editForm.mobile = row.mobile;
      // this.editForm.id =row.id
  
    },
    },
};
</script>
<style>
</style>