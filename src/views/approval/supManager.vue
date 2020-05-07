<template>
  <div>
    <progSchedule></progSchedule>
    <bascInfo basicTitle="会员信息"></bascInfo>
    <Botton btnSup="中止" btnLeft="跳转 +" btnRight="审批通过"></Botton>
  </div>
</template>
<script>
import progSchedule from "./component/progSchedule";
import bascInfo from "./component/bascInfo";
import Botton from "./component/Botton";
export default {
  data() {
    return {};
  },
  components: {
    progSchedule,
    bascInfo,
    Botton
  }
};
</script>
<style lang="less" scoped>
</style>