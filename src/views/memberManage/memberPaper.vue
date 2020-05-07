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
    <div class="content">
      <div class="desc">以下为协会认定的会员证书，所有证书拥有唯一会员代码，请慎重保管</div>
      <div class="btn">
        <el-button type="primary">下载</el-button>
        <el-button type="primary">打印</el-button>
      </div>
      <div class="demo-image__placeholder">
        <div class="block">
          <el-image :src="src"></el-image>
        </div>
      </div>
    </div>
    <Button :showEdit="false"></Button>
  </div>
</template>
<script>
import Button from "./component/Button";

export default {
  data() {
    return {
     
      leftMenu: [
        {
          name: "会员基本信息",
          active: false,
          id: "#basicInfo",
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#basicInfo"
        },
        {
          name: "入会申请书",
          active: false,
          id: "#applyBook",
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#applyBook"
        },
        {
          name: "公司基本信息",
          active: false,
          id: "#baseInfo",
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#baseInfo"
        },
        {
          name: "联系人信息",
          active: false,
          id: "#userInfo",
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#userInfo"
        },
        {
          name: "会员代表",
          active: false,
          id: "#vipUser",
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#vipUser"
        },
        {
          name: "股东与高管",
          active: false,
          id: "#other",
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#other"
        },
        {
          name: "业务信息",
          active: false,
          id: "#msgInfo",
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#msgInfo"
        },
        {
          name: "会员证书",
          active: true,
          id: "",
          path: "/member/memberPaper"
        },
        { name: "变更记录", active: false, path: "/member/alterNote" },
        { name: "缴费记录", active: false, path: "/member/useNote" },
        { name: "拜访记录", active: false, path: "/member/visitNote" }
      ],
      src: "../../../static/certificate.png"
    };
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
  padding: 50px;
  height: 100%;
  .formMenu {
    display: inline-block;
    vertical-align: top;
    width: 160px;
    height: 100%;
    .menuBox {
      position: fixed;
      border-right: 1px solid #d6d6d6;
    }
    .posit {
      position: absolute;
      width: 160px;
      left: 0;
      top: 25px;
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
  .content {
    display: inline-block;
    width: calc(100% - 170px);
    .desc {
      color: #666;
    }
    .btn {
      margin: 20px 0;
    }
  }
}
</style>