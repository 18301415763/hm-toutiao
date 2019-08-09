<template>
  <div class="app">
    <el-card>
      <div slot="header" class="clearfix">
        <!-- 头 -->
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 单选按钮 -->
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect" size="small" @change="changeCollect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right" @click="openDialog()">添加素材</el-button>
        <div class="img-list">
          <div class="img-item" v-for="item in images" :key="item.id">
            <img :src="item.url" alt />
            <div class="footer" v-show="!reqParams.collect">
              <span
                class="el-icon-star-off"
                :class="{selected:item.is_collected}"
                @click="toggleCollect(item)"
              ></span>
              <span class="el-icon-delete" @click="del(item.id)"></span>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <!-- v-if="total>reqParams.per_page" 分页大于1才显示 -->
        <el-pagination
          v-if=" total > reqParams.per_page"
          background
          layout="prev, pager, next"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          :total="total"
          @current-change="changePages"
        ></el-pagination>
      </div>
      <!-- 对话框 -->
      <el-dialog title="添加素材" :visible.sync="dialogVisible" width="30%">
        <!-- 上传组件 -->
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :drag="false"
          name="image"
          :headers="header"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import store from '../../store/store.js'
export default {
  name: 'Images',
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 总条数
      total: 0,
      // 素材
      images: [],
      // 对话框显示与否
      dialogVisible: false,
      // 图片预览
      imageUrl: '',
      // 设置请求头
      header: {
        Authorization: 'Bearer ' + store.getUser().token
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 显弹出框 进行 添加素材
    openDialog () {
      // this.imageUrl = ''
      this.dialogVisible = true
    },
    // 上传成功时的钩子函数
    handleAvatarSuccess (response) {
      console.log(response)
      this.imageUrl = response.data.url
      window.setTimeout(() => {
        this.$message.success('上传成功')
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
        // 上传成功后清空上传区域，也可以在下次上传前清空
        this.imageUrl = ''
      }, 2000)
    },
    // 删除素材
    del (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete('/user/images/' + id)
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 收藏与取消收藏
    async toggleCollect (item) {
      const {
        data: { data }
      } = await this.$http.put('/user/images/' + item.id, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '收藏成功' : '取消收藏')
      item.is_collected = data.collect
    },
    // 切换收藏与全部
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
      // console.log(123)
    },
    // 页码函数
    changePages (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 获取素材信息
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('/user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>
<style lang="less" scoped>
.img-list {
  margin-top: 20px;
  .img-item {
    width: 160px;
    height: 160px;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      bottom: 0;
      color: white;
      span {
        margin: 0 20px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
</style>
