<template>
  <div>
    <el-table class="mytable" :data="approData" style="width: 100%;padding:30px 0">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="institutionTypeVal" label="机构类型" width align="center"></el-table-column>
      <el-table-column prop="companyName" label="会员机构" align="center"></el-table-column>
      <el-table-column prop="businessScale" label="业务规模(万元)" align="center"></el-table-column>
      <el-table-column prop="feeStandard" label="年费标准" align="center"></el-table-column>
      <el-table-column prop="publishStatusVal" label="状态" align="center"></el-table-column>
      <el-table-column label="操作" prop="act" min-width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.publishStatus == 2">
            <el-button size="small">查看</el-button>
          </span>
          <span v-else>
            <el-button type="primary" size="small">提交</el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑标准</el-button>
            <el-button size="small">查看</el-button>
            <el-button size="small" @click="handleDelte(scope.row.id)">删除</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑年费 -->
    <el-dialog title="编辑年费" :visible.sync="feeVisible" width="55%">
      <el-form :model="feeData" label-width="160px" :rules="feeDataRules" ref="feeDataForm">
        <el-form-item label="机构类型：" prop="type">
          <el-select v-model="feeData.type" disabled placeholder="请选择">
            <el-option v-for="item in orgList" :key="item.id" :value="item.dictVal"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务规模(亿元)：" prop="dimension">
          <el-input
            v-model="feeData.dimension"
            placeholder="请输入"
            style="width:80%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="会费周期：" prop="timeRange">
          <el-date-picker
            v-model="feeData.timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            disabled
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>`
        <el-form-item label="年费标准：" prop="standard">
          <el-input
            v-model="feeData.standard"
            placeholder="请输入"
            autocomplete="off"
            style="width:80%"
          ></el-input>
          <el-button type="primary">自动计算</el-button>
        </el-form-item>
        <el-form-item label="缴费通知书(未盖章)：">
          <img src="../../../../../static/smallCer.png" />
          <el-button type="primary" style="vertical-align: top;">重新生成</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="feeVisible = false">取消</el-button>
        <el-button type="primary" @click="submitFee('feeDataForm')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  pubParam,
  warnMES,
  tipMES,
  successMES,
  apiSelect,
  selectType,
  dataTime
} from "@/utils/common";
import { format } from "@/utils/datetime";
export default {
  props: {
    approData: { type: Array, required: true },
    displayCal: {
      type: Function,
      required: true
    },
    status: { type: String, required: true }, // 审核状态
    headQuery: { type: Object, required: false }
  },
  data() {
    return {
      feeVisible: false,
      feeData: {},
      orgList: [],
      rowId: 0,
      feeDataRules:{
         standard: [
            { required: true, message: '请输入机构类型', trigger: 'blur' },
          ],
          dimension: [
            { required: true, message: '请输入业务规模', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请输入会费周期', trigger: 'blur' },
          ],
          timeRange: [
            { required: true, message: '请输入年费标准', trigger: 'blur' },
          ],
          
      }
    };
  },
  created() {
    apiSelect({ type: 1 }, this.orgList);
  },
  methods: {
    handleDelte(id) {
      this.$api.member
        .deleteCalcu({
          id: id
        })
        .then(res => {
          if (res.success) {
            tipMES("删除成功");
            this.displayCal(
              {
                ...pubParam.page,
                checkStatus: this.status,
                payFeeId: Number(this.$route.query.payFeeId),
                institutionName: this.headQuery.orgnize,
                institutionType: selectType(
                  this.headQuery.orgType,
                  this.orgList
                )
              },
              this.approData
            );
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleEdit(row) {
      this.rowId = row.id;
      this.feeVisible = true;
      this.$api.member
        .viewCalcu({
          payId: Number(this.$route.query.payFeeId),
          id: row.id
        })
        .then(res => {
          if (res.success) {
            const data = res.data;
            this.feeData = {
              standard: data.annualFee,
              dimension: data.businessScale,
              type: data.institutionTypeVal,
              timeRange: [
                format(data.dateCycleStart),
                format(data.dateCycleEnd)
              ]
            };
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    submitFee(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
              this.feeVisible = false;
              this.$api.member
                .editCalcu({
                  annualFee: this.feeData.standard,
                  businessScale: this.feeData.dimension,
                  companyId: "",
                  path: "111",
                  payId: Number(this.$route.query.payFeeId),
                  id: this.rowId
                })
                .then(res => {
                  if (res.success) {
                    successMES("编辑成功");
                    this.displayCal(
                      {
                        ...pubParam.page,
                        checkStatus: this.status,
                        payFeeId: Number(this.$route.query.payFeeId)
                      },
                      this.approData
                    );
                  } else {
                    warnMES(res.message);
                  }
                })
                .catch(error => {
                  console.error(error);
                });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     
    }
  }
};
</script>
<style lang="less" scoped>
.el-table::before {
  height: 0;
}
.el-range-editor.el-input__inner,
.el-select {
  width: 80%;
}
</style>