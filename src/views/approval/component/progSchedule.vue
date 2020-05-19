<template>
  <div class="container">
    <div class="table_title">
      流程进度
      <router-link to="flowChart" v-if="type=='hasOper'" class="seePic">查看流程图</router-link>
    </div>
    <el-table
      :data="proData"
      style="width: 100%;padding:30px"
      :header-row-style="ttHeadStyle"
      :header-cell-style="thStyle"
    >
      <el-table-column prop="name" label="审批节点" width="100" align="center"></el-table-column>
      <el-table-column prop="ideal" label="处理意见" align="center"></el-table-column>
      <el-table-column prop="operator" label="操作人" width="100" align="center"></el-table-column>
      <el-table-column prop="createDate" label="处理时间" width="200" align="center"></el-table-column>
      <el-table-column prop="explain" label="说明" width="400" align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "proSchedule",
  props: { proData: { type: Array, required: true } },
  data() {
    return {
      ttHeadStyle: { "background-color": "#fafafa" },
      thStyle: { border: 0 },
      type:''
    };
  },
  created() {
    this.$nextTick(()=>{
    //   this.getProcessList()
    })
    this.type= this.$store.state.manage.passVal.type
  },
  methods: {
    
  },
};
</script>
<style lang="less" scoped>
.container {
  background: #fff;
  .table_title {
    font-size: 16px;
    font-weight: 600;
    padding: 15px 30px;
    border-bottom: 1px solid #eee;
    .seePic {
      float: right;
      font-weight: normal;
      font-size: 14px;
      color: #409eff;
    }
  }
}
.el-table td {
  border-bottom: 1px solid #fff;
}
</style>