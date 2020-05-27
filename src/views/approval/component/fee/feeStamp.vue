<template>
  <div class="check">
    <div class="table_title">{{basicTitle}}</div>
    <div class="formBox">
      <el-form ref="form" :model="sizeForm" label-width="130px">
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="名目">2019年费缴纳</el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构类型">{{vipCost.institutionTypeVal}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务规模(亿元)" class="inputWidth">{{vipCost.businessScale}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="会费周期：">{{vipCost.dateCycleStart}}到{{vipCost.dateCycleEnd}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入会会费(元)：">{{vipCost.dues}}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="缴费通知书（未盖章）：">
          <el-image :src="infoSrc"></el-image>
          <el-button type="primary" class="rebuild" @click="stampFile">电子盖章</el-button>
        </el-form-item>
        <!-- <el-form-item size="large" style="text-align:right">
          <el-button>驳回缴费初审</el-button>
          <el-button type="primary">审批通过</el-button>
        </el-form-item>-->
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    basicTitle: { type: String, required: true },
    vipCost: { vipCost: Object, required: true }
  },
  data() {
    return {
      infoSrc: "../../../static/certificate.png",
      sizeForm: {
        name: "",
        region: "",
        dataTime: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        fee: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    stampFile() {
      let routeData = this.$router.resolve({
        name: "Signature",
        query: { type: "member", filePath: "" }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>
<style lang="less" scoped>
.check {
  margin-top: 30px;
  background-color: #fff;
  .table_title {
    font-size: 16px;
    font-weight: 600;
    padding: 15px 30px;
    border-bottom: 1px solid #eee;
  }
  .formBox {
    padding: 30px;
    .text {
      color: #999;
      font-size: 14px;
      margin-bottom: 20px;
      span.blue {
        color: #1890ff;
      }
    }
    .rebuild {
      vertical-align: top;
    }
    span.red {
      color: red;
      vertical-align: top;
    }
  }
}
.selectWidth {
  width: 350px;
}
.inputWidth {
  width: 480px;
}
</style>