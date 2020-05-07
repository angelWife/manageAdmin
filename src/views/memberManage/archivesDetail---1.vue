<template>
  <div class="appyVip comModal hasFoot">
    <div class="flex">
      <div class="formMenu">
        <div class="menuBox" :style="'top:'+scrollTop+'px'">
          <div
            v-for="(item,ind) in leftMenu"
            :key="ind"
            class="item"
            :class="item.active?'active':''"
            @click="chooseMenu(ind)"
          >
            <a v-if="item.id" :href="item.id">{{item.name}}</a>
            <a v-else href="javascript:;">{{item.name}}</a>
          </div>
        </div>
      </div>
      <div class="flex-1 formModal" v-if="!modalName">
        <div class="formBox" id="userInfo">
          <div class="title">
            <span class="text">会员基本信息</span>
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
                  <el-form-item label="会员类型：">
                    <div>特表机构</div>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="会员代码：">
                    <div>IB651522dfd</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="会员状态：">
                    <div>已确认</div>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="会员有效期：">
                    <div>2010-12-12至2012-12-12</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="formBox" id="ruhui">
          <div class="title">
            <span class="text">入会申请书</span>
          </div>
          <el-form :model="ruleForm" label-width="140px" label="left">
            <el-row class="m-t-20">
              <el-col :span="10">
                <el-form-item label="入会申请书.doc：">
                  <div class="blue">下载</div>
                </el-form-item>
              </el-col>
              <el-col :span="10"></el-col>
            </el-row>
          </el-form>
        </div>
        <div class="formBox" id="baseInfo">
          <div class="title">
            <span class="text">公司进本信息</span>
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
                  <el-form-item label="机构类型：">
                    <el-input value="保险公司" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="是否有社会统一信用代码：">
                    <el-input value="5656111SFS66266" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="名称：">
                    <el-input value="里面是卡仕达" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="英文名称：">
                    <el-input value="Wakjsda ASnda" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="公司类型：">
                    <el-input value="有限公司" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="成立日期：" prop="data1">
                    <el-input value="2012-10-15" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="是否上市：">
                    <el-input value="有限公司" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="上市地：">
                    <el-input value="香港" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="注册地址：" prop="address">
                    <el-input value="--" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="办公地址：">
                    <el-input value="--" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="法人代表：">
                    <el-input value="--" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="注册资本(万元)：">
                    <el-input value="--" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="公司网址：">
                    <el-input value="--" readonly mytype="text"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="营业执照：" class="mustFill">
                    <img src alt />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="经营业务许可证：" class="mustFill">
                    <img src alt />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="formBox" id="lianxi">
          <div class="title">
            <span class="text">联系人信息</span>
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
                    <th width="160">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,ind) in tableItems" :key="ind">
                    <td>
                      <ElInput v-model="item.name"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.post"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.tel"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.phone"></ElInput>
                    </td>
                    <td>
                      <a class="text" @click="deleteItem(ind)">删除</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="addItem">
                <el-button icon="el-icon-plus" size="small" @click="addTableItem();">新增</el-button>
              </div>
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
                    <th width="160">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,ind) in tableItems" :key="ind">
                    <td>
                      <ElInput v-model="item.name"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.post"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.tel"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.phone"></ElInput>
                    </td>
                    <td>
                      <ElInput></ElInput>
                    </td>
                    <td>
                      <ElInput></ElInput>
                    </td>
                    <td>
                      <ElInput></ElInput>
                    </td>
                    <td>
                      <ElInput></ElInput>
                    </td>
                    <td>
                      <ElInput></ElInput>
                    </td>
                    <td>
                      <ElInput></ElInput>
                    </td>
                    <td>
                      <a class="text" @click="deleteItem(ind)">删除</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="addItem">
                <el-button icon="el-icon-plus" size="small" @click="addTableItem();">新增</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="formBox" id="daibiao">
          <div class="title">
            <span class="text">会员代表</span>
          </div>
          <div class="formMain">
            <div class="tableBox">
              <div class="msg fs12 c999 m-t-20">根据所属的机构类型， 将对应不同的业务信息需要补充填写</div>
              <table class="myTable m-t-20">
                <thead>
                  <tr>
                    <th>资管部门名称</th>
                    <th>人员数量</th>
                    <th>部门负责人</th>
                    <th>办公电话</th>
                    <th>手机</th>
                    <th>电话</th>
                    <th width="160">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,ind) in tableItems" :key="ind">
                    <td>
                      <ElInput v-model="item.name"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.post"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.post"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.tel"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.phone"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.tel"></ElInput>
                    </td>
                    <td>
                      <a class="text" @click="deleteItem(ind)">删除</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="addItem">
                <el-button icon="el-icon-plus" size="small" @click="addTableItem();">新增</el-button>
              </div>
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
                  <el-form-item label="具备投资能力：">
                    <el-input type="textarea" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="备注：">
                    <el-input type="textarea" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="保险资金托管业务：">
                    <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="是否自保监会完成备案：">
                    <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="净资产规模：">
                    <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="受托管理保险资金规模：">
                    <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="外部信用评级：">
                    <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="全球总资产规模：">
                    <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="外部信用评级：">
                    <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="全球总资产规模：">
                    <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="外部信用评级：">
                    <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="全球总资产规模：">
                    <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="formBox" id="other">
          <div class="title">
            <span class="text">股东与高管</span>
          </div>
          <div class="formMain"></div>
        </div>
        <div class="formBox" id="msgInfo">
          <div class="title">
            <span class="text">业务信息</span>
          </div>
          <div class="formMain"></div>
        </div>
        <div class="formBox" id="zhengshu">
          <div class="title">
            <span class="text">会员证书</span>
          </div>
          <div class="formMain"></div>
        </div>
        <div class="formBox" id="biangeng">
          <div class="title">
            <span class="text">变更记录</span>
          </div>
          <div class="formMain"></div>
        </div>
        <div class="formBox" id="jiaofei">
          <div class="title">
            <span class="text">缴费记录</span>
          </div>
          <div class="formMain"></div>
        </div>
        <div class="formBox" id="baifang">
          <div class="title">
            <span class="text">拜访记录</span>
          </div>
          <div class="formMain"></div>
        </div>
      </div>
      <div class="flex-1 formModal" v-if="modalName=='zhengshu'"></div>
    </div>
    <div class="footBtnBox text_right">
      <el-button type="warning">冻结</el-button>
      <el-button type="warning">退会</el-button>
      <el-button type="primary">重置密码</el-button>
      <el-button type="primary">编辑</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      leftMenu: [
        // { name: "入会申请书", active: true, id: "#applyBook" },
        { name: "会员基本信息", active: true, id: "#userInfo" },
        { name: "入会申请书", active: false, id: "#ruhui" },
        { name: "公司进本信息", active: false, id: "#baseInfo" },
        { name: "联系人信息", active: false, id: "#lianxi" },
        { name: "会员代表", active: false, id: "#daibiao" },
        { name: "股东与高管", active: false, id: "#other" },
        { name: "业务信息", active: false, id: "#msgInfo" },
        {
          name: "会员证书",
          active: false,
          id: "#zhengshu"
        },
        {
          name: "变更记录",
          active: false,
          id: "#biangeng"
        },
        {
          name: "缴费记录",
          active: false,
          id: "#jiaofei"
        },
        {
          name: "拜访记录",
          active: false,
          id: "#baifang"
        }
      ],
      modalName: "",
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
        }
      ],
      scrollTop: 0
    };
  },
  mounted() {
    const scrollBox = document.getElementById("iframeContainer");
    this.$store.state.app.hasFoot = true;
    scrollBox.addEventListener("scroll", this.handleScroll, true);
  },
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
    handleScroll(e) {
      let scrollTop = e.target.scrollTop;
      let scrollHeight = e.target.scrollHeight;
      let h = document.getElementsByClassName("menuBox")[0].offsetHeight;
      if (scrollTop < 20) {
        this.scrollTop = 20;
      } else if (scrollTop > scrollHeight - h) {
        this.scrollTop = scrollHeight - h;
      } else {
        this.scrollTop = scrollTop;
      }
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
    }
  }
};
</script>
<style lang="less">
.appyVip {
  position: relative;
  .formMenu {
    width: 160px;
    height: 100%;
    .menuBox {
      width: 160px;
      position: absolute;
      left: 0;
      top: 25px;
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
}
</style>