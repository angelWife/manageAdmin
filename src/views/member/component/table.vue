<template>
    <el-table
      :data="approData"
      style="width: 100%">
      <el-table-column
        prop="code"
        label="会员代码"
       >
      </el-table-column>
      <el-table-column
        prop="memberType"
        label="会员类型"
        >
      </el-table-column>
      <el-table-column
        prop="mechType"
        label="结构类型"
        >
      </el-table-column>
      <el-table-column
        prop="mechName"
        label="机构名称"
        >
      </el-table-column>
      <el-table-column
        prop="allCode"
        label="社会统一编码">
      </el-table-column>
      <el-table-column
        prop="compType"
        label="公司性质"
        width="150">
      </el-table-column>
      <el-table-column
        prop="creaateDate"
        label="成立日期"
        width="100">
      </el-table-column>
       <el-table-column
        prop="boolList"
        label="是否上市"
        width="100">
      </el-table-column>
       <el-table-column
        prop="memberStatus"
        label="会员状态"
        width="100">
      </el-table-column>
       <el-table-column
        prop="joinDate"
        label="入会时间"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
            <el-button @click="handleAct(scope.row)" type="primary" size="small">管理</el-button>
        </template>
        </el-table-column>
     </el-table>
</template>
<script>
    export default {
      props: {
          approData:{ type: Array, required: true },
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
