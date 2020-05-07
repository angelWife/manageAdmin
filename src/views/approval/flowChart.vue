<template>
  <div class="container flowchart">
    <el-button class="backBtn" type="primary" @click="back">返回</el-button>
    <img :src="url"/>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      url:''
    };
  },
  created() {
    this.$nextTick(()=>{
      this.getImg()
    })
  },
  destroyed() {
    this.url = ''
  },
  methods: {
    back(){
      window.history.back(-1);
    },
    getImg(){
      let self = this
      this.$api.manage.manageImgUrl({processInstanceId :this.$store.state.manage.processId}).then(res=>{
        if(res.success){
          self.url = res.data+'?radom='+new Date().getTime()
        }
      })
    }
  },
}
</script>
<style lang="less">
  .flowchart {
  text-align: center;
  min-height:100%;
  .backBtn{
    position:absolute;
    top:20px;
    right:20px;
  }
}
</style>