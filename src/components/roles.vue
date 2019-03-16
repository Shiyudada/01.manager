<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="权限管理" third="角色列表"></mybreadxie>
    <!-- 按钮 -->
    <el-button type="success" @click="addFormVisible= true" plain>添加角色</el-button>

    <el-table :data="tableData5" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- 最顶级   这里使用了栅格布局     再用v-for去循环遍历 -->
          <el-row v-for="level1 in props.row.children" class="my-row">
            <el-col :span="6">
              <!-- 带x的图标 -->
              <!-- 删除时间,按钮自带的 @close="handleClose(tag,props.row) -->
              <el-tag
                type="primary"
                @close="handleClose(level1,props.row)"
                :key="level1.id"
                closable
              >{{level1.authName}}</el-tag>
              <!-- 图标箭头 -->
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <el-col :span="18">
              <!-- 第二层 -->
              <el-row v-for="level2 in level1.children">
                <el-col :span="6">
                  <el-tag
                    type="success"
                    @close="handleClose(level2,props.row)"
                    :key="level2.id"
                    closable
                  >{{level2.authName}}</el-tag>
                  <!-- 图标箭头 -->
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <el-col :span="18">
                  <!-- 第二层右边,直接用v-for循环 -->
                  <el-tag
                    type="warning"
                    v-for="level3 in level2.children"
                    :key="level3.id"
                    closable
                    class="my-tag"
                    @close="handleClose(level3,props.row)"
                  >{{level3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
                <!-- 如果没有权限 -->
          <el-row v-if="props.row.children.length==0">没有分配权限</el-row>
        </template>
      </el-table-column>

      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>

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

    <!-- 添加角色 -->
    <!-- 增加用户   弹出框弹出的表单弹出框弹出的表单,用饿了么的对话框里面的自定义中的表单 -->
    <el-dialog title="添加角色" :visible.sync="addFormVisible">
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
        <el-form-item label="角色名称" prop="rolesname">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="rolesdisable">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!-- tree弹框 -->
    <el-dialog title="权限分配" :visible.sync="treeFormVisible">
      <el-form class="my-form" label-width="80px" status-icon ref="addForm">
        <!-- props指定节点的一系列数据    data  就是用来接收所有数据的渲染出来的  default-checked-keys默认选中的节点  default-expand-all默认所有节点展开 -->
        <!--  node-key="id" 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 -->
        <!--   ref="tree"   @click="submit"  tree自带的通过node获取和设置节点   用这个方法去设置和获取页面节点,再调用api,保存即可  -->
        <el-tree
          :props="props"
          node-key="id"
          :data="treeForm"
          :default-checked-keys="checkData"
          default-expand-all
          show-checkbox
          ref="tree"
        ></el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addFormVisible: false,
      treeFormVisible: false,
      addForm: {
        rolesname: "",
        rolesdisable: ""
      },
      // tree弹框
      // 数据
      treeForm: {},
      // props就是具体显示的子节点的tree的数据
      props: {
        children: "children",
        label: "authName"
      },
      // 默认选中的节点
      checkData: [],
       editItem:[],

      rules: {
        rolesname: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 6, max: 13, message: "长度在 6 到 13 个字符", trigger: "blur" }
        ],
        rolesdisable: [
          { required: true, message: "角色描述不能为空", trigger: "blur" },
          { min: 6, max: 13, message: "长度在 6 到 13 个字符", trigger: "blur" }
        ]
      },
      tableData5: []
    };
  },

  methods: {
    async getRoles() {
      let res = await this.$http.get("roles");
      // console.log(res);
      // 将获取到的数据赋值给数组
      this.tableData5 = res.data.data;
    },
    // x 的删除事件
    async handleClose(tag, item) {
      //  删除角色指定权限
      let res = await this.$http.delete(`roles/${item.id}/rights/${tag.id}`);
      // console.log(res)
      // 重新赋值权限
      item.children = res.data.data;
    },
    // 点击弹出tree弹框checkData
    async selectForm(item) {
      this.treeFormVisible = true;
      // 所有权限列表
      let res = await this.$http.get("rights/tree");
      console.log(res);
      this.treeForm = res.data.data;
      // 默认选中节点id获取 // 获取id,通过id  结合饿了么tree组件自带的  default-checked-keys去默认选中
      let checkId = [];
      item.children.forEach(e => {
        console.log(e);
        checkId.push(e.id);
        e.children.forEach(e1 => {
          checkId.push(e1.id);
          e1.children.forEach(e2 => {
            checkId.push(e2.id);
          });
        });
      });
      //  console.log(checkId)
    // 得到tree弹框中被选中的内容的id,然后把他赋值给tree的默认选中属性 :default-checked-keys="checkData"
    //  ,然后把他赋值给tree的默认选中属性 :default-checked-keys="checkData"  ,记得一定要在tree结构中加  node-key="id"
      this.checkData = checkId;
            // 保存点击的角色
      this.editItem = item;
    },
    // 将选中的节点保存
   async submit(){
      // 选中的节点   console.log(this.$refs.tree.getCheckedNodes());tree中的语法
      let checkedNodes = this.$refs.tree.getCheckedNodes();
      console.log(checkedNodes);
      // 获取所有选中的id
      let checkedIds = [];
      function getChildrenIds(children) {
        if(children){
          children.forEach(v=>{
            checkedIds.push(v.id)
            // 再次调用自己
            getChildrenIds(v.children)

          })
        }
      }
      //  调用一次自己
      getChildrenIds(checkedNodes)
         // set去重
      let set = new Set(checkedIds);

      // 快速把id数组 变成 id1,id2
      // console.log(checkedIds.join(","));
      // console.log(checkedIds);

        let res = await this.$http.post(`roles/${this.editItem.id}/rights`, {
        rids: [...set].join(',')
      });
      console.log(res)
      this.treeFormVisible=false
    }
  },
  created() {
    this.getRoles();
  }
};
</script>
<style  scoped>
/* scoped这个属性是VUe中的css的属性,给他添加这个就不用担心不同的页面的类名重叠而相互影响到样式,可以让他的作用控制在当前页面的范围类 */
.my-row {
  margin-bottom: 10px;
}
.my-tag {
  margin-bottom: 10px;
  margin-right: 5px;
}
</style>