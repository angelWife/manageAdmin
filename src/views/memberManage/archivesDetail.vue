<template>
  <div class="container">
    <bascInfoEdit :showEditBtn="false"></bascInfoEdit>
    <Button ></Button>
  </div>
</template>
<script>
import bascInfoEdit from "@/views/common/bascInfoEdit";
import Button from "./component/Button";

export default {
  data() {
    return {
      
    };
  },
  methods:{
    updateEidtBtnStatus(){

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
  background-color: #fff;
}
</style>