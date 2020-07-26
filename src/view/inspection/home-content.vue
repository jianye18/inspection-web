<style>
  .search-box{
    height: 300px;
    /*background-color: #67647D;*/
    margin: 0;
    padding: 100px 0 0 80px;
    background-image: url('../../assets/images/search-box-back.jpg');
    background-repeat:no-repeat;
    background-size:100% 100%;
  }
  .data_count{
    font-size: 23px;
  }
  .data-con{
    background-color: #fff;
    /*min-height: 300px;*/
    height: auto;
    border: 1px solid #f2f2f2;
    margin-top: 10px;
  }
  .data-title{
    padding-left: 20px;
    height: 60px;
    /*text-align: center;*/
    line-height: 60px;
    border-bottom: 1px solid #f2f2f2;
  }
  .data-type-select{
    font-size: 13px;
    float: right;
    margin-right: 10px;
    color: #bcbcbc;
  }
  .data-list{
    min-height: 50px;
    padding: 10px 20px;
    display: inline-block;
  }
  .data-list span{
    font-size: 14px;
    width: 80px;
    height: 50px;
    left: 20px;
    top: 5px;
  }
  .data-list span:hover{
    color: #2d8cf0;
    cursor: pointer;
  }
  .data-list span a:hover{
    text-decoration: #2d8cf0;
  }
  .data-list span.data-line{
    margin-left: 15px;
    margin-right: 15px;
  }
  .data-list-div{
    display: inline-block;
    margin: 15px 0;
  }
  .ivu-layout-sider-children{
   height: auto;
  }
  .article_class{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .article_class .ivu-tabs-bar{
    margin-bottom: 0px;
  }
  .article_class .ivu-tabs-bar .ivu-tabs-nav-scroll .nav-text{
    height: 60px;
  }
  .article_class .ivu-tabs-bar .ivu-tabs-nav-scroll .nav-text div.ivu-tabs-tab{
    font-size: 21px;
    font-weight: bold;
    line-height: 40px;
  }
  .article_class ul{
    list-style: none;
  }
  .article_class ul li{
    font-size: 14px;
    margin-left: 15px;
    height: 45px;
    line-height: 45px;
    max-width: 360px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: 1px solid #f5f5f5;
  }
  .article_class ul li:hover{
    color: #2d8cf0;
    cursor: pointer;
  }
  .article_more{
    height: 50px;
    width: 200px;
    line-height: 50px;
    text-align: center;
    font-size: 15px;
    border: 1px solid #e5e5e5;
    margin: 10px 100px 10px 100px;
  }
  .article_more:hover{
    color: #2d8cf0;
    cursor: pointer;
  }
  .demo-carousel img:hover{
    cursor: pointer;
  }
  .ivu-tabs-tab{
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
    .ivu-input-group-large > .ivu-input-group-prepend,
    .ivu-input-group-large > .ivu-input-group-append {
      padding: 1px 7px;
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
<style scoped lang="less">
  @media screen and (max-width: 980px) {
    .Layout{
      padding: 10px 0 0!important;
    }
    .body{
      display: none;
    }
    .sider{
      flex: initial !important;
      width: 100% !important;
      max-width: 100% !important;
      min-width: initial !important;
    }
    .article_class ul li{
      margin-right: 15px;
      width: ~'calc(100% - 40px)';
      max-width: ~'calc(100% - 40px)';
    }
    .article_more{
      width: initial;
    }
    .carousel /deep/ img{
      max-width: 100%!important;
    }
  }
</style>
<template>
  <Layout style="padding: 10px 180px 0px; max-top: 15px;" class="Layout">
    <Content>
      <Layout>
        <Content :style="{minHeight: '620px', marginRight: '15px'}" class="body">
          <div class="search-box">
            <div style="text-align: left; font-size: 22px; color: #000000;">
              <span>法规标准 | 政府抽查数据平台</span>
            </div>
            <div style="text-align: left; font-size: 16px;">
              <span>本博客目前收录了</span>
              <span class="data_count">{{showCount.lawCount}}</span><span>条法规，</span>
              <span class="data_count">{{showCount.criterionCount}}</span><span>条标准，</span>
              <span class="data_count">{{showCount.spotCheckCount}}</span><span>条抽检，</span>
              <span class="data_count">{{showCount.flightCheckCount}}</span><span>条监督检查数据</span>
            </div>
            <div>
              <Select v-model="formData.type" style="width:120px; float: left; font-size: 14px;" placeholder="">
                <Option value="LW">法规</Option>
                <Option value="CC">标准</Option>
                <Option value="SC">抽检数据</Option>
                <Option value="FC">监督检查</Option>
                <Option value="AC">文章</Option>
              </Select>
              <Input v-model="formData.searchPhrase"
                     search enter-button="搜索"
                     placeholder="请输入您想要查询的关键词"
                     style="width: 70%; top: 0;"
                     @on-search="searchToList" @on-enter="searchToList" />
            </div>
          </div>
          <div class="data-con" v-for="item in contentData" :key="item.type">
            <div class="data-title">
              <span style="font-size: 20px; font-weight: bold;">
                <Icon type="ios-flask"/>
                {{item.title}}
              </span>
              <!--<span class="data-type-select">-->
              <!--{{item.name}}-->
              <!--</span>-->
            </div>
            <div class="data-list">
              <div class="data-list-div" v-for="typeData in item.typeList" :key="typeData.value">
                <span @click="toShowList(item.type, item.path, typeData.code, typeData.value)">{{typeData.label}}</span>
                <span class="data-line">|</span>
              </div>
              <span><a href="#" @click="toMoreListPage(item.type, item.path)">更多 ></a></span>
            </div>
          </div>
        </Content>
        <Sider hide-trigger :style="{background: '#f5f7f9', height: '100%'}" width="400" class="sider">
          <div style="height: 300px">
            <Carousel
              v-model="value3"
              :autoplay="autoplay"
              :autoplay-speed="autoplaySpeed"
              dots="inside"
              radius-dot
              trigger="hover"
              class="carousel"
              arrow="hover">
              <CarouselItem v-for="item in viewBannerList" :key="item.id">
                <div class="demo-carousel">
                  <img :src="item.path" @click="toAdvert(item.link)" @mouseenter="hover(1)" @mouseleave="hover(2)"/>
                </div>
              </CarouselItem>
            </Carousel>
          </div>
          <div class="article_class" style="border-top: 1px solid transparent">
            <div style="width:calc(100% - 55px);margin: 16px;box-sizing: border-box">
              <div style=" display: none" class="app">
                <i-input clearable placeholder="输入标称生产企业/进口代理商名称/样品名称搜索"
                         class="search-input"
                         v-model="formData.searchPhrase"
                         @on-enter="searchToList">
                  <i-select slot="prepend"
                            v-model="formData.type"
                            style="width:90px"
                            placeholder="是否有缺陷"
                            clearable>
                    <Option value="LW">法规</Option>
                    <Option value="CC">标准</Option>
                    <Option value="SC">抽检数据</Option>
                    <Option value="FC">监督检查</Option>
                    <Option value="AC">文章</Option>
                  </i-select>
                  <i-button slot="append"
                            @click="searchToList"

                            class="search-btn">搜索</i-button>
                </i-input>
              </div>
            </div>
            <Tabs v-model="orderName">
              <TabPane label="最新文章" name="create_time">
                <ul>
                  <li v-for="item in newArticleList" :key="item.id" :title="item.title" @click="toViewArticle(item.id)">{{item.title}}</li>
                </ul>
                <div class="article_more" @click="toArticlePage">
                  查看更多
                </div>
              </TabPane>
              <TabPane label="热门文章" name="read_count">
                <ul>
                  <li v-for="item in hotArticleList" :key="item.id" :title="item.title" @click="toViewArticle(item.id)">{{item.title}}</li>
                </ul>
                <div class="article_more" @click="toArticlePage">
                  查看更多
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Sider>
      </Layout>
    </Content>
  </Layout>
</template>
<script>
import axios from '@/libs/api.request'
import Global from '@/store/global'
export default {
  data () {
    return {
      formData: {
        type: 'LW',
        searchPhrase: ''
      },
      value3: 0,
      autoplay: true,
      autoplaySpeed: 4000,
      orderName: 'create_time',
      newArticleList: [],
      hotArticleList: [],
      contentData: [
        {
          title: '法规分类',
          type: 'LW',
          name: '按法规分类',
          path: 'law',
          typeList: [
            {
              code: 'FG_category',
              label: '国家法规',
              value: '1574147128850'
            },
            {
              code: 'FG_category',
              label: '地方法规',
              value: '1574147128851'
            }
          ]
        },
        {
          title: '标准分类',
          type: 'CC',
          name: '按标准分类',
          path: 'criterion',
          typeList: [
            {
              code: 'BZ_category',
              label: '国家标准',
              value: '1574147128834'
            },
            {
              code: 'BZ_category',
              label: '行业标准',
              value: '1574147128835'
            },
            {
              code: 'BZ_category',
              label: '地方标准',
              value: '1574147128836'
            },
            {
              code: 'BZ_category',
              label: '团体标准',
              value: '1574147128837'
            }
          ]
        },
        {
          title: '抽检分类',
          type: 'SC',
          name: '按产品分类',
          path: 'spotCheck',
          typeList: [
            {
              code: 'ZJ_productType',
              label: '皮肤用化妆品',
              value: '皮肤用化妆品'
            },
            {
              code: 'ZJ_productType',
              label: '毛发用化妆品',
              value: '毛发用化妆品'
            },
            {
              code: 'ZJ_productType',
              label: '口唇用化妆品',
              value: '口唇用化妆品'
            },
            {
              code: 'ZJ_productType',
              label: '指（趾）甲用化妆品',
              value: '指（趾）甲用化妆品'
            }
          ]
        },
        {
          title: '飞检分类',
          type: 'FC',
          name: '按飞检分类',
          path: 'flightCheck',
          typeList: [
            {
              code: 'FJ_type',
              label: '国家飞检',
              value: '国家飞检'
            },
            {
              code: 'FJ_type',
              label: '地方飞检',
              value: '地方飞检'
            }
          ]
        }
      ],
      showCount: { lawCount: 0, criterionCount: 0, spotCheckCount: 0, flightCheckCount: 0 },
      params: { mold: 1, key: '', value: '' },
      viewBannerList: []
    }
  },
  mounted () {
    this.visitorCount()
    this.getShowCount()
    // this.getHomePageFilterItem()
    this.getHomeArticleList()
    this.getViewBannerList()
  },
  watch: {
    'orderName': function (val) {
      this.getHomeArticleList()
    }
  },
  methods: {
    searchToList () {
      this.$store.dispatch('CreateType', this.formData.type)
      this.params.key = 'searchPhrase'
      this.params.value = this.formData.searchPhrase
      this.$router.push({
        name: Global.basePath[this.formData.type],
        params: this.params
      })
    },
    toShowList (type, path, param, val) {
      this.$store.dispatch('CreateType', type)
      this.$store.dispatch('CreateParam', { type: type, query: [{ key: param.split('_')[1], value: val }] })
      this.params.key = param.split('_')[1]
      this.params.value = val
      this.$router.push({
        name: path,
        params: this.params
      })
    },
    getShowCount () {
      const _this = this
      const option = {
        url: '/api/show/getShowCount/2',
        method: 'get'
      }
      axios.request(option).then(res => {
        if (res.data.code === 200) {
          _this.showCount = res.data.data
        }
      })
    },
    getHomeArticleList () {
      const _this = this
      const option = {
        url: '/api/show/getHomeArticleList/?limit=10&orderName=' + _this.orderName,
        method: 'get'
      }
      axios.request(option).then(res => {
        if (res.data.code === 200) {
          if (_this.orderName === 'create_time') {
            _this.newArticleList = res.data.data
          }
          if (_this.orderName === 'read_count') {
            _this.hotArticleList = res.data.data
          }
        }
      })
    },
    getViewBannerList () {
      const _this = this
      const option = {
        url: '/api/show/getViewBannerList',
        method: 'post',
        data: { isView: 1, limit: 5 }
      }
      axios.request(option).then(res => {
        if (res.data.code === 200) {
          res.data.data.forEach(function (item) {
            _this.viewBannerList.push({ id: item.id, path: Global.resourcesBasePath + item.path + item.name, link: item.link })
          })
        }
      })
    },
    getHomePageFilterItem () {
      const _this = this
      const option = {
        url: '/api/system/getHomeShowSystemData/LW,CC,SC,FC',
        method: 'get'
      }
      axios.request(option).then(res => {
        if (res.data.code === 200) {
          let result = res.data.data
          // console.log(result)
          _this.contentData.forEach(function (item, index) {
            _this.contentData[index].typeList = result[_this.contentData[index].type]
          })
          // console.log(_this.contentData)
        }
      })
    },
    toViewArticle (articleId) {
      this.$store.dispatch('CreateType', 'AC')
      this.$router.push({
        name: 'articleDetail',
        query: { id: articleId }
      })
    },
    toMoreListPage (type, path) {
      this.$store.dispatch('CreateType', type)
      this.$router.push({
        name: path
      })
    },
    toArticlePage () {
      this.$store.dispatch('CreateType', 'AC')
      this.$router.push({
        name: 'article'
      })
    },
    visitorCount () {
      const option = {
        url: '/api/show/visitorCount',
        method: 'get'
      }
      axios.request(option).then(res => {})
    },
    toAdvert (link) {
      if (link) {
        window.open(link)
      }
    },
    hover (status) {
      if (status === 1) {
        this.autoplay = false
      } else {
        this.autoplay = true
      }
    }
  }
}
</script>
