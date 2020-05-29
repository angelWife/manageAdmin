<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <div>
          <span>名目：</span>
          <el-input v-model="query.name" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>机构名称：</span>
          <el-input v-model="query.companyName" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>发票类型：</span>
          <el-input v-model="query.invoiceType" placeholder="请输入" class="input_style"></el-input>
          <!--<el-select v-model="query.invoiceType" placeholder="请选择">
            <el-option
              v-for="item in billList"
              :key="item.id"
              :value="item.dictKey"
              :label="item.dictVal"
            ></el-option>
          </el-select>-->
        </div>
      </el-col>
    </el-row>
    <!--<el-row>
      <el-col :span="8">
        <div>
          <span>税号：</span>
          <el-input v-model="query.creditId" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span>公司抬头：</span>
          <el-input v-model="query.companyTitle" placeholder="请输入" class="input_style"></el-input>
        </div>
      </el-col>
    </el-row>-->
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary" @click="exportInvoice">导出</el-button>
        <el-button type="primary" @click="importInvoice = true">导入</el-button>
      </el-col>
      <el-col :span="12" class="text_right">
        <el-button type="primary" @click="handleQuery()">查询</el-button>
        <el-button @click="clear()">重置</el-button>
      </el-col>
    </el-row>
    <div calss></div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <billTable :billData="billAll" :pageTab="pageAll" :pageChange="allChange"></billTable>
      </el-tab-pane>
      <el-tab-pane label="待寄送" name="wait">
        <billTable :billData="billAll" :pageTab="pageAll" :pageChange="allChange"></billTable>
      </el-tab-pane>
      <el-tab-pane label="已寄送" name="pass">
        <billTable :billData="billAll" :pageTab="pageAll" :pageChange="allChange"></billTable>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :visible.sync="importInvoice" width="450px" title="导入数据">
      <div class="content">
        <el-upload
          :disabled="check"
          class="upload-box"
          :multiple="false"
          ref="uploadApplication"
          :action="global.baseUrl+global.commonFileUploadUrl"
          :http-request="uploadFile"
          :show-file-list = "false">
          <el-button size="small" icon="el-icon-upload2" :disabled="check">上传文件</el-button>
        </el-upload>
        <div style="margin-left:10px; margin-top: 10px;" v-if="filePath">
          <span style="margin-right:10px;">{{fileName}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="importInvoice = false">取 消</el-button>
            <el-button type="primary" :disabled="!filePath" @click="importOkay">开始导入</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { uploadFile } from "./../../http/moudules/common"
import {pageTen, pubParam, apiSelect, warnMES, successMES} from "../../utils/common";
import { apiShow, apiDic, backPage,hasPage } from "../../utils/commonApi";
import billTable from "./component/table/billTable";
export default {
  data() {
    return {
      importInvoice: false,
      filePath: '',
      fileName: '',
      query: {
        name: "",
        companyName: "",
        invoiceType: "",
        companyTitle: "",
        creditId: ""
      },
      pageAll: {},
      billList: [],
      activeName: "all",
      sendStatus: "",
      billAll: [],
      billStatus: [],
      pageLocation: 1
    };
  },
  created() {
    //apiSelect({ type: 7 }, this.billList); // 发票类型
    apiDic("billStatus", {}).then(resolve => {
      this.billStatus = resolve;
    });

    this.showBill(pubParam.page);
  },
  methods: {
    handleClick(tab) {
      this.billStatus.map(v => {
        if (v.val == tab.label) {
          this.sendStatus = v.key ? v.key : "";
          this.showBill({
            ...pubParam.page
          });
        }
      });
    },
    showBill(param) {
      apiShow("member", "queryInvoice", {
        sendStatus: this.sendStatus,
        ...this.query,
        ...param
      }).then(resolve => {
        this.billAll = resolve.rows;
        this.pageAll = backPage(resolve);
      });
    },
    clear() {
      this.pageLocation = 1;
      this.query = {
        name: "",
        companyName: "",
        invoiceType: "",
        companyTitle: "",
        creditId: ""
      };
      this.handleQuery();
    },
    handleQuery(pageLocation) {
      const pageParam = hasPage(pageLocation);
      this.showBill({
        ...pageParam
      });
    },
    allChange(i) {
      this.pageLocation = i;
      this.showBill({
        pageIndex: this.pageLocation,
        pageSize: pubParam.page.pageSize
      });
    },
    exportInvoice: function () {
      apiShow("member", "exportInvoice", {
        sendStatus: this.sendStatus,
        ...this.query
      }).then(resolve => {
        location.href = resolve.fullPath
      });
    },
    uploadFile(obj){//上传文件
      if( Math.floor( obj.file.size/(1024*1024) ) > 10 ){
        warnMES('最多上传10M')
        return
      }
      let formData = new FormData();
      formData.append('file',obj.file);
      let url="",method="";
      let that = this;
      uploadFile(formData,url,method).then((res=>{
        if(res && res.code=='200' && res.data){
          successMES('上传成功');
          that.filePath = res.data.path;
          that.fileName = obj.file.name;
        }
      })).catch(error=>{

      })
    },
    importOkay: function () {
      let that = this
    this.$api['member']['importInvoice']({filePath: this.filePath}).then(res => {
        if (res.success) {
          that.filePath = ''
          that.fileName = ''
          that.importInvoice = false
          successMES('导入成功');
          that.clear()
        }
      }).catch(err => {
        console.error(err)
      })
    }
  },
  components: { billTable }
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
