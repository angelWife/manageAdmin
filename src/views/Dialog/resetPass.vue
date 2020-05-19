<template>
  <el-dialog title="重置密码" :visible.sync="resetDialog" width="500px">
    <div class="tip">密码要求长度大于8位，由英文+数字组合以保障安全</div>
    <el-form :model="form">
      <el-form-item label="新密码:" :label-width="formLabelWidth">
        <el-input v-model="form.passwdNew" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="再次输入:" :label-width="formLabelWidth">
        <el-input v-model="form.passwdNewAgain" autocomplete="off" show-password></el-input>
      </el-form-item>
    </el-form>
    <el-dialog
      width="30%"
      title="是否确认更改密码"
      :visible.sync="innerVisible"
      append-to-body>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">提交</el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeReset()">取 消</el-button>
      <el-button type="primary" @click="innerVisible = true">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import {isPassword} from '../../utils/validate'
export default {
  data() {
    return {
      form: {
        passwdNew: "",
        passwdNewAgain: ""
      },
      formLabelWidth: "80px",
      innerVisible:false,
      resetDialo: true
    };
  },
  computed: {
    ...mapState({
      resetDialog: state => state.dialog.resetDialog
    })
  },
  methods: {
    closeReset() {
      this.$store.commit("hideResetDialog");
    },
    changePwd(){
      let self = this
      if(!this.form.passwdNew&&!this.form.passwdNewAgain){
        this.$message.error('请输入密码')
        return
      }else if(this.form.passwdNew!==this.form.passwdNewAgain){
        this.$message.error('两次输入的密码不同，请重新输入')
        return
      }
      // else if(!isPassword(this.form.passwdNew)||!isPassword(this.form.passwdNewAgain)){
      //   this.$message.error({
      //     message:'输入的密码不安全，请重新输入',
      //     type:'error'
      //   })
      //   return
      // }
      this.$api.user.changeUserPwd(this.form).then(res=>{
        if(res.success){
          self.$message.success('修改成功！');
          self.closeReset();
          self.loginOut();
        }
      })
    },
    loginOut() {
        this.$api.login.logout().then(res => {
          if (res.success) {
            this.$router.push("/login/index");
          }
        })
    },
  }
};
</script>

<style lang="less">
  .el-dialog__headerbtn{
    display: none;
  }
.tip {
  width: 100%;
  font-size: 14px;
  color: #777;
  padding-bottom: 20px;
  margin-top: -20px;
}
.el-dialog__body {
  padding-bottom: 5px;
}
.el-dialog__header {
  border-bottom: 1px solid #dcdfe6;
}
.el-form-item__label {
  text-align: left;
}
</style>
