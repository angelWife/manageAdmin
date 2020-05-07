<template>
  <div class="container">
    <el-form class="searchForm" ref="form" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="活动名称">
            <el-input v-model="name" placeholder="请输入" class="input_style"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型">
            <el-select v-model="type" placeholder="请选择活动类型">
              <el-option v-for="item in typeList" :key="item.id" :value="item.dictVal"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动时间">
            <el-date-picker
              placeholder="选择时间"
              v-model="time"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @current-change="currentchange"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="活动地点">
            <el-input v-model="place" placeholder="请输入" class="input_style"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审批状态">
            <el-select v-model="appro" placeholder="请选择审批状态">
              <el-option v-for="item in approList" :key="item.key" :value="item.val"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发布状态">
            <el-select v-model="release" placeholder="请选择发布状态">
              <el-option v-for="item in publishList" :key="item.key" :value="item.val"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="创建人">
            <el-input v-model="creater" placeholder="请输入" class="input_style"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary" @click="newBuild()">新建</el-button>
      </el-col>
      <el-col :span="12" class="text_right">
        <el-button type="primary" @click="handleQuery()">查询</el-button>
        <el-button @click="clear">重置</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="activeData"
      style="width: 100%"
      class="comTable"
      ref="com"
      empty-text="没有符合条件的活动"
    >
      <el-table-column prop="name" label="活动名称" max-width="300"></el-table-column>
      <el-table-column prop="activityTypeVal" label="类型"></el-table-column>
      <el-table-column label="活动起止日期" width="200">
        <template
          slot-scope="scope"
        >{{format(scope.row.activityDateStart)}}到{{format(scope.row.activityDateEnd)}}</template>
      </el-table-column>
      <el-table-column prop="address" label="活动地点"></el-table-column>
      <el-table-column label="报名截止日期" width="200">
        <template
          slot-scope="scope"
        >{{format(scope.row.enrolDateStart)}}到{{format(scope.row.enrolDateEnd)}}</template>
      </el-table-column>
      <el-table-column prop="checkStatusVal" label="审核状态"></el-table-column>
      <el-table-column prop="publishStatusVal" label="发布状态"></el-table-column>
      <el-table-column prop="creator" label="创建人"></el-table-column>
      <el-table-column fixed="right" label="操作" width="350">
        <template slot-scope="scope">
          <span v-if="scope.row.publishStatus==1">
            <el-button type="primary" size="small" @click="handlePublish(scope.row.id)">发布</el-button>
            <el-button @click="handleConfirm(scope.row.id)" type="primary" size="small">报名确认</el-button>
            <el-button @click="handleMonitor(scope.row.id)" type="primary" size="small">发送监控</el-button>
            <el-button @click="handleCheck(scope.row.id)" size="small">查看</el-button>
            <el-button @click="handleCopy(scope.row.id)" size="small">复制</el-button>
          </span>
          <span v-if="scope.row.publishStatus==2">
            <el-button type="primary" @click="handleDown(scope.row.id)" size="small">下架</el-button>
            <el-button @click="handleConfirm(scope.row.id)" type="primary" size="small">报名确认</el-button>
            <el-button @click="handleMonitor(scope.row.id)" type="primary" size="small">发送监控</el-button>
            <el-button @click="handleCheck(scope.row)" size="small">查看</el-button>
            <el-button @click="handleCopy(scope.row.id)" size="small">复制</el-button>
          </span>
          <span v-if="scope.row.publishStatus==3">
            <el-button type="primary" @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button @click="handleCheck(scope.row)" size="small">查看</el-button>
            <el-button @click="handleCopy(scope.row.id)" size="small">复制</el-button>
            <el-button size="small">删除</el-button>
          </span>
          <span v-if="scope.row.publishStatus==4">
            <el-button type="primary" size="small" @click="handlePublish(scope.row.id)">发布</el-button>
            <el-button @click="handleConfirm(scope.row.id)" type="primary" size="small">报名确认</el-button>
            <el-button @click="handleMonitor(scope.row.id)" type="primary" size="small">发送监控</el-button>
            <el-button @click="handleCheck(scope.row.id)" size="small">查看</el-button>
            <el-button @click="handleCopy(scope.row.id)" size="small">复制</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="text_center"
      style="margin-top:20px"
      background
      layout="total,prev, pager, next"
      :total="pageTen.total"
      :page-size="pageTen.pageSize"
      :current-page.sync="pageTen.currentPage"
      @current-change="currentchange"
    ></el-pagination>
    <!-- 发送监控 -->
    <el-dialog title="发送监控" :visible.sync="mintorVisible">
      <el-button type="primary" style="margin-bottom:20px" @click="allPass()">全体发送</el-button>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all">
          <minitorTable :tableData="tableAll" :pageTab="pageAll" :pageChange="allChange"></minitorTable>
        </el-tab-pane>
        <el-tab-pane label="已发送" name="pass">
          <minitorTable :tableData="tableAll" :pageTab="pageAll" :pageChange="allChange"></minitorTable>
        </el-tab-pane>
        <el-tab-pane label="已阅读" name="read">
          <minitorTable :tableData="tableAll" :pageTab="pageAll" :pageChange="allChange"></minitorTable>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mintorVisible = false">取 消</el-button>
        <el-button type="primary" @click="mintorVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import {
  warnMES,
  successMES,
  tipMES,
  pageTen,
  pageFive,
  pubParam,
  apiSelect,
  apiMemberStatus,
  apiPublishStatus,
  selectType,
  selectVal,
  pageChange,
  queryResp,
  mapTime,
  getDateTime,
  firstUpperCase
} from "../../utils/common";
import {
  apiAct,
  apiDic,
  backPage,
  apiChose,
  apiOperate
} from "../../utils/commonApi";
import { format } from "../../utils/datetime";
import minitorTable from "./component/minitorTable";

export default {
  data() {
    return {
      bus: new Vue(),
      name: "",
      type: "",
      time: "",
      place: "",
      appro: "",
      release: "",
      creater: "",

      publishList: [],
      approList: [],
      typeList: [],

      activeData: [],
      activeName: "all",
      mintorVisible: false,

      tableAll: [],
      tablePass: [],
      tableRead: [],

      pageTen,
      pageFive,
      pageAll: { ...pageFive },
      pagePass: { ...pageFive },
      pageRead: { ...pageFive },

      pageLocation: 1,
      dialogLocation: 1,

      satusName: "",
      tabName: "All",
      sendStatus: 2, // 分页监控 全部
      minitorList: [],
      activityId: 0
    };
  },
  created() {
    apiChose("publishStatusList", this.publishList);
    apiChose("payOrganList", this.approList);
    apiSelect({ type: 6 }, this.typeList); // 活动类型

    this.displayActive({
      ...pubParam.page
    });
    // 监控状态
    apiDic("monitorStatus", {}).then(reslove => {
      this.minitorList = reslove;
    });
  },
  methods: {
    format,
    handleClick(tab) {
      this.satusName = tab.label;
      this.tabName = firstUpperCase(tab.name);
      this.minitorList.map(v => {
        if (v.val == tab.label) {
          this.sendStatus = v.key;
          this.showMonitor(
            pubParam.pageDialog,
            `table${this.tabName}`,
            `page${this.tabName}`
          );
        }
      });
    },
    newBuild() {
      this.$router.push({ path: "/marketActive/activeAdd" });
    },
    handleEdit(id) {
      this.$router.push({
        path: "/marketActive/activeAdd",
        query: { rowId: Number(id), edit: true }
      });
    },
    handleCheck(id) {
      this.$router.push({
        path: "/marketActive/activeAdd",
        query: { rowId: Number(id), check: true }
      });
    },
    handleDelete(id) {
      apiOperate(
        "active",
        "deleteActive",
        { id: id },
        () => {
          this.handleQuery(this.pageLocation);
        },
        "删除成功"
      );
    },
    handlePublish(id) {
      apiOperate(
        "active",
        "publishActive",
        { id: id },
        () => {
          this.handleQuery();
        },
        "发布成功"
      );
    },
    handleCopy(id) {
      apiOperate(
        "active",
        "copyActive",
        { id: id },
        () => {
          this.handleQuery();
        },
        "复制成功"
      );
    },
    handleDown(id) {
      apiOperate(
        "active",
        "downActive",
        { id: id },
        () => {
          this.handleQuery();
        },
        "下架成功"
      );
    },
    showMonitor(param, tb, pg) {
      apiAct("viewListen", {
        ...param,
        sendStatus: this.sendStatus,
        activityId: this.activityId
      }).then(resolve => {
        this.tableAll = resolve.rows;
        this.pageAll = backPage(resolve);
      });
    },
    handleMonitor(id) {
      this.mintorVisible = true;
      this["activityId"] = id;
      this.showMonitor(pubParam.pageDialog, "tableAll", "pageAll");
    },
    allPass() {
      apiOperate("active", "sendAll", { id: this.activityId }, "", "发送成功");
    },
    handleConfirm(id) {
      this.$router.push({
        path: "/marketActive/confirmSign",
        query: {
          confirmId: Number(id)
        }
      });
    },
    displayActive(params) {
      apiAct("showActive", params).then(resolve => {
        this.activeData = resolve.rows;
        this.pageTen = backPage(resolve);
      });
    },
    queryIF() {
      let query = {
        activityName: this.name,
        type: selectType(this.type, this.typeList),
        activityDateTo: getDateTime(this.time[1]),
        activityDateFrom: getDateTime(this.time[0]),
        address: this.place,
        creator: this.creater,
        checkStatus: selectVal(this.appro, this.approList),
        publishStatus: selectVal(this.release, this.publishList)
      };
      return query;
    },
    handleQuery(pageIn) {
      if (!!pageIn) {
        this.displayActive({
          pageIndex: pageIn,
          pageSize: pubParam.page.pageSize,
          ...this.queryIF()
        });
      } else {
        this.displayActive({
          ...pubParam.page,
          ...this.queryIF()
        });
      }
    },
    clear() {
      this.name = "";
      this.type = "";
      this.time = "";
      this.creater = "";
      this.place = "";
      this.appro = "";
      this.release = "";
    },
    currentchange(i) {
      this.pageLocation = i;
      this.displayActive({
        pageIndex: i,
        pageSize: pubParam.page.pageSize,
        ...this.queryIF()
      });
    },
    allChange(i) {
      this.dialogLocation = i;
      const obj = [
        {
          key: 1,
          name: "Pass"
        },
        {
          key: 2,
          name: "All"
        },
        {
          key: 3,
          name: "Read"
        }
      ];
      let tName = "All";
      obj.map(v => {
        if ((v.key = obj.key)) {
          tName = v.name;
        }
      });
      this.showMonitor(
        {
          pageIndex: i,
          pageSize: pubParam.pageDialog.pageSize
        },
        `table${tName}`,
        `page${tName}`
      );
    }
  },
  components: { minitorTable }
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
  min-height: 100%;
  .input_style,
  .el-date-editor.el-input,
  .el-select {
    width: calc(100% - 180px);
  }
}
</style>