<template>
  <div class="container">
    <div class="table_title">{{basicTitle}}</div>
    <div class="appyVip comModal"
         id="manageInfo">
      <div class="flex">
        <div class="formMenu">
          <div class="" :class="topFixed?'menuBox menuBoxFixed':'menuBox'">
            <div v-for="(item,ind) in leftMenu"
                 :key="ind"
                 class="item"
                 :class="item.active?'active':''"
                 @click="chooseMenu(ind)">
              <a :href="item.id">{{item.name}}</a>
            </div>
          </div>
        </div>
        <div class="flex-1 formModal" ref="pronbit">
          <div class="formBox"
               id="applyBook">
            <div class="title">
              <span class="text">入会申请书</span>
            </div>
            <div class="formMain fileName">
              {{fileName}}
              <a :href="fileUrl">下载</a>
             <!-- <el-form :model="showData"
                       label-width="120px"
                       label="left">
                <el-form-item label="入会申请书.doc"
                              class="m-t-20">

                  <div class="float-left blue m-l-20 cur-pointer"
                       @click="getFils()">下载</div>
                </el-form-item>
              </el-form> -->
            </div>
          </div>
          <div class="formBox"
               id="baseInfo">
            <div class="title">
              <span class="text">公司基本信息</span>
            </div>
            <div class="formMain">
              <el-form ref="form"
                       :model="showData"
                       label="left">
                <el-row class="m-t-20">
                  <el-col :span="10">
                    <el-form-item label="机构类型：">{{showData.memberCompanyVo.institutionTypeVal}}</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="统一社会信用代码：">{{showData.memberCompanyVo.creditId}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="名称：">
                      {{showData.memberCompanyVo.companyName}}
                      <span class="icon"
                            v-if="!!showData.memberCompanyVo.companyName">
                        <el-tooltip popper-class="toolBox"
                                    effect="light"
                                    placement="right-end">
                          <div slot="content">变更前：{{showData.memberCompanyVo.companyName}}</div>
                          <i class="el-icon-warning"></i>
                        </el-tooltip>
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="英文名称：">{{showData.memberCompanyVo.companyNameEng}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="公司类型：">{{showData.memberCompanyVo.companyTypeVal}}</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="成立日期："
                                  prop="data1">{{showData.memberCompanyVo.dateBuild}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="是否上市：">{{showData.memberCompanyVo.flagListedVal}}</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上市地：">{{showData.memberCompanyVo.listAddress}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="注册地址：">{{showData.memberCompanyVo.registeredAddress}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="办公地址：">{{showData.memberCompanyVo.workAddress}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="法人代表：">{{showData.memberCompanyVo.legalRepresentative}}</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="注册资本(万元)：">
                      {{showData.memberCompanyVo.registeredCapital}}
                      <span class="icon"
                            v-if="!!showData.memberCompanyVo.registeredCapital">
                        <el-tooltip popper-class="toolBox"
                                    effect="light"
                                    placement="right-end">
                          <div slot="content">变更前：{{showData.memberCompanyVo.registeredCapital}}</div>
                          <i class="el-icon-warning"></i>
                        </el-tooltip>
                      </span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="营业执照：">
                      <img class="avatar"
                           :src="showData.memberCompanyVo.imgPathLicence" />

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="经营业务许可证：">
                      <img class="avatar"
                           v-for="(item,ind) in showData.memberCompanyVo.imgPathBusinessList"
                           :key="ind"
                           :src="item" />
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </div>
          </div>
          <div class="formBox"
               id="userInfo"
               v-if="showData.memberCompanyContactListVo">
            <div class="title">
              <span class="text">联系人信息</span>
              <span class="icon">
                <i class="el-icon-warning"></i>
              </span>
            </div>
            <div class="formMain">

              <div class="tableBox">
                <div class="ctitle">改动后:</div>
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th>联系人姓名</th>
                      <th>职务</th>
                      <th>办公电话</th>
                      <th>手机</th>
                      <th>传真</th>
                      <th>邮箱</th>
                      <th>备用邮箱</th>
                      <th>通讯地址</th>
                      <th>微信号</th>
                      <th>身份证</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in showData.memberCompanyContactListVo"
                        :key="ind">
                      <td>
                        <span v-if="item.default">(默认)</span>
                        {{item.contactName}}
                      </td>
                      <td>{{item.duty}}</td>
                      <td>{{item.officePhoneNum}}</td>
                      <td>{{item.mobileNum}}</td>
                      <td>{{item.fax}}</td>
                      <td>{{item.mailAddress}}</td>
                      <td>{{item.standbyMail}}</td>
                      <td>{{item.contactAddress}}</td>
                      <td>{{item.weChatNum}}</td>
                      <td>{{item.userID}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="formBox"
               id="other"
               v-if="showData.memberShareHolderVo">
            <div class="title">
              <span class="text">股东与高管</span>
            </div>
            <div class="formMain">
              <div class="tableBox">
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th>股东名称</th>
                      <th>持股比例(%)</th>
                      <th>认缴出资比例(%)</th>
                      <th>股东类型</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in showData.memberShareHolderVo"
                        :key="ind">
                      <td>{{item.shareholderName}}</td>
                      <td>{{item.shareholdingRatio}}%</td>
                      <td>{{item.chuziRatio }}%</td>
                      <td>{{item.shareholderTypeVal }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tableBox">
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th>高管姓名</th>
                      <th>性别</th>
                      <th>职务</th>
                      <th>民族</th>
                      <th>出生年月</th>
                      <th>最高学历</th>
                      <th>任职时间</th>
                      <th>分管部门</th>
                      <th>办公电话</th>
                      <th>邮箱</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in showData.memberSeniorVos"
                        :key="ind">
                      <td>{{item.seniorName}}</td>
                      <td>{{item.sexVal}}</td>
                      <td>{{item.duties}}</td>
                      <td>{{item.nation}}</td>
                      <td>{{item.birth}}</td>
                      <td>{{item.highestEducationVal}}</td>
                      <td>{{item.appointTime}}</td>
                      <td>{{item.departInCharge}}</td>
                      <td>{{item.officerPhone}}</td>
                      <td>{{item.mail}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="formBox"
               id="msgInfo"
               v-if="showData.commonMemberBusinessVo">
            <div class="title">
              <span class="text">业务信息</span>
            </div>
            <div class="formMain">
              <el-form :model="showData"
                       label-width="160px"
                       label="left">
                <div class="title">资格信息</div>
                <el-row class="m-t-20">
                  <el-col :span="12">
                    <el-form-item label="资格信息：">
                      <span v-for="(item,ind) in showData.commonMemberBusinessVo.qualificationTypeIds"
                            :key="ind">
                        {{ind==0?item.qualificationTypeVal:','+item.qualificationTypeVal}}
                      </span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="备注：">{{showData.commonMemberBusinessVo.qualiRemark}}</el-form-item>
                  </el-col>
                </el-row>
                <div class="title">规模信息</div>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="上年度末受托管理保险资金（亿元):">{{showData.commonMemberBusinessVo.yearInsureFund}}</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上年度末受托管理规模总计（亿元）：">{{showData.commonMemberBusinessVo.yearTotalFund}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="上年度末受托管理非保险资金（亿元）：">{{showData.commonMemberBusinessVo.yearInsureFundNot}}</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上年度末委托投资规模（亿元）：">{{showData.commonMemberBusinessVo.yearInvestment}}</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="备注：">{{showData.commonMemberBusinessVo.scaleRemark  }}</el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div class="title">部门信息</div>
              <div class="tableBox">
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th>资管部门名称</th>
                      <th>人员数量</th>
                      <th>部门负责人</th>
                      <th>办公电话</th>
                      <th>手机</th>
                      <th>邮箱</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in showData.commonMemberBusinessVo.departmentInfoList"
                        :key="ind">
                      <td>{{item.departmentName}}</td>
                      <td>{{item.personNum}}</td>
                      <td>{{item.departHeader}}</td>
                      <td>{{item.officePhone}}</td>
                      <td>{{item.mobilePhone}}</td>
                      <td>{{item.email}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setImgUrl } from "../../../utils/common";
import { mapState } from "vuex";
export default {
  props: {
    basicTitle: { type: String, required: true },
    fileList: [
      {
        name: "food.jpeg",
        url:
          "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      },
      {
        name: "food2.jpeg",
        url:
          "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      }
    ],
    changeData: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      imageUrl: "../../../static/busPic.png",
      rejectVisible: false,
      companyId: null,
      showData: {
        memberCompanyVo: {},
        memberCompanyContactListVo: {},
        memberRepInfoVo: {},
        memberShareHolderVo: {},
        memberSeniorVos: {},
        commonMemberBusinessVo: {},
        memberPayVo: {}
      },
      filePath: "",
      fileName:'',
      fileUrl:'',
      topFixed:false,
      leftMenu: [
        { name: "入会申请书", active: true, id: "#applyBook" },
        { name: "公司基本信息", active: false, id: "#baseInfo" },
        { name: "联系人信息", active: false, id: "#userInfo" },
        { name: "会员代表", active: false, id: "#vipUser" },
        { name: "股东与高管", active: false, id: "#other" },
        { name: "业务信息", active: false, id: "#msgInfo" }
      ]
    };
  },

  created() {
    this.companyId = this.$store.state.manage.passVal.companyId;
    this.getBaseInfo();
    this.getFils()
  },
  mounted () {
    var that = this
    window.addEventListener('scroll', that.handleScroll,true)
  },
  destroyed () {//离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', this.handleScroll,false)
  },
  methods: {
    handleScroll () {
      var that = this
     
      if(that.$refs.pronbit.getBoundingClientRect().top<1){
        this.topFixed = true
      }else{
        this.topFixed = false
      }
     

    },
    chooseMenu(ind) {
      this.topFixed = true
      this.leftMenu.filter((v, i) => {
        if (i == ind) {
          v.active = true;
        } else {
          v.active = false;
        }
      });
    },
    getBaseInfo() {
      let self = this;
      //公司信息
      this.$api.member.basicComp({ companyId: this.companyId }).then(res => {
        if (res.success) {
          console.log(res);
          if (self.changeData && self.changeData.memberCompanyVo) {
            self.showData.memberCompanyVo = self.changeData.memberCompanyVo;
          } else {
            self.showData.memberCompanyVo = res.data;
          }
        }
        // console.log(self.showData.memberCompanyVo)
      });
      //联系人
      this.$api.member.basicContact({ companyId: this.companyId }).then(res => {
        if (res.success) {
          if (self.changeData && self.changeData.memberCompanyContactListVo) {
            self.showData.memberCompanyContactListVo =
              self.changeData.memberCompanyContactListVo;
          } else {
            self.showData.memberCompanyContactListVo = res.data;
          }
        }
      });
      // 会员代表
      this.$api.member.basicRep({ companyId: this.companyId }).then(res => {
        if (res.success) {
          if (self.changeData && self.changeData.memberRepInfoVo) {
            self.showData.memberRepInfoVo = self.changeData.memberRepInfoVo;
          } else {
            self.showData.memberRepInfoVo = res.data;
          }
        }
      });
      //股东
      this.$api.member.basicShare({ companyId: this.companyId }).then(res => {
        if (res.success) {
          if (self.changeData && self.changeData.memberShareHolderVo) {
            self.showData.memberShareHolderVo =
              self.changeData.memberShareHolderVo;
          } else {
            self.showData.memberShareHolderVo = res.data;
          }
        }
      });
      //高管
      this.$api.member.basicSenior({ companyId: this.companyId }).then(res => {
        if (res.success) {
          if (self.changeData && self.changeData.memberSeniorVos) {
            self.showData.memberSeniorVos = self.changeData.memberSeniorVos;
          } else {
            self.showData.memberSeniorVos = res.data;
          }
        }
      });
      //业务信息
      this.$api.member.basicInfo({ companyId: this.companyId }).then(res => {
        if (res.success) {
          if (self.changeData && self.changeData.memberSeniorVos) {
            self.showData.commonMemberBusinessVo =
              self.changeData.commonMemberBusinessVo;
          } else {
            self.showData.commonMemberBusinessVo = res.data;
          }
        }
      });
      // //缴费信息
      // this.$api.member.basicMember({ id: this.companyId }).then(res => {
      //   if (res.success) {
      //     self.showData.memberPayVo = res.data;
      //   }
      // });
    },
    getFils() {
      let self = this;
      this.$api.manage.getFilePath(this.companyId).then(res => {
        if (res.success) {
          if (res.data.has) {
            this.fileUrl = res.data.fullPath;
            this.fileName = res.data.name;
            self.filePath = res.data.fullPath;
          } else {
            self.$message.warning("暂无入会申请书下载");
          }
        }
      });
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.table_title {
  font-size: 16px;
  font-weight: 600;
  padding: 15px 30px;
  border-bottom: 1px solid #eee;
}
#manageInfo {
  position: relative;
  .formMenu {
    width: 160px;
    .menuBox {
      position: absolute;
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
    width: calc(100% - 160px);
    padding: 0 20px 0 40px;
    .formBox {
      margin-bottom: 20px;
      .title {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #d6d6d6;
        .text {
          font-size: 18px;
          color: #333;
        }
      }
      .el-form-item {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        .el-form-item__label {
          line-height: 100% !important;
          text-align: left;
        }
        .el-form-item__content {
          -webkit-box-flex: 1;
          flex-grow: 1;
          margin-left: 0 !important;
          > .el-select {
            width: 80%;
            min-width: 200px;
          }
          > .el-input {
            width: 80% !important;
            min-width: 200px;
          }
        }
        .avatar-uploader {
          .el-upload-list {
            .el-upload-list__item {
              width: 100px;
              height: 100px;
              line-height: 100px;
            }
          }
          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover {
              border-color: #409eff;
            }
            &.el-upload--picture-card {
              width: 100px;
              height: 100px;
              line-height: 100px;
            }
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
          }
          .avatar {
            width: 100px;
            height: 100px;
            display: block;
          }
        }
      }
    }
    .tableBox {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      overflow-x: auto;
      .ctitle {
        margin-top: 20px;
        font-weight: 600;
      }
      .myTable {
        table-layout: fixed;
        border-collapse: separate;
        border-spacing: 0;
        min-width: 100%;
        tr {
          th {
            height: 50px;
            padding: 0 10px;
            border: 0;
            background: #f6f6f6;
            border-bottom: 1px solid #d6d6d6;
            text-align: left;
          }
          td {
            height: 50px;
            padding: 0 10px;
            border-bottom: 1px solid #d6d6d6;
            white-space: nowrap;
            text-overflow: ellipsis;
            input {
              width: 100px;
              height: 36px;
              line-height: 36px;
              padding: 0 5px;
              border: 1px solid #e6e6e6;
            }
            a {
              display: inline-block;
              margin: 0 10px;
            }
          }
        }
      }
      .addItem {
        padding: 20px 0;
        .el-button {
          border-style: dashed !important;
          width: 60%;
        }
      }
    }
  }
  .formCon {
    height: 115px;
    textarea {
      height: 100%;
    }
  }
}
.footBtn {
  padding: 20px;
}
.container {
  margin-top: 30px;
  background-color: #fff;
}
.icon {
  font-size: 24px;
  i {
    color: #faad14;
  }
}
.beforeChange {
  span {
    vertical-align: top;
  }
}
.el-row {
  margin-bottom: 0px;
}
.el-form-item {
  margin-bottom: 0;
}
#manageInfo .formMenu .menuBoxFixed{
  position: fixed;
  top: 70px;
}
.fileName{
  margin-top: 20px;
}
.fileName a{
  margin-left: 20px;
}
</style>
