<template>
  <div style="height: 100%; min-height: calc(100%);">
    <iframe :src='viewSrc' width='100%' height='100%' frameborder='1'></iframe>
  </div>
</template>
<script>
export default {
  name: 'viewFile',
  data () {
    return {
      viewSrc: 'https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwww.yezhuhongblog.com%2Fapi%2Fimages%2Fdocs%2F'
    }
  },
  mounted () {
    // 暂时
    let path = this.$route.query.path
    let index = path.lastIndexOf('/')
    let viewPath = path.substring(index + 1, path.length)
    this.viewSrc = this.viewSrc + viewPath
    console.log(this.viewSrc)
    if (viewPath.indexOf('pdf') > 0) {
      window.location.href = 'https://www.yezhuhongblog.com/api/images/docs/' + viewPath
    }
  }
}
</script>
