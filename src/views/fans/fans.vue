<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans-list">
            <div class="fans-item" v-for="item in fans" :key="item.id.toString()">
              <el-avatar style="width:80px;height:80px;" :src="item.photo"></el-avatar>
              <p style="font-size:14px">{{item.name}}</p>
              <el-button type="primary" size="mini" style="font-size:14px">+ 关 注</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝图表" name="photo">
          <!-- echarts -->
          <!-- 3.定义一个DOM容器 -->
          <div ref="fans_photo" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px;text-align:center"
        v-if=" total > reqParams.per_page"
        background
        layout="prev, pager, next,total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        :total="total"
        @current-change="changePages"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// 1安装
// 2.导入
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'list',
      reqParams: {
        page: 1,
        per_page: 24
      },
      // 粉丝列表
      fans: [],
      // 总粉丝数
      total: 0
    }
  },
  created () {
    this.getFans()
  },
  mounted () {
    const fansPhoto = this.$refs.fans_photo
    var mychart = echarts.init(fansPhoto)
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: [
          '直接访问',
          '邮件营销',
          '联盟广告',
          '视频广告',
          '搜索引擎',
          '百度',
          '谷歌',
          '必应',
          '其他'
        ]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '邮件营销',
          type: 'bar',
          stack: '广告',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'bar',
          stack: '广告',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'bar',
          stack: '广告',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '搜索引擎',
          type: 'bar',
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          markLine: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data: [[{ type: 'min' }, { type: 'max' }]]
          }
        },
        {
          name: '百度',
          type: 'bar',
          barWidth: 5,
          stack: '搜索引擎',
          data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name: '谷歌',
          type: 'bar',
          stack: '搜索引擎',
          data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
          name: '必应',
          type: 'bar',
          stack: '搜索引擎',
          data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
          name: '其他',
          type: 'bar',
          stack: '搜索引擎',
          data: [62, 82, 91, 84, 109, 110, 120]
        }
      ]
    }
    mychart.setOption(option)
  },
  methods: {
    // 分页函数
    changePages (newPage) {
      this.reqParams.page = newPage
      this.getFans()
    },
    // 获取粉丝列表
    async getFans () {
      const {
        data: { data }
      } = await this.$http.get('/followers', { params: this.reqParams })
      // console.log(data)
      this.fans = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.fans-item {
  width: 120px;
  height: 170px;
  border: 1px dashed #ddd;
  text-align: center;
  padding-top: 15px;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
}
</style>
