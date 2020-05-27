<template>
  <div class="check">
    <div class="table_title">基本信息</div>
    <div class="formBox">
      <el-form ref="form" label-position="right" :model="mydata" label-width="180px">
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动人数：">
              <span>{{mydata.activityPersonNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员单位允许报名人数：">
              <span>{{mydata.organPersonNum}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件">
          <div style="margin-left:10px;" v-if="mydata.filePath">
            <span style="margin-right:10px;">{{mydata.fileName}}</span>
            <a v-if="mydata.fileName && mydata.filePath" :href="mydata.filePath" target="_blank" class="buttonText">下载</a>
          </div>
        </el-form-item>
        <msgPush title="消息推送：" :bus="bus" :id="mydata.id" :check="true" :pushType="1" style="padding:0;"></msgPush>

        <!-- <el-form-item label="附件：">
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
        </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import msgPush from "@/views/common/msgPush";
export default {
  props: { 
    lay: { type: String, required: false, default: "" },
    // number: { type: String, required: true },
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
      bus: new Vue(),
      msgParam: {},
    };
  },
  created() {
    console.log(this.mydata);
    this.mydata.id = this.mydata.id+'';
    this.bus.$on("msgBox", data => {
      this.msgParam = data;
      console.log(data)
    });
  },
  mounted(){
    console.log(msgPush)
    console.log(this.mydata);
    // this.bus.$on("msgBox", data => {
    //   this.msgParam = data;
    //   console.log(data)
    // });
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
  components: {
    msgPush
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
    // .msgBox {
    //   border: 1px solid #ccc;
    //   border-radius: 4px;
    //   padding: 10px;
    //   width: 300px;
    //   height: 200px;
    // }
    // .member {
    //   width: 300px;
    // }
  }
}
</style>