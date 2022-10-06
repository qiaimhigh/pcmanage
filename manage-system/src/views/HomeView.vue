<script setup>
import AsideItem from '@/components/layout/AsideItem.vue';
import HeaderItem from '@/components/layout/HeaderItem.vue';
import TagHeader from '@/components/TagHeader.vue';
</script>
<template>
  <div class="common-layout" style="width: 100vw; height: 100vh;">
    <el-container style=" height: 100%;">
      <el-aside width="auto"><aside-item></aside-item></el-aside>
      <el-container>
        <el-header><header-item></header-item></el-header>
        <el-main>
          <tag-header ></tag-header>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang='less' scoped>
    .el-header{
        background-color: black;
        color: white;
    }
    .el-main{
        background-color: antiquewhite;
    }
    .el-aside{
        background-color: skyblue;
    }
</style>