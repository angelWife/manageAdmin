<template>
  <div>
    <el-table :data="billData" style="width: 100%" empty-text="没有符合条件的发票寄送">
      <el-table-column prop="businessFlow" label="业务流水"></el-table-column>
      <el-table-column prop="name" label="名目"></el-table-column>
      <el-table-column prop="companyName" label="机构名称"></el-table-column>
      <el-table-column prop="fund" label="金额"></el-table-column>
      <el-table-column prop="invoiceType" label="发票类型"></el-table-column>
      <el-table-column prop="mobileNum" label="收件人手机"></el-table-column>
      <el-table-column prop="address" label="收件地址" width="250"></el-table-column>
      <el-table-column prop="sendStatusVal" label="状态"></el-table-column>
      <el-table-column prop="act" label="操作" min-width="120px">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.sendStatus == 2"
            @click="handleClick(scope.row)"
            type="primary"
            size="small"
          >已寄送</el-button>
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
import { setSentStatus } from "@/http/moudules/member"
export default {
  props: {
    billData: { type: Array, required: true, default: () => [] },
    pageTab: { type: Object, required: true },
    pageChange: { type: Function, required: true }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleClick(row){
         setSentStatus({orgId:row.orgId}).then(rep=>{
              if(rep && rep.code=="200"){
                this.pageChange(this.pageTab.currentPag);
              }
         })
    }
  }
};
</script>
