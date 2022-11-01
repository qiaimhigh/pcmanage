// 路由模块
const express = require("express");
const router = express.Router();
const { registerApi,loginApi,getInfApi,deleteUser,addUser } = require('../routerHandle')

// 用户注册
router.post('/register',registerApi);
// 用户登录
router.post('/login',loginApi);
// 获取用户信息
router.get('/getInf',getInfApi);
// 新增用户
router.post("/addUser",addUser);
// 删除用户
router.post("/delete",deleteUser);

module.exports = router;