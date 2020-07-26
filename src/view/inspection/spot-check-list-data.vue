<style>
  @media screen and (max-width: 768px) {
    .ivu-input-group-large > .ivu-input-group-prepend,
    .ivu-input-group-large > .ivu-input-group-append {
      padding: 1px 7px;
    }
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
    .mobile-page{
      float:initial !important;
      text-align: center;
    }
  }
</style>

<template>
  <div style="padding: 24px 24px 60px 24px; background: #fff">
    <div style="font-size: 18px; height: 16px; line-height: 16px; padding-left: 5px; font-weight: bold;border-left: 9px solid #1788bc;">
      搜索抽检数据
    </div>
    <div class="search-con search-con-top search-pc">
      <Input @on-change="handleClear" clearable placeholder="输入标称生产企业/进口代理商名称/样品名称搜索"
             class="search-input" v-model="formData.searchPhrase" style="width:280px" @on-enter="handleSearch"/>
      <!--<Select v-model="formData.institution" style="width:120px" placeholder="请选择公布机构" clearable>
        <Option v-for="item in institutionList" :value="item.label" :key="item.value">{{ item.label }}</Option>
      </Select>-->
      <Select v-model="formData.checkResult" style="width:120px" placeholder="请选择抽检结果" clearable>
        <Option v-for="item in checkResultList" :value="item.value" :key="item.value">{{item.label}}</Option>
      </Select>
      <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="md-search"/>&nbsp;&nbsp;搜索</Button>
    </div>
    <div style="margin: 16px 0; display: none" class="app">
      <i-input clearable placeholder="输入标称生产企业/进口代理商名称/样品名称搜索" class="search-input" v-model="formData.searchPhrase" @on-enter="handleSearch">
        <i-select slot="prepend"
                  v-model="formData.checkResult"
                  style="width:90px"
                  placeholder="请选择抽检结果"
                  clearable>
          <Option v-for="item in checkResultList" :value="item.value" :key="item.value">{{item.label}}</Option>
        </i-select>
        <i-button slot="append"
                  @click="handleSearch"
                  class="search-btn">搜索</i-button>
      </i-input>
    </div>
    <tables
      ref="tables"
      editable
      search-place="top" v-model="tableData.list" :columns="columns" no-data-text="暂无相关内容，建议您检查输入内容是否正确"/>
    <div style="padding-top: 15px; float: right" class="mobile-page">
      <Page :total="tableData.total" :current="tableData.pageNum" :simple="isMobile" :page-size="formData.pageSize" @on-change="changePage" show-total></Page>
    </div>
  </div>
</template>
<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
import Global from '@/store/global'
import {mapGetters} from 'vuex'
import './list.less'
export default {
  name: 'SpotCheck',
  components: {
    Tables
  },
  data () {
    const _this = this
    return {
      modelShow: false,
      formData: {
        orderName: 'publish_date',
        orderType: 'desc',
        pageNum: 1, // 当前页
        pageSize: 20, // 一页展示数量
        searchPhrase: '',
        productType: '',
        institution: '',
        checkResult: ''
      },
      checkResultList: Global.spotCheckStatusList,
      institutionList: [],
      columns: [
        {
          title: '标称生产企业/进口代理商名称',
          key: 'producer',
          tooltip: true,
          minWidth: 200,
          render: function render (h, params) {
            let content = params.row.producer
            return h('span', {
              class: 'table-span',
              style: {
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              },
              domProps: { title: content },
              on: {
                click: () => {
                  _this.$router.push({
                    name: 'spotCheckDetail',
                    query: { id: params.row.id }
                  })
                }
              }
            }, content)
          }
        },
        {
          title: '样品名称',
          key: 'sample',
          width: 300,
          tooltip: true
        },
        {
          title: '公布机构',
          align: 'center',
          width: 180,
          key: 'institution',
          tooltip: true
        },
        {
          title: '抽检结果',
          align: 'center',
          key: 'checkResult',
          width: 80,
          render: function render (h, params) {
            let content = params.row.checkResult
            return h('span', {
              style: {
                color: content === '不合格' ? 'red' : ''
              }
            }, content)
          }
        },
        {
          title: '公布日期',
          align: 'center',
          width: 100,
          key: 'publishDate'
        }
      ],
      tableData: {
        list: [],
        pageNum: 1,
        total: 0,
        pages: 0
      }
    }
  },
  mounted () {
    if (JSON.stringify(this.$route.params) !== '{}') {
      let params = this.$route.params
      if (Number(params['mold']) === 1) {
        this.formData[params['key']] = params['value']
      } else {
        this.formData.searchPhrase = params['searchPhrase']
        this.formData.productType = params['productType']
        this.formData.institution = params['institution']
        this.formData.checkResult = params['checkResult']
      }
    }
    this.getTablePageData()
    // this.getAllSystemDataTypeList()
  },
  watch: {
    '$store.getters.param': function (params) {
      const _this = this
      if (params['type'] === 'SC') {
        let query = params.query
        if (query.length > 0) {
          query.forEach(function (item) {
            _this.formData[item['key']] = item['value']
          })
        }
        _this.getTablePageData()
      }
    }
  },
  methods: {
    handleUploadFile () {
      this.getTablePageData()
    },
    getAllSystemDataTypeList () {
      const option = {
        url: '/api/spotCheck/getAllInstitution',
        method: 'get'
      }
      axios.request(option).then(res => {
        this.institutionList = res.data.data
      })
    },
    getTablePageData () {
      // console.log(this.formData)
      const option = {
        url: '/api/spotCheck/getSpotCheckPageList',
        data: this.formData,
        method: 'post'
      }
      axios.request(option).then(res => {
        this.tableData.list = res.data.data.list
        this.tableData.pageNum = res.data.data.pageNum
        this.tableData.total = res.data.data.total
        this.tableData.pages = res.data.data.pages
      })
    },
    // 翻页钩子
    changePage (page) {
      this.formData.pageNum = page
      this.getTablePageData()
    },
    handleClear (e) {

    },
    handleSearch () {
      this.formData.pageNum = 1
      this.getTablePageData()
    }
  },
  computed: {
    ...mapGetters(['isMobile'])
  }
}
</script>
