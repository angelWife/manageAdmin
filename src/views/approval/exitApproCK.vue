<template>
  <div>
    <progSchedule></progSchedule>
    <exitPaper></exitPaper>
    <footNoteCheck></footNoteCheck>
  </div>
</template>
<script>
import progSchedule from "./component/progSchedule";
import footNoteCheck from "./component/footNoteCheck";
import exitPaper from "./component/exitPaper";
export default {
  data() {
    return {};
  },
  components: {
    progSchedule,
    footNoteCheck,
    exitPaper
  }
};
</script>
<style lang="less" scoped>
</style>