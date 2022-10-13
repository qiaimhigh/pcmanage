import axios from './request'
// 登录接口
export function userLogin(data){
    return axios.request({
        url: '/login',
        method: 'post',
        data
    })
}
// 注册接口
export function register(data){
    return axios.request({
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

// 获取用户数据
export function getUserList(){
    return axios.request({
        url: '/user/getUser',
        method: 'post'
    })
}
// 提交用户信息
export function confirmUser(data){
    return axios.request({
        url: '/user/edit',
        method: 'post',
        data
    })
}
// 增加用户信息
export function addUser(data){
    return axios.request({
        url: '/user/add',
        method: 'post',
        data
    })
}

// 删除用户信息
export function deleUser(data){
    return axios.request({
        url: '/user/delUser',
        method: 'post',
        data
    })
}