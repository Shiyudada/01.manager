// 这里是axios组件的抽取
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

