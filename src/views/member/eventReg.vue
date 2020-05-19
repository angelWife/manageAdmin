<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <div>
          <span>活动名称：</span>
          <el-input v-model="query.activityName" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>类型：</span>
          <el-select v-model="query.activityType" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :label="item.dictVal"
              :value="item.dictKey"
              :key="item.dictKey"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>活动起止日期：</span>

          <el-date-picker
            v-model="query.activityDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div>
          <span>活动地点：</span>
          <el-input v-model="query.address" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>报名截止日期：</span>
          <el-date-picker
            v-model="query.enrolDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>报名状态：</span>
          <el-select v-model="query.enrolStatus" placeholder="请选择">
            <el-option
              v-for="item in erollList"
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
    <el-table :data="tableData" style="width: 100%;margin-top:20px" empty-text="没有符合条件的活动报名">
      <el-table-column prop="activityName" label="活动名称" max-width="350">
        <template slot-scope="scope">
          <span class="tt-name" @click="getMore(scope.row.activityId)">{{scope.row.activityName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activityTypeVal" label="类型"></el-table-column>
      <el-table-column prop="dateTime" label="活动起止日期" width="200">
        <template
          slot-scope="scope"
        >{{format(scope.row.activityDateStart)}}到{{format(scope.row.activityDateEnd)}}</template>
      </el-table-column>
      <el-table-column prop="address" label="活动地点"></el-table-column>
      <el-table-column prop="register" label="报名截止日期">
        <template slot-scope="scope">{{format(scope.row.activityEnrolDateEnd)}}</template>
      </el-table-column>
      <el-table-column prop="activivyEnrolStatusVal" label="活动可报名状态"></el-table-column>
      <el-table-column prop="enrolStatusVal" label="报名状态"></el-table-column>
      <el-table-column prop="act" label="操作" min-width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.activivyEnrolStatus==1 && scope.row.enrolStatus == 4">
            <el-button @click="handleReg(scope.row)" type="primary" size="small">报名</el-button>
          </span>
          <span v-if="scope.row.activivyEnrolStatus==1 && scope.row.enrolStatus == 3">
            <el-button @click="handleReg(scope.row)" type="primary" size="small">修改报名</el-button>
            <el-button @click="handleCheck(scope.row)" size="small">查看</el-button>
          </span>
          <span v-if="scope.row.activivyEnrolStatus==2 && scope.row.enrolStatus == 3">
            <el-button @click="handleCheck(scope.row)" size="small">查看</el-button>
          </span>
          <span v-if="scope.row.activivyEnrolStatus==2 && scope.row.enrolStatus == 4">-</span>
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
        activityName: "",
        activityType: "",
        activityDate: [],
        address: "",
        enrolDate: [],
        enrolStatus: ""
      },
      typeList: [],
      erollList: [],
      tableData: [],
      pageAll: { ...pageTen },
      pageLocation: 1 // 页数
    };
  },
  created() {
    apiSelect({ type: 6 }, this.typeList);
    apiDic("enrollType", {}).then(reslove => {
      this.erollList = reslove;
    });

    this.displayQuery();
  },
  methods: {
    format,
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
        activityName: this.query.activityName,
        activityType: this.query.activityType,
        activityDateFrom:   this.query.activityDate && this.query.activityDate.length > 0 ? this.query.activityDate[0] : '' ,
        activityDateTo:this.query.activityDate &&  this.query.activityDate.length > 0 ? this.query.activityDate[1] : '' , 
        address: this.query.address,
        enrolDateFrom:this.query.enrolDate && this.query.enrolDate.length > 0 ? this.query.enrolDate[0] : '' ,
        enrolDateTo: this.query.enrolDate && this.query.enrolDate.length > 0 ? this.query.enrolDate[1] : '' ,
        enrolStatus: this.query.enrolStatus
      };
      apiShow("member", "activityTable", { ...param, ...query }).then(
        reslove => {
          this.tableData = reslove.rows;
          this.pageAll = backPage(reslove);
        }
      );
    },
    clear() {
      this.pageLocation = 1;
      this.query = {
        activityName: "",
        activityType: "",
        activityDate: [],
        address: "",
        enrolDate: [],
        enrolStatus: ""
      };
    },
    currentChange(i) {
      this.pageLocation = i;
      this.showTable({
        pageIndex: i,
        pageSize: pubParam.page.pageSize
      });
    },

    handleReg(row) {
      this.$router.push("/member/registerInfo");
      sessionStorage.setItem("activityInfo", JSON.stringify(row));
    },
    handleCheck(row) {
      this.$router.push("/member/registerInfo?actType=check");
      sessionStorage.setItem("activityInfo", JSON.stringify(row));
    },
    getMore(id) {
      console.log(id);
      this.$router.push({ path: "/member/eventPreview", query: { rowId: id } });
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