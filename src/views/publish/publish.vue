<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>发布管理</my-bread>
      </div>
      <el-form label-width="80px">
        <el-form-item label="标题" v-model="articleForm.title">
          <el-input style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容">富文本</el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="-1">自动</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
          </el-radio-group>
          <div class="img-btn">
            <img src="../../assets/images/default.png" alt />
          </div>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="articleForm.channle_id"></my-channel>
        </el-form-item>
        <el-from-item>
          <el-button type="primary" size="small" style="margin-left:40px">发表</el-button>
          <el-button type size="small">存入草稿</el-button>
        </el-from-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleForm: {
        title: '',
        channel_id: null,
        cover: {
          type: 1
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
