<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <div>
          <span>会员代码：</span>
          <el-input v-model="code" placeholder="请输入" class="input_style" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>会员类型：</span>
          <el-select v-model="memberType" placeholder="请选择" clearable>
            <el-option v-for="item in memberList" :key="item.id" :value="item.dictVal" ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>机构类型：</span>
          <el-select v-model="orgType" placeholder="请选择" clearable>
            <el-option v-for="item in orgList" :key="item.id" :value="item.dictVal" ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div>
          <span>机构名称：</span>
          <el-input v-model="orgName" placeholder="请输入" class="input_style" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="8" v-show="fold">
        <div>
          <span>统一社会信用编码：</span>
          <el-input v-model="scoialcode" placeholder="请输入" class="input_style" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="8" v-show="fold">
        <div>
          <span>公司性质：</span>
          <el-select v-model="busPro" placeholder="请选择" clearable>
            <el-option v-for="item in proList" :key="item.id" :value="item.dictVal" ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row v-show="fold">
      <el-col :span="8">
        <div>
          <span>成立日期：</span>
          <el-date-picker
            v-model="buildTime"
            type="daterange"
            clearable
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>是否上市：</span>
          <el-select v-model="marketed" placeholder="请选择">
            <el-option value="yes" label="是"></el-option>
            <el-option value="no" label="否"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>注册资本：</span>
          <el-input v-model="capitalOne" placeholder="请输入" class="input_split" clearable></el-input>
          <el-input v-model="capitalTwo" placeholder="请输入" class="input_split" clearable></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row v-show="fold">
      <el-col :span="8">
        <div>
          <span>股东数量：</span>
          <el-input v-model="stockOne" placeholder="请输入" class="input_split" clearable></el-input>
          <el-input v-model="stockTwo" placeholder="请输入" class="input_split" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>总资产规模：</span>
          <el-input v-model="totalOne" placeholder="请输入" class="input_split" clearable></el-input>
          <el-input v-model="totalTwo" placeholder="请输入" class="input_split" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>净资产规模：</span>
          <el-input v-model="netOne" placeholder="请输入" class="input_split" clearable></el-input>
          <el-input v-model="netTwo" placeholder="请输入" class="input_split" clearable></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary">导出</el-button>
      </el-col>
      <el-col :span="12" class="text_right">
        <el-tag v-if="unfold" style="cursor:pointer" @click="handleUnfold()">
          展开
          <i class="el-icon-arrow-down"></i>
        </el-tag>
        <el-tag v-if="fold" style="cursor:pointer" @click="handleFold()">
          收起
          <i class="el-icon-arrow-up"></i>
        </el-tag>
        <span style="padding:0 10px"></span>
        <el-button type="primary" @click="handleQuery()">查询</el-button>
        <el-button @click="clear()">重置</el-button>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <Table :approData="allData" :pageTen="allpage" :currentchange="allchange"></Table>
      </el-tab-pane>
      <el-tab-pane label="已认定" name="wait">
        <Table :approData="hadData" :pageTen="pageHad" :currentchange="hadchange"></Table>
      </el-tab-pane>
      <el-tab-pane label="认定中" name="pass">
        <Table :approData="havingData" :pageTen="pageHaving" :currentchange="havingchange"></Table>
      </el-tab-pane>
      <el-tab-pane label="已冻结" name="reject">
        <Table :approData="frozeData" :pageTen="pageFroze" :currentchange="frozechange"></Table>
      </el-tab-pane>
      <el-tab-pane label="已退会" name="stop">
        <Table :approData="exitData" :pageTen="pageExit" :currentchange="exitchange"></Table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Table from "./component/table";
import { format } from "../../utils/datetime";
import {
  warnMES,
  successMES,
  tipMES,
  pageTen,
  pubParam,
  apiSelect,
  apiMemberStatus,
  selectType,
  queryResp,
  mapTime,
  getDateTime,
  flagList
} from "../../utils/common";

export default {
  name: "archive",
  data() {
    return {
      unfold: true, // 展开
      fold: false, // 收起

      code: "",
      memberType: "",
      memberList: [],
      orgType: "",
      orgList: [],
      orgName: "",
      scoialcode: "",
      busPro: "",
      proList: [],
      marketed: "",
      buildTime: "",
      capitalOne: "",
      capitalTwo: "",
      stockOne: "",
      stockTwo: "",
      totalOne: "",
      totalTwo: "",
      netOne: "",
      netTwo: "",

      memberStatus: [],
      activeName: "all",
      tabName: "all",

      allData: [],
      hadData: [],
      havingData: [],
      frozeData: [],
      exitData: [],

      allpage: { ...pageTen },
      pageHaving: { ...pageTen },
      pageFroze: { ...pageTen },
      pageExit: { ...pageTen },
      pageHad: { ...pageTen },

      pageTen
    };
  },
  created() {
    apiSelect({ type: 1 }, this.orgList);
    apiSelect({ type: 2 }, this.memberList);
    apiSelect({ type: 4 }, this.proList);

    apiMemberStatus(this.memberStatus);
    console.log(this.memberStatus);
    // tab标签页切换 进入页面就渲染
    this.displayRecord(pubParam.page, this.allData, this.allpage);
    this.displayRecord(
      { ...pubParam.page, memberStatus: 1 },
      this.hadData,
      this.pageHad
    );
    this.displayRecord(
      { ...pubParam.page, memberStatus: 5 },
      this.havingData,
      this.pageHaving
    );
    this.displayRecord(
      { ...pubParam.page, memberStatus: 3 },
      this.frozeData,
      this.pageFroze
    );
    this.displayRecord(
      { ...pubParam.page, memberStatus: 4 },
      this.exitData,
      this.pageExit
    );
  },
  methods: {
    handleClick(tab) {
      this.tabName = tab.name;
      let query = {
        assetsAssetsFrom: this.netOne,
        assetsAssetsTo: this.netTwo,
        companyName: this.orgName,
        companyType: selectType(this.busPro, this.proList),
        creditId: this.scoialcode,
        dateBuildFrom: getDateTime(this.buildTime[0]),
        dateBuildTo: getDateTime(this.buildTime[1]),
        flagListed: flagList(this.marketed),
        institutionType: selectType(this.orgType, this.orgList),
        memberCode: this.code,
        memberType: selectType(this.memberType, this.memberList),
        registeredCapitalFrom: this.capitalOne,
        registeredCapitalTo: this.capitalTwo,
        shareholderNumFrom: this.stockOne,
        shareholderNumTo: this.stockTwo,
        totalAssetsFrom: this.netOne,
        totalAssetsTo: this.netTwo
      };
      if (this.tabName == "all") {
        this.displayRecord(
          { ...pubParam.page, ...query },
          this.allData,
          this.allpage
        );
      } else if (this.tabName == "wait") {
        this.displayRecord(
          { ...pubParam.page, memberStatus: 1, ...query },
          this.hadData,
          this.pageHad
        );
      } else if (this.tabName == "pass") {
        this.displayRecord(
          { ...pubParam.page, memberStatus: 5, ...query },
          this.havingData,
          this.pageHaving
        );
      } else if (this.tabName == "reject") {
        this.displayRecord(
          { ...pubParam.page, memberStatus: 3, ...query },
          this.frozeData,
          this.pageFroze
        );
      } else if (this.tabName == "stop") {
        this.displayRecord(
          { ...pubParam.page, memberStatus: 4, ...query },
          this.exitData,
          this.pageExit
        );
      }
    },
    handleUnfold() {
      this.unfold = false;
      this.fold = true;
    },
    handleFold() {
      this.fold = false;
      this.unfold = true;
    },
    queryIF() {
      let query = {
        assetsAssetsFrom: this.netOne,
        assetsAssetsTo: this.netTwo,
        companyName: this.orgName,
        companyType: selectType(this.busPro, this.proList),
        creditCode: this.scoialcode,
        dateBuildFrom: getDateTime(this.buildTime[0]),
        dateBuildTo: getDateTime(this.buildTime[1]),
        flagListed: flagList(this.marketed),
        institutionType: selectType(this.orgType, this.orgList),
        memberCode: this.code,
        memberStatus: status,
        memberType: selectType(this.memberType, this.memberList),
        registeredCapitalFrom: this.capitalOne,
        registeredCapitalTo: this.capitalTwo,
        shareholderNumFrom: this.stockOne,
        shareholderNumTo: this.stockTwo,
        totalAssetsFrom: this.netOne,
        totalAssetsTo: this.netTwo
      };
      return query;
    },
    handleQuery() {
      let status = "";
      let renData = {};
      let page = {};
      if (this.tabName == "all") {
        status = "";
        renData = this.allData;
        page = this.allpage;
      } else if (this.tabName == "wait") {
        status = 1;
        renData = this.hadData;
        page = this.pageHad;
      } else if (this.tabName == "pass") {
        status = 5;
        renData = this.havingData;
        page = this.pageHaving;
      } else if (this.tabName == "reject") {
        status = 3;
        renData = this.frozeData;
        page = this.pageFroze;
      } else if (this.tabName == "stop") {
        status = 4;
        renData = this.exitData;
        page = this.pageExit;
      }
      this.displayRecord(
        {
          ...pubParam.page,
          ...this.queryIF()
        },
        renData,
        page
      );
    },
    displayRecord(params, renderData, renderPage) {
      this.$api.member
        .showRecord(params)
        .then(res => {
          if (res.success) {
            queryResp(
              renderData,
              renderPage,
              res.data,
              "dateBuild",
              "joinDate"
            );
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clear() {
      this.code = "";
      this.memberType = "";
      this.orgType = "";
      this.orgName = "";
      this.scoialcode = "";
      this.busPro = "";
      this.marketed = "";
      this.buildTime = "";
      this.capitalOne = "";
      this.capitalTwo = "";
      this.stockOne = "";
      this.stockTwo = "";
      this.totalOne = "";
      this.totalTwo = "";
      this.netOne = "";
      this.netTwo = "";
    },
    allchange(i) {
      this.displayRecord(
        {
          pageIndex: i,
          pageSize: pubParam.page.pageSize,
          ...this.queryIF()
        },
        this.allData,
        this.allpage
      );
    },
    hadchange(i) {
      this.displayRecord(
        {
          pageIndex: i,
          pageSize: pubParam.page.pageSize,
          ...this.queryIF(),
          memberStatus: 1
        },
        this.hadData,
        this.pageHad
      );
    },
    havingchange(i) {
      this.displayRecord(
        {
          pageIndex: i,
          pageSize: pubParam.page.pageSize,
          ...this.queryIF(),
          memberStatus: 5
        },
        this.havingData,
        this.pageHaving
      );
    },
    frozechange(i) {
      this.displayRecord(
        {
          pageIndex: i,
          pageSize: pubParam.page.pageSize,
          ...this.queryIF(),
          memberStatus: 3
        },
        this.frozeData,
        this.pageFroze
      );
    },
    exitchange(i) {
      this.displayRecord(
        {
          pageIndex: i,
          pageSize: pubParam.page.pageSize,
          ...this.queryIF(),
          memberStatus: 4
        },
        this.exitData,
        this.pageExit
      );
    }
  },
  components: { Table }
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.container {
  background: #fff;
  padding: 30px;
  height: 100%;
  .input_style,
  .el-select {
    width: calc(100% - 180px);
  }
  .input_split {
    width: calc(67% - 180px);
  }
  .el-range-editor.el-input__inner {
    width: calc(100% - 180px);
  }
}
</style>