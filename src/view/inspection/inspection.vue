<style scoped>
  @import "./list.less";
  .main-layout-con ul{
    width: 198px !important;
  }
  .menu-title{
    padding-top: 17px;
    padding-left: 15px;
    padding-bottom: 16px;
    background: #f5f5f5;
    z-index: 1;
    position: relative;
    font-weight: bold;
    font-size: 18px;
    color: #0074a9;
  }
  .menu-ul{
    list-style: none;
  }
  .menu-ul li{
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    font-size: 16px;
    border-top: 1px dashed #e5e5e5;
    color: #000;
    background: #ffffff;
  }
  .menu-ul li.active_class{
    background-color: #f3f9fc;
  }
  .menu-ul li:hover{
    color: #0b81bf;
    cursor: pointer;
    background-color: #f3f9fc;
  }
  .bread_active_class:hover{
    color: #0b81bf;
    cursor: pointer;
  }
</style>
<style lang="less" scoped>
  @media screen and (max-width: 768px) {
    .main-layout{
      overflow: hidden;
    }
    .breadcrumb{
      margin: 10px 15px !important;
    }
    .layout{
      padding: 0 !important;
    }
    .sider {
      display: none;
    }
    .classify{
      display: block !important;
      margin: 10px;
      box-sizing: border-box;
    }
    .body{
      height: ~'calc(100vh - 150px)' !important;
      min-height: initial;
      overflow: auto;
    }
  }
</style>
<template>
  <Layout style="padding: 0 180px 0; " class="layout body main-layout" >
    <Breadcrumb separator=">" :style="{margin: '10px 0'}" class="breadcrumb">
      <BreadcrumbItem
        v-for="(item) in breadList"
        :key="item.name">  <!--:class="index === 1 ? 'bread_active_class' : ''"  @click="backList(item.value)" -->
        <span>{{item.name}}</span>
      </BreadcrumbItem>
    </Breadcrumb>
    <Content>
      <Layout class="main-layout-con">
        <Sider hide-trigger style="background-color: #f5f7f9; margin-right: 15px;" class="sider">
          <div style="border: 1px solid #dcdee2; margin-bottom: 15px;">
            <div class="menu-title">
              <Icon type="md-chatbubbles" />
              {{leftUpData.title}}
            </div>
            <ul class="menu-ul">
              <li v-for="(menu, idx) in leftUpData.menuList" :key="menu.value" :class="idx === upActiveIdx ? 'active_class' : ''"
                  @click="toRouter('up', menu.code, idx, menu.value)">{{menu.label}}</li>
            </ul>
          </div>
          <div v-if="type === 'CC'" style="border: 1px solid #dcdee2; margin-bottom: 15px;">
            <div class="menu-title">
              <Icon type="md-chatbubbles" />
              {{leftDownData.title}}
            </div>
            <ul class="menu-ul">
              <li v-for="(menu, idx) in leftDownData.menuList" :key="menu.value" :class="idx === downActiveIdx ? 'active_class' : ''"
                  @click="toRouter('down', menu.code, idx, menu.value)">{{menu.label}}</li>
            </ul>
          </div>
        </Sider>
        <Content>
          <div class="classify" style="display: none !important;">
            <Select @change="(item) => {toRouter('up', item.code, idx, item.value)}"
                    placeholder="请选择分类"
                    v-model="value">
              <Option :value="menu.value"
                      v-for="(menu, index) in leftUpData.menuList"
                      @click.native="toRouter('up', menu.code, index, menu.value)"
                      :key="menu.value" >{{menu.label}}</Option>
              <Option :value="menu.value"
                      v-for="(menu, index) in leftDownData.menuList"
                      @click.native="toRouter('down', menu.code, index, menu.value)"
                      :key="menu.value" v-if="type === 'CC'">{{menu.label}}</Option>
            </Select>
          </div>
          <router-view/>
        </Content>
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
      type: '',
      breadData: {
        'SC': [{ value: '', name: '抽检数据' }, { value: 'productType', name: '产品分类' }],
        'CC': [{ value: '', name: '标准数据' }, { value: 'category', name: '标准分类' }],
        'LW': [{ value: '', name: '法规数据' }, { value: 'category', name: '法规分类' }],
        'FC': [{ value: '', name: '飞检数据' }, { value: 'type', name: '飞检分类' }],
        'AC': [{ value: '', name: '文章数据' }, { value: 'typeCode', name: '文章分类' }]
      },
      breadList: [],
      leftUpData: {},
      leftDownData: {},
      upActiveIdx: null,
      downActiveIdx: null,
      value: ''
    }
  },
  created () {
    this.visitorCount()
    const path = this.$route.path
    if (path.indexOf('spotCheck') !== -1) {
      this.type = 'SC'
    }
    if (path.indexOf('criterion') !== -1) {
      this.type = 'CC'
    }
    if (path.indexOf('law') !== -1) {
      this.type = 'LW'
    }
    if (path.indexOf('flightCheck') !== -1) {
      this.type = 'FC'
    }
    if (path.indexOf('article') !== -1) {
      this.type = 'AC'
    }
    if (this.type) {
      this.getLeftMenuData().then(res => {
        if (JSON.stringify(this.$route.params) !== '{}') {
          let params = this.$route.params
          if (Number(params['mold']) === 1) {
            if (this.type === 'CC' && params['key'] === 'type') {
              this.initDownMenuActive(params['value'])
            } else {
              this.initUpMenuActive(params['value'])
            }
          }
        }
      })
      this.breadList = this.breadData[this.type]
    }
  },
  mounted () {

  },
  watch: {
    '$store.getters.type': function (val) {
      this.type = val
      this.getLeftMenuData()
      this.breadList = this.breadData[val]
    },
    '$store.getters.param': function (params) {
      console.log(params)
      let query = params.query
      this.initUpMenuActive(query[0].value)
      if (query.length > 1) {
        this.initDownMenuActive(query[1].value)
      }
    }
  },
  methods: {
    initUpMenuActive (val) {
      const _this = this
      let list = _this.leftUpData.menuList
      _this.upActiveIdx = null
      for (let i = 0; i < list.length; i++) {
        let value = list[i].value
        if (value === val) {
          _this.upActiveIdx = i
          break
        }
      }
    },
    initDownMenuActive (val) {
      const _this = this
      let list = _this.leftDownData.menuList
      _this.downActiveIdx = null
      for (let i = 0; i < list.length; i++) {
        let value = list[i].value
        if (value === val) {
          _this.downActiveIdx = i
          break
        }
      }
    },
    getLeftMenuData () {
      let _this = this
      _this.leftUpData = {}
      _this.leftDownData = {}
      const option = {
        url: '/api/system/getSystemDataByTypeCode/' + Global.baseType[this.type],
        method: 'get',
        async: false
      }
      return new Promise(resolve => {
        axios.request(option).then(res => {
          if (_this.type === 'SC') {
            _this.leftUpData = { title: '抽检产品分类', menuList: res.data.data[Global.baseType[this.type]] }
          }
          if (_this.type === 'CC') {
            let typeCodes = Global.baseType[this.type].split(',')
            _this.leftUpData = { title: '标准一级分类', menuList: res.data.data[typeCodes[0]] }
            _this.leftDownData = { title: '标准二级分类', menuList: res.data.data[typeCodes[1]] }
          }
          if (_this.type === 'LW') {
            _this.leftUpData = { title: '法律法规分类', menuList: res.data.data[Global.baseType[this.type]] }
          }
          if (_this.type === 'FC') {
            _this.leftUpData = { title: '飞检产品分类', menuList: res.data.data[Global.baseType[this.type]] }
          }
          if (_this.type === 'AC') {
            _this.leftUpData = { title: '文章分类', menuList: res.data.data[Global.baseType[this.type]] }
          }
          resolve(res.data)
        })
      })
    },
    toRouter (option, typeCode, idx, val) {
      console.log('列表左侧菜单点击参数：' + option + '***' + typeCode + '***' + idx + '***' + val)
      this.breadList = this.breadData[this.type].concat([])
      this.$store.dispatch('CreateParam', { type: this.type, query: [{ key: typeCode.split('_')[1], value: val }] })
      if (option === 'up') {
        if (this.type === 'CC') {
          this.$store.dispatch('CreateParam', { type: this.type, query: [{ key: 'type', value: '' }, { key: typeCode.split('_')[1], value: val }] })
        }
        this.upActiveIdx = idx
        this.downActiveIdx = null
        this.breadList.push({ value: '', name: this.leftUpData.menuList[idx].label })
      }
      if (this.type === 'CC' && option === 'down') {
        this.$store.dispatch('CreateParam', { type: this.type, query: [{ key: 'category', value: '' }, { key: typeCode.split('_')[1], value: val }] })
        this.upActiveIdx = null
        this.downActiveIdx = idx
        this.breadList.push({ value: '', name: this.leftUpData.menuList[idx].label })
      }
      this.toList({ mold: 1, key: typeCode.split('_')[1], value: val })
    },
    backList (key) {
      if (key) {
        this.breadList = this.breadData[this.type]
        this.upActiveIdx = null
        this.downActiveIdx = null
        this.$store.dispatch('CreateParam', { type: this.type, query: [{ key: key, value: '' }] })
        this.toList(null)
      }
    },
    toList (params) {
      const _this = this
      const path = _this.$route.path
      if (path.indexOf('Detail') !== -1) {
        _this.$router.push({
          name: Global.basePath[_this.type],
          params: params
        })
      }
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
