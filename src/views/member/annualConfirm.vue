<template>
  <div class="container">
    <div class="annualName">
      <span>年审名目：</span>
      <div class="confirm">
        <el-select v-model="name" placeholder="请选择" size="medium">
          <el-option
            v-for="item in nameList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="explain">请选择可参与的年审名目，仔细确认会员信息是否有变更，如有请同时对会员信息进行更新以便审核更新；处于审批中的名目可以在会员信息的变更记录中查询到</div>
      </div>
    </div>
    <div v-if="isExam && nameList.length > 0" class="infoMesg">
      <div class="title">是否有信息变更（包括基本信息&会员代表）：</div>
      <div class="choose">
        <el-radio v-model="radio" label="yes">有</el-radio>
        <el-radio v-model="radio" label="no">无</el-radio>
      </div>
    </div>
    <bascInfoEdit v-show="isExam & isChange && radio=='yes' && nameList.length > 0 " :isEdit="true" :msgChange="false" :memberChange="false"></bascInfoEdit>
    <Button v-if="isExam & isChange && nameList.length > 0" :msgChange="false" :memberChange="false"></Button>
  </div>
</template>
<script>
import bascInfoEdit from "@/views/common/bascInfoEdit";
import Button from "./component/Botton";
import {yearApproval,yearApprovalSubmit} from "../../http/moudules/member"
import {
  warnMES,
  successMES,
  
} from "../../utils/common";
export default {
  data() {
    return {
      name: "",
      radio: "no",
      isExam: true, // 是否年审
      isChange: true, // 是否变更
      nameList: []
    };
  },
  created() {
    // if (this.isChange) {
    //   this.radio = "yes";
    // } else {
    //   this.radio = "no";
    // }
    yearApproval().then(rep=>{
        if(rep && rep.code=='200'){
           this.nameList=rep.data || []
        }
    })
  },
  methods:{
      onSubmit(){
          if(!this.name){
            warnMES("请选择年审项目");
            return    
          }
          yearApprovalSubmit({id:this.name}).then(rep=>{
               if(rep && rep.code=='200'){
                  successMES("提交成功");
               }
          })
      }
  },
  components: {
    bascInfoEdit,
    Button
  }
};
</script>
<style lang="less" scoped>
.container {
  .annualName {
    background-color: #fff;
    padding: 30px;
    span {
      font-size: 16px;
      font-weight: 600;
      vertical-align: top;
      padding-right: 50px;
    }
    .confirm {
      width: 580px;
      display: inline-block;
      .explain {
        margin-top: 20px;
        color: #a2a2a2;
      }
    }
  }
  .infoMesg {
    background-color: #fff;
    padding: 30px;
    margin: 20px 0;
    .title {
      font-size: 16px;
      font-weight: 600;
      vertical-align: top;
      padding-right: 50px;
    }
    .choose {
      margin-top: 20px;
    }
  }
}
.el-select {
  width: 400px;
}
</style>