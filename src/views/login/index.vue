<template>
  <div id="login">
    <logoPic></logoPic>
    <div class="loginMain">
      <div class="item title text_center">登录</div>
      <div class="item">
        <el-input placeholder="请输入会员代码/邮箱" v-model="user" prefix-icon="el-icon-user"></el-input>
      </div>
      <div class="item">
         <img class="img-eye" :src="showPw?'../../../static/eye-open.png':'../../../static/eye-close.png'" @click="showPassword">
        <el-input placeholder="请输入密码" v-model="password" prefix-icon="el-icon-lock" :type="showPw?'text':'password'"></el-input>
      </div>
      <div class="item text_right fs13">
        <router-link to="getPassword" class="link" @click="getPwd">忘记密码</router-link>
      </div>
      <div class="item">
        <el-button type="primary" @click="confirmLogin" @keyup.enter="confirmLogin">登录</el-button>
      </div>
      <div class="item">
        <el-button type="warning" @click="register">注册</el-button>
      </div>
    </div>
    <loginFoot></loginFoot>
  </div>
</template>

<script>
import logoPic from "@/components/Login/logoPic";
import loginFoot from "@/components/Login/loginFoot";
import Cookies from "js-cookie";
import { mapState } from "vuex";

export default {
  name: "Login",
  components: {
    logoPic,
    loginFoot
  },
  data() {
    return {
      user: "",
      password: "",
      showPw:false,
    };
  },
  created() {
    document.onkeydown = e => {
      var key = window.event.keyCode;
      if (key == 13) {
        this.confirmLogin();
      }
    };
  },
  methods: {
    confirmLogin() {
      if (!this.user) {
        this.$message.error("请输入用户账号");
        return;
      }
      if (!this.password) {
        this.$message.error("请输入用户密码");
        return;
      }


      this.$api.login
        .login({
          passwd: this.password,
          userAccount: this.user
        }).then(res => {
          if (res.success) {
            let in2hours = 1 / 12;
            Cookies.set("token", res.data.token, {
              expires: in2hours
            });
           
            localStorage.setItem("userNameIndex", res.data.userName);
            this.$store.commit('setUserInfo',res.data);
            sessionStorage.setItem("userType", res.data.userType);
            this.$router.push({ path: "/myHome/index" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    register() {
      this.$router.push({ path: "/login/register" });
    },
    getPwd() {
      this.$router.push({ path: "/login/getPassword" });
    },
    showPassword(){
      this.showPw =  !this.showPw
    },
  }
};
</script>

<style lang="less">
#login {
  min-height: 100vh;
  padding-top: 50px;
  /*background-color: #f1f2f6;*/
  background:url("~@/assets/bg.jpg") no-repeat center center;
  background-size: cover;
  .loginMain {
    width: 370px;
    margin: 0 auto;
    .item {
      margin-bottom: 20px;
      position: relative;
      button {
        width: 100%;
      }
    }
  }
}
.img-eye{
  position: absolute;
  width: 22px;
  height: 16px;
  right: 10px;
    z-index: 9;
    margin-top: 12px;
}
</style>
