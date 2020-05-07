<template>
  <div class="acriveAdd comModal hasfoot">
    <el-form
      class="comFormBox"
      :model="activityForm"
      :rules="rules"
      ref="activityForm"
      label-width="120px"
      label="left"
    >
      <el-row class="m-t-20">
        <el-col :span="10">
          <el-form-item label="活动名称：" prop="name">
            <el-input v-model="activityForm.name" placeholder="请输入活动名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="活动类型：" prop="actype">
            <el-select v-model="activityForm.type" placeholder="请选择机构类型">
              <el-option label="保险公司" value="baoxin"></el-option>
              <el-option label="财务公司" value="caiwu"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="活动开始结束时间：" prop="actStart">
            <el-date-picker
              v-model="activityForm.actStart"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="活动报到开始结束时间:" prop="actStart">
            <el-date-picker
              v-model="activityForm.liveRep"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="活动报名开始结束时间：" prop="actStart">
            <el-date-picker
              v-model="activityForm.actSign"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="活动地点：">
            <el-input v-model="activityForm.place" placeholder="请输入活动地点"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="活动人数：">
            <el-input v-model="activityForm.person" placeholder="请输入活动人数"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="会员单位允许报名人数：">
            <el-input v-model="activityForm.number" placeholder="请输入会员单位允许报名人数"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="入会申请书.doc" class="mustFill">
            <el-upload
              class="upload-box float-left"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
            >
              <el-button size="small" icon="el-icon-upload2">上传文件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="10"></el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="消息推送：" prop="address">
            <span class="spantext">会员：</span>
            <el-button type="primary" size="small" @click="addVisible=true">添加</el-button>
            <el-button type="primary" size="small">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label=" ">
            <div class="vipBox">
              <el-tag
                closable
                type="info"
                v-for="item in memberList"
                :key="item.index"
              >{{item.value}}</el-tag>
            </div>
            <div class="p-t-b-10">会员组</div>
            <div class="vipBox">
              <el-checkbox v-for="gp in group" :key="gp.index" v-model="gp.check">{{gp.value}}</el-checkbox>
            </div>
            <div class="p-t-b-10">首次发布后立即提醒推送对象：</div>
            <div class="chooseBox">
              <el-checkbox v-model="mailCheck">邮件提醒</el-checkbox>
              <el-checkbox v-model="msgCheck">短信提醒</el-checkbox>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 添加会员 -->
    <el-dialog title="添加会员" :visible.sync="addVisible" width="60%">
      <el-row>
        <el-col :span="8">
          <div>
            <span>会员代码：</span>
            <el-input v-model="code" placeholder="请输入" class="input_style"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>机构类型：</span>
            <el-select v-model="orgType" placeholder="请选择">
              <el-option v-for="item in orgList" :key="item.id" :value="item.value"></el-option>
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
              <el-option v-for="item in proList" :key="item.id" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>入会时间：</span>
            <el-date-picker
              v-model="admiTime"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="text_right">
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-col>
      </el-row>
      <div style="max-height:400px">
        <el-table empty-text="没有符合条件的会员" :data="memberData" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="code" label="会员代码"></el-table-column>
          <el-table-column prop="memberType" label="会员类型"></el-table-column>
          <el-table-column prop="mechType" label="结构类型"></el-table-column>
          <el-table-column prop="mechName" label="机构名称"></el-table-column>
          <el-table-column prop="allCode" label="社会统一编码"></el-table-column>
          <el-table-column prop="compType" label="公司性质" width="150"></el-table-column>
          <el-table-column prop="creaateDate" label="成立日期" width="100"></el-table-column>
          <el-table-column prop="boolList" label="是否上市" width="100"></el-table-column>
          <el-table-column prop="memberStatus" label="会员状态" width="100"></el-table-column>
          <el-table-column prop="joinDate" label="入会时间" width="100"></el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="text_center"
        style="margin-top:20px"
        background
        layout="total,prev, pager, next"
        :total="100"
      ></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="addVisible = false">提交</el-button>
      </span>
    </el-dialog>
    <div class="footBtnBox text_right">
      <el-button type>取消</el-button>
      <el-button type>保存</el-button>
      <el-button type="primary" @click="submitForm('activityForm')">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    function startTime(y, m, d) {
      let showDate = new Date(y, m, d);
      let seperator = "-";
      let year = showDate.getFullYear();
      let month = showDate.getMonth();
      let day = showDate.getDate();
      var strDate = showDate.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator + month + seperator + strDate;
      return currentdate;
    }
    function endTime(y, m, d) {
      let showDate = new Date(y, m, d);
      let seperator = "-";
      let year = showDate.getFullYear();
      let month = showDate.getMonth();
      let day = showDate.getDate();
      var strDate = showDate.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator + month + seperator + strDate;
      return currentdate;
    }
    return {
      addVisible: false,
      activityForm: {
        name: "asdas",
        type: "保险公司",
        actStart: [startTime(2019, 3, 1), endTime(2019, 8, 1)],
        liveRep: [startTime(2019, 3, 11), endTime(2019, 8, 11)],
        actSign: [startTime(2019, 5, 1), endTime(2019, 5, 1)],
        place: "asdasd",
        person: "10",
        number: "20"
      },
      memberList: [
        {
          value: "会员1"
        },
        {
          value: "会员2"
        },
        {
          value: "会员3"
        }
      ],
      group: [
        {
          value: "监事组",
          check: false
        },
        {
          value: "理事组",
          check: false
        },
        {
          value: "委员会",
          check: true
        }
      ],
      mailCheck: true,
      msgCheck: true,
      checkedCities: [],
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        actype: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        actStart: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      tableItems: [
        {
          name: "",
          post: "",
          tel: "",
          phone: "",
          max: "",
          email: "",
          b_email: "",
          address: "",
          weixin: "",
          default: false
        }
      ],
      memberData: [
        {
          code: "RD091201909260355",
          memberType: "会员类型XXX",
          mechType: "机构类型XXX",
          mechName: "机构名称XXXXX",
          allCode: "65165151551JSL5",
          compType: "有限公司",
          creaateDate: "2010-12-12",
          boolList: "是",
          memberStatus: "已认定",
          joinDate: "2012-05-06"
        },
        {
          code: "RD091201909260355",
          memberType: "会员类型XXX",
          mechType: "机构类型XXX",
          mechName: "机构名称XXXXX",
          allCode: "65165151551JSL5",
          compType: "有限公司",
          creaateDate: "2010-12-12",
          boolList: "是",
          memberStatus: "已认定",
          joinDate: "2012-05-06"
        },
        {
          code: "RD091201909260355",
          memberType: "会员类型XXX",
          mechType: "机构类型XXX",
          mechName: "机构名称XXXXX",
          allCode: "65165151551JSL5",
          compType: "有限公司",
          creaateDate: "2010-12-12",
          boolList: "是",
          memberStatus: "已认定",
          joinDate: "2012-05-06"
        }
      ],
      code: "",
      orgType: "",
      orgList: [
        {
          id: 1,
          value: "类型1"
        },
        {
          id: 2,
          value: "类型2"
        }
      ],
      name: "",
      scoialcode: "",
      busPro: "",
      proList: [
        {
          id: 1,
          value: "保险公司"
        },
        {
          id: 2,
          value: "证券公司"
        }
      ],
      admiTime: ""
    };
  },
  methods: {
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.group.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.group.length;
    },
    submitForm(formName) {
      this.$confirm(
        "请注意，活动提交后将需要经过审批流程，审批期间及审批后无法再对活动进行编辑",
        "",
        {
          confirmButtonText: "继续",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addTableItem() {
      let item = {
        name: "",
        post: "",
        tel: "",
        phone: "",
        max: "",
        email: "",
        b_email: "",
        address: "",
        weixin: "",
        default: false
      };
      this.tableItems.push(item);
    },
    deleteItem(ind) {
      if (this.tableItems.length == 1) {
        return false;
      } else {
        this.tableItems.splice(ind, 1);
      }
    },
    setItemDefault(ind) {
      this.tableItems.filter((v, i) => {
        if (i == ind) {
          v.default = true;
        } else {
          v.default = false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.acriveAdd {
  .spantext {
    display: inline-block;
    margin-right: 150px;
  }
  .p-t-b-10 {
    padding: 10px 0;
  }
  .vipBox {
    width: 400px;
    height: 200px;
    border-radius: 5px;
    padding: 10px 15px;
    border: 1px solid #e6e6e6;
    .el-tag {
      margin-right: 10px;
    }
    .el-checkbox {
      margin: 0 10px;
      display: block;
    }
    button {
      margin: 5px;
    }
  }
  .chooseBox {
    margin-bottom: 20px;
  }
  .comFormBox {
    width: calc(100% - 160px);
    padding: 0 20px 0 40px;
    .el-form-item {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      .el-form-item__label {
        line-height: 100% !important;
        text-align: left;
      }
      .el-form-item__content {
        -webkit-box-flex: 1;
        flex-grow: 1;
        margin-left: 0 !important;
        > .el-select {
          width: 85%;
          min-width: 200px;
        }
        > .el-input {
          width: 85% !important;
          min-width: 200px;
        }
        > .el-range-editor.el-input__inner {
          width: 85%;
        }
      }
      .avatar-uploader {
        .el-upload-list {
          .el-upload-list__item {
            width: 100px;
            height: 100px;
            line-height: 100px;
          }
        }
        .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          &:hover {
            border-color: #409eff;
          }
          &.el-upload--picture-card {
            width: 100px;
            height: 100px;
            line-height: 100px;
          }
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
        }
        .avatar {
          width: 100px;
          height: 100px;
          display: block;
        }
      }
      .el-date-editor .el-range-separator {
        min-width: 20px;
      }
    }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .input_style,
  .el-range-editor.el-input__inner,
  .el-select {
    width: calc(100% - 140px);
  }
}
.footBtn {
  padding: 20px;
}
</style>