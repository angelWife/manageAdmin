<template>
  <div class="page-container">
    <component v-bind:is="comfirm"></component>
    <div class="vipMsg">
      <img v-if="showPic"  src="../../assets/pic1.png" />
    </div>
  </div>
</template>

<script>
import notConfirm from "./component/notConfirm";
import applyConfirm from "./component/applyConfirm";
import passConfirm from "./component/passConfirm";
import failConfirm from "./component/failConfirm";
import frozeAccount from "./component/frozeAccount";
import retiredAcount from "./component/retiredAcount";
import managerSchedule from "./component/managerSchedule";
import userMsg from "./component/userMsg";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      comfirm: "",
      loadType:0,
      showPic:false
    };
  },
  created() {
    // 解决回到顶部问题 不知道是否存在bug
    this.$nextTick(() => {
      this.$el.offsetParent.scrollTop = 0;
       let type = this.$route.query.type;
       let userType = sessionStorage.getItem("userType");
        if(this.userType!=1 &&this.userType!=2 &&this.comfirm!='userMsg'){
           this.showPic = true
        }
        
       if(userType*1 === 2){
         this.loadType = 2;
         this.$api.role.getMemberStatus().then(res=>{
           if(res.success){
             let status = res.data
             if(status==1){
              this.comfirm = "userMsg";/*passConfirm*/
             }else if(status==2){
               this.comfirm = "notConfirm";
             }else if(status==3){
               this.comfirm = "frozeAccount";
             }else if(status==4){
               this.comfirm = "retiredAcount";
             }else if(status==5){
              this.comfirm = "applyConfirm";
              //  this.$api.member.getMemberProcess().then(res=>{
              //     if(res.success&&res.data.needPayFee){
              //         this.comfirm = "passConfirm";
              //     }else{
              //         this.comfirm = "applyConfirm";
              //     }
              //   })

             }
           }
         })
       }else if(userType &&Number(userType)==1 ){
              this.comfirm="managerSchedule";
              this.loadType=1;
       }

    });
    
  },
  components: {
    notConfirm,
    applyConfirm,
    passConfirm,
    failConfirm,
    frozeAccount,
    retiredAcount,
    managerSchedule,
    userMsg
  }
};
</script>

<style lang="less">
.vipMsg {
  background: #fff;
  padding: 20px;
  img {
    width: 100%;
  }
}
</style>
