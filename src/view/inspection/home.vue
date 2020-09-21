<style scoped>
  .layout{
    /*border: 1px solid #d7dde4;*/
    background: #f5f7f9;
    position: relative;
    /*border-radius: 4px;*/
    overflow: hidden;
    /*max-height: calc(100vh);*/
    /*overflow-y: auto*/
    min-height: calc(100vh - 170px);
  }
  .layout-logo{
    /*width: 300px;*/
    width: 15%;
    height: 30px;
    /*background: #5b6270;*/
    border-radius: 3px;
    float: left;
    position: relative;
    /*top: 4px;*/
    left: 110px;
    font-size: 36px;
    color: #ffffff;
  }
  .layout-logo:hover{
    cursor: pointer;
  }
  .layout-nav{
    /*width: 500px;*/
    /*margin-left: 480px;*/
    margin-left: 25%;
  }
  .layout-nav ul{
    list-style: none;
  }
  .layout-nav ul li{
    text-align: center;
    color: #ffffff;
    font-size: 1rem;
    width: 105px;
    line-height: 70px;
    float: left;
  }
  .layout-nav ul li:hover{
    background-color: #0b81bf;
    cursor: pointer;
  }
  .layout-nav ul li.active_class{
    background-color: #0b81bf;
  }
  .layout-footer-center{
    margin-top: 20px;
    background: #fff;
    /*text-align: center;*/
    height: 200px;
    /*margin-bottom: 50px;*/
    border-top: 1px solid #f2f2f2;
    padding: 15px 180px 0px 180px;
  }
  .footer-link{
    height: 40px;
    line-height: 40px;
    background-color: #f2f2f2;
  }
  .footer-link-title{
    margin-left: 10px;
    font-weight: bold;
  }
  .footer-link-content{
    margin-left: 20px;
    color: #4a4a4a;
  }
  .footer-link-content:hover{
    color: #2d8cf0;
  }
  .web-about{
    width: 100%;
    height: 140px;
  }
  .footer_content{
    border-left: 1px ridge #e5e5e5;
    border-right: 1px ridge #e5e5e5;
    height: 140px;
  }
  .footer_content p{
    padding: 15px 0 0 10px;
  }
  .template{
    height: calc(100vh - 70px);
    overflow: auto;
  }
</style>

<style scoped  lang="less">
  @media screen and (min-width: 768px) {
    .menu-icon{
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    .layout{
      overflow: hidden  ;
    }
    .header-wrap{
      text-align: center;
      position: relative;
      .menu-icon {
        margin-top: 8px;
        font-size: 40px;
        position: absolute;
        left: 8px;
        top: 0;
        padding: 8px;
      }
    }
    .layout-logo{
      width: 60%;
      max-height: 40px;
      position: initial;
      display: inline-block;
      float: initial;
    }
    .layout-nav {
      .nav{
        display:none;
      }
    }
    .drawer-nav-item{
      line-height: 40px;
    }
    .layout-footer-center{
      display: none;
    }
    .body{
      /*height: ~'calc(100vh - 150px)' !important;*/
      min-height: initial;
      overflow: auto;
    }
  }
</style>

<template>
  <div class="layout">
    <Layout>
      <Header style="background-color: #2c96cd; height: 70px;" class="header-wrap">
        <Icon type="md-menu" class="menu-icon" @click="drawer = true"/>
        <Drawer placement="left" :closable="false" v-model="drawer">
          <div class="" style="border-bottom: 1px solid #ccc;">
            <img src="../../assets/images/logo.png" style="max-width: 100%;max-height: 40px; margin-top: 10px;"/>
          </div>
          <div v-for="(item, idx) in menuList"
               :key="item.value"
               :class="idx === activeIdx ? 'active_class' : ''"
               @click="changeMenu(item.value, item.path, idx)"
               class="drawer-nav-item"
               style="font-size: 18px;">
            {{item.label}}
          </div>
        </Drawer>
        <div class="layout-logo" @click="toHome">
          <img src="../../assets/images/logo.png" style="max-width: 100%;max-height: 40px; margin-top: 14px;"/>
        </div>
        <div class="layout-nav">
          <ul class="nav">
            <li v-for="(item, idx) in menuList"
                :key="item.value"
                :class="idx === activeIdx ? 'active_class' : ''"
                @click="changeMenu(item.value, item.path, idx)"
                style="font-size: 18px;">
              {{item.label}}
            </li>
          </ul>
        </div>
      </Header>
      <div class="template">
        <Content class="body">
          <router-view></router-view>
        </Content>
        <Footer class="layout-footer-center">
          <div class="footer-link">
            <span class="footer-link-title"><Icon type="ios-link" />友情链接：</span>
            <a class="footer-link-content" target="view_window" v-for="item in linkList" :key="item.id" :href="item.path" >{{item.name}}</a>
          </div>
          <div class="web-about">
            <Row>
              <Col span="16" class="footer_content">
                <p><Icon type="logo-windows" />Copyright©叶竹洪博客︱苏ICP备17037083号</p>
                <p><Icon type="md-contact" />手机 / 微信：15850584156 | 网站纠错请邮件：22521453@qq.com</p>
                <p><Icon type="md-funnel" />您是本站第{{personalNum}}位访客</p>
              </Col>
              <Col span="8" style="border-right: 1px ridge #e5e5e5;">
                <Row>
                  <Col span="12" style="text-align: center;">
                    <p style="margin-top: 15px;">微信订阅号</p>
                    <img src="../../assets/images/gongzhonghao.jpg" style="width: 102px; height: 102px;" />
                  </Col>
                  <Col span="12" style="text-align: center;">
                    <p style="margin-top: 15px;">微信小程序</p>
                    <img src="../../assets/images/xiaochengxu.jpg" style="width: 102px; height: 102px;" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Footer>
      </div>
    </Layout>
  </div>
</template>
<script>
import axios from '@/libs/api.request'
export default {
  data () {
    return {
      menuList: [
        { value: 'main', label: '首页', path: 'main' },
        { value: 'LW', label: '法规', path: 'law' },
        { value: 'CC', label: '标准', path: 'criterion' },
        { value: 'SC', label: '抽检数据', path: 'spotCheck' },
        { value: 'FC', label: '监督检查', path: 'flightCheck' },
        { value: 'AC', label: '文章', path: 'article' },
        { value: 'AW', label: '问答', path: 'answer' }
        // { value: 'info', label: '行业需求', path: 'information' }
      ],
      activeIdx: 0,
      linkList: [],
      personalNum: 0,
      drawer: false
    }
  },
  created () {
    this.getVisitorCount()
    this.getLinkViewList()
    const path = this.$route.path
    if (path.indexOf('main') !== -1) {
      this.activeIdx = 0
    }
    if (path.indexOf('law') !== -1) {
      this.activeIdx = 1
    }
    if (path.indexOf('criterion') !== -1) {
      this.activeIdx = 2
    }
    if (path.indexOf('spotCheck') !== -1) {
      this.activeIdx = 3
    }
    if (path.indexOf('flightCheck') !== -1) {
      this.activeIdx = 4
    }
    if (path.indexOf('article') !== -1) {
      this.activeIdx = 5
    }
  },
  watch: {
    $route: {
      handler: function (to, form) {
        let bp = document.createElement('script')
        let curProtocol = window.location.protocol.split(':')[0]
        if (curProtocol === 'https') {
          bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
        } else {
          bp.src = 'http://push.zhanzhang.baidu.com/push.js'
        }
        let s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(bp, s)
      },
      // 立即先去执行handler方法
      immediate: true
    },
    '$store.getters.type': function (val) {
      if (val) {
        if (val === 'main') {
          this.activeIdx = 0
        }
        if (val === 'LW') {
          this.activeIdx = 1
        }
        if (val === 'CC') {
          this.activeIdx = 2
        }
        if (val === 'SC') {
          this.activeIdx = 3
        }
        if (val === 'FC') {
          this.activeIdx = 4
        }
        if (val === 'AC') {
          this.activeIdx = 5
        }
      }
    }
  },
  methods: {
    changeMenu (val, path, idx) {
      if (val === 'AW') {
        window.open('http://www.hzpwd.cn/')
      }
      let _this = this
      if (_this.activeIdx !== idx) {
        this.$store.dispatch('CreateType', val)
        _this.activeIdx = idx
      } else {
        let params = []
        if (val === 'LW') {
          params = [{ key: 'category', value: '' }]
        }
        if (val === 'CC') {
          params = [{ key: 'category', value: '' }, { key: 'type', value: '' }]
        }
        if (val === 'SC') {
          params = [{ key: 'productType', value: '' }]
        }
        if (val === 'FC') {
          params = [{ key: 'type', value: '' }]
        }
        if (val === 'AC') {
          params = [{ key: 'typeCode', value: '' }]
        }
        this.$store.dispatch('CreateParam', { type: val, query: params })
      }
      if (this.$route.name === path) {
        window.location.reload()
      } else {
        setTimeout(function () {
          _this.$router.push({
            name: path
          })
        }, 300)
      }
      this.drawer = false
    },
    getLinkViewList () {
      let _this = this
      const option = {
        url: '/api/show/getLinkViewList',
        method: 'get'
      }
      axios.request(option).then(res => {
        _this.linkList = res.data.data
      })
    },
    toHome () {
      if (this.activeIdx === 0) {
        window.location.reload()
      } else {
        this.activeIdx = 0
        this.$store.dispatch('CreateType', 'main')
        this.$router.push({
          name: 'main'
        })
      }
    },
    getVisitorCount () {
      const _this = this
      const option = {
        url: '/api/visitor/getVisitorCount/2',
        method: 'get'
      }
      axios.request(option).then(res => {
        if (res.data.code === 200) {
          _this.personalNum = res.data.data
        }
      })
    }
  }
}
</script>
