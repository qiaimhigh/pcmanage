<script setup>
import { defineProps,reactive,defineEmits } from "vue";
const props = defineProps({
  formLabel: {
    type: Array,
    default(){
      return [];
    }
  },
  form: {
    type: Object,
    default(){
      return {
        
      };
    }
  },
  inline: {
    type: Boolean,
    default: true
  },
});
let formData = reactive(props.form);
let formLabel = reactive(props.formLabel)
const emit = defineEmits(['update']);
console.log(formData);
function sendUpdate(){
  emit('update',formData);
}
</script>
<template>
  <el-form ref="form" label-width="100px" :module="formData" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="formData[item.model]"
        @change="sendUpdate"
      ></el-input>
      <el-switch
        v-if="item.type === 'switch'"
        v-model="formData[item.model]"
        @change="sendUpdate"
      ></el-switch>
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="请选择日期"
        v-model="formData[item.model]"
        @change="sendUpdate"
      ></el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="formData[item.model]"
        @change="sendUpdate"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
<style lang=""></style>
