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
        搜索抽检数据
      </div>
      <div class="search-con search-con-top search-pc">
        <Input @on-change="handleClear" clearable placeholder="输入标称生产企业/进口代理商名称/样品名称搜索"
               class="search-input" v-model="formData.searchPhrase" style="width:280px" @on-enter="handleSearch"/>
        <!--<Select v-model="formData.institution" style="width:120px" placeholder="请选择公布机构" clearable>
          <Option value="" key="">全部</Option>
          <Option v-for="item in institutionList" :value="item.label" :key="item.value">{{ item.label }}</Option>
        </Select>-->
        <Select v-model="formData.checkResult" style="width:120px; margin-left: 2px;" placeholder="请选择抽检结果" clearable>
          <Option value="1" key="1">合格</Option>
          <Option value="0" key="0">不合格</Option>
        </Select>
        <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="md-search"/>&nbsp;&nbsp;搜索</Button>
      </div>
      <div style="margin: 16px 0; display: none" class="app">
        <i-input clearable placeholder="输入标称生产企业/进口代理商名称/样品名称搜索"
                 class="search-input"
                 v-model="formData.searchPhrase"
                 @on-enter="handleSearch">
          <i-select slot="prepend"
                    v-model="formData.checkResult"
                    style="width:90px"
                    placeholder="是否有缺陷"
                    clearable>
            <Option value="1" key="1">合格</Option>
            <Option value="0" key="0">不合格</Option>
          </i-select>
          <i-button slot="append"
                    @click="handleSearch"
                    class="search-btn">搜索</i-button>
        </i-input>
      </div>

    </div>
    <div class="detail-data detail-con">
      <div>
        {{spotCheckData.sample}}
      </div>
      <table class="detail-con-tab" border="1" cellspacing="0" cellpadding="0">
        <tr>
          <td colspan="2">标称生产企业/进口代理商名称</td>
          <td colspan="10" class="detail-content">{{spotCheckData.producer}}</td>
        </tr>
        <tr>
          <td colspan="2">委托企业名称</td>
          <td colspan="10" class="detail-content">{{spotCheckData.company}}</td>
        </tr>
        <tr>
          <td colspan="2">被采样单位名称</td>
          <td colspan="10" class="detail-content">{{spotCheckData.unit}}</td>
        </tr>
        <tr>
          <td colspan="2">样品名称</td>
          <td colspan="4" class="detail-content">{{spotCheckData.sample}}</td>
          <td colspan="2">包装规格</td>
          <td colspan="4" class="detail-content">{{spotCheckData.specification}}</td>
        </tr>
        <tr>
          <td colspan="2">抽检结果</td>
          <td colspan="4" class="detail-content">{{spotCheckData.checkResult}}</td>
          <td colspan="2">不合格项目</td>
          <td colspan="4" class="detail-content">{{spotCheckData.subject}}</td>
        </tr>
        <tr>
          <td colspan="2">保质期</td>
          <td colspan="4" class="detail-content">{{spotCheckData.expireTime}}</td>
          <td colspan="2">产品分类</td>
          <td colspan="4" class="detail-content">{{spotCheckData.productType}}</td>
        </tr>
        <tr>
          <td colspan="2">产地</td>
          <td colspan="4" class="detail-content">{{spotCheckData.location}}</td>
          <td colspan="2">公布日期</td>
          <td colspan="4" class="detail-content">{{spotCheckData.publishDate}}</td>
        </tr>
        <tr>
          <td colspan="2">涉嫌假冒</td>
          <td colspan="4" class="detail-content">{{spotCheckData.isFake}}</td>
          <td colspan="2">公布机构</td>
          <td colspan="4" class="detail-content">{{spotCheckData.institution}}</td>
        </tr>
        <tr>
          <td colspan="2">来源链接</td>
          <td colspan="10" class="detail-content"><a :href="spotCheckData.sourceLink" target="view_window">{{spotCheckData.sourceLink}}</a></td>
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
                  <a :href="'/spotCheckDetail?id=' + item.id" :title="item.sample">{{item.sample}}</a>
                </span>
                <em>{{item.checkResult}}</em>
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
                  <a :href="'/spotCheckDetail?id=' + item.id" :title="item.sample">{{item.sample}}</a>
                </span>
                <em>{{item.checkResult}}</em>
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
      <!--<div class="statement-con" v-html="statementContent"></div>-->
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
        institution: '',
        checkResult: '',
        productType: ''
      },
      currentId: 0,
      institutionList: [],
      spotCheckData: {},
      leftAboutData: {
        title: '相关分类抽检结果',
        type: 'product_type',
        code: '皮肤用化妆品',
        list: []
      },
      rightAboutData: {
        title: '相关机构抽检结果',
        type: 'institution',
        code: '皮肤用化妆品',
        list: []
      },
      statementContent: ''
    }
  },
  mounted () {
    // this.getAllSystemDataTypeList()
    this.currentId = this.$route.query.id
    this.getSpotCheckById()
  },
  methods: {
    getAllSystemDataTypeList () {
      const option = {
        url: '/api/spotCheck/getAllInstitution',
        method: 'get'
      }
      axios.request(option).then(res => {
        this.institutionList = res.data.data
      })
    },
    getSpotCheckById () {
      const _this = this
      const option = {
        url: '/api/spotCheck/getSpotCheckById/' + this.currentId,
        method: 'get'
      }
      axios.request(option).then(res => {
        if (res.data.code === 200) {
          _this.spotCheckData = res.data.data
          _this.getTablePageData(1)
          _this.getTablePageData(2)
        }
      })
    },
    handleSearch () {
      this.$router.push({
        name: 'spotCheck',
        params: this.formData
      })
    },
    handleClear (e) {

    },
    getTablePageData (param) {
      // console.log(this.formData)
      const _this = this
      const option = {
        url: '/api/spotCheck/getSpotCheckPageList',
        data: {
          pageNum: 1, // 当前页
          pageSize: 5, // 一页展示数量
          productType: param === 1 ? _this.spotCheckData.productType : '',
          institution: param === 2 ? _this.spotCheckData.institution : '',
          currentId: _this.spotCheckData.id
        },
        method: 'post'
      }
      axios.request(option).then(res => {
        if (param === 1) {
          _this.leftAboutData.code = _this.spotCheckData.productTypeName
          _this.leftAboutData.list = res.data.data.list
        }
        if (param === 2) {
          _this.rightAboutData.code = _this.spotCheckData.institution
          _this.rightAboutData.list = res.data.data.list
        }
      })
    },
    getMoreAboutData (param) {
      if (param === 1) {
        this.$store.dispatch('CreateParam', { type: 'SC', query: [{ key: 'productType', value: this.spotCheckData.productType }] })
        this.formData.productType = this.spotCheckData.productType
      }
      if (param === 2) {
        this.formData.institution = this.spotCheckData.institution
      }
      this.handleSearch()
    }
  }
}
</script>
