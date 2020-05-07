<template>
  <div class="explain">
    <div class="formBox">
      <el-form ref="form" :model="sizeForm" label-width="70px">
        <el-form-item class="mustFill" label="说明：">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入说明"
            v-model="sizeForm.note"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="附件：" class="annex">
          <el-upload
            class="upload-demo upStyle"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :file-list="fileList"
          >
            <i class="el-icon-upload" style="color:#1890ff;margin-top:20px"></i>
            <div class="el-upload__text">
              <span>点击或将文件拖拽到这里上传</span>
              <span class="support">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      sizeForm: {
        note: ""
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  created() {}
};
</script>
<style lang="less" scoped>
.explain {
  background: #fff;
  margin-top: 30px;
  .table_title {
    font-size: 16px;
    font-weight: 600;
    padding: 15px 30px;
    border-bottom: 1px solid #eee;
  }
  .formBox {
    .upload-demo {
      .el-upload__text {
        span {
          display: block;
          line-height: 28px;
        }
        .support {
          color: #8a8a8a;
        }
      }
    }
  }
}
.el-upload__text span {
  color: #666;
}
</style>