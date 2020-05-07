<template>
  <div>
    <el-table class="mytable" :data="monitorData" style="width: 100%">
      <el-table-column prop="busFlow" label="业务流水" align="center"></el-table-column>
      <el-table-column prop="orgType" label="会员机构" align="center"></el-table-column>
      <el-table-column prop="name" label="金额" align="center" width="300px"></el-table-column>
      <el-table-column prop="state" label="状态" align="center"></el-table-column>
      <el-table-column prop="isChange" label="发票寄送状态" align="center"></el-table-column>
      <el-table-column label="操作" min-width="100px">
        <template>
          <el-button type="primary" size="small">缴费通知</el-button>
          <el-button size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    monitorData: { type: Array, required: false }
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
