<template>
  <div class="page-container">
    <component v-bind:is="comfirm"></component>
    <div class="vipMsg" v-if="loadType==2">
      <img src="@/assets/pic1.png" />
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
import Cookies from "js-cookie";
export default {
  data() {
    return {
      comfirm: "notConfirm",
      loadType:0,
    };
  },
  created() {
   
    // 解决回到顶部问题 不知道是否存在bug
    this.$nextTick(() => {
      this.$el.offsetParent.scrollTop = 0;
       let type = this.$route.query.type;
       let userType = sessionStorage.getItem("userType");
       if(userType*1 === 2){
         this.loadType=2;
         this.$api.role.getMemberStatus().then(res=>{
           if(res.success){
             let status = res.data
             if(status==1){
              //  this.comfirm = "passConfirm";
              this.$router.push("/users/userMsg");
             }else if(status==2){
               this.comfirm = "notConfirm";
             }else if(status==3){
               this.comfirm = "frozeAccount";
             }else if(status==4){
               this.comfirm = "retiredAcount";
             }else if(status==5){
               this.comfirm = "applyConfirm";
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
    managerSchedule
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