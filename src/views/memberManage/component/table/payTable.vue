<template>
  <div>
    <el-table class="mytable" :data="monitorData" style="width: 100%">
      <el-table-column prop="businessFlow" label="业务流水" align="center"></el-table-column>
      <el-table-column prop="institutionTypeVal" label="机构类型" align="center"></el-table-column>
      <el-table-column prop="institutionName" label="会员机构" align="center"></el-table-column>
      <el-table-column prop="fund" label="金额" align="center" width="300px"></el-table-column>
      <el-table-column prop="flagPayedVal" label="状态" align="center"></el-table-column>
      <el-table-column prop="invoiceStatusVal" label="发票寄送状态" align="center"></el-table-column>
      <el-table-column label="操作" min-width="120px">
        <template>
          <el-button type="primary" size="small">缴费通知</el-button>
          <el-button size="small">查看</el-button>
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
export default {
  props: {
    monitorData: { type: Array, required: true, default: () => [] },
    pageTab: { type: Object, required: true },
    pageChange: { type: Function, required: true }
  },  
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
// .mytable{
//     min-height: ;
// }
</style>
