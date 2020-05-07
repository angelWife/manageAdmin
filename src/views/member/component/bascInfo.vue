<template>
  <div class="container">
    <!-- <div class="table_title">{{basicTitle}}</div> -->
    <div class="appyVip comModal">
      <div class="flex">
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
        <div class="flex-1 formModal">
          <div class="formBox" id="applyBook">
            <div class="title">
              <span class="text">入会申请书</span>
            </div>
            <div class="formMain">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="120px"
                label="left"
              >
                <el-form-item label="入会申请书.doc" class="m-t-20">
                  <el-upload
                    class="upload-box float-left"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                  ></el-upload>
                  <div class="float-left blue m-l-20 cur-pointer">下载</div>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="formBox" id="baseInfo">
            <div class="title">
              <span class="text">公司基本信息</span>
            </div>
            <div class="formMain">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="140px"
                label="left"
              >
                <el-row class="m-t-20">
                  <el-col :span="10">
                    <el-form-item label="机构类型：">保险公司</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="统一社会信用代码：">914403006820323321</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="名称：">
                      深圳市亲几餐饮有限公司
                      <span class="icon" v-if="!!changeList.name">
                        <el-tooltip popper-class="toolBox" effect="light" placement="right-end">
                          <div slot="content">变更前：{{changeList.name}}</div>
                          <i class="el-icon-warning"></i>
                        </el-tooltip>
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="英文名称：">SZQQJCYYXGS</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="公司类型：">有限责任公司</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="成立日期：" prop="data1">2015-10-02</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="是否上市：">是</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上市地：">香港</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="注册地址：">-</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="办公地址：">-</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="法人代表：">-</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="注册资本(万元)：">
                      -
                      <span class="icon" v-if="!!changeList.money">
                        <el-tooltip popper-class="toolBox" effect="light" placement="right-end">
                          <div slot="content">变更前：{{changeList.money}}</div>
                          <i class="el-icon-warning"></i>
                        </el-tooltip>
                      </span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="营业执照：">
                      <div class="beforeChange">
                        <span v-if="!!changeList.imageUrl">变更前：</span>
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <span v-if="!!changeList.imageUrl" class="icon">
                          <i class="el-icon-warning"></i>
                        </span>
                      </div>

                      <div v-if="!!changeList.imageUrl" class="beforeChange">
                        <span>变更后：</span>
                        <img :src="changeList.imageUrl" class="avatar" />
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="经营业务许可证：">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row style="text-align:right" v-if="lay=='detail'">
                  <el-col :span="24">
                    <el-button @click="reject()">退回初审</el-button>
                    <el-button type="primary">审批通过</el-button>
                  </el-col>
                </el-row>-->
              </el-form>
            </div>
          </div>
          <div class="formBox" id="userInfo">
            <div class="title">
              <span class="text">联系人信息</span>
              <span v-if="!!changeList.contactInfo" class="icon">
                <i class="el-icon-warning"></i>
              </span>
            </div>
            <div class="formMain">
              <div class="tableBox">
                <div class="ctitle">变更前:</div>
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
                    <tr v-for="(item,ind) in tableItems" :key="ind">
                      <td>
                        <span v-if="item.default">(默认)</span>
                        {{item.name}}
                      </td>
                      <td>{{item.post}}</td>
                      <td>{{item.tel}}</td>
                      <td>{{item.phone}}</td>
                      <td>{{item.max}}</td>
                      <td>{{item.email}}</td>
                      <td>{{item.b_email}}</td>
                      <td>{{item.address}}</td>
                      <td>{{item.weixin}}</td>
                      <td>{{item.userID}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tableBox" v-if="!!changeList.contactInfo">
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in changeList.contactInfo" :key="ind">
                      <td>
                        <span v-if="item.default">(默认)</span>
                        {{item.name}}
                      </td>
                      <td>{{item.post}}</td>
                      <td>{{item.tel}}</td>
                      <td>{{item.phone}}</td>
                      <td>{{item.max}}</td>
                      <td>{{item.email}}</td>
                      <td>{{item.b_email}}</td>
                      <td>{{item.address}}</td>
                      <td>{{item.weixin}}</td>
                      <td>{{item.userID}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="formBox" id="vipUser">
            <div class="title">
              <span class="text">会员代表</span>
            </div>
            <div class="formMain">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="140px"
                label="left"
              >
                <el-row class="m-t-20">
                  <el-col :span="10">
                    <el-form-item label="证件类型：">身份证</el-form-item>
                  </el-col>
                  <el-col :span="10">310119112222338812</el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="签发机关：">上海市浦东新区公安局</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="有效期：">2040-1-1</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="姓名：">张小五</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="性别：">男</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="籍贯：">上海-浦东</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="出身年月：" prop="date1">1955-11-15</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="名族：">汉族</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="最高学历：">博士</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="政治面貌：">党员</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="职务：">总经理秘书</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="办公电话：">31235689</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="传真：">312312312</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="本人电话：">1888888888</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="邮箱：">12342654@qq.com</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="通讯地址：">上海市徐汇区东川路911弄109号</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="微信号：">12342654</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="代表履历：">测试履历测试履历测试履历测试履历测试履历测试履历测试履历测</el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="formBox" id="other">
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
                    <tr v-for="(item,ind) in tableItems" :key="ind">
                      <td>{{item.name}}</td>
                      <td>{{item.post}}</td>
                      <td>{{item.tel}}</td>
                      <td>{{item.phone}}</td>
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
                    <tr v-for="(item,ind) in tableItems" :key="ind">
                      <td>11</td>
                      <td>22</td>
                      <td>33</td>
                      <td>44</td>
                      <td>55</td>
                      <td>66</td>
                      <td>77</td>
                      <td>88</td>
                      <td>88</td>
                      <td>88</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="formBox" id="msgInfo">
            <div class="title">
              <span class="text">业务信息</span>
            </div>
            <div class="formMain">
              <div class="tableBox">
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th>资管部门名称</th>
                      <th>人员数量</th>
                      <th>部门负责人</th>
                      <th>办公电话</th>
                      <th>手机</th>
                      <th>电话</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in tableItems" :key="ind">
                      <td>111</td>
                      <td>222</td>
                      <td>333</td>
                      <td>444</td>
                      <td>555</td>
                      <td>666</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="140px"
                label="left"
              >
                <el-row class="m-t-20">
                  <el-col :span="12">
                    <el-form-item label="具备投资能力：">--</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="备注：">--</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="保险资金托管业务：">--</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="是否自保监会完成备案：">--</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="净资产规模：">--</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="受托管理保险资金规模：">--</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="外部信用评级：">--</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="全球总资产规模：">--</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="外部信用评级：">--</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="全球总资产规模：">--</el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="外部信用评级：">--</el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="全球总资产规模：">--</el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    changeList: {
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
      form: [
        {
          explain: ""
        }
      ],
      leftMenu: [
        { name: "入会申请书", active: true, id: "#applyBook" },
        { name: "公司基本信息", active: false, id: "#baseInfo" },
        { name: "联系人信息", active: false, id: "#userInfo" },
        { name: "会员代表", active: false, id: "#vipUser" },
        { name: "股东与高管", active: false, id: "#other" },
        { name: "业务信息", active: false, id: "#msgInfo" }
      ],
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        address: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      tableItems: [
        {
          name: "李小三",
          post: "总经理秘书",
          tel: "31311133-1234",
          phone: "19999999999",
          max: "-",
          email: "-",
          b_email: "-",
          address: "-",
          weixin: "-",
          userID: "",
          default: true
        }
      ]
    };
  },
  created() {},
  methods: {
    chooseMenu(ind) {
      this.leftMenu.filter((v, i) => {
        if (i == ind) {
          v.active = true;
        } else {
          v.active = false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push({
            path: "/myHome/index",
            query: { type: "sendConfirm" }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addTableItem() {
      let item = {
        name: "",
        post: "",
        tel: "",
        phone: "",
        max: "",
        email: "",
        b_email: "",
        address: "",
        weixin: "",
        default: false
      };
      this.tableItems.push(item);
    },
    deleteItem(ind) {
      if (this.tableItems.length == 1) {
        return false;
      } else {
        this.tableItems.splice(ind, 1);
      }
    },
    setItemDefault(ind) {
      this.tableItems.filter((v, i) => {
        if (i == ind) {
          v.default = true;
        } else {
          v.default = false;
        }
      });
    },
    reject() {
      this.rejectVisible = true;
    },
    handlePreview() {},
    handleRemove() {},
    beforeRemove() {},
    handleExceed() {},
    handleAvatarSuccess() {},
    beforeAvatarUpload() {}
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
.appyVip {
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
</style>