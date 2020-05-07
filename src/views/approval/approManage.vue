<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <div>
          <span>业务流水：</span>
          <el-input v-model="searchObj.busFlow" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>审批业务：</span>
          <el-select v-model="searchObj.approValue" placeholder="请选择">
            <el-option v-for="appro in approList" :key="appro.id" :value="appro.value"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>机构类型：</span>
          <el-select v-model="searchObj.typeValue" placeholder="请选择">
            <el-option v-for="item in typeList" :key="item.id" :value="item.value"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div>
          <span>机构名称：</span>
          <el-input v-model="searchObj.orgName" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>社会统一信用编码：</span>
          <el-input v-model="searchObj.scoialCode" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>审批人：</span>
          <el-input v-model="searchObj.approver" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
    </el-row>
    <div calss="btn_content" style="text-align:right">
      <el-button type="primary" @click="initPageList">查询</el-button>
      <el-button @click="clear">重置</el-button>
    </div>
    <el-tabs v-model="params.status" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item,ind) in tabs" :key="ind" :label="item.val" :name="item.name">
        <Table :approData="approData" :statusVO="statusVO" :typeVO="typeVO"></Table>
      </el-tab-pane>
      <!-- <el-tab-pane label="待处理" name="wait">
        <Table :approData="approData"></Table>
      </el-tab-pane>
      <el-tab-pane label="已通过" name="pass">
        <Table :approData="approData"></Table>
      </el-tab-pane>
      <el-tab-pane label="已驳回" name="reject">
        <Table :approData="approData"></Table>
      </el-tab-pane>
      <el-tab-pane label="已终止" name="stop">
        <Table :approData="approData"></Table>
      </el-tab-pane> -->
    </el-tabs>
    <el-pagination
      background
      style="margin-top:20px"
      class="text_center"
      layout="total,prev, pager, next"
      :total="pageTotal"
      :page-size="params.pageSize"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>
<script>
import Table from "./component/table";
export default {
  data() {
    return {
      searchObj:{
        companyId: null,
        busFlow: null,
        approValue: null,
        typeValue: null,
        orgName: null,
        scoialCode: null,
        approver: null,
      },
      params:{
        status:null,
        pageSize :10,
        pageIndex :1
      },
      pageTotal:1,
      pageLocation:1,
      approList: [
        {
          id: 1,
          value: "会员认定"
        },
        {
          id: 2,
          value: "退回申请"
        }
      ],
      typeList: [
        {
          id: 1,
          value: "保险集团"
        }
      ],
      tabs:[],
      approData: [],
      statusVO:[],
      typeVO:[]
    };
  },
  created() {
    // this.approData = this.allData;
    let self = this
    this.$api.dict.workStatus().then(res=>{
      if(res.success){
        self.statusVO = res.data
      }
    })
    this.$api.dict.workTypes().then(res=>{
      if(res.success){
        self.typeVO = res.data
        console.log(res.data);
      }
    })
    this.$api.dict.workStatus().then(res=>{
      if(res.success){
        self.tabs = res.data
        self.tabs.filter(v=>{
            v.name=v.key+'';
        })
        this.params.status = res.data[0].name
        self.initPageList()
      }
    })
    
  },
  methods: {
    initPageList(){
      let self = this
      let params = this.params
      this.$api.manage.getManageList(params).then(res=>{
        if(res.success){
          self.pageTotal = res.data.total
          self.approData = res.data.rows
        }
      })
    },
    handleClick(tab) {
      this.params.status = tab.name
      this.initPageList()
    },
    currentChange(i) {
      this.currentPage = i;
      this.params.pageIndex=i;
      this.initPageList()
    },
    clear(){}
  },
  components: { Table }
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.container {
  background: #fff;
  padding: 30px;
  min-height: 100%;
  .input_style,
  .el-select {
    width: calc(100% - 180px);
  }
}
</style>