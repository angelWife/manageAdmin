<template>
  <div>
    <progSchedule></progSchedule>
    <feeInfo></feeInfo>
    <feeStamp v-if="stamp"></feeStamp>
    <Botton btnLeft="驳回" btnRight="审批通过"></Botton>
  </div>
</template>
<script>
import progSchedule from "./component/progSchedule";
import feeInfo from "./component/fee/feeInfo";
import feeStamp from "./component/fee/feeStamp";
import Botton from "./component/Botton";

export default {
  data() {
    return {
      stamp: true // 是否签章
    };
  },
  components: {
    progSchedule,
    feeInfo,
    Botton,
    feeStamp
  }
};
</script>
<style lang="less" scoped>
</style>