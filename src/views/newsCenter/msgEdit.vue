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
          <el-form-item label="模板内容：">
            <el-input type="textarea" :rows="4" placeholder="请输入模板内容" v-model="form.modelContent"></el-input>
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

export default {
  data() {
    return {
      form: {
        modelNamename: "",
        modelContent: ""
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
          modelContent: resolve.modelContent
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