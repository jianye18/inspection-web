<template>
  <div class="statement-con" v-html="statementContent"></div>
</template>
<script>
import axios from '@/libs/api.request'
export default {
  name: 'Statement',
  data () {
    return {
      statementContent: ''
    }
  },
  mounted () {
    this.visitorCount()
    this.getOneViewStatement()
  },
  methods: {
    getOneViewStatement () {
      let _this = this
      const option = {
        url: '/api/show/getOneViewStatement',
        method: 'get'
      }
      axios.request(option).then(res => {
        _this.statementContent = res.data.data.content
        console.log(res.data.data)
      })
    },
    visitorCount () {
      const option = {
        url: '/api/show/visitorCount',
        method: 'get'
      }
      axios.request(option).then(res => {})
    }
  }
}
</script>
