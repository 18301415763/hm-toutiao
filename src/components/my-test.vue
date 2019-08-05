<template>
  <div class="container">
    <div class="header">header</div>
    <!-- <div>content</div> -->
    <div class="content">
      <!-- 插槽：如果不写名字，认为是 默认插槽,只能写一处 -->
      <!-- <slot></slot> -->

      <!-- 给插槽名字，具名插槽 -->
      <slot name="content" :msg1="msg1"></slot>

      <!-- 若组件中没有额外内容,这么写是使用'备用内容' -->
      <!-- <slot>备用内容</slot> -->
    </div>
    <div class="footer">
      <slot name="footer" :msg="msg" a="hello world"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-test',
  data () {
    return {
      msg: '组件内部的数据',
      msg1: 'hello world'
    }
  }
}
</script>
<style lang="less" scoped>
</style>
