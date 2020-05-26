<template>
  <div class="container comModal">
    <div>
      <el-steps direction="vertical" :active="2">
        <el-step v-for="(item,ind) in procVO.taskDTOList" :key="ind" :title="item.name" :description="item.createDate" status="finish" process-status="finish"></el-step>
      </el-steps>
      
    </div>
    <div v-if="procVO.needPayFee" class="btnBox">
        <ElButton type="primary" @click="payCost">缴纳会费</ElButton>
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      procVO:{}
    }
  },
  created() {
    this.$api.member.getMemberProcess().then(res=>{
      if(res.success){
        this.procVO = res.data
      }
    })
  },
  methods: {
    payCost(){
      let _data = this.procVO.taskDTOList[this.procVO.taskDTOList.length-1];
      this.$router.push({path: '/users/costInfo',query:{taskId: _data.taskId,serialNumber: this.procVO.serialNumber,}})
    }
  }
};
</script>

<style lang="less">
.container{
  padding:20px 40px;
  height:auto;
  .btnBox{
    padding:30px;
    text-align: center;
  }
}
</style>