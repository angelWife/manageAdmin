<template>
  <div>
    <progSchedule></progSchedule>
    <bascInfo basicTitle="变更情况" :changeList="changeList" lay="detail"></bascInfo>
    <explain></explain>
    <footNoteCheck v-if="firstConfirm"></footNoteCheck>
  </div>
</template>
<script>
import progSchedule from "./component/progSchedule";
import bascInfo from "./component/bascInfo";
import explain from "./component/explain";
import footNoteCheck from "./component/footNoteCheck";

export default {
  props: {},
  data() {
    return {
      state: "",
      firstConfirm: true, // 初步确认
      changeList: {
        name: "深圳市亲几餐饮工作室",
        money: "1000",
        imageUrl: "../../../static/busPic.png",
        contactInfo: [
          {
            name: "王小二",
            post: "总经理秘书",
            tel: "31311133-1234",
            phone: "19999999999",
            max: "-",
            email: "-",
            b_email: "-",
            address: "-",
            weixin: "-",
            default: true
          },
          {
            name: "王小四",
            post: "总经理秘书",
            tel: "31311133-1234",
            phone: "19999999999",
            max: "-",
            email: "-",
            b_email: "-",
            address: "-",
            weixin: "-",
            default: false
          }
        ]
      }
    };
  },
  created() {
    console.log("路由查询参数>>>", this.$route.query.state);
    this.state = this.$route.query.state;
  },
  methods: {},
  components: {
    progSchedule,
    bascInfo,
    explain,
    footNoteCheck
  }
};
</script>
