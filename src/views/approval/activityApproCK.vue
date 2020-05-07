<template>
  <div>
    <progSchedule :number="number"></progSchedule>
    <activityInfo></activityInfo>
  </div>
</template>
<script>
import progSchedule from "./component/progSchedule";
import activityInfo from "./component/activityInfo";
import Botton from "./component/Botton";

export default {
  data() {
    return {
      stamp: true, // 是否签章
      number:''
    };
  },
  created() {
    debugger
    this.number = this.$route.query.number
  },
  methods: {
    
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