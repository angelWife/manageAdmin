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
       
        

          <div class="formBox" id="basicInfo">
            <div class="title">
              <span class="text" name="basicInfo">会员基本信息</span>
             
            </div>
            <div class="formMain">
              <el-form :model="memberForm" label-width="100px" label="left">
                <el-row class="m-t-20">
                  <el-col :span="10">
                    <el-form-item label="会员类型：">
                      <span class="hideEle" :class="{editInput:!edit}">{{memberForm.memberTypeVal}}</span>
                      <el-input
                        class="hideEle"
                        size="small"
                        :class="{editInput:edit}"
                        v-model="memberForm.memberTypeVal"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="会员代号：">
                      <span class="hideEle" :class="{editInput:!edit}">{{memberForm.memberCode}}</span>
                      <el-input
                        size="small"
                        class="hideEle"
                        v-model="memberForm.memberCode"
                        :class="{editInput:edit}"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="m-t-20">
                  <el-col :span="10">
                    <el-form-item label="会员状态：">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{memberForm.memberStatusVal}}</span>
                      <el-select class="hideEle"
                        v-model="memberForm.memberStatusVal"
                        :class="{editInput:edit}"
                        placeholder="请选择" size="small">
                          <el-option value="已认定" label="已认定"> </el-option>
                          <el-option value="认定中" label="认定中"> </el-option>
                          <el-option value="已冻结" label="已冻结"> </el-option>
                          <el-option value="已退会" label="已退会"> </el-option>
                      </el-select>
                    
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="会员有效期：">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{memberForm.dateEffectiveStart}}到{{memberForm.dateEffectiveEnd}}</span>
                      <el-date-picker
                        style="width:45% !important;"
                        class="hideEle" :class="{editInput:edit}"
                        v-model="memberForm.dateEffectiveStart"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format  ="yyyy-MM-dd"
                        size="small"
                        placeholder="选择日期">
                      </el-date-picker>
                      <el-date-picker
                        style="width:45% !important;"
                        class="hideEle" :class="{editInput:edit}"
                        v-model="memberForm.dateEffectiveEnd"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format  ="yyyy-MM-dd"
                        size="small"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="formBox" id="applyBook">
            <div class="title">

              <span class="text" name="applyBook">入会申请书</span>
            </div>
            <div class="formMain">
              <el-form label-width="150px" label="left">
                <el-form-item  class="m-t-20">
                  <span slot="label">
                        <span style="color:#F56C6C;"> * </span>
                             入会申请书.doc
                      </span>
                  <span class="blue m-l-20 cur-pointer hideEle" :class="{editInput:!edit && userType!=1}">
                      <a :href="applyBookUrl" v-if="applyBookUrl">  {{applyBookName}}</a>
                      <span v-else>点击编辑上传申请书</span>
                 </span>
                  <div class="hideEle" :class="{editInput:edit && userType!=1}">
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
                      ref="uploadApplication"
                      :multiple="false"
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
          <div class="formBox" id="companyInfo" :class="{companyMask:companyMask && edit}">
            <div class="mask"></div>
            <div class="title">

              <span class="text" name="companyInfo">公司基本信息</span>
              <el-button  size="small" type="primary" 
                          style="float:right;margin-top:10px;" 
                          v-show="edit"
                          @click="saveCompanyInfo('companyForm',userType)">保存</el-button>
            </div>
            <div class="formMain">
              <el-form ref="companyForm" :model="companyForm" label-width="190px" label="left" :rules="companyFormRules">
                <el-row class="m-t-20">
                  <el-col :span="10">
                    <el-form-item label="机构类型：" prop="institutionType">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{companyForm.institutionTypeVal}}</span>
                      <el-select
                        class="hideEle"
                         size="small"
                        :class="{editInput:edit}"
                        v-model="companyForm.institutionType"
                        placeholder="请选择机构类型"
                      >
                         <el-option v-for="item in orgList" :key="item.id" :value="item.dictKey" :label="item.dictVal"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                 
                </el-row>
                <el-row class="m-t-20">
                   <el-col :span="10">
                    <el-form-item label="是否有社会统一信用代码："  prop="flagHaveCredit">
                      <span class="hideEle" :class="{editInput:!edit}">{{companyForm.flagHaveCreditVal }}</span>
                          <el-select size="small"  class="hideEle"  v-model="companyForm.flagHaveCredit " 
                                    :class="{editInput:edit}"  placeholder="请选择">
                             <el-option :value="1" label="是" key="1"></el-option>
                             <el-option :value="0" label="否" key="0"></el-option>
                          </el-select>
                         
                     </el-form-item>
                   </el-col>
                    <el-col :span="10">
                      <el-form-item label="统一社会信用代码：" prop="creditId">
                        <span class="hideEle" :class="{editInput:!edit}">{{companyForm.creditId}}</span>
                        <el-input class="hideEle"  size="small"
                         v-model="companyForm.creditId" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>  
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="名称：" prop="companyName">
                      <span class="hideEle" :class="{editInput:!edit}">{{companyForm.companyName}}</span>

                      <el-input class="hideEle" :class="{editInput:edit}" 
                        v-model="companyForm.companyName" placeholder="请输入内容"  size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="英文名称："  prop="companyNameEng">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{companyForm.companyNameEng}}</span>
                      <el-input class="hideEle" 
                          size="small"
                          v-model="companyForm.companyNameEng"
                           :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="公司类型：" prop="companyType">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{companyForm.companyTypeVal }}</span>
                      <el-select
                        class="hideEle"
                          size="small"
                        v-model="companyForm.companyType"
                        :class="{editInput:edit}"
                        placeholder="请选择公司类型"
                      >
                        <el-option  v-for="(item,index) in companyTypeData"   
                                    :label="item.val" :value="item.key" :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="成立日期：" prop="dateBuild">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{format(companyForm.dateBuild)}}</span>
                      <el-date-picker
                        class="hideEle"
                        :class="{editInput:edit}"
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
                      <span class="hideEle" :class="{editInput:!edit}">{{companyForm.flagListedVal}}</span>
                      <el-select
                        class="hideEle"
                         size="small"
                        v-model="companyForm.flagListed"
                        :class="{editInput:edit}"
                        placeholder="请选择"
                      >
                        <el-option :label="item.val" :value="item.key" :key="index" v-for="(item,index) in  listedData"></el-option>
                        
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上市地：">
                      <span class="hideEle" :class="{editInput:!edit}">{{companyForm.listAddress}}</span>
                      <el-input class="hideEle"  v-model="companyForm.listAddress"  size="small" :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="注册地址：" prop="registeredAddress">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{companyForm.registeredAddress}}</span>
                      <el-input  size="small" class="hideEle" 
                      v-model="companyForm.registeredAddress"
                      :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="办公地址：" prop="workAddress">
                      <span class="hideEle" :class="{editInput:!edit}">{{companyForm.workAddress}}</span>
                      <el-input  size="small" class="hideEle"
                       v-model="companyForm.workAddress"
                       :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="公司网址：" prop="companyWeb">
                      <span class="hideEle" :class="{editInput:!edit}">{{companyForm.companyWeb}}</span>
                      <el-input   size="small" class="hideEle" 
                      v-model="companyForm.companyWeb"
                      :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="法人代表：" prop="legalRepresentative">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{companyForm.legalRepresentative}}</span>
                      <el-input   size="small" class="hideEle" 
                      v-model="companyForm.legalRepresentative"
                      :class="{editInput:edit}" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="注册资本(万元)：" prop="registeredCapital">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{companyForm.registeredCapital}}</span>
                      <el-input  size="small" class="hideEle" 
                       v-model="companyForm.registeredCapital"
                      :class="{editInput:edit}" placeholder="请输入内容"></el-input>
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
                      <img
                        class="hideEle"
                        :class="{editInput:!edit}"
                        :href="companyForm.imgPathLicence"
                      />
                      <div class="hideEle" :class="{editInput:edit}">
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
                      <div class="hideEle" :class="{editInput:!edit}">
                    
                        <template v-for="(item,index) in (companyForm.imgPathBusinessList || [])" >
                            <a :href="item" target="_blank" 
                               :key="index"
                                style="display:inline-block;position:relative;height:100px;margin-right:10px;">
                                  
                                  <img :src="item"  width="100"  height="100" />
                             </a>
                           </template>
                       
                      </div>
                      <div class="hideEle" :class="{editInput:edit}">
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
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          
          <div class="formBox" id="userInfo" :class="{linkManMask:linkManMask && edit}" >
            <div class="mask"></div>
            <div class="title">
              <span class="text" name="userInfo">联系人信息</span>
              <el-button size="small"  type="primary" 
               v-show="edit"
               @click.prevent="linkmanSave(userType)" style="float:right;">保存</el-button>
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
                      <!-- <th>身份证</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,ind) in contactTable" :key="ind">
                      <td><span v-if="item.flagDefault==1" >
                          (默认)
                        </span> {{item.contactName}}</td>
                      <td>{{item.duty}}</td>
                      <td>{{item.officePhoneNum}}</td>
                      <td>{{item.mobileNum}}</td>
                      <td>{{item.fax}}</td>
                      <td>{{item.mailAddress}}</td>
                      <td>{{item.standbyMail}}</td>
                      <td>{{item.contactAddress}}</td>
                      <td>{{item.weChatNum}}</td>
                      <!-- <td>{{item.id}}</td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tableBox hideEle" :class="{editInput: edit}">
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
                        <span v-if="item.flagDefault==1">默认</span>
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
        <div :class="{memberMask:memberMask && edit}" id="memberRep">
          <div class="mask"></div>
          <div class="formBox" id="vipUser">
            <div class="title">

              <span class="text" name="vipUser">会员代表</span>
               <el-button size="small"  type="primary"
                  v-show="edit"
                  @click="memberRepresentativeSave('repForm',userType)" style="float:right;">保存</el-button>
            </div>
            <div class="formMain">
              <el-form :model="repForm" ref="repForm" label-width="140px" label="left" :rules="ruleFormRules">
                <el-row class="m-t-20">
                  <el-col :span="10">
                    <el-form-item label="证件类型：" prop="licenseType">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.licenseTypeVal}}</span>
                      <el-select
                        clearable
                        class="hideEle"
                        v-model="repForm.licenseType"
                        size="small"
                        :class="{editInput:edit}"
                        placeholder="请选择证件类型"
                      >
                        <el-option  v-for="(item,index) in licenseTypeList"  
                          :label="item.val" :value="item.key" :key="index">
                         </el-option>
                        
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="证件号码：" prop="licenceNum">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.licenceNum}}</span>
                      <el-input class="hideEle" v-model="repForm.licenceNum"  
                      size="small" :class="{editInput:edit}" placeholder="请输入证件号码"></el-input>
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
                      <img
                        class="hideEle"
                        :class="{editInput:!edit}"
                        src="../../../static/userPic.png"
                      />
                      <div class="hideEle" :class="{editInput:edit}">
                         <a href="static/pic2.png" target="_blank" 
                          style="display:inline-block;position:relative;height:100px;">
                            <span class="el-icon-close" 
                                  style="position:absolute;right:5px;top:5px;color:#ff0000; " 
                                  @click.prevent="removeFile(2)"></span>
                            <img src="static/pic2.png"  width="100"  height="100" />
                       </a> 
                       <div>
                       <el-upload
                          class="avatar-uploader f-left"
                          :multiple="false"
                          :action="global.baseUrl+global.commonFileUploadUrl"
                          :http-request="uploadFile"
                          :data="{id:2}"
                          accept=".png,.gif,.jpg,.pgeg"
                          :limit="1"
                          :show-file-list="false">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>

                       
                      </div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row> -->
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="签发机关：" prop="publishOrgan">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.publishOrgan}}</span>
                      <el-input  size="small" class="hideEle" 
                      v-model="repForm.publishOrgan"
                      :class="{editInput:edit}" placeholder="请输入签发机关"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="有效期：" prop="dateEffective">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.effectiveDate}}</span>
                      <el-date-picker
                        size="small"
                        class="hideEle" 
                        format="yyyy-MM-dd"
                        value-format  ="yyyy-MM-dd"
                        v-model="repForm.dateEffective"
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
                    <el-form-item label="姓名：" prop="name">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.name}}</span>
                      <el-input  size="small" class="hideEle"
                       v-model="repForm.name"
                       :class="{editInput:edit}" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="性别：" prop="sex">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.sexVal}}</span>
                      <el-select
                        class="hideEle"
                        :class="{editInput:edit}"
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
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.nativePlaice}}</span>
                      <el-input  size="small" class="hideEle" v-model="repForm.nativePlaice" :class="{editInput:edit}" placeholder="请输入籍贯"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="出生年月：" prop="birth">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.birth}}</span>
                      <el-date-picker
                       size="small"
                        class="hideEle"
                        format="yyyy-MM-dd"
                        value-format  ="yyyy-MM-dd"
                        v-model="repForm.birth"
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
                    <el-form-item label="民族：" prop="nation">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.nation}}</span>
                      <el-input   size="small" class="hideEle"
                       v-model="repForm.nation"
                       :class="{editInput:edit}" placeholder="请输入民族"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="最高学历："  prop="highestEducation">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{repForm.highestEducationVal}}</span>
                      <el-select
                        class="hideEle"
                        v-model="repForm.highestEducation"
                        :class="{editInput:edit}"
                         size="small"
                        placeholder="请选择最高学历"
                      >
                        <el-option :label="item.val" :value="item.key" :key="item.key" v-for="(item,index) in  educationTypeList"></el-option>
                       
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="政治面貌："  prop="politicalAffiliation">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{repForm.politicalAffiliation}}</span>
                      <el-input  size="small" class="hideEle" 
                      v-model="repForm.politicalAffiliation"
                      :class="{editInput:edit}" placeholder="请输入政治面貌"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="职务：" prop="duty">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.duty}}</span>
                      <el-input  size="small"
                       v-model="repForm.duty"
                       class="hideEle" :class="{editInput:edit}" placeholder="请输入职务"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="办公电话：" prop="officeNum">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.officeNum}}</span>
                      <el-input  size="small" class="hideEle"
                       v-model="repForm.officeNum"
                       :class="{editInput:edit}" placeholder="请输入办公电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="传真：" prop="fax">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.fax}}</span>
                      <el-input  size="small" class="hideEle" :class="{editInput:edit}"
                        v-model="repForm.fax"
                       placeholder="请输入传真"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="本人电话：" prop="selfPhone">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.selfPhone}}</span>
                      <el-input   size="small" class="hideEle"
                       v-model="repForm.selfPhone" 
                       :class="{editInput:edit}" placeholder="请输入本人电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="邮箱：" prop="mail">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.mail}}</span>
                      <el-input  size="small" class="hideEle" 
                      v-model="repForm.mail"
                      :class="{editInput:edit}" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="通讯地址：" prop="contactAddress">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.contactAddress}}</span>
                      <el-input  size="small" class="hideEle" 
                        v-model="repForm.contactAddress"
                      :class="{editInput:edit}" placeholder="请输入通讯地址"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="微信号：" prop="weiChat">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.weiChat}}</span>
                      <el-input   size="small" class="hideEle" 
                      :class="{editInput:edit}" placeholder="请输入微信号" v-model="repForm.weiChat"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="代表履历：">
                      <span class="hideEle" :class="{editInput:!edit}">{{repForm.personalDetails}}</span>
                      <el-input
                       size="small"
                        class="hideEle"
                        v-model="repForm.personalDetails"
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
        <div   id="other">
         
          <div class="formBox" :class="{shareholderMask:shareholderMask && edit}">
            <div class="mask"></div>
            <div class="title">
              
              <span class="text" name="other">股东与高管</span>
               <el-button size="small"  type="primary"
                  v-show="edit"
                  @click="shareholderSave(userType)" style="float:right;">保存</el-button>
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
                    <tr v-for="(item,ind) in shareTable" :key="ind">
                      <td>{{item.shareholderName}}</td>
                      <td>{{item.shareholdingRatio}}</td>
                      <td>{{item.chuziRatio}}</td>
                      <td>{{item.shareholderTypeVal}}</td>
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
                    <tr v-for="(item,ind) in seniorTable" :key="ind">
                      <td>{{item.seniorName}}</td>
                      <td>{{item.sexVal}}</td>
                      <td>{{item.duties}}</td>
                      <td>{{item.nation}}</td>
                      <td>{{item.birth}}</td>
                      <td>{{item.highestEducationVal}}</td>
                      <td>{{item.appointTime}}</td>
                      <td>{{item.departInCharge}}</td>
                      <td>{{item.officerPhone}}</td>
                      <td>{{item.mail }}</td>
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
                          <el-option v-for="item in shareholderTypeList" 
                                     :value="item.key" 
                                     :label="item.val" 
                                     :key="item.key"></el-option>
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
          <div class="formBox" :class="{seniorMask:seniorMask && edit}" v-show="edit">
               <div class="mask"></div>
               <div style="height: 25px;">
                   <el-button size="small"  
                              type="primary" 
                              v-show="edit"
                              @click="seniorExecutiveSave(userType)" style="float:right;">
                            保存
                    </el-button>
              </div>
              <div class="tableBox hideEle" :class="{editInput:edit}">
                <table class="myTable m-t-20" style="min-width:100%;overflow:auto;table-layout:fixed">
                  <thead>
                    <tr>
                      <th ><span style="color:#F56C6C">*</span>高管姓名</th>
                      <th ><span style="color:#F56C6C">*</span>性别</th>
                      <th   ><span style="color:#F56C6C">*</span>职务</th>
                      <th  ><span style="color:#F56C6C">*</span>民族</th>
                      <th ><span style="color:#F56C6C">*</span>出生年月</th>
                      <th ><span style="color:#F56C6C">*</span>最高学历</th>
                      <th><span style="color:#F56C6C">*</span><span style="color:#F56C6C">*</span>任职时间</th>
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
                        <el-select
                        
                        v-model="item.highestEducation"
                          style="min-width:100px"
                         size="small"
                        placeholder="请选择最高学历"
                      >
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
         <div class="formBox" id="msgInfo" :class="{businessMask:businessMask && edit}">
             <div class="mask"></div>
            <div class="title">
              <span class="text" name="msgInfo">业务信息</span>
                <el-button size="small"  type="primary" 
                           v-show="edit"
                           @click="busSave(userType)" style="float:right;">保存</el-button>
            </div>
            <div class="formMain">
              <div class="msg fs12 c999 m-t-20">根据所属的机构类型， 将对应不同的业务信息需要补充填写</div>
              <div class="tableBox hideEle" :class="{editInput:!edit}" 
                    v-if="busType==1 || busType==2 || busType==3 ">
                <table class="myTable m-t-20" v-if="!!busTable">
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
                    <tr v-for="(item,ind) in busTable" :key="ind">
                      <td>{{item.departmentName}}</td>
                      <td>{{item.personNum}}</td>
                      <td>{{item.departHeader}}</td>
                      <td>{{item.officePhone}}</td>
                      <td>{{item.mobilePhone}}</td>
                      <td>{{item.email}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tableBox hideEle" :class="{editInput:edit}"  v-if="busType==1 || busType==2 || busType==3 ">
                
                <table class="myTable m-t-20" v-if="!!busTable">
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
                <div class="addItem" >
                  <el-button icon="el-icon-plus" size="small" @click="addTableItem(4);">新增</el-button>
                </div>
              </div>
              <el-form :model="ruleForm" ref="ruleForm" label-width="140px" :label-position="'top'" >
                <el-row class="m-t-20" v-if="busType==1">
                  <el-col :span="24">
                    <el-form-item label="具备投资能力：">
                      
                      <el-checkbox-group v-model="qualityList">
                        <el-checkbox
                          v-for="item in qualificationTypeIds"
                          :label="item.key"
                          :key="item.key"
                          
                          :disabled="!edit"
                        >{{item.val}}</el-checkbox>
                      </el-checkbox-group>
                      
                    </el-form-item>
                  </el-col>
                </el-row>
             
                  <div class="formBox" id="msgInfo">
                    <div class="title">
                      <span class="text">规模信息</span>
                       
                    </div>
                  </div>
                <!-- 1-->
                <el-row v-if="busType==1">
                  <el-col :span="10">
                    <el-form-item label="上年度末受托管理保险资金（亿元）：" label-width="265px">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearInsureFund}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                      v-model="sizeInformationForm.yearInsureFund" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上年度末受托管理非保险资金（亿元）：" label-width="265px">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{sizeInformationForm.yearInsureFundNot}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                                v-model="sizeInformationForm.yearInsureFundNot"
                               placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="busType==1">
                  <el-col :span="10">
                    <el-form-item label="上年度末受托管理规模总计（亿元）：" label-width="265px">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearTotalFund}}</span>
                      <el-input class="hideEle" 
                               :class="{editInput:edit}" placeholder="请输入"
                               v-model="sizeInformationForm.yearTotalFund"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上年度末委托投资规模（亿元）：" label-width="265px">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearInvestment}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}"
                       v-model="sizeInformationForm.yearInvestment"
                       placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                
                <!-- 2 -->
                <el-row v-if="busType==2">
                  <el-col :span="10">
                    <el-form-item label="上年度末总资产规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearTotalAssets}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                          v-model="sizeInformationForm.yearTotalAssets" 
                      placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上年度末管理资产规模（亿元）：">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{sizeInformationForm.yearManagerAssets}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}"
                       v-model="sizeInformationForm.yearManagerAssets"
                       placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="busType==2">
                  <el-col :span="10">
                    <el-form-item label="上年度末管理保险资金规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearInsureFund}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                       v-model="sizeInformationForm.yearInsureFund"
                      placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上年度末委托投资规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearInvestFund}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}"
                       v-model="sizeInformationForm.yearInvestFund"
                       placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 3 -->
                <el-row v-if="busType==3">
                  <el-col :span="10">
                    <el-form-item label="上年度末总资产规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearTotalAssets}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                         v-model="sizeInformationForm.yearTotalAssets"
                      placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上年度末委托投资规模（亿元）：">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{sizeInformationForm.yearEntrustedInvest}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}"
                       v-model="sizeInformationForm.yearEntrustedInvest"
                       placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 4 -->
                <el-row v-if="busType==4">
                  <el-col :span="10">
                    <el-form-item label="上年度总资产规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearTotalAssets}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                       v-model="sizeInformationForm.yearTotalAssets"
                      placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="是否开展保险资金托管业务：">
                      <el-select v-model="sizeInformationForm.flagTrusteeship" size="small"  :disabled="!edit">
                                <el-option :value="1" label="是"></el-option>
                                <el-option :value="2" label="否"></el-option>
                            </el-select>
                     
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="busType==4">
                  <el-col :span="10">
                    <el-form-item label="上年度末托管保险资金规模(亿元)：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearInsureFund}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}"
                      v-model="sizeInformationForm.yearInsureFund"
                       placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="外部信用评级等级：">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{sizeInformationForm.externalCreditRating}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}"
                       v-model="sizeInformationForm.externalCreditRating"
                       placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 5 -->
                <el-row v-if="busType==5">
                  <el-col :span="10">
                    <el-form-item label="是否在保监会完成受托管理保险资金备案：">
                      <el-select v-model="sizeInformationForm.flagCompleteFiling" size="small"  :disabled="!edit">
                                <el-option :value="1" label="是"></el-option>
                                <el-option :value="2" label="否"></el-option>
                            </el-select>
                      
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上年度末总资产管理规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearTotalInvest}}</span>
                      <el-input class="hideEle" 
                       v-model="sizeInformationForm.yearTotalInvest"
                      :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="busType==5">
                  <el-col :span="10">
                    <el-form-item label="上年度末公募基金规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.publicOfferFund}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                        v-model="sizeInformationForm.publicOfferFund"
                      placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上年度末受托管理保险资金规模(亿元)：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearInsureFund}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}"
                       v-model="sizeInformationForm.yearInsureFund"
                       placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 6 -->
                <el-row v-if="busType==6">
                  <el-col :span="10">
                    <el-form-item label="是否在保监会完成受托管理保险资金备案：">
                      <el-select v-model="sizeInformationForm.flagCompleteFiling" size="small"  :disabled="!edit">
                                <el-option :value="1" label="是"></el-option>
                                <el-option :value="2" label="否"></el-option>
                            </el-select>
                      
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上年度末资管业务总资产管理规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearTotalInvest}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}"
                        v-model="sizeInformationForm.yearTotalInvest"
                       placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="busType==6">
                  <el-col :span="10">
                    <el-form-item label="上年度末受托管理保险资金规模(亿元)：">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{sizeInformationForm.yearInsureInvest}}</span>
                      <el-input class="hideEle"
                       v-model="sizeInformationForm.yearInsureInvest"
                       :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 7 -->
                <el-row v-if="busType==7">
                  <el-col :span="10">
                    <el-form-item label="上年度总资产规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearTotalInvest}}</span>
                      <el-input class="hideEle"
                        v-model="sizeInformationForm.yearTotalInvest"
                       :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="是否保险资金存款行：">
                      <el-select v-model="sizeInformationForm.flagInsureFundToBank" size="small"  :disabled="!edit">
                                <el-option :value="1" label="是"></el-option>
                                <el-option :value="2" label="否"></el-option>
                            </el-select>
                      
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="busType==7">
                  <el-col :span="10">
                    <el-form-item label="保险资金存款规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.insureInvest}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                      v-model="sizeInformationForm.insureInvest"
                      placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 8 -->
                <el-row v-if="busType==8">
                  <el-col :span="10">
                    <el-form-item label="上年度末总资产管理规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearTotalInvest}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}"
                       v-model="sizeInformationForm.yearTotalInvest"
                       placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上年度末公募基金规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.publicRaiseFund}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                       v-model="sizeInformationForm.publicRaiseFund"
                      placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 9 -->
                <el-row v-if="busType==9">
                  <el-col :span="10">
                    <el-form-item label="上年度末资管业务总资产管理规模（亿元）：">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{sizeInformationForm.yearTotalManagerInvest}}</span>
                      <el-input class="hideEle" 
                      v-model="sizeInformationForm.yearTotalManagerInvest"
                      :class="{editInput:edit}" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 10 -->
                <el-row v-if="busType==10">
                  <el-col :span="10">
                    <el-form-item label="总管理规模（亿元）：">
                      <span
                        class="hideEle"
                        :class="{editInput:!edit}"
                      >{{sizeInformationForm.totalManagerInvest}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                        v-model="sizeInformationForm.totalManagerInvest"
                      placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="管理保险资金规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.insureInvest}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                         v-model="sizeInformationForm.insureInvest"
                      placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="busType==10">
                  <el-col :span="10">
                    <el-form-item label="在管基金数量（只）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.managerNum}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                       v-model="sizeInformationForm.managerNum"
                      placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="涉及保险资金基金数量（只）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.insureNum}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                      v-model="sizeInformationForm.insureNum"
                      placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="busType==10">
                  <el-col :span="10">
                    <el-form-item label="员工人数（人）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.empNum}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}"
                        v-model="sizeInformationForm.empNum"
                       placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 11 -->
                <el-row v-if="busType==11">
                  <el-col :span="10">
                    <el-form-item label="上年度末总资产规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearTotalInvest}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                       v-model="sizeInformationForm.yearTotalInvest"
                      placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="busType==11">
                  <el-col :span="10">
                    <el-form-item label="上年度末集合信托存续规模（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.yearTrustInvest}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}"
                       v-model="sizeInformationForm.yearTrustInvest"
                       placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="保险资金投资规模总计（亿元）：">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.insureInvest}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}"
                       v-model="sizeInformationForm.insureInvest"
                       placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 12-->
                <el-row v-if="busType==12">
                  <el-col :span="24">
                    <el-form-item label="">
                      <span class="hideEle" :class="{editInput:!edit}">{{sizeInformationForm.info}}</span>
                      <el-input class="hideEle" :class="{editInput:edit}" 
                                type="textarea"
                                style="width:100%;"
                                placeholder="请输入请简述机构业务情况、与险资合作情况等" 
                                 v-model="sizeInformationForm.info" rows="5"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row  v-if="busType && busType!==12"> 
                       <el-col :span="11" >
                           <el-form-item  label="备注：">
                                   <span class="hideEle" :class="{editInput:!edit}">
                             {{sizeInformationForm.remark}}</span>
                                 <el-input v-model="sizeInformationForm.remark" 
                                 size="small" placeholder="请输入备注"
                                  type="textarea" rows="5"
                                  class="hideEle" :class="{editInput:edit}"></el-input>
                          </el-form-item>
                      </el-col>
                </el-row>
              </el-form>
              
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
import global from '@/utils/global'
import footNote from "./component/footNote";
import footNoteDisable from "./component/footNoteDisable";
import { mapState } from "vuex";
import { apiBasicMember, apiDic,saveCompanyBasicInfo ,successMES,warnMES} from "../../utils/commonApi";
import { format } from "../../utils/datetime";
import  {linkManAdd,shareholdersAdd,saveMemberRepresentative,saveShareholder,saveSeniorExecutive,saveBus,deleteLinkMan,deleteShareholder,deleteSeniorExecute,setDefaultLinkMan,getQualities,loadLicenceTypeCommon,workflowAdmin ,workflowAPI,queryMembership,queryMembershipAdmin} from "./../../http/moudules/member"
 import { memberUploadFile,formSubmit,blobDownloadFile } from "./../../http/moudules/common"
import {apiSelect,companyTypeList,educationType,genderList,getListed,shareholderType} from "@/utils/common";
export default {
  props: {
    isEdit: { type: Boolean, required: false },
    msgChange: { type: Boolean, required: false }, // 信息变更提交
    memberChange: { type: Boolean, required: false }, // 会员代表变更提交
    showEditBtn:{ type: Boolean, required: false,default:false}
  },
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
       listedData:[],
       shareholderTypeList:[],
       sizeInformationForm:{
            yearInsureFundNot:'',
            yearInsureFund:"",
            yearTotalFund:"",
            yearInvestment:"",
            remark:"",
            id:"",
          },
          genderData:[],
      licenseTypeList:[],    
      linkmanRules:['contactName','duty','officePhoneNum','mobileNum', 'mailAddress'], 
      shareholdersRules:['shareholderName','shareholdingRatio','chuziRatio','shareholderType' ], 
      seniorExecutiveRules:['seniorName','sex','duties','nation','birth','highestEducation','appointTime',
                       'departInCharge','officerPhone','mail'], 
      busTableRules:[ 'fordepartmentName',"personNum","departHeader", "officePhone",  "mobilePhone", "email"],
      leftMenu: [
        { name: "会员基本信息", active: true, id: "#basicInfo" },
        { name: "入会申请书", active: false, id: "#applyBook" },
        { name: "公司基本信息", active: false, id: "#companyInfo" },
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
        { name: "缴费记录", active: false, id: "", path: "/member/useNote" }
      ],

      ruleFormRules:{
          licenseType:[{ required: true, message: '请选择证件类型', trigger: 'blur' }],
          licenceNum:[{ required: true, message: '请填写证件号码', trigger: 'blur' }],
          publishOrgan:[{ required: true, message: '请填写签发机关', trigger: 'blur' }],
          dateEffective:[{ required: true, message: '请选择有效期', trigger: 'blur' }],
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
             workAddress: [{ required: true, message: '请填写办公地址', trigger: 'blur' }],
            creditId: [{ required: true, message: '请填写统一社会信用代码', trigger: 'blur' }],
            companyName: [{ required: true, message: '请填写名称', trigger: 'blur' }],
            companyType:[{ required: true, message: '请填选择公司类型', trigger: 'blur' }],
            dateBuild:[{ required: true, message: '请填选择成立日期', trigger: 'blur' }],
            flagListed:[{ required: true, message: '请填选择是否上市', trigger: 'blur' }],
            registeredAddress:[{ required: true, message: '请填写注册地址', trigger: 'blur' }],
            legalRepresentative:[{ required: true, message: '请填写法人代表', trigger: 'blur' }],
            registeredCapital:[{ required: true, message: '请填注册资本', trigger: 'blur' }],
            companyNameEng:[{ required: true, message: '请填写公司英文名称', trigger: 'blur' }],
            companyWeb:[{ required: true, message: '请填写填写公司网址', trigger: 'blur' }],
            workAddress:[{ required: true, message: '请填写办公地址', trigger: 'blur' }],

      },
      imageUrl: "",
      urlFront:'service',
      memberForm: {},
      storeMemberForm:{},
      companyForm: {
          "businessScale": '',
          "companyName": "",
          "companyNameEng": "",
          "companyType": '',
          "companyWeb": "",
          "creditId": "",
          "dateBuild": "",
          "dateJoin": "",
          "effectiveDateEnd": "",
          "effectiveDateStart": "",
          "flagHaveCredit": '0',
          flagHaveCreditVal:"",
          "flagListed": '',
          "id": '',
          "institutionType": '',
          "legalRepresentative": "",
          "licencePath": "",
          "listAddress": "",
          "memberType": '',
          "netAssets": '',
          "registeredAddress": "",
          "registeredCapital": '',
          "totalAssets": '',
          "workAddress": ""
      },
      storeCompanyForm:{},
      contactTable: [],
      storeContactTable:[],
      editContactTable:[],
      repForm: {
          "birth": null,
          "companyId": '',
          "contactAddress": "",
          "dateEffective": "",
           effectiveDate:"",
          "duty": "",
          "fax": "",
          "highestEducation": '',
          highestEducationVal:"",
          licenseTypeVal:"",
          "licenceNum": "",
          "licenseType": '',
          "mail": "",
          "name": "",
          "nation": "",
          "nativePlaice": "",
          "officeNum": "",
          "personalDetails": "",
          "politicalAffiliation": "",
          "publishOrgan": "",
          "selfPhone": "",
          "sex": '',
           sexVal:"",
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
      companyTypeData:[],

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
      shareholderList:[
         {value:1,label:'自然人股东'},
         {value:2,label:'法人股东'},
         {value:3,label:'国家股东'},
         {value:4,label:'国有法人股东'},
        
      ], 
      qualificationTypeIds:[],
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
      orgList:[],
      imgPathBusinessList:[],
      scrollTop: 25,
      userType:100,
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
      hasworkflowStatus:false,
      applyBookUrl:"",
      applyBookName:''
    };
  },
  computed: {
    ...mapState({
      // msgMask: state => state.dialog.msgMask,
      // memberMask: state => state.dialog.memberMask,
      isSubmit: state=>state.dialog.isSubmit,
      isCancel: state=>state.dialog.isCancel,
    }),
    edit: {
      // 是否编辑
      get() {
        return this.$store.state.dialog.edit;
      },
      set(val) {}
    },
  },
  watch:{
    edit(newValue,oldValue){
          if(newValue===true){

              this.editContactTable=[...this.storeContactTable]
              this.editShareTable=[...this.storeShareTable]
              this.editSeniorTable=[...this.storeSeniorTable]
              this.editBusTable=[...this.storeBusTable]
              this.companyForm={...this.storeCompanyForm}
              this.sizeInformationForm={...this.storesizeInformationForm}
          }else if(newValue===false){
              this.showInfo();
          }
        },
    isSubmit(newValue,oldValue){
         if(newValue===true){

             this.submitAllForms()
         }
    },
    isCancel(newValue,oldValue){
        if(newValue===true){

             
         }
    }    
  },
  created() {
    /**
     * 展示会员信息
     */
    
     apiSelect({ type: 1 }, this.orgList);
    this.showInfo();
    this.userType=sessionStorage.getItem("userType");
     this.getWorlFlowStatus()
    // apiDic("qualityType", {}).then(resolve => {
    //   this.quality = resolve;
    // });
   

   
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
     this.scrollDocument();
  },
  methods: {
         calcHeight(){
              let container = document.getElementById("iframeContainer");  //找对象
              let basicInfo=document.getElementById('basicInfo')
              let applyBook=document.getElementById('applyBook')
              let companyInfo=document.getElementById('companyInfo')
              let userInfo=document.getElementById('userInfo')
              let memberRep=document.getElementById('memberRep')
              let other=document.getElementById('other')
              let self=this;
             let containerHeight= container.scrollTop;
             let basicInfoHeight=basicInfo.offsetHeight+20;
             let applyBookHeight=applyBook.offsetHeight+20;
             let companyInfoHeight=companyInfo.offsetHeight+20;
             let memberRepHeight=memberRep.offsetHeight;
             let userInfoHeight=userInfo.offsetHeight
             let otherHeight=other.offsetHeight+20;
             if(containerHeight<applyBookHeight){
                  self.leftMenu.forEach((item,index)=>{
                       if(index==0){
                          item.active=true;
                       }else{
                          item.active=false;
                       }
                   })
                }else if(containerHeight<applyBookHeight+basicInfoHeight){
                      self.leftMenu.forEach((item,index)=>{
                         if(index==1){
                            item.active=true;
                         }else{
                            item.active=false;
                         }
                     })
                }else if(containerHeight<applyBookHeight+basicInfoHeight+companyInfoHeight){
                    self.leftMenu.forEach((item,index)=>{
                       if(index==2){
                          item.active=true;
                       }else{
                          item.active=false;
                       }
                    })
                }else if(containerHeight<applyBookHeight+basicInfoHeight+companyInfoHeight+userInfoHeight){
                        self.leftMenu.forEach((item,index)=>{
                         if(index==3){
                            item.active=true;
                         }else{
                            item.active=false;
                         }
                     })
                }else if(containerHeight < applyBookHeight+basicInfoHeight+companyInfoHeight+userInfoHeight+memberRepHeight ){
                        self.leftMenu.forEach((item,index)=>{
                         if(index==4){
                            item.active=true;
                         }else{
                            item.active=false;
                         }
                        })
                }else if(containerHeight < applyBookHeight+basicInfoHeight+companyInfoHeight+userInfoHeight+memberRepHeight + otherHeight){
                        self.leftMenu.forEach((item,index)=>{
                         if(index==5){
                            item.active=true;
                         }else{
                            item.active=false;
                         }
                        })
                }else if(containerHeight >= applyBookHeight+basicInfoHeight+companyInfoHeight+userInfoHeight+memberRepHeight + otherHeight){
                        self.leftMenu.forEach((item,index)=>{
                         if(index==6){
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
               container.attachEvent("onscroll",this.calcHeight,false,false);
           }
         },
        downloadTemplate(){
            memberDownloadTemplate('/common/file/templet/rhsqs',{type:'download'}).then(rep=>{
               blobDownloadFile(rep)
            })
        },
        getWorlFlowStatus(){
              let params={},fun;
              if(this.userType==1){
                 fun=workflowAdmin
                 params={companyId:this.$route.query.companyId}
              }else{
                fun=workflowAPI 
                params={}
              }
              fun(params).then(rep=>{
                  if(rep && rep.code=="200" && rep.data){
                     // this.getWorlFlowStatusFlag=true;
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
        uploadFile(obj){
        
          if( Math.floor( obj.file.size/(1024*1024) ) > 10 ){
              warnMES('最多上传10M')
              return
          }
          let formData = new FormData();
          formData.append('file',obj.file);
           let url="",method="";
          if(obj.data.id==1){
              if(this.userType==1){

              }else{
                  url="/api/member/company/file/rhsqh_upload";
                  method="post"
              }
             
          }
          memberUploadFile(formData,url,method).then((res=>{
               if(res && res.code=='200' && res.data){
                    successMES('上传成功');
                   if(obj.data.id==1){
                      this.applyBookUrl=res.data.fullPath
                       this.applyBookName=obj.file.name
                   }else if(obj.data.id==2){
                     this.companyForm.imgPathLicence=res.data.fullPath
                   }else if(obj.data.id==3){
                     this.imgPathBusinessList.push(res.data.fullPath);
                   }else if(obj.data.id==4){

                   }
               }
          })).catch(error=>{
             
          })
      },
      removeFile(type,index){
         if(type==1){
            this.applyBookUrl=""
           this.applyBookName=""
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
    submitAllForms(){
         let self=this;
        let validateRules=  new Promise((resolve, reject) => {
                this.$refs["companyForm"].validate((valid) => {
                   if(valid){
                       resolve(true)
                   }else{
                       reject()
                   }
                })
          })
        validateRules.then(preflag=>{
          if(preflag){
            if(this.editContactTable.length <2 ){
               warnMES('至少2个联系人');

               return false;
            }
            let flag=false;
            let keyFiled="";
            let index=-1;
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
                      }
                   }
                }
               
            })
            if(flag){
              let filed="";
               switch(keyFiled){
                   case  'contactName' : filed="联系人姓名";break;
                   case 'duty' : filed="职务";break;
                   case  'officePhoneNum': filed="办公电话";break;
                   case 'mobileNum': filed="手机";break;
                   case 'mailAddress': filed="邮箱";break;
                   default : filed="";break;
               }
               
               warnMES("第" +(index+1)+"行--"+filed+'--必填');
               // this.$store.commit("closeEdit",false);
               return false;
            }
            return true
          }else{
            return false
          }
        }).then(preflag=>{
           if(preflag){
                let validateFlag=false;
                this.$refs["repForm"].validate((valid) => {
                   if(valid){
                       validateFlag= true
                   }else{
                       validateFlag=false
                   }
                })
                return  validateFlag;
           }else{
             return false;
           }
        }).then(preflag=>{
            if(preflag){
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
                 // this.$store.commit("closeEdit",false);
                 return false;
              }
              return true
            }else{
               return false
            }
        }).then(preflag=>{
           if(preflag){
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
                   warnMES("第" +(index+1)+"行--"+filed+'--必填');
                   // this.$store.commit("closeEdit",false);
                   return false;
                 }
                 return true 
           }else{
                return false
           }
        }).then(preflag=>{
            if(preflag){
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
                 if(this.qualityList.length==0 && this.qualificationTypeIds.length > 0){
                       warnMES("资格信息必填");
                       return false
                  }
                  return true
            }else{
               return false
            }
        }).then(preflag=>{
            let type=this.userType
            if(preflag){

            }
        }).catch(error=>{

           console.log(error);
        })
        
    }, 
    seniorExecutiveSave(type,resolve,reject){
           if( this.editSeniorTable.length < 1 ){
             warnMES('至少填写一位高管');
             return
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
             // this.$store.commit("closeEdit",false);
             return;
           }  

             
             let url="";
             if(type==1){
               url=`/admin/member/archives/senior/addOrUpdateBatch?companyId=${this.$route.query.companyId}`;
             }else if(type==2){
               url="/api/member/info/senior/addOrUpdateBatch";
             }
             saveSeniorExecutive(this.editSeniorTable,url).then(rep=>{
                  if(rep && rep.code=='200'){
                      successMES('保存成功');
                      this.getWorlFlowStatus();
                      apiBasicMember(`${this.urlFront}Senior`, {companyId:this.$route.query.companyId}).then(res => {
                        this.seniorTable = res;
                        this.storeSeniorTable=[...res]
                        this.editSeniorTable=[...res]
                      }); 
                     if(resolve){
                       resolve(true)
                     }
                      
                  }else{
                     if(resolve){
                        resolve(false)
                     }
                     // this.$store.commit("closeEdit",false);
                  }
             }).catch(error=>{
                 // this.$store.commit("closeEdit",false);
             })
        
    },
    busSave(type,resolve,reject){
          if(this.busType==1 || this.busType==2 || this.busType==3){
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
          
          let url=this.getUrl(type);
          if(this.qualityList.length==0 && this.qualificationTypeIds.length > 0 && this.busType==1 ) {
               warnMES("资格信息必填");
               return
          }
          let params={departmentInfoList:[],qualificationTypeIds:[],...this.sizeInformationForm}
          params.departmentInfoList=[...this.editBusTable]
          params.qualificationTypeIds=[...this.qualityList]
          if(this.busType==2 || this.busType==3 ){
               delete  params.qualificationTypeIds
          }else if(this.busType!=1) {
                delete  params.qualificationTypeIds
                delete  params.departmentInfoList
          }
          if(this.busType==12){
            params.remark=this.sizeInformationForm.info
          }
          saveBus(params,url).then(rep=>{
                  if(rep && rep.code=='200'){
                    successMES('保存成功');
                    this.getWorlFlowStatus();
                    if(resolve){
                       resolve(true)
                     }
                    apiBasicMember(`${this.urlFront}Info`, {companyId: this.$route.query.companyId}).then(rep => {
                         this.editBusTable=  this.storeBusTable=  this.busTable=rep.departmentInfoList || [];
                         this.qualityList=(rep.qualificationTypeIds || [] ).map(item=>{
                            return item.qualificationType
                         })
                         
                       
                    });
                  }else{
                     if(resolve){
                        resolve(false)
                     }
                  }
             }).catch(error=>{
                 
         })
          
    },
    getUrl(type){
          let url="";
          if(type==2 && this.busType==1){
             url=`/api/member/info/modify_business?companyId=${this.$route.query.companyId}`;
          }else if(type==1 && this.busType==1){
             url=`/admin/member/archives/modify_business?companyId=${this.$route.query.companyId}`;
          }else if(this.busType==2){
              if(type==2){
                 url=`/api/member/info/modify_business_two`
              }else if(type==1){
                 url=`/admin/member/archives/modify_business_two?companyId=${this.$route.query.companyId}`
              }
          }else if(this.busType==3){
              if(type==2){
                 url=`/api/member/info/modify_business_three`
              }else if(type==1){
                 url=`/admin/member/archives/modify_business_three?companyId=${this.$route.query.companyId}`
              }
          }else if(this.busType==4){
              if(type==2){
                 url=`/api/member/info/modify_business_four`
              }else if(type==1){
                 url=`/admin/member/archives/modify_business_four?companyId=${this.$route.query.companyId}`
              }
          }else if(this.busType==5){
              if(type==2){
                 url=`/api/member/info/modify_business_five`
              }else if(type==1){
                 url=`/admin/member/archives/modify_business_five?companyId=${this.$route.query.companyId}`
              }
          }else if(this.busType==6){
              if(type==2){
                 url=`/api/member/info/modify_business_six`
              }else if(type==1){
                 url=`/admin/member/archives/modify_business_six?companyId=${this.$route.query.companyId}`
              }
          }else if(this.busType==7){
              if(type==2){
                 url=`/api/member/info/modify_business_seven`
              }else if(type==1){
                 url=`/admin/member/archives/modify_business_seven?companyId=${this.$route.query.companyId}`
              }
          }else if(this.busType==8){
              if(type==2){
                 url=`/api/member/info/modify_business_eight`
              }else if(type==1){
                 url=`/admin/member/archives/modify_business_eight?companyId=${this.$route.query.companyId}`
              }
          }else if(this.busType==9){
              if(type==2){
                 url=`/api/member/info/modify_business_nine`
              }else if(type==1){
                 url=`/admin/member/archives/modify_business_nine?companyId=${this.$route.query.companyId}`
              }
          }else if(this.busType==10){
             if(type==2){
                 url=`/api/member/info/modify_business_ten`
              }else if(type==1){
                 url=`/admin/member/archives/modify_business_ten?companyId=${this.$route.query.companyId}`
              }
          }else if(this.busType==11){
              if(type==2){
                 url=`/api/member/info/modify_business_eleven`
              }else if(type==1){
                 url=`/admin/member/archives/modify_business_eleven?companyId=${this.$route.query.companyId}`
              }
          }else if(this.busType==12){
              if(type==2){
                 url=`/api/member/info/modify_business_twelve`
              }else if(type==1){
                 url=`/admin/member/archives/modify_business_twelve?companyId=${this.$route.query.companyId}`
              }
          }
          return url
    },
    format,
    showInfo() {
      let upParm = {};
      let urlFront = "service";
      let applyBookFun=queryMembership;
      let url="/api/member/info/qualification-checkbox/view";
      companyTypeList(this.companyTypeData)//公司类型
      educationType(this.educationTypeList)//最高学历
      genderList(this.genderData)//性别
      getListed(this.listedData)//是否上市
      shareholderType(this.shareholderTypeList)//股东类型
      loadLicenceTypeCommon().then(rep=>{
         if(rep && rep.code=='200' ){
            this.licenseTypeList=rep.data ||[] ;
         }
      })
      if (sessionStorage.getItem("userType") == 1) {
           this.urlFront=urlFront = "basic";
           url="/admin/member/archives/qualification-checkbox/view";
           applyBookFun=queryMembershipAdmin;
        upParm = {
          companyId: this.$route.query.companyId
        };
        this.leftMenu.push({
          name: "拜访记录",
          active: false,
          id: "",
          path: "/member/visitNote"
        });
      }
      applyBookFun(upParm).then(rep=>{
          if(rep && rep.code=='200'){
              this.applyBookUrl=rep.data.fullPath
              this.applyBookName=rep.data.name
          }

      })
      getQualities(url,upParm).then(rep=>{
       if(rep && rep.code=='200'){
          this.qualificationTypeIds=rep.data
       }
       })
      // basicMember
      apiBasicMember(`${urlFront}Member`, {id:this.$route.query.companyId}).then(resolve => {
         if(resolve){
            this.memberForm = resolve;
           this.storeMemberForm={...this.resolve}
         }
        
      });
      apiBasicMember(`${urlFront}Comp`, upParm).then(resolve => {
         if(resolve){
            this.companyForm = {...this.companyForm,...resolve};
            this.storeCompanyForm={...this.companyForm,...resolve}
            this.imgPathBusinessList=this.companyForm.imgPathBusinessList
         }
        
      });
      apiBasicMember(`${urlFront}Contact`, upParm).then(resolve => {
         if(resolve){
            this.contactTable = resolve;
            this.storeContactTable=[...resolve];
            this.editContactTable=[...resolve];
         }
        

      });
      apiBasicMember(`${urlFront}Rep`,upParm).then(resolve => {
           if(resolve){
             this.repForm = resolve;
           }
           
      });
      apiBasicMember(`${urlFront}Share`, upParm).then(resolve => {
         if(resolve){
             this.shareTable = resolve;
            this.storeShareTable=[...resolve];
            this.editShareTable=[...resolve]
         }
       
      });
      apiBasicMember(`${urlFront}Senior`, upParm).then(resolve => {
        if(resolve){
            this.seniorTable = resolve;
            this.storeSeniorTable=[...resolve]
            this.editSeniorTable=[...resolve]
        }
       
      });
      apiBasicMember(`${urlFront}Info`, upParm).then(rep => {
           if(rep){
              
               this.editBusTable = this.storeBusTable=  this.busTable=rep.departmentInfoList || [];
               this.qualityList=(rep.qualificationTypeIds || [] ).map(item=>{
                  return item.qualificationType
               })
              this.sizeInformationForm=rep;
              this.storesizeInformationForm=rep;
             
           }
            
      });
      apiBasicMember(`${urlFront}Type`, upParm).then(rep=>{
          this.busType = rep
      })


    },
    saveCompanyInfo(formName,type,resolve){
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
           let url="";

            if(type==2){
               url="/api/member/info/company-info/add";//member  
            }else if(type==1){
               url="/admin/member/archives/company-info/add";
            }
           
            saveCompanyBasicInfo(this.companyForm,url).then(rep=>{
                if(rep && rep.code=='200'){
                     successMES('保存成功');
                     this.getWorlFlowStatus();
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
    closeDialog(formName){
        this.$refs[formName].resetFields();
    },
    shareholderSave(type,resolve,reject){

           if(this.editShareTable.length < 1){
               warnMES('请至少填写一位股东');
               return false
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
               // this.$store.commit("closeEdit",false);
               return;
            }
            let url="";
            if(type==2){
              url="/api/member/info/shareholder/addOrUpdateBatch";
            }else if(type==1){
               url=`/admin/member/archives/shareholder/addOrUpdateBatch?companyId=${this.$route.query.companyId}`;
            }
            saveShareholder(this.editShareTable,url).then(rep=>{
                  if(rep && rep.code=='200'){
                      successMES('保存成功');
                      this.getWorlFlowStatus();
                      apiBasicMember(`${this.urlFront}Share`, {companyId: this.$route.query.companyId}).then(res => {
                        this.shareTable = res;
                        this.storeShareTable=[...res]
                        this.editShareTable=[...res]
                      });

                     if(resolve){
                       resolve(true)
                     }
                      
                  }else{
                     if(resolve){
                        resolve(false)
                     }
                     // this.$store.commit("closeEdit",false);
                  }
            }).catch(error=>{
                  // this.$store.commit("closeEdit",false);
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
    linkmanSave(type,resolve,reject){
            
            if(this.editContactTable.length <2 ){
               warnMES('至少2个联系人');
               return;
            }
            let flag=false;
            let keyFiled="";
            let index=-1;
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
                      }
                   }
                }
               
            })
            if(flag){
              let filed="";
               switch(keyFiled){
                   case  'contactName' : filed="联系人姓名";break;
                   case 'duty' : filed="职务";break;
                   case  'officePhoneNum': filed="办公电话";break;
                   case 'mobileNum': filed="手机";break;
                   case 'mailAddress': filed="邮箱";break;
                   default : filed="";break;
               }
               
               warnMES("第" +(index+1)+"行--"+filed+'--必填');
               // this.$store.commit("closeEdit",false);
               return;
            }
            let url="";
            if(type==2){
               url=`/api/member/info/contact/addOrUpdateBatch?companyId=${this.$route.query.companyId}`;
            }else if(type==1){
               url=`/admin/member/archives/contact/addOrUpdateBatch?companyId=${this.$route.query.companyId}`;
            }

            linkManAdd(this.editContactTable,url).then(rep=>{
                  if(rep && rep.code=='200'){
                      successMES('保存成功');
                      this.getWorlFlowStatus();
                      apiBasicMember(`${this.urlFront}Contact`, 
                        {companyId:this.$route.query.companyId}).then(resolve => {
                        this.contactTable = resolve;
                        this.storeContactTable=[...resolve];
                        this.editContactTable=[...resolve]

                      });
                     if(resolve){
                       resolve(true)
                     }
                      
                  }else{
                     if(resolve){
                        resolve(false)
                     }
                     // this.$store.commit("closeEdit",false);
                  }
            }).catch(error=>{
                if(resolve){
                   resolve(false)
                }
               // this.$store.commit("closeEdit",false);
            })
          
        
    }, 
    memberRepresentativeSave(formName,type,resolve){

      let url="";
      if(type==2){
         url="/api/member/info/add_rep";
      }else if(type==1){
         url=`/admin/member/archives/add_rep?companyId=${this.$route.query.companyId}`;
      }
      this.$refs[formName].validate((valid) => {
          if (valid) {
              // this.repForm.companyId=this.$route.query.companyId;
              saveMemberRepresentative(this.repForm,url).then(rep=>{

                  if(rep && rep.code=='200'){
                      successMES('保存成功');
                      this.getWorlFlowStatus();
                    if(resolve){
                       resolve(true)
                    }
                   
                  }else{
                      if(resolve){
                         resolve(false)
                      }
                      // this.$store.commit("closeEdit",false);
                  }
            }).catch(error=>{
                 if(resolve){
                   resolve(false)
                 }
                 // this.$store.commit("closeEdit",false);
            });
          } else {
            console.log('error submit!!');
            // this.$store.commit("closeEdit",false);
            return false;
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
              flagDefault:2
             }
            )
     }else if(type==2){
        this.editShareTable.push(
             {
              shareholderName:'',
              shareholdingRatio:'',
              chuziRatio:'',
              shareholderTypeVal:'',
              companyId:this.$route.query.companyId
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
              companyId:this.$route.query.companyId
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
                  "email":""
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
                   let url="";
                   if(this.userType==1){
                     url=`/admin/member/archives/contact/delete?contactId=${item.id}`;
                   }else if(this.userType==2){
                     url=`/api/member/info/contact/delete?contactId=${item.id}`; 
                   }
                   deleteLinkMan(url).then(rep=>{
                      if(rep && rep.code=='200'){
                           successMES("删除成功")
                           apiBasicMember(`${this.urlFront}Contact`, {companyId: this.$route.query.companyId}).then(resolve => {
                               this.contactTable = resolve;
                               this.storeContactTable=[...resolve];
                               this.editContactTable=[...resolve];

                            });
                      }
                   })
                }
                
             }else if(type==2){
                if(!item.id){
                   this.editShareTable.splice(ind,1) 
                }else{
                   let url="";
                   if(this.userType==1){
                     url=`/admin/member/archives/shareholder/delete?id=${item.id}`;
                   }else if(this.userType==2){
                     url=`/api/member/info/shareholder/delete?id=${item.id}`; 
                   }
                   deleteShareholder(url).then(rep=>{
                        if(rep && rep.code=='200'){
                           successMES("删除成功")
                           apiBasicMember(`${this.urlFront}Share`,  {companyId: this.$route.query.companyId}).then(resolve => {
                            this.shareTable = resolve;
                            this.storeShareTable=[...resolve];
                            this.editShareTable=[...resolve]
                          });
                        }
                   })
                }
               

             }else if(type==3){
                if(!item.id){
                   this.editSeniorTable.splice(ind,1) 
                }else{
                    let url="";
                   if(this.userType==1){
                     url=`/admin/member/archives/senior/delete?id=${item.id}`;
                   }else if(this.userType==2){
                     url=`/api/member/info/senior/delete?id=${item.id}`; 
                   }
                   deleteSeniorExecute(url).then(rep=>{
                       if(rep && rep.code=='200'){
                          apiBasicMember(`${this.urlFront}Senior`, {companyId: this.$route.query.companyId}).then(resolve => {
                            this.seniorTable = resolve;
                            this.storeSeniorTable=[...resolve]
                            this.editSeniorTable=[...resolve]
                          });
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
        this.$confirm('将此人设为默认联系人?, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let url="";
            if(this.userType==2){
                url=`/api/member/info/contact/set-default?contactId=${item.id}`;
            }else if(this.userType==1){
                url=`/admin/member/archives/contact/set-default?contactId=${item.id}`;
            }

            setDefaultLinkMan(url).then(rep=>{
               if(rep.code=='200'){
                    successMES('设置成功');
                    apiBasicMember(`${this.urlFront}Contact`, {companyId: this.$route.query.companyId}).then(resolve => {
                      this.contactTable = resolve;
                      this.storeContactTable=[...resolve];
                      this.editContactTable=[...resolve] 
                    });

               }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
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