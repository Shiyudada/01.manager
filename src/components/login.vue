<template>
<div class="login">

    <!-- 饿了么ui的表单组件 -->
<el-form 
  :model="formData" 
  status-icon
  ref="ruleForm2" 
  label-width="100px" 
  class="demo-ruleForm" 
  label-position='top'
  :rules="rules">

      <h2>用户登录</h2>
  <el-form-item label="用户名" prop="username">
    <el-input type="password" v-model.trim="formData.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="password">
    <el-input type="password" v-model.trim="formData.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button  class="login-btn" type="primary"  @click="submitForm('ruleForm2')">提交</el-button>
 
  </el-form-item>
</el-form>
</div>


</template>
<script>
export default {
    // 复制饿了么ui表单的data
  data() {
  
  
      return {
      formData: {
         username:'',
         password:'',
       
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 8 个字符', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入用户密码', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 10个字符', trigger: 'change' }
          ],

        }
       
      

      };
    },
     methods: {
      //  表单验证,饿了么ui里面的
      submitForm(formName) {
        // 提交数据之前的验证
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
           
            this.$http.post('login',this.formData).then(res=>{
              console.log(res)
              if(res.data.meta.status===400){
                 this.$message.error(res.data.meta.msg);
              }else{
                 this.$message.success(res.data.meta.msg);
                //  保存token
                window.sessionStorage.setItem('token',res.data.data.token)
                // 跳转网址
                this.$router.push('/index')
              }
            })
                this.$message.success('提交成功');

          } else {
            // console.log('error submit!!');
            // 饿了么ui里面的消息提示组件
            // 提交数据错误
             this.$message.error('请输入正确的用户名和密码');
            return false;
          }
        });
      },
     }
}
</script>

<style>

   html,body{
       height: 100%;
       margin: 0;
       padding: 0;
   }
   /* 这里不能直接写body>div,因为添加了警告组件,他自己自动生成了一个同级div,就相当于不是控制这一个diV了,那么提示框也会变成height100%,所以直接控制它的首个div就好了 */
   body>div:nth-of-type(1){
       height: 100%;
   }
    .login{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      background-color:#324152;


    }
    .el-form{
       width: 580px;
       height: 440px;
      box-sizing: border-box;
      padding:40px;
      border-radius: 10px;
      background-color: white;
    }
    .login-btn{
        width: 100%;
    }
</style>