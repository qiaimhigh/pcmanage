<script setup>
import { ref } from "vue";
let username = ref("");
let isShow = ref(false);
function changeState(){
  isShow.value = !isShow.value;
}
</script>
<template>
  <div class="box-body">
    <div class="box">
      <div class="pic"><img src="../../img/login.jpg" alt="" /></div>
      <div class="input_box">
        <div v-if="!isShow" class="login">
          <div class="title">后台管理系统</div>
          <el-col >
            <el-row :gutter="6" align="middle" justify="space-around">
              <span>账号</span>
              <el-input
                label="账号"
                v-model="username"
                placeholder="请输入账号"
              />
            </el-row>
            <el-row :gutter="6" align="middle" justify="space-around">
              <span>密码</span>
              <el-input
                v-model="password"
                type="password"
                placeholder="请输入密码"
                show-password
              />
            </el-row>
            <div class="btn_bot"><a href="#" @click="changeState">注册</a></div>
            <el-button class="btn" size="large" type="success">登录</el-button>
          </el-col>
        </div>
        <div v-if="isShow" class="register">
          <div class="title">后台管理系统</div>
          <el-row :gutter="6" align="middle" justify="space-around">
            <span>账号</span>
            <el-input
              label="账号"
              v-model="username"
              placeholder="请输入账号"
            />
          </el-row>
          <el-row :gutter="6" align="middle" justify="space-around">
            <span>密码</span>
            <el-input
              v-model="password"
              type="password"
              placeholder="请输入密码"
              show-password
            />
          </el-row>
          <div class="btn_bot"><a href="#" @click="changeState">登录</a></div>
          <el-button class="btn" size="large" type="success">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.box-body {
  background-image: url("../../img/bgc.jpg");
  width: 100vw;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  .box {
    width: 700px;
    display: flex;
    height: 350px;
    justify-content: space-between;
    align-content: center;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    overflow: hidden;
    .btn_bot{
      display: flex;
      justify-content: end;
      margin: 0 20px;
      a{
        font-size: 20px;
        font-weight: 600;
        text-decoration: none;
        color: rgb(46, 62, 69);
      }
    }
    button{
      margin: 0 auto;
      width: 150px;
      display: block;
    }
    .pic {
      width: 25%;
      height: 100%;
      background-color: antiquewhite;
      img{
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
      }
    }
    .input_box {
      width: 75%;
      .login,
      .register {
        width: 100%;
        background-color: rgba(225, 225, 225, 0.6);
        height: 100%;
        opacity: 4px;
        // filter: blur(2px);
        .btn{
          margin: 0 auto;
        }
        .title {
          width: 100%;
          padding-top: 20px;
          text-align: center;
          font-size: 40px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        span {
          font-size: 20px;
          font-weight: 600;
        }
        .el-input {
          width: 400px;
          height: 50px;
          margin: 10px;
        }
      }
    }
  }
}
</style>
