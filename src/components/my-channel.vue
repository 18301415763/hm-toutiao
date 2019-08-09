<template>
  <div id="container">
    <el-select :value="value" clearable placeholder="请选择" @change="fn">
      <el-option v-for="item in channel_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // 下拉框数据
      channel_options: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    fn (value) {
      if (value === '') value = null
      this.$emit('input', value)
    },
    // 获取下拉框数据
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('/channels')
      this.channel_options = data.channels
    }
  },
  // 使用watch监听下拉框数据的变化
  watch: {
    value: function (newVal, oldVal) {
      if (newVal === '') {
        this.value = null
      }
    }
  }
}
</script>

<style>
</style>
