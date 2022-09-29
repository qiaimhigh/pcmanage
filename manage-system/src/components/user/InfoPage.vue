<script setup></script>
<template>
  <el-row :gutter="20">
    <el-col :span="8" :offset="0">
      <div class="user-card">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">
            {{ "List item " + o }}
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<style lang=""></style>
