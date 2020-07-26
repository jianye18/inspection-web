<style>
  .detail-data{
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 10px;
  }
  .detail-con{
    padding-top: 30px;
  }
  .detail-data-title{
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .detail-data .ivu-col{
    padding: 5px 0;
  }
</style>
<template>
  <div>
    <div class="detail-data detail-title">
      <div style="font-size: 16px; height: 16px; line-height: 16px; padding-left: 5px; font-weight: bold;border-left: 9px solid #1788bc;">
        搜索法规结果
      </div>
      <div class="search-con search-con-top">
        <Input @on-change="handleClear" clearable placeholder="输入标准名称搜索" class="search-input" v-model="formData.searchPhrase" @on-enter="handleSearch"/>
        <Select v-model="formData.publishUnit" style="width:120px" placeholder="请选择发布机构" clearable>
          <Option v-for="item in publishUnitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="formData.status" style="width:120px; margin-left: 2px;" placeholder="请选择状态" clearable>
          <Option v-for="item in statusList" :value="item.value">{{item.label}}</Option>
        </Select>
        <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="md-search"/>&nbsp;&nbsp;搜索</Button>
      </div>
    </div>
    <div class="detail-data detail-con">
      <Row>
        <Col span="20" offset="2" class="detail-data-title">{{lawData.name}}</Col>
      </Row>
      <Row>
        <Col span="4" offset="2">发布单位：{{lawData.publishUnitName}}</Col>
        <Col span="4" offset="6">文号：{{lawData.codeNumber}}</Col>
      </Row>
      <Row>
        <Col span="4" offset="2">发布日期：{{lawData.publishDate}}</Col>
        <Col span="4" offset="6">实施日期：{{lawData.implementDate}}</Col>
      </Row>
      <Row>
        <Col span="4" offset="2">状态：{{lawData.statusName}}</Col>
      </Row>
      <Row>
        <Col span="20" offset="2" class="detail-data-content" v-html="lawData.content"></Col>
      </Row>
      <Row>
        <Col span="20" offset="2" style="border-top: 1px solid #e5e5e5; padding-top: 20px;">
          附件：
          <span v-for="item in lawData.annexs">{{item}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span v-if="!lawData.annexs">无附件</span>
          <Button size="large" type="primary" icon="ios-book-outline" style="float: right; margin-right: 10px;">浏览文件</Button>
          <Button size="large" type="success" icon="ios-download-outline" style="float: right; margin-right: 10px;" @click="downloadFile">下载文件</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import axios from '@/libs/api.request'
import Global from '@/store/global'
import './search.less'
export default {
  name: 'LawView',
  data () {
    return {
      modelShow: false,
      formData: {
        searchPhrase: '',
        publishUnit: '',
        status: '',
        source: ''
      },
      currentId: 0,
      publishUnitList: [],
      statusList: [],
      lawData: {}
    }
  },
  mounted () {
    this.getAllSystemDataTypeList()
    this.currentId = this.$route.query.id
    this.getLawById()
  },
  methods: {
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
          _this.lawData.annexs = []
          if (_this.lawData.annexList.length > 0) {
            _this.lawData.annexList.forEach(function (item) {
              _this.lawData.annexs.push(item.name)
            })
          }
        }
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
    downloadFile () {
      const _this = this
      const option = {
        url: '/api/show/downloadFile?businessId=' + this.currentId + '&baseType=3',
        method: 'get',
        responseType: 'arraybuffer'
      }
      axios.request(option).then(res => {
        let l = _this.lawData.annexs.length
        if (l > 0) {
          let fileName = ''
          if (l === 1) {
            fileName = _this.lawData.annexs[0]
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
