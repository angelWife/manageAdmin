<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <div>
          <span>消息标题：</span>
          <el-input v-model="query.title" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>消息内容：</span>
          <el-input v-model="query.conent" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>发送时间：</span>
          <el-date-picker
            v-model="query.dateTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div>
          <span>状态：</span>
          <el-select v-model="query.readStatus" placeholder="请选择">
            <el-option
              v-for="item in stateList"
              :label="item.val"
              :value="item.key"
              :key="item.key"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <div calss="btn_content" style="text-align:right">
      <el-button type="primary" @click="handleQuery()">查询</el-button>
      <el-button @click="clear()">重置</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" empty-text="没有符合条件的系统消息">
      <el-table-column prop="title" label="消息标题"></el-table-column>
      <el-table-column prop="content" label="消息内容" width="250px" class-name="cotent"></el-table-column>
      <el-table-column prop="sendTime" label="发送时间">
        <template slot-scope="scope">{{format(scope.row.sendTime,true)}}</template>
      </el-table-column>
      <el-table-column prop="readStatusVal" label="状态"></el-table-column>
      <el-table-column prop="act" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleCheck(scope.row)" type="primary" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="margin-top:20px"
      class="text_center"
      layout="total,prev, pager, next"
      :total="pageAll.total"
      :page-size="pageAll.pageSize"
      :current-page.sync="pageAll.currentPage"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>
<script>
import {
  apiDic,
  apiShow,
  apiOperate,
  backPage,
  hasPage
} from "../../utils/commonApi";
import { pageTen, pubParam, apiSelect } from "../../utils/common";
import { format } from "../../utils/datetime";

export default {
  data() {
    return {
      query: {
        title: "",
        conent: "",
        dateTime: "",
        readStatus: ""
      },

      stateList: [],
      tableData: [],
      pageAll: { ...pageTen },
      pageLocation: 1 // 页数
    };
  },
  created() {
    apiDic("readType", {}).then(reslove => {
      this.stateList = reslove;
    });
    this.displayQuery();
  },
  methods: {
    format,
    handleCheck(row) {
      this.$router.push({
        path: "/member/SysContent",
        query: { rowId: row.messageSystemSendId }
      });
    },
    handleQuery() {
      this.pageLocation = 1;
      this.displayQuery();
    },
    displayQuery(page) {
      const pageParam = hasPage(page);
      this.showTable(pageParam);
    },
    showTable(param) {
      const query = {
        title: this.query.title,
        conent: this.query.conent,
        sendTimeFrom: this.query.dateTime[0],
        sendTimeTo: this.query.dateTime[1],
        readStatus: this.query.readStatus
      };
      apiShow("member", "systemTable", { ...param, ...query }).then(reslove => {
        this.tableData = reslove.rows;
        this.pageAll = backPage(reslove);
      });
    },
    clear() {
      this.pageLocation = 1;
      this.query = {
        title: "",
        conent: "",
        dateTime: "",
        readStatus: ""
      };
    },
    currentChange(i) {
      this.pageLocation = i;
      this.showTable({
        pageIndex: i,
        pageSize: pubParam.page.pageSize
      });
    }
  },
  components: {}
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
  .tt-name {
    color: #409eff;
    cursor: pointer;
  }
  .tt-name:hover {
    color: #4092e7;
    text-decoration: underline;
  }
}
</style>