<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <div>
          <span>名目：</span>
          <el-input v-model="query.name" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>机构名称：</span>
          <el-input v-model="query.companyName" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>发票类型：</span>
          <el-select v-model="query.invoiceType" placeholder="请选择">
            <el-option
              v-for="item in billList"
              :key="item.id"
              :value="item.dictKey"
              :label="item.dictVal"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div>
          <span>税号：</span>
          <el-input v-model="query.creditId" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>公司抬头：</span>
          <el-input v-model="query.companyTitle" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary">导出</el-button>
        <el-button type="primary">导入</el-button>
      </el-col>
      <el-col :span="12" class="text_right">
        <el-button type="primary" @click="handleQuery()">查询</el-button>
        <el-button @click="clear()">重置</el-button>
      </el-col>
    </el-row>
    <div calss></div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <billTable :billData="billAll" :pageTab="pageAll" :pageChange="allChange"></billTable>
      </el-tab-pane>
      <el-tab-pane label="待寄送" name="wait">
        <billTable :billData="billAll" :pageTab="pageAll" :pageChange="allChange"></billTable>
      </el-tab-pane>
      <el-tab-pane label="已寄送" name="pass">
        <billTable :billData="billAll" :pageTab="pageAll" :pageChange="allChange"></billTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { pageTen, pubParam, apiSelect } from "../../utils/common";
import { apiShow, apiDic, backPage } from "../../utils/commonApi";
import billTable from "./component/table/billTable";
export default {
  data() {
    return {
      query: {
        name: "",
        companyName: "",
        invoiceType: "",
        companyTitle: "",
        creditId: ""
      },
      pageAll: {},
      billList: [],
      activeName: "all",
      sendStatus: "",
      billAll: [],
      billStatus: [],
      pageLocation: 1
    };
  },
  created() {
    apiSelect({ type: 7 }, this.billList); // 发票类型
    apiDic("billStatus", {}).then(resolve => {
      this.billStatus = resolve;
    });

    this.showBill(pubParam.page);
  },
  methods: {
    handleClick(tab) {
      this.billStatus.map(v => {
        if (v.val == tab.label) {
          this.sendStatus = v.key ? v.key : "";
          this.showBill({
            ...pubParam.page
          });
        }
      });
    },
    showBill(param) {
      apiShow("member", "queryInvoice", {
        sendStatus: this.sendStatus,
        ...this.query,
        ...param
      }).then(resolve => {
        this.billAll = resolve.rows;
        this.pageAll = backPage(resolve);
      });
    },
    clear() {
      this.pageLocation = 1;
      this.query = {
        name: "",
        companyName: "",
        invoiceType: "",
        companyTitle: "",
        creditId: ""
      };
    },
    handleQuery(pageLocation) {
      const pageParam = hasPage(pageLocation);
      this.showBill({
        ...pageParam
      });
    },
    allChange(i) {
      this.pageLocation = i;
      this.showBill({
        pageIndex: this.pageLocation,
        pageSize: pubParam.page.pageSize
      });
    }
  },
  components: { billTable }
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
}
</style>