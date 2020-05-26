<template>
  <div id="register">
    <logoPic></logoPic>
    <div class="container">
      <div class="stepBox">
        <div
          v-for="(item, ind) in stepList"
          :key="ind"
          class="item clearfix"
          :class="{ active: item.active }"
        >
          <div class="numBox clearfix">
            <span class="num">{{ ind + 1 }}</span>
            <span class="name">{{ item.name }}</span>
          </div>
          <div class="line" v-if="ind < stepList.length - 1"></div>
        </div>
      </div>
      <div class="main">
        <transition name="el-fade-in">
          <div v-show="showInd == 0" class="step1">
            <div class="msgBox flex">
              <div class="icon el-icon-warning-outline"></div>
              <div class="flex-1 msg">
                <div class="title">
                  欢迎访问中国保险资产管理业协会会员服务系统
                </div>
                <div class="text">
                  您需要先填写基本信息并完成注册流程，来获得协会面向全部注册会员的资讯，课程，活动及调研等服务；进一步申请成为协会正式认定的会员，则可获得认定会员专享服务参与资格
                </div>
              </div>
            </div>
            <div class="compList" v-if="listObj">
              <el-row >
                <el-col
                  v-for="(item, ind) in listObj"
                  :key="ind"
                  class="item"
                  :span="6"
                >
                  <li
                    v-for="(child, cind) in item"
                    :key="cind"
                    :class="[child.class, child.isChoose ? 'active' : '']"
                    @click="chooseProd(ind, cind)"
                  >
                    {{ child.dictVal }}
                    <span
                      v-if="child.isChoose"
                      class="icon el-icon-circle-check"
                    ></span>
                  </li>
                </el-col>
              </el-row>
            </div>
            <div v-else>暂无机构数据</div>
            <div class="text_center btnBox">
              <el-button type="primary" @click="nextStep(1)">下一步</el-button>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in">
          <div v-show="showInd == 1" class="step2">
            <el-form
              class="formBox"
              :model="myform"
              :rules="formRules"
              ref="myform"
              label-width="auto"
            >
              <el-form-item
                label="是否有统一社会信用代码："
                prop="flagHaveCredit"
                style="margin-bottom:10px;"
              >
                <el-select placeholder="请选择" v-model="myform.flagHaveCredit">
                  <!--<el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>-->
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" class="msgBox">
                <div class="msg">
                  如为海外机构无法提供相关证明文件，选择否，仅在后面补充相关信息即可
                </div>
              </el-form-item>
              <el-form-item
                label="统一社会信用代码："
                prop="creditId"
                v-if="myform.flagHaveCredit == 1"
              >
                <el-input
                  placeholder="请输入"
                  v-model="myform.creditId"
                ></el-input>
              </el-form-item>

              <el-form-item label="机构名称：" prop="institutionName">
                <el-input
                  placeholder="请输入"
                  v-model="myform.institutionName"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人：" prop="contacts">
                <el-input
                  placeholder="请输入"
                  v-model="myform.contacts"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人手机：" prop="mobileNum">
                <el-input
                  placeholder="请输入"
                  v-model="myform.mobileNum"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人邮箱：" prop="mailAddress">
                <el-input
                  placeholder="请输入"
                  v-model="myform.mailAddress"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="验证码："
                class="phoneMark"
                prop="smsCode"
                inline="true"
              >
                <el-input placeholder="请输入" v-model="myform.smsCode">
                </el-input>
                <button
                  class="el-button markBtn el-button--primary"
                  type="primary"
                  :disabled="isSend"
                  @click="sendMark"
                >
                  {{ btnText }}
                </button>
              </el-form-item>
              <div class="text_right btnBox">
                <el-button type="primary" @click="prevStep(0)"
                  >上一步
                </el-button>
                <el-button type="primary" @click="submitForm('myform')"
                  >提交
                </el-button>
              </div>
            </el-form>
          </div>
        </transition>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="mymodal.modalShow"
      width="30%"
      center
    >
      <span>{{ mymodal.text }}</span>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="mymodal.modalShow = false">取 消</el-button>-->
        <el-button type="primary" @click="mymodal.modalShow = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <loginFoot></loginFoot>
  </div>
</template>
<script>
import logoPic from "@/components/Login/logoPic";
import loginFoot from "@/components/Login/loginFoot";

var checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("手机号不能为空"));
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    console.log(reg.test(value));
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error("请输入正确的手机号"));
    }
  }
};
var isEmail = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    const email = reg.test(value);
    if (!email) {
      callback(new Error("邮箱格式如:admin@163.com"));
    } else {
      callback();
    }
  }
};
var isCode = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    const reg = /^\d{4}$/;
    const email = reg.test(value);
    if (!email) {
      callback(new Error("请输入正确的验证码"));
    } else {
      callback();
    }
  }
};
var isCreditId = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    const reg = /^[a-zA-Z0-9]{18}$/;
    const creditId = reg.test(value);
    if (!creditId) {
      callback(new Error("请输入18位数字或英文统一社会信用代码"));
    } else {
      callback();
    }
  }
};
export default {
  name: "Register",
  components: {
    logoPic,
    loginFoot
  },
  data() {
    return {
      options: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "2",
          label: "否"
        }
      ],
      showInd: 0,
      myform: {
        institutionType: "",
        contacts: "",
        creditId: "",
        flagHaveCredit: "1",
        institutionName: "",
        mailAddress: "",
        mobileNum: "",
        smsCode: ""
      },
      formRules: {
        contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" }
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        creditId: [
          {
            required: true,
            message: "请输入18位数字或英文社会信用代码",
            trigger: "blur"
          },
          { validator: isCreditId, trigger: "blur" }
        ],
        flagHaveCredit: [
          {
            required: true,
            message: "请选择是否有统一社会信用代码",
            trigger: "change"
          }
        ],
        institutionName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        mailAddress: [
          { required: true, message: "请输入联系人邮箱", trigger: "blur" },
          { validator: isEmail, trigger: "blur" }
        ],
        mobileNum: [
          { required: true, message: "请输入联系人手机号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        smsCode: [
          { required: true, message: "请输入手机验证码", trigger: "blur" },
          { validator: isCode, trigger: "blur" }
        ]
      },
      mymodal: {
        text: "",
        modalShow: false
      },
      isSend: false,
      btnText: "获取验证码",
      stepList: [
        {
          name: "机构类型",
          active: true
        },
        {
          name: "基本信息",
          active: false
        },
        {
          name: "注册成功",
          active: false
        }
      ],
      listObj: [],
      hasChoose: false
    };
  },
  created() {
    this.organList();
    window.addEventListener('keyup', function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true)
  },
  methods: {
    organList() {
      this.$api.login
        .getOrganList()
        .then(res => {
          if (res.success) {
            let list = res.data;
            let _arr = [[], [], [], []];
            list.filter((v, i) => {
              let j = Math.floor(i / 9);
              v.isChoose = false;
              if (i < 9) {
                v.class = "y_bg";
                _arr[j].push(v);
              } else if (i > 8 && i < 18) {
                v.class = "b_bg";
                _arr[j].push(v);
              } else if (i > 17 && i < 27) {
                v.class = "y_bg";
                _arr[j].push(v);
              } else {
                v.class = "b_bg";
                _arr[j].push(v);
              }
            });
            this.listObj = _arr;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    nextStep(ind) {
      if (!this.hasChoose) {
        this.$message.error("请选择所属机构！");
        return;
      }
      this.showInd = ind;
      this.stepList[ind].active = true;
    },
    prevStep(ind) {
      this.showInd = ind;
      this.stepList[ind + 1].active = false;
    },
    chooseProd(ind1, ind2) {
      let cos = 0;
      let ids = [];
      this.listObj.filter((v, i) => {
        if (ind1 == i) {
          v.filter((m, j) => {
            if (j == ind2) {
              m.isChoose = !m.isChoose;
              if (m.isChoose) {
                cos++;
                ids.push(m.dictKey);
              } else {
                cos--;
                ids.splice(j, 1);
              }
            } else {
              m.isChoose = false;
            }
          });
        } else {
          v.filter((m, j) => {
            m.isChoose = false;
          });
        }
      });
      if (cos > 0) {
        this.hasChoose = true;
      } else {
        this.hasChoose = false;
      }
      this.myform.institutionType = ids.join(",");
      console.log(this.myform.institutionType);
    },
    sendMark() {
      this.isSend = true; //按钮被禁用
      if (this.myform.mobileNum == "") {
        this.mymodal.text = "请输入手机号码";
        this.mymodal.modalShow = true;
        this.isSend = false;
        return;
      } else {
        let reg = /^1[345789]\d{9}$/;
        if (!reg.test(this.myform.mobileNum)) {
          this.mymodal.text = "请输入正确的手机号码";
          this.mymodal.modalShow = true;
          this.isSend = false;
          return;
        }
      }
      if (this.isSend) {
        let data = { mobilePhone: this.myform.mobileNum };
        this.$api.login.smsSend(data).then(res => {
          if (res.success) {
            this.$message("短信发送成功！");
          } else {
            this.isSend = false;
            return;
          }
        });
      }
      
      let num = 60;
      let self = this;
      let timer = null;
      function downCount() {
        if (num > 1) {
          num--;
          self.btnText = num + "s后重新发送";
        } else {
          self.isSend = false;
          clearInterval(timer);
          self.btnText = "获取验证码";
        }
      }
      downCount();
      timer = setInterval(() => {
        downCount();
      }, 1000);
    },
    submitForm(myform) {
      let self = this;
      this.$refs[myform].validate(valid => {
        if (valid) {
          let params = this.myform;
          /*params.flagHaveCredit = params.flagHaveCredit * 1*/
          self.$api.login.registerUser(params).then(res => {
            if (res.success) {
              self.$router.push({
                path: "/login/success",
                query: {
                  type: "register"
                } /*account: res.data.account, password: res.data.password*/
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
#register {
  min-height: 100vh;
  background: url("~@/assets/bg.jpg") no-repeat center center;
  background-size: cover;

  .container {
    width: 1124px;
    margin: 0 auto;
  }

  .stepBox {
    line-height: 30px;
    text-align: center;

    .item {
      display: inline-block;

      .line {
        float: left;
        width: 105px;
        margin: 0 15px;
        height: 30px;
        line-height: 30px;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 15px;
          border-bottom: 1px solid #e5e5e5;
          top: 0;
          left: 0;
        }
      }

      .numBox {
        float: left;

        span {
          float: left;
        }

        .num {
          width: 30px;
          height: 30px;
          line-height: 28px;
          border: 1px solid #d5d5d5;
          border-radius: 100%;
          font-size: 16px;
          text-align: center;
          margin-right: 10px;
          color: #999;
        }

        .name {
          color: #999;
        }
      }

      &.active {
        font-weight: 600;

        .num {
          background: #409eff;
          border-color: #409eff;
          color: #fff;
        }

        .name {
          color: #333;
        }
      }
    }
  }

  .main {
    .step1 {
      .msgBox {
        margin: 30px 0 20px;
        padding: 10px 20px;
        border: 1px solid rgba(255, 229, 143, 1);
        background: rgba(255, 251, 230, 1);
        color: #666;

        .icon {
          font-size: 24px;
          color: #d98719;
          margin-right: 20px;
          margin-top: 10px;
        }

        .title {
          font-size: 16px;
          font-weight: 600;
          padding: 10px 0;
        }

        .text {
          line-height: 25px;
          font-size: 14px;
          color: #999;
        }
      }

      .compList {
        margin-bottom: 30px;

        .item {
          height: 288px;
          box-shadow: 0 0 2px rgba(199, 148, 148, 0.4);
          background: #e4ecf3;
          overflow: hidden;
          border: 1px solid #e6e6e6;

          li {
            height: 32px;
            padding: 0 10px;
            font-size: 13px;
            line-height: 32px;
            position: relative;
            list-style: none;
            border-bottom: 1px solid #f9f9f9;
            color: #666;
            cursor: pointer;

            &:last-child {
              border: 0;
            }

            .icon {
              position: absolute;
              right: 10px;
              font-size: 20px;
              top: 6px;
            }

            &.y_bg {
              background: #f1e6d9;
            }

            &.b_bg {
              background: #dbecf5;
            }

            &.active {
              background: #fff !important;

              .icon {
                color: #67c23a;
              }
            }
          }
        }
      }
    }

    .formBox {
      width: 500px;
      margin: 30px auto;

      .el-select {
        width: 100%;
      }

      .el-form-item {
        &.msgBox {
          line-height: 100%;
        }

        .msg {
          white-space: nowrap;
          margin-top: -10px;
          color: #999;
          font-size: 13px;
        }

        .markBtn {
          position: absolute;
          right: 0;
          top: 0;
          min-width: 33.33%;
          max-width: 40%;
          padding: 12px 0;
        }
      }

      .form-item {
        margin-bottom: 20px;
        position: relative;

        .mark {
          position: absolute;
          left: -10px;
          top: 15px;
        }

        .label {
          width: 100px;
          margin-right: 20px;
          font-size: 13px;
        }

        .input {
          width: 280px;
          position: relative;

          > * {
            width: 100%;
          }

          &.msg {
            white-space: nowrap;
            margin-top: -10px;
            color: #999;
            font-size: 13px;
          }
        }
      }
    }
  }

  .btnBox {
    button {
      width: 150px;
      margin: 0 20px;
    }
  }
}
</style>
