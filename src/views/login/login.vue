<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt srcset />
      <el-form
        style="margin-top:20px"
        :model="loginForm"
        :rules="loginRules"
        status-icon
        ref="loginForm"
      >
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            style="width:220px;margin-right:15px"
            placeholder="请输入验证码"
          ></el-input>
          <el-button type="primary">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '../../store/store'
export default {
  data () {
    // 自定义手机号校验规则
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号码格式不正确'))
      }
      callback()
    }
    // 自定义验证码校验规则
    const checkCode = (rule, value, callback) => {
      if (!/\d{6}/.test(value)) {
        return callback(new Error('验证码不正确'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '18734168411',
        code: '246810'
      },
      // 单个校验
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' },
          {
            validator: checkCode,
            message: '验证码必须是6为数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 整体校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log('整体校验成功')
          this.$http
            .post('authorizations', this.loginForm)
            .then(({ data }) => {
              // console.log(data)
              // 跳转之前保存用户信息
              store.setUser(data.data)
              // 成功后跳转到首页
              this.$router.push('/index')
            })
            .catch(() => {
              this.$message.error('手机号或者验证码不正确')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  // center / cover  背景图定位 / 背景图尺寸 cover 等比缩放铺满容器多余被裁剪 contian  等比缩放完全显示在当前容器可能存在留白
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
