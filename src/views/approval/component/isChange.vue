<template>
  <div class="container">
    <div class="table_title">会员确认</div>
   <div class="formBox">
      <el-form ref="form" :model="sizeForm" label-width="130px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否有信息变更：">是</el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
  </div>
</template>
<script>
export default {
  props: {
    change: {
      type: Boolean,
      required: false,
      default:true
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 30px;
  background-color: #fff;
}
.formBox {
  padding: 30px;
  .title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #d6d6d6;
    .text {
      font-size: 18px;
      color: #333;
    }
  }
  .el-form-item {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    .el-form-item__label {
      line-height: 100% !important;
      text-align: left;
    }
    .el-form-item__content {
      -webkit-box-flex: 1;
      flex-grow: 1;
      margin-left: 0 !important;
      > .el-select {
        width: 80%;
        min-width: 200px;
      }
      > .el-input {
        width: 80% !important;
        min-width: 200px;
      }
    }
    .avatar-uploader {
      .el-upload-list {
        .el-upload-list__item {
          width: 100px;
          height: 100px;
          line-height: 100px;
        }
      }
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: #409eff;
        }
        &.el-upload--picture-card {
          width: 100px;
          height: 100px;
          line-height: 100px;
        }
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .avatar {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
  }
  .tableBox {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    overflow-x: auto;
    .ctitle {
      margin-top: 20px;
      font-weight: 600;
    }
    .myTable {
      table-layout: fixed;
      border-collapse: separate;
      border-spacing: 0;
      min-width: 100%;
      tr {
        th {
          height: 50px;
          padding: 0 10px;
          border: 0;
          background: #f6f6f6;
          border-bottom: 1px solid #d6d6d6;
          text-align: left;
        }
        td {
          height: 50px;
          padding: 0 10px;
          border-bottom: 1px solid #d6d6d6;
          white-space: nowrap;
          text-overflow: ellipsis;
          input {
            width: 100px;
            height: 36px;
            line-height: 36px;
            padding: 0 5px;
            border: 1px solid #e6e6e6;
          }
          a {
            display: inline-block;
            margin: 0 10px;
          }
        }
      }
    }
    .addItem {
      padding: 20px 0;
      .el-button {
        border-style: dashed !important;
        width: 60%;
      }
    }
  }
}
.formCon {
  height: 115px;
  textarea {
    height: 100%;
  }
}
.icon {
  font-size: 24px;
  i {
    color: #faad14;
  }
}
</style>