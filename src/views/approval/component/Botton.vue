<template>
  <div class="btn_bottom footBtnBox">
    <el-row style="text-align:right;margin-bottom:0;">
      <el-col :span="24">
        <el-button v-if="!!btnSup">{{btnSup}}</el-button>
        <el-button v-if="!!btnLeft" @click="reject()">{{btnLeft}}</el-button>
        <el-button v-if="!!btnRight" type="primary" @click="confirmBtn">{{btnRight}}</el-button>
      </el-col>
    </el-row>
    <el-card class="box-card appro" v-if="!!btnSup">
      <div class="text item">初审</div>
      <div class="text item">复审</div>
      <div class="text item">总监审批</div>
      <div class="text item">分管领导审批</div>
      <div class="text item">会长审批</div>
    </el-card>
    <el-dialog title="驳回" :visible.sync="rejectVisible" :append-to-body="true" width="600px">
      <el-form :model="form" label-width="55px">
        <el-form-item label="说明：">
          <el-input v-model="form.explain" class="formCon" type="textarea" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rejectVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmBtn">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    btnSup: { type: String, required: false },
    btnLeft: { type: String, required: false },
    btnRight: { type: String, required: false },
  },
  data() {
    return {
      rejectVisible: false,
      form: {
        explain: ""
      }
    };
  },
  methods: {
    reject() {
      this.rejectVisible = true;
    },
    confirmBtn(){
      if(this.rejectVisible&&!this.form.explain){
        this.$message.error('请输入拒绝理由！')
        return
      }
      this.$emit('confirmCheck',{explain:this.form.explain});
      this.rejectVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.btn_bottom {
  position: fixed;
  bottom: 20px;
  right: 35px;
  .box-card {
    position: absolute;
    width: 200px;
    bottom: 50px;
    right: 110px;
    .text {
      color: #666;
      cursor: pointer;
    }
    .text:hover {
      background-color: #e6f7ff;
    }
    .item {
      padding: 5px 12px;
    }
  }
  .formCon {
    height: 115px;
    textarea {
      height: 100%;
    }
  }
}
</style>