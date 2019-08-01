<template>
  <div id="container">
    <el-card class="box-card"></el-card>
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
}
</style>
