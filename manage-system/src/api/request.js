import axios from "axios";
// const baseUrl = "http://element.thexxdd.cn/api/"
// const instance = axios.created({
//     baseUrl: baseUrl,
//     timeout: 3000,
//     responseType: 'json',
//     header: {
//         'Content-type': 'application/json'
//     }
// })

// export default instance;

const baseUrl = '/api';
class HttpRequest{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    // 配置信息
    getConfig(){
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }
    // 设置拦截器
    interceptors(instance){
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
          }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
          });
        
        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
          }, function (error) {
            console.log(error,'error');
            // 对响应错误做点什么
            return Promise.reject(error);
          });
    }
    // 创建实例
    request(options){
        console.log(options.data);
        const instance = axios.create();
        options = { ...options,...this.getConfig() }
        console.log(options);
        this.interceptors(instance);
        return instance(options)
    }
}
export default new HttpRequest(baseUrl)