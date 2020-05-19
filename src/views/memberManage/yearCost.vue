<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <div>
          <span>年费项目：</span>
          <el-input placeholder="请输入" v-model="project" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="10">
        <div>
          <span>时间周期：</span>
          <el-date-picker
            v-model="dateInterval"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <span>发布状态：</span>
          <el-select placeholder="请选择" v-model="publish" style="width:70%;">
            <el-option v-for="item in pubList" :key="item.index" :value="item.val"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div>
          <span>创建人：</span>
          <el-input placeholder="请输入" v-model="builder" class="input_style"></el-input>
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
      :header-cell-style="thStyle"
      style="width: 100%;padding:30px 0"
      empty-text="没有符合条件的年费缴纳项"
    >
      <el-table-column prop="name" label="年费名目" width align="center"></el-table-column>
      <el-table-column prop="dateEnd" label="时间周期" align="center">
        <template slot-scope="scope">{{scope.row.dateStart}}到{{scope.row.dateEnd}}</template>
      </el-table-column>
      <el-table-column prop="publishStatusVal" label="发布状态" align="center"></el-table-column>
      <el-table-column prop="creatorName" label="创建人" align="center"></el-table-column>
      <el-table-column label="操作" prop="act" min-width="140">
        <template slot-scope="scope">
          <span v-if="scope.row.publishStatus == 1">
            <el-button type="primary" size="small" @click="puslishYear(scope.row.id)">发布</el-button>
            <el-button type="primary" size="small" @click="handleCalc(scope.row.id)">年费计算</el-button>
            <el-button size="small" @click="handleDelte(scope.row.id)">删除</el-button>
          </span>
          <span v-if="scope.row.publishStatus == 2">
            <el-button type="primary" size="small" @click="downProject(scope.row.id)">下架</el-button>
            <el-button type="primary" size="small" @click="handleCalc(scope.row.id)">年费计算</el-button>
            <el-button type="primary" size="small" @click="payMonitor(scope.row.id)">缴纳监控</el-button>
          </span>
          <span v-if="scope.row.publishStatus == 3">
             <el-button type="primary" size="small" @click="puslishYear(scope.row.id)">发布</el-button>
            <el-button type="primary" size="small" @click="handleCalc(scope.row.id)">年费计算</el-button>
            <el-button type="primary" size="small" @click="payMonitor(scope.row.id)">缴纳监控</el-button>
            <el-button type="primary" size="small" @click="handleDelte(scope.row.id)">删除</el-button>
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
    <el-dialog title="新增年费项目" :visible.sync="proVisible" width="30%" class="proBox">
      <el-form :model="projectData" label-width="120px">
        <el-form-item label="年费缴纳年份：" class="mustFill">
          <el-select placeholder="请选择" v-model="projectData.yearOfPayment">
            <el-option v-for="item in yearList" :key="item.id" :value="item.dictVal"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名目：">
          <el-input v-model="projectData.name" placeholder="请输入" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="周期：">
          <el-date-picker
            v-model="projectData.dateStart"
            placeholder="开始日期"
            
            
          ></el-date-picker>

           <el-date-picker
            style="margin-top:10px;"
            v-model="projectData.dateEnd"
            placeholder="结束日期"
            
            
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="proVisible = false">取消</el-button>
        <el-button type="primary" @click="submitFee()">提交</el-button>
      </div>
    </el-dialog>
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
  apiMemberStatus,
  apiPublishStatus,
  selectType,
  queryResp,
  mapTime,
  getDateTime
} from "../../utils/common";
import { publishYearCostProject ,yearCostProjectDown,viewYearCost}  from "../../http/moudules/member"
export default {
  data() {
    return {
      tHeadStyle: {},
      thStyle: {
        border: 0,
        background: "rgba(200,200,200,0.2)",
        color: "#666"
      },
      project: "",
      dateInterval: "",
      publish: "",
      builder: "",
      pubList: [],
      yearList: [],
      allData: [],
      proVisible: false,
      projectData: {
        yearOfPayment: "",
        name: "",
        dateTime: ""
      },
      pageTen,
      pageLocation: 1
    };
  },
  created() {
    apiPublishStatus(this.pubList); // 发布状态
    apiSelect({ type: 5 }, this.yearList); // 缴纳年份
    this.displayReview(pubParam.page);
  },
  methods: {
    handleCalc(id) {
      this.$router.push({
        path: "/member/annualCalcu",
        query: { payFeeId: id }
      });
    },
    payMonitor(id){
      this.$router.push({
        path: "/member/mintorPay",
        query: { payMonitorId: id }
      });
    },
    handleMonit() {
      this.$router.push({ path: "/member/mintorPay" });
    },
    handleDelte(id) {
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$api.member
            .deleteFee({
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
              console.error(error);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    queryIF() {
      const query = {
        annualFeeName: this.project,
        creator: this.builder,
        feeTimeStart: getDateTime(this.dateInterval[0]),
        feeTimeEnd: getDateTime(this.dateInterval[1]),
        publishStatus: this.searchStatus(this.publish, this.pubList)
      };
      return query;
    },
    puslishYear(id){
         this.$confirm('确定发布?, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
             publishYearCostProject({id:id}).then(rep=>{
                if(rep && rep.code=='200'){
                    successMES('发布成功')
                    this.handleQuery(this.pageLocation);
                }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
       
    },
    downProject(id){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             yearCostProjectDown({id:id}).then(rep=>{
                   if(rep && rep.code=='200'){
                        successMES('下架成功')
                        this.handleQuery(this.pageLocation);
                    }
              })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
    },
    handleQuery(pageIn) {
      if (!!pageIn) {
        this.displayReview({
          pageIndex: pageIn,
          pageSize: pubParam.page.pageSize,
          ...this.queryIF()
        });
      } else {
        this.displayReview({ ...pubParam.page, ...this.queryIF() });
      }
    },
    clear() {
      this.project = "";
      this.creator = "";
      this.dateInterval = "";
      this.publish = "";
    },
    searchStatus(val, list) {
      if (val == "") return "";
      let type = "";
      list.forEach(v => {
        if (v.val == val) {
          type = v.key;
        }
      });
      return type;
    },
    displayReview(params) {
      this.$api.member
        .showFee(params)
        .then(res => {
          if (res.success) {
            queryResp(
              this.allData,
              this.pageTen,
              res.data,
              "dateStart",
              "dateEnd"
            );
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    newBuild() {
      viewYearCost().then(rep=>{
          if(rep && rep.code==200 && rep.data){
               this.projectData = rep.data
                this.proVisible = true;
          }
      })
      
    },
    submitFee() {
      this.proVisible = false;
      const upParams = {
        yearOfPayment: selectType(
          this.projectData.yearOfPayment,
          this.yearList
        ),
        name: this.projectData.name,
        dateStart: this.projectData.dateStart,
        dateEnd: this.projectData.dateEnd,
        id: ""
      };
      this.$api.member
        .addFee(upParams)
        .then(res => {
          if (res.success) {
            successMES("添加成功");
            this.displayReview(pubParam.page);
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
      this.displayReview({
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
    width: calc(100% - 180px);
  }
  .proBox {
    .el-range-editor.el-input__inner {
      width: 100%;
    }
    .el-select {
      width: 100%;
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