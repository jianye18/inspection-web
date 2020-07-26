<style>
  @media screen and (max-width: 768px) {
    .data-detail-about{
      width: 100%;
      margin-left: 0px !important;
    }
  }
</style>

<template>
  <div>
    <div class="detail-data detail-title">
      <div style="font-size: 18px; height: 16px; line-height: 16px; padding-left: 5px; font-weight: bold;border-left: 9px solid #1788bc;">
        搜索法规
      </div>
      <div class="search-con search-con-top search-pc">
        <Input @on-change="handleClear" clearable placeholder="输入法规名称搜索" class="search-input" v-model="formData.searchPhrase" @on-enter="handleSearch"/>
        <!--<Select v-model="formData.type" style="width:120px" placeholder="请选择二级分类" clearable>
          <Option v-for="item in typeList" :value="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="formData.publishUnit" style="width:120px" placeholder="请选择发布机构" clearable>
          <Option v-for="item in publishUnitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>-->
        <Select v-model="formData.status" style="width:120px; margin-left: 2px;" placeholder="请选择状态" clearable>
          <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.label}}</Option>
        </Select>
        <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="md-search"/>&nbsp;&nbsp;搜索</Button>
      </div>
      <div style="margin: 16px 0; display: none" class="app">
        <i-input clearable placeholder="输入法规名称搜索"
                 class="search-input"
                 v-model="formData.searchPhrase"
                 @on-enter="handleSearch">
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
    </div>
    <div class="detail-data detail-con">
      <div>
        {{lawData.name}}
      </div>
      <table class="detail-con-tab" border="1" cellspacing="0" cellpadding="0">
        <tr>
          <td colspan="2">法规名称</td>
          <td colspan="10" class="detail-content">{{lawData.name}}</td>
        </tr>
        <tr>
          <td colspan="2">发布单位</td>
          <td colspan="4" class="detail-content">{{lawData.publishUnitName}}</td>
          <td colspan="2">文号</td>
          <td colspan="4" class="detail-content">{{lawData.codeNumber}}</td>
        </tr>
        <tr>
          <td colspan="2">发布日期</td>
          <td colspan="4" class="detail-content">{{lawData.publishDate}}</td>
          <td colspan="2">实施日期</td>
          <td colspan="4" class="detail-content">{{lawData.implementDate}}</td>
        </tr>
        <tr>
          <td colspan="2">法规内容</td>
          <td colspan="10" class="detail-content" v-html="lawData.content"></td>
        </tr>
        <tr>
          <td colspan="2">附件下载</td>
          <td colspan="10" class="detail-content">
            <span v-if="lawData.annexList" v-for="item in lawData.annexList" :key="item.name" style="margin-right: 15px;">
              <router-link target="_blank" :to="{path:'/view_file',query:{path:  item.path}}">{{item.name}}</router-link>
            </span>
            <!--<Button size="large" type="primary" icon="ios-book-outline" style="float: right; margin-right: 10px;">浏览文件</Button>-->
            <Button v-if="lawData.annexList" size="large" type="success" icon="ios-download-outline" @click="downloadFile"
                    style="float: right; margin-right: 10px; margin-top: 5px;">下载文件</Button>
          </td>
        </tr>
        <!--<tr>-->
          <!--<td>一键分享</td>-->
          <!--<td colspan="3">{{lawData.annexs}}</td>-->
        <!--</tr>-->
      </table>
      <div>
        <div class="data-detail-about">
          <div class="data-detail-about-title">
            <span>{{leftAboutData.title}}</span>
            <span class="data-detail-about-more-span" @click="getMoreAboutData(1)">
              更多
              <Icon type="ios-arrow-dropright" color="#d0d0d0" size="20" style="margin-top: -3px;"/>
            </span>
          </div>
          <div class="data-detail-about-content">
            <ul>
              <li v-for="item in leftAboutData.list" :key="item.id">
                <span>
                  <a :href="'/lawDetail?id=' + item.id" :title="item.name">{{item.name}}</a>
                </span>
                <em>{{item.statusName}}</em>
              </li>
              <li v-if="leftAboutData.list.length === 0">
                <span>
                  <a href="#">暂无相关内容</a>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="data-detail-about" style="margin-left: 2%;">
          <div class="data-detail-about-title">
            <span>{{rightAboutData.title}}</span>
            <span class="data-detail-about-more-span" @click="getMoreAboutData(2)">
              更多
              <Icon type="ios-arrow-dropright" color="#d0d0d0" size="20" style="margin-top: -3px;"/>
            </span>
          </div>
          <div class="data-detail-about-content">
            <ul>
              <li v-for="item in rightAboutData.list" :key="item.id">
                <span>
                  <a :href="'/lawDetail?id=' + item.id" :title="item.name">{{item.name}}</a>
                </span>
                <em>{{item.statusName}}</em>
              </li>
              <li v-if="rightAboutData.list.length === 0">
                <span>
                  <a href="#">暂无相关内容</a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
<!--      <statement></statement>-->
    </div>
  </div>
</template>
<script>
import axios from '@/libs/api.request'
import statement from '@/view/inspection/components/statement/'
import './search.less'
import './detail.less'
export default {
  name: 'CriterionDetail',
  components: {
    statement
  },
  data () {
    return {
      modelShow: false,
      formData: {
        searchPhrase: '',
        category: '',
        publishUnit: '',
        status: '',
        source: ''
      },
      currentId: 0,
      publishUnitList: [],
      typeList: [],
      statusList: [],
      lawData: {},
      leftAboutData: {
        title: '相关发布单位法规',
        type: 'publish_unit',
        code: '',
        list: []
      },
      rightAboutData: {
        title: '最新法规',
        type: 'new',
        code: '',
        list: []
      }
    }
  },
  mounted () {
    // this.getAllSystemDataTypeList()
    this.currentId = this.$route.query.id
    this.getLawById()
    this.getLawTypeList(this.$route.query.category)
  },
  methods: {
    handleUploadFile () {
      this.getTablePageData()
    },
    getAllSystemDataTypeList () {
      const option = {
        url: '/api/system/getSystemDataByTypeCode/FG_publishUnit,FG_status',
        method: 'get'
      }
      axios.request(option).then(res => {
        this.publishUnitList = res.data.data['FG_publishUnit']
        this.statusList = res.data.data['FG_status']
      })
    },
    getLawById () {
      const _this = this
      const option = {
        url: '/api/law/getLawById/' + this.currentId,
        method: 'get'
      }
      axios.request(option).then(res => {
        if (res.data.code === 200) {
          _this.lawData = res.data.data
          // console.log(_this.lawData)
          // _this.lawData['annexs'] = _this.lawData.annexList ? _this.lawData.annexList.join(' ') : ''
          _this.getTablePageData(1)
          _this.getTablePageData(2)
        }
      })
    },
    getLawTypeList (code) {
      let url = ''
      if (code) {
        url = '/api/law/getLawTypeListByCode/' + code
      } else {
        url = '/api/law/getAllLawType/'
      }
      const option = {
        url: url,
        method: 'get'
      }
      axios.request(option).then(res => {
        this.typeList = res.data.data
      })
    },
    handleClear (e) {

    },
    handleSearch () {
      this.$router.push({
        name: 'law',
        params: this.formData
      })
    },
    getTablePageData (param) {
      // console.log(this.formData)
      const _this = this
      const option = {
        url: '/api/law/getLawPageList',
        data: {
          pageNum: 1, // 当前页
          pageSize: 5, // 一页展示数量
          publishUnit: param === 1 ? _this.lawData.publishUnit : '',
          currentId: _this.lawData.id
        },
        method: 'post'
      }
      axios.request(option).then(res => {
        if (param === 1) {
          _this.leftAboutData.code = _this.lawData.publishUnitName
          _this.leftAboutData.list = res.data.data.list
        }
        if (param === 2) {
          _this.rightAboutData.code = _this.lawData.codeNumber
          _this.rightAboutData.list = res.data.data.list
        }
      })
    },
    getMoreAboutData (param) {
      if (param === 1) {
        this.formData.publishUnit = this.lawData.publishUnit
      }
      this.handleSearch()
    },
    downloadFile () {
      const _this = this
      const option = {
        url: '/api/show/downloadFile?businessId=' + this.currentId + '&baseType=3',
        method: 'get',
        responseType: 'arraybuffer'
      }
      axios.request(option).then(res => {
        let l = _this.lawData.annexList.length
        if (l > 0) {
          let fileName = ''
          if (l === 1) {
            fileName = _this.lawData.annexList[0].name
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
    },
    viewData () {
      this.$router.push({
        name: 'view_file'
      })
    }
  }
}
</script>
