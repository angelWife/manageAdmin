<template>
  <div id="getPassword">
    <logoPic></logoPic>
    <div class="main">
        <el-row>
          <el-col :span="12" class="item">
            <div class="title">邮箱找回密码</div>
            <div class="msg">
              输入注册时填写的默认联系人邮箱，系统将发送一封验证邮件，点击邮件内链接即可对账号密码进行重置
            </div>
            <div class="input">
              <el-input
                placeholder="邮箱"
                v-model="name"
                prefix-icon="el-icon-message"
              ></el-input>
            </div>
            <div class="btnBox">
              <el-button type="primary" @click="sendMail()">提交</el-button>
            </div>
          </el-col>
          <el-col :span="12" class="item">
            <div class="title">其他密码找回</div>
            <div class="msg">
              如果您的邮箱因为某些原因无法接收重置密码邮件，请扫描以下二维码联系协会工作人员微信协助重置
            </div>
          <div class="mark">
              <img src="../../../static/find-pw.png" alt=""/>
            </div>
          </el-col>
        </el-row>
    </div>
    <!--<el-dialog
      title="提示"
      :visible.sync="mymodal.modalShow"
      width="30%"
      center
    >
      <span>{{ mymodal.text }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mymodal.modalShow = false">取 消</el-button>
        <el-button type="primary" @click="mymodal.modalShow = false"
        >确 定</el-button
        >
      </span>
    </el-dialog>-->
    <loginFoot></loginFoot>
  </div>
</template>
<script>
  import logoPic from "@/components/Login/logoPic";
  import loginFoot from "@/components/Login/loginFoot";
  export default {
    name: "GetPassword",
    components: {
      logoPic,
      loginFoot
    },
    data() {
      return {
        name: "",
        passd: "Aa123456",
      };
    },
    created() {
    },
    methods: {
      sendMail() {
        let self = this
        let value = self.name
        const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        const email = reg.test(value);
          if (email) {
            let params = {"userName":self.name}
            console.log(params);
            self.$api.login.getPassword(params).then(res => {
              if (res.success) {
                self.$router.push({
                  path: "/login/success",
                  query: {type: "getPassword"}/*, account: res.data.account, password: res.data.password*/
                });
              } else {
                {
                  self.$message.warning('邮箱不正确！');
                }
              }
            })
          } else{
            self.$message.warning('邮箱格式不正确！');
          }
        }
      }
  }
</script>

<style lang="less">
  #getPassword {
    padding-top: 100px;
    height: 100%;
    background: url(../../assets/bg.jpg) no-repeat;
    background-size: cover;
    .main {
      width: 880px;
      margin: 0 auto 100px;

      .item {
        width: 50%;
        padding: 0 40px;

        &:first-child {
          border-right: 1px solid #d5d5d5;
        }

        .title {
          text-align: center;
          margin: 10px 0 30px;
        }

        .msg {
          font-size: 14px;
          color: #999;
          margin-bottom: 20px;
        }

        .input {
          margin-bottom: 20px;
        }

        .btnBox {
          padding-bottom: 10px;

          button {
            width: 100%;
          }
        }
      }
    }
  }
  .mark{
    text-align: center;
  }
  .mark img{
    width: 140px;
    height: 140px;
  }
</style>
