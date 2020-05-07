<template>
  <div>
    <el-table class="mytable" :data="monitorData" style="width: 100%">
      
      <el-table-column prop="businessFlow" label="业务流水" align="center"></el-table-column>
      <el-table-column prop="institutionTypeVal" label="机构类型" align="center"></el-table-column>
      <el-table-column prop="institutionName" label="机构名称" align="center" width="300px"></el-table-column>
      <el-table-column prop="reviewStatusVal" label="状态" align="center"></el-table-column>
      <el-table-column prop="flagModify" label="是否有变更" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.flagModify==1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100px">
        <template>
          <el-button type="primary" size="small">年审通知</el-button>
          <el-button size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="text-align:center;margin-top:2px"
      background
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
    monitorData: { type: Array, required: true },
    pageTab: { type: Object, required: true },
    pageChange: { type: Function, required: true }
  },
  data() {
    return {};
  },
  methods:{
    currentchange(i) {
      // this.pageLocation = i;
      // this.displayView({
      //   pageIndex: i,
      //   pageSize: pubParam.page.pageSize,
      //   ...this.queryIF()
      // });
    }
  }
};
</script>
<style lang="less" scoped>
// .mytable{
//     min-height: ;
// }
</style>
