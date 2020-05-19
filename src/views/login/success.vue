<template>
  <div id="loginSuccess">
    <logoPic></logoPic>
    <div class="main">
      <div class="success">
        <span class="el-icon-success"></span>
      </div>
      <div class="f_blod fs16">{{ title }}</div>
      <div class="fs13 c999" v-if="">{{ msg }}</div>
      <!--<div class="two">
        您的账号：{{account}}
      </div>
      <div class="two">
        您的密码：{{password}}
      </div>-->
      <!--<div class="fs13 c999">{{ msg }}</div>-->
      <div class="btnBox">
        <el-button type="default" @click="login">返回首页</el-button>
      </div>
    </div>
    <loginFoot></loginFoot>
  </div>
</template>
<script>
import logoPic from "@/components/Login/logoPic";
import loginFoot from "@/components/Login/loginFoot";
export default {
  name: "LoginSuccess",
  components: {
    logoPic,
    loginFoot
  },
  data() {
    return {
      title: "感谢您的注册",
      msg: "账号信息已发送到联系人邮箱，请及时查收并通过邮件中的登录账号及密码登录系统",
        /*"请妥善保管好您的账号密码！",*/
      /*account:this.$route.query.account,
      password:this.$route.query.password,*/

    };
  },
  created() {
    let type = this.$route.query.type;
    if (type === "sendMail") {
      this.title = "邮件发送成功";
      this.msg =
        "系统已经向您的邮箱发送一份邮件，请您登陆邮箱点击邮箱中的链接完成邮箱验证";
    } else if (type === "pass") {
      this.title = "重置成功";
      this.msg = "立即使用原有账号+新的密码登录系统吧";
    } else if(type === "getPassword"){
      this.title = "邮件发送成功";
      this.msg = "系统已经向您的邮箱发送一份邮件，请您登录邮箱点击邮箱中的链接完成验证";
    }
  },
  methods: {
    login() {
      this.$router.push({ path: "/login/index" });
    }
  }
};
</script>
<style lang="less">
#loginSuccess {
  height: 100%;
  background:url("~@/assets/bg.jpg") no-repeat center center;
  background-size: cover;
  .main {
    width: 1024px;
    margin: 0 auto;
    text-align: center;
    > div {
      margin-bottom: 20px;
    }
    .two {
      text-align: center;
      font-size: 16px;
      margin:10px 0;
    }
    .success {
      padding: 40px;
      span {
        font-size: 100px;
        color: #67c23a;
      }
    }
    .btnBox {
      margin-bottom: 100px;
    }
  }
}
</style>
