<template>
  <div class="container">
    <el-form class="searchForm" ref="form" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="模块：">
            <el-select v-model="dicMod" placeholder="请选择" class="input_style" @change="modChange()">
              <el-option v-for="item in modList" :key="item.key" :value="item.val"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="字典名：">
            <el-input placeholder="请输入" v-model="dicName" class="input_style"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary" @click="newBuild()">新建</el-button>
      </el-col>
      <el-col :span="12" class="text_right">
        <el-button type="primary" @click="queryDic()">查询</el-button>
        <el-button @click="clear()">重置</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" class="comTable" empty-text="没有符合条件的数字字典">
      <el-table-column prop="typeVal" label="模块"></el-table-column>
      <el-table-column prop="dictVal" label="字典名"></el-table-column>
      <el-table-column prop="dictKey" label="参数值"></el-table-column>
      <el-table-column prop="remark " label="说明">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="400">
        <template slot-scope="scope">
          <el-button @click="handleAct(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row.id)" type size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog class="new-dic" title="新增数据字典" :visible.sync="dicVisible" width="30%">
      <el-form :model="dicData" label-width="100px">
        <el-form-item label="模块：" class="mustFill">
          <el-select
            v-model="dicData.module"
            placeholder="请选择"
            style="width:100%"
            @change="typeChange()"
          >
            <el-option v-for="item in modList" :key="item.key" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典名：" class="mustFill">
          <el-input placeholder="请输入" v-model="dicData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数：" class="mustFill">
          <el-input placeholder="请输入" v-model="dicData.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="说明：">
          <el-input placeholder="请输入" v-model="dicData.explain" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dicVisible = false">取消</el-button>
        <el-button type="primary" @click="submitDic()">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog class="new-dic" title="编辑数据字典" :visible.sync="editVisible" width="30%">
      <el-form :model="dicEdit" label-width="100px">
        <el-form-item label="模块：" class="mustFill">
          <el-input placeholder="请输入" v-model="dicEdit.module" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典名：" class="mustFill">
          <el-input placeholder="请输入" v-model="dicEdit.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数：" class="mustFill">
          <el-input placeholder="请输入" v-model="dicEdit.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="说明：">
          <el-input placeholder="请输入" v-model="dicEdit.explain" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEdit()">提交</el-button>
      </div>
    </el-dialog>
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="page.total"
      :page-size="page.pageSize"
      :current-page.sync="page.currentPage"
      @current-change="currentchange"
      style="text-align:center;margin-top:60px"
    ></el-pagination>
  </div>
</template>
<script>
import { warnMES, successMES, tipMES, pubParam } from "../../utils/common";

export default {
  data() {
    return {
      dicVisible: false,
      editVisible: false,
      tableData: [],
      type: "", // 模块类型
      queryType: "",
      page: {
        total: 1,
        pageSize: 5,
        currentPage: 1
      },
      dicData: {
        module: "",
        name: "",
        value: "",
        explain: ""
      },
      modList: [],
      dicEdit: {},
      dicRow: {},
      dicMod: "",
      dicName: ""
    };
  },
  created() {
    this.displayList(pubParam.page);
    this.dicModel();
  },
  mounted() {},
  methods: {
    modChange() {
      var typeVal = this.dicMod;
      this.modList.map(v => {
        if (v.val == typeVal) {
          this.queryType = v.key;
        }
      });
    },
    typeChange() {
      var typeVal = this.dicData.module;
      this.modList.map(v => {
        if (v.val == typeVal) {
          this.type = v.key;
        }
      });
    },
    // 表格呈现
    displayList(param) {
      let upParams = param ? param : {};
      this.$api.dict
        .showDic(upParams)
        .then(res => {
          if (res.success) {
            let data = res.data;
            this.tableData = data.rows;
            this.page.total = data.total;
            this.page.pageSize = data.pageSize;
            this.page.currentPage = data.pageIndexCurrent;
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取下来框
    dicModel() {
      this.$api.dict
        .newDiction()
        .then(res => {
          if (res.success) {
            this.modList = res.data;
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 新建
    newBuild() {
      this.dicData = {
        module: "",
        name: "",
        value: "",
        explain: ""
      };
      this.dicVisible = true;
      this.dicModel();
    },
    // 提交
    submitDic() {
      this.$api.dict
        .saveDic({
          dictKey: this.dicData.value,
          dictVal: this.dicData.name,
          remark: this.dicData.explain,
          sortNum: 1,
          status: 1,
          type: this.type
        })
        .then(res => {
          if (res.success) {
            this.dicVisible = false;
            this.displayList(pubParam.page);
            successMES("提交成功");
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 编辑
    handleAct(row) {
      this.editVisible = true;
      this.dicEdit = {
        module: row.typeVal,
        name: row.dictVal,
        value: row.dictKey,
        explain: row.remark
      };
      this.dicRow = {
        id: row.id,
        type: row.type
      };
    },
    handleEdit() {
      this.$api.dict
        .saveDic({
          dictKey: this.dicEdit.value,
          dictVal: this.dicEdit.name,
          remark: this.dicEdit.explain,
          id: this.dicRow.id,
          sortNum: 1,
          status: 1,
          type: this.dicRow.type
        })
        .then(res => {
          if (res.success) {
            this.editVisible = false;
            this.displayList(pubParam.page);
            successMES("编辑成功");
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 删除
    handleDelete(rowId) {
      this.$api.dict
        .deleteRow({
          id: rowId
        })
        .then(res => {
          if (res.success) {
            this.queryDic();
            tipMES("删除成功");
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    queryIF() {
      let objParam = {
        dictKey: "",
        dictVal: this.dicName,
        id: "",
        status: "",
        type: this.queryType
      };
      return objParam;
    },
    // 查询
    queryDic() {
      this.displayList({ ...pubParam.page, ...this.queryIF() });
    },

    clear() {
      this.dicMod = "";
      this.dicName = "";
    },
    // 分页
    currentchange(i) {
      this.displayList({
        pageIndex: i,
        pageSize: pubParam.page.pageSize,
        ...this.queryIF()
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
  height: 100%;
  .input_style,
  .el-select {
    width: calc(100% - 120px);
  }
}
</style>