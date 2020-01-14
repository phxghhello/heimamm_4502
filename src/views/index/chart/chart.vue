<template>
  <div class="chart-container">
    <!-- 头部 -->
    <el-card class="card-header">
      <ul class="circle-box">
        <li class="circle-item">
          <div class="circle primary">{{ titleData.increment_users}}</div>
          <span>今日新增用户</span>
        </li>
        <li class="circle-item">
          <div class="circle primary">{{titleData.total_users}}</div>
          <span>总用户量</span>
        </li>
        <li class="circle-item">
          <div class="circle error">{{titleData.increment_questions}}</div>
          <span>新增试题</span>
        </li>
        <li class="circle-item">
          <div class="circle error">{{titleData.total_questions}}</div>
          <span>总试题量</span>
        </li>
        <li class="circle-item">
          <div class="circle success">{{titleData.total_done_questions}}</div>
          <span>总刷题量</span>
        </li>
        <li class="circle-item">
          <div class="circle success">{{titleData.personal_questions}}</div>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <!-- 底部 -->
    <el-card class="card-main">
      <h2 class="title">整体数据</h2>
      <div ref="chartsBox" class="charts-box"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import {chatTitle,enterpriseData} from '@/api/chart.js'
export default {
  name: "chart",
  data() {
    return {
      //饼状图数据
      titleData:{},
    }
  },
  created() {
    chatTitle().then(res=>{
      // window.console.log(res)
      this.titleData = res.data;
    });
    enterpriseData().then(res=>{
      window.console.log(res)
      this.$nextTick(()=>{
        //基于准备好的dom,初始化echarts实例
        const myChart = echarts.init(this.$refs.chartsBox);
        //准备好legend数据
        const legendData = [];
        res.data.forEach(v=>{
          legendData.push(v.name)
        });
        window.console.log(legendData);
                // 指定图表的配置项和数据
        const option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: "right",
            data: legendData
          },
          series: [
            {
              name: "整体数据",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              color: ["#f76137", "#f9b358", "#409eff",'#68a132'],
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: res.data
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

      })
    })
  },
};
</script>

<style lang="less">
<<<<<<< HEAD
=======
.chart-container {
  .card-header {
    // height: 149px;
    .circle-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .circle-item {
        list-style: none;
        div.circle {
          width: 99px;
          height: 99px;
          border-radius: 50%;
          border: 2px solid black;
          font-size: 35px;
          text-align: center;
          line-height: 99px;
>>>>>>> question

          &.primary {
            border-color: #0086fa;
            color: #0086fa;
          }
          &.error {
            border-color: #f76137;
            color: #f76137;
          }
          &.success {
            border-color: #55cd78;
            color: #55cd78;
          }
        }
        span {
          font-size: 16px;
          margin-top: 10px;
          color: #737373;
          display: block;
          margin-top: 10px;
          text-align: center;
        }
      }
    }
  }
  .card-main {
    margin-top: 20px;
    position: relative;
    .title {
      position: absolute;
      left: 55px;
      top: 34px;
      color: #666666;
      font-weight: normal;
    }
    .charts-box {
      height: 571px;
    }
  }
}
</style>