<template>
  <div class="article-container">
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>{{articleId?'编辑':'发布'}}管理</my-bread>
      </div>
      <el-form label-width="80px">
        <el-form-item label="标题">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="-1">自动</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
          </el-radio-group>
          <!-- my-image组件 -->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image
              v-model="articleForm.cover.images[0]"
              style="display:inline-block;margin-right:20px"
            ></my-image>
            <my-image
              v-model="articleForm.cover.images[1]"
              style="display:inline-block;margin-right:20px"
            ></my-image>
            <my-image
              v-model="articleForm.cover.images[2]"
              style="display:inline-block;margin-right:20px"
            ></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        articleId: null,
        title: null,
        channel_id: null,
        content: null,
        cover: {
          type: 1,
          images: []
        }
      },
      // 富文本自定义配置
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  created () {
    this.articleId = this.$route.query.id
    // 根据地址栏是否有参数判断 是编辑页 还是 发表页
    if (this.articleId) {
      this.getArticle()
    }
  },
  watch: {
    // 注意：监听data中的数据变化，this.$route 属于响应式数据
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  methods: {
    //
    async update (draft) {
      // 发请求
      await this.$http.put(
        `articles/${this.articleId}?draft=${draft}`,
        this.articleForm
      )
      // 提示
      this.$message.success(draft ? '修改，存入草稿成功' : '修改成功')
      // 跳转内容管理
      this.$router.push('/article')
    },
    // 获取选中的文章内容
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    // 发表或存入草稿
    async submit (draft) {
      await this.$http.post('/articles?draft=' + draft, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    changeType () {
      this.articleForm.cover.images = []
    }
  }
}
</script>

<style lang="less" scoped>
</style>
