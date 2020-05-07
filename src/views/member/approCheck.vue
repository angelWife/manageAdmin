<template>
  <div class="container">
    <feeInfo></feeInfo>
    <bascInfo></bascInfo>
  </div>
</template>
<script>
import feeInfo from "./component/fee/feeInfo";
import bascInfo from "./component/bascInfo";

export default {
  data() {
    return {};
  },
  components: {
    feeInfo,
    bascInfo
  }
};
</script>
<style lang="less" scoped>
</style>