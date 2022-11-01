// 导入数据库
const bcrypt = require("bcryptjs");
const db = require('../mysql')
// 导入密钥
const {
    secretKey
} = require("../config")
// 注册
exports.registerApi = (req, res) => {
    // 判断用户名、密码是否合法
    const userInf = req.body;
    if (!userInf.username || !userInf.password) {
        return res.send({
            status: 1,
            message: '用户名或密码不能为空！'
        })
    }
    const sqlStr = "select * from user where username = ?";
    // 查询语句得到的是一个数组
    db.query(sqlStr, userInf.username, (err, result) => {
        if (err) {
            return res.cc(err)
        } else {
            if (result.length > 0) {
                return res.cc("用户名重复请重新填写！！！")
            } else {
                // 调用 bcrypt.hashSync()对密码进行加密
                userInf.password = bcrypt.hashSync(userInf.password, 10)
                const sqlStr2 = "insert into user set ?"
                db.query(sqlStr2, {
                    username: userInf.username,
                    password: userInf.password
                }, (err, result) => {
                    if (err) {
                        return res.cc("注册失败")
                    }
                    if (result.affectedRows !== 1) {
                        return res.cc("注册失败")
                    }
                    return res.cc("注册成功", 0)
                })
            }
        }
    })

}

//登录
exports.loginApi = (req, res) => {
    console.log(req.body);
    const userInf = req.body;
    const sqlStr = "select * from user where  username = ?"
    db.query(sqlStr, userInf.username, (err, result) => {
        console.log(result);
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc("登陆失败")
        // 判断用户密码是否正确
        const compareResult = bcrypt.compareSync(userInf.password, result[0].password);
        if (!compareResult) return res.cc("密码错误,请重新输入!");
        let rootStr = "select * from root where username = ?";
        let menu = [];
        db.query(rootStr, userInf.username, (err, result2) => {
            if (err) res.cc("用户信息获取失败");
            console.log("======");
            console.log(result2);
            menu = result2;
            // 生成token字符串
            const user = {
                ...result[0],
                password: '',
            };
            const jwt = require('jsonwebtoken');
            const tokenStr = jwt.sign(user, secretKey, {
                expiresIn: '10h'
            })
            res.send({
                code: 200,
                message: '登陆成功',
                token: 'Bearer ' + tokenStr,
                data: menu
            });
        })
    })
}

// 获取用户信息
exports.getInfApi = (req,res)=>{
    console.log(req.query);
    let selectKey = req.query.selectKey;
    let sqlStr ;
    sqlStr = selectKey ? "select * from userInf where name = ?" : "select * from userInf";
    db.query(sqlStr,selectKey,(err,result)=>{
        if(err) res.cc("获取失败");
        res.send({
            code: 200,
            message: '获取成功',
            data: result
        })
    })
}



// 删除用户信息
exports.deleteUser = (req,res)=>{
    let deleteName = req.body.name;
    const sqlStr = "delete * from userInf where name = ?";
    db.query(sqlStr,deleteName,(err,result)=>{
        if(err) res.cc(err);
        if (result.affectedRows !== 1) return res.cc('删除用户失败')
        res.send({
            code : 200,
            message: '删除用户失败',
        })
    })
}
// 新增用户
exports.addUser = (req,res)=>{
    let userInf = req.body;
    const sqlStr = "insert into userInf(name,addr,age,birth,sex) values (?,?,?,?,?)";
    db.query(sqlStr,[userInf.name,userInf.addr,userInf.age,userInf.sex],(err,result)=>{
        if(err) res.cc(err);
        if (result.affectedRows !== 1) return res.cc("增加用户失败")
        res.send({
            code: 200,
            message: '新增用户失败',
            
        })
    })
}