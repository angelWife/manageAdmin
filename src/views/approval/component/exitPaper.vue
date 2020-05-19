<template>
  <div class="check">
    <div class="table_title">退会申请书</div>
    <div class="formBox">
      <el-form ref="form" :model="sizeForm" label-width="130px">
        <el-row>
          <el-col :span="24">
            <h2>公司基本信息</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称：">{{memberCompanyVo.companyName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码：">{{memberCompanyVo.creditId}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构类型：">{{memberCompanyVo.institutionTypeVal}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名称：">{{memberCompanyVo.companyNameEng}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司类型：">{{memberCompanyVo.companyTypeVal}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立日期：">{{memberCompanyVo.dateBuild}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否上市：">{{memberCompanyVo.flagListedVal}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上市地：">{{memberCompanyVo.listAddress?memberCompanyVo.listAddress:'--'}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="注册地址：">{{memberCompanyVo.registeredAddres?memberCompanyVo.registeredAddres:'--'}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="办公地址：">{{memberCompanyVo.workAddress?memberCompanyVo.workAddress:'--'}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司网址：">{{memberCompanyVo.companyWeb?memberCompanyVo.companyWeb:'--'}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人代表：">{{memberCompanyVo.legalRepresentative}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册资本(万元)：">{{memberCompanyVo.registeredCapital}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h2>退会申请书</h2>
          </el-col>
        </el-row>
        <el-form-item label="退会申请书.doc">
          <span class="blue m-l-20 cur-pointer">下载</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: { lay: { type: String, required: false, default: "" } },
  data() {
    return {
      checked: true,
      checkList: ["邮件提醒", "短信提醒"],
      input: "",
      memberCompanyVo:{},
      sizeForm: {
        name: "",
        region: "",
        dataTime: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        fee: ""
      }
    };
  },
  created() {
     //公司信息
     let companyId = this.$store.state.manage.passVal.companyId;
     let self = this
      this.$api.member.basicComp({ companyId }).then(res => {
        if (res.success) {
          self.memberCompanyVo = res.data;
        }
        // console.log(self.showData.memberCompanyVo)
      });
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="less" scoped>
.check {
  margin-top: 30px;
  background-color: #fff;
  .table_title {
    font-size: 16px;
    font-weight: 600;
    padding: 15px 30px;
    border-bottom: 1px solid #eee;
  }
  .formBox {
    padding: 30px;
    .msgBox {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 10px;
      width: 300px;
      height: 200px;
    }
    .member {
      width: 300px;
    }
    h2 {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 30px;
    }
  }
}
</style>
