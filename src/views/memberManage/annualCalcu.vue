<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <div>
          <span>机构类型：</span>
          <el-select placeholder="请选择" v-model="orgType">
            <el-option v-for="item in orgList" :key="item.id" :value="item.dictVal"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>会员机构：</span>
          <el-input placeholder="请输入" v-model="orgnize" class="input_style"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary">导出模板</el-button>
        <el-button type="primary">导入</el-button>
        <el-button type="primary">批量提交</el-button>
      </el-col>
      <el-col :span="12" class="text_right">
        <el-button type="primary" @click="handleQuery()">查询</el-button>
        <el-button @click="clear">重置</el-button>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <calcTable
          :approData="allData"
          :status="''"
          :displayCal="displayCal"
          :headQuery="{orgType,orgnize}"
        ></calcTable>
      </el-tab-pane>
      <el-tab-pane label="草稿" name="draft">
        <calcTable
          :approData="draftData"
          status="1"
          :displayCal="displayCal"
          :headQuery="{orgType,orgnize}"
        ></calcTable>
      </el-tab-pane>
      <el-tab-pane label="待核对" name="wait">
        <calcTable
          :approData="waitData"
          status="2"
          :displayCal="displayCal"
          :headQuery="{orgType,orgnize}"
        ></calcTable>
      </el-tab-pane>
      <el-tab-pane label="已驳回" name="reject">
        <calcTable
          :approData="rejectData"
          status="3"
          :displayCal="displayCal"
          :headQuery="{orgType,orgnize}"
        ></calcTable>
      </el-tab-pane>
      <el-tab-pane label="已中止" name="stop">
        <calcTable
          :approData="stopData"
          status="4"
          :displayCal="displayCal"
          :headQuery="{orgType,orgnize}"
        ></calcTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import calcTable from "./component/table/calcTable";
import {
  warnMES,
  successMES,
  tipMES,
  pageTen,
  pubParam,
  apiSelect,
  apiMemberStatus,
  apiPublishStatus,
  selectType,
  queryResp,
  mapTime,
  getDateTime
} from "../../utils/common";

export default {
  data() {
    return {
      activeName: "all",
      tabName: "",
      orgnize: "",
      orgType: "",
      orgList: [],

      allData: [],
      draftData: [],
      waitData: [],
      rejectData: [],
      stopData: [],

      allpage: { ...pageTen },
      pageDraft: { ...pageTen },
      pageWait: { ...pageTen },
      pageReject: { ...pageTen },
      pageStop: { ...pageTen },
      pageTen,

      payOrganList: []
    };
  },
  created() {
    apiSelect({ type: 1 }, this.orgList); // 机构类型
    this.displayCal(
      {
        ...pubParam.page,
        payFeeId: Number(this.$route.query.payFeeId),
        checkStatus: ""
      },
      this.allData,
      this.pageTen
    );

    // 年费审核状态
    // this.$api.dict.payOrganList().then(res => {
    //   if (res.success) {
    //     this.payOrganList = res.data;
    //   }
    // });
  },
  methods: {
    handleClick(tab) {
      this.tabName = tab.name;
      const query = {
        payFeeId: Number(this.$route.query.payFeeId),
        institutionName: this.orgnize,
        institutionType: selectType(this.orgType, this.orgList)
      };
      if (this.tabName == "all") {
        this.displayCal(
          { ...pubParam.page, ...query },
          this.allData,
          this.allpage
        );
      } else if (this.tabName == "draft") {
        this.displayCal(
          { ...pubParam.page, checkStatus: 1, ...query },
          this.draftData,
          this.pageDraft
        );
      } else if (this.tabName == "wait") {
        this.displayCal(
          { ...pubParam.page, checkStatus: 2, ...query },
          this.waitData,
          this.pageWait
        );
      } else if (this.tabName == "reject") {
        this.displayCal(
          { ...pubParam.page, checkStatus: 3, ...query },
          this.rejectData,
          this.pageReject
        );
      } else if (this.tabName == "stop") {
        this.displayCal(
          { ...pubParam.page, checkStatus: 4, ...query },
          this.stopData,
          this.pageStop
        );
      }
    },
    displayCal(params, renderData, renderPage) {
      this.$api.member
        .showCalcu(params)
        .then(res => {
          if (res.success) {
            queryResp(renderData, renderPage, res.data);
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleQuery() {
      let status = "";
      let renData = {};
      let page = {};
      if (this.tabName == "all" || this.tabName == "") {
        status = "";
        renData = this.allData;
        page = this.allpage;
      } else if (this.tabName == "draft") {
        status = 1;
        renData = this.draftData;
        page = this.pageDraft;
      } else if (this.tabName == "wait") {
        status = 2;
        renData = this.waitData;
        page = this.pageWait;
      } else if (this.tabName == "reject") {
        status = 3;
        renData = this.rejectData;
        page = this.pageReject;
      } else if (this.tabName == "stop") {
        status = 4;
        renData = this.stopData;
        page = this.pageStop;
      }
      const query = {
        payFeeId: Number(this.$route.query.payFeeId),
        checkStatus: status,
        institutionName: this.orgnize,
        institutionType: selectType(this.orgType, this.orgList)
      };
      this.displayCal({ ...pubParam.page, ...query }, renData, page);
    },
    clear() {
      this.orgnize = "";
      this.orgType = "";
    }
  },
  components: {
    calcTable
  }
};
</script>
<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 30px;
  height: 100%;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .input_style,
  .el-select {
    width: calc(100% - 180px);
  }
}
</style>
