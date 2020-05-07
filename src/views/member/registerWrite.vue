<template>
  <div class="container">
    <h1>参与名单</h1>
    <template>
      <el-table :data="regData" style="width: 100%" empty-text="没有符合条件的活动">
        <el-table-column prop="name" label="姓名">
          <template slot-scope="scope">
            <el-input v-if="behaviour == 'click-save'" v-model="scope.row.name" placeholder="请输入内容"></el-input>
            <span v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="job" label="职务">
          <template slot-scope="scope">
            <el-input v-if="behaviour == 'click-save'" v-model="scope.row.job" placeholder="请输入内容"></el-input>
            <span v-else>{{scope.row.job}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="移动电话">
          <template slot-scope="scope">
            <el-input
              v-if="behaviour == 'click-save'"
              v-model="scope.row.phone"
              placeholder="请输入内容"
            ></el-input>
            <span v-else>{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="电子邮件">
          <template slot-scope="scope">
            <el-input
              v-if="behaviour == 'click-save'"
              v-model="scope.row.email"
              placeholder="请输入内容"
            ></el-input>
            <span v-else>{{scope.row.email}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" v-if="actType == 'edit'" label="报名确认状态"></el-table-column>
        <el-table-column prop="state" v-if="actType == 'check'" label="确认状态"></el-table-column>
        <el-table-column v-if="actType == 'write'" label="操作">
          <template slot-scope="scope">
            <span v-if="behaviour == 'click-save'">
              <el-button @click="save(scope.row)" type="primary" size="small">保存</el-button>
            </span>
            <span v-if="behaviour == 'click-edit'">
              <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
            </span>
            <el-button @click="cut(scope.$index, regData)" size="small">删除</el-button>
            <!-- <span v-else></span> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="addItem" v-if="actType == 'write' || actType == 'edit'">
        <el-button icon="el-icon-plus" size="small" @click="addTableItem();">添加</el-button>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    actType: { type: String, required: false } // 路由耦合 路由参数
  },
  data() {
    return {
      behaviour: "click-save", // 操作： 编辑 保存
      regData: [
        {
          name: "参与者1",
          job: "职务1",
          phone: "18777777777",
          email: "31235@qq.com",
          state: "已确认",
          act: ""
        }
      ]
    };
  },
  created() {},
  methods: {
    save(row) {
      this.behaviour = "click-edit";
    },
    edit(row) {
      this.behaviour = "click-save";
    },
    cut(index, rows) {
      rows.splice(index, 1);
    },
    addTableItem() {}
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