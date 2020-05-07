<template>
  <div>
    <progSchedule :number="number"></progSchedule>
    <div v-if="type==1">
      <feeCheck></feeCheck>
      <feeStamp></feeStamp>
      <feeInfo :basicTitle="会费盖章"></feeInfo>
      <bascInfo :basicTitle="会员信息" :changeList="changeList"></bascInfo>
    </div>
    <div v-else-if="type==2||type==3||type==4">
      <isChange :change="true"></isChange>
      <bascInfo :basicTitle="变更情况" :changeList="changeList"></bascInfo>
      <explain></explain>
      <Botton btnLeft="退回初审" btnRight="审批通过"></Botton>
    </div>
    <div v-else-if="type==5||type==6||type==7">
      <isChange :change="true"></isChange>
      <memberChange></memberChange>
      <explain></explain>
      <!-- 详情 -->
      <footNoteCheck></footNoteCheck>
      <!-- 需要填写 -->
      <footNote></footNote>
    </div>
    <div v-else-if="type==8">
      <feeInfo></feeInfo>
      <feeStamp :basicTitle="年费盖章"></feeStamp>
    </div>
    <div v-else-if="type==9">
      <activityInfo></activityInfo>
    </div>
    <div v-else-if="type==10">
      <footNote></footNote>
      <exitPaper></exitPaper>
      <footNoteCheck></footNoteCheck>
    </div>
  </div>
</template>
<script>
import progSchedule from "./component/progSchedule";
import activityInfo from "./component/activityInfo";
import bascInfo from "./component/bascInfo";
import exitPaper from "./component/exitPaper";
import explain from "./component/explain";
import footNote from "./component/footNote";
import footNoteCheck from "./component/footNoteCheck";
import memberChange from "./component/memberSyboml";
import feeInfo from "./component/fee/feeInfo";
import feeCheck from "./component/fee/feeCheck";
import feeStamp from "./component/fee/feeStamp";
import feeInfo from "./component/fee/feeInfo";
import isChange from "./component/isChange";

export default {
  props: {},
  data() {
    return {
      state: "",
      type: "",
      number: this.$route.query.number,
      stamp: true, // 是否签章
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
    debugger;
    console.log("路由查询参数>>>", this.$route.query.state);
    this.state = this.$route.query.state;
    this.number = this.$route.query.number;
    this.type = this.$route.query.type;
    console.error(this.number)
  },
  methods: {},
  components: {
    progSchedule,
    bascInfo,
    explain,
    exitPaper,
    footNoteCheck,
    memberChange,
    footNote,
    feeCheck,
    feeStamp,
    feeInfo,
    isChange,
    activityInfo
  }
};
</script>
