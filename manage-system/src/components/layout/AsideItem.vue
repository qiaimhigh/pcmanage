<script setup>
import { useRouter } from "vue-router";
import { computed, reactive,onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
// let isCollapse = ref(false);
let asideData = reactive({
    data: [
        {
            path: '/',
            name: 'home',
            icon: 's-home',
            url: 'Home/Home',
            label: '首页'
        },
        {
            path: '/mall',
            name: '商品管理',
            icon: 'video-play',
            url: 'Home/Home',
            label: '商品管理'
        },
        {
            path: '/user',
            name: '用户管理',
            icon: 's-home',
            url: 'Home/Home',
            label: '用户管理'
        },
        {
            label: '其他',
            icon: 'location',
            path: '/fin',
            children:[
                {
                    path: '/page1',
                    name: '页面1',
                    icon: 'setting',
                    url: 'Other/PageOne',
                    label: '页面1'
                },
                {
                    path: '/page2',
                    name: '页面2',
                    icon: 'setting',
                    url: 'Other/pageTwo',
                    label: '页面2'
                }
            ]
        }
    ]
})
const noChildren = computed(()=>{
    return asideData.data.filter(item => !item.children)
})
const hasChildren = computed(()=>{
    return asideData.data.filter(item => item.children)
})

const handleClose = (key,keyPath)=>{
    console.log(key,keyPath);
}
const handleOpen = (key,keyPath)=>{
    console.log(key,keyPath);
}
const router = useRouter()
const routerPush = (item)=>{
    router.push({
        path: item.path
    })
    store.commit('selectMenu',item)
}
onMounted(()=>{
})
</script>
<template>
  <el-menu
    default-active="2"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffb04b"
    class="el-menu-vertical-demo"
    :collapse="store.state.isShowSide"
    @open="handleOpen"
    @close="handleClose"
  >
    <h3>{{!store.state.isShowSide ? '通用后台管理系统' : '后台'}}</h3>
    <el-menu-item @click="routerPush(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
        <el-icon><location /></el-icon>
      <template #title>
        <span>{{item.label}}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{item.label}}</span>
      </template>
      <el-menu-item-group>
        <!-- <template #title><span>Group One</span></template> -->
        <el-menu-item @click="routerPush(cItem)" v-for="cItem in item.children" :index="cItem.path" :key="cItem.path">
            <el-icon><location /></el-icon>
            <span>{{cItem.label}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>
<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse){
        width: 200px;
        min-height: 400px;
    }
    .el-menu--collapse{
transform: all 2s;
    }
    .el-menu{
        
        height: 100%;
        h3{
            text-align: center;
            color: #fff;
            line-height: 48px;
        }
    }
</style>
