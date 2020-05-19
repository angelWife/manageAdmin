<template>
  <div class="container">
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary" @click="memberVisible = true">新建</el-button>
      </el-col>
    </el-row>
    <el-table
      class="mytable"
      :data="groupData"
      :header-cell-style="thStyle"
      style="width: 100%;padding:30px 0"
    >
      <el-table-column prop="groupName" label="会员组" width align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column prop="personNum" label="人数" align="center"></el-table-column>
      <el-table-column prop="dateUpdate" label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary" @click="handleManage(scope.row.id)" size="small">管理会员</el-button>
          <el-button size="small" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <el-dialog title="新增会员组" :visible.sync="memberVisible" width="30%">
      <el-form :model="memberData" label-width="100px">
        <el-form-item label="会员组名：" class="mustFill">
          <el-input v-model="memberData.name" placeholder="请输入" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="memberData.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="memberVisible = false">取消</el-button>
        <el-button type="primary" @click="submit(memberData)">提交</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑会员组" :visible.sync="editVisible" width="30%">
      <el-form :model="memberEdit" label-width="100px">
        <el-form-item label="会员组名：" class="mustFill">
          <el-input v-model="memberEdit.name" placeholder="请输入" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="memberEdit.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEdit()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { format } from "../../utils/datetime";
import { warnMES, successMES, tipMES, pubParam } from "../../utils/common";

export default {
  data() {
    return {
      tHeadStyle: {},
      thStyle: {
        border: 0,
        background: "rgba(200,200,200,0.2)",
        color: "#666"
      },
      memberVisible: false,
      memberData: {
        name: "",
        remark: ""
      },
      editVisible: false,
      memberEdit: {},
      typeList: [
        {
          id: 1,
          value: "保险集团"
        }
      ],
      groupData: []
    };
  },
  created() {
    this.displayGroup(pubParam);
  },
  methods: {
    displayGroup(param) {
      this.$api.member
        .showGroup(param)
        .then(res => {
          if (res.success) {
            let rowData = [];
            res.data.rows.map(v => {
              v.dateUpdate = v.dateUpdate ? format(v.dateUpdate) : "-";
              rowData.push(v);
            });
            this.groupData = rowData;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 新建
    submit(data) {
      this.$api.member
        .actMember({
          groupName: this.memberData.name,
          remark: this.memberData.remark
        })
        .then(res => {
          if (res.success) {
            this.displayGroup(pubParam);
            this.memberVisible = false;
            this.$message({
              message: "创建成功",
              type: "success"
            });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 编辑
    handleEdit(row) {
      this.editVisible = true;
      this.memberEdit = {
        id: row.id,
        name: row.groupName,
        remark: row.remark
      };
      this.$api.member
        .actMember({
          id: row.id,
          groupName: this.memberEdit.name,
          remark: this.memberEdit.remark
        })
        .then(res => {})
        .catch(error => {
          console.log(error);
        });
    },
    saveEdit() {
      this.$api.member
        .actMember({
          id: this.memberEdit.id,
          groupName: this.memberEdit.name,
          remark: this.memberEdit.remark
        })
        .then(res => {
          if (res.success) {
            this.displayGroup(pubParam);
            this.editVisible = false;
            this.$message({
              message: "提交成功",
              type: "success"
            });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 删除
    handleDelete(id) {
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.member
            .groupDelete({
              groupId: id
            })
            .then(res => {
              if (res.success) {
                this.displayGroup(pubParam);
                this.$message("删除成功");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    // 管理会员
    handleManage(id) {
      this.$router.push({
        path: "/member/groupManage",
        query: { groupid: Number(id) }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.container {
  background: #fff;
  padding: 30px;
  min-height: 100%;
  .input_style,
  .el-select {
    width: calc(100% - 180px);
  }
}
.el-table::before {
  height: 0;
}
.mytable {
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
  button {
    margin: 5px;
  }
}
</style>