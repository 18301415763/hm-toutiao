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
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- clearable 清空选项 -->
          <el-select v-model="reqParams.channel_id" clearable placeholder="请选择">
            <el-option
              v-for="item in channel_options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格组件 -->
      <!-- :data="articles" 绑定的表格数据 -->
      <el-table :data="articles" style="width: 100%">
        <!-- prop="date" 指定字段 -->
        <el-table-column prop="id" label="封面" width="236">
          <!-- 图片渲染 -->
          <template slot-scope="scope">
            <!-- result.data.data === scope -->
            <!-- 每行所有数据都存在 row 中 -->
            <el-image
              :src="scope.row.cover.images[0]"
              style="width:120px;height:80px"
              fit="cantain"
            >
              <!-- 当图片加载不出时显示 以下图片 -->
              <div slot="error">
                <img src="../../assets/images/error.gif" style="width:120px;height:80px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="236"></el-table-column>
        <el-table-column label="状态" width="236">
          <template slot-scope="scope">
            <!-- 通过判断状态码来显示对应状态 -->
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <!-- 获取发布时间 -->
        <el-table-column prop="pubdate" label="发布时间" width="236"></el-table-column>
        <!--  -->
        <el-table-column label="操作" width>
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" circle plain type="primary" @click="edit(scope.row.id)"></el-button>
            <el-button icon="el-icon-delete" circle plain type="danger" @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <!-- prev:左箭头 page:页码 next:右箭头 total:总条数 -->
      <div style="text-align:center;margin-top:30px;">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :page-size="reqParams.per_page"
          :total="total"
          :current-page="reqParams.page"
          @current-change="changePages"
        ></el-pagination>
      </div>
    </el-card>
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
        end_pubdate: null,
        // 当前页
        page: 1,
        // 每页显示条数
        per_page: 10
      },
      // 下拉框数据
      channel_options: [],
      // 日期数据
      dateArr: [],
      // 内容管理数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    this.getChannelOptions()
    this.getArticles()
  },
  // 方法
  methods: {
    // 获取下拉框数据
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('/channels')
      // console.log(data.channels)
      this.channel_options = data.channels
    },
    // 获取内容管理数据
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('/articles', { params: this.reqParams })
      // console.log(data.results)
      this.articles = data.results
      this.total = data.total_count
    },
    // 页码改变事件函数
    changePages (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 筛选函数
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    // 选择日期后函数
    changeDate (dateArr) {
      // console.log(this.dateArr)
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 删除文章
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete('articles/' + id)
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 跳转编辑页
    edit (id) {
      this.$router.push('/publish?' + id)
    }
  },
  // 使用watch监听数据的变化
  watch: {
    'reqParams.channel_id': function (newVal, oldVal) {
      // console.log(oldVal, newVal)
      if (newVal === '') {
        this.reqParams.channel_id = null
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
