<template>
  <div class="check">
    <div class="formBox">
      <el-form ref="form" label-width="130px">
        <el-form-item label="缴费名目：">
          <el-select v-model="feeName" placeholder="请选择" size="medium" @change="nameSelect">
            <el-option v-for="item in nameList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <div class="nameTip" v-show="!form.show">请选择可参与的缴费名目，完成相应缴费并上传凭证，如有已提交名目可以在会员信息的变更记录中查询到详情</div>
        <div v-show="form.show">
          <el-form-item label="缴费通知书：">
            <el-image :src="infoSrc"></el-image>
          </el-form-item>
          <el-form-item label="周期：">{{format(form.dateCycleStart)}}至{{format(form.dateCycleEnd)}}</el-form-item>
          <el-form-item label="会费金额：">{{form.annualFee}}</el-form-item>
          <el-form-item label="缴费凭证：">
            <el-image :src="url" :preview-src-list="srcList"></el-image>
            <div>完成转账后请上传银行转账凭据用于审批：</div>
            <el-upload
              class="upProof"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :auto-upload="false"
              accept=".jpg, .jpeg, .png, .pdf, .JPG, .JPEG, .PNG, .PDF"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}" class="scalePic">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              </div>
            </el-upload>
            <div style="color:#999">支持JPG/PNG/PDF格式</div>
          </el-form-item>
          <el-form-item label="发票寄送信息：">
            <el-form-item class="m-b-22" label="收件人：">
              <el-input placeholder="请输入内容" v-model="bill.receiver" class="w-input"></el-input>
            </el-form-item>
            <el-form-item class="m-b-22" label="收件人手机：">
              <el-input placeholder="请输入内容" v-model="bill.mobileNum" class="w-input"></el-input>
            </el-form-item>
            <el-form-item class="m-b-22" label="收件地址：">
              <el-input
                placeholder="请输入内容"
                type="textarea"
                v-model="bill.address"
                :rows="2"
                class="w-input"
              ></el-input>
            </el-form-item>
          </el-form-item>
        </div>
        <div class="suggest" v-show="form.show">
          <div class="head">说明</div>
          <div class="title">会费金额</div>
          <div class="content">会费金额综合会员单位的各方面情况计算得出，入会会费周期为会员认定申请日起至当年最后一天</div>
          <div class="title">缴费凭证</div>
          <div class="content">使用线下支付请通过系统提供的转账信息，经由工作人员确认后进入到流程下一步</div>
          <div class="title">社会团体会费票据</div>
          <div class="content">
            根据财务票据管理办法，会费缴纳将使用社会团体会费票据作为发票报销凭证，该票据将在缴费确认后由工作人员专门寄出，
            <span
              style="color:#1890ff"
            >发票样式参考</span>
          </div>
        </div>
        <div class="suggest" v-show="!form.show">
          <div class="head">说明</div>
          <div class="title">会费金额</div>
          <div class="content">会费金额综合会员单位的各方面情况计算得出，入会会费周期为会员认定申请日起至当年最后一天</div>
          <div class="title">缴费凭证</div>
          <div class="content">使用线下支付请通过系统提供的转账信息，经由工作人员确认后进入到流程下一步</div>
        </div>
        <div class="btn-box footBtnBox">
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  apiDic,
  apiShow,
  apiOperate,
  backPage,
  hasPage
} from "../../utils/commonApi";
import { pageTen, pubParam, apiSelect } from "../../utils/common";
import { format } from "../../utils/datetime";

export default {
  props: { lay: { type: String, required: false, default: "" } },
  data() {
    return {
      infoSrc: "../../../static/certificate.png",
      url: "../../../static/proof.png",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      ],
      isWrite: true, // 是否录入新一年的年费
      form: {
        dateCycleEnd: "",
        dateCycleStart: "",
        annualFee: "",
        show: false
      },
      bill: {
        receiver: "",
        mobileNum: "",
        address: ""
      },
      feeName: "",
      nameList: [],
      memberPayId: ""
    };
  },
  created() {
    apiDic("feeName", {}).then(reslove => {
      this.nameList = reslove;
    });
  },
  methods: {
    format,
    nameSelect(v) {
      this.memberPayId = v;
      apiShow("member", "servicePayDetail", { id: v }).then(reslove => {
        this.form = {
          dateCycleEnd: reslove.dateCycleEnd,
          dateCycleStart: reslove.dateCycleStart,
          annualFee: reslove.annualFee,
          show: true
        };
      });
    },
    onSubmit() {
      apiOperate(
        "member",
        "addBill",
        {
          memberPayId: this.memberPayId,
          ...this.bill
        },
        "",
        "提交成功"
      );
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(file.type);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="less" scoped>
.check {
  position: relative;
  background-color: #fff;
  .table_title {
    font-size: 16px;
    font-weight: 600;
    padding: 15px 30px;
    border-bottom: 1px solid #eee;
  }
  .formBox {
    padding: 30px;
    .nameTip {
      padding-left: 130px;
      color: #8d8d8d;
      padding-bottom: 20px;
      border-bottom: 1px solid #dcdfe6;
      margin-bottom: 30px;
    }
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
    .scalePic {
      img {
        width: auto;
        height: auto;
      }
    }
    .btn-box {
      position: fixed;
      bottom: 20px;
      right: 35px;
      z-index: 12;
    }
    .suggest {
      .head {
        font-size: 14px;
        color: #8d8d8d;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .title {
        font-size: 14px;
        color: #8d8d8d;
        font-weight: 600;
      }
      .content {
        font-size: 14px;
        color: #8d8d8d;
        margin-bottom: 20px;
      }
    }
  }
}
.selectWidth {
  width: 350px;
}
.inputWidth {
  width: 480px;
}
.el-form-item .m-b-22 {
  margin-bottom: 22px;
  .w-input {
    width: 320px;
  }
}
</style>