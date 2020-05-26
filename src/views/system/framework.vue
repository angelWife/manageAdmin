<template>
  <div class="container">
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary" @click="editDepartment(null)">新建</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="comTable"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="name" label="部门"></el-table-column>
      <el-table-column prop="remark" label="描述"></el-table-column>
      <el-table-column prop="idx" label="序号"></el-table-column>
      <el-table-column prop="updateTime" label="更改时间" :formatter="timeFormat"></el-table-column>
      <el-table-column fixed="right" label="操作" width="400">
        <template slot-scope="scope">
          <el-button @click="editDepartment(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleAct(scope.row)" type size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog class="new-depart" :title="departEdit.name?'编辑部门':'新增部门'" :visible.sync="departVisible">
      <el-form :model="departEdit" label-width="100px">
        <el-form-item label="父部门：" class="mustFill">
          <el-cascader
            placeholder="请输入"
            :change-on-select="true"
            :options="tableData"
            :props="myprop"
            ref="roleKeys"
            v-model="departEdit.parentId"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称：" class="mustFill">
          <el-input placeholder="请输入" v-model="departEdit.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号：">
          <el-input placeholder="请输入" v-model="departEdit.idx" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            placeholder="请输入"
            v-model="departEdit.remark"
            type="textarea"
            autocomplete="off"
            maxlength = '40'
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn">取消</el-button>
        <el-button type="primary" @click="sureBtn">提交</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog class="new-depart" title="编辑部门" :visible.sync="editVisible">
      <el-form :model="departEdit" label-width="100px">
        <el-form-item label="父部门：" class="mustFill">
          <el-cascader
            placeholder="请输入"
            :props="myprop"
            v-model="departEdit.ids"
            :options="tableData"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称：" class="mustFill">
          <el-input placeholder="请输入" v-model="departEdit.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号：">
          <el-input placeholder="请输入" v-model="departEdit.idx" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            placeholder="请输入"
            v-model="departEdit.remark"
            type="textarea"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="editVisible = false">提交</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>
<script>
import { formatWithSeperator } from "../../utils/datetime.js";
export default {
  data() {
    return {
      departVisible: false,
      editVisible: false,
      myprop: {
        value: "id",
        label: "name",
        children: "children"
      },
      departEdit: {
        parentId: "",
        name: "",
        idx: "",
        remark: ""
      },
      tableData: []
    };
  },
  created() {
    //    this.approData = this.allData;
    this.initPage();
  },
  methods: {
    cancelBtn(){
      this.departVisible = false;
    },
    initPage() {
      let self = this;
      this.$api.system.departmentList().then(res => {
        console.log('res',res);
        if (res.success) {
          self.tableData = res.data;
        }
      });
    },
    editDepartment(tab) {
      this.departVisible = true;
      console.log('tab',tab);
      let tableData = this.tableData;
      if (tab) {
        let parentId = tab.parentId;
        console.log(parentId)
        let arr = [];
        for(let i=0;i<tableData.length;i++){
          let item1 = tableData[i];
          if(parentId == item1.id){
            arr = [tab.id];
            console.log(arr);
          }else{
            if(item1.children.length){
              for(let j=0;j<item1.children.length;j++){
                let item2 = item1.children[j];
                if(parentId == item2.id){
                  arr.push(item1.id);
                  arr.push(parentId);
                }
              }
            }
          }
        }
        // tab.parentId = arr;
        if(parentId == -1){
          tab.parentId = [tab.id];
        }
        // console.log(tab)
        for(let key in tab){
          this.departEdit[key] = tab[key];
        }
        // this.departEdit = tab;
      } else {
        this.departEdit = {
          parentId: "",
          name: "",
          idx: "",
          remark: ""
        };
      }
    },
    sureBtn() {
      let self = this;
      let params = this.departEdit;
      // params.parentId = params.parentId.join(",");
      console.log(params.parentId)
      params.parentId = params.parentId[params.parentId.length-1]
      this.$api.system.departmentEdit(params).then(res => {
        if (res.success) {
          if (params.id) {
            self.$message({
              message: "操作成功！",
              type: "success"
            });
          } else {
            self.$message({
              message: "新增成功！",
              type: "success"
            });
          }
          self.departVisible = false;
          self.initPage();
          self.cancelBtn();
        }
      });
    },
    handleAct(rowdata) {
      let self = this;
      console.log(rowdata)
      /*self.$message("亲，我们正在开发中...");*/
      this.$confirm('是否删除'+rowdata.name+'?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.system.delDepartment({id:rowdata.id,name:rowdata.name}).then(res=>{
         if(res.success){
          self.roleVisible=false
          self.dicVisible=false
          self.$message('删除成功！');
          self.initPage();
         }
       })
      })
    },
    handleChange(value) {
      console.log('change',value);
      this.departEdit.parentId = value;
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
  .el-cascader {
    width: 100%;
  }
}
</style>
