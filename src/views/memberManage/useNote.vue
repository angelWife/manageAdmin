<template>
  <div class="container">
    <div class="formMenu">
      <div class="menuBox">
        <div
          v-for="(item,ind) in leftMenu"
          :key="ind"
          class="item"
          :class="item.active?'active':''"
        >
          <router-link :to="item.path">{{item.name}}</router-link>
        </div>
      </div>
    </div>
    <div class="formModal">
      <div id="payNote">
        <h1 class="title">缴费记录</h1>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="businessFlow" label="业务流水"></el-table-column>
        <el-table-column prop="busName" label="名目"></el-table-column>
        <el-table-column prop="fund" label="金额"></el-table-column>
        <el-table-column prop="submitDate" label="提交时间">
          <template slot-scope="scope">{{format(scope.row.submitDate)}}</template>
        </el-table-column>
        <el-table-column prop="checkStatusVal" label="状态"></el-table-column>
        <el-table-column prop="invoiceStatusVal" label="发票寄送状态"></el-table-column>
        <el-table-column prop="act" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleCheck(scope.row)" type="text" size="mini">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageCSS"
        background
        layout="total,prev, pager, next"
        :total="pageAll.total"
        :page-size="pageAll.pageSize"
        :current-page.sync="pageAll.currentPage"
        @current-change="pageChange"
      ></el-pagination>
    </div>
    <Button :showEdit="false"></Button>
  </div>
</template>
<script>
import { apiShow, apiDic, backPage } from "../../utils/commonApi";
import Button from "./component/Button";
import { pubParam, pageTen } from "../../utils/common";
import { format } from "../../utils/datetime";

export default {
  data() {
    return {
      leftMenu: [
        {
          name: "会员基本信息",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#basicInfo"
        },
        {
          name: "入会申请书",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#applyBook"
        },
        {
          name: "公司基本信息",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#baseInfo"
        },
        {
          name: "联系人信息",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#userInfo"
        },
        {
          name: "会员代表",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#vipUser"
        },
        {
          name: "股东与高管",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#other"
        },
        {
          name: "业务信息",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#msgInfo"
        },
        {
          name: "会员证书",
          active: false,
          path: "/member/memberPaper"
        },
        { name: "变更记录", active: false, path: "/member/alterNote" },
        { name: "缴费记录", active: true, path: "/member/useNote" }
      ],
      tableData: [],
      pageAll: { ...pageTen }
    };
  },
  created() {
    this.displayNote(pubParam.page);
  },
  methods: {
    format,
    handleCheck(row) {
      this.$router.push({
        path: "/member/payDetails",
        query: {
          rowId: row.companyId
        }
      });
    },
    displayNote(param) {
      let idObj = {};
      let urlFun = "servicePayNote";
      if (sessionStorage.getItem("userType") == 1) {
        idObj = {
          id: sessionStorage.getItem("compid")
        };
        urlFun = "payNote";
        this.leftMenu.push({
          name: "拜访记录",
          active: false,
          id: "",
          path: "/member/visitNote"
        });
      }
      apiShow("member", urlFun, { ...idObj, ...param }).then(reslove => {
        this.tableData = reslove.rows;
        this.pageAll = backPage(reslove);
      });
    },
    pageChange(i) {
      this.displayNote({
        pageIndex: i,
        pageSize: pubParam.page.pageSize
      });
    }
  },
  components: {
    Button
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