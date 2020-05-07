<template>
  <div class="check">
    <div class="formBox">
      <el-form label-width="130px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称：">{{form.name}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动类型：">{{form.activityTypeVal}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="活动开始结束时间："
            >{{format(form.activityDateStart)}}到{{format(form.activityDateEnd)}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="活动报到开始结束时间："
            >{{format(form.checkInDateStart)}}到{{format(form.checkInDateEnd)}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="活动报名开始结束时间："
            >{{format(form.enrolDateStart)}}到{{format(form.enrolDateEnd)}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动地点：">{{form.address}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动人数：">{{form.activityPersonNum}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员单位允许报名人数：">{{form.organPersonNum}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="附件：">
              <span>说明.pdf</span>
              <a class="blue m-l-20 cur-pointer" :href="form.filePath">下载文件</a>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footBtnBox text_right">
      <el-button>取消</el-button>
      <el-button type="primary" @click="submitForm()">开始报名</el-button>
    </div>
  </div>
</template>
<script>
import { apiShow } from "../../utils/commonApi";
import { format } from "../../utils/datetime";

export default {
  props: { lay: { type: String, required: false, default: "" } },
  data() {
    return {
      form: {
        name: "",
        activityTypeVal: "",
        activityDateStart: "",
        activityDateEnd: "",
        checkInDateStart: "",
        checkInDateEnd: "",
        address: "",
        activityPersonNum: "",
        filePath: ""
      }
    };
  },
  created() {
    this.showView();
  },
  methods: {
    format,
    showView() {
      apiShow("member", "activityView", { id: this.$route.query.rowId }).then(
        reslove => {
          this.form = reslove;
        }
      );
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="less" scoped>
.check {
  // margin-top: 30px;
  height: 100%;
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
  .btm-box {
    text-align: center;
    margin-top: 60px;
  }
}
</style>