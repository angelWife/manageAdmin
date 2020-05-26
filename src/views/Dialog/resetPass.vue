<template>
  <el-dialog title="重置密码" :visible.sync="resetDialog" width="500px" show-close="false">
    <div class="tip">密码要求长度大于8位，由英文+数字组合以保障安全</div>
    <el-form :model="form">
      <el-form-item label="新密码:" :label-width="formLabelWidth">
         <img class="img-eye" :src="showPw?'../../../static/eye-open.png':'../../../static/eye-close.png'" @click="showPassword">
        <el-input v-model="form.passwdNew" autocomplete="off"  :type="showPw?'text':'password'">
            <!-- <img class="img-eye" src="../../../static/eye-close.png"> -->

        </el-input>

      </el-form-item>
      <el-form-item label="再次输入:" :label-width="formLabelWidth">
         <img class="img-eye" :src="showPw2?'../../../static/eye-open.png':'../../../static/eye-close.png'" @click="showPassword2">
        <el-input v-model="form.passwdNewAgain" autocomplete="off" show-password></el-input>
      </el-form-item>
    </el-form>
    <el-dialog width="30%" title="是否重置密码" :visible.sync="innerVisible" append-to-body>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">提交</el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeReset()">取 消</el-button>
      <el-button type="primary" @click="confirmPw">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import { isPassword } from "../../utils/validate";
export default {
  data() {
    return {
      form: {
        passwdNew: "",
        passwdNewAgain: ""
      },
      formLabelWidth: "80px",
      innerVisible: false,
      resetDialo: true,
      showPw:false,
      showPw2:false,
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
    showPassword(){
      this.showPw =  !this.showPw
    },
    showPassword2(){
      this.showPw2 =  !this.showPw2
    },
    confirmPw(){
      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
      if (!this.form.passwdNew && !this.form.passwdNewAgain) {
        this.$message.error("请输入密码");
        return;
      }
      if(!reg.test(this.form.passwdNew)){
        this.$message.error("密码要求长度大于8位，由英文+数字组合");
        return;
      }
      if (this.form.passwdNew !== this.form.passwdNewAgain) {
        this.$message.error("两次输入的密码不同，请重新输入");
        return;
      }
      this.innerVisible = true
    },
    changePwd() {
      let self = this;
      this.$api.user.changeUserPwd(this.form).then(res => {
        if (res.success) {
          self.$message.success("修改成功！");
          self.closeReset();
          self.loginOut();
        }
      });
    },
    loginOut() {
      this.$api.login.logout().then(res => {
        if (res.success) {
          this.$router.push("/login/index");
        }
      });
    }
  }
};
</script>

<style lang="less">
/* .el-dialog__headerbtn{
    display: none;
  } */
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
.img-eye{
  position: absolute;
  width: 22px;
  height: 16px;
  right: 10px;
    z-index: 9;
    margin-top: 12px;
}

</style>
