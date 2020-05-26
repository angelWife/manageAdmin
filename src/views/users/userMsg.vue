<template>
    <div class='container'>
        <el-row :gutter="120" style="height:100%">
            <el-col :span="12">
                <div class="grid-content">
                  <div class= 'todotitle'>待办事项</div>
                  <div style="padding:10px ">
                       暂无代办事项111
                  </div>
                 
                 <!--  <ul v-for="todo in todoList" :key='todo.id' class='todoContent'>
                      <li class="todoeve">
                          <div class='todoText'>
                              <div>{{todo.desc}}</div>
                              <div class="dateText">{{todo.date}}</div>
                          </div>
                          <div class='todoButton'>
                              <ElButton type="primary" size='mini' @click="deal($event)">处理</ElButton>
                          </div>
                      </li>
                  </ul> -->
                </div>
            </el-col>
            <el-col :span="12" v-if="role.name == 'recoMember'">
                <div class="grid-content">
                    <div class= 'todotitle'><span>通知公告</span> <router-link to="" class="seeMore">查看更多>></router-link></div>
                    <ul v-for="todo in noticeList" :key='todo.id' class='todoContent'>
                        <li class="todoeve">
                            <div class='todoText'>
                                <div>{{todo.noticeData}}</div>
                                <div class="dateText">{{todo.sendTime}}</div>
                            </div>
                            <div class='todoButton'>
                                <ElButton type="primary" size='mini' @click="showNotice(todo)">查看</ElButton>
                            </div>
                        </li>
                    </ul>
                     <el-pagination
                      class="text_center"
                      style="margin-top:20px"
                      background
                      layout="total,prev, pager, next"
                      :total="pageTen.total"
                      :page-size="pageTen.pageSize"
                      :current-page.sync="pageTen.currentPage"
                      @current-change="currentchange"
                    ></el-pagination>
                </div>
            </el-col>
            <el-col :span="12" v-if="role.name == 'recoMember'">
                <div class="grid-content">
                    <div class= 'todotitle'><span>会员活动</span> <router-link to="" class="seeMore">查看更多>></router-link></div>
                    <div style="padding:10px ">
                      暂无会员活动
                    </div>
                    <!-- <ul v-for="todo in memberActivity" :key='todo.id' class='todoContent'>
                        <li class="todoeve">
                            <div class='todoText'>
                                <div>{{todo.desc}}</div>
                                <div class="dateText">{{todo.date}}前截止报名</div>
                            </div>
                            <div class='todoButton'>
                                <ElButton type="primary" size='mini' @click="deal($event)">报名</ElButton>
                            </div>
                        </li>
                    </ul> -->
                </div>
            </el-col>
            <el-col :span="12" v-if="role.name == 'recoMember'">
                <div class="grid-content">
                    <div class= 'todotitle'><span>系统消息</span> <router-link to="" class="seeMore">查看更多>></router-link></div>
                    <ul v-for="todo in msgList" :key='todo.id' class='todoContent'>
                        <li class="todoeve">
                            <div class='todoText'>
                                <div>{{todo.content}}</div>
                                <div class="dateText">{{todo.sendTime}}</div>
                            </div>
                            <div class='todoButton'>
                                <ElButton type="primary" size='mini' @click="sysMsgCheck(todo)">查看</ElButton>
                            </div>
                        </li>
                    </ul>
                     <el-pagination
                      class="text_center"
                      style="margin-top:20px"
                      background
                      layout="total,prev, pager, next"
                      :total="sysPageTen.total"
                      :page-size="sysPageTen.pageSize"
                      :current-page.sync="sysPageTen.currentPage"
                      @current-change="sysPageTenchange"
                    ></el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>

import { mapState } from "vuex";
import  { getNoticeList ,checkNoticeDetail,getSysMessageList,checkSysMessageDetail} from "@/http/moudules/user"
import { queryResp, pubParam ,  pageTen} from "@/utils/common";
export default { 
    data() {
        return {
            pageLocation: 1,
            syspageLocation:1,
            pageTen,
            sysPageTen:{...pageTen},
            todoList:[{
                id:1,
                desc: '深圳市前海鑫鼎基金管理有限公司 / 年费缴纳 / 缴纳确认',
                date: '2010-3-10'
            }],
            noticeList:[],
            memberActivity:[{
                id:1,
                desc: '保险资金股权投资第二期专题培训',
                date: '2010-3-10'
            }],
            msgList:[{
                id:1,
                desc: '会员认定申请审批通过',
                date: '2010-3-10'
            }]
        }
    },
    computed:{
        ...mapState({
            role: state=>state.user.role,
        }),
    },
    created(){
      this.queryNotice(pubParam.page);
      this.querySysMessageList(pubParam.page);
    },
    methods:{
        showNotice(item){
              checkNoticeDetail(item.id).then(rep=>{
                let html=''; 
                if(rep && rep.code=='200'){
                   html=`<table>
                          <tr><td  style="padding:2px;">标题</td><td  style="padding:2px;">${rep.data.title}</td></tr>
                          <tr><td  style="padding:2px;">创建人</td><td  style="padding:2px;">${rep.data.createUserName}</td></tr>
                          <tr><td  style="padding:2px;">更新人</td><td  style="padding:2px;">${rep.data.updateUserName}</td></tr>
                          <tr><td  style="padding:2px;">状态</td><td  style="padding:2px;">${rep.data.msgStatus}</td></tr>
                          <tr><td  style="padding:2px;">内容</td><td  style="padding:2px;">${rep.data.content}</td></tr>
                          <tr><td  style="padding:2px;">时间</td><td  style="padding:2px;">${rep.data.sendTime}</td></tr>
                       </table>`;
                       this.$message({
                        dangerouslyUseHTMLString: true,
                        message: html,
                        duration:0,
                        showClose:true

                      });
                }

              
              })
              
        },
        sysMsgCheck(item){
             checkSysMessageDetail(item.id).then(rep=>{
                let html=''; 
                if(rep && rep.code=='200'){
                   html=`<table>
                          <tr><td  style="padding:2px;">标题</td><td  style="padding:2px;">${rep.data.title}</td></tr>
                          
                          <tr><td  style="padding:2px;">状态</td><td  style="padding:2px;">${rep.data.msgStatus}</td></tr>
                          <tr><td  style="padding:2px;">内容</td><td  style="padding:2px;">${rep.data.content}</td></tr>
                          <tr><td  style="padding:2px;">更新时间</td><td  style="padding:2px;">${rep.data.updateTime}</td></tr>
                       </table>`;
                   this.$message({
                      dangerouslyUseHTMLString: true,
                      message: html,
                      duration:0,
                      showClose:true

                    });    
                }

              
              })
        },
        querySysMessageList(data){
            getSysMessageList(data).then(res=>{
              if (res.success) {
                queryResp(this.msgList, this.sysPageTen, res.data);

              } 
           })
        },
        queryNotice(data){
           getNoticeList(data).then(res=>{
              if (res.success) {
                queryResp(this.noticeList, this.pageTen, res.data);

              } 
           })
        },
        currentchange(i) {
          this.pageLocation = i;
          this.queryNotice({
            pageIndex: i,
            pageSize: pubParam.page.pageSize,
            
          });
        },
        sysPageTenchange(i){
            this.syspageLocation=1;
            this.querySysMessageList({
              pageIndex: i,
              pageSize: pubParam.page.pageSize,
            
          });
        }
    }
}
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
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  } 
  .todotitle{
      font-size: 16px;
      color: #000;
      font-weight: 600;
      padding: 10px 20px;
      border-bottom: 1px solid #eee ;
  }
  .todoContent{
      margin: 20px;
  }
  .todoeve{
      list-style-type: none;
      font-size: 14px;  
      color: #999;
      border-bottom: 1px solid #eee;
      padding-bottom: 15px;

  }
  .todoText{
      display: inline-block;
      width: 80%;
      box-sizing: border-box;
  }
  .todoButton{
      vertical-align: top;
      display: inline-block;
      width: 16%;
      box-sizing: border-box;
      padding-top:7px;
  }
 .dateText{
     color: rgba(0,0,0,0.3);
     font-weight: 400;
     margin-top: 10px;
 }
 .seeMore{
     float: right;
     font-weight: normal;
     font-size: 14px;
     color: #409EFF;
 }
</style>
