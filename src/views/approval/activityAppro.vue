<template>
  <div>
    <progSchedule></progSchedule>
    <activityInfo></activityInfo>
    <Botton btnLeft="退回初审" btnRight="审批通过"></Botton>
  </div>
</template>
<script>
import progSchedule from "./component/progSchedule";
import activityInfo from "./component/activityInfo";
import Botton from "./component/Botton";

export default {
  data() {
    return {
      stamp: true // 是否签章
    };
  },
  components: {
    progSchedule,
    activityInfo,
    Botton
  }
};
</script>
<style lang="less" scoped>
</style>