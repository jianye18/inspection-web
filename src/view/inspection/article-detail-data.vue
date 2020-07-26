<style>
  .detail-data{
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 10px;
  }
  .detail-data{
    padding-top: 30px;
  }
  .detail-data-title{
    font-size: 18px;
    font-weight: bold;
  }
  .detail-data .ivu-col{
    padding: 5px 0;
  }
  .detail-data-content{
    text-align:justify
  }
  .detail-data-content p{
    font-size: 14px;
    padding: 5px 0 5px;
    line-height: 25px;
  }
  .detail-data-content p span{
    line-height: 25px;
  }
  .article_font{
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    .search-pc{
      display: none;
    }
    .app{
      display: block !important;
      margin: 16px 0 0;
    }
    .app .search-input{
      width: 100%;
    }
  }
</style>
<template>
  <div>
    <div class="detail-data detail-title">
      <div style="font-size: 18px; height: 16px; line-height: 16px; padding-left: 5px; font-weight: bold;border-left: 9px solid #1788bc;">
        搜索文章数据
      </div>
      <div class="search-con search-con-top search-pc">
        <Input @on-change="handleClear" clearable placeholder="输入文章标题搜索" class="search-input" v-model="formData.searchPhrase" @on-enter="handleSearch"/>
        <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="md-search"/>&nbsp;&nbsp;搜索</Button>
      </div>
      <div class="app" style="display: none;">
        <Input clearable placeholder="输入文章标题搜索"
               class="search-input"
               v-model="formData.searchPhrase"
               search
               @on-search="handleSearch"
               @on-clear="handleSearch"
               enter-button="搜索"/>
      </div>
    </div>
    <div class="detail-data">
      <Row style="border-bottom: 1px solid #e5e5e5;">
        <Col span="22" offset="1" class="detail-data-title">{{articleData.title}}</Col>
      </Row>
      <Row>
        <Col span="6" offset="1" class="article_font">文章类型：{{articleData.typeName}}</Col>
        <Col span="6" offset="1" class="article_font">阅读量：{{articleData.readCount}}</Col>
      </Row>
      <Row>
        <Col span="6" offset="1" class="article_font">来源：{{articleData.author}}</Col>
        <Col span="6" offset="1" class="article_font">发布时间：{{articleData.publishTime}}</Col>
      </Row>
      <Row style="border-bottom: 1px solid #e5e5e5;">
        <Col span="22" offset="1" class="article_font">附件：
          <span v-if="articleData.annexList" v-for="item in articleData.annexList" :key="item.name" style="margin-right: 15px;">
              <router-link target="_blank" :to="{path:'/view_file',query:{path:  item.path}}">{{item.name}}</router-link>
            </span>
          <!--<Button size="large" type="primary" icon="ios-book-outline" style="float: right; margin-right: 10px;">浏览文件</Button>-->
          <Button v-if="articleData.annexList" size="large" type="success" icon="ios-download-outline" @click="downloadFile"
                  style="float: right; margin-right: 10px; margin-top: 5px;">下载文件</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="detail-data-content" v-html="articleData.content"></Col>
      </Row>
    </div>
  </div>
</template>
<script>
import axios from '@/libs/api.request'
import './search.less'
export default {
  name: 'ArticleView',
  data () {
    return {
      modelShow: false,
      formData: {
        searchPhrase: '',
        type: ''
      },
      currentId: 0,
      articleData: {}
    }
  },
  mounted () {
    this.currentId = this.$route.query.id
    this.visitorCount()
    this.addArticleReadCount()
    this.getArticleById()
  },
  methods: {
    getArticleById () {
      const _this = this
      const option = {
        url: '/api/article/getArticleById/' + this.currentId,
        method: 'get'
      }
      axios.request(option).then(res => {
        if (res.data.code === 200) {
          _this.articleData = JSON.parse(JSON.stringify(res.data.data))
        }
      })
    },
    handleClear (e) {

    },
    handleSearch () {
      this.$router.push({
        name: 'article',
        params: this.formData
      })
    },
    addArticleReadCount () {
      const option = {
        url: '/api/article/addArticleReadCount/' + this.currentId,
        method: 'get'
      }
      axios.request(option).then(res => {

      })
    },
    visitorCount () {
      const option = {
        url: '/api/show/visitorCount',
        method: 'get'
      }
      axios.request(option).then(res => {})
    },
    downloadFile () {
      const _this = this
      const option = {
        url: '/api/show/downloadFile?businessId=' + this.currentId + '&baseType=5',
        method: 'get',
        responseType: 'arraybuffer'
      }
      axios.request(option).then(res => {
        let l = _this.criterionData.annexList.length
        if (l > 0) {
          let fileName = ''
          if (l === 1) {
            fileName = _this.criterionData.annexList[0].name
          } else {
            fileName = Date.parse(new Date()) + '.zip'
          }
          const blob = new Blob([res.data], { type: 'application/stream;charset=UTF-8' })
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName)
          } else {
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = fileName
            link.click()
            window.URL.revokeObjectURL(link.href)
          }
        }
      })
    }
  }
}
</script>
