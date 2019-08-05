<template>
  <div class="app">
    <!-- 筛选区域 -->
    <el-card>
      <!-- 面包屑组件 -->
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- form表单组件 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="1">草稿</el-radio>
            <el-radio :label="2">待审核</el-radio>
            <el-radio :label="3">审核通过</el-radio>
            <el-radio :label="4">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channel_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <my-test> -->
    <!-- slot属性的值就是 插槽的名字，以此来指定插槽,并显示内容 -->
    <!-- <div slot="content"></div> -->

    <!-- 2.6.0 的新写法 v-slot -->
    <!-- <template v-slot:content="scope">content：{{scope.msg1}}</template> -->
    <!-- slot-scope="msg" 指定 插槽 获取传递过来的'所有自定义属性和值'的集合数据--对象 {msg:'值'}-->
    <!-- <div slot="footer" slot-scope="scope">footer 获取组件内部的数据：{{scope.a}}</div> -->
    <!-- </my-test> -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 0 条结果：</div>
      <!-- 表格组件 -->
      <!-- :data="tableData" 绑定的表格数据 -->
      <el-table :data="articles" style="width: 100%">
        <!-- prop="date" 指定字段 -->
        <el-table-column prop="id" label="编号" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <!-- prev:左箭头 page:页码 next:右箭头 total:总条数 -->
      <div style="text-align:center;margin-top:30px;">
        <el-pagination background layout="prev, pager, next, total" :total="1000"></el-pagination>
      </div>
    </el-card>
    <!-- 结果区域 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 请求参数(传给后台的数据)
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 下拉框数据
      channel_options: [
        { label: 'HTML', value: '0001' },
        { label: 'CSS', value: '0002' }
      ],
      // 日期数据
      dateArr: [],
      // 内容管理数据
      articles: []
    }
  }
}
</script>
<style lang="less" scoped>
</style>
