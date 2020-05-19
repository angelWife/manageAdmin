<template>
  <div>
    <el-table class="mytable" :data="approData" style="width: 100%;padding:30px 0">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="institutionTypeVal" label="机构类型" width align="center"></el-table-column>
      <el-table-column prop="companyName" label="会员机构" align="center"></el-table-column>
      <el-table-column prop="businessScale" label="业务规模(万元)" align="center"></el-table-column>
      <el-table-column prop="feeStandard" label="年费标准" align="center"></el-table-column>
      <el-table-column prop="checkStatusVal" label="状态" align="center"></el-table-column>
      <el-table-column label="操作" prop="act" min-width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.publishStatus == 2">
            <el-button size="small" @click="handleEdit(scope.row,1)">查看</el-button>
          </span>
          <span v-else>
            <el-button type="primary" size="small">提交</el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope.row,2)">编辑标准</el-button>
            <router-link to="/member/yearCost">
                 <el-button size="small" >查看</el-button>
            </router-link>
            <el-button size="small" @click="handleDelte(scope.row.orgId)">删除</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑年费 -->
    <el-dialog title="编辑年费" :visible.sync="feeVisible" width="55%">
      <el-form :model="feeData" label-width="160px" :rules="feeDataRules" ref="feeDataForm">
        <el-form-item label="机构类型：" prop="type">
          
          <el-select v-model="feeData.type"  placeholder="请选择">
            <el-option v-for="item in orgList" :key="item.id" :value="item.dictKey" :label="item.dictVal"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务规模(亿元)：" prop="dimension">
          <el-input
            v-model="feeData.dimension"
            placeholder="请输入"
            style="width:80%"
            autocomplete="off"
            type="number"
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
          <el-button type="primary" @click="autoCalc">自动计算</el-button>
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
    <!--查看年费 -->
    <el-dialog title="查看年费" :visible.sync="lookfeeVisible" width="55%">
      <el-form :model="feeData" label-width="160px"  ref="feeDataForm">
        <el-form-item label="机构类型："  prop="type">
          <el-select v-model="feeData.type"  disabled placeholder="请选择">
            <el-option v-for="item in orgList" :key="item.id" :value="item.dictKey" :label="item.dictVal"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务规模(亿元)：" prop="dimension">
          <el-input
            disabled
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
            disabled
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>`
        <el-form-item label="年费标准：" prop="standard">
          <el-input
            disabled
            v-model="feeData.standard"
            placeholder="请输入"
            autocomplete="off"
            style="width:80%"
          ></el-input>
          
        </el-form-item>
        <el-form-item label="缴费通知书(未盖章)：">
          <img src="../../../../../static/smallCer.png" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lookfeeVisible = false">关闭</el-button>
        
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
import { yearCostAutoCalc } from "@/http/moudules/member";
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
      lookfeeVisible: false,
      feeData: {},
      orgList: [],
      rowId: 0,
      feeDataRules: {
        standard: [
          { required: true, message: "请输入年费标准", trigger: "blur" }
        ],
        dimension: [
          { required: true, message: "请输入业务规模", trigger: "blur" }
        ],
        type: [{ required: true, message: "请输入会费周期", trigger: "blur" }],
        timeRange: [
          { required: true, message: "请输入年费标准", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    apiSelect({ type: 1 }, this.orgList);
  },
  methods: {
    autoCalc() {
      if (!this.feeData.dimension) {
        warnMES("请输入业务规模");
        return;
      }
      yearCostAutoCalc({
        businessScale: this.feeData.dimension,
        companyId: this.feeData.companyId,
        year: this.feeData.year
      }).then(rep => {
        if (rep && rep.code == "200") {
          this.feeData.standard = rep.data || 0;
        }
      });
    },
    goToProcess() {
      this.$router.push({ path: "/member/yearCost" });
    },
    handleDelte(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(row, type) {
      this.rowId = row.orgId;
      if (type == 2) {
        this.feeVisible = true;
      } else if (type == 1) {
        this.lookfeeVisible = true;
      }

      this.$api.member
        .viewCalcu({
          payId: Number(this.$route.query.payFeeId),
          orgId: row.orgId
        })
        .then(res => {
          if (res.success) {
            const data = res.data;
            this.feeData = {
              standard: data.annualFee,
              dimension: data.businessScale,
              type: data.institutionType,
              year: data.year,
              companyId: data.companyId,
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
      this.$refs[formName].validate(valid => {
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
          console.log("error submit!!");
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