<template>
  <div class="container">
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary" @click="handlequery()">根据搜索添加</el-button>
        <el-button type="primary" @click="handleCate()">根据类型添加</el-button>
        <el-button @click="batchDelete()">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table
      class="mytable"
      :data="groupData"
      empty-text="没有符合条件的会员"
      :header-cell-style="thStyle"
      style="width: 100%;padding:30px 0"
      @selection-change="handleSelect"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="memberCode" label="会员代码" width align="center"></el-table-column>
      <el-table-column prop="companyName" label="会员" align="center"></el-table-column>
      <el-table-column prop="institutionType" label="机构类型" align="center"></el-table-column>
      <el-table-column prop="joinDate" label="入会时间" align="center"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,prev, pager, next"
      :page-count="params.pageTotal"
      @current-change="currentChange_"
      style="text-align:center;margin-top:60px"
    ></el-pagination>
    <!-- 根据搜索新建 -->
    <el-dialog title="根据搜索添加会员" :visible.sync="searchVisible" width="75%">
      <el-row>
        <el-col :span="8">
          <div>
            <span>会员类型：</span>
            <el-select v-model="memberType" placeholder="请选择">
              <el-option v-for="item in memberList" :key="item.id" :value="item.dictKey" :label="item.dictVal"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>机构类型：</span>
            <el-select v-model="institutionType" placeholder="请选择">

              <el-option v-for="item in orgList" :value="item.dictKey" :label="item.dictVal" :key="item.id"></el-option>

            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>会员名：</span>
            <el-input v-model="companyName" placeholder="请输入" class="input_style"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div>
            <span>统一社会信用编码：</span>
            <el-input v-model="creditId" placeholder="请输入" class="input_style"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>公司性质：</span>
            <el-select v-model="companyType" placeholder="请选择">
              <el-option v-for="item in busList" :key="item.id" :value="item.dictKey" :label="item.dictVal"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span>入会时间：</span>
            <el-date-picker
              v-model="joinTime"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="text_right">
          <el-button type="primary" @click="clickQuery()">查询</el-button>
          <el-button @click="clear()">重置</el-button>
        </el-col>
      </el-row>
      <div style="min-height:300px">
        <el-table
          empty-text="没有符合条件的会员"
          :data="memberData"
          style="width: 100%"
          @selection-change="handleSelectQuery"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="memberCode" label="会员代码"></el-table-column>
          <el-table-column prop="memberTypeVal" label="会员类型"></el-table-column>
          <el-table-column prop="institutionTypeVal" label="机构类型"></el-table-column>
          <el-table-column prop="companyName" label="机构名称"></el-table-column>
          <el-table-column prop="creditCode" label="社会统一编码"></el-table-column>
          <el-table-column prop="companyTypeVal" label="公司性质" width="150"></el-table-column>
          <el-table-column prop="buildDate" label="成立日期" width="100"></el-table-column>
          <el-table-column prop="flagListed" label="是否上市" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.flagListed==1">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column prop="dateJoin" label="入会时间" width="100"></el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="text_center"
        style="margin-top:20px"
        background
        layout="total,prev, pager, next"
        :total="pageFive.total"
        :page-size="pageFive.pageSize"
        :current-page.sync="pageFive.currentPage"
        @current-change="currentchange"
      ></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="searchVisible = false">取消</el-button>
        <el-button type="primary" @click="submitMember()">提交</el-button>
      </span>
    </el-dialog>
    <!-- 根据分类新建 -->
    <el-dialog title="根据分类添加会员" :visible.sync="kindVisible" width="30%">
      <div class="kindBox">
        <el-tree
          :data="kindData"
          show-checkbox
          ref="tree"
          node-key="id"
          :props="{ children: 'children',label: 'name'}"
        ></el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="kindVisible = false">取消</el-button>
        <el-button type="primary" @click="submitTree()">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { format } from "../../utils/datetime";
import {
  warnMES,
  successMES,
  tipMES,
  pageFive,
  pubParam,
  apiSelect,
  queryResp,
  mapTime
} from "../../utils/common";

export default {
  props: {
    id: { type: Number, required: true }
  },
  data() {
    return {
      searchVisible: false,
      kindVisible: false,
      tHeadStyle: {},
      thStyle: {
        border: 0,
        background: "rgba(200,200,200,0.2)",
        color: "#666"
      },
      groupData: [],
      memberData: [],

      memberType: "",
      institutionType: "",
      creditId: "",
      companyName: "",
      companyType: "",
      joinTime: "",

      orgList: [],
      memberList: [],
      busList: [],
      admiTime: "",
      kindData: [],
      pageFive,

      companyIdList: [],
      detailIdList: [],
      pageLocation: 1,
      params:{//会员组配置分页
        pageTotal:1,
        pageIndex:1,
        pageSize:20,
      }
    };
  },
  created() {
    this.displayMember();
  },
  methods: {
    displayMember(pageIn) {
      let memberUP = {};
      if (!!pageIn) {
        memberUP = {
          pageIndex: pageIn,
          pageSize: pubParam.page.pageSize
        };
      } else {
        memberUP = {
          ...pubParam.page
        };
      }
      this.$api.member
        .showMember({
          groupId: this.id,
          ...memberUP
        })
        .then(res => {
          if (res.success) {
            this.params.pageTotal = res.data.pageTotal;
            this.groupData = mapTime(res.data, "joinDate");
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 会员删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$api.member
              .deleteMember({
                companyId: row.companyId,
                groupId: this.id,
                detailId: row.id
              })
              .then(res => {
                if (res.success) {
                  this.displayMember(this.pageLocation);
                  tipMES("删除成功");
                } else {
                  warnMES(res.message);
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
    handleSelect(checkVal) {
      console.log(checkVal);
      this.detailIdList = [];
      checkVal.map(v => {
        this.detailIdList.push(v.id);
      });
    },
    // 批量删除
    batchDelete() {
         this.$confirm('此操作将永久删除这些文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$api.member
            .delBatchMember({
              detailIdList: this.detailIdList,
              groupId: this.id
            })
            .then(res => {
              if (res.success) {
                this.displayMember(this.pageLocation);
                tipMES("删除成功");
              } else {
                warnMES(res.message);
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
    // 查询显示
    showQuery(params) {
      this.$api.member
        .queryMember(params)
        .then(res => {
          if (res.success) {
            let data = res.data;
            queryResp(
              this.memberData,
              this.pageFive,
              res.data,
              "buildDate",
              "dateJoin"
            );
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 搜索添加
    handlequery() {
      this.clear();
      this.searchVisible = true;
      apiSelect({ type: 1 }, this.orgList);
      apiSelect({ type: 2 }, this.memberList);
      apiSelect({ type: 4 }, this.busList);
      this.showQuery(
        Object.assign(
          {
            groupId: this.id
          },
          pubParam.pageDialog
        )
      );
    },
    // 重置
    clear() {
      this.memberType = "";
      this.institutionType = "";
      this.creditId = "";
      this.companyName = "";
      this.companyType = "";
      this.joinTime = "";
    },
    currentChange_(i){
      this.params.pageIndex = i;
      this.params.showQuery = this.id;
      pubParam.pageDialog.pageSize = i;
      this.displayMember(i);
    },
    // 分页,弹窗分页
    currentchange(i) {
      this.pageLocation = i;
      this.showQuery({
        groupId: this.id,
        pageIndex: i,
        pageSize: pubParam.pageDialog.pageSize,
        ...this.queryIF()
      });
    },
    selectType(val, list) {
      if (val == "") return "";
      let type = "";
      list.forEach(v => {
        if (v.dictVal == val) {
          type = v.dictKey;
        }
      });
      return type;
    },
    queryIF() {
      let memberType = this.memberType;
      let institutionType =this.institutionType;
      let companyType = this.companyType;
      let joinDateFrom = this.joinTime
        ? new Date(this.joinTime[0]).getTime()
        : "";
      let joinDateTo = this.joinTime
        ? new Date(this.joinTime[1]).getTime()
        : "";
      let query = {
        memberType,
        institutionType,
        companyType,
        joinDateFrom,
        joinDateTo,
        creditId: this.creditId,
        companyName: this.companyName
      };
      return query;
    },
    // 搜索查询
    clickQuery() {
      console.log("query", this.queryIF());
      this.showQuery(
        Object.assign({
          groupId: this.id,
          ...this.queryIF(),
          ...pubParam.pageDialog
        })
      );
    },
    handleSelectQuery(checkVal) {
      this.companyIdList = [];
      checkVal.map(v => {
        this.companyIdList.push(v.companyId);
      });
    },
    submitMember() {
      this.searchVisible = false;
      this.$api.member
        .addMember({
          groupId: this.id,
          companyIdList: this.companyIdList
        })
        .then(res => {
          if (res.success) {
            successMES("添加成功");
            this.displayMember();
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 根据分类添加
    handleCate() {
      this.kindVisible = true;
      this.$api.member
        .cateMember()
        .then(res => {
          if (res.success) {
            this.kindData = res.data;
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitTree() {
      this.kindVisible = false;
      let keys = this.$refs.tree.getCheckedKeys();
      let companyIdList = [];
      keys.map(v => {
        if (!/[a-z]/i.test(v)) {
          companyIdList.push(v);
        }
      });
      this.$api.member
        .addMember({
          groupId: this.id,
          companyIdList: companyIdList
        })
        .then(res => {
          if (res.success) {
            successMES("添加成功");
            this.displayMember();
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
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
  .el-range-editor.el-input__inner,
  .el-select {
    width: calc(100% - 180px);
  }
  .kindBox {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding: 15px;
    height: 400px;
    margin: 25px;
    margin-top: 10px;
    overflow: auto;
    .el-tree {
      color: #777;
    }
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