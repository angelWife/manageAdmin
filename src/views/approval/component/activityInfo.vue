<template>
  <div class="check">
    <div class="table_title">基本信息</div>
    <div class="formBox">
      <el-form ref="form" :model="mydata" label-width="180px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称：">{{mydata.name}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动类型：">{{mydata.activityTypeVal}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动开始结束时间：">{{mydata.activityDateStart}}到{{mydata.activityDateEnd}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动报到开始结束时间：">{{mydata.enrolDateStart}}到{{mydata.enrolDateEnd}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动报名开始结束时间：">{{mydata.checkInDateStart}}到{{mydata.checkInDateEnd}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动地点：">{{mydata.address}}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件：">
          <span>说明.pdf</span>
          <span class="blue m-l-20 cur-pointer">下载</span>
        </el-form-item>
        <el-form-item label="消息推送：">
          <div>会员组：</div>
          <div class="msgBox">
            <div>
              <el-checkbox v-model="checked">会员组1</el-checkbox>
            </div>
            <div>
              <el-checkbox>会员组1</el-checkbox>
            </div>
            <div>
              <el-checkbox>会员组1</el-checkbox>
            </div>
          </div>
          <div>会员：</div>
          <el-input class="member" v-model="input"></el-input>
          <div>发布后立即提醒推送对象：</div>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="邮件提醒"></el-checkbox>
            <el-checkbox label="短信提醒"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: { 
    lay: { type: String, required: false, default: "" },
    number: { type: String, required: true },
    mydata:{type: Object,required: true}
    },
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
      },
    };
  },
  created() {
    
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
  }
}
</style>