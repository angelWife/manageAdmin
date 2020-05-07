<template>
  <div class="container">
    <el-form class="comFormBox" label-width="120px" label="left">
      <el-row style="padding-left: 30px;">
        <el-col :span="10">
          <el-form-item label="模板名称：">
            <el-input placeholder="请输入模板名称" v-model="form.modelName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="m-t-20" style="padding-left: 30px;">
        <el-col :span="10">
          <el-form-item label="模板标题：">
            <el-input v-model="form.modelTitle" placeholder="请输邮件标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="m-t-20" style="padding-left: 30px;">
        <el-col :span="14">
          <el-form-item label="模板内容：">
            <el-card style="height: 540px;">
              <quill-editor v-model="form.noticeData" style="height: 400px;"></quill-editor>
            </el-card>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="padding-left:150px;padding-top:60px">
      <el-button type>取消</el-button>
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </div>
  </div>
</template>
<script>
import { apiDic, apiShow, backPage, publicMsg } from "../../utils/commonApi";
import { pageTen, pubParam, successMES } from "../../utils/common";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      form: {
        modelTitle: "",
        modelNamename: "",
        noticeData: ""
      }
    };
  },
  created() {
    this.showEdit();
  },
  methods: {
    showEdit() {
      apiShow("message", "modelView", {
        id: this.$route.query.id
      }).then(resolve => {
        this.form = {
          modelName: resolve.modelName,
          modelTitle: resolve.modelTitle,
          noticeData: resolve.noticeData
        };
      });
    },
    submitForm() {
      apiShow("message", "modelAdd", {
        id: this.$route.query.id,
        ...this.form
      }).then(resolve => {
        successMES("提交成功");
      });
    }
  },
  components: {
    quillEditor
  }
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
  height: 100%;
  .input_style,
  .el-select {
    width: calc(100% - 180px);
  }
}
</style>