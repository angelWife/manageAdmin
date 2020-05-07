<template>
  <div class="container">
    <el-form ref="form" :model="formData" label-width="100px">
      <el-form-item label="年审名称：" class="mustFill">
        <el-input v-model="formData.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="邀请对象：" lass="mustFill">
        <div class="flex" style="justify-content:space-between;width:320px">
          <span>会员:</span>
          <div>
            <el-button type="primary" size="mini">添加</el-button>
            <el-button type="primary" size="mini">清空</el-button>
          </div>
        </div>
        <div class="member">
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            closable
            size="small"
            :type="tag.type"
            @close="handleClose(tag)"
          >{{tag.name}}</el-tag>
        </div>
        <span>会员组：</span>
        <div class="member">
          <el-checkbox
            v-for="check in checkList"
            :key="check.index"
            v-model="check.checked"
          >{{check.name}}</el-checkbox>
        </div>
        <div>首次发布后立即提醒推送对象：</div>
        <div>
          <el-checkbox v-model="mailck">邮件提醒</el-checkbox>
          <el-checkbox v-model="msgck">短信提醒</el-checkbox>
        </div>
        <div style="color:#666">如果年审对象有变更，且非首次发布，重新发布后将不会主动发送提醒，可选择人工沟通，或者年审监控中全体发送提醒完成该操作</div>
      </el-form-item>
    </el-form>
    <div style="text-align:right;width:600px">
      <el-button>取消</el-button>
      <el-button type="primary">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        name: "2018年审"
      },
      tags: [
        { name: "会员1", type: "info" },
        { name: "会员2", type: "info" },
        { name: "会员3", type: "info" },
        { name: "会员5", type: "info" },
        { name: "会员6", type: "info" },
        { name: "会员7", type: "info" }
      ],
      checkList: [
        { name: "监事组", checked: false },
        { name: "理事组", checked: true },
        { name: "委员会", checked: false }
      ],
      mailck: true,
      msgck: false
    };
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 30px;
  height: 100%;
  .el-form {
    width: 600px;
  }
  .member {
    width: 320px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    height: 230px;
    span {
      margin-right: 10px;
    }
    .el-checkbox {
      display: block;
    }
  }
}
</style>