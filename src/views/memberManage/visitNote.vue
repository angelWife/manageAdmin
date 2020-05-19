<template>
  <div class="container">
    <div class="formMenu">
      <div class="menuBox">
        <div
          v-for="(item,ind) in leftMenu"
          :key="ind"
          class="item"
          :class="item.active?'active':''"
        >
          <router-link :to="item.path">{{item.name}}</router-link>
        </div>
      </div>
    </div>
    <div class="formModal">
      <div id="payNote">
        <h1 class="title">拜访记录</h1>
      </div>
      <div style="margin:20px 0">
        <el-button @click="newVisit(null)" type="primary">新增</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="visitDate" label="日期"></el-table-column>
        <el-table-column prop="address" label="地点" width="200px"></el-table-column>
        <el-table-column prop="visitor" label="拜访人及部门">
          <template slot-scope="scope">{{scope.row.visitor}} {{scope.row.department}}</template>
        </el-table-column>
        <el-table-column prop="receiver" label="接待人及部门">
          <template slot-scope="scope">{{scope.row.receiver}} {{scope.row.receiverDepartment}}</template>
        </el-table-column>
        <el-table-column prop="reason" label="拜访事由"></el-table-column>
        <el-table-column prop="path" label="附件">
          <template slot-scope="scope">
            <el-button
              v-if="!!scope.row.annex"
              @click="handleClick(scope.row)"
              size="mini"
            >{{scope.row.annex}}</el-button>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="creater" label="创建人"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button @click="newVisit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row.id)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination class="pageCSS" background layout="total,prev, pager, next" :total="85"></el-pagination> -->
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="visitVisible" width="30%">
      <el-form :model="visitData" label-width="100px" :rules="visitorRules" ref="visitDataForm">
        <el-form-item label="日期：" prop='visitDate'>
          <el-date-picker v-model="visitData.visitDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="地点：" prop='address'>
          <el-input v-model="visitData.address" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="拜访人："  prop='visitor'>
          <el-input v-model="visitData.visitor" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="拜访人部门：" prop='department'>
          <el-input v-model="visitData.department" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="接待人：" prop='receiver'>
          <el-input v-model="visitData.receiver" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="接待人部门：" prop='receiverDepartment'>
          <el-input v-model="visitData.receiverDepartment" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="拜访事由：" prop='reason'>
          <el-input v-model="visitData.reason" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="附件：">
          <el-upload
            class="upload-demo"
            v-model="visitData.annex"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visitVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitVisit('visitDataForm')">确 定</el-button>
      </div>
    </el-dialog>
  
    <Button :showEdit="false"></Button>
  </div>
</template>
<script>
import Button from "./component/Button";
import {
  dataTime,
  successMES,
  tipMES,
  warnMES,
  getDateTime
} from "../../utils/common";

export default {
  data() {
    return {
      dialogTitle:"新建拜访记录",
      visitorRules:{
          visitDate:[{required:true,message:'请选择日期',trigger:'blur'}],
          address:[{required:true,message:'请输入地点',trigger:'blur'}],
          visitor:[{required:true,message:'请输入拜访人',trigger:'blur'}],
          department:[{required:true,message:'请输入拜访人部门',trigger:'blur'}],
          receiver:[{required:true,message:'请输入接待人',trigger:'blur'}],
          receiverDepartment:[{required:true,message:'请输入接待人部门',trigger:'blur'}],
          reason:[{required:true,message:'请输入拜访事由',trigger:'blur'}],

      },
      leftMenu: [
        {
          name: "会员基本信息",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#basicInfo"
        },
        {
          name: "入会申请书",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#applyBook"
        },
        {
          name: "公司基本信息",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#baseInfo"
        },
        {
          name: "联系人信息",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#userInfo"
        },
        {
          name: "会员代表",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#vipUser"
        },
        {
          name: "股东与高管",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#other"
        },
        {
          name: "业务信息",
          active: false,
          path: "/member/archivesDetail?companyId="+sessionStorage.getItem('compid')+"#msgInfo"
        },
        {
          name: "会员证书",
          active: false,
          path: "/member/memberPaper"
        },
        { name: "变更记录", active: false, path: "/member/alterNote" },
        { name: "缴费记录", active: false, path: "/member/useNote" },
        { name: "拜访记录", active: true, path: "/member/visitNote" }
      ],
      tableData: [],
      visitVisible: false,
      visitData: {
        visitDate: "",
        address: "",
        visitor: "",
        department: "",
        receiver: "",
        receiverDepartment: "",
        reason: ""
      },
      editVisible: false,
      visitEdit: {
        visitDate: "",
        address: "",
        visitor: "",
        department: "",
        receiver: "",
        receiverDepartment: "",
        reason: ""
      },
      id: 0,
      rowId: 0
    };
  },
  created() {
    this.id = sessionStorage.getItem("compid");
    this.displayVisit();
  },
  mounted() {},
  methods: {
    displayVisit() {
      this.$api.member
        .showVisit({ id: this.id })
        .then(res => {
          if (res.success) {
            this.tableData = dataTime(res.data, "visitDate");
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    newVisit(row) {
      if(row===null){
         this.dialogTitle="新建拜访记录"
         this.visitData = {
          visitDate: "",
          address: "",
          visitor: "",
          department: "",
          receiver: "",
          
          receiverDepartment: "",
          reason: ""
        };
        this.visitVisible = true;
      }else{
           this.dialogTitle="编辑拜访记录"
           this.visitVisible = true;
          this.visitData = {
            visitDate: row.visitDate,
            address: row.address,
            visitor: row.visitor,
            department: row.department,
            receiver: row.receiver,
            receiverDepartment: row.receiverDepartment,
            reason: row.reason,
            id:row.id
          };
          this.rowId = row.id;
      }
      
    },
    submitVisit(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
              this.visitVisible = false;
              const visitData = this.visitData;
              visitData.visitDate = getDateTime(visitData.visitDate);
              const moreObj = {
                companyId: this.id,
                id: "",
                path: "123"
              };
              this.$api.member
                .addVisit({ ...visitData, ...moreObj })
                .then(res => {
                  if (res.success) {
                    successMES("保存成功");
                    this.$refs[formName].resetFields();
                    this.displayVisit();
                  } else {
                    warnMES(res.message);
                  }
                })
                .catch(err => {
                  console.error(err);
                });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     
    },
    handleEdit(row) {
      this.editVisible = true;
      this.visitEdit = {
        visitDate: row.visitDate,
        address: row.address,
        visitor: row.visitor,
        department: row.department,
        receiver: row.receiver,
        receiverDepartment: row.receiverDepartment,
        reason: row.reason
      };
      this.rowId = row.id;
    },
    submitEdit() {
      this.editVisible = false;
      const visitEdit = this.visitEdit;
      visitEdit.visitDate = getDateTime(visitEdit.visitDate);
      const moreObj = {
        companyId: this.id,
        id: this.rowId,
        path: "123"
      };
      this.$api.member
        .addVisit({ ...visitEdit, ...moreObj })
        .then(res => {
          if (res.success) {
            successMES("编辑成功");
            this.displayVisit();
          } else {
            warnMES(res.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleDelete(id) {
       this.$confirm('是否删除拜访记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$api.member
              .delVisit({ id: id })
              .then(res => {
                if (res.success) {
                  tipMES("删除成功");
                  this.displayVisit();
                } else {
                  warnMES(res.message);
                }
              })
              .catch(err => {
                console.error(err);
              });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    }
  },
  components: {
    Button
  }
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  background-color: #fff;
  padding: 30px;
  height: 100%;
  width: 100%;
  .formMenu {
    width: 160px;
    .menuBox {
      position: fixed;
      width: 160px;
      border-right: 1px solid #d6d6d6;
    }
    .item {
      height: 50px;
      display: block;
      color: #666;
      text-align: right !important;
      line-height: 50px;
      border-right: 2px solid rgba(0, 0, 0, 0);
      position: relative;
      right: -1px;
      padding-right: 20px;
      font-size: 16px;
      cursor: pointer;
      a {
        display: block;
        height: 50px;
        color: #666;
      }
      &.active {
        border-right: 2px solid #409eff;
        a {
          color: #409eff;
        }
      }
    }
  }
  .formModal {
    margin-left: 160px;
    padding: 0 20px 0 40px;
    h1.title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .pageCSS {
      text-align: center;
      margin-top: 30px;
    }
  }
  .el-input {
    width: calc(100% - 100px);
  }
}
</style>