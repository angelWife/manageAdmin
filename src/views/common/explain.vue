<template>
  <div class="explain">
    <div class="table_title">说明凭证</div>
    <div class="formBox">
      <el-form label-width="100px">
        <el-form-item label="补充说明：">{{expData.explain}}</el-form-item>
        <el-form-item label="证明凭证：">
          <div v-for="item in expData.imgList" :key="item.index">
            <span class="prove">{{item.name}}</span>
            <a class="blue m-l-20 cur-pointer" :href="item.path">下载</a>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    expData: { type: Object, required: true }
  },
  data() {
    return {};
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