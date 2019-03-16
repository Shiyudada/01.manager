<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="用户管理" third="用户列表"></mybreadxie>
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
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="sendData.query"
            @keyup.enter.native="search"
          >
            <!-- v-model绑定数据  回车键事件和点击事件,点击搜索或者回车搜索,在饿了么的表单中,要加native点击回车才会起作用@keyup.enter.native -->
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <!-- 按钮 -->
          <el-button type="success" plain @click="addFormVisible= true">添加用户</el-button>
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
      <!-- 自定义例表模块 -->
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <!-- 自定义的内容  switch        通过scope控制自定义内容的一些属性 这里的v-model="scope.row.mg_state"是用来控制switch开关   change事件switch按钮自带-->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="statusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 自定义的内容  plain控制边框样式,size控制大小,circle默认是圆形,这里是方的去掉就好 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="handleEdit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="delOne(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            @click="selectForm(scope.row)"
            size="mini"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[2,4,6,8]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>

    <!-- 增加用户   弹出框弹出的表单弹出框弹出的表单,用饿了么的对话框里面的自定义中的表单 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <!-- class="addFormall"    label-position="right" 
     表单验证由prop里面写对于的名称  :model="addForm"并且记得在data里面写需要验证的数据的数组对象  :rules="rules"并且记得写rules:{}  这三个相关的控制,缺一不可  
      提交由 ref="ruleForm"  @click="submitForm('ruleForm')" 控制并且调用接口,缺一不可-->
      <el-form
        :model="addForm"
        class="my-form"
        label-width="80px"
        :rules="rules"
        status-icon
        ref="addForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 弹出框弹出的表单    编辑用户信息-->
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
    <el-dialog title="修改用户" :visible.sync="editFormVisiable">
      <el-form :model="editForm" label-width="80px" :rules="rules" status-icon ref="editForm">
        <el-form-item label="用户名" prop="username">
          <el-input disabled v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisiable = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 选角色  弹框 -->
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
    <el-dialog title="分配角色" :visible.sync="ruleFormVisiable">
      <el-form :model="roleForm" label-width="80px" :rules="rules" status-icon ref="roleForm">
        <el-form-item label="当前用户" prop="username">{{roleForm.username}}</el-form-item>
        <el-form-item label="请选择角色">
          <el-select v-model="roleForm.role_name" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ruleFormVisiable = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  // 表格数据
  data() {
    // 弹出框中的email和手机号码验证
    var checkEmail = (rule, value, callback) => {
      setTimeout(() => {
        // 正则表达式
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value)) {
          callback();
        } else {
          // 不匹配
          callback(new Error("请正确输入邮箱"));
        }
      }, 1000);
    };
    var checkMobile = (rule, value, callback) => {
      if (value != "") {
        setTimeout(() => {
          // 正则表达式
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
          if (reg.test(value)) {
            callback();
          } else {
            // 不匹配
            callback(new Error("请正确输入电话号码"));
          }
        }, 1000);
      } else {
        callback();
      }
    };

    return {
      sendData: {
        query: "",
        pagenum: "1",
        pagesize: 2
      },
      // 总页数
      total: 0,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addFormVisible: false,
      editFormVisiable: false,
      ruleFormVisiable: false,

      tableData: [],
      // 编辑
      editForm: {
        username: "",
        email: "",
        mobile: ""
      },
      roleForm: {
        username: "",
        email: "",
        mobile: ""
      },
      // 角色列表
      roleList: [],

      // 新增的表单数据验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 13, message: "长度在 6 到 13 个字符", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobile, trigger: "blur" }]
      }
    };
  },

  methods: {
    // 删除用户    这里的item是传参,看做形参
    delOne(item) {
      this.$confirm("你真的要删除该用户吗", "提示", {
        confirmButtonText: "确定删除o(╥﹏╥)o",
        cancelButtonText: "取消删除^_^",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$http.delete(`users/${item.id}`, {
            //  需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
            // headers: { Authorization: window.sessionStorage.getItem("token") },
          });
          console.log(res);
          // 当为200时,说明确认删除,这个时候刷新页面数据就好
          if (res.data.meta.status == "200") {
            this.search();
          }
          // 重新刷新页面
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除O(∩_∩)O"
          });
        });
    },
    // 改变switch状态,并且根据状态调用接口去改变取数  这里的item是传参,看做形参
    async statusChange(item) {
      console.log(window.sessionStorage.getItem("token"));
      let res = await this.$http.put(
        `users/${item.id}/state/${item.mg_state}`,
        {},
        {
          // headers:{
          //    Authorization: window.sessionStorage.getItem("token")
          // }
        }
      );
      // console.log(res);
      //  弹框提示更改状态成功
      this.$message(res.data.meta.msg);
    },

    // 抽取created中的数据获取逻辑.使用抽取逻辑  用户回车搜索获取逻辑    点击放大镜搜索数据
    // axios.put(url[, data[, config]])  put请求一般用于改变状态的,data必须要占位置
    // 搜索
    async search() {
      let res = await this.$http.get("users", {
        //  需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
        // headers: { Authorization: window.sessionStorage.getItem("token") },
        // 数据
        params: this.sendData
      });

      // console.log(res);
      // 把我获取到的数据里面的数组赋值给tabledata
      this.tableData = res.data.data.users;
      // 设置总条数
      this.total = res.data.data.total;
    },

    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 数据正确
          // 提取 res生命
          let res;
          // 添加用户
          // 提交数据即可
          if (formName == "editForm") {
            // console.log("编辑");
            res = await this.$http.put(
              `users/${this.editForm.id}`,
              this.editForm
            );
          } else if (formName == "addForm") {
            res = await this.$http.post("users", this.addForm, {});
          } // 角色表单提交
          else if (formName == "roleForm") {
            res = await this.$http.put(`users/${this.roleForm.id}/role`, {
              rid: this.roleForm.role_name
            });
            // console.log(res);
          }
          // console.log(res);
          // 重新获取数据(局部刷新)
          if (res.data.meta.status == "201" || res.data.meta.status == "200") {
            // 重新获取数据
            this.search();
            // 收起框框
            this.addFormVisiable = false;
            this.editFormVisiable = false;
            this.ruleFormVisiable = false;
          }
        } else {
          // 数据错误
          this.$message.warning("请正确输入数据");
          return false;
        }
      });
    },
    // 编辑用户信息
    async handleEdit(item) {
      // console.log(index, row);
      // 点击编辑弹出编辑弹框,并且把用户数据也带到编辑框上面
      this.editFormVisiable = true;
      // this.editForm.username = row.username;
      // this.editForm.email = row.email;
      // this.editForm.mobile = row.mobile;
      // this.editForm.id =row.id
      let res = await this.$http.get(`users/${item.id}`);
      // console.log(res);
      this.editForm = res.data.data;
    },
    // 选角色
    async selectForm(item) {
      console.log(item);
      this.ruleFormVisiable = true;
      // 把页面上获取到的传给roleform
      this.roleForm = item;
      console.log(this.roleForm);
      // 调用角色接口看角色列表
      let res = await this.$http.get("roles");
      // console.log(res)
      this.roleList = res.data.data;
    },
    //页容量改变
    sizeChange(size) {
      console.log(size);
      this.sendData.pagesize = size;
      this.search();
    },
    // 当前页面点击确认
    currentChange(current) {
      this.sendData.pagenum = current;
      this.search();
    }
  },

  // 数据获取   和搜索共用接口
  created() {
    // 使用抽取搜索的方法,这里的数据被抽取,在这里调用上方抽取的
    this.search();
  }

  //   async   created() {
  //   let res= await this.$http.get('users',{
  //        headers:{ Authorization: window.sessionStorage.getItem("token") },
  //        params:this.sendData,
  //    })

  //    console.log(res)
  //    this.tableData=res.data.data.users
  // },
};
</script>
<style>
.el-breadcrumb.my-breadcrumb {
  height: 45px;
  line-height: 45px;
  padding-left: 5px;
  background-color: #d3dce6;
}
.my-form {
  height: auto;
  padding: 0;
  margin: 0;
}
</style>