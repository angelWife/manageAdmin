<template>
  <div>
    <div>
      <el-table :data="tableData" style="width: 100%" class="comTable">
        <el-table-column prop="sendObj" label="发送对象"></el-table-column>
        <el-table-column prop="sendDate" label="发送时间" width="160">
          <template slot-scope="scope">{{format(scope.row.sendDate,true)}}</template>
        </el-table-column>
        <el-table-column prop="sendStatusVal" label="发送状态" width="100"></el-table-column>
        <el-table-column prop="act" fixed="right" label="操作" width="100" v-if="!!apiMinitor">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="passOut(scope.row.id)">再次发送</el-button>
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
import { pubParam } from "@/utils/common";
import { format } from "@/utils/datetime";
export default {
  props: {
    tableData: { type: Array, required: true },
    pageTab: { type: Object, required: true },
    pageChange: { type: Function, required: true },
    showMintor: { type: Function, required: true },
    apiMinitor: { type: Object, required: false }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    format,
    passOut(id) {
      apiOperate(
        this.apiMinitor.name,
        this.apiMinitor.fun,
        { id: id },
        () => {
          this.showMintor(pubParam.pageDialog);
        },
        "发送成功"
      );
    }
  }
};
</script>
<style lang="less">
</style>