<template>
  <div class="inner">
    <el-row class="showData">
      <el-col :span="8">
        <div class="grid-content bd-r">
          <div class="title">已通过</div>
          <div class="number">71/100</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bd-r">
          <div class="title">审批中</div>
          <div class="number">12</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="title">已驳回/已中止</div>
          <div class="number">3</div>
        </div>
      </el-col>
    </el-row>
    <div class="mintorDesc">
      <el-row>
        <el-col :span="8">
          <div>
            <span>机构类型：</span>
            <el-select placeholder="请选择" v-model="orgType">
              <el-option v-for="item in orgList" :key="item.id" :value="item.dictKey" :label="item.dictVal"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>会员机构：</span>
            <el-input placeholder="请输入" v-model="organize" class="input_style"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="btn_content">
        <el-col :span="12">
          <el-button type="primary">导出</el-button>
          <el-button type="primary">全体缴费通知</el-button>
          <el-button type="primary">批量缴费通知</el-button>
        </el-col>
        <el-col :span="12" class="text_right">
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="全部" name="all">
          <payTable :monitorData="monitorAll"></payTable>
        </el-tab-pane>
        <el-tab-pane label="待缴费" name="confirm">
          <payTable :monitorData="monitorConfirm"></payTable>
        </el-tab-pane>
        <el-tab-pane label="已缴费" name="payed">
          <payTable :monitorData="monitorPay"></payTable>
        </el-tab-pane>
        <el-tab-pane label="已驳回" name="reject">
          <payTable></payTable>
        </el-tab-pane>
        <el-tab-pane label="已中止" name="chief">
          <payTable></payTable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import payTable from "./component/table/payTable";
import {
  warnMES,
  successMES,
  apiSelect
} from "../../utils/common";
export default {
  data() {
    return {
      activeName: "all",
      organize: "",
      orgType: "",
      orgList: [],
      monitorAll: [
        {
          busFlow: "JF0912019092603551",
          orgType: "保险集团",
          name: "深圳前海基础设施投资基金管理有限公司",
          state: "会员确认",
          isChange: "是"
        },
        {
          busFlow: "JF0912019092603551",
          orgType: "保险集团",
          name: "国寿股权投资有限公司",
          state: "会员确认",
          isChange: "是"
        },
        {
          busFlow: "JF0912019092603551",
          orgType: "保险集团",
          name: "国寿股权投资有限公司",
          state: "已驳回",
          isChange: "否"
        },
        {
          busFlow: "JF0912019092603551",
          orgType: "保险集团",
          name: "国寿股权投资有限公司",
          state: "会员确认",
          isChange: "是"
        }
      ],
      monitorConfirm: [
        {
          busFlow: "SS0912019092603551",
          orgType: "保险集团",
          name: "美世（中国）有限公司",
          state: "会员确认",
          isChange: "是"
        },
        {
          busFlow: "SS0912019092603551",
          orgType: "保险集团",
          name: "美世（中国）有限公司",
          state: "会员确认",
          isChange: "是"
        }
      ],
      monitorPay: [
        {
          busFlow: "ff0912019092603551",
          orgType: "证券",
          name: "联储证券有限责任公司",
          state: "会员确认",
          isChange: "是"
        },
        {
          busFlow: "ff0912019092603551",
          orgType: "证券",
          name: "联储证券有限责任公司",
          state: "会员确认",
          isChange: "是"
        }
      ]
    };
  },
  methods: {

  },
  created(){
     apiSelect({ type: 1 }, this.orgList); //机构类型
  },
  components: { payTable }
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.inner {
  margin-top: 20px;
  height: 100%;
  .showData {
    padding: 30px;
    background-color: #fff;
    .grid-content {
      line-height: 30px;
      .title {
        text-align: center;
        color: #999;
      }
      .number {
        text-align: center;
        font-weight: 500;
        font-size: 20px;
      }
    }
    .bd-r {
      border-right: 1px solid #ccc;
    }
  }
  .mintorDesc {
    margin-top: 30px;
    padding: 30px;
    background-color: #fff;
    height: 100%;
    .input_style,
    .el-select {
      width: calc(100% - 180px);
    }
  }
}
</style>