<template>
  <div>
    <progSchedule></progSchedule>
    <feeInfo></feeInfo>
  </div>
</template>
<script>
import progSchedule from "./component/progSchedule";
import feeInfo from "./component/fee/feeInfo";

export default {
  data() {
    return {
      stamp: true // 是否签章
    };
  },
  components: {
    progSchedule,
    feeInfo
  }
};
</script>
<style lang="less" scoped>
</style>