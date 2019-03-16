// 这里是axios组件的抽取
// 导入vue
import Vue from 'vue'
// 导入axios
import axios from 'axios'
// 设置基地址
axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
// 暴露出去

export default {
    // 实现install方法
    install(Vue){
        // 把axios设置到vue.原型
      Vue.prototype.$http=axios
    }
}
// axios拦截 请求拦截器
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config) //请求拦截器在发送请求之前获取到请求的设置
    // 所以可以在这里可以认为的更改其中的值    所以我在这里设置token就可以所有的请求发送之前都可以用,不需要一个一个区设置了
   config.headers.Authorization = window.sessionStorage.getItem("token");
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
//  响应拦截器 响应回来之后      可以获取到服务器响应的内容
  // Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    //统一设置弹框
    Vue.prototype.$message(response.data.meta.msg)

    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
