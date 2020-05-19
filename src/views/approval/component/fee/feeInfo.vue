<template>
  <div class="check">
    <div class="table_title">{{basicTitle}}</div>
    <div class="formBox">
      <el-form ref="form"
               :model="sizeForm"
               label-width="130px">
        <!-- <el-form-item label="名目：">2019年费缴纳</el-form-item> -->
        <el-form-item label="缴费通知书（未盖章）：">
          <el-image :src="infoSrc"></el-image>
        </el-form-item>
        <!-- <el-form-item label="缴费通知书：：">
          <el-image :src="infoSrc"></el-image>
        </el-form-item>-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="会费周期：">{{vipCost.dateCycleStart}}到{{vipCost.dateCycleEnd}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入会会费(元)：">{{vipCost.dues}}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="缴费凭证：">
          <el-image style="width: 100px; height: 100px"
                    :src="url"
                    :preview-src-list="srcList"></el-image>
        </el-form-item>
        <el-form-item label="发票接收人：">{{vipCost.name?vipCost.name:'--'}}</el-form-item>
        <el-form-item label="接收人手机：">{{vipCost.phone?vipCost.phone:'--'}}</el-form-item>
        <el-form-item label="接收人地址：">{{vipCost.address?vipCost.address:'--'}}</el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    basicTitle: { type: String, required: true },
    lay: { type: String, required: false, default: "" },
    vipCost: { vipCost: Object, required: true }
  },
  data() {
    return {
      infoSrc: "../../../static/certificate.png",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      ],
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