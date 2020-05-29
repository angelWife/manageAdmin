<template>
  <div class="container">
    <h1>参与名单</h1>
    <div style="width:100%;">
      <el-table :data="joinData" border style="width: 100%">
        <el-table-column prop="peopleName" label="姓名">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.peopleName" placeholder="请输入内容"></el-input>
            <span v-else>{{scope.row.peopleName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="duty" label="职务">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.duty" placeholder="请输入内容"></el-input>
            <span v-else>{{scope.row.duty}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mobileNum" label="移动电话">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.mobileNum" placeholder="请输入内容"></el-input>
            <span v-else>{{scope.row.mobileNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" width="300" label="电子邮件">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.email" placeholder="请输入内容"></el-input>
            <span v-else>{{scope.row.email}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="enrolStatusVal" v-if="actType == 'check'" label="确认状态"></el-table-column>
        <el-table-column label="操作" v-if="!(actType == 'check')">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isEdit" @click="save(scope)" type="primary" size="small">保存</el-button>
            <el-button v-else @click="edit(scope)" type="primary" size="small">编辑</el-button>
            <el-button @click="cut(scope.row)" type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="addItem" v-if="!(actType == 'check')">
        <el-button icon="el-icon-plus" size="small" @click.stop="addTableItem();">添加</el-button>
      </div>
    </div>
    <div class="footBtnBox text_right" v-if="!(actType == 'check')">
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>
<script>
  import {
    apiDic,
    apiShow,
    apiOperate,
    backPage,
    hasPage, tipMES
  } from "../../utils/commonApi";
import { warnMES } from "../../utils/common";
export default {
  props: {
    actType: { type: String, required: false } // 路由耦合 路由参数
  },
  data() {
    return {
      clickState: 0, //  true 编辑 false 查看
      joinData: [
        {
          peopleName: "",
          duty: "",
          mobileNum: "",
          email: "",
          isEdit: true
        }
      ],
      idList: {},
      rowObj: {}
    };
  },
  created() {
    const activityInfo = JSON.parse(sessionStorage.getItem("activityInfo"));
    this.idList = {
      activityEnrolId: activityInfo.activityEnrolId,
      activityId: activityInfo.activityId
    };
    // if (
    //   activityInfo.activivyEnrolStatus == 1 &&
    //   activityInfo.enrolStatus == 3
    // ) {
    this.showReg();
    // }
  },
  mounted() {},
  methods: {
    showReg() {
      apiShow("member", "activitySign", { ...this.idList }).then(reslove => {
        reslove.map(v => {
          v.isEdit = false;
        });
        this.joinData = reslove;
      });
    },

    cut(row) {
      if(!row.id){
        this.joinData.splice(row.index,1)
      }else{
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              apiOperate(
                "member",
                "deleteEnroll",
                { id: row.id },
                () => {
                  this.showReg();
                },
                "删除成功"
              );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }

    },
    save(scope) {
      scope.row.isEdit = false;
      this.$api['member']['joinAdd']({ ...scope.row, ...this.idList }).then(res => {
        if (res.success) {
          this.showReg();
        } else {
          this.joinData.splice(scope.row.index,1)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    edit(scope) {
      scope.row.isEdit = true;
    },
    addTableItem() {
      this.joinData.push({
        peopleName: "",
        duty: "",
        mobileNum: "",
        email: "",
        isEdit: true,
        index:this.joinData.length
      });
    },
    isShow(i) {}
  }
};
</script>
<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 30px;
  height: 100%;
  h1 {
    font-size: 16px;
    font-weight: 600px;
    margin-bottom: 10px;
  }
  .addItem {
    padding: 20px 0;
    .el-button {
      border-style: dashed !important;
      width: 100%;
    }
  }
}
</style>
