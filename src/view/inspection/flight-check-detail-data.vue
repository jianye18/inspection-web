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
        搜索监督检查
      </div>
      <div class="search-con search-con-top search-pc">
        <Input @on-change="handleClear" clearable placeholder="输入企业名称搜索" class="search-input" v-model="formData.searchPhrase" @on-enter="handleSearch"/>
        <!--<Select v-model="formData.publishUnit" style="width:120px" placeholder="请选择发布机构" clearable>
          <Option v-for="item in publishUnitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="formData.precautions" style="width:120px" placeholder="请选择处理措施" clearable>
          <Option v-for="item in precautionsList" :value="item.value">{{item.label}}</Option>
        </Select>-->
        <Select v-model="formData.isDefect" style="width:120px" placeholder="是否有缺陷" clearable>
          <Option v-for="item in defectList" :value="item.value" :key="item.value">{{item.label}}</Option>
        </Select>
        <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="md-search"/>&nbsp;&nbsp;搜索</Button>
      </div>
      <div style="margin: 16px 0; display: none" class="app">
        <i-input clearable placeholder="输入企业名称搜索"
                 class="search-input"
                 v-model="formData.searchPhrase"
                 @on-enter="handleSearch">
          <i-select slot="prepend"
                    v-model="formData.isDefect"
                    style="width:90px"
                    placeholder="是否有缺陷"
                    clearable>
            <Option v-for="item in defectList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </i-select>
          <i-button slot="append"
                    @click="handleSearch"
                    class="search-btn">搜索</i-button>
        </i-input>
      </div>

    </div>
    <div class="detail-data detail-con">
      <div>
        {{flightCheckData.businessName}}
      </div>
      <table class="detail-con-tab" border="1" cellspacing="0" cellpadding="0">
        <tr>
          <td colspan="2">企业名称</td>
          <td colspan="10" class="detail-content">{{flightCheckData.businessName}}</td>
        </tr>
        <tr>
          <td colspan="2">发布单位</td>
          <td colspan="4" class="detail-content">{{flightCheckData.publishUnit}}</td>
          <td colspan="2">发布时间</td>
          <td colspan="4" class="detail-content">{{flightCheckData.publishDate}}</td>
        </tr>
        <tr>
          <td colspan="2">飞检类型</td>
          <td colspan="4" class="detail-content">{{flightCheckData.type}}</td>
          <td colspan="2">是否有缺陷</td>
          <td colspan="4" class="detail-content">{{flightCheckData.isDefect}}</td>
        </tr>
        <tr>
          <td colspan="2">问题内容</td>
          <td colspan="10" class="detail-content" v-html="flightCheckData.problem"></td>
          <!--<td colspan="3" class="detail-content">{{flightCheckData.problem}}</td>-->
        </tr>
        <tr>
          <td colspan="2">来源链接</td>
          <td colspan="10" class="detail-content"><a :href="flightCheckData.sourceLink" target="view_window">{{flightCheckData.sourceLink}}</a></td>
        </tr>
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
                  <a :href="'/flightCheckDetail?id=' + item.id" :title="item.businessName">{{item.businessName}}</a>
                </span>
                <em>{{item.isDefect}}</em>
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
                  <a :href="'/flightCheckDetail?id=' + item.id" :title="item.businessName">{{item.businessName}}</a>
                </span>
                <em>{{item.isDefect}}</em>
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
import Global from '@/store/global'
import statement from '@/view/inspection/components/statement/'
import './search.less'
import './detail.less'
export default {
  name: 'SpotCheckDetail',
  components: {
    statement
  },
  data () {
    return {
      modelShow: false,
      formData: {
        mold: 2,
        searchPhrase: '',
        publishUnit: '',
        precautions: '',
        isDefect: ''
      },
      currentId: 0,
      publishUnitList: [],
      precautionsList: [],
      defectList: Global.defectList,
      flightCheckData: {},
      leftAboutData: {
        title: '相关分类飞检结果',
        type: 'typeCode',
        code: 'typeCode',
        list: []
      },
      rightAboutData: {
        title: '相关单位飞检结果',
        type: 'publishUnit',
        code: 'publishUnit',
        list: []
      }
    }
  },
  mounted () {
    this.currentId = this.$route.query.id
    this.getFlightCheckById()
    this.getAllSystemDataTypeList()
    this.getAllPublishUnit()
  },
  methods: {
    getAllSystemDataTypeList () {
      const option = {
        url: '/api/system/getSystemDataByTypeCode/FJ_precautions',
        method: 'get'
      }
      axios.request(option).then(res => {
        this.precautionsList = res.data.data['FJ_precautions']
      })
    },
    getAllPublishUnit () {
      const option = {
        url: '/api/flightCheck/getAllPublishUnit',
        method: 'get'
      }
      axios.request(option).then(res => {
        this.publishUnitList = res.data.data
      })
    },
    getFlightCheckById () {
      const _this = this
      const option = {
        url: '/api/flightCheck/getFlightCheckById/' + this.currentId,
        method: 'get'
      }
      axios.request(option).then(res => {
        if (res.data.code === 200) {
          _this.flightCheckData = res.data.data
          // console.log(_this.flightCheckData)
          _this.getTablePageData(1)
          _this.getTablePageData(2)
        }
      })
    },
    handleSearch () {
      this.$router.push({
        name: 'flightCheck',
        params: this.formData
      })
    },
    handleClear (e) {

    },
    getTablePageData (param) {
      // console.log(this.formData)
      const _this = this
      const option = {
        url: '/api/flightCheck/getFlightCheckPageList',
        data: {
          pageNum: 1, // 当前页
          pageSize: 5, // 一页展示数量
          type: param === 1 ? _this.flightCheckData.type : '',
          publishUnit: param === 2 ? _this.flightCheckData.publishUnit : '',
          currentId: _this.flightCheckData.id
        },
        method: 'post'
      }
      axios.request(option).then(res => {
        if (param === 1) {
          _this.leftAboutData.code = _this.flightCheckData.typeName
          _this.leftAboutData.list = res.data.data.list
        }
        if (param === 2) {
          _this.rightAboutData.code = _this.flightCheckData.publishUnitName
          _this.rightAboutData.list = res.data.data.list
        }
      })
    },
    getMoreAboutData (param) {
      if (param === 1) {
        this.$store.dispatch('CreateParam', { type: 'FC', query: [{ key: 'type', value: this.flightCheckData.type }] })
        this.formData.type = this.flightCheckData.type
      }
      if (param === 2) {
        this.formData.publishUnit = this.flightCheckData.publishUnit
      }
      this.handleSearch()
    }
  }
}
</script>
