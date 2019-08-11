<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button
              type="danger"
              v-if="scope.row.comment_status"
              size="mini"
              @click="changeComment(scope.row)"
            >关闭评论</el-button>
            <el-button v-else type="primary" size="mini" @click="changeComment(scope.row)">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
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
export default {
  data () {
    return {
      // 请求参数
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      // 评论
      comments: [],
      // 总条数
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    // 实现打开/关闭评论
    async changeComment (row) {
      const {
        data: { data }
      } = await this.$http.put('/comments/status?article_id=' + row.id, {
        allow_comment: !row.comment_status
      })
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      row.comment_status = data.allow_comment
    },
    // 分页函数
    changePages (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    // 获取评论列表
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('/articles', { params: this.reqParams })
      // console.log(data)
      this.comments = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
</style>
