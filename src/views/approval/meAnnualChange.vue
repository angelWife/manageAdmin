<template>
  <div>
    <progSchedule></progSchedule>
    <div class="confirm">
      <div class="table_title">会员信息</div>
      <div class="content">
        <span>是否有会员代表变更：</span>
        <span>是</span>
      </div>
    </div>
    <memberSyboml v-if="notChange" :changeList="changeList"></memberSyboml>
    <explain v-if="notChange"></explain>
    <footNote v-if="notChange"></footNote>
    <Botton btnLeft="退回初审" btnRight="审批通过"></Botton>
  </div>
</template>
<script>
import progSchedule from "./component/progSchedule";
import memberSyboml from "./component/memberSyboml";
import explain from "./component/explain";
import Botton from "./component/Botton";
import footNote from "./component/footNote";

export default {
  props: {},
  data() {
    return {
      notChange: true, // 无变动
      state: "",
      changeList: {
        name: "深圳市亲几餐饮工作室",
        idType: "护照",
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
    memberSyboml,
    explain,
    Botton,
    footNote
  }
};
</script>
<style lang="less" scoped>
.confirm {
  margin-top: 30px;
  background-color: #fff;
  .table_title {
    font-size: 16px;
    font-weight: 600;
    padding: 15px 30px;
    border-bottom: 1px solid #eee;
  }
  .content {
    padding: 30px;
    span {
      font-size: 14px;
    }
  }
}
</style>