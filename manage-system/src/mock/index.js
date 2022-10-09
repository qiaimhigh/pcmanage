import   Mock  from 'mockjs';
import homeAPi  from './mockServeData'
import userApi from './user'
Mock.mock('/home/getData',homeAPi.getStatisticalData)
Mock.mock(/user\/add/,'post',userApi.createUser)
Mock.mock(/user\/edit/,'post',userApi.updateUser)

Mock.mock(/user\/getUser/,'post',userApi.getUserList)
Mock.mock(/user\/delUser/,'post',userApi.deleteUser)

