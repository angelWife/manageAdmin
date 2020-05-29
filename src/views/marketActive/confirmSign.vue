<template>
  <div style="height:100%">
    <div class="container topMsg">
      <el-row>
        <el-col :span="8">
          <div class="c999">已确认</div>
          <div class="fs30">{{statis.ackedNum}}/{{statis.totalNum}}</div>
        </el-col>
        <el-col :span="8">
          <div class="c999">待确认</div>
          <div class="fs30">{{statis.ackNotNum}}</div>
        </el-col>
        <el-col :span="8">
          <div class="c999">已退出</div>
          <div class="fs30">{{statis.quitNum}}</div>
        </el-col>
      </el-row>
    </div>
    <div class="container hig">
      <el-form class="searchForm" ref="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构名称：">
              <el-input v-model="query.companyName" class="input_style" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会员类型：">
              <el-select v-model="query.memberType" placeholder="请选择">
                <el-option
                  v-for="item in memberList"
                  :key="item.id"
                  :value="item.dictKey"
                  :label="item.dictVal"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构类型：">
              <el-select v-model="query.institutionType" placeholder="请选择">
                <el-option
                  v-for="item in orgList"
                  :key="item.id"
                  :value="item.dictKey"
                  :label="item.dictVal"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名：">
              <el-input v-model="query.name" class="input_style" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="btn_content">
        <el-col :span="12">
          <el-button type="primary" @click="addJoin()">添加</el-button>
          <el-button type="primary" @click="exportExcel()">导出</el-button>
          <el-button type="primary" @click="wholeInform()">全体确认通知</el-button>
        </el-col>
        <el-col :span="12" class="text_right">
          <el-button type="primary" @click="handleQuery()">查询</el-button>
          <el-button @click="clear()">重置</el-button>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all">
          <signTable
            :tableData="tableAll"
            :pageTab="pageAll"
            :pageChange="allChange"
            :activityId="activityId"
            :handleQuery="handleQuery"
            @getBackFun = "getBackFun"
          ></signTable>
        </el-tab-pane>
        <el-tab-pane label="待确认" name="wait">
          <signTable
            :tableData="tableAll"
            :pageTab="pageAll"
            :pageChange="allChange"
            :activityId="activityId"
            :handleQuery="handleQuery"
            @getBackFun = "getBackFun"
          ></signTable>
        </el-tab-pane>
        <el-tab-pane label="已确认" name="pass">
          <signTable
            :tableData="tableAll"
            :pageTab="pageAll"
            :pageChange="allChange"
            :activityId="activityId"
            :handleQuery="handleQuery"
            @getBackFun = "getBackFun"
          ></signTable>
        </el-tab-pane>
        <el-tab-pane label="已退出" name="exit">
          <signTable
            :tableData="tableAll"
            :pageTab="pageAll"
            :pageChange="allChange"
            :activityId="activityId"
            :handleQuery="handleQuery"
            @getBackFun = "getBackFun"
          ></signTable>
        </el-tab-pane>
      </el-tabs>

      <!-- 添加 -->
      <el-dialog title="添加参会者" :visible.sync="addVisible" width="25%">
        <el-form :model="addform" label-width="100px">
          <el-form-item label="机构名称：" class="mustFill">
            <el-input v-model="addform.companyName" placeholder="请输入" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" class="mustFill">
            <el-input v-model="addform.peopleName" placeholder="请输入" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职务：" class="mustFill">
            <el-input v-model="addform.duty" placeholder="请输入" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机：" class="mustFill">
            <el-input v-model="addform.mobileNum" maxlength="11" placeholder="请输入" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" class="mustFill">
            <el-input v-model="addform.email" placeholder="请输入" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPerson()">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  warnMES,
  successMES,
  tipMES,
  pageTen,
  pageFive,
  pubParam,
  apiSelect,
  apiMemberStatus,
  apiPublishStatus,
  selectType,
  selectVal,
  pageChange,
  queryResp,
  mapTime,
  getDateTime,
  firstUpperCase
} from "../../utils/common";
import {isMobile, isEmail} from '../../utils/validate'
import {
  apiAct,
  apiDic,
  backPage,
  apiChose,
  apiOperate
} from "../../utils/commonApi";
import signTable from "./component/signTable";

export default {
  components: { signTable },
  data() {
    return {
      activityId: "",
      addVisible: false,
      addform: {
        companyName: "",
        peopleName: "",
        duty: "",
        mobileNum: "",
        email: ""
      },
      statis: {},
      query: {}, // 查询条件
      tableData: [],
      activeName: "all",

      memberList: [],
      orgList: [],

      tabName: "All",
      tableAll: [],
      tableWait: [],
      tablePass: [],
      tableExit: [],

      pageTen,
      pageAll: {},
      pageWait: {},
      pagePass: {},
      pageExit: {},

      signStatus: "",
      signList: [],
      pageLocation: 1
    };
  },
  created() {
    apiDic("enrollStatus", {}).then(resolve => {
      this.signList = resolve;
    });
    if (this.$route.query.confirmId) {
      this.activityId = Number(this.$route.query.confirmId);
      apiAct("activityData", { id: this.activityId }).then(resolve => {
        this.statis = resolve;
      });

      apiSelect({ type: 1 }, this.orgList); //机构类型
      apiSelect({ type: 2 }, this.memberList); // 会员类型
      this.showTable(pubParam.page);
    }
  },
  methods: {
    getBackFun(data){
      console.log(data)
      if (this.$route.query.confirmId) {
        apiAct("activityData", { id: this.activityId }).then(resolve => {
          this.statis = resolve;
        });
      }
    },
    handleClick(tab) {
      this.tableAll = [];
      this.pageAll = {};
      this.signList.map(v => {
        if (v.val == tab.label) {
          this.signStatus = v.key ? v.key : "";
          this.showTable({
            enrolStatus: this.signStatus,
            ...this.query,
            ...pubParam.page
          });
        }
      });
    },
    showTable(param) {
      apiAct("confrimData", { ...param, activityId: this.activityId }).then(
        resolve => {
          this.tableAll = resolve.rows;
          this.pageAll = backPage(resolve);
        }
      );
    },
    addJoin() {
      this.addVisible = true;
      this.addform = {
        companyName: "",
        peopleName: "",
        duty: "",
        mobileNum: "",
        email: ""
      };
    },
    submitPerson() {
      if(this.addform.companyName ==''){
        warnMES("请输入机构名称！");
        return;
      }
      if(this.addform.peopleName ==''){
        warnMES("请输入姓名！");
        return;
      }
      if(this.addform.duty ==''){
        warnMES("请输入职务！");
        return;
      }
      if(this.addform.mobileNum ==''){
        warnMES("请输入手机！");
        return;
      }
      if (!isMobile(this.addform.mobileNum)) {
        warnMES('请输入正确的手机号码！')
        return
      }
      if(this.addform.email ==''){
        warnMES("请输入邮箱！");
        return;
      }
      if (!isEmail(this.addform.email)) {
        warnMES('请输入正确的邮箱地址！')
        return
      }
      apiOperate(
        "active",
        "addJoin",
        { ...this.addform, activityId: this.activityId },
        () => {
          this.addVisible = false;
          this.activeName = "all";
          this.clear();
          this.showTable(pubParam.page);
        },
        "添加成功"
      );
    },
    clear() {
      this.pageLocation = 1;
      this.query = {
        companyName: "",
        memberType: "",
        institutionType: "",
        name: "",
        email: ""
      };
    },
    wholeInform() {
      this.$confirm(
        "<div>活动报名确认完成，可以点击全体确认通知告知参与者：</div>" +
          "<div>1.将以机构为单位，将某机构全体参与名单汇总后发送到联系人邮箱处</div>" +
          "<div>2.将对单个参与者通过短信提醒</div>",
        "",
        {
          confirmButtonText: "继续",
          cancelButtonText: "取消",
          customClass: "confrimStyle",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      )
        .then(() => {

        })
        .catch(() => {});
    },
    exportExcel: function() {
      let param = Object.assign(
        {
          enrolStatus: this.signStatus
        },
        this.query,
        {activityId: this.activityId}
      )
      apiAct("exportEnrol", param).then(
        resolve => {
          location.href = resolve.fullPath
        }
      );
    },
    // 查询
    handleQuery(pageParam) {
      if (!!pageParam) {
        this.showTable(
          Object.assign(
            {
              enrolStatus: this.signStatus,
              pageIndex: pageParam,
              pageSize: pubParam.page.pageSize
            },
            this.query
          )
        );
      } else {
        this.showTable(
          Object.assign(
            {
              enrolStatus: this.signStatus,
              ...pubParam.page
            },
            this.query
          )
        );
      }
    },
    allChange(i) {
      this.pageLocation = i;
      this.showTable({
        enrolStatus: this.signStatus,
        ...this.query,
        pageIndex: this.pageLocation,
        pageSize: pubParam.page.pageSize
      });
    }
  }
};
</script>
<style lang="less" scoped>
.topMsg {
  margin-bottom: 20px;
  text-align: center;
  .el-col {
    border-right: 1px solid #e6e6e6;
    &:last-child {
      border: 0;
    }
  }
  .fs30 {
    font-size: 30px;
    margin-top: 20px;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.container {
  background: #fff;
  padding: 30px;
  .input_style,
  .el-select {
    width: calc(100% - 140px);
  }
}
.hig {
  height: calc(100% - 150px);
}
</style>
