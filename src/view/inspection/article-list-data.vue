<style>
  .ivu-table-cell .ivu-icon-ios-search-outline:hover{
    cursor: pointer;
  }
</style>
<style lang="less" scoped>
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
      搜索文章数据
    </div>
    <div class="search-con search-con-top search-pc">
      <Input @on-change="handleClear" clearable placeholder="输入文章标题搜索" class="search-input" v-model="formData.searchPhrase" @on-enter="handleSearch"/>
      <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="md-search"/>&nbsp;&nbsp;搜索</Button>
    </div>
    <div class="app" style="display: none; margin: 16px 0;">
      <Input @on-change="handleClear"
             clearable placeholder="输入文章标题搜索"
             class="search-input"
             v-model="formData.searchPhrase"
             search
             @on-search="handleSearch"
             @on-clear="handleSearch"
             enter-button="搜索"
             @on-enter="handleSearch"/>
    </div>
    <tables
      ref="tables"
      editable
      search-place="top"
      v-model="tableData.list"
      :columns="columns"
      no-data-text="暂无相关内容，建议您检查输入内容是否正确"/>
    <div style="padding-top: 15px; float: right" class="mobile-page">
      <Page :total="tableData.total" :current="tableData.pageNum" :simple="isMobile"  :page-size="formData.pageSize" @on-change="changePage" show-total></Page>
    </div>
  </div>
</template>
<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
import './list.less'
import {mapGetters} from 'vuex'
export default {
  name: 'Law',
  components: {
    Tables
  },
  data () {
    const _this = this
    return {
      modelShow: false,
      formData: {
        orderName: 'publish_time',
        orderType: 'desc',
        pageNum: 1, // 当前页
        pageSize: 20, // 一页展示数量
        searchPhrase: '',
        type: '',
        isPublish: 1
      },
      typeList: [],
      columns: [
        {
          title: '标题',
          key: 'title',
          tooltip: true,
          minWidth: 150,
          render: function render (h, params) {
            let content = params.row.title
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
                    name: 'articleDetail',
                    query: { id: params.row.id }
                  })
                }
              }
            }, content)
          }
        },
        {
          title: '来源',
          align: 'center',
          key: 'author',
          width: 200
        },
        {
          title: '发布时间',
          align: 'center',
          key: 'publishTime',
          width: 140
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
        this.formData.type = params['type']
      }
    }
    this.getTablePageData()
  },
  watch: {
    '$store.getters.param': function (params) {
      const _this = this
      if (params['type'] === 'AC') {
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
    getTablePageData () {
      const option = {
        url: '/api/article/getArticlePageList',
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
