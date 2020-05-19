<template>
  <div class="container">
     <ul v-if="myData.length>0"
              v-for="todo in myData"
              :key='todo.id'
              class='todoContent'>
            <li class="todoeve">
              <div class='todoText'>
                <div>{{todo.companyName}}/{{todo.typeName}}</div>
                <div class="dateText">{{todo.date}}</div>
              </div>
              <div class='todoButton'>
                <ElButton type="primary"
                          size='mini'
                          @click="deal(todo)">处理</ElButton>
              </div>
            </li>
          </ul>
          <div style="padding:10px "
               v-else>
            暂无代办事项
          </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type:'',
      myData:[]
    }
  },
  created() {
    this.type = this.$route.query.type
    this.myData = this.$route.query.myData
  },
  methods: {
     deal(data) {
      switch (data.type) {
        case 13:
          this.$router.push({ path: "/users/costInfo" });
          break;
        case 9:
            if(data.isAccess){
                this.$router.push({ path: "/users/costInfo" });
            }else{
                 this.$router.push({ path: "/member/memberInfo" });
            }
          break;
        default:
          this.$router.push({ path: "/member/memberInfo" });
          break;
      }
    },
  },
}
</script>
<style lang="less">
  .container {
  background: #fff;
  padding: 30px;
  height: 100%;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  height: 50%;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.todotitle {
  font-size: 16px;
  color: #000;
  font-weight: 600;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}
.todoContent {
  margin: 20px;
}
.todoeve {
  list-style-type: none;
  font-size: 14px;
  color: #999;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}
.todoText {
  display: inline-block;
  width: 80%;
  box-sizing: border-box;
}
.todoButton {
  vertical-align: top;
  display: inline-block;
  width: 16%;
  box-sizing: border-box;
}
.dateText {
  color: rgba(0, 0, 0, 0.3);
  font-weight: 400;
  margin-top: 10px;
}
.seeMore {
  float: right;
  font-weight: normal;
  font-size: 14px;
  color: #409eff;
}
</style>