<template>
  <div class="explain">
    <div class="table_title">补充说明</div>
    <div class="formBox">
      <el-form ref="form" :model="sizeForm" label-width="100px">
        <el-form-item
          label="补充说明："
        >因为某些理由需要因为某些理由需要因为某些理由需要因为某些理由需要因为某些理由需要因为某些理由需要因为某些理由需要因为某些理由需要因为某些理由需要</el-form-item>
        <el-form-item label="附件：">
          <div>
            <span>附件1..doc</span>
            <el-upload
              class="upload-box float-left"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
            ></el-upload>
            <span class="blue m-l-20 cur-pointer">下载</span>
          </div>
          <div>
            <span>附件1..doc</span>
            <el-upload
              class="upload-box float-left"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
            ></el-upload>
            <span class="blue m-l-20 cur-pointer">下载</span>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sizeForm: {}
    };
  }
};
</script>
<style lang="less" scoped>
.explain {
  background: #fff;
  margin-top: 30px;
  .table_title {
    font-size: 16px;
    font-weight: 600;
    padding: 15px 30px;
    border-bottom: 1px solid #eee;
  }
  .formBox {
    padding: 30px;
  }
}
</style>