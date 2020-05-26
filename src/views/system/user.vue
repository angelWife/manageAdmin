<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <span>用户：</span>
        <el-input placeholder="请输入" v-model="searchObj.userNameLike"></el-input>
      </el-col>
      <el-col :span="8">
        <span>关联角色：</span>
        <el-input placeholder="请输入" v-model="searchObj.roleNameLike"></el-input>
      </el-col>
      <el-col :span="8">
        <span>状态：</span>
        <el-select v-model="searchObj.status" placeholder="请选择">
          <el-option
            v-for="item in stateList"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="btn_content">
      <el-col :span="12">
        <el-button type="primary" @click="handleClick(null)">新建</el-button>
      </el-col>
      <el-col :span="12" class="text_right">
        <el-button type="primary" @click="initPageList">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%;" :header-cell-style="{'text-align':'center'}" class="comTable" empty-text="没有符合条件的用户">
      <el-table-column prop="userId" label="用户id" align ='center'></el-table-column>
      <el-table-column prop="userName" label="用户" align ='center'></el-table-column>
      <el-table-column prop="flagSuper" label="是否超级管理员"  align ='center' :formatter="superText"></el-table-column>
      <el-table-column prop="names" label="角色" width = "120" align ='center'></el-table-column>
      <el-table-column prop="departmentName" label="部门" width = "120" align ='center'></el-table-column>
      <el-table-column prop="mobile" label="手机" width = "120" align ='center'></el-table-column>
      <el-table-column prop="email" label="邮箱" width = "160" align ='center'></el-table-column>
      <el-table-column prop="status" label="状态" align ='center' :formatter="statusText"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width = "160" align ='center' :formatter="timeFormat"></el-table-column>
      <el-table-column fixed="right" label="操作" width="250" align ='center'>
        <template slot-scope="scope">
          <el-button type="primary" @click="handleClick(scope.row)" size="small">编辑</el-button>
          <el-button @click="changePwd(scope.row)" type="primary" size="small">重置密码</el-button>
          <el-button type size="small" v-if="scope.row.status == 1" @click="changeStatus(scope.row,2)">停用</el-button>
          <el-button type="primary" size="small" v-else-if="scope.row.status == 2" @click="changeStatus(scope.row,1)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog class="new-depart" :title="isAdd ?'新增用户':'编辑用户'" :visible.sync="userVisible">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="用户：" required>
          <el-input placeholder="请输入" v-model="formData.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色：" required>
          <el-checkbox v-model="formData.flagSuper">是否超级管理员</el-checkbox>
          <br/>
          <el-select v-if="!formData.flagSuper" v-model="formData.roleIdList" placeholder="请选择" multiple>
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门：" required>
          <!-- <el-select v-model="userData.depart" placeholder="请选择">
            <el-option
              v-for="item in departList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>-->
          <el-cascader
            style="width:100%"
            placeholder="请输入"
            :change-on-select="true"
            :options="departList"
            :props="myprop"
            ref="cascader"
            v-model="formData.departmentId"
            @change="departChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="手机：" required>
          <el-input placeholder="请输入" v-model="formData.mobilePhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" required>
          <el-input placeholder="请输入" v-model="formData.email" autocomplete="off"></el-input>
          <div class="e-tip" style="line-height:1.5;margin-top:5px;">
            用户创建后系统将自动生成初始密码，并会将账号信息发送到对应用户邮箱，用户可以根据邮件链接进行密码修改
          </div>
        </el-form-item>
        <!--<el-form-item label="停用：">
          <el-checkbox v-model="formData.status">是否停用</el-checkbox>
        </el-form-item>-->
        <el-form-item label="备注：">
          <el-input placeholder="请输入" maxlength="40" v-model="formData.remark" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn ">取消</el-button>
        <el-button type="primary" @click="sureBtn">提交</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog class="new-depart" title="编辑用户" :visible.sync="editVisible">
      <el-form :model="userEdit" label-width="60px">
        <el-form-item label="用户：">
          <el-input placeholder="请输入" v-model="userEdit.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色：">
          <el-checkbox v-model="userEdit.editCheck">是否超级管理员</el-checkbox>
          <br />
          <el-select v-model="userEdit.role" placeholder="请选择" multiple>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门：">
          <el-select v-model="userEdit.depart" placeholder="请选择">
            <el-option
              v-for="item in departList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机：">
          <el-input placeholder="请输入" v-model="userEdit.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input placeholder="请输入" v-model="userEdit.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input placeholder="请输入" v-model="userEdit.remark" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="editVisible = false">提交</el-button>
      </div>
    </el-dialog>-->
    <el-dialog title="重置密码" :visible.sync="resetVisible" width="30%">
      <div class="new">
        <span>新密码：</span>
        <el-input v-model="password" maxlength="20" placeholder="请输入新密码"></el-input>
        <div style="margin-left:58px;margin-top:10px;">
          <span>密码要求长度最少为8位，必须包含英文大小写+数字的组合</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetVisible = false">取消</el-button>
        <el-button type="primary" @click="sureChangePwd">确定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="pageTotal"
      :current-change="changePage"
      style="text-align:center;margin-top:60px"
    ></el-pagination>
  </div>
</template>
<script>
  import {comDepartmentList, comUserList} from "../../utils/common";
  import {isMobile, isEmail} from '../../utils/validate'
  import {formatWithSeperator} from "../../utils/datetime";

  export default {
    data() {
      return {
        userVisible: false,
        resetVisible: false,
        editVisible: false,
        myprop: {
          value: "id",
          label: "name",
          children: "children"
        },
        searchObj: {
          pageIndex: 1,
          pageSize: 10,
          roleNameLike: "",
          status: "",
          userNameLike: ""
        },
        formData: {
          userName: "",
          flagSuper: false,
          roleIdList: [],
          departmentId: "",
          mobilePhone: "",
          email: "",
          remark: ""
        },
        tableData: [],
        state: "",
        stateList: [
          {
            id: 1,
            value: 1,
            label: "启用"
          },
          {
            id: 2,
            value: 2,
            label: "关闭"
          }
        ],
        departList: [],
        roleList: [],
        password: "",
        pageTotal: 1,
        isAdd:true,//是否是新建
      };
    },
    created() {
      //    this.approData = this.allData;
      this.initPageList();
      comDepartmentList(this.departList);
      comUserList(this.roleList);
    },
    methods: {
      cancelBtn(){
        this.userVisible = false;
        this.formData.departmentId = [];
      },
      resetSearch() {
        this.searchObj.roleNameLike = "";
        this.searchObj.status = null;
        this.searchObj.userNameLike = "";
        this.initPageList();
      },
      initPageList() {
        let self = this;
        this.$api.system.getUserList(this.searchObj).then(res => {
          if (res.success) {
            let list = res.data.rows;
            self.pageTotal = res.data.pageTotal;
            list.filter(v => {
              let names = "";
              let ids = [];
              if (v.roleList && v.roleList.length > 0) {
                v.roleList.filter((m, j) => {
                  if (j == 0) {
                    names += m.name;
                  } else {
                    names += "," + m.name;
                  }
                  ids.push(m.id);
                });
              }
              v.names = names;
              v.ids = ids;
            });
            self.tableData = list;
          }
        });
      },
      sureBtn() {
        let self = this;
        let params = {...this.formData};
        // console.log(params)
        params.departmentId = params.departmentId[params.departmentId.length - 1];
        params.flagSuper = params.flagSuper ? 1 : 2;
        if (params.userName.trim().length==0) {
          this.$message.error('请输入用户名！')
          return
        }
        if(params.flagSuper==2 && params.roleIdList.length == 0){
          this.$message.error('请选择角色！')
          return
        }
        if(!params.departmentId){
          this.$message.error('请选择部门！')
          return
        }
        if (!isMobile(params.mobilePhone)) {
          this.$message.error('请输入正确的手机号码！')
          return
        }
        if (!isEmail(params.email)) {
          this.$message.error('请输入正确的邮箱地址！')
          return
        }
        this.$api.system.userEdit(params).then(res => {
          if (res.success) {
            if (params.userId) {
              self.$message.success('修改成功！')
            } else {
              self.$message.success('修新增成功！')
            }
            self.userVisible = false;
            self.initPageList()
          }
        });
      },
      handleClick(tab) {
        // console.log(tab);
        if (tab) {
          this.isAdd = false;
          this.formData.userName = tab.userName
          this.formData.roleIdList = tab.ids
          this.formData.departmentId = [1, tab.departmentId]
          this.formData.flagSuper = tab.flagSuper == 1 ? true : false;
          this.formData.mobilePhone = tab.mobile
          this.formData.email = tab.email
          this.formData.remark = tab.remark
          this.formData.userId = tab.userId

          let departmentId = tab.departmentId;
          // console.log(departmentId)
          let tableData = this.departList;
          let arr = [];
          for(let i=0;i<tableData.length;i++){
            let item1 = tableData[i];
            if(departmentId == item1.id){
              arr = [item1.id];
            }else{
              if(item1.children &&item1.children.length){
                for(let j=0;j<item1.children.length;j++){
                  let item2 = item1.children[j];
                  if(departmentId == item2.id){
                    arr.push(item1.id);
                    arr.push(departmentId);
                  }
                  else{
                    if(item2.children && item2.children.length){
                      for(let k =0;k<item2.children.length;k++){
                        let item3 = item2.children[k];
                        if(departmentId == item3.id){
                          arr.push(item1.id);
                          arr.push(item2.id);
                          arr.push(departmentId);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          this.formData.departmentId = arr;
          if(departmentId == -1){
            this.formData.departmentId = [tab.departmentId];
          }
        } else {
          this.isAdd = true;
          this.formData.userName = ''
          this.formData.roleIdList = []
          this.formData.departmentId = ''
          this.formData.flagSuper = false;
          this.formData.mobilePhone = ''
          this.formData.email = ''
          this.formData.remark = ''
          this.formData.userId = ''
        }
        this.userVisible = true;
      },
      statusText() {
        if (arguments[2] == 1) {
          return "启用";
        } else {
          return "关闭";
        }
      },
      superText() {
        if (arguments[2] == 1) {
          return "是";
        } else {
          return "否";
        }
      },
      changePwd(rowData) {
        this.resetVisible = true;
        this.password = ''
        this.formData = rowData
      },
      sureChangePwd() {
        if (!this.password) {
          this.$message.error('请输入密码！')
          return
        }
        let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/g;
        if(!reg.test(this.password)){
          this.$message.error('请输入正确的密码最少为8位(数字 + 大写字母 + 小写字母)组合');
          return
        }
        let params = {
          userId: this.formData.userId,
          passwdNew: this.password
        }
        this.$api.system.userPwdChange(params).then(res => {
          if (res.success) {
            this.$message.success('修改该用户的密码成功！')
            this.resetVisible = false;
          }
        })
      },
      departChange() {
      },
      changePage() {
      },
      timeFormat() {
        return formatWithSeperator(arguments[2], "-", ":");
      },
      changeStatus(row,status) {
        let self = this;
        let title = status ==2?'是否停用?':'是否启用?'
        this.$confirm(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {'userId':row.userId,'status':status};
          //console.log(params);
          self.$api.role.changeStatus(params).then(res => {
            // console.log(res);
            if (res.success) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              self.initPageList()
            }
          });
        }).catch(() => {
        });

      },
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
    min-height: 100%;

    .el-row {
      .el-input,
      .el-select {
        width: calc(100% - 180px);
      }
    }

    .e-tip {
      color: #ccc;
    }

    .new-depart {
      .el-select {
        width: 100%;
      }
    }

    .new {
      .el-input {
        width: calc(100% - 70px);
      }
    }
  }
</style>
