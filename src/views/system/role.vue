<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <span>用户：</span>
        <el-input placeholder="请输入" v-model="params.nameLike"></el-input>
      </el-col>
      <el-col :span="8">
        <span>关联权限：</span>
        <el-input placeholder="请输入" v-model="params.menuNameLike"></el-input>
      </el-col>
    </el-row>
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary" @click="addRole">新建</el-button>
      </el-col>
      <el-col :span="12" class="text_right">
        <el-button type="primary" @click="getRoleTable">查询</el-button>
        <el-button>重置</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" class="comTable" empty-text="没有符合条件的角色">
      <el-table-column prop="name" label="角色"></el-table-column>
      <el-table-column prop="remark" label="描述"></el-table-column>
      <el-table-column prop="roleNames" label="权限"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" :formatter="timeFormat"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="editRoleInfo(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleAct(scope.row)" type size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增角色" :visible.sync="roleVisible" width="30%">
      <el-form :model="roleData" label-width="90px">
        <el-form-item label="角色：" class="mustFill">
          <el-input placeholder="请输入" v-model="roleData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限组：">
          <el-tree
            :data="autGroup"
            show-checkbox
            node-key="id"
            ref="roleKeys"
            :default-expanded-keys="defaultExpanded"
            :default-checked-keys="defaultChecked"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input placeholder="请输入" v-model="roleData.remark" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleVisible = false">取消</el-button>
        <el-button type="primary" @click="sureBtn">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑角色" :visible.sync="dicVisible" width="30%">
      <el-form :model="roleData" label-width="90px">
        <el-form-item label="角色：">
          <el-input placeholder="请输入" v-model="roleData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限组：">
          <el-tree
            :data="autGroup"
            show-checkbox
            node-key="id"
            ref="roleKeys"
            :default-expanded-keys="defaultExpanded"
            :default-checked-keys="defaultChecked"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input placeholder="请输入" v-model="roleData.remark" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dicVisible = false">取消</el-button>
        <el-button type="primary" @click="sureBtn">确定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="pageTotal"
      style="text-align:center;margin-top:60px"
    ></el-pagination>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {formatWithSeperator} from "../../utils/datetime";
export default {
  data() {
    return {
      roleVisible: false,
      dicVisible: false,
      tableData: [],
      pageTotal: 1,
      roleData: {
        name: "",
        menuIdList: [],
        remark: ""
      },
      defaultExpanded: [],
      defaultChecked: [],
      params: {
        nameLike: "",
        menuNameLike: ""
      },
      roleEdit: {
        role: "超级管理员",
        auth: "",
        remark: "jsahdasbdjasdhas"
      },
      autGroup: [
        {
          id: 1,
          label: "系统管理",
          children: [
            {
              id: 4,
              label: "权限管理",
              children: [
                {
                  id: 9,
                  label: "11"
                },
                {
                  id: 10,
                  label: "22"
                }
              ]
            },
            {
              id: 11,
              label: "角色管理"
            },
            {
              id: 12,
              label: "用户管理"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  // mounted:{
  //    ...mapState({
  //     menuList: state => state.menu.navTree
  //   })
  // },
  created() {
    //    this.approData = this.allData;
    this.getRoleTable();
    console.log();
    this.$nextTick(() => {
      this.autGroup = this.$store.state.menu;
      // this.setMenuList(this.menuList);
    });
  },
  methods: {
    getRoleTable() {
      let self = this;
      let params = this.params;
      this.$api.system.getRoleList(params).then(res => {
        if (res.success) {
          let list = res.data.rows;
          self.pageTotal = res.data.total;
          list.filter((v, i) => {
            let name = "";
            if (v.menuList && v.menuList.length > 0) {
              v.menuList.filter((m, n) => {
                if (n == 0) {
                  name += m.name;
                } else {
                  name += "," + m.name;
                }
              });
            }
            v.roleNames = name;
          });
          self.tableData = list;
        }
      });
    },
    editRoleInfo(rowdata) {
      this.dicVisible = true;
      if (rowdata.menuList && rowdata.menuList.length > 0) {
        this.setCheckMenu(rowdata.menuList);
      }
      this.roleData.name = rowdata.name;
      this.roleData.id = rowdata.id;
      this.roleData.remark = rowdata.remark;
    },
    handleAct(rowdata) {
      let self = this;
      //self.$message("亲，我们正在开发中...");
      // this.$api.system.editRoleInfo(this.roleData).then(res=>{
      //   if(res.success){
      //     self.roleVisible=false
      //     self.dicVisible=false
      //     if(self.roleData.id){
      //       self.$message('编辑成功！');
      //     }else{
      //        self.$message('新增成功！');
      //     }
      //     self.getRoleTable();
      //   }
      // })

      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {'id':rowdata.id};
        //console.log(params);
        self.$api.system.editRoleStatus(params).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            self.getRoleTable()
          }
        });
      }).catch(() => {
      });


    },
    addRole() {
      this.roleVisible = true;
      this.defaultExpanded = [];
      this.defaultChecked = [];
      delete this.roleData.id;
    },
    setCheckMenu(list) {
      let self = this;
      let check = [];
      list.filter((v, i) => {
        let _down = false;
        check.push(v.id);
        // if (v.checked) {
        //   _down = true
        //   check.push(v.id)
        // } else {
        //   if (v.children && v.children.length > 0) {
        //     v.children.filter(n => {
        //       if(n.checked){
        //          _down = true
        //          check.push(n.id)
        //       }
        //     });
        //   }
        // }
        if (_down) {
          self.defaultExpanded.push(v.id);
        }
      });
      this.defaultChecked = check;
      console.error(check);
    },
    sureBtn() {
      let self = this;
      let menuIdList = this.$refs.roleKeys.getCheckedKeys();
      this.roleData.menuIdList = menuIdList;
      this.$api.system.editRoleInfo(this.roleData).then(res => {
        if (res.success) {
          self.roleVisible = false;
          self.dicVisible = false;
          if (self.roleData.id) {
            self.$message({
              message: "编辑成功！",
              type: "success"
            });
          } else {
            self.$message({
              message: "新增成功！",
              type: "success"
            });
          }
          self.getRoleTable();
        }
      });
    },
    timeFormat() {
      return formatWithSeperator(arguments[2], "-", ":");
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
  height: auto;
  .el-row {
    .el-input,
    .el-select {
      width: calc(100% - 180px);
    }
  }
  .input_style,
  .el-select {
    width: calc(100% - 180px);
  }
  .el-tree {
    border: 1px solid #ccc;
    padding: 5px 15px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    height: 200px;
    color: #606266;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
