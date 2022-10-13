<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import Cookie from 'js-cookie'
import { userLogin } from '@/api/api'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
let userInf = reactive({
  username: '',
  password: ''
})
let rules = reactive({
  username: [
    {required: true, message: '请输入账号',trigger: 'blur' },
    {min: 3, max: 20,message: '账号长度应为3到20之间',trigger: 'blur'}
  ],
  password: [
    {required: true,message: '请输入密码',trigger: 'blur'},
    {min: 4,max: 20,message: '密码的长度应为4到20', trigger: 'blur'}
  ]
})
let store = useStore();
function menuData(data){
  store.commit('getAsideMenu',data)
}
let form = ref();
let router = useRouter()
// 登录接口
const submitForm =  (form)=>{
  if(!form) return ;
  console.log(form);
  form.validate(async (isValid)=>{
    console.log(isValid);
    if(isValid){
      let res = await userLogin(userInf);
      console.log(res)
      if(res.data.code == 200){
        Cookie.set('token',res.data.data.token)
        ElMessage.success(res.data.data.message)
        console.log(res.data.data);
        Cookie.set('menu',JSON.stringify(res.data.data.menu))
        menuData(res.data.data.menu)
        store.commit('addRoute',router)
        router.push({name: 'home'})
      }else{
        userInf.username = '';
        userInf.password = ""
        ElMessage.error(res.data.data.message)
      }
    }
  })
}


</script>
<template>
  <el-form ref="form" class="form_box" :rules="rules" :model="userInf" show-message>
    <h3 class="login_title">用户登录</h3>
    <el-form-item prop="username" label="账号">
      <el-input  v-model="userInf.username"  placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input type="password"  v-model="userInf.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"  @click="submitForm(form)">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<style lang='less'>
.form_box{
  width: 400px;
  border: 1px solid #cfcfcf;
  border-radius: 10px;
  position: absolute;
  padding: 20px ;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  box-shadow:  0 0 25px #cac6c6;
  box-sizing: border-box;
  .login_title{
    font-size: 30px;
    margin: 20px 0;
  }
  .el-input{
    width: 200px;
  }
}
</style>