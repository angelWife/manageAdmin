<template>
  <div class="container">
    <el-row>
      <el-col :span="12">
        <div class="title">{{article.title}}</div>
        <div class="content">
          <div class="article" v-html="article.content"></div>
        </div>
      </el-col>
    </el-row>
    <div>
      <!--<span class="blue cur-pointer">下载</span>
      <el-checkbox v-model="checked" class="m-l-20">《中国保险资产管理业发展报告（2019）》感谢信</el-checkbox>-->
    </div>
  </div>
</template>
<script>
import { apiShow } from "../../utils/commonApi";

export default {
  data() {
    return {
      checked: false,
      article: {
        title: "",
        content: ""
      }
    };
  },
  created() {
    this.displayArticle();
  },
  methods: {
    displayArticle() {
      apiShow("member", "noticeRead", { id: this.$route.query.rowId }).then(
        reslove => {
          this.article = {
            title: reslove.noticeTitle,
            content: reslove.noticeData
          };
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 30px;
  height: 100%;
  .title {
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 10px;
  }
  .content {
    font-size: 14px;
    line-height: 25px;
    margin-bottom: 10px;
    div.article {
      p {
        text-indent: 2em;
      }
    }
  }
}
</style>
