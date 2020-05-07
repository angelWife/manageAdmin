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
            <el-form-item label="名称：">深圳市亲几餐饮有限公司</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活统一社会信用代码：">914403006820323321</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构类型：">保险公司</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名称：">SZQQJCYYXGS</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司类型：">有限责任公司</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立日期：">2015-10-02</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否上市：">是</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上市地：">香港</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="注册地址：">-</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="办公地址：">-</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司网址：">-</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人代表：">-</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册资本(万元)：">香港</el-form-item>
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
export default {
  props: { lay: { type: String, required: false, default: "" } },
  data() {
    return {
      checked: true,
      checkList: ["邮件提醒", "短信提醒"],
      input: "",
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