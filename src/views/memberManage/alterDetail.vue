<template>
  <div>
    <progSchedule :proData="proData"></progSchedule>
    <explain :expData="expData"></explain>
  </div>
</template>
<script>
import { apiShow, apiDic, backPage } from "../../utils/commonApi";
import progSchedule from "@/views/common/progSchedule";
import explain from "@/views/common/explain";

export default {
  data() {
    return {
      id: 0,
      proData: [],
      expData: {}
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.displayPro();
    this.displayExp();
  },
  methods: {
    displayPro() {
      apiShow("member", "viewFlow", { id: this.id }).then(reslove => {
        this.proData = reslove;
      });
    },
    displayExp() {
      apiShow("member", "viewInfo", { id: this.id }).then(reslove => {
        this.expData = reslove;
      });
    }
  },
  components: {
    progSchedule,
    explain
  }
};
</script>
<style lang="less" scoped>
</style>