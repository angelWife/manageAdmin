<template>
  <div class="appyVip comModal">
    <div class="flex">
      <div class="formMenu">
        <div class="menuBox posit" :style="'top:'+scrollTop+'px'">
          <div
            v-for="(item,ind) in leftMenu"
            :key="ind"
            class="item"
            :class="item.active?'active':''"
            @click="chooseMenu(ind)"
          >
            <a v-if="!!item.id" :href="item.id">{{item.name}}</a>
            <router-link v-else :to="item.path">{{item.name}}</router-link>
          </div>
        </div>
      </div>
      <div class="flex-1 formModal">
        <div :class="{msgMask:msgMask}">
          <div class="mask"></div>
          <div class="formBox" id="basicInfo">
            <div class="title">
              <span class="text">会员基本信息</span>
              <!-- <span class="blue m-l-20 cur-pointer f-right" @click="certUp()">上传凭证</span> -->
            </div>
            <div class="formMain">
              <el-form :model="memberForm" label-width="150px" label="left">
                <el-row class="m-t-20">
                  <el-col :span="10">
                    <el-form-item label="会员类型：">
                      <span class="hideEle" :class="{editInput:!edit}">{{memberForm.type}}</span>
                      <el-input
                        class="hideEle"
                        :class="{editInput:edit}"
                        v-model="memberForm.type"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="会员代号：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="m-t-20">
                  <el-col :span="10">
                    <el-form-item label="会员状态：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="会员有效期：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="formBox" id="applyBook">
            <div class="title">
              <span class="text">入会申请书</span>
            </div>
            <div class="formMain">
              <el-form label-width="150px" label="left">
                <el-form-item label="入会申请书.doc" class="m-t-20">
                  <span class="blue m-l-20 cur-pointer hideEle" :class="{editInput:!edit}">下载</span>
                  <div class="hideEle" :class="{editInput:edit}">
                    <el-upload
                      class="upload-box float-left"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      multiple
                      :limit="3"
                    >
                      <el-button size="small" type="primary">上传文件</el-button>
                    </el-upload>
                    <span class="blue m-l-20 cur-pointer">入会申请书模板下载</span>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="formBox" id="baseInfo">
            <div class="title">
              <span class="text">公司基本信息</span>
            </div>
            <div class="formMain">
              <el-form ref="ruleForm" label-width="140px" label="left">
                <el-row class="m-t-20">
                  <el-col :span="10">
                    <el-form-item label="机构类型：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-select
                        class="hideEle"
                        :class="{editInput:edit}"
                        v-model="ruleForm.region"
                        placeholder="请选择机构类型"
                      >
                        <el-option label="保险公司" value="保险公司"></el-option>
                        <el-option label="财务公司" value="财务公司"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="统一社会信用代码：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="名称：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="英文名称：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="公司类型：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-select
                        class="hideEle"
                        v-model="ruleForm.region"
                        :class="{editInput:edit}"
                        placeholder="请选择公司类型"
                      >
                        <el-option label="有限责任公司" value="有限责任公司"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="成立日期：" prop="data1">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-date-picker
                        class="hideEle"
                        :class="{editInput:edit}"
                        type="date"
                        placeholder="选择日期"
                        v-model="ruleForm.date1"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="是否上市：">
                      <span class="hideEle" :class="{editInput:!edit}">是</span>
                      <el-select
                        class="hideEle"
                        v-model="ruleForm.region"
                        :class="{editInput:edit}"
                        placeholder="请选择"
                      >
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上市地：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="注册地址：" prop="address">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="办公地址：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="公司网址：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="法人代表：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="注册资本(万元)：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="18">
                    <el-form-item label="营业执照：" class="l" style="height:158px">
                      <img
                        class="hideEle"
                        :class="{editInput:!edit}"
                        src="../../../../static/busPort.png"
                      />
                      <div class="hideEle" :class="{editInput:edit}">
                        <el-upload
                          class="avatar-uploader f-left"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                        >
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span
                          class="m-l-20 f-left"
                          style="color:red;"
                        >公司基本信息发生变更，请务必重新上传营业执照，审批会核对两者间是否匹配</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="经营业务许可证：" class="l" style="height:158px">
                      <div class="hideEle" :class="{editInput:!edit}">
                        <img src="../../../../static/busPic.png" />
                        <img src="../../../../static/busPic.png" />
                      </div>
                      <div class="hideEle" :class="{editInput:edit}">
                        <el-upload
                          class="avatar-uploader f-left"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                        >
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span
                          class="m-l-20 f-left"
                          style="color:red;"
                        >公司基本信息发生变更，请务必重新上传经营业务许可证，审批会核对两者间是否匹配</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="formBox" id="userInfo">
            <div class="title">
              <span class="text">联系人信息</span>
            </div>
            <div
              class="msg fs12 c999 m-t-20 hideEle"
              :class="{editInput:edit}"
            >请填写至少两名联系人，建议一名行政，一名业务，务必注意，系统将根据默认联系人手机生成账号，后续各类短信，邮件通知消息也将发送至默认联系人</div>
            <div class="formMain">
              <div class="tableBox hideEle" :class="{editInput:!edit}">
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th>联系人姓名</th>
                      <th>职务</th>
                      <th>办公电话</th>
                      <th>手机</th>
                      <th>传真</th>
                      <th>邮箱</th>
                      <th>备用邮箱</th>
                      <th>通讯地址</th>
                      <th>微信号</th>
                      <th>身份证</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in tableItems" :key="ind">
                      <td>(默认)-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tableBox hideEle" :class="{editInput: edit}">
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th></th>
                      <th>联系人姓名</th>
                      <th>职务</th>
                      <th>办公电话</th>
                      <th>手机</th>
                      <th>传真</th>
                      <th>邮箱</th>
                      <th>备用邮箱</th>
                      <th>通讯地址</th>
                      <th>微信号</th>
                      <th>身份证</th>
                      <th width="160">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in tableItems" :key="ind">
                      <td>
                        <el-button v-if="item.default" type="primary" size="mini">默认</el-button>
                      </td>
                      <td>
                        <ElInput v-model="item.name"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.post"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.tel"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.phone"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.max"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.email"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.b_email"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.address"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.weixin"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.userID"></ElInput>
                      </td>
                      <td>
                        <a class="text" @click="setItemDefault(ind)">设为默认</a>
                        <a class="text" @click="deleteItem(ind)">删除</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="addItem">
                  <el-button icon="el-icon-plus" size="small" @click="addTableItem();">新增</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 会员代表 -->
        <div :class="{memberMask:memberMask}">
          <div class="mask"></div>
          <div class="formBox" id="vipUser">
            <div class="title">
              <span class="text">会员代表</span>
            </div>
            <div class="formMain">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="140px"
                label="left"
              >
                <el-row class="m-t-20">
                  <el-col :span="10">
                    <el-form-item label="证件类型：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-select
                        class="hideEle"
                        v-model="ruleForm.region"
                        :class="{editInput:edit}"
                        placeholder="请选择证件类型"
                      >
                        <el-option label="身份证" value="身份证"></el-option>
                        <el-option label="驾驶证" value="驾驶证"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="证件号码：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入证件号码"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="证件照片：">
                      <img
                        class="hideEle"
                        :class="{editInput:!edit}"
                        src="../../../../static/userPic.png"
                      />
                      <div class="hideEle" :class="{editInput:edit}">
                        <el-upload
                          class="avatar-uploader f-left"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                        >
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="签发机关：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入签发机关"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="有效期：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入有效期"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="姓名：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="性别：">
                      <span class="hideEle" :class="{editInput:!edit}">男</span>
                      <el-select
                        class="hideEle"
                        :class="{editInput:edit}"
                        v-model="ruleForm.region"
                        placeholder="请选择性别"
                      >
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="籍贯：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入籍贯"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="出生年月：">
                      <span class="hideEle" :class="{editInput:!edit}">2013年4月2号</span>
                      <el-date-picker
                        class="hideEle"
                        :class="{editInput:edit}"
                        placeholder="选择时间"
                        type="date"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="民族：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入民族"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="最高学历：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-select
                        class="hideEle"
                        v-model="ruleForm.region"
                        :class="{editInput:edit}"
                        placeholder="请选择最高学历"
                      >
                        <el-option label="本科" value="本科"></el-option>
                        <el-option label="博士" value="博士"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="政治面貌：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入政治面貌"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="职务：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入职务"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="办公电话：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入办公电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="传真：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入传真"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="本人电话：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入本人电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="邮箱：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="通讯地址：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入通讯地址"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="微信号：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入微信号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="代表履历：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input
                        class="hideEle"
                        :class="{editInput:edit}"
                        type="textarea"
                        placeholder="请输入代表履历"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
        <div :class="{msgMask:msgMask}">
          <div class="mask"></div>
          <div class="formBox" id="other">
            <div class="title">
              <span class="text">股东与高管</span>
            </div>
            <div class="formMain hideEle" :class="{editInput:!edit}">
              <div class="tableBox">
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th>股东名称</th>
                      <th>持股比例(%)</th>
                      <th>认缴出资比例(%)</th>
                      <th>股东类型</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in tableItems" :key="ind">
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tableBox">
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th>高管姓名</th>
                      <th>性别</th>
                      <th>职务</th>
                      <th>民族</th>
                      <th>出生年月</th>
                      <th>最高学历</th>
                      <th>任职时间</th>
                      <th>分管部门</th>
                      <th>办公电话</th>
                      <th>邮箱</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in tableItems" :key="ind">
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="formMain hideEle" :class="{editInput:edit}">
              <div class="tableBox">
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th>股东名称</th>
                      <th>持股比例(%)</th>
                      <th>认缴出资比例(%)</th>
                      <th>股东类型</th>
                      <th width="160">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in tableItems" :key="ind">
                      <td>
                        <ElInput v-model="item.name"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.post"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.tel"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.phone"></ElInput>
                      </td>
                      <td>
                        <a class="text" @click="deleteItem(ind)">删除</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="addItem">
                  <el-button icon="el-icon-plus" size="small" @click="addTableItem();">新增</el-button>
                </div>
              </div>
              <div class="tableBox">
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th>高管姓名</th>
                      <th>性别</th>
                      <th>职务</th>
                      <th>民族</th>
                      <th>出生年月</th>
                      <th>最高学历</th>
                      <th>任职时间</th>
                      <th>分管部门</th>
                      <th>办公电话</th>
                      <th>邮箱</th>
                      <th width="160">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in tableItems" :key="ind">
                      <td>
                        <ElInput v-model="item.name"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.post"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.tel"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.phone"></ElInput>
                      </td>
                      <td>
                        <ElInput></ElInput>
                      </td>
                      <td>
                        <ElInput></ElInput>
                      </td>
                      <td>
                        <ElInput></ElInput>
                      </td>
                      <td>
                        <ElInput></ElInput>
                      </td>
                      <td>
                        <ElInput></ElInput>
                      </td>
                      <td>
                        <ElInput></ElInput>
                      </td>
                      <td>
                        <a class="text" @click="deleteItem(ind)">删除</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="addItem">
                  <el-button icon="el-icon-plus" size="small" @click="addTableItem();">新增</el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="formBox" id="msgInfo">
            <div class="title">
              <span class="text">业务信息</span>
            </div>
            <div class="formMain">
              <div class="tableBox hideEle" :class="{editInput:!edit}">
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th>资管部门名称</th>
                      <th>人员数量</th>
                      <th>部门负责人</th>
                      <th>办公电话</th>
                      <th>手机</th>
                      <th>邮箱</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in tableItems" :key="ind">
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tableBox hideEle" :class="{editInput:edit}">
                <div class="msg fs12 c999 m-t-20">根据所属的机构类型， 将对应不同的业务信息需要补充填写</div>
                <table class="myTable m-t-20">
                  <thead>
                    <tr>
                      <th>资管部门名称</th>
                      <th>人员数量</th>
                      <th>部门负责人</th>
                      <th>办公电话</th>
                      <th>手机</th>
                      <th>邮箱</th>
                      <th width="160">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in tableItems" :key="ind">
                      <td>
                        <ElInput v-model="item.name"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.post"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.post"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.tel"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.phone"></ElInput>
                      </td>
                      <td>
                        <ElInput v-model="item.tel"></ElInput>
                      </td>
                      <td>
                        <a class="text" @click="deleteItem(ind)">删除</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="addItem">
                  <el-button icon="el-icon-plus" size="small" @click="addTableItem();">新增</el-button>
                </div>
              </div>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="140px"
                label="left"
              >
                <el-row class="m-t-20">
                  <el-col :span="12">
                    <el-form-item label="具备投资能力：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input
                        class="hideEle"
                        :class="{editInput:edit}"
                        type="textarea"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input
                        class="hideEle"
                        :class="{editInput:edit}"
                        type="textarea"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="保险资金托管业务：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="是否自保监会完成备案：">
                      <span class="hideEle" :class="{editInput:!edit}">是</span>
                      <el-select
                        class="hideEle"
                        v-model="ruleForm.region"
                        :class="{editInput:edit}"
                        placeholder="请选择"
                      >
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="净资产规模：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="受托管理保险资金规模：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="外部信用评级：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="全球总资产规模：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="外部信用评级：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="全球总资产规模：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="外部信用评级：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="全球总资产规模：">
                      <span class="hideEle" :class="{editInput:!edit}">----</span>
                      <el-input class="hideEle" :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="上传证明" :visible.sync="upVisible">
      <div
        style="color:#8d8d8d;"
      >根据具体变更项，系统判定提交后需要参与以下流程，另外出于安全考虑，任何公司基本信息的改动均需额外上传工商部门出具的营业执照变更通知书照片或其他同类证明供审批</div>
      <div class="upContent">
        <div class="upform bd-right">
          <el-checkbox v-model="msgCK">信息变更流程</el-checkbox>
          <footNote v-if="msgCK"></footNote>
          <footNoteDisable v-else></footNoteDisable>
        </div>
        <div class="upform">
          <el-checkbox v-model="memCK">会员代表变更流程</el-checkbox>
          <footNote v-if="memCK"></footNote>
          <footNoteDisable v-else></footNoteDisable>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="upVisible = false">取消</el-button>
        <el-button type="primary" @click="upVisible = false">确定提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import footNote from "./footNote";
import footNoteDisable from "./footNoteDisable";
import { mapState } from "vuex";

export default {
  props: {
    isEdit: { type: Boolean, required: false },
    msgChange: { type: Boolean, required: false }, // 信息变更提交
    memberChange: { type: Boolean, required: false } // 会员代表变更提交
  },
  data() {
    return {
      leftMenu: [
        { name: "会员基本信息", active: true, id: "#basicInfo" },
        { name: "入会申请书", active: false, id: "#applyBook" },
        { name: "公司基本信息", active: false, id: "#baseInfo" },
        { name: "联系人信息", active: false, id: "#userInfo" },
        { name: "会员代表", active: false, id: "#vipUser" },
        { name: "股东与高管", active: false, id: "#other" },
        { name: "业务信息", active: false, id: "#msgInfo" },
        {
          name: "会员证书",
          active: false,
          id: "",
          path: "/member/memberPaper"
        },
        { name: "变更记录", active: false, id: "", path: "/member/alterNote" },
        { name: "缴费记录", active: false, id: "", path: "/member/useNote" },
        { name: "拜访记录", active: false, id: "", path: "/member/visitNote" }
      ],
      imageUrl: "",
      memberForm: {
        type: "特别机构"
      },
      msgCK: true,
      memCK: true,
      formLabelWidth: "120px",
      ruleForm: {
        name: "",
        region: "保险公司",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        address: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      tableItems: [
        {
          name: "",
          post: "",
          tel: "",
          phone: "",
          max: "",
          email: "",
          b_email: "",
          address: "",
          weixin: "",
          userID: "",
          default: false
        }
      ],
      upVisible: false,
      upform: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      scrollTop: 25
    };
  },
  computed: {
    ...mapState({
      msgMask: state => state.dialog.msgMask,
      memberMask: state => state.dialog.memberMask
    }),
    edit: {
      // 是否编辑
      get() {
        return this.$store.state.dialog.edit;
      },
      set(val) {}
    }
  },
  created() {
    if (this.isEdit) {
      this.$store.commit("openEdit");
    } else {
      this.$store.commit("closeEdit");
    }

    if (this.msgChange) {
      this.$store.commit("openMsgMask");
    } else {
      this.$store.commit("closeMsgMask");
    }
    if (this.memberChange) {
      this.$store.commit("openMemberMask");
    } else {
      this.$store.commit("closeMemberMask");
    }
  },
  mounted() {
    const scrollBox = document.getElementById("iframeContainer");
    this.$store.state.app.hasFoot = true;
    scrollBox.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    chooseMenu(ind) {
      this.leftMenu.filter((v, i) => {
        if (i == ind) {
          v.active = true;
        } else {
          v.active = false;
        }
      });
    },
    handleScroll(e) {
      let scrollTop = e.target.scrollTop;
      let scrollHeight = e.target.scrollHeight;
      let h = document.getElementsByClassName("menuBox")[0]
        ? document.getElementsByClassName("menuBox")[0].offsetHeight
        : 0;
      if (scrollTop < 25) {
        this.scrollTop = 25;
      } else if (scrollTop > scrollHeight - h) {
        this.scrollTop = scrollHeight - h;
      } else {
        this.scrollTop = scrollTop;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push({
            path: "/myHome/index",
            query: { type: "sendConfirm" }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addTableItem() {
      let item = {
        name: "",
        post: "",
        tel: "",
        phone: "",
        max: "",
        email: "",
        b_email: "",
        address: "",
        weixin: "",
        default: false
      };
      this.tableItems.push(item);
    },
    deleteItem(ind) {
      if (this.tableItems.length == 1) {
        return false;
      } else {
        this.tableItems.splice(ind, 1);
      }
    },
    setItemDefault(ind) {
      this.tableItems.filter((v, i) => {
        if (i == ind) {
          v.default = true;
        } else {
          v.default = false;
        }
      });
    },
    certUp() {
      this.upVisible = true;
    },
    handlePreview() {},
    handleRemove() {},
    beforeRemove() {},
    handleExceed() {},
    handleAvatarSuccess() {},
    beforeAvatarUpload() {}
  },
  components: {
    footNote,
    footNoteDisable
  }
};
</script>
<style lang="less" scoped>
.appyVip {
  position: relative;
  .formMenu {
    width: 160px;
    height: 100%;
    .menuBox {
      position: fixed;
      border-right: 1px solid #d6d6d6;
    }
    .posit {
      position: absolute;
      width: 160px;
      left: 0;
      top: 25px;
    }
    .item {
      height: 50px;
      display: block;
      color: #666;
      text-align: right !important;
      line-height: 50px;
      border-right: 2px solid rgba(0, 0, 0, 0);
      position: relative;
      right: -1px;
      padding-right: 20px;
      font-size: 16px;
      cursor: pointer;
      a {
        display: block;
        height: 50px;
        color: #666;
      }
      &.active {
        border-right: 2px solid #409eff;
        a {
          color: #409eff;
        }
      }
    }
  }
  .formModal {
    width: calc(100% - 160px);
    padding: 0 20px 0 40px;
    .msgMask,
    .memberMask {
      position: relative;
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 100%;
        z-index: 10;
        &::before {
          position: absolute;
          content: "已有会员信息变更,年审或内部变更流程处于审批中";
          color: #f10d16;
          font-size: 16px;
          margin-left: -178px;
          top: 40%;
          left: 50%;
        }
      }
    }
    .formBox {
      margin-bottom: 20px;
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
    }
    .tableBox {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      overflow-x: auto;
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
}
.upform {
  display: inline-block;
  width: 47%;
  padding: 20px;
  vertical-align: top;
}
.bd-right {
  border-right: 1px solid #dcdfe6;
}
.footBtn {
  padding: 20px;
}
.hideEle {
  display: none;
  .el-input__inner {
    color: #c0cfe3;
  }
}
.editInput {
  display: block;
}
.f-left {
  float: left;
}
.f-right {
  float: right;
}
.upload-demo .el-upload {
  width: 100%;
}
.upload-demo .el-upload-dragger {
  width: 100%;
}
.upload-demo .el-upload-list {
  width: 100%;
}
.annex {
  label.el-form-item__label {
    position: relative;
    &::before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
  }
}
</style>