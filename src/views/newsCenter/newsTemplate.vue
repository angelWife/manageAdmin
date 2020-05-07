<template>
  <div class="container">
    <el-form class="searchForm" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="模板名称">
            <el-input placeholder="请输入模板名称" v-model="query.modelName" class="input_style"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="模板类型">
            <el-select placeholder="请选择" v-model="query.modelType">
              <el-option
                v-for="item in modList"
                :label="item.val"
                :value="item.key"
                :key="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="模板内容">
            <el-input placeholder="请输入模板内容" v-model="query.modelContent" class="input_style"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="btn_content">
      <el-col :span="24" class="text_right">
        <el-button type="primary" @click="handleQuery()">查询</el-button>
        <el-button @click="clear">重置</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" class="comTable" empty-text="没有符合条件的短信模板">
      <el-table-column prop="modelName" label="模板名称"></el-table-column>
      <el-table-column prop="modelTypeVal" label="模板类型"></el-table-column>
      <el-table-column prop="modelContent" label="模板内容" class-name="textEllipsis"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="margin-top:20px"
      class="text_center"
      layout="total,prev, pager, next"
      :total="pageAll.total"
      :page-size="pageAll.pageSize"
      :current-page.sync="pageAll.currentPage"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>
<script>
import passMonitor from "./component/passMonitor";
import {
  apiDic,
  apiShow,
  apiOperate,
  backPage,
  hasPage
} from "../../utils/commonApi";
import { pageTen, pubParam } from "../../utils/common";
import { format } from "../../utils/datetime";

export default {
  data() {
    return {
      query: {
        modelName: "",
        modelType: "",
        modelContent: ""
      },
      modList: [],
      tableData: [],
      pageAll: { ...pageTen },
      pageLocation: 1, // 页数

      minitorId: 0 // 监控ID
    };
  },
  created() {
    apiDic("modelStatus", {}).then(reslove => {
      this.modList = reslove;
    });

    this.displayQuery();
  },
  methods: {
    handleEdit(row) {
      this.$router.push({ path: "/newsCenter/msgEdit", query: { id: row.id } });
    },
    handleQuery() {
      this.pageLocation = 1;
      this.displayQuery();
    },
    displayQuery(page) {
      const pageParam = hasPage(page);
      this.showTable(pageParam);
    },
    showTable(param) {
      apiShow("message", "modelMessage", {
        ...param,
        ...this.query,
        modelStyle: 1
      }).then(reslove => {
        this.tableData = reslove.rows;
        this.pageAll = backPage(reslove);
      });
    },
    clear() {
      this.pageLocation = 1;
      this.query = {
        modelName: "",
        modelType: "",
        modelContent: ""
      };
    },
    currentChange(i) {
      this.pageLocation = i;
      this.showTable({
        pageIndex: i,
        pageSize: pubParam.page.pageSize
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
    width: calc(100% - 180px);
  }
}
</style>