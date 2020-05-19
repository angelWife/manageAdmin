<template>
  <div class="inner">
    <el-row class="showData">
      <el-col :span="8">
        <div class="grid-content bd-r">
          <div class="title">已通过</div>
          <div class="number">71/100</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bd-r">
          <div class="title">审批中</div>
          <div class="number">12</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="title">已寄送/待寄送</div>
          <div class="number">3</div>
        </div>
      </el-col>
    </el-row>
    <div class="mintorDesc">
      <el-row>
        <el-col :span="8">
          <div>
            <span>机构类型：</span>
            <el-select placeholder="请选择" v-model="query.institutionType">
              <el-option v-for="item in orgList" :key="item.id" :value="item.dictKey" :label="item.dictVal"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>会员机构：</span>
            <el-input placeholder="请输入" v-model="query.institutionName" class="input_style"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="btn_content">
        <el-col :span="12">
          <el-button type="primary">导出</el-button>
          <el-button type="primary">全体缴费通知</el-button>
          <el-button type="primary">批量缴费通知</el-button>
        </el-col>
        <el-col :span="12" class="text_right">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="resetfields">重置</el-button>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" type="card" @tab-click="handleQuery">
        <el-tab-pane label="全部" name="0">
          <payTable :monitorData="monitorData" :pageTab="pageAll" :pageChange="allChange"></payTable>
        </el-tab-pane>
        <el-tab-pane label="待缴费" name="1">
          <payTable :monitorData="monitorData" :pageTab="pageAll" :pageChange="allChange"></payTable>
        </el-tab-pane>
        <el-tab-pane label="已缴费" name="2">
          <payTable :monitorData="monitorData" :pageTab="pageAll" :pageChange="allChange"></payTable>
        </el-tab-pane>
        <el-tab-pane label="已寄送" name="3">
          <payTable :monitorData="monitorData" :pageTab="pageAll" :pageChange="allChange"></payTable>
        </el-tab-pane>
        <el-tab-pane label="待寄送" name="4">
          <payTable :monitorData="monitorData" :pageTab="pageAll" :pageChange="allChange"></payTable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import payTable from "./component/table/payTable";

import { apiShow, apiDic, backPage,hasPage } from "../../utils/commonApi";
import {
  warnMES,
  successMES,
  apiSelect,
  pageTen, pubParam,
} from "../../utils/common";
export default {
  data() {
    return {
      activeName: "0",
      organize: "",
      pageAll: {},
      orgType: "",
      orgList: [],
      monitorAll: [],
      pageLocation:1,
      monitorData:[],
      query: {
          "institutionName": "",
          "institutionType": "",
          "payId": this.$route.query.payMonitorId,
          "payStatus": "",
          "sendStatus": ""

      },
      
    };
  },
  methods: {
    allChange(i) {
      this.pageLocation = i;
      this.showMintorPay({
        pageIndex: this.pageLocation,
        pageSize: pubParam.page.pageSize
      });
    },
    resetfields(){
       this.query.institutionType='';
       this.query.institutionName="";
    },
     handleQuery() {
         this.showMintorPay({...pubParam.page});
    },
    // allChange(i) {
    //   this.pageLocation = i;
    //   this.showMintorPay({
    //     pageIndex: this.pageLocation,
    //     pageSize: pubParam.page.pageSize
    //   });
    // },
    showMintorPay(param) {
      switch(this.activeName){
        case '0': this.query.payStatus='';this.query.sendStatus='';break;
        case '1': this.query.payStatus=1;this.query.sendStatus='';break;
        case '2':  this.query.payStatus=2;this.query.sendStatus='';break;
        case '3': this.query.payStatus='';this.query.sendStatus=1;break;
        case '4': this.query.payStatus='';this.query.sendStatus=2;break;
        default:  this.query.payStatus='';this.query.sendStatus='';
      }
      apiShow("member", "payMintorList", {
        ...this.query,
        ...param
      }).then(resolve => {
        this.monitorData = resolve.rows;
        this.pageAll = backPage(resolve);
      });
    },
  },
  created(){
     apiSelect({ type: 1 }, this.orgList); //机构类型
     this.showMintorPay(pubParam.page);
  },
  components: { payTable }
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.inner {
  margin-top: 20px;
  height: 100%;
  .showData {
    padding: 30px;
    background-color: #fff;
    .grid-content {
      line-height: 30px;
      .title {
        text-align: center;
        color: #999;
      }
      .number {
        text-align: center;
        font-weight: 500;
        font-size: 20px;
      }
    }
    .bd-r {
      border-right: 1px solid #ccc;
    }
  }
  .mintorDesc {
    margin-top: 30px;
    padding: 30px;
    background-color: #fff;
    height: 100%;
    .input_style,
    .el-select {
      width: calc(100% - 180px);
    }
  }
}
</style>