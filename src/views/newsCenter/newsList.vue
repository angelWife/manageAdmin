<template>
  <div class="container">
    <el-form class="searchForm"
             ref="form"
             label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="短信内容：">
            <el-input v-model="query.content "
                      class="input_style"
                      placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对象类型：">
            <el-select v-model="query.sendObjType"
                       placeholder="请选择">
              <el-option v-for="item in objList"
                         :label="item.val"
                         :value="item.key"
                         :key="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发送对象：">
            <el-input v-model="query.sendObj"
                      class="input_style"
                      placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发送时间：">
            <el-date-picker class="input_style"
                            type="daterange"
                            v-model="query.passTime"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="timestamp"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态：">
            <el-select v-model="query.msgStatus"
                       placeholder="请选择">
              <el-option v-for="item in approList"
                         :label="item.val"
                         :value="item.key"
                         :key="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建人：">
            <el-input v-model="query.creator"
                      class="input_style"
                      placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary"
                   @click="newBuild()">新建</el-button>
      </el-col>
      <el-col :span="12"
              class="text_right">
        <el-button type="primary"
                   @click="handleQuery()">查询</el-button>
        <el-button @click="clear">重置</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData"
              style="width: 100%"
              class="comTable"
              empty-text="没有符合条件的短信发送任务">
      <el-table-column prop="messageContent"
                       show-overflow-tooltip="true"
                       label="短信内容"
                       class-name="textEllipsis"></el-table-column>
      <el-table-column prop="sendObjectTypeVal"
                       label="对象类型"
                       width="100px"></el-table-column>
      <el-table-column prop="objectNameList"
                       show-overflow-tooltip="true"
                       label="发送对象"
                       class-name="textEllipsis">
        <template slot-scope="scope">{{scope.row.objectNameList}}</template>
      </el-table-column>
      <el-table-column prop="sendTime"
                       label="发送时间">
        <template slot-scope="scope">{{format(scope.row.sendTime,true)}}</template>
      </el-table-column>
      <el-table-column prop="msgStatusVal"
                       label="状态"></el-table-column>
      <el-table-column prop="creator"
                       label="创建人"></el-table-column>
      <el-table-column prop="act"
                       fixed="right"
                       label="操作"
                       width="400">
        <template slot-scope="scope">
          <span v-if="scope.row.msgStatus == 2">
            <el-button @click="handleEdit(scope.row.id)"
                       type="primary"
                       size="small">编辑</el-button>
            <el-button @click="handleDown(scope.row.id)"
                       type="primary"
                       size="small">下架</el-button>
            <el-button @click="handleMonitor(scope.row)"
                       type="primary"
                       size="small">发送监控</el-button>
            <el-button @click="handleCopy(scope.row.id)"
                       size="small">复制</el-button>
            <el-button @click="handleDelete(scope.row.id)"
                       size="small">删除</el-button>
          </span>
          <span v-if="scope.row.msgStatus == 1">
            <el-button @click="handleEdit(scope.row.id)"
                       type="primary"
                       size="small">编辑</el-button>
            <el-button @click="handlePublish(scope.row.id)"
                       type="primary"
                       size="small">发布</el-button>
            <el-button @click="handleDelete(scope.row.id)"
                       size="small">删除</el-button>
            <el-button @click="handleCopy(scope.row.id)"
                       size="small">复制</el-button>
          </span>
          <span v-if="scope.row.msgStatus == 3">
            <el-button @click="handleMonitor(scope.row)"
                       type="primary"
                       size="small">发送监控</el-button>
            <el-button @click="handleCheck(scope.row.id)"
                       size="small">查看</el-button>
            <el-button @click="handleCopy(scope.row.id)"
                       size="small">复制</el-button>
          </span>
          <span v-if="scope.row.msgStatus == 4">
            <el-button @click="handleEdit(scope.row.id)"
                       type="primary"
                       size="small">编辑</el-button>
            <el-button @click="handleMonitor(scope.row)"
                       type="primary"
                       size="small">发送监控</el-button>
            <el-button @click="handleCopy(scope.row.id)"
                       size="small">复制</el-button>
            <el-button @click="handleDelete(scope.row.id)"
                       size="small">删除</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   style="margin-top:20px"
                   class="text_center"
                   layout="total,prev, pager, next"
                   :total="pageAll.total"
                   :page-size="pageAll.pageSize"
                   :current-page.sync="pageAll.currentPage"
                   @current-change="currentChange"></el-pagination>
    <passMonitor v-if="!!minitorId"
                 :id="minitorId"
                 :key="key"
                 :apiObj="{name:'message',fun:'smsListen'}"
                 :apiMinitor="{name:'message',fun:'smsAddListen'}"></passMonitor>
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
import { pageTwenty, pubParam } from "../../utils/common";
import { format } from "../../utils/datetime";

export default {
  data() {
    return {
      query: {
        sendObjType: "",
        passTime: "",
        content: "",
        creator: "",
        msgStatus: "",
        sendObj: ""
      },
      approList: [],
      objList: [],
      tableData: [],
      pageAll: { ...pageTwenty },
      pageLocation: 1, // 页数

      minitorId: 0, // 监控ID

      key: 0
    };
  },
  created() {
    apiDic("msgStatus", {}).then(reslove => {
      this.approList = reslove;
    });
    apiDic("objType", {}).then(reslove => {
      this.objList = reslove;
    });

    this.displayQuery();
  },
  methods: {
    format,
    handleQuery() {
      this.pageLocation = 1;
      this.displayQuery();
    },
    displayQuery(page) {
      const pageParam = hasPage(page);
      this.showTable(pageParam);
    },
    showTable(param) {
      const query = {
        sendTimeFrom: this.query.passTime[0],
        sendTimeTo: this.query.passTime[1],
        content: this.query.content,
        creator: this.query.creator,
        msgStatus: this.query.msgStatus,
        sendObj: this.query.sendObj,
        sendObjType: this.query.sendObjType
      };
      apiShow("message", "smsMessage", { ...param, ...query }).then(reslove => {
        this.tableData = reslove.rows;
        this.pageAll = backPage(reslove);
      });
    },
    clear() {
      this.pageLocation = 1;
      this.query = {
        sendObjType: "",
        passTime: "",
        content: "",
        creator: "",
        msgStatus: "",
        sendObj: ""
      };
    },
    currentChange(i) {
      this.pageLocation = i;
      this.showTable({
        pageIndex: i,
        pageSize: pubParam.page.pageSize
      });
    },
    newBuild() {
      this.$router.push({ path: "/newsCenter/newsAdd", query: { add: true } });
    },
    handleEdit(id) {
      /*if(id){

      }*/
      this.$router.push({
        path: "/newsCenter/newsAdd",
        query: {
          rowId: id,
          edit: true
        }
      });
    },
    handleCheck(id) {
      this.$router.push({
        path: "/newsCenter/newsAdd",
        query: {
          rowId: id,
          check: true
        }
      });
    },
    // 打开发送监控
    handleMonitor(row) {
      this.key += 1;
      this.minitorId = row.id;
      this.$store.commit("openMonitor");
    },
    handleDelete(id) {
      this.$confirm("确认删除该短信？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiOperate(
            "message",
            "smsDelete",
            { id: id },
            () => {
              this.displayQuery(this.pageLocation);
            },
            "删除成功"
          );
        })
        .catch(() => {});
    },
    handleDown(id) {
      apiOperate(
        "message",
        "smsDown",
        { id },
        () => {
          this.displayQuery();
        },
        "下架成功"
      );
    },
    handleCopy(id) {
      this.$confirm("是否复制短信发送任务？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.message
            .smsCopy({ id: id })
            .then(res => {
              if (res.success) {
                apiOperate(
                  "message",
                  "smsPublish",
                  { messageId: res.data, publishType: 2 },
                  () => {
                    this.displayQuery();
                  },
                  "复制成功"
                );
              } else {
                warnMES(res.message);
              }
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {});
    },
    handlePublish(id) {
      apiOperate(
        "message",
        "smsPublish",
        { messageId: id, publishType: 1 },
        () => {
          this.displayQuery();
        },
        "发布成功"
      );
    }
  },
  components: { passMonitor }
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
  .input_style,
  .el-select {
    width: calc(100% - 30px);
  }
}
</style>
