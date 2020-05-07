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
       
        <div :class="{msgMask:msgMask}">
          <div class="mask"></div>
          
          <div class="formBox" id="applyBook">
            <div class="title">
              <span class="text">入会申请书</span>
            </div>
            <div class="formMain">
              <el-form label-width="150px" label="left">
                <el-form-item  class="m-t-20">
                  <span slot="label">
                        <span style="color:#F56C6C;"> * </span>
                           入会申请书.doc
                      </span>
                
                  <div >
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
                    <el-form-item label="英文名称：">
                     
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

                        <el-option label="有限责任公司" :value="1"></el-option>

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
                    <el-form-item label="公司网址：">
                    
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
                      
                      <div>
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
                    <el-form-item  class="l" style="height:158px">
                      <span slot="label">
                        <span style="color:#F56C6C;"> * </span>
                           经营业务许可证：
                      </span>
                      
                      <div>
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
              <el-button size="small"  type="primary" 
             
              @click="linkmanSave" style="float:right;">保存</el-button>
            </div>
            <div
              class="msg fs12 c999 m-t-20 "
            
            >请填写至少两名联系人，建议一名行政，一名业务，务必注意，系统将根据默认联系人手机生成账号，后续各类短信，邮件通知消息也将发送至默认联系人</div>
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
        </div>
        <!-- 会员代表 -->
        <div :class="{memberMask:memberMask}">
          <div class="mask"></div>
          <div class="formBox" id="vipUser">
            <div class="title">
              <span class="text">会员代表</span>
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
                <el-row>
                  <el-col :span="10">
                    <el-form-item  >
                      <span slot="label">
                         <span style="color:#F56C6C">*</span>
                         证件照片：
                      </span>
                      
                      <div>
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
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="2"></el-option>
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
                        <el-option label="本科" :value="1"></el-option>
                        <el-option label="博士" :value="2"></el-option>
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
        <div :class="{msgMask:msgMask}">
          <div class="mask"></div>
          <div class="formBox" id="other">
            <div class="title">
              <span class="text">股东与高管</span>
               <el-button size="small"  type="primary"
               
                @click="shareholderSave" style="float:right;">保存</el-button>
            </div>
            
            <div class="formMain " >
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
              <div style="height: 25px;">
                   <el-button size="small"  type="primary" 
                                             
                              @click="seniorExecutiveSave" style="float:right;">保存</el-button>
              </div>
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
                            <el-option :value="1" label="男"></el-option>
                            <el-option :value="2" label="女"></el-option>
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
                                 <el-option label="博士" :value="2"></el-option>
                                  <el-option label="本科" :value="1"></el-option>
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
          <div class="formBox" id="msgInfo">
            <div class="title">
              <span class="text">业务信息</span>
                <el-button size="small"  type="primary" 
                                        
                              @click="busSave" style="float:right;">保存</el-button>
            </div>
            <div class="formMain">
            
              <div class="tableBox ">
                <div class="msg fs12 c999 m-t-20">根据所属的机构类型， 将对应不同的业务信息需要补充填写</div>
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
                <div class="addItem">
                  <el-button icon="el-icon-plus" size="small" @click="addTableItem(4);">新增</el-button>
                </div>
              </div>
              <div class="formBox" id="msgInfo" v-show="qualificationTypeIds.length > 0">
                <div class="title">
                  <span class="text">资格信息</span>
                    <!-- <el-button size="small"  type="primary" 
                                            
                                  @click="busSave(1)" style="float:right;">保存</el-button> -->
                </div>
                <div class="formMain">
                    <el-form :model="ruleForm" ref="ruleForm" label-width="140px" label="left">
                      <el-row class="m-t-20">
                        <el-col :span="24">
                          <el-form-item label="具备投资能力：">
                            <el-checkbox-group v-model="qualityList">
                              <el-checkbox
                                v-for="item in qualificationTypeIds"
                                :label="item.key"
                                :key="item.key"
                                
                              >{{item.val}}</el-checkbox>
                            </el-checkbox-group>
                            <!-- <span  class="hideEle" :class="{editInput:!edit}">{{repForm.licenseType}}</span>
                            <el-input
                              class="hideEle"
                              :class="{editInput:edit}"
                              type="textarea"
                              placeholder="请输入"
                            ></el-input>-->
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="备注：">
                          
                            <el-input
                              v-model="sizeInformationForm.qualiRemark"
                              type="textarea"
                              placeholder="请输入"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 1 -->
                      <el-row v-if="busType==1">
                        <el-col :span="10">
                          <el-form-item label="上年度末受托管理保险资金（亿元）：" label-width="265px">
                          
                            <el-input v-model="scaleInfo.yearInsureFund" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="上年度末受托管理非保险资金（亿元）：" label-width="265px">
                            
                            <el-input v-model="scaleInfo.yearInsureFundNot" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="busType==1">
                        <el-col :span="10">
                          <el-form-item label="上年度末受托管理规模总计（亿元）：" label-width="265px">
                           
                            <el-input v-model="scaleInfo.yearTotalFund" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="上年度末委托投资规模（亿元）：" label-width="265px">
                           
                            <el-input v-model="scaleInfo.yearInvestment" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 2 -->
                      <el-row v-if="busType==2">
                        <el-col :span="10">
                          <el-form-item label="上年度末总资产规模（亿元）：">
                           
                            <el-input v-model="scaleInfo.yearTotalAssets" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="上年度末管理资产规模（亿元）：">
                            
                            <el-input v-model="scaleInfo.yearManagerAssets" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="busType==2">
                        <el-col :span="10">
                          <el-form-item label="上年度末管理保险资金规模（亿元）：">
                            
                            <el-input v-model="scaleInfo.yearInsureFund" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="上年度末委托投资规模（亿元）：">
                            
                            <el-input v-model="scaleInfo.yearInvestFund" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 3 -->
                      <el-row v-if="busType==3">
                        <el-col :span="10">
                          <el-form-item label="上年度末总资产规模（亿元）：">
                            
                            <el-input v-model="scaleInfo.yearTotalAssets" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="上年度末委托投资规模（亿元）：">
                           
                            <el-input  v-model="scaleInfo.yearEntrustedInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 4 -->
                      <el-row v-if="busType==4">
                        <el-col :span="10">
                          <el-form-item label="上年度总资产规模（亿元）：">
                            
                            <el-input v-model="scaleInfo.yearTotalAsset" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="是否开展保险资金托管业务：">
                            
                            <el-input v-model="scaleInfo.flagTrusteeship" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="busType==4">
                        <el-col :span="10">
                          <el-form-item label="上年度末托管保险资金规模(亿元)：">
                           
                            <el-input  v-model="scaleInfo.yearInsureFund" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="外部信用评级等级：">
                            
                            <el-input v-model="scaleInfo.externalCreditRating"  placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 5 -->
                      <el-row v-if="busType==5">
                        <el-col :span="10">
                          <el-form-item label="是否在保监会完成受托管理保险资金备案：">
                            
                            <el-input v-model="scaleInfo.flagCompleteFilin" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="上年度末总资产管理规模（亿元）：">
                            
                            <el-input v-model="scaleInfo.yearTotalInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="busType==5">
                        <el-col :span="10">
                          <el-form-item label="上年度末公募基金规模（亿元）：">
                            
                            <el-input v-model="scaleInfo.publicOfferFund" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="上年度末受托管理保险资金规模(亿元)：">
                         
                            <el-input v-model="scaleInfo.yearInsureFund" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 6 -->
                      <el-row v-if="busType==6">
                        <el-col :span="10">
                          <el-form-item label="是否在保监会完成受托管理保险资金备案：">
                          
                            <el-input  v-model="scaleInfo.flagCompleteFiling" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="上年度末资管业务总资产管理规模（亿元）：">
                           
                            <el-input  v-model="scaleInfo.yearTotalInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="busType==6">
                        <el-col :span="10">
                          <el-form-item label="上年度末受托管理保险资金规模(亿元)：">
                          
                            <el-input v-model="scaleInfo.yearInsureInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 7 -->
                      <el-row v-if="busType==7">
                        <el-col :span="10">
                          <el-form-item label="上年度总资产规模（亿元）：">
                            
                            <el-input v-model="scaleInfo.yearTotalInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="是否保险资金存款行：">
                           
                            <el-input v-model="scaleInfo.flagInsureFundToBank" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="busType==7">
                        <el-col :span="10">
                          <el-form-item label="保险资金存款规模（亿元）：">
                            
                            <el-input v-model="scaleInfo.insureInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 8 -->
                      <el-row v-if="busType==8">
                        <el-col :span="10">
                          <el-form-item label="上年度末总资产管理规模（亿元）：">
                          
                            <el-input v-model="scaleInfo.yearTotalInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="上年度末公募基金规模（亿元）：">
                           
                            <el-input v-model="scaleInfo.publicRaiseFund" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 9 -->
                      <el-row v-if="busType==9">
                        <el-col :span="10">
                          <el-form-item label="上年度末资管业务总资产管理规模（亿元）：">
                            
                            <el-input v-model="scaleInfo.yearTotalManagerInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 10 -->
                      <el-row v-if="busType==10">
                        <el-col :span="10">
                          <el-form-item label="总管理规模（亿元）：">
                            
                            <el-input  v-model="scaleInfo.totalManagerInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item>
                            <el-input v-model="scaleInfo.insureInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="busType==10">
                        <el-col :span="10">
                          <el-form-item label="在管基金数量（只）：">
                            
                            <el-input  v-model="scaleInfo.managerNum" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="涉及保险资金基金数量（只）：">
                           
                            <el-input v-model="scaleInfo.insureNum" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="busType==10">
                        <el-col :span="10">
                          <el-form-item label="员工人数（人）：">
                           
                            <el-input  v-model="scaleInfo.empNum" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 11 -->
                      <el-row v-if="busType==11">
                        <el-col :span="10">
                          <el-form-item label="上年度末总资产规模（亿元）：">
                            
                            <el-input  v-model="scaleInfo.yearTotalInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="busType==11">
                        <el-col :span="10">
                          <el-form-item label="上年度末集合信托存续规模（亿元）：">
                           
                            <el-input  v-model="scaleInfo.yearTrustInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="保险资金投资规模总计（亿元）：">
                           
                            <el-input  v-model="scaleInfo.insureInvest" placeholder="请输入"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                </div>
              </div> 
               <div class="formBox" id="msgInfo">
                  <div class="title">
                    <span class="text">规模信息</span>
                     
                  </div>
                  <div class="formMain">
                    <el-form v-model="sizeInformationForm">
                      <el-row>
                          <el-col :span="11">
                              <el-form-item   label="上年度末受托管理保险资金（亿元)：">
                                  <el-input size="small" placeholder="请输入" 
                                            v-model="sizeInformationForm.yearInsureFund "></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="11" :offset="1">
                              <el-form-item  label="上年度末受托管理规模总计（亿元)：">
                                    <el-input size="small" placeholder="请输入"
                                              v-model="sizeInformationForm.yearTotalFund  "></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="11">
                              <el-form-item  label="上年度末受托管理非保险资金（亿元）：">
                                    <el-input size="small" placeholder="请输入"
                                              v-model="sizeInformationForm.yearInsureFundNot"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="11" :offset="1">
                               <el-form-item  label="上年度末受托管理规模总计（亿元)：">
                                    <el-input size="small" 
                                              placeholder="请输入"
                                              v-model="sizeInformationForm.yearInvestment"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                           <el-col :span="11" >
                               <el-form-item  label="备注：">
                                     <el-input v-model="sizeInformationForm.scaleRemark" size="small" placeholder="请输入" type="textarea" rows="5"></el-input>
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
    </div>
    <!-- <div class="footBtn text_right membership-recognition-application">
      <el-button type @click="saveAllInterFace">保存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </div> -->
  </div>
</template>
<script>

import { mapState } from "vuex";
import {apiSelect} from "../../utils/common";
import { apiBasicMember, apiDic,saveCompanyBasicInfoCommon ,successMES,warnMES} from "../../utils/commonApi";
import { format } from "../../utils/datetime";
import  {linkManAddCommon,saveMemberRepresentativeCommon,saveShareholderCommon,saveSeniorExecutiveCommon,saveBusCommon,setDefaultLinkManCommon,getLinkManListCommon,linkmanDeleteCommon,getShareholderCommon,delShareholderCommon,getSeniorExecutiveListCommon,delSeniorExecutiveListCommon,loadBusinessInformationCommon,getCompanyInfoCommon,getRepCommon,getBusListCommon,loadLicenceTypeCommon} from "./../../http/moudules/member"
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
      sizeInformationForm:{
            yearInsureFundNot:'',
            yearInsureFund:"",
            yearTotalFund:"",
            yearInvestment:"",
            scaleRemark:"",
            qualiRemark:"",
            id:""
          },

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
          licenseType:[{ required: true, message: '请选择证件类型', trigger: 'change' }],
          licenceNum:[{ required: true, message: '请填写证件号码', trigger: 'blur' }],
          publishOrgan:[{ required: true, message: '请填写签发机关', trigger: 'blur' }],
          effectiveDate:[{ required: true, message: '请选择有效期', trigger: 'change' }],
          name:[{ required: true, message: '请填写姓名', trigger: 'blur' }],
          sex:[{ required: true, message: '请选择性别', trigger: 'change' }],
          nativePlaice:[{ required: true, message: '请输入籍贯', trigger: 'blur' }],
          birth:[{ required: true, message: '请选择出生年月', trigger: 'change' }],
          nation:[{ required: true, message: '请输入民族', trigger: 'blur' }],
          highestEducation:[{ required: true, message: '请选择最高学历', trigger: 'change' }],
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

            institutionType: [{ required: true, message: '请选择机构类型', trigger: 'change' }],
            flagHaveCredit: [{ required: true, message: '请选择是否有社会统一信用代码', trigger: 'change' }],
            creditId: [{ required: true, message: '请填写统一社会信用代码', trigger: 'blur' }],
            companyName: [{ required: true, message: '请填写名称', trigger: 'blur' }],
             workAddress: [{ required: true, message: '请填写办公地址', trigger: 'blur' }],
            companyType:[{ required: true, message: '请填选择公司类型', trigger: 'change' }],
            dateBuild:[{ required: true, message: '请填选择成立日期', trigger: 'change' }],
            flagListed:[{ required: true, message: '请填选择是否上市', trigger: 'change' }],
            registeredAddress:[{ required: true, message: '请填写注册地址', trigger: 'blur' }],
            legalRepresentative:[{ required: true, message: '请填写法人代表', trigger: 'blur' }],
            registeredCapital:[{ required: true, message: '请填注册资本', trigger: 'blur' }],
      },
      imageUrl: "",
      urlFront:'service',
      memberForm: {},
      storeMemberForm:{},
      companyForm: {
          "businessScale": 0,
          "companyName": "",
          "companyNameEng": "",
          "companyType": 0,
          "companyWeb": "",
          "creditId": "",
          "dateBuild": "",
          "dateJoin": "",
          "effectiveDateEnd": "",
          "effectiveDateStart": "",
          "flagHaveCredit": 0,
          "flagListed": 2,
          "id": 0,
          "institutionType": 0,
          "legalRepresentative": "",
          "licencePath": "",
          "listAddress": "",
          "memberType": 0,
          "netAssets": 0,
          "registeredAddress": "",
          "registeredCapital": 0,
          "totalAssets": 0,
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
          "highestEducation": 1,
          "licenceNum": "",
          "licenseType": 0,
          "mail": "",
          "name": "",
          "nation": "",
          "nativePlaice": "",
          "officeNum": "",
          "personalDetails": "",
          "politicalAffiliation": "",
          "publishOrgan": "",
          "selfPhone": "",
          "sex": 1,
          "weiChat": "string"
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
      scaleInfo: {},
      storeScaleInfo:{},
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
      scrollTop: 25,
      // companyId:67,
      orgList:[],
      qualificationTypeIds:[]

    };
  },
  computed: {
    ...mapState({
      msgMask: state => state.dialog.msgMask,
      memberMask: state => state.dialog.memberMask,
     
    }),
   
  },
  
  created() {
    /**
     * 展示会员信息
     */
   
       this.initBasicInfo();
    },
  mounted() {
    const scrollBox = document.getElementById("iframeContainer");
    this.$store.state.app.hasFoot = true;
    scrollBox.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    saveAllInterFace(){
         this.saveCompanyInfo();
         this.linkmanSave()
         this.shareholderSave()
         this.memberRepresentativeSave()
         this.seniorExecutiveSave()
         this.busSave()
    }, 
    initBasicInfo(){
        apiDic("qualityType", {}).then(resolve => {
          this.quality = resolve;
        });
        apiSelect({ type: 1 }, this.orgList); //机构类型
        this.quertLinkManList();
        this.queryShareholder();
        this.querySeniorExecutiveList();
        this.getBusinessInformation();
        getCompanyInfoCommon().then(rep=>{
            if(rep && rep.code=="200" ){
              this.companyForm=rep.data || {};
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
             return;
            } 
             saveSeniorExecutiveCommon(this.editSeniorTable).then(rep=>{
                  if(rep && rep.code=='200'){
                    this.querySeniorExecutiveList();
                    successMES('新增成功');
                  }
             }).catch(error=>{
                
             })
         
    },
    busSave(){
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
          if(this.qualityList.length==0 && this.qualificationTypeIds.length > 0){
               warnMES("资格信息必填");
               return
          }
          let params={departmentInfoList:this.editBusTable,qualificationTypeIds:this.qualityList,...this.sizeInformationForm}
          saveBusCommon(params).then(rep=>{
                  if(rep && rep.code=='200'){
                    successMES('新增成功');
                    this.getBusinessInformation();
                  }
             }).catch(error=>{
                 
             })
    },
    format,
    saveCompanyInfo(formName){
         this.$refs[formName].validate((valid) => {
          if (valid) {
              saveCompanyBasicInfoCommon(this.companyForm).then(rep=>{
                if(rep && rep.code=='200'){
                  successMES('新增成功');
                  
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
            if(this.editShareTable.length==0){
                warnMES('请先添加数据');
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
                      this.queryShareholder();
                      successMES('新增成功');
                    
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
               
               return;
            }
            linkManAddCommon(this.editContactTable).then(rep=>{
                  if(rep && rep.code=='200'){
                    this.quertLinkManList();
                    successMES('新增成功');
                     
                      
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
                    successMES('新增成功');;
                 
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
              this.sizeInformationForm.yearInsureFundNot=rep.data.yearInsureFundNot;
              this.sizeInformationForm.yearInsureFund=rep.data.yearInsureFund;
              this.sizeInformationForm.yearTotalFund=rep.data.yearTotalFund;
              this.sizeInformationForm.yearInvestment=rep.data.yearInvestment;
              this.sizeInformationForm.scaleRemark=rep.data.scaleRemark;
              this.sizeInformationForm.qualiRemark=rep.data.qualiRemark;
              this.sizeInformationForm.id=rep.data.id;

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
              shareholderTypeVal:'',
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
    beforeAvatarUpload() {}
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