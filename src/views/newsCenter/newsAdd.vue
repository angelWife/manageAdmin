<template>
  <div class="myformAdd comModal hasfoot">
    <el-form class="comFormBox" label-width="120px" label="left">
      <el-row class="m-t-20" style="padding-left: 30px;">
        <el-col :span="18">
          <el-form-item label="短信内容：">
            <el-input
              type="textarea"
              :disabled="check"
              v-model="form.messageContent"
              placeholder="请输入短信内容，不要超过140个英文字或70个中文字符"
              maxlength="70"
              :autosize="{minRows:4}"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="padding-left: 30px;">
        <el-col :span="18">
          <el-form-item label="发送测试：">
            <el-input placeholder="请输入测试手机号" v-model="form.testMobileNum" :disabled="check">
              <el-button
                slot="append"
                type="primary"
                style="background-color: #409EFF;border-color: #409EFF;color:#fff"
                @click="sendTest"
              >发送短信测试</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <msgPush
        title="发送对象："
        :pushType="6"
        :bus="bus"
        :id="messageId"
        :seleMember="true"
        :sendTime="true"
        :check="check"
        platform="sms"
      ></msgPush>
    </el-form>
    <div class="footBtnBox text_right">
      <el-button type @click="back">取消</el-button>
      <el-button type="primary" @click="submitForm()" v-if="!check">提交</el-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import msgPush from "@/views/common/msgPush";
import { apiDic, apiShow, backPage, publicMsg } from "../../utils/commonApi";
import { pageTen, pubParam, successMES } from "../../utils/common";

export default {
  data() {
    return {
      bus: new Vue(),
      form: {
        messageContent: ""
        /* testMobileNum: "", */
      },
      msgParam: {},
      sendParam: {},
      ObjParam: {},
      messageId: "",
      check: false,
      edit: false,
      add: false,
      id: "",
      sendOn: {},
      msgUpData: {},
      flagSend:'',
    };
  },
  watch: {
    form:{
      handler(obj){
          let val = obj.messageContent;
         if(val){
          let _arr = val.split('');
        }
        let res1 =  /^[0-9a-zA-Z]*$/g
        let res2 = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
      },
      deep:true
    },
  },
  created() {
    // if(this.$route.query.edit){

    // }

    var rowId = this.$route.query.rowId
    if (this.$route.query.rowId) {
      this.$store.commit('setHeadTitle','编辑短信');
      this.messageId = this.$route.query.rowId.toString();
      this.check = this.$route.query.check ? true : false;
      apiShow("message", "smsEdit", {id: rowId}).then(resolve => {
       console.log(resolve);
      this.form = resolve
        // this.form = {
        //   messageContent: resolve.content
        // };
        if (resolve.flagSendDelay == 1) {
          this.sendOn = {
            flagSendDelay: resolve.flagSendDelay,
            sendTime: ""
          };
        } else {
          this.sendOn = {
            flagSendDelay: resolve.flagSendDelay,
            sendTime: resolve.sendTime
          };
        }
        // console.log("sendOn", this.sendOn);
        this.bus.$emit("timeEdit", this.sendOn);
        this.bus.$emit("sendObject", resolve.sendObjectType);
        // this.bus.$emit("sendParam", this.sendParam);
      });
    }else{
      this.$store.commit('setHeadTitle','新增短信');
    }
    this.bus.$on("sendTime", data => {
      console.log("sendParam", data);
      this.sendParam = data;
    });

    this.bus.$on("msgBox", data => {
      this.msgParam = data;
    });

    this.bus.$on("sendObj", data => {
      console.log("sendObj", data);
      this.ObjParam = data;
    });
    this.bus.$on("flagSend", data => {
      this.flagSend = data
    });
  },
  methods: {
    submitForm() {
      console.log(this.sendParam);
      let _now = new Date().getTime();
      if(this.sendParam.flagSendDelay==2){
        if(!this.sendParam.sendTime){
            this.$message.error('延迟的时间不能小于当前时间');
          return false;
        }
        let val =  new Date(this.sendParam.sendTime).getTime();
        if(val<=_now){
          this.$message.error('延迟的时间不能小于当前时间');
          return false;
        }
      }
      if (
        this.form.messageContent &&
        (this.msgParam.companyIdList.length > 0 ||
          this.msgParam.groupIdList.length > 0)
      ) {
        apiShow("message", "smsAdd", {
          ...this.form,
          ...this.sendParam,
          id: this.messageId,
          memberList: this.msgParam.companyIdList.join(","),
          memberGroupList: this.msgParam.groupIdList.join(","),
          sendObjectType: this.ObjParam,

        }).then(resolve => {
          publicMsg(this.msgParam, resolve, 6, false, "sms", "smsPublish");
          this.$router.go(-1);
        });
      } else {
        this.$message({
          message: "请填写短信内容和短信接收人或组！",
          type: "warning"
        });
      }
    },
    back() {
      this.$confirm("是否放弃新建短信发送任务？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$router.go(-1);
        }).catch(() => {});

    },
    sendTest() {
      let reg = /^1[345789]\d{9}$/;
      if (
        !!this.form.testMobileNum &&
        reg.test(this.form.testMobileNum) &&
        this.form.messageContent
      ) {
        apiShow("message", "sendTest", {
          messageContent: this.form.messageContent,
          testMobileNum: this.form.testMobileNum
        }).then(resolve => {
          this.$message.success("发送成功");
        });
      } else {
        this.$message.warning("手机号不正确或者短信内容未填");
      }
    }
    /*msgUp(data){
      this.msgUpData = data;
      console.log('msgUpData',this.msgUpData);
    }*/
  },
  components: {
    msgPush
  }
};
</script>
<style lang="less">
.myformAdd {
  .text {
    line-height: 20px;
  }
  .spantext {
    display: inline-block;
    margin-right: 50px;
  }
  .p-t-b-10 {
    padding: 10px 0;
  }
  .el-checkbox {
    margin: 0 10px;
  }
  .member-head {
    height: 50px;
  }
  .vipBox {
    height: 300px;
    border-radius: 5px;
    border: 1px solid #e6e6e6;
    padding: 10px;
    .el-checkbox {
      display: block;
      height: 30px;
    }
    .el-tag {
      margin-right: 10px;
    }
    button {
      margin: 5px;
    }
  }
  .chooseBox {
    margin-bottom: 20px;
  }
  .comFormBox {
    width: calc(100% - 160px);
    padding: 0 20px 0 40px;
    .el-form-item {
      .el-form-item__label {
        min-height: 10px;
      }
      .el-form-item__content {
        > .el-select {
          width: 80%;
          min-width: 200px;
        }
        > .el-input {
          width: 100% !important;
          min-width: 200px;
        }
      }
      .avatar-uploader {
        .el-upload-list {
          .el-upload-list__item {
            width: 100px;
            height: 100px;
            line-height: 100px;
          }
        }
        .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          &:hover {
            border-color: #409eff;
          }
          &.el-upload--picture-card {
            width: 100px;
            height: 100px;
            line-height: 100px;
          }
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
        }
        .avatar {
          width: 100px;
          height: 100px;
          display: block;
        }
      }
      .el-date-editor .el-range-separator {
        min-width: 20px;
      }
    }
  }
}
.footBtn {
  padding: 20px;
}
</style>
