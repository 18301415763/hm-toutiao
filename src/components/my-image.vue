<template>
  <div class="my-image">
    <div class="img-btn" @click="openDialog()">
      <!--
        父传子:vlaue接收
        子传父:this.$emit('input',选中的图片/上传的图片)
      -->
      <!-- 若父组件有值,就使用value,没有就使用默认图片 -->
      <img :src="value||defaultImg" />
    </div>
    <!-- 对话框 -->
    <el-dialog title :visible.sync="dialogVisible" width="750px">
      <!-- tabs切换 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="images">
          <el-radio-group v-model="reqParams.collect" size="small" @change="changeCollect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img-list">
            <div
              class="img-item"
              v-for="item in images"
              :key="item.id"
              :class="{selected:selectedImageUrl===item.url}"
              @click="selectedImageUrl=item.url"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            v-if=" total > reqParams.per_page"
            background
            layout="prev, pager, next,total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            :total="total"
            @current-change="changePages"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
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
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Store from '../store/store'
import defaultImg from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // 默认显示的图片,显示不出来是因为webpack不支持动态属性的打包,支持src,href,link,import等的打包
      // 故 当前默认显示的图片需要使用 import 导入 进行打包
      // defaultImg: defaultImg,

      // 默认图片
      defaultImg,
      // 默认不显示对话框
      dialogVisible: false,
      // 默认激活那个tab
      activeName: 'images',
      // 素材库
      images: [],
      // 获取素材的请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 总条数
      total: 0,
      // 默认选中图片地址
      selectedImageUrl: null,
      // 上传图片地址
      uploadImageUrl: null,
      // 上传图片需要设置请求头
      header: {
        Authorization: 'Bearer ' + Store.getUser().token
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 确认图片
    confirmImage () {
      if (this.activeName === 'images') {
        // this.defaultImg = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        // this.defaultImg = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    // 上传后的函数
    handleAvatarSuccess (response) {
      // 预览图片
      this.uploadImageUrl = response.data.url
    },
    // 全部与收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 页码函数
    changePages (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 获取素材
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('/user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 对话框的显示
    openDialog () {
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      this.dialogVisible = true
    }
  }
}
</script>
<style lang='less' scoped>
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed lightgrey;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img-list {
  margin-top: 20px;
  .img-item {
    width: 160px;
    height: 160px;
    position: relative;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 20px;
    position: relative;
    // 通过伪元素来实现在图片上加一个div空容器
    &.selected {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3) url(../assets/images/selected.png)
          no-repeat center / 50px 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
