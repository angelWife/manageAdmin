<template>
  <div class="msgBox">
    <el-form ref="form" label-width="120px">
      <el-form-item :label="title" lass="mustFill">
        <div v-if="seleMember">
          <el-radio v-model="sendObjectType" :disabled="check" :label="1" @change="memberChange">会员</el-radio>
          <el-radio
            :disabled="check"
            v-model="sendObjectType"
            v-if="platform=='sms'"
            :label="3"
            @change="memberChange"
          >手机名单</el-radio>
          <el-radio
            :disabled="check"
            v-model="sendObjectType"
            v-if="platform=='mail'"
            :label="2"
            @change="memberChange"
          >邮箱名单</el-radio>
        </div>
        <div v-if="sendObjectType == 1">
          <div class="flex" style="justify-content:space-between;width:320px">
            <span>会员:</span>
            <div v-if="!check">
              <el-button type="primary" size="mini" @click="addMember()">添加</el-button>
              <el-button type="primary" size="mini" @click="clearTag()">清空</el-button>
            </div>
          </div>
          <div class="member">
            <el-tag
              v-for="tag in tags"
              :key="tag.index"
              :closable="!check"
              size="small"
              type="info"
              @close="handleClose(tag)"
            >{{tag.companyName}}</el-tag>
          </div>
          <span>会员组：</span>
          <div class="member">
            <el-checkbox
              :disabled="check"
              v-for="item in checkList"
              :key="item.index"
              v-model="item.checked"
              @change="checkChange(item)"
            >{{item.groupName}}</el-checkbox>
          </div>
          <div class="p-t-b-10 text" v-if="seleMember">系统将根据选择的会员组与会员合并汇总出发送对象名单，确保消息不会重复发送</div>
        </div>
        <!-- 手机名单 -->
        <div v-if="sendObjectType == 3">
          <div class="flex" style="justify-content:space-between;width:320px" v-if="!check">
            <span class="float-left">
              <el-button size="mini">导入</el-button>
              <span class="blue m-l-20 cur-pointer">手机名单模板下载</span>
            </span>
            <span class="float-right">
              <el-button size="mini" @click="clearName">清空</el-button>
            </span>
          </div>
          <el-input
            :disabled="check"
            class="phoneText"
            v-model="mobileList"
            type="textarea"
            :rows="10"
            @input="nameChange"
            placeholder="请输入内容"
          ></el-input>
          <div class="p-t-b-10 text">可以选择手工输入，手机号用英文逗号隔开；也可以选择导入文本文件，系统会自动对手机名单进行去重处理</div>
        </div>
        <!-- 邮件名单 -->
        <div v-if="sendObjectType == 2">
          <div class="flex" style="justify-content:space-between;width:320px">
            <span class="float-left">
              <el-button size="mini">导入</el-button>
              <span class="blue m-l-20 cur-pointer">邮件名单模板下载</span>
            </span>
            <span class="float-right">
              <el-button size="mini" @click="clearName">清空</el-button>
            </span>
          </div>
          <el-input
            :disabled="check"
            class="phoneText"
            v-model="mailList"
            type="textarea"
            :rows="10"
            @input="nameChange"
            placeholder="请输入内容"
          ></el-input>
          <div class="p-t-b-10 text">可以选择手工输入，手机号用英文逗号隔开；也可以选择导入文本文件，系统会自动对手机名单进行去重处理</div>
        </div>

        <div v-if="!sendTime">
          <div>首次发布后立即提醒推送对象：</div>
          <div>
            <el-checkbox v-model="boolist.mailck" :disabled="check" @change="mailChange">邮件提醒</el-checkbox>
            <el-checkbox v-model="boolist.msgck" :disabled="check" @change="msgChange">短信提醒</el-checkbox>
          </div>
          <div style="color:#666">如果年审对象有变更，且非首次发布，重新发布后将不会主动发送提醒，可选择人工沟通，或者年审监控中全体发送提醒完成该操作</div>
        </div>
      </el-form-item>

      <el-form-item label="发送时间：" v-if="sendTime">
        <div>
          <el-radio
            v-model="send.flagSendDelay"
            @change="radioChange"
            :label="1"
            :disabled="check"
          >立即</el-radio>
          <el-radio
            v-model="send.flagSendDelay"
            @change="radioChange"
            :label="2"
            :disabled="check"
          >延迟</el-radio>
        </div>
        <el-date-picker
          v-model="send.sendTime"
          type="datetime"
          placeholder="选择时间"
          :disabled="send.flagSendDelay==1 || check"
          value-format="timestamp"
          style="width: 100%;"
        ></el-date-picker>
        <div class="p-t-b-10 text">选择立即，系统将在发布后同时发送；选择延迟，将会在发布后到达发送时间后再进行发送；如果发布时已经超过发送时间，将会立即进行发送</div>
      </el-form-item>
    </el-form>
    <!-- 添加会员 -->
    <el-dialog title="添加会员" :visible.sync="addVisible" width="70%">
      <el-row>
        <el-col :span="8">
          <div>
            <span>会员类型：</span>
            <el-select style="width:160px;" v-model="memberType" placeholder="请选择">
              <el-option v-for="item in memberList" :key="item.id" :value="item.dictVal"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>机构类型：</span>
            <el-select style="width:160px;" v-model="orgType" placeholder="请选择">
              <el-option v-for="item in orgList" :key="item.id" :value="item.dictVal"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>  会员名：</span>
            <el-input style="width:160px;" v-model="name" placeholder="请输入" class="input_style"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <div>
            <span style="vertical-align: middle; display: inline-block; width: 72px;">统一社会信用编码：</span>
            <el-input style="width:160px;" v-model="scoialcode" placeholder="请输入" class="input_style"></el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <span>公司性质：</span>
            <el-select style="width:160px;" v-model="busPro" placeholder="请选择">
              <el-option v-for="item in proList" :key="item.id" :value="item.dictVal"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9">
          <div>
            <span>入会时间：</span>
            <el-date-picker
             style="width:230px;"
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
  props: {
    title: { type: String, required: true },
    bus: { type: Object, required: false },
    id: { type: String, required: false },
    pushType: { type: Number, required: true, default: 1 }, // (1, "活动) (2, "年审") (3,"系统消息") (4,"通知公告") (5,"邮件发送") (6,"短信发送")
    check: { type: Boolean, required: false },
    seleMember: { type: Boolean, required: false, default: false },
    sendTime: { type: Boolean, required: false, default: false },
    platform: { type: String, required: false }
  },
  data() {
    return {
      msgForm: {
        msgContent: "",
        phone: ""
      },
      sendObjectType: 1, //1:会员,2:邮箱,3:手机号码
      send: {
        flagSendDelay: 1,
        sendTime: ""
      },
      annualCheck: false,
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

      mobileList: "",
      mailList: "",
      msgUp: {
        companyIdList: [],
        groupIdList: [],
        flagMessageRemind: 2,
        flagEmailRemind: 2,
        mobileNumList: [],
        emailAddressList: []
      },

      platArr: [],
      mailArr: []
    };
  },
  created() {
    apiSelect({ type: 1 }, this.orgList); //机构类型
    apiSelect({ type: 2 }, this.memberList); // 会员类型
    apiSelect({ type: 4 }, this.proList); // 性质
    let self = this

  },
  mounted() {
    // 编辑
    console.log(this.id)
    if (!!this.id) {
      this.apiMsgMember({ type: this.pushType, typeId: Number(this.id) });
      this.bus.$on("timeEdit", data => {
        self.send = data;
        self.timeData();
      });
      this.bus.$on("sendObject", data => {
        this.sendObjectType = data;
        this.objData();
      });
    } else {
      // 新建
      this.apiMsgMember({}); // 显示会员组
    }
    this.passData();

    if (this.sendTime) {
      this.timeData();
    }
    if (this.seleMember) {
      this.objData();
    }
  },
  methods: {
    passData() {
      this.bus.$emit("msgBox", this.msgUp);
    },
    timeData() {
      this.bus.$emit("sendTime", this.send.sendTime);
    },
    objData() {
      this.bus.$emit("sendObj", this.sendObjectType);
    },

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
                  this.msgUp.groupIdList.push(v.groupId);
                }
              });
              this.tags = data.memberVoList ? data.memberVoList : [];
              this.tags.map(v => {
                this.msgUp.companyIdList.push(v.companyId);
              });
              this.boolist = {
                mailck: data.flagEmail == 1,
                msgck: data.flagMessage == 1
              };
              this.msgUp.flagMessageRemind = data.flagMessage;
              this.msgUp.flagEmailRemind = data.flagEmail;
              if (this.platform == "sms") {
                const mobileNumList = data.mobileNumList.filter(Boolean);
                this.mobileList = mobileNumList ? mobileNumList.join(";") : "";
                this.msgUp.mobileNumList = this.mobileList
                  .split(";")
                  .filter(Boolean);
              }
              if (this.platform == "mail") {
                const emailAddressList = data.emailAddressList.filter(Boolean);
                this.mailList = emailAddressList
                  ? emailAddressList.join(";")
                  : "";
                this.msgUp.emailAddressList = this.mailList
                  .split(";")
                  .filter(Boolean);
                console.log(this.msgUp);
              }
              this.passData();
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
      this.msgUp.companyIdList = [];
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.tags.map(v => {
        this.msgUp.companyIdList.push(v.companyId);
      });
      this.checkArr = this.tags;
      this.passData();
      console.log("删除后的companyId:", this.msgUp.companyIdList);
      /*this.pMsgUp();*/
    },
    addMember() {
      this.addVisible = true;
      pubParam.pageDialog.memberStatus = 1
      this.displayTable(pubParam.pageDialog);
    },
    clearTag() {
      this.checkArr = [];
      this.tags = [];
    },
    clearName() {
      this.mailList = "";
      this.mobileList = "";
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
          } else {
            warnMES(res.message);
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
        memberType: selectType(this.memberType, this.memberList),
        institutionType: selectType(this.orgType, this.orgList),
        companyName: this.name,
        memberStatus: 1,
        creditId: this.scoialcode,
        companyType: selectType(this.busPro, this.proList),
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
      this.msgUp.companyIdList = [];
      this.tags.map(v => {
        this.msgUp.companyIdList.push(v.companyId);
      });
      this.$refs.memberTable.clearSelection();
      this.passData();
      console.log("会员ID", this.msgUp.companyIdList);
      console.log("数组对象", this.tags);
      /*this.pMsgUp();*/
    },
    checkChange(check) {
      if (check.checked) {
        this.msgUp.groupIdList.push(check.groupId);
      } else {
        this.msgUp.groupIdList.splice(this.tags.indexOf(check.groupId), 1);
      }
      this.passData();
    },
    mailChange(val) {
      this.msgUp.flagEmailRemind = val ? 1 : 2;
      this.passData();
    },
    msgChange(val) {
      this.msgUp.flagMessageRemind = val ? 1 : 2;
      this.passData();
    },
    radioChange(label) {
      this.send.flagSendDelay = label;
      this.timeData();
      console.log(label);
    },
    memberChange(label) {
      this.sendObjectType = label;
      this.objData();
    },
    nameChange(value) {
      if (this.platform == "sms") {
        this.msgUp.mobileNumList = !!value.split(";") ? value.split(";") : [];
      } else if (this.platform == "mail") {
        this.msgUp.emailAddressList = !!value.split(";")
          ? value.split(";")
          : [];
      }

      this.passData();
    }
    /* pMsgUp(){
      console.log('cmsgup',this.msgUp);
      this.$emit('pMsgUp',this.msgUp);
    }*/
  }
};
</script>
<style lang="less" scoped>
.msgBox {
  background-color: #fff;
  padding: 30px;
  height: 100%;
  .el-form {
    width: 600px;
  }
  .phoneText {
    margin-top: 10px;
    width: 320px;
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
