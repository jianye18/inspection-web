<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
export default {
  name: 'App',
  mounted(){
    const width = document.documentElement.clientWidth
    if(width < 768){
      console.log(width)
      this.setMobile(true)
    }
  },
  methods: {
    ...mapMutations(['setMobile'])
  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
