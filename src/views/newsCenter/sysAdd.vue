<template>
  <div class="myformAdd comModal hasfoot">
    <el-form class="comFormBox" label-width="120px" label="left">
      <el-row class="m-t-20" style="padding-left: 30px;">
        <el-col :span="8">
          <el-form-item label="消息标题：">
            <el-input placeholder="请输入消息标题" v-model="form.title" :disabled="check"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="padding-left: 30px;">
        <el-col :span="8">
          <el-form-item label="消息内容：">
            <el-input
              type="textarea"
              v-model="form.content"
              :disabled="check"
              placeholder="请输入消息内容，注意不要超过300个字"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <msgPush
        title="发送对象："
        :seleMember="false"
        :sendTime="true"
        :bus="bus"
        :id="messageId"
        :check="check"
        :pushType="3"
      ></msgPush>
    </el-form>
    <div class="footBtnBox text_right">
      <el-button type @click="back">取消</el-button>
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </div>
  </div>
</template>
<script>
import msgPush from "@/views/common/msgPush";
import { apiDic, apiShow, backPage, publicMsg } from "../../utils/commonApi";
import { pageTen, pubParam, successMES } from "../../utils/common";
import Vue from "vue";

export default {
  data() {
    return {
      bus: new Vue(),
      form: {
        title: "",
        content: ""
      },
      msgParam: {},
      sendParam: {},
      messageId: "",
      check: false,

      sendOn: {}
    };
  },
  created() {
    this.bus.$on("sendTime", data => {
      console.log(data);
      this.sendParam = data;
    });

    this.bus.$on("msgBox", data => {
      console.log(data);
      this.msgParam = data;
    });

    if (!!this.$route.query.rowId) {
      /*console.log(this.$route.query.rowId);*/
      this.messageId = parseInt(this.$route.query.rowId);
      console.log(this.messageId);
      this.check = this.$route.query.check ? true : false;
      /*this.$api.message.sysView({ id: this.messageId })*/
      apiShow("message", "sysView", {
        id: this.messageId
      }).then(resolve => {
        this.form = {
          title: resolve.title,
          content: resolve.content
        };
        this.sendOn = {
          flagSendDelay: resolve.flagSendDelay,
          sendDate: resolve.sendTime
        };
        this.bus.$emit("timeEdit", this.sendOn);
      });
    }
  },
  methods: {
    submitForm() {
      if (
        !!this.form.content &&
        !!this.form.title &&
        (this.msgParam.companyIdList.length > 0 ||
          this.msgParam.groupIdList.length > 0)
      ) {
        apiShow("message", "sysAdd", {
          ...this.form,
          ...this.sendParam,
          id: this.messageId,
          memberList: this.msgParam.companyIdList.join(","),
          memberGroupList: this.msgParam.groupIdList.join(",")
        }).then(resolve => {
          publicMsg(this.msgParam, resolve, 3, false, "", "sysPublish");
          this.$router.go(-1);
        });
      } else {
        this.$message({
          message: "请填写系统信息内容，标题和短信接收人！",
          type: "warning"
        });
      }
    },
    back() {
      this.$router.go(-1);
    }
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
  .vipBox {
    width: 400px;
    height: 200px;
    border-radius: 5px;
    border: 1px solid #e6e6e6;
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
