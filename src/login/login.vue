<template>
  <div id="container">
    <el-card class="box-card">
      <img src="../assets/images/logo_index.png" class="image" />
      <el-form status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="pass">
          <el-input type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large">登录</el-button>
          <el-button type="primary" size="large">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
#container {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../assets/images/login_bg.jpg) no-repeat center / cover;
  .box-card {
    width: 400px;
    height: 300px;
    position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  .image {
    padding-left: 3.125rem;
  }
  .demo-ruleForm {
    margin-top: 1.25rem;
  }
}
</style>
