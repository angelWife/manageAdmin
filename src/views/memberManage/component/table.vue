<template>
  <div>
    <div style="min-height:500px">
      <el-table empty-text="没有符合条件的会员" :data="approData" style="width: 100%">
        <el-table-column prop="memberCode" label="会员代码"></el-table-column>
        <el-table-column prop="memberTypeVal" label="会员类型"></el-table-column>
        <el-table-column prop="institutionTypeVal" label="机构类型"></el-table-column>
        <el-table-column prop="companyName" label="机构名称"></el-table-column>
        <el-table-column prop="creditCode" label="社会统一编码"></el-table-column>
        <el-table-column prop="companyTypeVal" label="公司性质" width="150"></el-table-column>
        <el-table-column prop="buildDate" label="成立日期" width="100"></el-table-column>
        <el-table-column prop="flagListed" label="是否上市" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.flagListed == 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="memberStatusVal" label="会员状态" width="100"></el-table-column>
        <el-table-column prop="dateJoin" label="入会时间" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleAct(scope.row)" type="primary" size="small">管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  </div>
</template>
<script>
export default {
  props: {
    approData: { type: Array, required: true },
    pageTen: { type: Object, required: true },
    currentchange: {
      type: Function,
      default: i => {
        console.log("default", i);
      }
    }
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
      this.$router.push({
        path: "/member/archivesDetail",
        query: { companyId: row.companyId }
        // query: { companyId: row.id }
      });
      sessionStorage.setItem("compid", row.companyId);
      // sessionStorage.setItem("compid", row.id);
    }
  }
};
</script>
