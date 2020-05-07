<template>
  <div class="container">
    <div class="table_title">变更情况</div>
    <div class="formBox" id="vipUser">
      <div class="formMain">
        <el-form :model="newData" label-width="140px" label="left">
          <el-row class="m-t-20">
            <el-col :span="10">
              <el-form-item label="证件类型：">
                {{newData.licenseTypeVal}}
                <span class="icon" v-if="!!newData.licenseType">
                  <el-tooltip popper-class="toolBox" effect="light" placement="right-end">
                    <div slot="content">变更前：{{newData.licenseType}}</div>
                    <i class="el-icon-warning"></i>
                  </el-tooltip>
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="证件号码：">{{newData.licenceNum}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="签发机关：">{{newData.publishOrgan}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="有效期：">{{newData.effectiveDate}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="姓名：">{{newData.name}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="性别：">{{newData.sexVal}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="籍贯：">{{newData.nativePlaice}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="出身年月：" prop="date1">{{newData.birth}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="名族：">{{newData.nation}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="最高学历：">{{newData.highestEducationVal}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="政治面貌：">{{newData.politicalAffiliation}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="职务：">{{newData.duty}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="办公电话：">{{newData.officeNum}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="传真：">{{newData.fax}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="本人电话：">{{newData.selfPhone}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="邮箱：">{{newData.mail}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="通讯地址：">{{newData.contactAddress}}</el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="微信号：">{{newData.weiChat}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="代表履历：">{{newData.personalDetails}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    newData:{ type: Object,required: false},
    oldData:{ type: Object,required: false},
  },
  data() {
    return {
      showData: {memberRepInfoVo:null},
    };
  },
  created() {
    this.companyId = this.$store.state.manage.passVal.companyId;
    // this.getBaseInfo();
  },
  methods: {
    getBaseInfo() {
      let self = this;
      // 会员代表
      this.$apt.member.basicRep({ id: this.companyId }).then(res => {
        if (res.success) {
          self.showData.memberRepInfoVo = res.data;
        }
      });
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 30px;
  background-color: #fff;
}
.table_title {
  font-size: 16px;
  font-weight: 600;
  padding: 15px 30px;
  border-bottom: 1px solid #eee;
}

.formBox {
  padding: 30px;
  .title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #d6d6d6;
    .text {
      font-size: 18px;
      color: #333;
    }
  }
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
        width: 80%;
        min-width: 200px;
      }
      > .el-input {
        width: 80% !important;
        min-width: 200px;
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
  }
  .tableBox {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    overflow-x: auto;
    .ctitle {
      margin-top: 20px;
      font-weight: 600;
    }
    .myTable {
      table-layout: fixed;
      border-collapse: separate;
      border-spacing: 0;
      min-width: 100%;
      tr {
        th {
          height: 50px;
          padding: 0 10px;
          border: 0;
          background: #f6f6f6;
          border-bottom: 1px solid #d6d6d6;
          text-align: left;
        }
        td {
          height: 50px;
          padding: 0 10px;
          border-bottom: 1px solid #d6d6d6;
          white-space: nowrap;
          text-overflow: ellipsis;
          input {
            width: 100px;
            height: 36px;
            line-height: 36px;
            padding: 0 5px;
            border: 1px solid #e6e6e6;
          }
          a {
            display: inline-block;
            margin: 0 10px;
          }
        }
      }
    }
    .addItem {
      padding: 20px 0;
      .el-button {
        border-style: dashed !important;
        width: 60%;
      }
    }
  }
}
.formCon {
  height: 115px;
  textarea {
    height: 100%;
  }
}
.icon {
  font-size: 24px;
  i {
    color: #faad14;
  }
}
</style>