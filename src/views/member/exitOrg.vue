<template>
  <div class="container">
    <div class="suggest">
      <div class="title">说明</div>
      <div
        class="content"
      >非常感谢您过去对协会工作的支持，根据协会流程要求，请下载并填写退会申请书，经由协会审核通过后，您的会员状态将会变为退会状态，保留会员基本信息与账号，同时，退会会员仍能与普通注册用户一样参加协会举办的活动。</div>
    </div>
    <div style="height:40px">
      <div :span="2" class="text">退会申请书：</div>
      <div :span="24" class="tt-box">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          accept=".doc, .docx"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <span class="down">退会申请书下载</span>
        </el-upload>
      </div>
    </div>

    <div class="btn-box">
      <el-button :disabled="Apply">取消</el-button>
      <el-button :disabled="Apply" type="primary">提交</el-button>
      <span style="color:red" v-if="Apply">您已经提交过退回申请，请耐心等待协会的审批结果</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Apply: false // 是否提交申请
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 30px;
  height: 100%;
  .suggest {
    padding-bottom: 20px;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 30px;
    .title {
      font-size: 14px;
      color: #8d8d8d;
      font-weight: 600;
    }
    .content {
      font-size: 14px;
      color: #8d8d8d;
      margin-bottom: 20px;
    }
  }
  .text {
    line-height: 40px;
    float: left;
  }
  .tt-box {
    float: left;
    .down {
      line-height: 40px;
      color: #1890ff;
    }
  }
  .btn-box {
    margin-top: 60px;
    margin-left: 60px;
  }
}
</style>