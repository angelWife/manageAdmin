<template>
  <div class="container">
    <div class="formMenu">
      <div class="menuBox">
        <div
          v-for="(item,ind) in leftMenu"
          :key="ind"
          class="item"
          :class="item.active?'active':''"
          @click="chooseMenu(ind)"
        >
          <a :href="item.id">{{item.name}}</a>
        </div>
      </div>
    </div>
    <div class="formModal">
      <div id="changeNote">
        <h1 class="title">变更记录</h1>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="busWater" label="业务流水"></el-table-column>
        <el-table-column prop="busType" label="业务类型"></el-table-column>
        <el-table-column prop="time" label="提交时间"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="act" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pageCSS" background layout="total,prev, pager, next" :total="85"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      leftMenu: [
        { name: "会员基本信息", active: false, id: "#basicInfo" },
        { name: "入会申请书", active: false, id: "#applyBook" },
        { name: "公司基本信息", active: false, id: "#baseInfo" },
        { name: "联系人信息", active: false, id: "#userInfo" },
        { name: "会员代表", active: false, id: "#vipUser" },
        { name: "股东与高管", active: false, id: "#other" },
        { name: "业务信息", active: false, id: "#msgInfo" },
        { name: "变更记录", active: true, id: "#changeNote" },
        { name: "缴费记录", active: false, id: "" }
      ],
      tableData: [
        {
          busWater: "RD0912019092603551",
          busType: "信息变更",
          time: "2019-12-12 12:12:12",
          state: "通过"
        },
        {
          busWater: "RD0912019092603551",
          busType: "信息变更(内部)",
          time: "2019-12-12 12:12:12",
          state: "通过"
        },
        {
          busWater: "RD0912019092603551",
          busType: "强制退会",
          time: "2019-12-12 12:12:12",
          state: "通过"
        },
        {
          busWater: "RD0912019092603551",
          busType: "强制退会",
          time: "2019-12-12 12:12:12",
          state: "通过"
        },
        {
          busWater: "RD0912019092603551",
          busType: "强制退会",
          time: "2019-12-12 12:12:12",
          state: "通过"
        },
        {
          busWater: "RD0912019092603551",
          busType: "强制退会",
          time: "2019-12-12 12:12:12",
          state: "通过"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  background-color: #fff;
  padding: 30px;
  height: 100%;
  width: 100%;
  .formMenu {
    width: 160px;
    .menuBox {
      position: fixed;
      width: 160px;
      border-right: 1px solid #d6d6d6;
    }
    .item {
      height: 50px;
      display: block;
      color: #666;
      text-align: right !important;
      line-height: 50px;
      border-right: 2px solid rgba(0, 0, 0, 0);
      position: relative;
      right: -1px;
      padding-right: 20px;
      font-size: 16px;
      cursor: pointer;
      a {
        display: block;
        height: 50px;
        color: #666;
      }
      &.active {
        border-right: 2px solid #409eff;
        a {
          color: #409eff;
        }
      }
    }
  }
  .formModal {
    margin-left: 160px;
    padding: 0 20px 0 40px;
    h1.title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .pageCSS {
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>