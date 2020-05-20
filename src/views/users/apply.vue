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
            @click="chooseMenu(ind)" >
            <a :href="item.id">{{item.name}}</a>

          </div>
        </div>
      </div>
      <div class="flex-1 formModal">
        <div class="formBox" id="applyBook">
          <div class="title">
            
            <span class="text" name="applyBook">入会申请书</span>
          </div>
          <div class="formMain">
            <el-form label-width="150px" label="left">
              <el-form-item  class="m-t-20">
                <span slot="label">
                      <span style="color:#F56C6C;"> * </span>
                           <a href="#" style="color:#606266">入会申请书.doc</a>
                       </span>

                <div >
                 <div>
                    <a :href="applyBookUrl" target="_blank"  v-show="applyBookUrl"
                        style="display:inline-block;position:relative;">
                          <span class="el-icon-close" 
                                style="position:absolute;right:-16px;top:14px;color:#ff0000; " 
                                @click.prevent="removeFile(1)"></span>
                          {{applyBookName}}
                   </a> 

                 </div> 
                 
                  <el-upload
                    class="upload-box float-left"
                    :multiple="false"
                    ref="uploadApplication"
                    :show-file-list="false"
                    :action="global.baseUrl+global.commonFileUploadUrl"
                    :http-request="uploadFile"
                    :data="{id:1}"
                    accept=".doc, .docx"
                    :limit="1">
                    <el-button size="small" type="primary">上传文件</el-button>
                  </el-upload>
                  <span class="blue m-l-20 cur-pointer" @click="downloadTemplate">
                      入会申请书模板下载
                  </span>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="formBox" id="baseInfo" :class="{companyMask:companyMask}">
          <div class="mask"></div>
          <div class="title">
            <span class="text" name="baseInfo">公司基本信息</span>
            <el-button  size="small" type="primary"
                        style="float:right;margin-top:10px;"
                        @click="saveCompanyInfo('companyForm')">保存</el-button>
          </div>
          <div class="formMain">
            <el-form ref="companyForm" :model="companyForm" label-width="190px" label="left" :rules="companyFormRules">
              <el-row class="m-t-20">
                <el-col :span="10">
                  <el-form-item label="机构类型：" prop="institutionType" >
                    <el-select
                      size="small"
                      v-model="companyForm.institutionType"
                      placeholder="请选择机构类型"
                    >
                      <el-option v-for="item in orgList" :label="item.dictVal" :value="item.dictKey"  :key="item.id"></el-option>

                    </el-select>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row class="m-t-20">
                <el-col :span="10">
                  <el-form-item label="是否有社会统一信用代码："  prop="flagHaveCredit">

                    <el-select size="small"
                               v-model="companyForm.flagHaveCredit "
                               placeholder="请选择">
                      <el-option :value="1" label="是" key="1"></el-option>
                      <el-option :value="0" label="否" key="0"></el-option>
                    </el-select>

                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="统一社会信用代码：" prop="creditId">

                    <el-input   size="small"
                                v-model="companyForm.creditId" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="名称：" prop="companyName">


                    <el-input
                      v-model="companyForm.companyName" placeholder="请输入内容"  size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="英文名称：" prop="companyNameEng">

                    <el-input
                      size="small"
                      v-model="companyForm.companyNameEng"
                      placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="公司类型：" prop="companyType">

                    <el-select
                      size="small"
                      v-model="companyForm.companyType"

                      placeholder="请选择公司类型"
                    >

                      <el-option  v-for="(item,index) in companyTypeData"
                                  :label="item.val" :value="item.key" :key="index"></el-option>

                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="成立日期：" prop="dateBuild">

                    <el-date-picker


                      format="yyyy-MM-dd"
                      value-format  ="yyyy-MM-dd"
                      type="date"
                      size="small"
                      placeholder="选择日期"
                      v-model="companyForm.dateBuild"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="是否上市：" prop="flagListed">

                    <el-select

                      size="small"
                      v-model="companyForm.flagListed"

                      placeholder="请选择"
                    >
                      <el-option label="是" :value="1"></el-option>
                      <el-option label="否" :value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="上市地：">

                    <el-input  v-model="companyForm.listAddress"  size="small" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="注册地址：" prop="registeredAddress">

                    <el-input  size="small"
                               v-model="companyForm.registeredAddress"
                               placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="办公地址：" prop="workAddress">

                    <el-input  size="small"
                               v-model="companyForm.workAddress"
                               placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="公司网址：" prop="companyWeb">

                    <el-input   size="small"
                                v-model="companyForm.companyWeb"
                                placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="法人代表：" prop="legalRepresentative">

                    <el-input   size="small"
                                v-model="companyForm.legalRepresentative"
                                placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="注册资本(万元)：" prop="registeredCapital">

                    <el-input  size="small"
                               v-model="companyForm.registeredCapital"
                               placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="18">
                  <el-form-item  class="l" style="height:158px" >
                    <span slot="label">
                      <span style="color:#F56C6C;"> * </span>
                         营业执照：
                    </span>
                     <a :href="companyForm.imgPathLicence" target="_blank" 
                        v-show="companyForm.imgPathLicence"
                        style="display:inline-block;position:relative;height:100px;">
                          <span class="el-icon-close" 
                                style="position:absolute;right:5px;top:5px;color:#ff0000; " 
                                @click.prevent="removeFile(2)"></span>
                          <img :src="companyForm.imgPathLicence"  width="100"  height="100" />
                     </a> 
                     <div>
                     <el-upload
                        class="avatar-uploader f-left"
                        :multiple="false"
                        ref="uploadImgPathLicence"
                        :action="global.baseUrl+global.commonFileUploadUrl"
                        :http-request="uploadFile"
                        :data="{id:2}"
                        accept=".png,.gif,.jpg,.pgeg"
                        :limit="1"
                        :show-file-list="false">
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
                  <el-form-item  class="l" style="height:158px">
                    <span slot="label">
                      <span style="color:#F56C6C;"> * </span>
                         经营业务许可证：
                    </span>
                    <template v-for="(item,index) in (companyForm.imgPathBusinessList || [])" >
                      <a :href="item" target="_blank" 
                         :key="index"
                          style="display:inline-block;position:relative;height:100px;margin-right:10px;">
                            <span class="el-icon-close" 
                                  style="position:absolute;right:5px;top:5px;color:#ff0000; " 
                                  @click.prevent="removeFile(3,index)"></span>
                            <img :src="item"  width="100"  height="100" />
                       </a>
                     </template>
                    <div>
                      <el-upload
                        class="avatar-uploader f-left"
                        :multiple="false"
                        :file-list="imgPathBusinessList"
                        :action="global.baseUrl+global.commonFileUploadUrl"
                        :http-request="uploadFile"
                        :data="{id:3}"
                       
                        accept=".png,.gif,.jpg,.pgeg"
                        :show-file-list="false">
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
        <div class="formBox" id="userInfo" :class="{companyMask:linkManMask}">
          <div class="mask"></div>
          <div class="title">
            
            <span class="text" name="userInfo">联系人信息</span>
            <el-button size="small"  type="primary"

                       @click="linkmanSave" style="float:right;">保存</el-button>
          </div>
          <div class="msg fs12 c999 m-t-20 ">
                  请填写至少两名联系人，建议一名行政，一名业务，务必注意，系统将根据默认联系人手机生成账号，后续各类短信，邮件通知消息也将发送至默认联系人
          </div>
          <div class="formMain">

            <div class="tableBox " >
              <table class="myTable m-t-20">
                <thead>
                <tr>
                  <!-- <th>默认</th> -->
                  <th><span style="color:#F56C6C;"> * </span>联系人姓名</th>
                  <th><span style="color:#F56C6C;"> * </span>职务</th>
                  <th><span style="color:#F56C6C;"> * </span>办公电话</th>
                  <th><span style="color:#F56C6C;"> * </span>手机</th>
                  <th>传真</th>
                  <th><span style="color:#F56C6C;"> * </span>邮箱</th>
                  <th>备用邮箱</th>
                  <th>通讯地址</th>
                  <th>微信号</th>
                  <!-- <th>身份证</th> -->
                  <th width="160">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,ind) in editContactTable" :key="ind">

                  <td>
                    <span v-if="item.flagDefault==1">(默认)</span>
                    <ElInput style="min-width:120px;width:80%;" size="small" v-model="item.contactName"></ElInput>
                  </td>
                  <td>
                    <ElInput style="min-width:80px;"   size="small"  v-model="item.duty"></ElInput>
                  </td>
                  <td>
                    <ElInput  style="min-width:120px;"  size="small"  v-model="item.officePhoneNum"></ElInput>
                  </td>
                  <td>
                    <ElInput  style="min-width:120px;"  size="small"  v-model="item.mobileNum"></ElInput>
                  </td>
                  <td>
                    <ElInput  style="min-width:120px;"  size="small"  v-model="item.fax"></ElInput>
                  </td>
                  <td>
                    <ElInput  style="min-width:120px;"  size="small"  v-model="item.mailAddress"></ElInput>
                  </td>
                  <td>
                    <ElInput  style="min-width:120px;"   size="small"  v-model="item.standbyMail"></ElInput>
                  </td>
                  <td>
                    <ElInput  style="min-width:120px;"  size="small"  v-model="item.contactAddress"></ElInput>
                  </td>
                  <td>
                    <ElInput  style="min-width:100px;"  size="small"  v-model="item.weChatNum"></ElInput>
                  </td>
                  <!-- <td>
                    <ElInput   style="min-width:180px;" v-model="item.id"></ElInput>
                  </td> -->
                  <td>
                    <a class="text" @click="setItemDefault(item)" v-show="item.id && item.flagDefault!=1">设为默认</a>
                    <a class="text" @click="deleteItem(ind,1,item)">删除</a>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="addItem">
                <el-button icon="el-icon-plus" size="small" @click="addTableItem(1);">新增</el-button>
              </div>
            </div>
          </div>
        </div>
        <!-- 会员代表 -->
        <div :class="{memberMask:memberMask}" id="member-rep">
          <div class="mask"></div>
          <div class="formBox" id="vipUser">
            <div class="title">
             
              <span class="text" name="vipUser">会员代表</span>
              <el-button size="small"  type="primary"

                         @click="memberRepresentativeSave('repForm',1)" style="float:right;">保存</el-button>
            </div>
            <div class="formMain">
              <el-form :model="repForm" ref="repForm" label-width="140px" label="left" :rules="ruleFormRules">
                <el-row class="m-t-20">
                  <el-col :span="10">
                    <el-form-item label="证件类型：" prop="licenseType">

                      <el-select
                        clearable

                        v-model="repForm.licenseType"
                        size="small"

                        placeholder="请选择证件类型"
                      >
                        <el-option  v-for="(item,index) in licenseTypeList"  :label="item.val" :value="item.key" :key="index">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="证件号码：" prop="licenceNum">

                      <el-input  v-model="repForm.licenceNum"
                                 size="small"  placeholder="请输入证件号码"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
               <!--  <el-row>
                  <el-col :span="10">
                    <el-form-item  >
                      <span slot="label">
                         <span style="color:#F56C6C">*</span>
                            证件照片：
                        </span>
                        <a href="static/pic2.png" target="_blank" 
                          style="display:inline-block;position:relative;height:100px;">
                            <span class="el-icon-close" 
                                  style="position:absolute;right:5px;top:5px;color:#ff0000; " 
                                  @click.prevent="removeFile(4)"></span>
                            <img src="static/pic2.png"  width="100"  height="100" />
                       </a>
                      <div>
                        <el-upload
                          class="avatar-uploader f-left"
                          :multiple="false"
                          :action="global.baseUrl+global.commonFileUploadUrl"
                          :http-request="uploadFile"
                          :data="{id:4}"
                          accept=".png,.gif,.jpg,.pgeg"
                          :limit="1"
                          :show-file-list="false">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row> -->
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="签发机关：" prop="publishOrgan">

                      <el-input  size="small"
                                 v-model="repForm.publishOrgan"
                                 placeholder="请输入签发机关"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="有效期：" prop="effectiveDate">

                      <el-date-picker
                        size="small"

                        format="yyyy-MM-dd"
                        value-format  ="yyyy-MM-dd"
                        v-model="repForm.effectiveDate"

                        placeholder="选择时间"
                        type="date"
                        style="width: 100%;"
                      ></el-date-picker>

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="姓名：" prop="name">

                      <el-input  size="small"
                                 v-model="repForm.name"
                                 placeholder="请输入姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="性别：" prop="sex">

                      <el-select


                        v-model="repForm.sex"
                        size="small"
                        placeholder="请选择性别">
                        <el-option :label="item.val" :value="item.key" :key="index" v-for="(item,index) in  genderData"></el-option>

                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="籍贯：" prop="nativePlaice">

                      <el-input  size="small" v-model="repForm.nativePlaice"  placeholder="请输入籍贯"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="出生年月：" prop="birth">

                      <el-date-picker
                        size="small"

                        format="yyyy-MM-dd"
                        value-format  ="yyyy-MM-dd"
                        v-model="repForm.birth"

                        placeholder="选择时间"
                        type="date"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="民族：" prop="nation">

                      <el-input   size="small"
                                  v-model="repForm.nation"
                                  placeholder="请输入民族"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="最高学历："  prop="highestEducation">

                      <el-select

                        v-model="repForm.highestEducation"

                        size="small"
                        placeholder="请选择最高学历"
                      >
                        <el-option :label="item.val" :value="item.key" :key="item.key" v-for="item in  educationTypeList"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="政治面貌："  prop="politicalAffiliation">

                      <el-input  size="small"
                                 v-model="repForm.politicalAffiliation"
                                 placeholder="请输入政治面貌"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="职务：" prop="duty">

                      <el-input  size="small"
                                 v-model="repForm.duty"
                                 placeholder="请输入职务"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="办公电话：" prop="officeNum">

                      <el-input  size="small"
                                 v-model="repForm.officeNum"
                                 placeholder="请输入办公电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="传真：" prop="fax">

                      <el-input  size="small"
                                 v-model="repForm.fax"
                                 placeholder="请输入传真"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="本人电话：" prop="selfPhone">

                      <el-input   size="small"
                                  v-model="repForm.selfPhone"
                                  placeholder="请输入本人电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="邮箱：" prop="mail">

                      <el-input  size="small"
                                 v-model="repForm.mail"
                                 placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="通讯地址：" prop="contactAddress">

                      <el-input  size="small"
                                 v-model="repForm.contactAddress"
                                 placeholder="请输入通讯地址"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="微信号：" prop="weiChat">

                      <el-input   size="small"
                                  placeholder="请输入微信号" v-model="repForm.weiChat"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="代表履历：">

                      <el-input
                        size="small"

                        v-model="repForm.personalDetails"

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
        <div class="formBox" id="other">
              <div :class="{shareholderMask:shareholderMask }">
                  <div class="mask"></div>
                  <div class="title">

                    <span class="text" name="other">股东与高管</span>
                    <el-button size="small"  type="primary"
                               @click="shareholderSave" style="float:right;">保存</el-button>
                  </div>

                  <div class="formMain " >
                    <div class="tableBox" >
                     
                      <table class="myTable m-t-20">
                        <thead>
                        <tr>
                          <th> <span style="color:#F56C6C">*</span>股东名称</th>
                          <th> <span style="color:#F56C6C">*</span>持股比例(%)</th>
                          <th> <span style="color:#F56C6C">*</span>认缴出资比例(%)</th>
                          <th> <span style="color:#F56C6C">*</span>股东类型</th>
                          <th width="160">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,ind) in editShareTable" :key="ind">
                          <td>
                            <ElInput  size="small" v-model="item.shareholderName"></ElInput>
                          </td>
                          <td>
                            <ElInput  size="small" v-model="item.shareholdingRatio"
                                      @keyup.native="limitTwo(item,'shareholdingRatio')"></ElInput>
                          </td>
                          <td>
                            <ElInput  size="small" v-model="item.chuziRatio"
                                      @keyup.native="limitTwo(item,'chuziRatio')"></ElInput>
                          </td>
                          <td>
                            <el-select size="small" v-model="item.shareholderType"
                                       @change="shareholderChange(item.shareholderType,item)">
                              <el-option v-for="item in shareholderList"
                                         :value="item.value"
                                         :label="item.label"
                                         :key="item.value"></el-option>
                            </el-select>

                          </td>
                          <td>
                            <a class="text" @click="deleteItem(ind,2,item)">删除</a>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <div class="addItem">
                        <el-button icon="el-icon-plus" size="small" @click="addTableItem(2);">新增</el-button>
                      </div>
                    </div>
                  </div>
              </div>
              <div  :class="{seniorMask:seniorMask }">
                   <div class="mask"></div>
                   <div style="height: 25px;">
                      <el-button size="small"  type="primary"

                                 @click="seniorExecutiveSave" style="float:right;">保存</el-button>
                    </div>
                     <div class="formMain " >
                          <div class="tableBox">


                            <table class="myTable m-t-20" style="min-width:100%;overflow:auto;table-layout:fixed">
                              <thead>
                              <tr>
                                <th ><span style="color:#F56C6C">*</span>高管姓名</th>
                                <th ><span style="color:#F56C6C">*</span>性别</th>
                                <th   ><span style="color:#F56C6C">*</span>职务</th>
                                <th  ><span style="color:#F56C6C">*</span>民族</th>
                                <th ><span style="color:#F56C6C">*</span>出生年月</th>
                                <th ><span style="color:#F56C6C">*</span>最高学历</th>
                                <th><span style="color:#F56C6C">*</span>任职时间</th>
                                <th ><span style="color:#F56C6C">*</span>分管部门</th>
                                <th ><span style="color:#F56C6C">*</span>办公电话</th>
                                <th ><span style="color:#F56C6C">*</span>邮箱</th>
                                <th>操作</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="(item,ind) in editSeniorTable" :key="ind">
                                <td  >
                                  <ElInput  size="small" style="min-width:100px" v-model="item.seniorName"></ElInput>
                                </td>
                                <td  >
                                  <el-select  size="small" style="min-width:100px" v-model="item.sex">
                                    <el-option :label="item.val" :value="item.key" :key="index" v-for="(item,index) in  genderData"></el-option>
                                  </el-select>

                                </td>
                                <td  >
                                  <ElInput  size="small" style="min-width:80px" v-model="item.duties"></ElInput>
                                </td>
                                <td  >
                                  <ElInput  size="small"  style="min-width:60px" v-model="item.nation"></ElInput>
                                </td>
                                <td>
                                  <el-date-picker
                                    v-model="item.birth"
                                    type="date"
                                    size="small"
                                    format="yyyy-MM-dd"
                                    value-format  ="yyyy-MM-dd"
                                    placeholder="选择日期">
                                  </el-date-picker>

                                </td>
                                <td>
                                  <el-select style="min-width:80px" size="small" v-model="item.highestEducation">
                                    <el-option :label="item.val" :value="item.key" :key="item.key" v-for="(item,index) in  educationTypeList"></el-option>
                                  </el-select>
                                 </td>
                   
                                <td>
                                  <el-date-picker
                                    v-model="item.appointTime"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format  ="yyyy-MM-dd"
                                    size="small"
                                    placeholder="选择日期">
                                  </el-date-picker>

                                </td>
                                <td>
                                  <ElInput  size="small" style="min-width:100px"  v-model="item.departInCharge"></ElInput>
                                </td>
                                <td>
                                  <ElInput  size="small" style="min-width:160px" v-model="item.officerPhone"></ElInput>
                                </td>
                                <td>
                                  <ElInput  size="small" style="min-width:100px" v-model="item.mail"></ElInput>
                                </td>
                                <td>
                                  <a class="text" @click="deleteItem(ind,3,item)">删除</a>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                            <div class="addItem">
                              <el-button icon="el-icon-plus" size="small" @click="addTableItem(3);">新增</el-button>
                            </div>
                          </div>
                      </div>    

              </div>  
        </div>
        <div class="formBox" id="msgInfo" :class="{businessMask:businessMask}">
            <div class="mask"></div>
            <div class="title">
              <span class="text" name="msgInfo">业务信息</span>
              <el-button size="small"  type="primary"

                         @click="busSave" style="float:right;">保存</el-button>
            </div>
            <div class="formMain">

              <div class="tableBox "   >
                <div class="msg fs12 c999 m-t-20">根据所属的机构类型， 将对应不同的业务信息需要补充填写</div>
                <table class="myTable m-t-20"  v-if="busType==1 || busType==2 || busType==3 ">
                  <thead>
                  <tr>
                    <th><span style="color:#F56C6C;"> * </span>资管部门名称</th>
                    <th><span style="color:#F56C6C;"> * </span>人员数量</th>
                    <th><span style="color:#F56C6C;"> * </span>部门负责人</th>
                    <th><span style="color:#F56C6C;"> * </span>办公电话</th>
                    <th><span style="color:#F56C6C;"> * </span>手机</th>
                    <th><span style="color:#F56C6C;"> * </span>邮箱</th>
                    <th width="160">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item,ind) in editBusTable" :key="ind">
                    <td>
                      <ElInput v-model="item.departmentName" size="small"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.personNum" size="small"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.departHeader" size="small"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.officePhone" size="small"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.mobilePhone" size="small"></ElInput>
                    </td>
                    <td>
                      <ElInput v-model="item.email" size="small"></ElInput>
                    </td>
                    <td>
                      <a class="text" @click="deleteItem(ind,4,item)">删除</a>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <div class="addItem"  v-if="busType==1 || busType==2 || busType==3 ">
                  <el-button icon="el-icon-plus" size="small" @click="addTableItem(4);">新增</el-button>
                </div>
              </div>
              <div class="formBox"  >
                <div class="title" style="margin-bottom:10px;" v-show="qualificationTypeIds.length > 0 && busType==1">
                  <span class="text">资格信息</span>

                </div>
                <div class="formMain">
                  <el-form :model="ruleForm" ref="ruleForm" label-width="140px"  label-position="top">
                    <el-row class="m-t-20" v-show="qualificationTypeIds.length > 0 && busType==1">
                      <el-col :span="24">
                        <el-form-item label="具备投资能力：">
                          <el-checkbox-group v-model="qualityList">
                            <el-checkbox
                              v-for="item in qualificationTypeIds"
                              :label="item.key"
                              :key="item.key"

                            >{{item.val}}</el-checkbox>
                          </el-checkbox-group>

                        </el-form-item>
                      </el-col>
                    </el-row>

                    <!-- 1 -->
                  <div class="formBox" id="msgInfo">
                    <div class="title">
                      <span class="text">规模信息</span>
                       
                    </div>
                   </div>
                    <el-row v-if="busType==1">
                      <el-col :span="10">
                        <el-form-item label="上年度末受托管理保险资金（亿元）：" label-width="265px">

                          <el-input v-model="sizeInformationForm.yearInsureFund" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="上年度末受托管理非保险资金（亿元）：" label-width="265px">

                          <el-input v-model="sizeInformationForm.yearInsureFundNot" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="busType==1">
                      <el-col :span="10">
                        <el-form-item label="上年度末受托管理规模总计（亿元）：" label-width="265px">

                          <el-input v-model="sizeInformationForm.yearTotalFund" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="上年度末委托投资规模（亿元）：" label-width="265px">

                          <el-input v-model="sizeInformationForm.yearInvestment" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 2 -->
                    <el-row v-if="busType==2">
                      <el-col :span="10">
                        <el-form-item label="上年度末总资产规模（亿元）：">

                          <el-input v-model="sizeInformationForm.yearTotalAssets" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="上年度末管理资产规模（亿元）：">

                          <el-input v-model="sizeInformationForm.yearManagerAssets" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="busType==2">
                      <el-col :span="10">
                        <el-form-item label="上年度末管理保险资金规模（亿元）：">

                          <el-input v-model="sizeInformationForm.yearInsureFund" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="上年度末委托投资规模（亿元）：">

                          <el-input v-model="sizeInformationForm.yearInvestFund" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 3 -->
                    <el-row v-if="busType==3">
                      <el-col :span="10">
                        <el-form-item label="上年度末总资产规模（亿元）：">

                          <el-input v-model="sizeInformationForm.yearTotalAssets" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="上年度末委托投资规模（亿元）：">

                          <el-input  v-model="sizeInformationForm.yearEntrustedInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 4 -->
                    <el-row v-if="busType==4">
                      <el-col :span="10">
                        <el-form-item label="上年度总资产规模（亿元）：">

                          <el-input v-model="sizeInformationForm.yearTotalAssets" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="是否开展保险资金托管业务：">
                          <el-select v-model="sizeInformationForm.flagTrusteeship" size="small">
                            <el-option :value="1" label="是"></el-option>
                            <el-option :value="2" label="否"></el-option>
                          </el-select>

                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="busType==4">
                      <el-col :span="10">
                        <el-form-item label="上年度末托管保险资金规模(亿元)：">

                          <el-input  v-model="sizeInformationForm.yearInsureFund" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="外部信用评级等级：">

                          <el-input v-model="sizeInformationForm.externalCreditRating"  placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 5 -->
                    <el-row v-if="busType==5">
                      <el-col :span="10">
                        <el-form-item label="是否在保监会完成受托管理保险资金备案：">
                          <el-select v-model="sizeInformationForm.flagCompleteFiling" size="small">
                            <el-option :value="1" label="是"></el-option>
                            <el-option :value="2" label="否"></el-option>
                          </el-select>

                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="上年度末总资产管理规模（亿元）：">

                          <el-input v-model="sizeInformationForm.yearTotalInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="busType==5">
                      <el-col :span="10">
                        <el-form-item label="上年度末公募基金规模（亿元）：">

                          <el-input v-model="sizeInformationForm.publicOfferFund" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="上年度末受托管理保险资金规模(亿元)：">

                          <el-input v-model="sizeInformationForm.yearInsureFund" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 6 -->
                    <el-row v-if="busType==6">
                      <el-col :span="10">
                        <el-form-item label="是否在保监会完成受托管理保险资金备案：">
                          <el-select v-model="sizeInformationForm.flagCompleteFiling" size="small">
                            <el-option :value="1" label="是"></el-option>
                            <el-option :value="2" label="否"></el-option>
                          </el-select>

                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="上年度末资管业务总资产管理规模（亿元）：">

                          <el-input  v-model="sizeInformationForm.yearTotalInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="busType==6">
                      <el-col :span="10">
                        <el-form-item label="上年度末受托管理保险资金规模(亿元)：">

                          <el-input v-model="sizeInformationForm.yearInsureInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 7 -->
                    <el-row v-if="busType==7">
                      <el-col :span="10">
                        <el-form-item label="上年度总资产规模（亿元）：">

                          <el-input v-model="sizeInformationForm.yearTotalInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="是否保险资金存款行：">
                          <el-select v-model="sizeInformationForm.flagInsureFundToBank" size="small">
                            <el-option :value="1" label="是"></el-option>
                            <el-option :value="2" label="否"></el-option>
                          </el-select>

                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="busType==7">
                      <el-col :span="10">
                        <el-form-item label="保险资金存款规模（亿元）：">

                          <el-input v-model="sizeInformationForm.insureInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 8 -->
                    <el-row v-if="busType==8">
                      <el-col :span="10">
                        <el-form-item label="上年度末总资产管理规模（亿元）：">

                          <el-input v-model="sizeInformationForm.yearTotalInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="上年度末公募基金规模（亿元）：">

                          <el-input v-model="sizeInformationForm.publicRaiseFund" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 9 -->
                    <el-row v-if="busType==9">
                      <el-col :span="10">
                        <el-form-item label="上年度末资管业务总资产管理规模（亿元）：">

                          <el-input v-model="sizeInformationForm.yearTotalManagerInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 10 -->
                    <el-row v-if="busType==10">
                      <el-col :span="10">
                        <el-form-item label="总管理规模（亿元）：">

                          <el-input  v-model="sizeInformationForm.totalManagerInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="管理保险资金规模（亿元）:">
                          <el-input v-model="sizeInformationForm.insureInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="busType==10">
                      <el-col :span="10">
                        <el-form-item label="在管基金数量（只）：">

                          <el-input  v-model="sizeInformationForm.managerNum" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="涉及保险资金基金数量（只）：">

                          <el-input v-model="sizeInformationForm.insureNum" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="busType==10">
                      <el-col :span="10">
                        <el-form-item label="员工人数（人）：">

                          <el-input  v-model="sizeInformationForm.empNum" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 11 -->
                    <el-row v-if="busType==11">
                      <el-col :span="10">
                        <el-form-item label="上年度末总资产规模（亿元）：">

                          <el-input  v-model="sizeInformationForm.yearTotalInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="busType==11">
                      <el-col :span="10">
                        <el-form-item label="上年度末集合信托存续规模（亿元）：">

                          <el-input  v-model="sizeInformationForm.yearTrustInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="保险资金投资规模总计（亿元）：">

                          <el-input  v-model="sizeInformationForm.insureInvest" placeholder="请输入"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 12-->
                    <el-row v-if="busType==12">
                      <el-col :span="24">
                        <el-form-item label=" " style="width:100%;">

                          <el-input
                            style="width:100%"
                            type="textarea"
                            placeholder="请输入请简述机构业务情况、与险资合作情况等"
                            v-model="sizeInformationForm.info" rows="5">

                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="busType && busType!=12">
                      <el-col :span="12">
                        <el-form-item label="备注：" >

                          <el-input
                            v-model="sizeInformationForm.remark"
                            type="textarea"
                            style="width:100%;"
                            placeholder="请输入备注"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </div>


            </div>
          
        </div>
      </div>
    </div>
    <div class="footBtn text_right membership-recognition-application">
      <el-button type @click="saveAllInterFace">提交</el-button>
      <!-- <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button> -->
    </div>
  </div>
</template>
<script>
  import global from '@/utils/global'
  import { mapState } from "vuex";
  import {apiSelect,companyTypeList,educationType,genderList,getListed,shareholderType,workFlowStatus} from "../../utils/common";
  import { apiBasicMember, apiDic,saveCompanyBasicInfoCommon ,successMES,warnMES} from "../../utils/commonApi";
  import { format } from "../../utils/datetime";
  import { memberUploadFile,memberDownloadTemplate,blobDownloadFile } from "./../../http/moudules/common"
  import  {linkManAddCommon,saveMemberRepresentativeCommon,saveShareholderCommon,saveSeniorExecutiveCommon,saveBusCommon,setDefaultLinkManCommon,getLinkManListCommon,linkmanDeleteCommon,getShareholderCommon,delShareholderCommon,getSeniorExecutiveListCommon,delSeniorExecutiveListCommon,loadBusinessInformationCommon,getCompanyInfoCommon,getRepCommon,getBusListCommon,loadLicenceTypeCommon ,serviceType,saveBus_2_Common,saveBus_3_Common,saveBus_4_Common,saveBus_5_Common,saveBus_6_Common,saveBus_7_Common,saveBus_8_Common,saveBus_9_Common,saveBus_10_Common,saveBus_11_Common,saveBus_12_Common,memberApprovalSaveAll,workflowAPI,queryMembership} from "./../../http/moudules/member"
  export default {
    props: {},
    data() {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      let validateEmail=(rule, value, callback)=>{
        if(value && !reg.test(value)){
          callback(new Error('邮箱格式不正确'))
        }else{
          callback();
        }
      }
      let validatmail=(rule, value, callback)=>{
        if(!value){
          callback(new Error('请输入邮箱'))
        }else  if(!reg.test(value)){
          callback(new Error('邮箱格式不正确'))
        }else {
          callback();
        }
      }
      return {
        licenseTypeList:[],
        listedData:[],
        shareholderTypeList:[],
        sizeInformationForm:{
          yearInsureFundNot:'',
          yearInsureFund:"",
          yearTotalFund:"",
          yearInvestment:"",
          scaleRemark:"",
          qualiRemark:"",
          id:""
        },
        genderData:[],
        companyTypeData:[],
        linkmanRules:['contactName','duty','officePhoneNum','mobileNum', 'mailAddress'],
        shareholdersRules:['shareholderName','shareholdingRatio','chuziRatio','shareholderType' ],
        seniorExecutiveRules:['seniorName','sex','duties','nation','birth','highestEducation','appointTime',
          'departInCharge','officerPhone','mail'],
        busTableRules:[ 'fordepartmentName',"personNum","departHeader", "officePhone",  "mobilePhone", "email"],
        leftMenu: [
          { name: "入会申请书", active: true, id: "#applyBook" },
          { name: "公司基本信息", active: false, id: "#baseInfo" },
          { name: "联系人信息", active: false, id: "#userInfo" },
          { name: "会员代表", active: false, id: "#vipUser" },
          { name: "股东与高管", active: false, id: "#other" },
          { name: "业务信息", active: false, id: "#msgInfo" },

        ],
        shareholderList:[
          {value:1,label:'自然人股东'},
          {value:2,label:'法人股东'},
          {value:3,label:'国家股东'},
          {value:4,label:'国有法人股东'},

        ],
        ruleFormRules:{
          licenseType:[{ required: true, message: '请选择证件类型', trigger: 'blur' }],
          licenceNum:[{ required: true, message: '请填写证件号码', trigger: 'blur' }],
          publishOrgan:[{ required: true, message: '请填写签发机关', trigger: 'blur' }],
          effectiveDate:[{ required: true, message: '请选择有效期', trigger: 'blur' }],
          name:[{ required: true, message: '请填写姓名', trigger: 'blur' }],
          sex:[{ required: true, message: '请选择性别', trigger: 'blur' }],
          nativePlaice:[{ required: true, message: '请输入籍贯', trigger: 'blur' }],
          birth:[{ required: true, message: '请选择出生年月', trigger: 'blur' }],
          nation:[{ required: true, message: '请输入民族', trigger: 'blur' }],
          highestEducation:[{ required: true, message: '请选择最高学历', trigger: 'blur' }],
          politicalAffiliation:[{ required: true, message: '请输入政治面貌', trigger: 'blur' }],
          duty:[{ required: true, message: '请输入职务', trigger: 'blur' }],
          officeNum:[{ required: true, message: '请输入办公电话', trigger: 'blur' }],
          fax:[{ required: true, message: '请输入传真', trigger: 'blur' }],
          selfPhone:[{ required: true, message: '请输入本人电话', trigger: 'blur' }],
          mail:[{ required: true, trigger: 'blur' , validator: validatmail,}],
          contactAddress:[{ required: true, message: '请输入通讯地址', trigger: 'blur' }],
          weiChat:[{ required: true, message: '请输入微信号', trigger: 'blur' }],
        },
        companyFormRules:{

          institutionType: [{ required: true, message: '请选择机构类型', trigger: 'blur' }],
          flagHaveCredit: [{ required: true, message: '请选择是否有社会统一信用代码', trigger: 'blur' }],
          creditId: [{ required: true, message: '请填写统一社会信用代码', trigger: 'blur' }],
          companyName: [{ required: true, message: '请填写名称', trigger: 'blur' }],
          workAddress: [{ required: true, message: '请填写办公地址', trigger: 'blur' }],
          companyType:[{ required: true, message: '请填选择公司类型', trigger: 'blur' }],
          dateBuild:[{ required: true, message: '请填选择成立日期', trigger: 'blur' }],
          flagListed:[{ required: true, message: '请填选择是否上市', trigger: 'blur' }],
          registeredAddress:[{ required: true, message: '请填写注册地址', trigger: 'blur' }],
          legalRepresentative:[{ required: true, message: '请填写法人代表', trigger: 'blur' }],
          registeredCapital:[{ required: true, message: '请填注册资本', trigger: 'blur' }],
          companyNameEng:[{ required: true, message: '请填写公司英文名字', trigger: 'blur' }],
          workAddress:[{ required: true, message: '请填写办公地址', trigger: 'blur' }],
          companyWeb:[{ required: true, message: '请填写公司网址', trigger: 'blur' }],
        },
        imageUrl: "",
        urlFront:'service',
        memberForm: {},
        storeMemberForm:{},
        companyForm: {
          "businessScale": "",
          "companyName": "",
          "companyNameEng": "",
          "companyType": "",
          "companyWeb": "",
          "creditId": "",
          "dateBuild": "",
          "dateJoin": "",
          "effectiveDateEnd": "",
          "effectiveDateStart": "",
          "flagHaveCredit": "",
          "flagListed": "",
          "id": "",
          "institutionType": "",
          "legalRepresentative": "",
          "licencePath": "",
          "listAddress": "",
          "memberType": "",
          "netAssets": "",
          "registeredAddress": "",
          "registeredCapital": "",
          "totalAssets": "",
          "workAddress": ""
        },
        storeCompanyForm:{},
        contactTable: [],
        storeContactTable:[],
        editContactTable:[],
        repForm: {
          "birth": null,
          "contactAddress": "",
          "dateEffective": "",
          "duty": "",
          "fax": "",
          "highestEducation": "",
          "licenceNum": "",
          "licenseType": "",
          "mail": "",
          "name": "",
          "nation": "",
          "nativePlaice": "",
          "officeNum": "",
          "personalDetails": "",
          "politicalAffiliation": "",
          "publishOrgan": "",
          "selfPhone": "",
          "sex": "",
          "weiChat": ""
        },
        shareTable: [],
        storeShareTable:[],
        editShareTable:[],
        seniorTable: [],
        storeSeniorTable:[],
        editSeniorTable:[],
        busTable: [],
        storeBusTable:[],
        editBusTable:[],
        qualityList: [],
        quality: [],
        busType: 0,
        sizeInformationForm: {},
        storesizeInformationForm:{},
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
        busTypeFields:{
            1:'businessOneDto',
            2:'businessTwoDto',
            3:'businessThreeDto',
            4:'businessFourDto',
            5:'businessFiveDto',
            6:'businessSixDto',
            7:'businessSevenDto',
            8:'businessEightDto',
            9:'businessNineDto',
            10:'businessTenDto',
            11:'businessElevenDto',
            12:'businessTwelveDto',   
        },
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
        imgPathBusinessList:[],
        scrollTop: 25,
        workFlowDict:[],
        // companyId:67,
        orgList:[],
        qualificationTypeIds:[],
        educationTypeList:[],
        businessMask:false,
        shareholderMask:false,
        companyMask:false,
        linkManMask:false,
        seniorMask:false,
        memberMask:false,
        workflowObj:{
           1:'linkManMask',
           3:'companyMask',
           5:'shareholderMask',
           7:'seniorMask',
           10:'memberMask',
           15:'businessMask',
        },
        applyBookUrl:"",
        applyBookName:""
      };
    },
    // computed: {
    //   ...mapState({
    //     msgMask: state => state.dialog.msgMask,
    //     memberMask: state => state.dialog.memberMask,

    //   }),

    // },

    created() {
      this.getWorkFlowStatus()
      workFlowStatus(this.workFlowDict)
      /**
       * 展示会员信息
       */
      this.loadMembership();
      this.initBasicInfo();
    },
    mounted() {
      const scrollBox = document.getElementById("iframeContainer");
      this.$store.state.app.hasFoot = true;
      scrollBox.addEventListener("scroll", this.handleScroll, true);
      this.scrollDocument();
    },
    methods: {
        loadMembership(){
            queryMembership({}).then(rep=>{
              if(rep && rep.code=='200'){
                this.applyBookUrl=rep.data.fullPath
                this.applyBookName=rep.data.name
              }
            })
        },
        getWorkFlowStatus(){
           workflowAPI({}).then(rep=>{
              if(rep && rep.code=="200" && rep.data){
                 let arr=rep.data.map(item=>{
                      return item.toString()
                     })
                 
                  for(let key in this.workflowObj){
                     if(arr.indexOf('9') > -1){
                        this[this.workflowObj[key]]=true;
                     }
                     if(arr.indexOf(key) > -1 && arr.indexOf('9')==-1){
                          this[this.workflowObj[key]]=true;
                     }
                  }
               }
          })
        },
        downloadTemplate(){
            memberDownloadTemplate('/common/file/templet/rhsqs',{type:'download'}).then(rep=>{
               blobDownloadFile(rep)
            })
        },
        uploadFile(obj){
        
        if( Math.floor( obj.file.size/(1024*1024) ) > 10 ){
            warnMES('最多上传10M')
            return
        }
        let formData = new FormData();
        formData.append('file',obj.file);
        let url="",method="";
        if(obj.data.id==1){
            url="/api/member/company/file/rhsqh_upload";
            method="post"
        }
        memberUploadFile(formData,url,method).then((res=>{
             if(res && res.code=='200' && res.data){
                  successMES('上传成功');
                 if(obj.data.id==1){
                    // this.applyBookUrl=res.data.fullPath
                    // this.applyBookName=obj.file.name
                    this.loadMembership();
                 }else if(obj.data.id==2){
                   this.companyForm.imgPathLicence=res.data.fullPath
                 }else if(obj.data.id==3){
                   this.imgPathBusinessList.push(res.data.fullPath);
                 }else if(obj.data.id==4){

                 }
                  // this.filePath=res.data
             }
        })).catch(error=>{
           
        })
      },
      removeFile(type,index){
         if(type==1){
            this.applyBookUrl='';
            this.applyBookName='';
            this.$refs.uploadApplication.clearFiles()
         }else if(type==2){
             this.$refs.uploadImgPathLicence.clearFiles()
             this.companyForm.imgPathLicence='';
         }else if(type==3){
            this.companyForm.imgPathBusinessList.splice(index,1)
            this.imgPathBusinessList.splice(index,1)
         }else if(type==4){

         }
      },
      saveAllInterFace(){
         let self=this;
         if(!this.applyBookUrl){
             warnMES('请上传入会申请书');
             return
         }
        let validateRules=  new Promise((resolve, reject) => {
                if(this.companyMask){
                    resolve(true)
                }
                this.$refs["companyForm"].validate((valid) => {
                   if(valid){
                       resolve(true)
                   }else{
                       warnMES('公司基本信息有必填信息未填写')
                       reject()
                   }
                })
          })
        validateRules.then(preflag=>{
          if(this.linkManMask){
             return true
          }
          if(preflag){
                   if(this.editContactTable.length <2 ){
                      warnMES('至少2个联系人');
                      return false;
                    }
                    let flag=false;
                    let keyFiled="";
                    let index=-1;
                    let emailValid = false;
                    let phoneValid = false;
                    let mobilePhoneValid = false;
                    let reg = /^\d+$/;
                    let reg1 = /^1[3|4|5|7|8][0-9]\d{8}$/;
                    let reg2 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                    this.editContactTable.forEach((item,ind)=>{
                      if(flag){
                        return ;
                      }
                      for(let key in item){
                        if( this.linkmanRules.indexOf(key) > -1 ){
                          if(!item[key]){
                            keyFiled=key;
                            flag=true;
                            index=ind;
                            break;
                          } else if (key === "officePhoneNum") {
                            if (!reg.test(item[key])) {
                              index = ind;
                              phoneValid = true;
                              flag = true;
                              break;
                            }
                          } else if (key === "mobileNum") {
                            if (!reg1.test(item[key])) {
                              index = ind;
                              mobilePhoneValid = true;
                              flag = true;
                              break;
                            }
                          } else if (key === "mailAddress") {
                            if (!reg2.test(item[key])) {
                              index = ind;
                              emailValid = true;
                              flag = true;
                              break;
                            }
                          }
                        }
                      }

                    })
                    if (emailValid) {
                      warnMES("联系人信息第" + (index + 1) + "行--邮箱格式不正确");
                      // this.$store.commit("closeEdit",false);
                      return false;
                    }
                    if (phoneValid) {
                      warnMES("联系人信息第" + (index + 1) + "行--办公电话不正确");
                      // this.$store.commit("closeEdit",false);
                      return false;
                    }
                    if (mobilePhoneValid) {
                      warnMES("联系人信息第" + (index + 1) + "行--手机号不正确");
                      // this.$store.commit("closeEdit",false);
                      return false;
                    }
                    if (flag) {
                      let filed = "";
                      switch (keyFiled) {
                        case  'contactName' :
                          filed = "联系人姓名";
                          break;
                        case 'duty' :
                          filed = "职务";
                          break;
                        case  'officePhoneNum':
                          filed = "办公电话";
                          break;
                        case 'mobileNum':
                          filed = "手机";
                          break;
                        case 'mailAddress':
                          filed = "邮箱";
                          break;
                        default :
                          filed = "";
                          break;
                      }

                      warnMES("联系人信息第" +(index+1)+"行--"+filed+'--必填');

                      return false;
                    }
                        return true
                }else{
                  return false
                }
        }).then(preflag=>{
           if(this.memberMask){
             return true
           }
           if(preflag){
                let validateFlag=false;
                this.$refs["repForm"].validate((valid) => {
                   if(valid){
                       validateFlag= true
                   }else{
                       warnMES('会员代表必填信息未填写')
                       validateFlag=false
                   }
                })
                return  validateFlag;
           }else{
             return false;
           }
        }).then(preflag=>{
             if(this.shareholderMask){
                return true
             }

            if(preflag){
              let flag=false;
              let keyFiled="";
              let index=-1;
              if(this.editShareTable.length < 1){
                 warnMES('请至少填写一位股东');
                 return false
              }
              this.editShareTable.forEach((item,ind)=>{
                  if(flag){
                     return;
                  }
                  for(let key in item){
                     if( this.shareholdersRules.indexOf(key) > -1 ){
                        if(!item[key]){
                          keyFiled=key;
                          flag=true;
                          index=ind;
                          break;
                        }
                     }
                  }
                 
              })
              if(flag){
                let filed="";
                 switch(keyFiled){
                     case  'shareholderName' : filed="股东名称";break;
                     case 'shareholdingRatio' : filed="持股比例(%)";break;
                     case  'chuziRatio': filed="认缴出资比例(%)";break;
                     case 'shareholderType': filed="股东类型";break;
                     default : filed="";break;
                 }
                 
                 warnMES("股东第" +(index+1)+"行--"+filed+'--必填');
                 // this.$store.commit("closeEdit",false);
                 return false;
              }
              return true
            }else{
               return false
            }
        }).then(preflag=>{
           if(this.seniorMask){
               return true
             }
           if(preflag){
                  if(this.editShareTable.length < 1){
                     warnMES('请至少填写一位高管');
                     return false
                 }
                let flag=false;
                let keyFiled="";
                let index=-1;
                let emailValid=false;
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                this.editSeniorTable.forEach((item,ind)=>{
                      if(flag){
                         return;
                      }
                      for(let key in item){
                         if( this.seniorExecutiveRules.indexOf(key) > -1 ){
                            if(!item[key]){
                                keyFiled=key;
                                flag=true;
                                index=ind;
                                break;
                            }else if(key=="mail"){
                                if(!reg.test(item[key])){
                                     index=ind;
                                     emailValid=true;
                                     flag=true;
                                     break;
                                }
                            }

                         }
                      }
                     
                })
                 if(emailValid){
                    warnMES("第" +(index+1)+"行--邮箱格式不正确");
                    // this.$store.commit("closeEdit",false);
                    return false;
                 }
                 if(flag){
                   let filed="";
                   switch(keyFiled){
                       case  'seniorName' : filed="高管姓名";break;
                       case 'duties' : filed="职务";break;
                       case 'sex' : filed="性别";break;
                       case  'nation': filed="名族";break;
                       case 'birth': filed="出生年月";break;
                       case  'highestEducation' : filed="最高学历";break;
                       case 'appointTime' : filed="任职时间";break;
                       case  'departInCharge': filed="分管部门";break;
                       case 'officerPhone': filed="办公电话";break;
                       case 'mail': filed="邮箱";break;
                       default : filed="";break;
                       
                   }
                   warnMES("高管第" +(index+1)+"行--"+filed+'--必填');
                   // this.$store.commit("closeEdit",false);
                   return false;
                 }

                 return true 
           }else{
                return false
           }
        }).then(preflag=>{
            if(this.businessMask){

               return true
             }
            if(preflag){
                if(this.busType==1 || this.busType==2  || this.busType==3){
                    let keyFiled="";
                    let index=-1;
                    let emailValid=false;
                    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                    this.editBusTable.forEach((item,ind)=>{
                      if(emailValid){
                        return;
                      }
                      for(let key in item){
                        if(item[key] && key=="email"){
                          if(!reg.test(item[key])){
                            index=ind;
                            emailValid=true;
                            break;
                          }
                        }
                      }

                    })
                    if(emailValid){
                      warnMES("第" +(index+1)+"行--邮箱格式不正确");
                      // this.$store.commit("closeEdit",false);
                      return false;
                    }
                  }

                  if(this.qualityList.length==0 && this.qualificationTypeIds.length > 0 && this.busType==1){
                    warnMES("资格信息必填");
                    return false
                  }
        
                  return true
            }else{
               return false
            }
        }).then(preflag=>{

            if(preflag){
                let params={}
                this.repForm.dateEffective=this.repForm.effectiveDate
                params[this.busTypeFields[this.busType]]=this.sizeInformationForm  
                params[this.busTypeFields[this.busType]]['departmentInfoList']=[...this.editBusTable]
                params[this.busTypeFields[this.busType]]['qualificationTypeIds']=[...this.qualityList]
               
                if(this.busType==2 || this.busType==3 ){
                      delete  params[this.busTypeFields[this.busType]].qualificationTypeIds
                }else if(this.busType!=1) {
                      delete  params[this.busTypeFields[this.busType]].qualificationTypeIds
                      delete  params[this.busTypeFields[this.busType]].departmentInfoList
                }
             
              params.companyInfoDto=this.companyForm
              params.contactDtoList=this.editContactTable
              params.memberRepDto=this.repForm
              params.seniorDtoList=this.editSeniorTable
              params.shareHolderDtoList=this.editShareTable

              memberApprovalSaveAll(params).then(rep=>{
                  if(rep && rep.code=='200'){
                      successMES('保存成功');
                      this.$router.push({path:"/"})
                  }
              })
            }
        }).catch(error=>{

           console.log(error);
        })
      },
      initBasicInfo(){
        apiDic("qualityType", {}).then(resolve => {
          this.quality = resolve;
        });
        educationType(this.educationTypeList)
        companyTypeList(this.companyTypeData)//公司类型
        apiSelect({ type: 1 }, this.orgList); //机构类型
        genderList(this.genderData)//性别
        getListed(this.listedData)//是否上市
        shareholderType(this.shareholderTypeList)//股东类型
        this.quertLinkManList();
        this.queryShareholder();
        this.querySeniorExecutiveList();
        this.getBusinessInformation();
        getCompanyInfoCommon().then(rep=>{
          if(rep && rep.code=="200" ){
            this.companyForm=rep.data || {};
            this.imgPathBusinessList=this.companyForm.imgPathBusinessList || []
          }
        })
        loadLicenceTypeCommon().then(rep=>{
          if(rep && rep.code=='200' ){
            this.licenseTypeList=rep.data ||[] ;
          }
        })
        getRepCommon().then(rep=>{
          if(rep && rep.code=="200" && rep.data){
            this.repForm=rep.data
          }
        })
        getBusListCommon().then(rep=>{
          if(rep && rep.code=="200"){
            this.qualificationTypeIds=rep.data || {};;
          }
        })
        serviceType({}).then(rep=>{
          if(rep && rep.code=="200"){
            this.busType=rep.data;
          }
        })

      },
      shareholderChange(value,item){
        if(!value){
          return;
        }
        this.shareholderList.forEach(inneritem=>{
          if(value==inneritem.value){
            item.shareholderTypeVal=inneritem.label;
          }
        })
      },

      submitAllFomrs(){
        let self=this;
        let Representative =  new Promise((resolve, reject) => {
          self.memberRepresentativeSave('repForm',2,resolve,reject)
        })
        let wakeCompany = new Promise((resolve, reject)=>{
          self.saveCompanyInfo('companyForm',2,resolve,reject);
        })
        // let bus=new Promise((resolve, reject)=>{
        //     self.busSave(2,resolve,reject);
        // })
        let shareholder=new Promise((resolve, reject)=>{
          self.shareholderSave(2,resolve,reject);
        })
        let linkman=new Promise((resolve, reject)=>{
          self.linkmanSave(2,resolve,reject);
        })
        let seniorExecutive=new Promise((resolve, reject)=>{
          self.seniorExecutiveSave(2,resolve,reject);
        })

        Promise.all([Representative,wakeCompany, shareholder,linkman,seniorExecutive]).then((result) => {
          self.busSave(2,resolve,reject);       // [ '3秒后醒来', '2秒后醒来' ]
        }).catch((error) => {
          console.log(error)
        })
      },
      seniorExecutiveSave(){
        if( this.editSeniorTable.length < 1 ){
             warnMES('至少填写一位高管');
             return
        }
        let flag=false;
        let keyFiled="";
        let index=-1;
        let emailValid=false;
        let phoneValid = false;
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        let reg1 = /^\d+$/;
        this.editSeniorTable.forEach((item,ind)=>{
          if(flag){
            return;
          }
          for(let key in item) {
            if (this.seniorExecutiveRules.indexOf(key) > -1) {
              if (!item[key]) {
                keyFiled = key;
                flag = true;
                index = ind;
                break;
              } else if (key == "mail") {
                if (!reg.test(item[key])) {
                  index = ind;
                  emailValid = true;
                  flag = true;
                  break;
                }
              } else if (key == "officerPhone") {
                if (!reg1.test(item[key])) {
                  index = ind;
                  phoneValid = true;
                  flag = true;
                  break;
                }

              }
            }
          }
        })
        if(emailValid){
          warnMES("第" +(index+1)+"行--邮箱格式不正确");
          // this.$store.commit("closeEdit",false);
          return;
        }
        if (phoneValid) {
          warnMES("第" + (index + 1) + "行--办公电话不正确");
          // this.$store.commit("closeEdit",false);
          return;
        }
        if(flag){
          let filed="";
          switch(keyFiled){
            case  'seniorName' : filed="高管姓名";break;
            case 'duties' : filed="职务";break;
            case 'sex' : filed="性别";break;
            case  'nation': filed="名族";break;
            case 'birth': filed="出生年月";break;
            case  'highestEducation' : filed="最高学历";break;
            case 'appointTime' : filed="任职时间";break;
            case  'departInCharge': filed="分管部门";break;
            case 'officerPhone': filed="办公电话";break;
            case 'mail': filed="邮箱";break;
            default : filed="";break;

          }

          warnMES("第" +(index+1)+"行--"+filed+'--必填');
          return;
        }
        saveSeniorExecutiveCommon(this.editSeniorTable).then(rep=>{
          if(rep && rep.code=='200'){
             successMES('保存成功');
            this.getWorkFlowStatus()
            this.querySeniorExecutiveList();
           
          }
        }).catch(error=>{

        })

      },
      busSave(){
        if(this.busType==1 || this.busType==2  || this.busType==3){
          let keyFiled="";
          let index=-1;
          let emailValid=false;
          let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          this.editBusTable.forEach((item,ind)=>{
            if(emailValid){
              return;
            }
            for(let key in item){
              if(item[key] && key=="email"){
                if(!reg.test(item[key])){
                  index=ind;
                  emailValid=true;
                  break;
                }
              }
            }

          })
          if(emailValid){
            warnMES("第" +(index+1)+"行--邮箱格式不正确");
            // this.$store.commit("closeEdit",false);
            return;
          }
        }

        if(this.qualityList.length==0 && this.qualificationTypeIds.length > 0 && this.busType==1){
          warnMES("资格信息必填");
          return
        }
        
        let params={departmentInfoList:[],qualificationTypeIds:[],...this.sizeInformationForm}
        params.departmentInfoList=[...this.editBusTable]
        params.qualificationTypeIds=[...this.qualityList]
        if(this.busType!==1 && this.busType!==2 && this.busType!==3){
          delete params.departmentInfoList
          delete params.qualificationTypeIds
        }
        if(this.busType==1){

          saveBusCommon(params).then(rep=>{
            if(rep && rep.code=='200'){
              successMES('保存成功');
              this.getBusinessInformation();
            }
          }).catch(error=>{

          })
        }else if(this.busType==2){
          delete params.qualificationTypeIds
          saveBus_2_Common(params).then(rep=>{
            if(rep && rep.code=='200'){
              successMES('保存成功');
              this.getBusinessInformation();
            }
          })
        }else if(this.busType==3){
          delete params.qualificationTypeIds
          saveBus_3_Common(params).then(rep=>{
            if(rep && rep.code=='200'){
              successMES('保存成功');
              this.getBusinessInformation();
            }
          })
        }else if(this.busType==4){

          saveBus_4_Common(params).then(rep=>{
            if(rep && rep.code=='200'){
              successMES('保存成功');
              this.getBusinessInformation();
            }
          })
        }else if(this.busType==5){

          saveBus_5_Common(params).then(rep=>{
            if(rep && rep.code=='200'){
              successMES('保存成功');
              this.getBusinessInformation();
            }
          })
        }else if(this.busType==6){

          saveBus_6_Common(params).then(rep=>{
            if(rep && rep.code=='200'){
              successMES('保存成功');
              this.getBusinessInformation();
            }
          })
        }else if(this.busType==7){

          saveBus_7_Common(params).then(rep=>{
            if(rep && rep.code=='200'){
              successMES('保存成功');
              this.getBusinessInformation();
            }
          })
        }else if(this.busType==8){

          saveBus_8_Common(params).then(rep=>{
            if(rep && rep.code=='200'){
              successMES('保存成功');
              this.getBusinessInformation();
            }
          })
        }else if(this.busType==9){

          saveBus_9_Common(params).then(rep=>{
            if(rep && rep.code=='200'){
              successMES('保存成功');
              this.getBusinessInformation();
            }
          })
        }else if(this.busType==10){

          saveBus_10_Common(params).then(rep=>{
            if(rep && rep.code=='200'){
              successMES('保存成功');
              this.getBusinessInformation();
            }
          })
        }else if(this.busType==11){

          saveBus_11_Common(params).then(rep=>{
            if(rep && rep.code=='200'){
              successMES('保存成功');
              this.getBusinessInformation();
            }
          })
        }else if(this.busType==12){
          params.remark=this.sizeInformationForm.info;
          saveBus_12_Common(params).then(rep=>{
            if(rep && rep.code=='200'){
              successMES('保存成功');
             
              this.getBusinessInformation();
            }
          })
        }
        this.getWorkFlowStatus();
      },
      format,
      saveCompanyInfo(formName){
        if(!this.companyForm.imgPathLicence){
            warnMES('营业执照必填');
            return
        }
         if(this.companyForm.imgPathBusinessList.length==0){
            warnMES('经营业务许可证图片必填');
            return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            saveCompanyBasicInfoCommon(this.companyForm).then(rep=>{
              if(rep && rep.code=='200'){
                 successMES('保存成功');
                this.getWorkFlowStatus()
               


              }
            }).catch(error=>{
              // this.$store.commit("closeEdit",false);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      quertLinkManList(){
        getLinkManListCommon().then(rep=>{
          if(rep && rep.code=="200"){
            this.editContactTable=rep.data || [];
          }
        })
      },
      querySeniorExecutiveList(){
        getSeniorExecutiveListCommon().then(rep=>{
          if(rep && rep.code=="200"){
            this.editSeniorTable =rep.data || [];
          }
        })
      },
      queryShareholder(){
        getShareholderCommon().then(rep=>{
          if(rep && rep.code=="200"){
            this.editShareTable =rep.data || [];
          }
        })
      },
      shareholderSave(){
        if(this.editShareTable.length < 1){
          warnMES('请至少填写一位股东');
          return;
        }
        let flag=false;
        let keyFiled="";
        let index=-1;
        this.editShareTable.forEach((item,ind)=>{
          if(flag){
            return;
          }
          for(let key in item){
            if( this.shareholdersRules.indexOf(key) > -1 ){
              if(!item[key]){
                keyFiled=key;
                flag=true;
                index=ind;
                break;
              }
            }
          }

        })
        if(flag){
          let filed="";
          switch(keyFiled){
            case  'shareholderName' : filed="股东名称";break;
            case 'shareholdingRatio' : filed="持股比例(%)";break;
            case  'chuziRatio': filed="认缴出资比例(%)";break;
            case 'shareholderType': filed="股东类型";break;
            default : filed="";break;
          }

          warnMES("第" +(index+1)+"行--"+filed+'--必填');

          return;
        }

        saveShareholderCommon(this.editShareTable).then(rep=>{
          if(rep && rep.code=='200'){
            successMES('保存成功');
            this.getWorkFlowStatus()
            this.queryShareholder();
            

          }
        }).catch(error=>{

        })

      },
      limitTwo(obj,key){
        let value=obj[key];
        value = value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
        value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        obj[key] = value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
        if(value > 100 || value < 0 ){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于
          obj[key]= 0;
        }
        if(/^0/.test(value)){
          obj[key]=parseFloat(value);
        }

      },
      linkmanSave(){
        if(this.editContactTable.length <2 ){
          warnMES('至少2个联系人');
          return;
        }
        let flag=false;
        let keyFiled="";
        let index=-1;
        let emailValid = false;
        let phoneValid = false;
        let mobilePhoneValid = false;
        let reg = /^\d+$/;
        let reg1 = /^1[3|4|5|7|8][0-9]\d{8}$/;
        let reg2 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        this.editContactTable.forEach((item,ind)=>{
          if(flag){
            return;
          }
          for(let key in item){
            if( this.linkmanRules.indexOf(key) > -1 ){
              if(!item[key]){
                keyFiled=key;
                flag=true;
                index=ind;
                break;
              } else if (key === "officePhoneNum") {
                if (!reg.test(item[key])) {
                  index = ind;
                  phoneValid = true;
                  flag = true;
                  break;
                }
              } else if (key === "mobileNum") {
                if (!reg1.test(item[key])) {
                  index = ind;
                  mobilePhoneValid = true;
                  flag = true;
                  break;
                }
              } else if (key === "mailAddress") {
                if (!reg2.test(item[key])) {
                  index = ind;
                  emailValid = true;
                  flag = true;
                  break;
                }
              }
            }
          }

        })
        if (emailValid) {
          warnMES("第" + (index + 1) + "行--邮箱格式不正确");
          // this.$store.commit("closeEdit",false);
          return;
        }
        if (phoneValid) {
          warnMES("第" + (index + 1) + "行--办公电话不正确");
          // this.$store.commit("closeEdit",false);
          return;
        }
        if (mobilePhoneValid) {
          warnMES("第" + (index + 1) + "行--手机号不正确");
          // this.$store.commit("closeEdit",false);
          return;
        }
        if (flag) {
          let filed = "";
          switch (keyFiled) {
            case  'contactName' :
              filed = "联系人姓名";
              break;
            case 'duty' :
              filed = "职务";
              break;
            case  'officePhoneNum':
              filed = "办公电话";
              break;
            case 'mobileNum':
              filed = "手机";
              break;
            case 'mailAddress':
              filed = "邮箱";
              break;
            default :
              filed = "";
              break;
          }

          warnMES("第" +(index+1)+"行--"+filed+'--必填');

          return;
        }
        linkManAddCommon(this.editContactTable).then(rep=>{
          if(rep && rep.code=='200'){
            successMES('保存成功');
            this.quertLinkManList();
            this.getWorkFlowStatus()
            


          }
        }).catch(error=>{

        })
      },
      memberRepresentativeSave(formName){

        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.repForm.companyId=this.companyId;
            this.repForm.dateEffective=this.repForm.effectiveDate
            saveMemberRepresentativeCommon(this.repForm).then(rep=>{
              if(rep && rep.code=='200'){
                successMES('保存成功');
                this.getWorkFlowStatus()
              }
            }).catch(error=>{

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        })

      },
      getBusinessInformation(){
        loadBusinessInformationCommon().then(rep=>{
          if(rep && rep.code=='200' && rep.data){
            this.editBusTable=rep.data.departmentInfoList || [];
            this.qualityList=(rep.data.qualificationTypeIds || []).map(item=>{
              return item.qualificationType
            })
            this.sizeInformationForm=rep.data
          }
        })
      },
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
      addTableItem(type) {
        if(type==1){
          this.editContactTable.push(
            {
              contactName:"",
              duty:"",
              fax:"",
              officePhoneNum: "",
              mobileNum:"",
              mailAddress:"",
              standbyMail:"",
              weiChat:"",
              companyId:this.companyId,
              flagDefault:2
            }
          )
        }else if(type==2){
          this.editShareTable.push(
            {
              shareholderName:'',
              shareholdingRatio:'',
              chuziRatio:'',
              shareholderType:'',
              companyId:this.companyId
            }
          )
        }else if(type==3){
          this.editSeniorTable.push(
            {
              'seniorName':"",
              'sex':"",
              'duties':"",
              'nation':"",
              'birth':"",
              'highestEducationVal':"",
              'highestEducation':"",
              'appointTime':"",
              'departInCharge':"",
              'officerPhone':"",
              'mail':"",
              companyId:this.companyId
            }
          )
        }else if(type==4){
          this.editBusTable.push(
            {
              'fordepartmentName':"",
              "personNum":"",
              "departHeader":"",
              "officePhone":"",
              "mobilePhone":"",
              "email":"",
              companyId:this.companyId
            }
          )
        }

      },
      deleteItem(ind,type,item) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(type==1){
            if (this.editContactTable.length == 2) {
              warnMES("至少保留2条信息")
              return ;

            }
            if(!item.id){
              this.editContactTable.splice(ind,1);
            }else{
              linkmanDeleteCommon({contactId:item.id}).then(rep=>{
                if(rep && rep.code=='200'){
                  successMES('删除成功');
                  this.quertLinkManList();
                }
              })
            }

          }else if(type==2){
            if(!item.id){
              this.editShareTable.splice(ind,1)
            }else{
              delShareholderCommon({id:item.id}).then(rep=>{
                if(rep && rep.code=='200'){
                  successMES('删除成功');
                  this.queryShareholder();
                }
              })
            }


          }else if(type==3){
            if(!item.id){
              this.editSeniorTable.splice(ind,1)
            }else{
              delSeniorExecutiveListCommon({id:item.id}).then(rep=>{
                if(rep && rep.code=='200'){
                  successMES('删除成功');
                  this.querySeniorExecutiveList();
                }
              })
            }
          }else if(type==4){
            this.editBusTable.splice(ind,1)

          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      setItemDefault(item) {

        setDefaultLinkManCommon({contactId:item.id}).then(rep=>{
          if(rep.code=='200'){
            successMES('设置成功');
            this.quertLinkManList();

          }
        })

      },
      certUp() {
        this.upVisible = true;
      },
      handlePreview() {},
      handleRemove() {},
      beforeRemove() {},
      handleExceed() {},
      handleAvatarSuccess() {},
      beforeAvatarUpload() {},
      calcHeight(){
              let container = document.getElementById("iframeContainer");  //找对象
              let applyBook=document.getElementById('applyBook')
              let baseInfo=document.getElementById('baseInfo')
              let userInfo=document.getElementById('userInfo')
              let memberRep=document.getElementById('member-rep')
              let other=document.getElementById('other')
              let self=this;
             let containerHeight= container.scrollTop;
             let applyBookHeight=applyBook.offsetHeight+20;
             let baseInfoHeight=baseInfo.offsetHeight+20;
             let userInfoHeight=userInfo.offsetHeight+20;
             let memberRepHeight=memberRep.offsetHeight;
             let otherHeight=other.offsetHeight+20;
             if(containerHeight<applyBookHeight){
                  self.leftMenu.forEach((item,index)=>{
                       if(index==0){
                          item.active=true;
                       }else{
                          item.active=false;
                       }
                   })
                }else if(containerHeight<applyBookHeight+baseInfoHeight){
                      self.leftMenu.forEach((item,index)=>{
                         if(index==1){
                            item.active=true;
                         }else{
                            item.active=false;
                         }
                     })
                }else if(containerHeight<applyBookHeight+baseInfoHeight+userInfoHeight){
                    self.leftMenu.forEach((item,index)=>{
                       if(index==2){
                          item.active=true;
                       }else{
                          item.active=false;
                       }
                    })
                }else if(containerHeight<applyBookHeight+baseInfoHeight+userInfoHeight+memberRepHeight){
                        self.leftMenu.forEach((item,index)=>{
                         if(index==3){
                            item.active=true;
                         }else{
                            item.active=false;
                         }
                     })
                }else if(containerHeight < applyBookHeight+baseInfoHeight+userInfoHeight+memberRepHeight + otherHeight){
                        self.leftMenu.forEach((item,index)=>{
                         if(index==4){
                            item.active=true;
                         }else{
                            item.active=false;
                         }
                        })
                }else if(containerHeight >= applyBookHeight+baseInfoHeight+userInfoHeight+memberRepHeight + otherHeight){
                        self.leftMenu.forEach((item,index)=>{
                         if(index==5){
                            item.active=true;
                         }else{
                            item.active=false;
                         }
                        })
                }
      },
      scrollDocument(){
          let container = document.getElementById("iframeContainer");  //找对象
          if(window.addEventListener){
             container.addEventListener('scroll',this.calcHeight,false)
              
         }else{
             container.attachEvent("onscroll",this.calcHeight,false);
         }
      }
    },
    components: {}
  };
</script>
<style lang="less" scoped>
  .appyVip {
    position: relative;
    .membership-recognition-application{
      position:fixed;
      left:270px;
      width:calc(100% - 306px);
      bottom:0px;
      background-color:#fff;
    }
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
      .linkManMask,
      .shareholderMask,
      .businessMask,
      .seniorMask,
      .companyMask,
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
          //display: flex;
          //-webkit-box-align: center;
          //align-items: center;
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
              min-width:130px;
            }
            > .el-input {
              width: 80% !important;
              min-width: 130px;
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
          width: 100%;
          .el-button {
            border-style: dashed !important;
            width: 40%;

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
    display: none ;

    .el-input__inner {
      color: #c0cfe3;
    }
  }
  .editInput {
    display: block ;
  }
  .editInput.el-date-editor{
    display:inline-block;
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
