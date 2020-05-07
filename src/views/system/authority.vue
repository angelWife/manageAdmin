<template>
  <div class="container">
    <!-- <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary" @click="authVisible = true">新建</el-button>
      </el-col>
    </el-row>-->
    <el-table
      :data="tableData"
      style="width: 100%"
      class="comTable"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      >
      <el-table-column prop="name" label="标题"></el-table-column>
      <el-table-column prop="remark" label="描述"></el-table-column>
      <el-table-column prop="path" label="页面路径"></el-table-column>
      <el-table-column prop="sortNum" label="序号"></el-table-column>
      <el-table-column prop="type" label="类型" :formatter="setPagetype"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
          <!-- <el-button @click="handleAct(scope.row)" type size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog class="new-auth" title="新增权限" :visible.sync="authVisible" width="30%">
      <el-form :model="authData" label-width="90px">
        <el-form-item label="上级菜单：">
          <el-select v-model="authData.parent" placeholder="请选择">
            <el-option
              v-for="item in parentList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：">
          <el-input placeholder="请输入" v-model="authData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径：">
          <el-input placeholder="请输入" v-model="authData.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号：">
          <el-input placeholder="请输入" v-model="authData.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="authData.type" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input placeholder="请输入" v-model="authData.remark" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authVisible = false">取消</el-button>
        <el-button type="primary" @click="authVisible = false">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog class="new-auth" title="编辑权限" :visible.sync="editVisible" width="30%">
      <el-form :model="authEdit" label-width="90px">
        <el-form-item label="上级菜单：">
          <!-- <el-select v-model="authEdit.parent" placeholder="请选择">
            <el-option
              v-for="item in parentList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
          <el-input disabled placeholder="请输入" v-model="authEdit.parent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题：">
          <el-input placeholder="请输入" v-model="authEdit.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径：">
          <el-input disabled placeholder="请输入" v-model="authEdit.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号：">
          <el-input disabled placeholder="请输入" v-model="authEdit.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <!-- <el-select v-model="authEdit.type" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
          <el-input disabled placeholder="请输入" v-model="authEdit.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input placeholder="请输入" v-model="authEdit.remark" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="sureEdit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      editVisible: false,
      authVisible: false,
      authData: {
        parent: "",
        title: "",
        path: "",
        number: "",
        type: "",
        remark: ""
      },
      authEdit: {
        id: "",
        parent: "会员系统",
        title: "首页",
        path: "/index",
        number: "0",
        type: "页面",
        remark: "供普通会员使用的首页"
      },
      tableData: [],
      parentList: [
        {
          id: 4,
          value: "部门1",
          label: "部门1"
        },
        {
          id: 2,
          value: "部门2",
          label: "部门2"
        }
      ],
      typeList: [
        {
          id: 1,
          value: "页面1",
          label: "页面1"
        },
        {
          id: 2,
          value: "页面2",
          label: "页面2"
        }
      ]
    };
  },
  created() {
    //    this.approData = this.allData;
    this.$nextTick(() => {
      this.tableData = this.$store.state.menu;
      // this.setMenuList(this.menuList);
    });
  },
  methods: {
    initPage() {},
    handleClick(rowdata) {
      let self = this;
      this.editVisible = true;
      let id = rowdata.id;
      this.tableData.filter(v => {
        if (v.id == id) {
          self.authEdit.id = v.id;
          self.authEdit.parent = "";
          self.authEdit.title = v.name;
          self.authEdit.path = v.path;
          self.authEdit.number = v.sortNum;
          self.authEdit.remark = v.remark;
          self.authEdit.type = "";
        } else {
          if (v.children && v.children.length > 0) {
            v.children.filter(m => {
              if (m.id == id) {
                self.authEdit.id = m.id;
                self.authEdit.parent = v.name;
                self.authEdit.title = m.name;
                self.authEdit.path = m.path;
                self.authEdit.number = m.sortNum;
                self.authEdit.remark = m.remark;
                self.authEdit.type = "页面";
              }
            });
          }
        }
      });
    },
    sureEdit() {
      let params = {};
      let self = this;
      params.id = this.authEdit.id;
      params.remark = this.authEdit.remark;
      params.name = this.authEdit.title;
      this.$api.system.editAuthority(params).then(res => {
        if (res.success) {
          self.editVisible = false;
          self.$message({
            message:'操作成功！',
            type:'success'
          })
          self.getMenuList();
        }
      });
    },
    getMenuList() {
      let self = this;
      this.$api.menu
        .findNavTree({})
        .then(res => {
          if (res.success) {
            self.tableData = res.data;
            self.$store.state.menu = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    setPagetype(row, column, cellValue, index) {
      if (row.leaf) {
        return "页面";
      } else {
        return "";
      }
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
  height: 100%;
  .el-row {
    .el-input,
    .el-select {
      width: calc(100% - 180px);
    }
  }
  .new-auth {
    .el-select {
      width: 100%;
    }
  }
}
</style>