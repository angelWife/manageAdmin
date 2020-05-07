<template>
  <el-table :data="approData" style="width: 100%" empty-text="没有符合条件的流程">
    <el-table-column prop="serialNumber" label="业务流水"></el-table-column>
    <el-table-column prop="type" label="机构类型" :formatter="setType"></el-table-column>
    <el-table-column prop="name" label="机构名称"></el-table-column>
    <el-table-column prop="code" label="社会统一编码"></el-table-column>
    <el-table-column prop="appro" label="审批业务" width="150"></el-table-column>
    <el-table-column prop="status" label="状态" width="100" :formatter="setStatus"></el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.isAccess"
          @click="handleAct(scope.row)"
          type="text"
          size="small"
        >处理</el-button>
        <el-button
          @click="handleCheck(scope.row)"
          type="text"
          size="small"
        >查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    approData: { type: Array, required: true },
    statusVO: { type: Array, required: true },
    typeVO: { type: Array, required: true }
  },
  data() {
    return {};
  },
  created() {
   
  },
  methods: {
    handleAct(row) {

      this.$router.push({
        path: "/approval/memberDetails",
      });
       debugger
      let _data = { type: "hasOper",number:row.serialNumber,dataType:row.type,taskId :row.taskId,companyId:row.companyId}
      this.$store.commit('setPassVal',_data)
      this.$store.commit('setProcessIde',row.processInstanceId)
    },
    handleCheck(row) {
      this.$router.push({
        path: "/approval/memberDetails",
      });
      debugger
      let _data = { type: "info",number:row.serialNumber,dataType:row.type,taskId :row.taskId,companyId:row.companyId}
      this.$store.commit('setPassVal',_data)
       this.$store.commit('setProcessIde',row.processInstanceId)
    },
    setType(){
      let val = arguments[2];
      let name=""
      this.typeVO.filter(v=>{
        if(v.key==val){
          name = v.val
        }
      })
      return name;
    },
    setStatus(){
      let val = arguments[2];
      let name=""
      this.statusVO.filter(v=>{
        if(v.key==val){
          name = v.val
        }
      })
      return name;
    },
  }
};
</script>
