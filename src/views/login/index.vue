<template>
  <div id="login">
    <logoPic></logoPic>
    <div class="loginMain">
      <div class="item title text_center">登录</div>
      <div class="item">
        <el-input placeholder="请输入会员代码/邮箱" v-model="user" prefix-icon="el-icon-user"></el-input>
      </div>
      <div class="item">
        <el-input placeholder="请输入密码" v-model="password" prefix-icon="el-icon-lock"></el-input>
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
      user: "member",
      password: "123456"
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
            this.$store.commit('setUserInfo',res.data);
            sessionStorage.setItem("userType", res.data.userType);
            this.$router.push({ path: "/myHome/index" });
          } else {
            this.$message.error(res.message);
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
    }
  }
};
</script>

<style lang="less">
#login {
  min-height: 100vh;
  padding-top: 50px;
  background-color: #f1f2f6;
  .loginMain {
    width: 370px;
    margin: 0 auto;
    .item {
      margin-bottom: 20px;
      button {
        width: 100%;
      }
    }
  }
}
</style>
