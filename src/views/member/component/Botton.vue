<template>
  <div class="btn_bottom">
    <el-row style="text-align:right">
      <el-col :span="24">
        <el-button v-if="!edit" type="primary" @click="openEdit()">编辑</el-button>
        <el-button v-if="edit" @click="save()">取消</el-button>
        <el-button v-if="edit" type="primary" @click="save()">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    msgChange: { type: Boolean, required: false }, // 信息变更提交
    memberChange: { type: Boolean, required: false } // 会员代表变更提交
  },
  data() {
    return {
      rejectVisible: false,
      form: {
        explain: ""
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
    reject() {
      this.rejectVisible = true;
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
          if (this.msgChange) {
            // 已有信息变更
            // this.$store.commit("openMsgMask");
          }
          if (this.memberChange) {
            // 会员代表变更
            // this.$store.commit("openMemberMask");
          }
        })
        .catch(() => {});
    },
    save() {
      this.$store.commit("closeEdit");
      this.$store.commit("closeMemberMask");
      this.$store.commit("closeMsgMask");
    }
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
</style>