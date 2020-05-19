<template>
  <div class="container">
    <el-form ref="form" label-width="100px">
      <el-form-item label="年审名称：" class="mustFill">
        <el-input v-model="name" :disabled="annualCheck" style="width:300px"></el-input>
        <el-button @click="$router.go(-1)" v-if="annualCheck" style="float:right;"> 返回</el-button>
      </el-form-item>
      <el-form-item label="邀请对象：" lass="mustFill">
        <div class="flex" style="justify-content:space-between;width:320px">
          <span>会员:</span>
          <div v-if="!annualCheck">
            <el-button type="primary" size="mini" @click="addMember()">添加</el-button>
            <el-button type="primary" size="mini" @click="clearTag()">清空</el-button>
          </div>
        </div>
        <div class="member">
          <el-tag
            v-for="tag in tags"
            :key="tag.index"
            :closable="!annualCheck"
            size="small"
            type="info"
            @close="handleClose(tag)"
          >{{tag.companyName}}</el-tag>
        </div>
        <span>会员组：</span>
        <div class="member">
          <el-checkbox
            :disabled="annualCheck"
            v-for="check in checkList"
            :key="check.index"
            v-model="check.checked"
            @change="checkChange(check)"
          >{{check.groupName}}</el-checkbox>
        </div>
        <div>首次发布后立即提醒推送对象：</div>
        <div>
          <el-checkbox v-model="boolist.mailck" :disabled="annualCheck" @change="mailChange">邮件提醒</el-checkbox>
          <el-checkbox v-model="boolist.msgck" :disabled="annualCheck" @change="msgChange">短信提醒</el-checkbox>
        </div>
        <div style="color:#666">如果年审对象有变更，且非首次发布，重新发布后将不会主动发送提醒，可选择人工沟通，或者年审监控中全体发送提醒完成该操作</div>
      </el-form-item>
    </el-form>
    <div style="text-align:right;width:600px" v-if="!annualCheck">
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="submitAnn()">提交</el-button>
    </div>
    <!-- 添加会员 -->
    <el-dialog title="添加会员" :visible.sync="addVisible" width="75%">
      <el-row>
        <el-col :span="8">
          <div>
            <span>会员类型：</span>
            <el-select v-model="memberType" placeholder="请选择">
              <el-option v-for="item in memberList" :key="item.id" :value="item.dictKey" :label="item.dictVal"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>机构类型：</span>
            <el-select v-model="orgType" placeholder="请选择">
              <el-option v-for="item in orgList" :key="item.id" :value="item.dictKey" :label="item.dictVal"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>会员名：</span>
            <el-input v-model="name" placeholder="请输入" class="input_style"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div>
            <span>统一社会信用编码：</span>
            <el-input v-model="scoialcode" placeholder="请输入" class="input_style"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>公司性质：</span>
            <el-select v-model="busPro" placeholder="请选择">
              <el-option v-for="item in proList" :key="item.id" :value="item.dictKey" :label="item.dictVal"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>入会时间：</span>
            <el-date-picker
              v-model="admiTime"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="至"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="text_right">
          <el-button type="primary" @click="handleQuery()">查询</el-button>
          <el-button @click="clear">重置</el-button>
        </el-col>
      </el-row>
      <div style="min-height:200px">
        <el-table
          empty-text="没有符合条件的会员"
          :data="memberData"
          ref="memberTable"
          style="width: 100%"
          :row-key="getRowKey"
          @selection-change="handleSelect"
        >
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column prop="memberCode" label="会员代码"></el-table-column>
          <el-table-column prop="memberTypeVal" label="会员类型"></el-table-column>
          <el-table-column prop="institutionTypeVal" label="机构类型"></el-table-column>
          <el-table-column prop="companyName" label="机构名称"></el-table-column>
          <el-table-column prop="creditCode" label="社会统一编码"></el-table-column>
          <el-table-column prop="companyTypeVal" label="公司性质" width="150"></el-table-column>
          <el-table-column prop="buildDate" label="成立日期" width="100"></el-table-column>
          <el-table-column prop="flagListed" label="是否上市" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.flagListed==1">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column prop="dateJoin" label="入会时间" width="100"></el-table-column>
        </el-table>
      </div>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="submitSele()">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  warnMES,
  successMES,
  tipMES,
  pageTen,
  pubParam,
  apiSelect,
  apiMemberStatus,
  selectType,
  queryResp,
  mapTime,
  getDateTime,
  flagList,
  deleteDuplic
} from "../../utils/common";
export default {
  data() {
    return {
      annualCheck: false,
      id: "",
      name: "",
      checkArr: [],
      checkId: [],
      tags: [],
      checkList: [],
      boolist: {
        mailck: false,
        msgck: false
      },

      pageTen,

      orgList: [],
      proList: [],
      memberList: [],
      addVisible: false,
      memberData: [],
      memberType: "",
      orgType: "",
      name: "",
      scoialcode: "",
      busPro: "",
      admiTime: "",

      MsgMember: [],

      companyIdList: [],
      groupIdList: [],
      flagMessageRemind: 2,
      flagEmailRemind: 2
    };
  },
  created() {
    apiSelect({ type: 1 }, this.orgList); //机构类型
    apiSelect({ type: 2 }, this.memberList); // 会员类型
    apiSelect({ type: 4 }, this.proList); // 性质

    // 编辑状态
    if (!!this.$route.query.edit) {
      this.name = this.$route.query.annualName;
      this.id = this.$route.query.annualID;
      this.apiMsgMember({ type: 2, typeId: this.$route.query.annualID });
      // 查看
    } else if (this.$route.query.check) {
      this.annualCheck = true;
      this.name = this.$route.query.annualName;
      this.id = this.$route.query.annualID;
      this.apiMsgMember({ type: 2, typeId: this.$route.query.annualID });
      // 新建
    } else {
      console.log(this.$route);
      this.apiMsgMember({}); // 显示会员组
    }
  },
  methods: {
    // 编辑 展示 数据
    apiMsgMember(params) {
      this.$api.member
        .showMsgMmber(params)
        .then(res => {
          if (res.success) {
            const data = res.data;
            this.checkList = data.groupVoList ? data.groupVoList : [];
            if (!!params) {
              this.checkList.map(v => {
                if (v.checked) {
                  this.groupIdList.push(v.groupId);
                }
              });
              this.tags = data.memberVoList ? data.memberVoList : [];
              this.tags.map(v => {
                this.companyIdList.push(v.companyId);
              });
              this.boolist = {
                mailck: data.flagEmail == 1,
                msgck: data.flagMessage == 1
              };
              this.flagMessageRemind = data.flagMessage;
              this.flagEmailRemind = data.flagEmail;
            }
          } else {
            warnMES(res.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleClose(tag) {
      this.companyIdList = [];
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.tags.map(v => {
        this.companyIdList.push(v.companyId);
      });
      console.log("删除后的companyId:", this.companyIdList);
    },
    addMember() {
      this.addVisible = true;
      this.displayTable(pubParam.pageDialog);
    },
    clearTag() {
      this.tags = [];
    },
    displayTable(params) {
      this.$api.member
        .addMemberName(params)
        .then(res => {
          if (res.success) {
            queryResp(
              this.memberData,
              this.pageTen,
              res.data,
              "buildDate",
              "dateJoin"
            );
          } 
        })
        .catch(error => {
          console.log(error);
        });
    },
    currentchange(i) {
      this.displayTable({
        pageIndex: i,
        pageSize: pubParam.page.pageSize,
        ...this.queryIF()
      });
    },
    queryIF() {
      let query = {
        memberType: this.memberType,
        institutionType: this.orgType,
        companyName: this.name,
        creditId: this.scoialcode,
        companyType: this.busPro,
        joinDateFrom: getDateTime(this.admiTime[0]),
        joinDateTo: getDateTime(this.admiTime[1])
      };
      return query;
    },
    handleQuery() {
      this.displayTable({ ...pubParam.pageDialog, ...this.queryIF() });
    },
    clear() {
      this.memberType = "";
      this.orgType = "";
      this.name = "";
      this.scoialcode = "";
      this.busPro = "";
      this.busPro = "";
    },
    // CHECKBOX
    handleSelect(sele) {
      sele.map(v => {
        this.checkArr.push({
          companyId: v.companyId,
          companyName: v.companyName
        });
      });
    },
    getRowKey(row) {
      return row.companyId;
    },
    submitSele() {
      this.addVisible = false;
      this.tags = deleteDuplic(this.checkArr, "companyId");
      this.companyIdList = [];
      this.tags.map(v => [this.companyIdList.push(v.companyId)]);
      this.$refs.memberTable.clearSelection();
      console.log("会员ID", this.companyIdList);
      console.log("数组对象", this.tags);
    },
    checkChange(check) {
      if (check.checked) {
        this.groupIdList.push(check.groupId);
      } else {
        this.groupIdList.splice(this.tags.indexOf(check.groupId), 1);
      }
    },
    mailChange(val) {
      this.flagEmailRemind = val ? 1 : 2;
    },
    msgChange(val) {
      this.flagMessageRemind = val ? 1 : 2;
    },
    // 新建 name
    newName() {
      if(!this.name){
         warnMES("年审名称必填");
         return
      } 
      if(this.groupIdList.length==0 && this.companyIdList.length==0){
         warnMES("邀请对象至少选一个");
         return
      }
      
      this.$api.member
        .newAnnual({
          name: this.name,
          id: this.id,
          memberGroupList:this.groupIdList.join(','),
          memberList:this.companyIdList.join(',')
        })
        .then(res => {
          if (res.success) {
            let typeId = res.data;
            this.newGet(typeId);
          } 
        })
        .catch(error => {
          console.error(error);
        });
    },
    // 新建 推送
    newGet(id) {
      
      this.$api.member
        .publicMsg({
          companyIdList: this.companyIdList ? this.companyIdList : [],
          flagMessageRemind: this.flagMessageRemind
            ? this.flagMessageRemind
            : 2,
          flagEmailRemind: this.flagEmailRemind ? this.flagEmailRemind : 2,
          groupIdList: this.groupIdList ? this.groupIdList : [],
          typeId: id,
          type: 2
        })
        .then(res => {
          if (res.success) {
            successMES("提交成功");
            this.$router.go(-1);
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitAnn() {
      this.newName();
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 30px;
  height: 100%;
  .el-form {
    width: 600px;
  }
  .member {
    width: 320px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    height: 230px;
    overflow: auto;
    span {
      margin-right: 10px;
    }
    .el-checkbox {
      display: block;
      height: 30px;
      line-height: 30px;
    }
  }
  .input_style,
  .el-range-editor.el-input__inner,
  .el-select {
    width: calc(100% - 140px);
  }
}
</style>