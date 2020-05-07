<template>
  <div class="check">
    <div class="formBox">
      <el-form ref="form" label-width="130px">
        <el-form-item label="名目：">{{form.payName}}</el-form-item>
        <el-form-item label="缴费通知书：">
          <el-image :src="infoSrc"></el-image>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="会费金额：">{{form.annualFee}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="周期：">{{format(form.dateCycleStart)}}到{{format(form.dateCycleEnd)}}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="缴费凭证：">
          <el-image style="width: 100px; height: 100px" :src="url" :preview-src-list="srcList"></el-image>
        </el-form-item>
        <el-form-item label="发票寄送信息：">
          <el-form-item label="收件人：">{{form.receiver}}</el-form-item>
          <el-form-item label="收件人手机：">{{form.mobileNum}}</el-form-item>
          <el-form-item label="收件地址：">{{form.address}}</el-form-item>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { apiShow } from "../../utils/commonApi";
import { format } from "../../utils/datetime";
import { pubParam } from "../../utils/common";

export default {
  props: { lay: { type: String, required: false, default: "" } },
  data() {
    return {
      infoSrc: "../../../static/certificate.png",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      ],
      form: {
        annualFee: "",
        dateCycleEnd: "",
        dateCycleStart: "",
        mobileNum: "",
        payName: "",
        receiver: ""
      }
    };
  },
  created() {
    apiShow("member", "servicePayDetail", { id: this.$route.query.rowId }).then(
      reslove => {
        this.form = reslove;
      }
    );
  },
  methods: {
    format,
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="less" scoped>
.check {
  // margin-top: 30px;
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