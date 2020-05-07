<template>
  <div class="outer">
    <el-tabs v-model="activeName" class="tab-inner">
      <el-tab-pane label="基本信息" name="basic">
        <mintorBasic :id="id"></mintorBasic>
      </el-tab-pane>
      <el-tab-pane label="会员代表" name="member">
        <mintorMember :id="id"></mintorMember>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mintorMember from "./component/mintorMember";
import mintorBasic from "./component/mintorBasic";

export default {
  data() {
    return {
      activeName: "basic",
      id: 0
    };
  },
  created() {
    this.id = Number(this.$route.query.id);
  },
  methods: {
     
  },
  components: {
    mintorMember,
    mintorBasic
  }
};
</script>
<style lang="less" scoped>
.outer {
  height: calc(100% - 30px);
  .tab-inner {
    height: 100%;
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>