<script setup>
import * as echarts from "echarts";
import { reactive, onMounted, ref } from "vue";
import { getHomeData } from "@/api/api";
const tableData = reactive({
  data: [
    {
      name: "oppo",
      todayBuy: 100,
      monthBuy: 300,
      totalBuy: 800,
    },
    {
      name: "oppo",
      todayBuy: 100,
      monthBuy: 300,
      totalBuy: 800,
    },
    {
      name: "oppo",
      todayBuy: 100,
      monthBuy: 300,
      totalBuy: 800,
    },
    {
      name: "oppo",
      todayBuy: 100,
      monthBuy: 300,
      totalBuy: 800,
    },
    {
      name: "oppo",
      todayBuy: 100,
      monthBuy: 300,
      totalBuy: 800,
    },
    {
      name: "oppo",
      todayBuy: 100,
      monthBuy: 300,
      totalBuy: 800,
    },
  ],
});
const tableLabel = reactive({
  name: "手机",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总共购买",
});
const countData = reactive({
  data: [
    {
      name: "今日支付订单",
      value: 210,
      icon: "location",
      color: "#2ec7c9",
    },
    {
      name: "今日支付订单",
      value: 210,
      icon: "location",
      color: "#2ec7c9",
    },
    {
      name: "今日支付订单",
      value: 210,
      icon: "location",
      color: "#2ec7c9",
    },
    {
      name: "今日支付订单",
      value: 210,
      icon: "location",
      color: "#2ec7c9",
    },
    {
      name: "今日支付订单",
      value: 210,
      icon: "location",
      color: "#2ec7c9",
    },
    {
      name: "今日支付订单",
      value: 210,
      icon: "location",
      color: "#2ec7c9",
    },
  ],
});
const lineEcharts = ref(null);
const zhuEcharts = ref(null);
const circleEcharts = ref(null);
onMounted(() => {
  getHomeData().then((res) => {
    console.log(res);
    if (res.data.code === 200) {
      tableData.data = res.data.data.tableData;
      const lineData = res.data.data.orderData;
      const xAxis = lineData.date;
      const legend = Object.keys(lineData.data[0]);
      let series = [];

      legend.forEach((element) => {
        series.push({
          name: element,
          type: "line",
          data: lineData.data.map((item) => item[element]),
        });
      });
      // 折线图的配置项
      const option = {
        series,
        xAxis: {
          type: "category",
          data: xAxis,
        },
        yAxis: {},
        legend: {
          data: legend,
        },
        tooltip: {
          trigger: "axis",
        },
      };
      console.log(lineEcharts.value);
      const E = echarts.init(lineEcharts.value);
      console.log(E);
      E.setOption(option);
      //  柱状图
      const option_zhu = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        xAxis: [
          {
            type: "category",
            data: res.data.data.userData.map((item) => item.date),
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "新增用户",
            data: res.data.data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: res.data.data.userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      const E2 = echarts.init(zhuEcharts.value);
      E2.setOption(option_zhu);
      // 饼状图
      const option_circle = {
        title: {
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            // name: "Access From",
            type: "pie",
            radius: "50%",
            data: res.data.data.videoData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      const E3 = echarts.init(circleEcharts.value)
      E3.setOption(option_circle)
    }
  });
});
</script>
<template>
  <el-row :gutter="20">
    <el-col :span="8" :offset="0">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>用户卡片</span>
            <!-- <el-button class="button" text>Operation button</el-button> -->
          </div>
        </template>
        <el-col class="user-bottom">
          <el-row class="avatar">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <div class="userInf">
              <p class="admin">Admin</p>
              <p class="admin-level">超级管理员</p>
            </div>
          </el-row>

          <div class="login-inf">
            <p>上次登陆时间：<span>2021-7-19</span></p>
            <p>上次登录地点：<span>西安</span></p>
          </div>
        </el-col>
      </el-card>
      <el-table
        class="table-card"
        :data="tableData.data"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column
          v-for="(item, key) in tableLabel"
          :key="key"
          :prop="key"
          :label="item"
        ></el-table-column>
      </el-table>
    </el-col>
    <el-col :span="16">
      <div class="order-card" align="middle">
        <el-card
          :body-style="{ padding: 0, display: 'flex' }"
          v-for="item in countData.data"
          :key="item"
        >
          <el-icon style="width: 120px; background-color: red; height: 120px"
            ><location
          /></el-icon>
          <div class="detail">
            <p>{{ item.name }}</p>
            <p>{{ item.value }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px; width: 100%">
        <div ref="lineEcharts" style="width: 100%; height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="zhuEcharts" style="height: 260px; width: 100%"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="circleEcharts" style="width: 100%; height: 260px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<style lang="less" scoped>
.box-card {
  width: 100%;
  height: 32vh;
}
.table-card {
  height: 52vh;
  font-size: 20px;
}
.order-card {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
  .el-card {
    width: 30%;
    margin: 10px 0;
    height: 120px;
  }
  .detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 600;
    width: calc(100% - 120px);
    p {
      margin: 10px;
    }
  }
}
.avatar {
  align-items: center;
  justify-content: start;
  .userInf {
    p {
      font-size: 25px;
      margin: 5px;
      text-align: center;
    }
  }
  .el-avatar {
    width: 120px;
    height: 120px;
    margin-right: 100px;
  }
}
.login-inf {
  p {
    font-size: 18px;
    margin: 10px 0;
    text-align: start;
    span {
      margin-left: 20px;
    }
  }
}

.graph {
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 49%;
    margin: 10px 0;
  }
}
</style>
