<template>
  <div>
    <div class="footBtnBox text_right">
      <el-button
        type="warning"
        :disabled="exited||affirming"
        v-if="freeze"
        @click="frozeVisible = true"
      >冻结</el-button>
      <el-button type="warning" v-if="thaw" @click="thawVisible = true">解冻</el-button>
      <el-button type="warning" :disabled="exited||affirming" @click="exitVisible = true">退会</el-button>
      <el-button type="primary" @click="resetVisible = true">重置密码</el-button>
      <span v-if="showEdit">`
        <el-button type="primary" :disabled="affirming " @click="openEdit()" v-if="!edit">编辑</el-button>
        <el-button type="primary" @click="cancelSave" v-if="edit">取消</el-button>
        <el-button type="primary" @click="upVisible = true" v-if="edit">提交</el-button>
      </span>
    </div>
    <!-- 提交 -->
    <el-dialog title="上传证明" :visible.sync="upVisible">
      <div
        style="color:#8d8d8d;"
      >根据具体变更项，系统判定提交后需要参与以下流程，另外出于安全考虑，任何公司基本信息的改动均需额外上传工商部门出具的营业执照变更通知书照片或其他同类证明供审批</div>
      <div class="upContent">
        <div class="upform bd-right">
          <el-checkbox v-model="msgCK">信息变更流程</el-checkbox>
          <footNote v-if="msgCK"></footNote>
          <footNoteDisable v-else></footNoteDisable>
        </div>
        <div class="upform">
          <el-checkbox v-model="memCK">会员代表变更流程</el-checkbox>
          <footNote v-if="memCK"></footNote>
          <footNoteDisable v-else></footNoteDisable>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="upVisible = false">取消</el-button>
        <el-button type="primary" @click="save()">确定提交</el-button>
      </div>
    </el-dialog>
    <!-- 强制退会 -->
    <el-dialog title="强制退会" :visible.sync="exitVisible" width="30%">
      <voucher></voucher>
      <div style="padding:20px;color:#999;line-height:25px">
        <div>说明</div>
        <div>为保证信息安全，协会人员对会员信息进行操作均需填写说明，如有需要还可上传相关附件供事后追溯</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exitVisible = false">取 消</el-button>
        <el-button type="primary" @click="exitVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 冻结 -->
    <el-dialog title="账号冻结" :visible.sync="frozeVisible" width="30%">
      <voucher></voucher>
      <div style="padding:20px;color:#999;line-height:25px">
        <div>说明</div>
        <div>为保证信息安全，协会人员对会员信息进行操作均需填写说明，如有需要还可上传相关附件供事后追溯</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="frozeVisible = false">取 消</el-button>
        <el-button type="primary" @click="frozeSubmit()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 解冻 -->
    <el-dialog title="账号解冻" :visible.sync="thawVisible" width="30%">
      <voucher></voucher>
      <div style="padding:20px;color:#999;line-height:25px">
        <div>说明</div>
        <div>为保证信息安全，协会人员对会员信息进行操作均需填写说明，如有需要还可上传相关附件供事后追溯</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="thawVisible = false">取 消</el-button>
        <el-button type="primary" @click="thawSubmit()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="重置密码" :visible.sync="resetVisible" width="30%">
      <div class="new">
        <span>新密码：</span>
        <el-input v-model="password" placeholder="请输入新密码" show-password></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetVisible = false">取消</el-button>
        <el-button type="primary" @click="sureChangePwd">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import footNote from "./footNote";
import footNoteDisable from "./footNoteDisable";
import voucher from "./voucher";
import { mapState } from "vuex";

export default {
  props: {
    showEdit: { type: Boolean, required: false, default: true }
  },
  data() {
    return {
      password:'',
      resetVisible:false,
      msgCK: true,
      memCK: true,
      upVisible: false,
      exitVisible: false,
      frozeVisible: false,
      thawVisible: false,
      freeze: true,
      thaw: false,
      exited: false, // 已退会
      affirming: false, // 认定中
      upform: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  computed: {
    edit: {
      get() {
        return this.$store.state.dialog.edit;
      },
      set(val) {}
    }
  },
  methods: {
    cancelSave(){
          this.$store.commit("closeEdit");
    },
    openEdit() {
      this.$confirm(
        "此根据协会要求，修改会员信息需经审批流程，审批通过后，修改才会生效。在此期间会员信息仍为修改前状态?",
        "",
        {
          confirmButtonText: "继续",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$store.commit("openEdit");
        })
        .catch(() => {});
    },
    save() {
      this.$store.commit("submitAll",true);
      // this.upVisible = false;
    },
    frozeSubmit() {
      this.freeze = false;
      this.thaw = true;
      this.frozeVisible = false;
    },
    thawSubmit() {
      this.freeze = true;
      this.thaw = false;
      this.thawVisible = false;
    },
    sureChangePwd() {
      const reg = /^[a-zA-Z0-9]{8}$/;
      if (!reg.test(this.password)) {
        this.$message.error('请输入8位数字英文密码！')
        return
      }
      let params = {
        companyId: this.$route.query.companyId,
        password: this.password
      }
      this.$api.member.companyPwdChange(params).then(res => {
        if (res.success) {
          this.$message.success('修改该用户的密码成功！')
          this.resetVisible = false;
        }
      })
    },
  },
  components: {
    footNote,
    footNoteDisable,
    voucher
  }
};
</script>
<style lang="less" scoped>
.btn_bottom {
  position: fixed;
  bottom: 20px;
  right: 35px;
  z-index: 12;
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
.upform {
  display: inline-block;
  width: 47%;
  padding: 20px;
  vertical-align: top;
}
.bd-right {
  border-right: 1px solid #dcdfe6;
}
.container .el-dialog .el-dialog__body {
  padding: 50px;
}
</style>
