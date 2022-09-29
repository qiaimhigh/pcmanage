import axios from './request'

// 注册接口
export function register(data){
    return axios({
        url: "/register",
        method: 'post',
        data
    })
}
// 获取表格数据
export function getMenu(data){
    return axios.request({
        data,
        url: '/permission/getMenu',
        method: 'post'
    })
}

// 获取home页面的数据
export function getHomeData(){
    return axios.request({
        url: '/home/getData',
        method: 'post'
    })
}