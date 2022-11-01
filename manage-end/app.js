const express = require("express");
const app = express();
// 配置跨域
const cors = require("cors");
const router = require("./router");
app.use(cors());


// 封装res.cc函数
app.use((req,res,next)=>{
    res.cc = (err,status = 1)=>{
        res.send({
            code: status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

app.use(express.urlencoded({extended:false})) // 解析application/x-www-form-urlencoded格式的表单数据
app.use(express.json());

// 解析token字符串
const { secretKey } = require("./config");
const { expressjwt:jwt } = require('express-jwt');
app.use(jwt({secret: secretKey,algorithms: ["HS256"]}).unless({path: [/^\/api\//]}))

// 路由
app.use('/api',router);

// 错误级别中间件
app.use((err,req,res,next)=>{
    // 捕获token错误的信息,身份认证
    if(err.name === "UnauthorizedError") return res.cc("身份认证失败！")
    // 未知错误
    return res.send(err)
})

app.listen(3100,()=>{
    console.log('http://127.0.0.1.3100');
})