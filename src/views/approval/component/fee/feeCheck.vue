<template>
  <div class="check">
    <div class="table_title">会费核对</div>
    <div class="formBox">
      <el-form ref="form" :model="sizeForm" label-width="130px">
        <div class="text">
          系统将根据提交的会员信息自动计算入会会费，生成未盖章的缴费通知书，可根据需要手工调整
          <span class="blue">规则说明</span>
        </div>
        <el-form-item label="机构类型" class="mustFill">
          <el-select
            v-model="sizeForm.region"
            placeholder="请选择机构类型"
            class="selectWidth"
            :rules="[
                { required: true, message: '请选择机构类型', trigger: 'blur' }
            ]"
          >
            <el-option label="保险资产管理机构" value="shanghai"></el-option>
            <el-option label="保险资产管理机构" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <div class="text">机构类型将会决定会费基础计算规则</div>
        <el-form-item label="业务规模(亿元)" class="mustFill inputWidth">
          <el-input
            v-model="sizeForm.name"
            :rules="[
            { required: true, message: '请输入业务规模', trigger: 'blur' }
          ]"
          ></el-input>
        </el-form-item>
        <div class="text">系统将自动填入会员填写的业务规模字段（如果存在），可根据需要，修改为协会自行审定的业务规模作为计算参数</div>
        <el-form-item
          label="会费周期："
          class="mustFill"
          :rules="[
                { required: true, message: '请选择会费周期：', trigger: 'blur' }
            ]"
        >
          <el-date-picker
            v-model="sizeForm.dataTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <div class="text">系统将自动填入当前审批日期至当前年份最后一天作为会费周期</div>
        <el-form-item label="入会会费：" class="mustFill">
          <el-input
            v-model="sizeForm.fee"
            class="selectWidth mustFill"
            :rules="[
                { required: true, message: '请输入入会会费：：', trigger: 'blur' }
            ]"
          ></el-input>
          <el-button type="primary">自动计算</el-button>
        </el-form-item>
        <div class="text">点击自动计算，系统将综合以上机构类型/业务规模/会费周期根据规则计算出入会会费，可根据需要，自行调整</div>
        <el-form-item label="缴费通知书（未盖章）：" class="mustFill">
          <el-image :src="infoSrc"></el-image>
          <el-button type="primary" class="rebuild">重新生成</el-button>
          <span class="red">缴费通知书已过期，请点击重新生成</span>
        </el-form-item>
        <el-form-item size="large" style="text-align:right">
          <el-button>退回初审</el-button>
          <el-button type="primary">审批通过</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
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