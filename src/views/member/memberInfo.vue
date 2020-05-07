<template>
  <div>
    <bascInfoEdit></bascInfoEdit>
    <Button :msgChange="true" :memberChange="true"></Button>
  </div>
</template>
<script>
import bascInfoEdit from "@/views/common/bascInfoEdit";
import Button from "./component/Botton";

export default {
  data() {
    return {};
  },
  components: {
    bascInfoEdit,
    Button
  }
};
</script>
<style lang="less" scoped>
</style>