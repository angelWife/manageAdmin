<template>
  <div class="container">
    <el-dialog title="发送监控" :visible.sync="passMonitor" @close="submit()">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all">
          <minitorTable
            :tableData="monitorData"
            :pageTab="pageAll"
            :pageChange="allChange"
            :showMintor="showTable"
            :apiMinitor="apiMinitor"
          ></minitorTable>
        </el-tab-pane>
        <el-tab-pane label="已发送" name="pass">
          <minitorTable
            :tableData="monitorData"
            :pageTab="pageAll"
            :pageChange="allChange"
            :showMintor="showTable"
            :apiMinitor="apiMinitor"
          ></minitorTable>
        </el-tab-pane>
        <el-tab-pane label="已阅读" name="fail">
          <minitorTable
            :tableData="monitorData"
            :pageTab="pageAll"
            :pageChange="allChange"
            :showMintor="showTable"
            :apiMinitor="apiMinitor"
          ></minitorTable>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import minitorTable from "./minitorTable";
import { mapState } from "vuex";
import { apiShow, backPage, apiDic } from "@/utils/commonApi";
import { pubParam, pageFive } from "@/utils/common";

export default {
  props: {
    id: { type: Number, required: true },
    apiObj: { type: Object, required: true },
    apiMinitor: { type: Object, required: false }
  },
  data() {
    return {
      activeName: "all",
      monitorData: [],
      pageAll: { ...pageFive },
      readList: [],
      readStatus: "",

      minitorSys: false
    };
  },
  computed: {
    passMonitor: {
      get() {
        return this.$store.state.dialog.passMonitor;
      },
      set(val) {}
    }
  },
  created() {
    apiDic("readStatus", {}).then(reslove => {
      this.readList = reslove;
    });

    this.showTable(pubParam.pageDialog);
  },
  methods: {
    submit() {
      this.$store.commit("closeMonitor");
    },
    handleClick(tab) {
      this.readList.map(v => {
        if (v.val == tab.label) {
          this.readStatus = v.key ? v.key : "";
          this.showTable(pubParam.pageDialog);
        }
      });
    },
    showTable(param) {
      apiShow(this.apiObj.name, this.apiObj.fun, {
        id: this.id,
        sendStatus: this.readStatus,
        ...param
      }).then(reslove => {
        this.monitorData = reslove.rows;
        this.pageAll = backPage(reslove);
      });
    },
    allChange(i) {
      this.showTable({
        pageIndex: i,
        pageSize: pubParam.pageDialog.pageSize
      });
    }
  },
  components: { minitorTable }
};
</script>
<style lang="less" scoped>
</style>