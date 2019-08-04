<template>
  <div class="app">Article</div>
</template>

<script>
export default {
  created () {
    this.$http.get('/articles').then(result => {
      console.log(result.data)
    })
  }
}
</script>

<style>
</style>
