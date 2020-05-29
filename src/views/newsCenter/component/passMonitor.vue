<template>
  <div class="container">
    <el-dialog title="发送监控" :show-close="true" :visible.sync="passMonitor" @close="submit()">
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
        <el-tab-pane label="失败" name="fail">
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
      allData:[],
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
    apiDic("readStatus", {}).then(res => {
      this.readList = res;
    });

    this.showTable(pubParam.pageDialog);
  },
  methods: {
    submit() {
      this.$store.commit("closeMonitor");
    },
    handleClick(tab) {
      console.log(tab.index);
     if(tab.index == '1'){
       this.monitorData = []
       for(var i = 0; i < this.allData.length;i++){
         if(this.allData[i].sendStatus==2){
           this.monitorData.push(this.allData[i])
         }
       }
     }else if(tab.index == '2'){
         this.monitorData = []
       for(var i = 0; i<this.allData.length;i++){
         if(this.allData[i].sendStatus==3){
           this.monitorData.push(this.allData[i])
         }
       }
     }else{
       this.monitorData = this.allData
     }

     console.log(this.monitorData);

      // this.readList.map(v => {
      //   if (v.val == tab.label) {
      //     this.readStatus = v.key ? v.key : "";
      //     this.showTable(pubParam.pageDialog);
      //   }
      // });
    },
    showTable(param) {
      apiShow(this.apiObj.name, this.apiObj.fun, {
        id: this.id,
        sendStatus: this.readStatus,
        ...param
      }).then(res => {
        console.log(res);
        this.allData = res.rows
        this.monitorData = res.rows
        // if(res.rows.sendStatus == 1){
        //     this.monitorData1 = res.rows
        // }else if(res.rows.sendStatus == 2){
        //    this.monitorData2 = res.rows
        // }else{
        //   this.monitorData3 = res.rows
        // }
        this.pageAll = backPage(res);
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
