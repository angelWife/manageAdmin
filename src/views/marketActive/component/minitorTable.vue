<template>
  <div>
    <div>
      <el-table :data="tableData" style="width: 100%" class="comTable">
        <el-table-column prop="companyName" label="发送对象" width="300"></el-table-column>
        <el-table-column prop="sendTime" label="发送时间">
          <template slot-scope="scope">{{format(scope.row.sendTime)}}</template>
        </el-table-column>
        <el-table-column prop="sendStatusVal" label="发送状态"></el-table-column>
        <el-table-column prop="act" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="passOut(scope.row.activityEnrolId)">再次发送</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
import { format } from "@/utils/datetime";
export default {
  props: {
    tableData: { type: Array, required: true },
    pageTab: { type: Object, required: true },
    pageChange: { type: Function, required: true }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    format,
    passOut(id) {
      apiOperate("active", "sendListen", { id: id }, "", "发送成功");
    }
  }
};
</script>
<style lang="less">
</style>