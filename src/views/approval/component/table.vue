<template>
  <el-table :data="approData" style="width: 100%" empty-text="没有符合条件的流程">
    <el-table-column min-width='120' align="center" prop="serialNumber" label="业务流水"></el-table-column>
    <el-table-column label="机构类型" align="center">
      <template slot-scope="props">
         <span>{{ props.row.institutionTypeVal || '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="机构名称">
      <template slot-scope="props">
         <span>{{ props.row.companyName || '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="社会统一编码">
      <template slot-scope="props">
         <span>{{ props.row.creditId || '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="type" align="center" label="审批业务" width="150" :formatter="setType"></el-table-column>
    <el-table-column prop="status" align="center" label="状态" width="100" :formatter="setStatus"></el-table-column>
    <el-table-column fixed="right" label="操作" width="160">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.isAccess && scope.row.status ==1"
          @click="handleAct(scope.row)"
          type="primary"
          size="small"
        >处理</el-button>
        <el-button
          @click="handleCheck(scope.row)"
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
    return {
        handelName:''
    };
  },
  created() {
   
  },
  methods: {
    handleAct(row) {//处理
      this.$router.push({
        path: "/approval/memberDetails",
      });
      
      let _data = { type: "hasOper",number:row.serialNumber,dataType:row.type,taskId :row.taskId,companyId:row.companyId,title:this.getTitle(row.type)}
      this.$store.commit('setPassVal',_data)
      this.$store.commit('setProcessIde',row.processInstanceId)
    },
    handleCheck(row) {//查看
       
      this.$router.push({
        path: "/approval/memberDetails",
      });
      
      let _data = { type: "info",number:row.serialNumber,dataType:row.type,taskId :row.taskId,companyId:row.companyId,title:this.getTitle(row.type)}
      this.$store.commit('setPassVal',_data)
      this.$store.commit('setProcessIde',row.processInstanceId)
    },
    setType(type,column, cellValue, index){
      let key = cellValue;
      let name=""
      this.typeVO.filter(v=>{
        if(v.key==key){
          name = v.val
        }
      })
      return name;
    },
    getTitle(val){
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
