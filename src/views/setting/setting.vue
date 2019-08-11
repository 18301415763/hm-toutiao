<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格布局 -->
      <el-row>
        <el-col :span="12">
          <!-- form表单 -->
          <el-form label-width="80px">
            <el-form-item label="标题">{{userForm.id}}</el-form-item>
            <el-form-item label="手机">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称">
              <el-input type="text" style="width:400px" v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" :rows="3">
              <el-input type="textarea" style="width:400px" v-model="userForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input type="email" style="width:400px" v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changeUser()">保存修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action
            :http-request="myUpload"
            :show-file-list="false"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="font-size:14px;text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Store from '../../store/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userForm: {
        name: null,
        intro: null,
        email: null,
        id: null,
        photo: null,
        mobile: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 自定义上传
    myUpload (result) {
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http.patch('/user/photo', formData).then(result => {
        // console.log(result.data);
        this.$message.success('修改头像成功')
        // 预览
        this.userForm.photo = result.data.data.photo
        // 存到本地
        Store.setUser({ photo: result.data.data.photo })
        // 更新用户头像
        eventBus.$emit('updatePhoto', result.data.data.photo)
      })
    },
    // 修改用户资料
    async changeUser () {
      await this.$http.patch('/user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      // console.log(data)
      this.$message.success('修改成功')
      Store.setUser({ name: this.userForm.name })
      eventBus.$emit('updateUser', this.userForm.name)
    },
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('/user/profile')
      this.userForm = data
    }
  }
}
</script>

<style>
</style>
