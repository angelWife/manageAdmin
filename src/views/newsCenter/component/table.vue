<template>
    <el-table :data="tableData" style="width: 100%" class="comTable">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleAct(scope.row)" type="primary" size="small">管理</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>
<script>
    export default {
      props: {
          tableData:{ type: Array, required: true },
      },
      data() {
        return {
        }
      },
      created(){
      },
      methods: {
        handleClick(row) {
            console.log(row.actType);
        },
        handleAct(row){
          // this.$router.push('/approval/memberDetails')
        }
      },
    }
  </script>
