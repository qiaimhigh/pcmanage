import   Mock  from 'mockjs';
import homeAPi  from './mockServeData'
import userApi from './user'
import loginApi from './loginUser'
// 获取侧边栏
Mock.mock('/home/getData',homeAPi.getStatisticalData)
// 新增用户
Mock.mock(/user\/add/,'post',userApi.createUser)
// 修改用户的数据
Mock.mock(/user\/edit/,'post',userApi.updateUser)
// 获取用户数据
Mock.mock(/user\/getUser/,'post',userApi.getUserList)
// 删除用户
Mock.mock(/user\/delUser/,'post',userApi.deleteUser)
// 登录验证
Mock.mock(/login/,"post",loginApi.getMenu)