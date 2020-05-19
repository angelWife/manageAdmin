<template>
  <div class="inner">
    <el-row class="showData">
      <el-col :span="8">
        <div class="grid-content bd-r">
          <div class="title">已通过</div>
          <div class="number">{{total.ackedNum}}/{{total.ackedNum}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bd-r">
          <div class="title">审批中</div>
          <div class="number">{{total.ackIngNum}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="title">已驳回/已中止</div>
          <div class="number">{{total.quitNum}}</div>
        </div>
      </el-col>
    </el-row>
    <div class="mintorDesc">
      <el-row>
        <el-col :span="8">
          <div>
            <span>机构名称：</span>
            <el-input placeholder="请输入" v-model="query.institutionName" class="input_style"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>机构类型：</span>
            <el-select v-model="query.institutionType" placeholder="请选择">
              <el-option
                v-for="item in orgList"
                :key="item.id"
                :value="item.dictKey"
                :label="item.dictVal"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="btn_content">
        <el-col :span="12">
          <el-button type="primary">导出</el-button>
          <el-button type="primary">全体年审通知</el-button>
        </el-col>
        <el-col :span="12" class="text_right">
          <el-button type="primary" @click="handleQuery()">查询</el-button>
          <el-button @click="clear">重置</el-button>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all">
          <basicTable :monitorData="monitorAll" :pageTab="pageAll" :pageChange="allChange"></basicTable>
        </el-tab-pane>
        <el-tab-pane label="会员确认" name="confirm">
          <basicTable :monitorData="monitorAll" :pageTab="pageAll" :pageChange="allChange"></basicTable>
        </el-tab-pane>
        <el-tab-pane label="初审" name="frist">
          <basicTable :monitorData="monitorAll" :pageTab="pageAll" :pageChange="allChange"></basicTable>
        </el-tab-pane>
        <el-tab-pane label="复审" name="review">
          <basicTable :monitorData="monitorAll" :pageTab="pageAll" :pageChange="allChange"></basicTable>
        </el-tab-pane>
        <el-tab-pane label="总监审批" name="chief">
          <basicTable :monitorData="monitorAll" :pageTab="pageAll" :pageChange="allChange"></basicTable>
        </el-tab-pane>
        <el-tab-pane label="分管领导审批" name="assign">
          <basicTable :monitorData="monitorAll" :pageTab="pageAll" :pageChange="allChange"></basicTable>
        </el-tab-pane>
        <el-tab-pane label="会长审批" name="president">
          <basicTable :monitorData="monitorAll" :pageTab="pageAll" :pageChange="allChange"></basicTable>
        </el-tab-pane>
        <el-tab-pane label="已通过" name="pass">
          <basicTable :monitorData="monitorAll" :pageTab="pageAll" :pageChange="allChange"></basicTable>
        </el-tab-pane>
        <el-tab-pane label="已驳回" name="reject">
          <basicTable :monitorData="monitorAll" :pageTab="pageAll" :pageChange="allChange"></basicTable>
        </el-tab-pane>
        <el-tab-pane label="已中止" name="stop">
          <basicTable :monitorData="monitorAll" :pageTab="pageAll" :pageChange="allChange"></basicTable>
        </el-tab-pane>
      </el-tabs>
       
    </div>
  </div>
</template>
<script>
import { apiSelect, pubParam, pageTen } from "@/utils/common";
import { apiShow, apiDic, backPage, hasPage } from "@/utils/commonApi";
import basicTable from "./table/basicTable";

export default {
  props: {
    id: { type: Number, required: true }
  },
  data() {
    return {
      activeName: "all",
      total: {
        ackedNum: "",
        totalNum: "",
        ackIngNum: "",
        quitNum: ""
      },
      query: {
        name: "",
        orgType: ""
      },

      orgList: [],
      monitorAll: [],
      pageAll: { ...pageTen },
      memberList: [],
      memberStatus: "",
      pageLoacation: 1
    };
  },
  created() {
    apiSelect({ type: 1 }, this.orgList); // 机构类型
    apiDic("memberStatus", {}).then(resolve => {
      this.memberList = resolve;
    });
    apiShow("member", "showTotal", {
      id: this.id,
      type: 2
    }).then(resolve => {
      this.total = resolve;
    });
    this.showBasic(pubParam.page);
  },
  methods: {
    showBasic(param) {
      apiShow("member", "showRep", {
        ...this.query,
        bizId: this.id,
        reviewStatus: this.memberStatus,
        ...param
      }).then(resolve => {
        this.monitorAll = resolve.rows;
        this.pageAll = backPage(resolve);
      });
    },
    handleClick(tab) {
      this.memberList.map(v => {
        if (v.val == tab.label) {
          this.memberStatus = v.key ? v.key : "";
          this.showBasic(pubParam.page);
        }
      });
    },
    clear() {
      this.query = {
        name: "",
        orgType: ""
      };
    },
    handleQuery(param) {
      const pageParam = hasPage(param);
      this.showBasic(pageParam);
    },
    allChange(i) {
      this.showBasic({
        pageIndex: i,
        pageSize: pubParam.page.pageSize
      });
    },
    currentchange(i) {
      this.pageLocation = i;
      this.displayView({
        pageIndex: i,
        pageSize: pubParam.page.pageSize,
        ...this.queryIF()
      });
    }
  },
  components: { basicTable }
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