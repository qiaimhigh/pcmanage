<script setup>
import { reactive, computed, watch,ref,defineProps } from "vue";
import * as echarts from 'echarts'
const props = defineProps({
  isAxisChart: {
    type: Boolean,
    default: true,
  },
  echartsData: {
    type: Object,
    default() {
      return {
        xData: [],
        series : []
      };
    },
  },
});
// 线图
const axisOptions = reactive({
  data: {
    legend: {
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
    },
    grid: {
      left: "20%",
    },
    // 提示框
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", // 类目轴
      data: [],
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
      axisLabel: {
        interval: 0,
        color: "#333",
      },
    },
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
      },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
  },
});
// 饼状
const circleOptions = reactive({
  data: {
    tooltip: {
      trigger: "item",
    },
    color: [
      "#0f78f4",
      "#dd536b",
      "#9462e5",
      "#a6a6a6",
      "#e1bb22",
      "#39c362",
      "#3ed1cf",
    ],
    series: [],
  },
});
const options = computed(() => {
  return props.isAxisChart ? axisOptions.data : circleOptions.data;
});
let echart = null;
let echartsCom = ref(null);
function initEcharts(){
    initEchartsData();
    if(echart && options.value){
        echart.setOption(options.value);
    }else{
        echart = echarts.init(echartsCom.value);
        echart.setOption(options.value);
    }
}

function initEchartsData(){
    if(props.isAxisChart){
        // console.log(props.echartsData.xData[0].data);

        axisOptions.data.xAxis.data = props.echartsData.xData.data;
        axisOptions.data.series = props.echartsData.series;
    }else{
        circleOptions.data.series = props.echartsData.series;
    }
}

watch(props.echartsData,()=>{
    initEcharts();
},{
    deep :true
})
</script>
<template>
  <div ref="echartsCom"></div>
</template>
<style lang="less"></style>
