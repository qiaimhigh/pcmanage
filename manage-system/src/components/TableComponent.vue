<script setup>
import { defineProps, defineEmits } from "vue";
let props = defineProps({
  tableData: {
    type: Array,
  },
  isHighLight: {
    type: Boolean,
    default: false,
  },
  config: {
    type: Object,
  },
  tableLabel:{
    type: Array
  }
});
const emit = defineEmits([]);
function removeOpe(row) {
  emit("removeRow", row);
  console.log("remove" + row);
}
function changeOpe(row) {
 console.log('result ' + row);
    emit("changeRow", row);
    console.log("change" + row);
 
}
function changePages(page) {
  emit("changePage", page);
}
console.log(props.tableLabel);
</script>
<template>
  <div class="common-table">
    <el-table
      :highlight-current-row="isHighLight"
      :data="tableData"
      height="90%"
      stripe
    >
      <el-table-column
        :show-overflow-tooltip=true
        v-for="item in tableLabel"
        :key="item.props"
        :label="item.label"
        :width="item.width ? item.width : 125"
        
      >
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row[item.props] }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-button @click="changeOpe(scope.row)">修改</el-button>
          <el-button type="danger" @click="removeOpe(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="20"
      class="pager"
      layout="prev, pager, next"
      :page-count="config.total"
      :current-page="config.page"
      @update:current-page="changePages"
    />
  </div>
</template>
<style lang="less">
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
