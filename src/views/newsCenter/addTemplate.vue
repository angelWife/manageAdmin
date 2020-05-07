<template>
  <div class="myformAdd comModal hasfoot">
    <el-form
      class="comFormBox"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="140px"
      label="left"
    >
      <el-row class="m-t-20">
        <el-col :span="20">
          <el-form-item label="模板名称：">
            <el-input placeholder="请输入模板名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="模板标题：">
            <el-input type="textarea" placeholder="请输入模板标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="模板内容：">
            <el-card style="height: 640px;">
              <quill-editor
                v-model="content"
                ref="myQuillEditor"
                style="height: 500px;"
                :options="editorOption"
              ></quill-editor>
            </el-card>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footBtn text_center">
      <el-button type>取消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </div>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        address: "",
        desc: ""
      },
      content: null,
      editorOption: {},
      cities: ["监事组", "理事组"],
      checkedCities: [],
      radios: [],
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
      },
      tableItems: [
        {
          name: "",
          post: "",
          tel: "",
          phone: "",
          max: "",
          email: "",
          b_email: "",
          address: "",
          weixin: "",
          default: false
        }
      ]
    };
  },
  methods: {
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addTableItem() {
      let item = {
        name: "",
        post: "",
        tel: "",
        phone: "",
        max: "",
        email: "",
        b_email: "",
        address: "",
        weixin: "",
        default: false
      };
      this.tableItems.push(item);
    },
    deleteItem(ind) {
      if (this.tableItems.length == 1) {
        return false;
      } else {
        this.tableItems.splice(ind, 1);
      }
    },
    setItemDefault(ind) {
      this.tableItems.filter((v, i) => {
        if (i == ind) {
          v.default = true;
        } else {
          v.default = false;
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