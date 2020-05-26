<template>
  <div class='container'>
    <el-row :gutter="120"
            style="height:100%">
      <el-col :span="12">
        <div class="grid-content">
          <div class='todotitle'><span>待办事项</span>
            <div class="seeMore"
                 @click="seeMore('todo')" v-if="todoList.length>0">查看更多>></div>
          </div>
          <ul v-if="todoList.length>0"
              class='todoContent'>
            <li class="todoeve"
                v-for="todo in todoList"
                :key='todo.id'>
              <div class='todoText'>
                <div>{{todo.companyName}}/{{todo.typeName}}</div>
                <div class="dateText">{{todo.date?todo.date:'2020-05-26'}}</div>
              </div>
              <div class='todoButton'>
                <ElButton type="primary"
                          size='mini'
                          @click="deal(todo)">处理</ElButton>
              </div>
            </li>
          </ul>
          <div style="padding:10px "
               v-else>
            暂无代办事项
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="12"
              v-if="role.name == 'recoMember'">
        <div class="grid-content">
          <div class='todotitle'><span>通知公告</span>
            <router-link to=""
                         class="seeMore">查看更多>></router-link>
          </div>
          <ul v-for="todo in noticeList"
              :key='todo.id'
              class='todoContent'>
            <li class="todoeve">
              <div class='todoText'>
                <div>{{todo.noticeData}}</div>
                <div class="dateText">{{todo.sendTime}}</div>
              </div>
              <div class='todoButton'>
                <ElButton type="primary"
                          size='mini'
                          @click="showNotice(todo)">查看</ElButton>
              </div>
            </li>
          </ul>
          <el-pagination class="text_center"
                         style="margin-top:20px"
                         background
                         layout="total,prev, pager, next"
                         :total="pageTen.total"
                         :page-size="pageTen.pageSize"
                         :current-page.sync="pageTen.currentPage"
                         @current-change="currentchange"></el-pagination>
        </div>
      </el-col> -->
       <el-col :span="12"
              v-if="role.name == 'recoMember'">
        <div class="grid-content">
          <div class='todotitle'>
            <span>通知公告</span>
            <router-link to="/member/notice"
                         class="seeMore" v-if="noticeList.length>0">
              查看更多>></router-link>
          </div>
          <ul v-for="todo in (noticeList.length > 3 ? noticeList.slice(0,3) : noticeList)"
              :key='todo.id'
              class='todoContent'>
            <li class="todoeve">
              <div class='todoText'>
                <div>{{todo.noticeTitle}}</div>
                <div class="dateText">{{todo.sendTime}}</div>
              </div>
              <div class='todoButton'>

                <router-link :to="{path:'/member/NoticeContent',query:{rowId: todo.noticeSendId}}"
                             class="seeMore">
                  <ElButton type="primary"
                            size='mini'>查看</ElButton>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="12"
              v-if="role.name == 'recoMember'">
        <div class="grid-content">
          <div class='todotitle'><span>会员活动</span>
          <!--  <router-link to="" class="seeMore" >查看更多>></router-link> -->
          </div>
          <div v-if="memberActivity.length>0">
            <ul v-for="item in memberActivity"
              :key='item.id'
              class='todoContent'>
            <li class="todoeve">
              <div class='todoText'>
                <div>{{item.activityName}}</div>
                <div class="dateText">{{item.activityDateStart}}</div>
              </div>
              <div class='todoButton' v-show="item.activivyEnrolStatus == 4 || item.activivyEnrolStatus == 1">
                <ElButton type="primary"
                          size='mini'
                          @click="signIn(item)" v-show="item.enrolStatus == 4">报名</ElButton>
                <ElButton type="primary"
                          disabled
                          size='mini' v-show="item.enrolStatus == 3">{{item.enrolStatusVal}}</ElButton>
              </div>
              <div class='todoButton' v-show="item.activivyEnrolStatus != 4 && item.activivyEnrolStatus != 1">
                <ElButton type="primary"
                          size='mini'
                          disabled>{{item.activivyEnrolStatusVal}}</ElButton>
              </div>
            </li>
          </ul>
          </div>
          <div v-else style="padding:10px">
            暂无会员活动
          </div>
        </div>
      </el-col>

      <!-- <el-col :span="12"
              v-if="role.name == 'recoMember'">
        <div class="grid-content">
          <div class='todotitle'><span>会员活动</span>
            <router-link to=""
                         class="seeMore">查看更多>></router-link>
          </div>
          <div style="padding:10px ">
            暂无会员活动
          </div>
        </div>
      </el-col> -->
      <el-col :span="12"
              v-if="role.name == 'recoMember'">
        <div class="grid-content">
          <div class='todotitle'><span>系统消息</span>
            <router-link to="/member/system"
                         class="seeMore" v-if="msgList.length>0">查看更多>></router-link>
          </div>
          <ul v-for="todo in (msgList.length > 3 ? msgList.slice(0,3) : msgList)"
              :key='todo.id'
              class='todoContent'>
            <li class="todoeve">
              <div class='todoText'>
                <div>{{todo.title}}</div>
                <div class="dateText">{{todo.sendTime}}</div>
              </div>
              <div class='todoButton'>
                <router-link :to="{path:'/member/SysContent',query:{rowId: todo.id}}"
                             class="seeMore">
                  <ElButton type="primary"
                            size='mini'>查看</ElButton>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  getNoticeList,
  checkNoticeDetail,
  getSysMessageList,
  checkSysMessageDetail
} from "@/http/moudules/user";
import { queryResp, pubParam, pageTen } from "@/utils/common";
export default {
  data() {
    return {
      pageLocation: 1,
      syspageLocation: 1,
      pageTen,
      sysPageTen: { ...pageTen },
      todoList: [],
      noticeList: [],
      memberActivity: [],
      msgList: [
        {
          id: 1,
          desc: "会员认定申请审批通过",
          date: "2010-3-10"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      role: state => state.user.role
    })
  },
  created() {
    this.queryNotice(pubParam.page);
    this.getActivityList();
    this.querySysMessageList(pubParam.page);
    this.getTodoList();
  },
  methods: {
    deal(data) {
      switch (data.type) {
        case 13:
          this.$router.push({ path: "/users/costInfo" });
          break;
        case 9:
          if (data.isAccess) {
            this.$router.push({ path: "/users/costInfo" });
          } else {
            this.$router.push({ path: "/member/memberInfo" });
          }
          break;
        default:
          this.$router.push({ path: "/member/memberInfo" });
          break;
      }
    },
    signIn(){
       this.$router.push({
        path: "/member/eventReg",
        query: {}
      });
    },
    seeMore(type) {
      let self = this;
      this.$router.push({
        path: "/users/msgList",
        query: { type: type, myData: self.todoList }
      });
    },
    //代办事项

    getTodoList() {
      let params = {
        pageIndex: 1,
        pageSize: 5,
        status: 1
      };
      let self = this;
      this.$api.user.getTodoList(params).then(res => {
        if (res.success) {
          let todoList = res.data.rows;
          if (todoList.length > 0) {
            self.$api.dict.workTypes().then(res => {
              if (res.success) {
                let typeList = res.data;
                typeList.filter(v => {
                  todoList.filter(w => {
                    if (w.type == v.key) {
                      w.typeName = v.val;
                    }
                  });
                });
                self.todoList = todoList;
              }
            });
          }
        }
      });
    },
    getActivityList(){
      let self = this
      let params = {
        enrolStatus:0,
        pageIndex: 1,
        pageSize: 5
      }
      this.$api.member.activityTable(params).then(res=>{
        if(res.success){
          self.memberActivity = res.data.rows
        }
      })
    },
    querySysMessageList(data) {
      getSysMessageList(data).then(res => {
        if (res.success) {
          queryResp(this.msgList, this.sysPageTen, res.data);
        }
      });
    },
    queryNotice(data) {
      getNoticeList(data).then(res => {
        if (res.success) {
          queryResp(this.noticeList, this.pageTen, res.data);
        }
      });
    },
    currentchange(i) {
      this.pageLocation = i;
      this.queryNotice({
        pageIndex: i,
        pageSize: pubParam.page.pageSize
      });
    },
    sysPageTenchange(i) {
      this.syspageLocation = 1;
      this.querySysMessageList({
        pageIndex: i,
        pageSize: pubParam.page.pageSize
      });
    },
    showNotice(item) {
      checkNoticeDetail(item.id).then(rep => {
        let html = "";
        if (rep && rep.code == "200") {
          html = `<table>
                          <tr><td  style="padding:2px;">标题</td><td  style="padding:2px;">${rep.data.title}</td></tr>
                          <tr><td  style="padding:2px;">创建人</td><td  style="padding:2px;">${rep.data.createUserName}</td></tr>
                          <tr><td  style="padding:2px;">更新人</td><td  style="padding:2px;">${rep.data.updateUserName}</td></tr>
                          <tr><td  style="padding:2px;">状态</td><td  style="padding:2px;">${rep.data.msgStatus}</td></tr>
                          <tr><td  style="padding:2px;">内容</td><td  style="padding:2px;">${rep.data.content}</td></tr>
                          <tr><td  style="padding:2px;">时间</td><td  style="padding:2px;">${rep.data.sendTime}</td></tr>
                       </table>`;
        } else {
          html = "<div>暂无信息</div>";
        }

        this.$message({
          dangerouslyUseHTMLString: true,
          message: html,
          duration: 0,
          showClose: true
        });
      });
    },
    sysMsgCheck(item) {
      checkSysMessageDetail(item.id).then(rep => {
        let html = "";
        if (rep && rep.code == "200") {
          html = `<table>
                          <tr><td  style="padding:2px;">标题</td><td  style="padding:2px;">${rep.data.title}</td></tr>

                          <tr><td  style="padding:2px;">状态</td><td  style="padding:2px;">${rep.data.msgStatus}</td></tr>
                          <tr><td  style="padding:2px;">内容</td><td  style="padding:2px;">${rep.data.content}</td></tr>
                          <tr><td  style="padding:2px;">更新时间</td><td  style="padding:2px;">${rep.data.updateTime}</td></tr>
                       </table>`;
        } else {
          html = "<div>暂无信息</div>";
        }

        this.$message({
          dangerouslyUseHTMLString: true,
          message: html,
          duration: 0,
          showClose: true
        });
      });
    },
    querySysMessageList(data) {
      getSysMessageList(data).then(res => {
        if (res.success) {
          queryResp(this.msgList, this.sysPageTen, res.data);
        }
      });
    },
    queryNotice(data) {
      getNoticeList(data).then(res => {
        if (res.success) {
          queryResp(this.noticeList, this.pageTen, res.data);
        }
      });
    },
    currentchange(i) {
      this.pageLocation = i;
      this.queryNotice({
        pageIndex: i,
        pageSize: pubParam.page.pageSize
      });
    },
    sysPageTenchange(i) {
      this.syspageLocation = 1;
      this.querySysMessageList({
        pageIndex: i,
        pageSize: pubParam.page.pageSize
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  background: #fff;
  padding: 30px;
  height: 100%;
  overflow: hidden;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  height: 50%;
}
.grid-content {
  border-radius: 4px;
  min-height: 360px;
  overflow: hidden;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.todotitle {
  font-size: 16px;
  color: #000;
  font-weight: 600;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}
.todoeve {
  list-style-type: none;
  font-size: 14px;
  color: #999;
  border-bottom: 1px solid #eee;
  padding: 10px 20px;
}
.todoText {
  display: inline-block;
  width: 80%;
  box-sizing: border-box;
}
.todoButton {
  vertical-align: top;
  display: inline-block;
  width: 16%;
  box-sizing: border-box;
  padding-top:7px;
}
.dateText {
  color: rgba(0, 0, 0, 0.3);
  font-weight: 400;
  margin-top: 5px;
}
.seeMore {
  float: right;
  font-weight: normal;
  font-size: 14px;
  color: #409eff;
}
</style>
