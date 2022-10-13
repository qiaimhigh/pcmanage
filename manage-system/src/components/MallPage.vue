<script setup>
import FormComponent from "./FormComponent.vue";
import { getUserList,confirmUser,addUser,deleUser } from '@/api/api'
import { onMounted, reactive, ref } from "vue";
import TableComponent from "./TableComponent.vue";
import { ElMessage} from 'element-plus'
let isShow = ref(false);
let operateType = ref("add");
let operateFormLabel = reactive({
  data: [
    {
      model: "name",
      label: "姓名",
      type: "input",
    },
    {
      model: "age",
      label: "年龄",
      type: "input",
    },
    {
      model: "sex",
      label: "性别",
      type: "select",
      opts: [
        {
          label: "男",
          value: 1,
        },
        {
          label: "女",
          value: 0,
        },
      ],
    },
    {
      model: "birth",
      label: "出生日期",
      type: "date",
    },
    {
      model: "addr",
      label: "地址",
      type: "input",
    },
  ],
});
let operateForm = reactive({
  name: "",
  addr: "",
  age: "",
  birth: "",
  sex: "",
});
let formLabel = reactive({
    data:  [
                {
                    model: "keyword",
                    label: '',
                    type: 'input'
                }
            ]
})
let searchKey = reactive({})
let searchForm = reactive({})
// 表格数据
let tableData = reactive({
  data: []
})
let tableLabel = reactive({
  data:[
    {
      props:'name',
      label: '姓名',
      width: 200
    },
    {
      props:'age',
      label: '年龄',
      width: 200
    },
    {
      props:'sexLabel',
      label: '性别',
      width: 200
    },
    {
      props:'birth',
      label: '出生日期',
      width: 200
    },
    {
      props:'addr',
      label: '地址',
      width: 302
    },
  ]
})
let config = reactive({
  page: 1,
  total: 30
})

// 获取用户信息
function getList(name = ''){
  config.isLoading = true;
  name ? (config.page = 1) : ''
  getUserList({
    page : config.page,
    name
  }).then(res=>{
    // console.log(res);
    tableData.data = res.data.list.map(item =>{
      item.sizeLabel = item.sex === 0 ?'女':'男'
      return item;
    })
    config.total = res.count;
    config.isLoading = false;
    console.log(tableData.data);
  })
}
// 更新用户数据
function changeForm(res){
  operateForm.data = res;
  console.log(operateForm.data);
}
// 提交用户信息
function confirm(){
  console.log(operateType.value);
    if(operateType.value == 'edit'){
      confirmUser(operateForm.data).then(res=>{
        console.log(res);
        isShow.value = false;
        getList()
      })
    }else{
      addUser(operateForm.data).then(res=>{
        console.log(res);
        isShow.value = false;
        getList()
        
      })
    }
}
// 增加用户
function addUse(){
    isShow.value = true;
    operateType.value = 'add';
    operateForm.data = {
      name: "",
      addr: "",
      age: "",
      birth: "",
      sex: "",
    }
}
// 修改用户信息，修改当前度组件的植（子->父）
function changeUser(row){
  isShow.value = false;
  operateType.value = 'edit';
  operateForm = row;
}
// 删除用户信息
function deeUser(res){
  deleUser(res).then(res=>{
    console.log(res);
    if(res.data.code == 20000){
      getList()
      ElMessage.success('删除成功')
    }
  })
}

onMounted(()=>{
  getList();
})
</script>
<template>
  <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" v-model="isShow">
    <form-component
        :formLabel="operateFormLabel.data"
        :form="operateForm"
        ref="form"
        @update="changeForm"
    ></form-component>
    <div class="footer">
        <el-button @click="confirm" type="primary">确认</el-button>
        <el-button @click="isShow = false">取消</el-button>
    </div>
  </el-dialog>
  <div class="manger-header">
    <el-button type="primary" @click="addUse">+ 新增</el-button>
    <form-component
        :formLabel="formLabel.data"
        :form = "searchForm"
        ref="form"
    >
        <el-button type="primary" @click="getList(searchKey)">搜索</el-button>
    </form-component>
  </div>
  <table-component
    :tableData="tableData.data"
    :tableLabel="tableLabel.data"
    :config="config"
    @changePage="getList(val)"
    @removeRow="deeUser"
    @changeOpe="changeUser"
  ></table-component>
</template>
<style lang="less">
    .manger-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
