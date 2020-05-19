<template>
  <div>
    <progSchedule :proData="proData"></progSchedule>
    <div v-if="dataType == 9 && details.newData">
      <feeCheck v-if="processName=='会员缴费'" :vipCost="vipCost"></feeCheck>
      <feeStamp v-if="processName=='确认书盖章'" basicTitle="会费盖章" :vipCost="vipCost"></feeStamp>
      <bascInfo basicTitle="会员信息"
                :changeData="details.newData.memberVo"
                :changeTypes="changeTypes"></bascInfo>
      <feeInfo v-if="processName=='缴费确认'" basicTitle="缴费信息" :vipCost="vipCost"></feeInfo>          
      <myBotton v-if="type == 'hasOper'"
                btnLeft="退回初审"
                btnRight="审批通过"
                @rejectCheck="rejectCheck"
                @confirmCheck="confirmCheck"></myBotton>
    </div>
    <div v-else-if="
        dataType == 1 ||
          dataType == 2 ||
          dataType == 3 ||
          dataType == 4 ||
          dataType == 5 ||
          dataType == 6 ||
          dataType == 7 ||
          dataType == 8 ||
          dataType == 15 ||
          dataType == 16
      ">
      <isChange v-if="dataType == 4"
                :change="true"></isChange>
      <bascInfo basicTitle="变更情况"
                :changeData="details.newData.memberVo"
                :changeTypes="changeTypes"></bascInfo>
      <explain></explain>
      <myBotton v-if="type == 'hasOper'" btnLeft="退回初审"
                btnRight="审批通过"></myBotton>
    </div>
    <div v-else-if="dataType == 10 || dataType == 11">
      <!-- <isChange v-if="dataType==7" :change="true"></isChange> -->
      <memberChange v-if="details.newData"
                    :newData="details.newData.memberRepInfoVo"
                    :oldData="details.oldData.memberRepInfoVo"></memberChange>
      <footNote v-if="type == 'hasOper'"
                :note.sync="formVO.note"></footNote>
      <explain v-else></explain>
      <myBotton v-if="type == 'hasOper'"
                btnLeft="退回初审"
                btnRight="审批通过"
                @rejectCheck="rejectCheck"
                @confirmCheck="confirmCheck"></myBotton>
    </div>
    <div v-else-if="dataType == 13">
     
      <feeStamp basicTitle="年费盖章" v-if="processName=='缴费签章'" :vipCost="vipCost"></feeStamp>
       <feeInfo basicTitle="缴费信息" v-else :vipCost="vipCost"></feeInfo>
       <myBotton v-if="type == 'hasOper'"
                btnLeft="退回初审"
                btnRight="审批通过"
                @rejectCheck="rejectCheck"
                @confirmCheck="confirmCheck"></myBotton>
    </div>
    <div v-else-if="dataType == 12">
      <activityInfo :mydata="details.newData.activityInfoVo"></activityInfo>
      <myBotton v-if="type == 'hasOper'"
                btnLeft="退回初审"
                btnRight="审批通过"
                @confirmCheck="confirmCheck"></myBotton>
    </div>
    <div v-else-if="dataType == 14">
      <footNote v-if="type == 'hasOper'"></footNote>
      <exitPaper></exitPaper>
      <footNoteCheck v-if="type != 'hasOper'"></footNoteCheck>
      <myBotton v-if="type == 'hasOper'"
                btnLeft="退回初审"
                btnRight="审批通过"
                @confirmCheck="confirmCheck"></myBotton>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
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
import isChange from "./component/isChange";
import myBotton from "./component/Botton";
import {formatWithSeperator as formatTime} from '@/utils/datetime.js'
export default {
  props: {},
  data() {
    return {
      changeList: {},
      changeTypes: [],
      stamp: true, // 是否签章
      firstConfirm: true, // 初步确认
      details: {},
      formVO: {
        note: "" // 补充说明
      },
      dataType: "",
      type: "",
      number: "",
      taskId: "",
      companyId:'',
      proData:[],//流程
      processName:'',
      vipCost:{}
    };
  },
  created() {
    this.dataType = this.$store.state.manage.passVal.dataType;
    console.log(this.dataType)
    this.type = this.$store.state.manage.passVal.type;
    this.number = this.$store.state.manage.passVal.number;
    this.taskId = this.$store.state.manage.passVal.taskId;
    this.companyId = this.$store.state.manage.passVal.companyId;
    this.$nextTick(() => {
      if (this.type == "hasOper") {
        this.$store.commit("setContainerFoot", true);
      } else {
        this.$store.commit("setContainerFoot", true);
      }
      this.getProcessList();
      this.$store.commit('setHeadTitle',this.$store.state.manage.passVal.title)
      // this.initPageInfo();
    });

    // if (this.$route.query.state == "deal") {
    //   this.lay = "detail";
    // }
  },
  methods: {
    initPageInfo() {
      let self = this;
      this.$api.manage.manageDetail({ serialNumber: self.number }).then(res => {
        if (res.success) {
          self.details = res.data;
        }
      });
    },
    getProcessList(){
      let self = this
      this.$api.manage.manageProcessList({serialNumber:self.number}).then(res=>{
        if(res.success){
          let list =  res.data;
          self.processName= list[list.length-1].name;
          if(self.processName=='年费核对'||self.processName=='缴费签章'||self.processName=='年费缴纳'||self.processName=='缴纳确认'||self.processName=='会员缴费'||self.processName=='确认书盖章'||self.processName=='缴费确认'||self.processName=='认定通过'){
             this.$api.manage.getVipCost({companyId:self.companyId}).then(res2=>{
               if(res2.success){
                 let vipCost = res2.data
                 vipCost.dateCycleStart=formatTime(vipCost.dateCycleStart,'-')
                 vipCost.dateCycleEnd=formatTime(vipCost.dateCycleEnd,'-')
                 self.vipCost = vipCost
               }
             })
          }
          self.proData = list;
          self.initPageInfo();
        }
      })
    },
    confirmCheck(res) {
      let self = this;
      let params = {
        inResultStr: !res.explain,
        taskId: this.taskId,
        serialNumber: this.number,
        explain: res.explain ? res.explain : null
      };
      //再通过会员代表的时候，需要判断说明有名有填写
      if (this.pageType == 5 || this.pageType == 6 || this.pageType == 7) {
        if (this.formVO.note) {
        }
      }
      this.$api.manage.manageOper(params).then(res => {
        if (res.success) {
          self.$message.success("操作成功！");
          self.$router.push("/approval/manager");
        }
      });
    },
    //拒绝
    rejectCheck() {},
    //获取信息变更
    getChangeList() {
      let self = this;
      let companyId = this.$store.state.manage.passVal.companyId;
      let list = [];
      let changeTypes = [];
      this.$api.member.adminInfoChangeList({ companyId }).then(res2 => {
        if (res2.success) {
          list = res2.data;
          list.filter((v, i) => {
            let name = "";
            if (v == 1 || v == 2) {
              name = "memberCompanyContactListVo";
            } else if (v == 3 || v == 4) {
              name = "memberCompanyVo";
            } else if (v == 5 || v == 6) {
              name = "memberShareHolderVo";
            } else if (v == 7 || v == 8) {
              name = "memberSeniorVos";
            } else if (v == 10 || v == 11) {
              name = "memberRepInfoVo";
            } else if (v == 15 || v == 16) {
              name = "memberRepInfoVo";
            }
            changeTypes.push(name);
          });
          self.changeTypes = changeTypes;
        }
      });
    }
  },
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
    activityInfo,
    myBotton
  }
};
</script>
