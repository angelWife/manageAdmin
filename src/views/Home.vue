<template>
  <div id="index">
    <el-container class="flex">
      <el-aside :width="asideWidth" class="menu-bar-container">
        <div
          class="logo"
          :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'"
          @click="$router.push('/myHome/index')"
        >
          <img src="@/assets/toplogo.png" />
        </div>
        <!-- 导航菜单 -->
        <el-menu
          ref="navmenu"
          :default-active="$route.name"
          :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'"
          :collapse="collapse"
          :collapse-transition="false"
          background-color="#001529"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          @select="handleselect"
        >
          <menu-tree v-for="item in menuList" :key="item.id" :menu="item"></menu-tree>
        </el-menu>
      </el-aside>
      <!-- :style="'padding-left:'+asideWidth+';'" -->
      <el-container class="container-main flex-1" :class="hasFoot?'hasFoot':''">
        <el-header>
          <el-row>
            <el-col :span="6">
              <div class="menuControl">
                <span
                  class="icon"
                  :class="collapse?'el-icon-s-unfold':'el-icon-s-fold'"
                  @click="onCollapse"
                ></span>
                <span class="text">{{headTitle}}</span>
              </div>
            </el-col>
            <el-col :span="18" class="topMenu">
              <span class="name">{{userName}}</span>
              <a class="text" @click="resetPass()">重置密码</a>
              <a class="text" @click="Login()">注销</a>
            </el-col>
          </el-row>
        </el-header>
        <el-main id="iframeContainer" class="iframe-container">
          <keep-alive>
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </keep-alive>
          <div class="rightBar">
            <span>业务咨询</span>
            <div class="msg">
              <div class="title">业务咨询</div>
              <div><span>电话：</span><span>010-83361666</span></div>
              <div><span>邮箱：</span><span>service@iamac.org.cn</span></div>
              <div><span style="float: left;">公众号：</span><span><img class="qr-code" src="@/assets/qr-code.png" /></span></div>

            </div>
          </div>
        </el-main>
      </el-container>
      <resetPass />
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { pubParam } from "@/utils/common";
import Cookies from "js-cookie";
import MenuTree from "@/components/MenuTree/menuTree";
// 导航模拟假数据
// import { menuList } from "@/utils/menuList.js";
import resetPass from "./Dialog/resetPass";
export default {
  name: "Home",
  components: {
    MenuTree,
    resetPass
  },
  data() {
    return {
      asideWidth: "250px",
      collapse: false,
      // headTitle:"",
      menuList: [{
        id: 1,
        name: "首页",
        icon: "el-icon-location",
        path: "/myHome/index",
        hasChild: false
      }],
      // hasFoot: false
      menuIndex: 1,
      userName:'',
   }
  },
  watch: {
    $route: "handleRoute"
  },
  computed: {
    ...mapState({
      // headTitle: state => state.app.headTitle,
      hasFoot: state => state.app.hasFoot,
      // username:state => state.user.userInfo.userName,
    }),
    headTitle: {
      get() {
        return this.$store.state.app.headTitle;
      },
      set(val) {}
    },
    // username: {
    //   get() {
    //     return this.$store.state.user.userInfo.userName;
    //   },
    //   set(val) {}
    // },
  },
  created() {
    this.userName = localStorage.getItem("userNameIndex");
    console.log(localStorage.getItem("userNameIndex"));
    // this.handleRoute(this.$route);
    // this.headTitle = this.$store.state.app.headTitle;
    // 导入菜单;
    this.$api.menu
      .findNavTree({})
      .then(res => {
        if (res.success) {
          this.menuList = res.data;
          this.$store.state.menu = res.data;
        }else{
          console.log('1111');
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  mounted() {
    // window.addEventListener("load", () => {
    //   // 滚动事件变为 scroll
    //   this.$router.replace("/myHome/index").catch(err => {
    //     err;
    //   });
    // });
  },
  methods: {
    // 重置密码
    resetPass() {
      this.$store.commit("showResetDialog");
    },
    Login() {
      this.$confirm('是否注销登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.login.logout().then(res => {
            if (res.success) {
              this.$router.push("/login/index");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }).catch(() => {
      });
    },

    onCollapse() {
      this.collapse = !this.collapse;
      if (this.collapse) {
        this.asideWidth = "65px";
      } else {
        this.asideWidth = "250px";
      }
    },
    handleOpen(e) {
      // console.log("handleopen");
    },
    handleClose() {
      // console.log("handleclose");
    },
    handleselect(e) {
      this.menuIndex = e;
      console.log('e',e);
    },
    handleRoute(menu) {
      // this.headTitle = this.$store.state.app.headTitle = menu.name;
      this.$store.commit("setHeadTitle", menu.name);
      console.log(menu.name);
      //console.log(this.$route.name);
    }
  }
};
</script>

<style lang="less">
#index {
  height: 100vh;
  width: 100vw;
  .menu-bar-container {
    .el-menu {
      border: 0 !important;
      // background-color: #2968a30c;
      .el-submenu {
        position: relative;
        .el-menu-item {
          width: 100%;
        }
      }
    }
    .logo {
      height: 60px;
      background: #00284d;
      position: relative;
      img {
        position: absolute;
        height: 40px;
        top: 10px;
        left: 10px;
      }
    }
  }
  .el-container {
    height: 100%;
    background: #f0f2f5;
  }
  .el-aside {
    background: #001529;
    color: #fff;
    position: relative;
    z-index: 10;
  }
  .el-header {
    background: #fff;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;
    .menuControl {
      height: 60px;
      line-height: 60px;
      span {
        display: inline-block;
      }
      .icon {
        font-size: 22px;
        position: relative;
        top: 2px;
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
      }
      .text {
        margin-left: 20px;
        font-size: 16px;
      }
    }
    .topMenu {
      height: 60px;
      line-height: 60px;
      text-align: right;
      a,
      span {
        display: inline-block;
        margin-right: 20px;
      }
    }
  }
  .container-main {
    width: calc(100vw - 250px);
    overflow: hidden;
  }
  .iframe-container {
    height: auto;
    position: relative;
    // transform: translateZ(0);
    .frame {
      width: 100%;
      height: 100%;
    }
    .rightBar {
      position: fixed;
      z-index: 100;
      right: 10px;
      bottom: 20%;
      height: 50px;
      width: 50px;
      padding: 5px;
      text-align: center;
      background: #409eff;
      color: #fff;
      cursor: pointer;
      .msg {
        display: none;

            color: #555;
            width: 260px;
           right: 50px;
           position: absolute;
           top: 0;
		   margin-top: -200px;
           text-align: left;
           padding: 15px;
           box-shadow: 0 0 10px 0 #bbb;
           .title{
             margin-top: 0;
             border-bottom: 1px solid #ddd;
             padding-bottom: 10px;
           }
          div{
            margin-top: 10px;



          }
      }
      .qr-code{
        width: 120px;
        height: 120px;
      }
    }

    .rightBar:hover .msg{
    	display: block;
    }

  }
  .pmenu-bar-collapse-width {
    width: 65px;
  }
  .menu-bar-width {
    width: 250px;
  }
}
.upload-demo {
  .el-upload-list {
    width: 363px;
  }
  .el-upload {
    .el-upload-dragger {
      background-color: #fafafa;
      border-color: #1890ff;
    }
  }
}
.upStyle {
  .el-upload-list {
    width: 100%;
  }
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      background-color: #fafafa;
      border-color: #1890ff;
      width: 100%;
    }
  }
}
.appro .el-card__body {
  padding: 10px 0;
}
.upProof .el-upload-list--picture-card .el-upload-list__item {
  display: block;
  width: auto;
  height: auto;
  border: 0;
}

.el-table--enable-row-transition .el-table__body td.cotent .cell {
  white-space: nowrap;
}
.text_nowrap {
  white-space: nowrap;
}
.new-depart {
  .el-dialog {
    width: 30%;
  }
}
.outer .tab-inner .el-tabs__content {
  height: calc(100% - 30px);
}
.outer .tab-inner .el-tabs__item#tab-basic,
.outer .tab-inner .el-tabs__item#tab-member {
  font-size: 18px;
}
// 表格样式

.el-table {
  thead {
    th {
      background-color: #f6f6f6 !important;
      height: 50px;
      color: #444;
      tr {
        background-color: none !important;
      }
    }
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.confrimStyle .el-message-box__status.el-icon-warning {
  top: 15px;
}
.el-table__body .el-button {
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 8px;
}
</style>
