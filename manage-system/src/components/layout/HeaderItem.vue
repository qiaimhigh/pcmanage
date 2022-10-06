<script setup>
import { Menu, UserFilled } from "@element-plus/icons-vue";
import { useStore,mapState } from "vuex";
import { computed } from 'vue'

const store = useStore();
function changeAside() {
  store.commit("changeSide");
}
let storeState = {};
const storeFns = mapState(['tabsList']);
Object.keys(storeFns).forEach((key) => {
  const fn = storeFns[key].bind({ $store: store });
  storeState[key] = computed(fn);
});
let { tabsList } = storeState;
console.log(tabsList);
</script>
<template>
  <header>
    <div class="h-top">
      <el-button @click="changeAside" :icon="Menu" plain></el-button>
      <!-- <h3>首页</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path: item.path}" v-for="item in tabsList" :key="item.label">{{
          item.label
        }}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>promotion management</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="r-top">
      <el-dropdown trigger="click">
        <el-avatar
          :icon="UserFilled"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          shape="square"
          alt="头像"
        ></el-avatar>
        <template #dropdown>
          <el-dropdown-menu divided>
            <el-dropdown-item><span>个人中心</span></el-dropdown-item>
            <el-dropdown-item><span>退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>
<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .h-top {
    display: flex;
    align-items: center;
    height: 100%;
    .el-button {
      margin: 5px 10px;
    }
  }
  .r-top {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
