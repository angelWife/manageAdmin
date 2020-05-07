<template>
  <div>
    <progSchedule></progSchedule>
    <exitPaper></exitPaper>
    <footNote></footNote>
    <Botton btnLeft="退回初审" btnRight="审批通过"></Botton>
  </div>
</template>
<script>
import progSchedule from "./component/progSchedule";
import footNote from "./component/footNote";
import Botton from "./component/Botton";
import exitPaper from "./component/exitPaper";
export default {
  data() {
    return {};
  },
  components: {
    progSchedule,
    footNote,
    exitPaper,
    Botton
  }
};
</script>
<style lang="less" scoped>
</style>