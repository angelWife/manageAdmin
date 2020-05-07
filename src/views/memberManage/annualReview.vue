<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <div>
          <span>年审标题：</span>
          <el-input placeholder="请输入" v-model="title" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>发布状态：</span>
          <el-select placeholder="请选择" v-model="publish" >
            <el-option v-for="item in pubList" :key="item.index" :value="item.key"  :label="item.val"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>创建人：</span>
          <el-input placeholder="请输入" v-model="creator" class="input_style"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary" @click="newBuild()">新建</el-button>
      </el-col>
      <el-col :span="12" class="text_right">
        <el-button type="primary" @click="handleQuery()">查询</el-button>
        <el-button @click="clear()">重置</el-button>
      </el-col>
    </el-row>
    <el-table
      class="mytable"
      :data="allData"
      empty-text="没有符合条件的年审项目"
      :header-cell-style="thStyle"
      style="width: 100%;padding:30px 0"
    >
      <el-table-column prop="name" label="年审标题" align="center"></el-table-column>
      <el-table-column prop="publishStatusVal" label="发布状态" align="center"></el-table-column>
      <el-table-column prop="creator" label="创建人" align="center"></el-table-column>
      <el-table-column label="操作" min-width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.publishStatus==2">
            <el-button type="primary" size="small" @click="handleDown(scope.row.id)">下架</el-button>
            <el-button type="primary" size="small" @click="handleMonit(scope.row)">年审监控</el-button>
            <el-button size="small" @click="handleCheck(scope.row)">查看</el-button>
          </span>
          <span v-if="scope.row.publishStatus==1">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="primary" size="small" @click="handlePublish(scope.row.id)">发布</el-button>
            <el-button size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </span>
          <span v-if="scope.row.publishStatus==3">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="primary" size="small" @click="handlePublish(scope.row.id)">发布</el-button>
            <el-button type="primary" size="small" @click="handleMonit(scope.row.id)">年审监控</el-button>
            <el-button size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="text_center"
      style="margin-top:20px"
      background
      layout="total,prev, pager, next"
      :total="pageTen.total"
      :page-size="pageTen.pageSize"
      :current-page.sync="pageTen.currentPage"
      @current-change="currentchange"
    ></el-pagination>
  </div>
</template>
<script>
import {
  warnMES,
  successMES,
  tipMES,
  pageTen,
  pubParam,
  apiSelect,
  apiPublishStatus,
  selectType,
  queryResp,
  mapTime,
  getDateTime,
  flagList
} from "../../utils/common";

export default {
  data() {
    return {
      title: "",
      publish: "",
      creator: "",
      pubList: [],
      tHeadStyle: {},
      thStyle: {
        border: 0,
        background: "rgba(200,200,200,0.2)",
        color: "#666"
      },
      typeList: [
        {
          id: 1,
          value: "保险集团"
        }
      ],
      allData: [],
      pageTen,
      pageLocation: 1
    };
  },
  created() {
    apiPublishStatus(this.pubList); // 发布状态
    this.displayView(pubParam.page);
  },
  methods: {
    newBuild() {
      this.$router.push({ path: "/member/newAnnual" });
    },
    handleEdit(row) {
      this.$router.push({
        path: "/member/newAnnual",
        query: {
          annualID: row.id,
          annualName: row.name,
          edit: true
        }
      });
    },
    handleCheck(row) {
      this.$router.push({
        path: "/member/newAnnual",
        query: {
          annualID: row.id,
          annualName: row.name,
          check: true
        }
      });
    },
    handleDelete(id) {
      this.$api.member
        .deleteAnnual({
          id: id
        })
        .then(res => {
          if (res.success) {
            tipMES("删除成功");
            this.handleQuery(this.pageLocation);
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handlePublish(id) {
      this.$api.member
        .publishAnnual({
          id: id
        })
        .then(res => {
          if (res.success) {
            tipMES("发布成功");
            this.handleQuery();
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleDown(id) {
      this.$api.member
        .downAnnual({
          id: id
        })
        .then(res => {
          if (res.success) {
            tipMES("下架成功");
            this.handleQuery();
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleMonit(id) {
      this.$router.push({ path: "/member/annualMonitor", query: { id: id } });
    },
    clear() {
      this.title = "";
      this.memberValue = "";
      this.creator = "";
    },
    queryIF() {
      const query = {
        name: this.title,
        publishStatus: this.publish,
        creator: this.creator
      };
      return query;
    },
    handleQuery(pageIn) {
      if (!!pageIn) {
        this.displayView({
          pageIndex: pageIn,
          pageSize: pubParam.page.pageSize,
          ...this.queryIF()
        });
      } else {
        this.displayView({ ...pubParam.page, ...this.queryIF() });
      }
    },
    displayView(params) {
      this.$api.member
        .showAnnual(params)
        .then(res => {
          if (res.success) {
            queryResp(this.allData, this.pageTen, res.data);
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    currentchange(i) {
      this.pageLocation = i;
      this.displayView({
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
.el-table::before {
  height: 0;
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