<template>
  <div class="myformAdd comModal hasfoot">
    <el-form class="comFormBox" :model="msgForm" ref="msgForm" label-width="140px" label="left">
      <el-row class="m-t-20">
        <el-col :span="10">
          <el-form-item label="短信内容：">
            <el-input
              type="textarea"
              v-model="msgForm.msgContent"
              placeholder="请输入短信内容，注意不要超过140个字"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="发送测试：">
            <el-input placeholder="请输入测试手机号" v-model="msgForm.phone">
              <el-button
                slot="append"
                type="primary"
                style="background-color: #409EFF;border-color: #409EFF;color:#fff"
              >发送短信测试</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="发送对象：">
            <div>
              <el-radio v-model="msgForm.radioObj" label="member">会员</el-radio>
              <el-radio v-model="msgForm.radioObj" label="phone">手机名单</el-radio>
            </div>

            <div v-if="msgForm.radioObj == 'member'">
              <div class="member-head">
                <span>会员：</span>
                <span class="float-right">
                  <el-button type="primary" size="mini">添加</el-button>
                  <el-button type="primary" size="mini">清空</el-button>
                </span>
              </div>
              <div class="vipBox">
                <el-tag
                  type="info"
                  v-for="item in msgForm.tagMember"
                  :key="item.index"
                  closable
                >{{item}}</el-tag>
              </div>
            </div>

            <div v-if="msgForm.radioObj == 'phone'">
              <div class="member-head">
                <span class="float-left">
                  <el-button size="mini">导入</el-button>
                  <span class="blue m-l-20 cur-pointer">手机名单模板下载</span>
                </span>
                <span class="float-right">
                  <el-button size="mini">清空</el-button>
                </span>
              </div>
              <div class="vipBox"></div>
              <div class="p-t-b-10 text">可以选择手工输入，手机号用英文逗号隔开；也可以选择导入文本文件，系统会自动对手机名单进行去重处理</div>
            </div>

            <div class="p-t-b-10">会员组：</div>
            <div class="vipBox">
              <el-checkbox-group v-model="msgForm.group">
                <el-checkbox v-for="item in msgForm.groupList" :key="item.index" :label="item"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="p-t-b-10 text">系统将根据选择的会员组与会员合并汇总出发送对象名单，确保消息不会重复发送</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="发送时间：" prop="address">
            <div>
              <el-radio v-model="msgForm.time" label="once">立即</el-radio>
              <el-radio v-model="msgForm.time" label="delay">延迟</el-radio>
            </div>
            <el-date-picker
              v-model="msgForm.delayTime"
              placeholder="选择时间"
              :disabled="msgForm.time=='once'"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
            ></el-date-picker>
            <div
              class="p-t-b-10 text"
            >选择立即，系统将在发布后同时发送；选择延迟，将会在发布后到达发送时间后再进行发送；如果发布时已经超过发送时间，将会立即进行发送</div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footBtnBox text_right">
      <el-button type>保存</el-button>
      <el-button type="primary" @click="submitForm('msgForm')">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msgForm: {
        msgContent: "",
        phone: "",
        radioObj: "member",
        tagMember: ["会员1", "会员2"],
        group: ["会员组1", "会员组2", "会员组3"],
        groupList: ["会员组1", "会员组2", "会员组3"],
        time: "once",
        delayTime: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push({
            path: "/myHome/index",
            query: { type: "sendConfirm" }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
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