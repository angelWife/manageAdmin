<template>
  <div>
    <el-table :data="tableData" style="width: 100%" class="comTable">
      <el-table-column prop="companyName" label="机构名称" width="300"></el-table-column>
      <el-table-column prop="peopleName" label="姓名"></el-table-column>
      <el-table-column prop="duty" label="职务"></el-table-column>
      <el-table-column prop="mobileNum" label="手机"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="enrolStatusVal" label="报名状态"></el-table-column>
      <el-table-column prop="act" fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <span v-if="scope.row.enrolStatus==1">
            <el-button type="primary" @click="handleConfirm(scope.row)" size="small">确认</el-button>
            <el-button type="primary" @click="handleExit(scope.row)" size="small">退出</el-button>
          </span>
          <span v-if="scope.row.enrolStatus==2">
            <el-button @click="handleConfirm(scope.row)" type="primary" size="small">重新确认</el-button>
            <el-button type="primary" @click="handleInform(scope.row)" size="small">再次通知</el-button>
          </span>
          <span v-if="scope.row.enrolStatus==3">
            <el-button @click="handleExit(scope.row)" type="primary" size="small">强制退出</el-button>
            <el-button type="primary" @click="handleInform(scope.row)" size="small">再次通知</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="margin-top:20px"
      class="text_center"
      layout="total,prev, pager, next"
      :total="pageTab.total"
      :page-size="pageTab.pageSize"
      :current-page.sync="pageTab.currentPage"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>
<script>
import { apiOperate } from "@/utils/commonApi";

export default {
  props: {
    tableData: { type: Array, required: true, default: [] },
    pageTab: { type: Object, required: true },
    pageChange: { type: Function, required: true },
    handleQuery: { type: Function, required: true },
    activityId: { type: Number, required: true }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleClick(row) {
      console.log(row.actType);
    },
    handleAct(row) {
      // this.$router.push('/approval/memberDetails')
    },
    handleConfirm(row) {
      apiOperate(
        "active",
        "confrimActive",
        {
          activityEnrolPeopleId: row.id
        },
        () => {
          this.handleQuery(this.pageTab.currentPage);
        },
        "确认成功"
      );
    },
    handleExit(row) {
      apiOperate(
        "active",
        "quitActive",
        {
          activityEnrolPeopleId: row.id
        },
        () => {
          this.handleQuery(this.pageTab.currentPage);
        },
        "退出成功"
      );
    },
    handleInform: function (row) {

    }
  }
};
</script>
<style lang="less">
</style>
