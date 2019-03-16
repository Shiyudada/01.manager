<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="订单管理" third="订单列表"></mybreadxie>

    <!-- 表格 -->
    <!-- 添加border显示纵向边框 -->
    <el-table :data="tableData" style="width: 100%" border>
      <!-- 添加显示索引 -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款">
        <!-- 这个是自定义传值的一种方式,如果需要自定义传值,那么就加  <template slot-scope="scope"> </template>包起来,并且用 scope.row传值 -->
        <template slot-scope="scope">
          <!-- order_pay渲染出的数据是字符串0 -->
          <el-tag type="danger" v-if="scope.row.order_pay==='0'">未付款</el-tag>
          <el-tag type="success" v-else>已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">{{scope.row.create_time | formatTime }}</template>
      </el-table-column>
      <!-- 自定义例表模块 -->
      <el-table-column label="操作">
        <template>
          <!-- slot-scope="scope" -->
          <!-- 自定义的内容  plain控制边框样式,size控制大小,circle默认是圆形,这里是方的去掉就好 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="editFormVisible=true"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页    -->
    <el-pagination
      :page-sizes="[5,10,15,20]"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 弹框编辑 -->
    <el-dialog title="修改订单地址" :visible.sync="editFormVisible">
      <!-- class="addFormall"    label-position="right" 
     表单验证由prop里面写对于的名称  :model="addForm"并且记得在data里面写需要验证的数据的数组对象  :rules="rules"并且记得写rules:{}  这三个相关的控制,缺一不可  
      提交由 ref="ruleForm"  @click="submitForm('ruleForm')" 控制并且调用接口,缺一不可-->
      <el-form  class="my-form" label-width="80px" status-icon ref="editForm">
        <el-form-item label="省市区/县" prop="rolesname">
          <!-- <el-input autocomplete="off" placeholder="请选择"></el-input> -->
          <!-- Cascader 级联选择器    可以自己导入下拉框数据,也可以直接去axios中去搜distpicker找到vue用的那种,然后先加载包导入包并且复制里面的语法就可以了 -->
          <!-- <el-cascader expand-trigger="hover"   :options="options" v-model="selectedOptions2"></el-cascader> -->
          <!-- axios里面复制的省市联动独立组件 -->
          <v-distpicker></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="rolesdisable">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入comment时间处理机制
import moment from "moment";
// 导入省级联动 axios里面搜
import VDistpicker from "v-distpicker";

export default {
  data() {
    return {
      tableData: [{}, {}],
      sendData: {
        pagenum: "1",
        pagesize: 10
      },
      // 总条数
      total: 0,
     // 级联选择器数据
      // options,
      // selectedOptions2: [],
      //  弹框
      editFormVisible: false
    };
  },
  // 省级联动语法,axios里面搜
  components: { VDistpicker },
  //  过滤器处理时间
  filters: {
    formatTime(value) {
      //  处理时间  并且返回  基于moment
      return moment(value).format("YYYY-MM-DD   HH:mm:ss");
    }
  },
  methods: {
    //  整个页面
    async addOrders() {
      let res = await this.$http.get("orders", { params: this.sendData });
      console.log(res);
      //  赋值数据页面的数据
      this.tableData = res.data.data.goods;
      //  给total赋值,渲染出总页数
      this.total = res.data.data.total;
    },

    // 页面含量
    sizeChange(size) {
      this.sendData.pagesize = size;
      this.addOrders();
    },
    // 点击当前页面
    currentChange(current) {
      this.sendData.pagenum = current;
      this.addOrders();
    }
  },
  created() {
    this.addOrders();
  }
};
</script>
<style >
</style>