<style>
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
    .mobile-page{
      float:initial !important;
      text-align: center;
    }
  }
</style>

<template>
  <div style="padding: 24px 24px 60px 24px; background: #fff">
    <div style="font-size: 18px; height: 16px; line-height: 16px; padding-left: 5px; font-weight: bold;border-left: 9px solid #1788bc;">
      搜索标准
    </div>
    <div class="search-con search-con-top search-pc">
      <Input @on-change="handleClear" clearable placeholder="输入标准名称搜索" class="search-input" v-model="formData.searchPhrase" @on-enter="handleSearch"/>
      <!--<Select v-model="formData.publishUnit" style="width:120px" placeholder="请选择发布机构" clearable>
        <Option v-for="item in publishUnitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>-->
      <Select v-model="formData.status" style="width:120px" placeholder="请选择状态" clearable>
        <Option v-for="item in statusList" :value="item.value">{{item.label}}</Option>
      </Select>
      <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="md-search"/>&nbsp;&nbsp;搜索</Button>
    </div>
    <div style="margin: 16px 0; display: none" class="app">
      <i-input clearable placeholder="输入标准名称搜索" class="search-input" v-model="formData.searchPhrase" @on-enter="handleSearch">
        <i-select slot="prepend"
                  v-model="formData.status"
                  style="width:90px"
                  placeholder="请选择状态"
                  clearable>
          <Option v-for="item in statusList" :value="item.value" :key="item.value">{{item.label}}</Option>
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
  name: 'Criterion',
  components: {
    Tables
  },
  data () {
    const _this = this
    return {
      modelShow: false,
      formData: {
        orderName: 'implement_date',
        orderType: 'desc',
        pageNum: 1, // 当前页
        pageSize: 20, // 一页展示数量
        searchPhrase: '',
        publishUnit: '',
        category: '',
        type: '',
        status: ''
      },
      publishUnitList: [],
      statusList: [],
      columns: [
        {
          title: '标准名称',
          key: 'name',
          minWidth: 100,
          render: function render (h, params) {
            let content = params.row.name
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
                    name: 'criterionDetail',
                    query: { id: params.row.id }
                  })
                }
              }
            }, content)
          }
        },
        {
          title: '发布单位',
          key: 'publishUnitName',
          tooltip: true,
          width: 120
        },
        {
          title: '状态',
          align: 'center',
          key: 'status',
          width: 120,
          render: function render (h, params) {
            let status = params.row.status + ''
            let content = Global.getLabelByVal(status, _this.statusList)
            return h('span', content)
          }
        },
        {
          title: '实施日期',
          align: 'center',
          width: 140,
          key: 'implementDate'
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
        this.formData.category = params['category']
        this.formData.type = params['type']
        this.formData.status = params['status']
      }
    }
    this.getTablePageData()
    this.getAllSystemDataTypeList()
  },
  watch: {
    '$store.getters.param': function (params) {
      const _this = this
      if (params['type'] === 'CC') {
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
        url: '/api/system/getSystemDataByTypeCode/BZ_status', // BZ_publishUnit
        method: 'get'
      }
      axios.request(option).then(res => {
        // this.publishUnitList = res.data.data['BZ_publishUnit']
        this.statusList = res.data.data['BZ_status']
      })
    },
    getTablePageData () {
      // console.log(this.formData)
      const option = {
        url: '/api/criterion/getCriterionPageList',
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
  computed:{
    ...mapGetters(['isMobile'])
  }
}
</script>
