<template>
  <div style="width: 100%; height: 100%;">
    <div style="width: 100%; ">
      <!-- 以MultiPart方式下载文档,设置文件处理Servelet，打开和保存都用这个Servelet处理 -->
      <!-- <input style="color:Red;" type=button value="MultiPart方式打开文档" onclick="OnUnLoad();Load()">-->
      <!-- URL地址打开文档，WebOpen2的参数是文件在服务的相对路径-->
      <!-- <input style="color:Red;" type=button value="URL地址打开文档" onclick="OnUnLoad();LoadURL()"> -->
      <!-- 服务端Servlet打开文档，WebOpen3的参数是文件在服务器上的相对路径 -->
      <input style="color:Red;" type="button" value="服务端Servlet打开文档" @click="LoadServlet()" />
      <input style="color:Red;" type="button" value="保存文档到服务器" @click="SaveDocument();" />
      <!-- <input style="color:Red;" type=button value="打开本地文档(有窗口)" onclick="WebOfficeObj.WebOpenLocal()">
      <input style="color:Red;" type=button value="保存本地文档(有窗口)" onclick="WebOfficeObj.WebSaveLocal()">-->
      <input style="color:Red;" type="button" value="前后台交互信息" @click="SendMessage()" />
      <input id="StatusBar" type="text" name="StatusBar" readonly style="width:40%;color:Red;" />&nbsp;|←状态信息
    </div>

    <div id="signatureModal" style="width: 100%; height: 100%;"></div>
    <div id="OfficeDiv" style="width: 100%; height: 100%;"></div>
  </div>
</template>

 <script>
import global from "@/utils/global";
import browser from "@/assets/js/iWebOffice_jQuery/iWebOffice2015";
import WebOffice2015 from "@/assets/js/iWebOffice_jQuery/WebOffice";
const WebOfficeObj = new WebOffice2015(); //创建WebOffice对象
const ServerUrl = "http://localhost:8080/iWebOffice2015.JSP-V2.1"; //后台的url走接口
const mSessionID = "F6AC09A770257308438E72E06F701321";
export default {
  name: "Signature",

  data() {
    return {};
  },
  created() {
    console.log(browser);
    let x = document.cookie;

    this.$nextTick(() => {
      this.loadHtml();
    });
  },
  methods: {
    loadHtml() {
      let self = this;
      let strObj = "";
      let copyright =
        "金格科技iWebOffice2015智能文档中间件[演示版];V5.0S0xGAAEAAAAAAAAAEAAAAJ8BAACgAQAALAAAAPfx4cnr7n2wjo/4SpF61QY7nXOgBBDO6Jy5KlTSFqJqypb3pQghCXHbaaTyOX9kkpOrk0VkKiZ4ZmVvyEagEkyVHA3sgitPuGyLdLq5XNAqPAwBDPlZRT6JuiBALojluntS9ePtB9NO5fDsv5b1vUbeHm0RAYW47UKyppnYZ/v7k9HEdSlTmM+04FexHI7fJU89x3hySglu/pQyWmskSsDcxqLLiWNJ1Lt6HnBTTmbfqBGImQndkAPMz4UIDLUc0KrrVyrlx4SEPxUrN4HshfKKn4N6haPZsDX9L6R7bGS3MBkRArFJ+mUcGZPyx+V0N5ZQHugbl9XiBB9ry/ldP3oh8FdRHu8QCnkT7oAymJ6b98ujQh8nLFe3drQM2r3dPt0I8UUMQgOGvGHNDT72tl5ylusGNeXf2pg5W3ViOvPSwNiGseZ+A8PD6BPIl+MOw9mP+pebfqDYLUhUmrDFg67PoNbHxMrKTYBDfm1VnwdN534EhtKh0T/+LYNWukWDg5o2xuhMDKzpozs+FpOouApA2egseM1izQLLViFa6D7YPVXJ1mbb29W5raldlhhU9g==";
      strObj += '<object id="WebOffice" ';

      strObj += ' width="100%"';
      strObj += ' height="100%"';

      if (
        window.ActiveXObject != undefined ||
        window.ActiveXObject != null ||
        "ActiveXObject" in window
      ) {
        if (window.navigator.platform == "Win32")
          strObj +=
            ' CLASSID="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"  codebase="../../iWebOffice2015.cab#version=0,0,0,0"';
        if (window.navigator.platform == "Win64")
          strObj +=
            ' CLASSID="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D024"  codebase="../../iWebOffice2015.cab#version=0,0,0,0"';
        strObj += ">";
        strObj += '<param name="Copyright" value="' + copyright + '">';
      } else if (browser == "chrome") {
        strObj += ' clsid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"';
        strObj += ' type="application/kg-plugin"';
        strObj += ' OnReady="OnReady"';
        strObj += ' OnCommand="OnCommand"';
        strObj += ' OnRightClickedWhenAnnotate="OnRightClickedWhenAnnotate"';
        strObj += ' OnSending="OnSending"';
        strObj += ' OnSendEnd="OnSendEnd"';
        strObj += ' OnRecvStart="OnRecvStart"';
        strObj += ' OnRecving="OnRecving"';
        strObj += ' OnRecvEnd="OnRecvEnd"';
        strObj += ' OnFullSizeBefore="OnFullSizeBefore"';
        strObj += ' OnFullSizeAfter="OnFullSizeAfter"';
        strObj += ' Copyright="' + copyright + '"';
      } else if (browser == "firefox") {
        strObj += ' clsid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"';
        strObj += ' type="application/kg-activex"';
        strObj += ' OnCommand="OnCommand"';
        strObj += ' OnReady="OnReady"';
        strObj += ' OnOLECommand="OnOLECommand"';
        strObj += ' OnExecuteScripted="OnExecuteScripted"';
        strObj += ' OnQuit="OnQuit"';
        strObj += ' OnSendStart="OnSendStart"';
        strObj += ' OnSending="OnSending"';
        strObj += ' OnSendEnd="OnSendEnd"';
        strObj += ' OnRecvStart="OnRecvStart"';
        strObj += ' OnRecving="OnRecving"';
        strObj += ' OnRecvEnd="OnRecvEnd"';
        strObj += ' OnRightClickedWhenAnnotate="OnRightClickedWhenAnnotate"';
        strObj += ' OnFullSizeBefore="OnFullSizeBefore"';
        strObj += ' OnFullSizeAfter="OnFullSizeAfter"';
        strObj += ' Copyright="' + copyright + '"';
        strObj += ">";
      }
      strObj += "</object>";
      $("#signatureModal").html(strObj);
      WebOfficeObj.setObj(document.getElementById("WebOffice")); //给2015对象赋值
      setTimeout(function() {
        self.Load();
      }, 500);
      // document.getElementById("signatureModal").write(strObj);
      if (
        window.ActiveXObject != undefined ||
        window.ActiveXObject != null ||
        "ActiveXObject" in window
      ) {
      } else {
        if (browser == "firefox") {
          if (version < "52") {
            let fireFoxType = navigator.mimeTypes["application/kg-activex"];
            if (fireFoxType == undefined) {
              document.getElementById("WebOffice").width = "1px";
              let str =
                '<div width="100%" height="100%" style="text-align:center; color: red;font-size:30px;" >该插件不受支持</br>点击跳转解决方案</div>';
              let t = document.getElementById("OfficeDiv");
              t.innerHTML = t.innerText + str;
            }
          } else {
            document.getElementById("WebOffice").width = "1px";
            let str =
              '<div width="100%" height="100%" style="text-align:center;color: red;font-size:30px;" >该插件不受支持</br>请更换52版本以下的FireFox浏览器</div>';
            let t = document.getElementById("OfficeDiv");
            t.innerHTML = t.innerText + str;
          }
        } else if (browser == "chrome") {
          let kgchromeType = navigator.mimeTypes["application/kg-plugin"]; //高级版
          let chromeType = navigator.mimeTypes["application/kg-activex"]; //标准版
          let oldChromeType = navigator.mimeTypes["application/iWebPlugin"]; //早期淘汰版本
          if (
            document.getElementById("WebOffice").type == "application/kg-plugin"
          ) {
            if (kgchromeType == undefined) {
              document.getElementById("WebOffice").width = "1px";
              let str =
                '<div width="100%" height="100%" style="text-align:center; color: red;font-size:30px;" >该插件不受支持</br>引用的是高级版控件</br></div>';
              let t = document.getElementById("OfficeDiv");
              t.innerHTML = t.innerText + str;
              //window.open("Faq002.html");
            }
          } else {
            if (version > "45") {
              if (chromeType == undefined || oldChromeType == undefined) {
                document.getElementById("WebOffice").width = "1px";
                let str =
                  '<div width="100%" height="100%" style="text-align:center;color: red;font-size:30px;" >该插件不受支持</br>引用的是标准版控件</br></div>';
                let t = document.getElementById("OfficeDiv");
                t.innerHTML = t.innerText + str;
              }
            } else {
              document.getElementById("WebOffice").width = "1px";
              let str =
                '<div width="100%" height="100%" style="text-align:center;color: red;font-size:30px;" >标准版插件不受支持</br>请更换45版本以下的Chrome浏览器</br>如果需要使用高版本Chrome浏览器,需集成高级版插件</div>';
              let t = document.getElementById("OfficeDiv");
              t.innerHTML = t.innerText + str;
            }
          }
        }
      }
    },
    Load() {
      try {
        WebOfficeObj.ServerUrl = ServerUrl;
        WebOfficeObj.UserName = "演示人";
        WebOfficeObj.FileName = "sample.xlsx";
        WebOfficeObj.FileType = ".doc"; //FileType:文档类型  .doc  .xls
        WebOfficeObj.ShowWindow = true; //true显示进度条//false隐藏进度条
        WebOfficeObj.obj.Style.ShowOpenProgress = true; //开启、关闭打开文档时的进度条

        WebOfficeObj.obj.FuncExtModule.FileType = WebOfficeObj.FileType;
        WebOfficeObj.obj.FuncExtModule.WebCreateProcess(); //创建空进程优化打开慢

        WebOfficeObj.EditType = "1"; //设置加载文档类型 0 锁定文档，1无痕迹模式，2带痕迹模式
        WebOfficeObj.ShowMenu = 0;
        WebOfficeObj.ShowToolBar = 0;
        // WebOfficeObj.SetCaption(WebOfficeObj.UserName + "正在编辑文档");
        this.SetGraySkin(); //设置控件皮肤
        if (browser == "chrome") {
          // 下载文件时访问OfficeServer与其他网页页面session保持一致的说明 （开始）
          // 为了让/OfficeServer这个Servlet和浏览器的其他页面保持session一致，需要在访问OfficeServer之前把其他页面的cookie发送到服务端去，通过调用
          // INetSetCookie方法，参数是服务器url和cookie值
          let MyCookie = "JSESSIONID=" + mSessionID;
          WebOfficeObj.INetSetCookie(WebOfficeObj.ServerUrl, MyCookie);
          //WebOfficeObj.INetSetCookie(WebOfficeObj.ServerUrl, document.cookie);
          // 但如果浏览器设置了禁止cookie，那么document.cookie则获取不到有效cookie值，这时候可以通过在客户端创建一个
          // 跟cookie内容值一样的字符串，再把这个字符串当成cookie发送给服务器，也能实现session保持一致
          // 创建的字符串是这样的形式：JSESSIONID=XXXXXXXXXXXXXXXXXXXXXX,
          // XXXX...XXX是服务端的sessionid，可以通过jsp变量的形式发送给客户端
          // varMyCookie = "JSESSIONID=" + "<%=mSessionID%>";
          // WebOfficeObj.INetSetCookie(WebOfficeObj.ServerUrl, varMyCookie);
          // 下载文件时访问OfficeServer与其他网页页面session保持一致的说明 （结束）
        }
        if (WebOfficeObj.WebOpen()) {
          this.StatusMsg(WebOfficeObj.Status);
        }
      } catch (e) {
        this.StatusMsg(e.description);
      }
    },
    LoadURL() {
      try {
        WebOfficeObj.ServerUrl = ServerUrl; //服务器地址
        WebOfficeObj.ShowMenu = 0;
        WebOfficeObj.ShowToolBar = 0;
        this.SetGraySkin(); //设置控件皮肤
        if (WebOfficeObj.WebOpen2("/")) {
          // 文件在服务器上的相对路径 FileName
          this.StatusMsg(WebOfficeObj.Status);
        }
      } catch (e) {
        this.StatusMsg(e.description);
      }
    },
    LoadServlet() {
      try {
        this.OnUnLoad();
        debugger;
        WebOfficeObj.ServerUrl = ServerUrl; // 用来保存文件的Server
        let downloadLink =
          ServerUrl /* + "FileDownload?FileName=" */ + "/Document/2.doc";
        WebOfficeObj.ShowMenu = 0;
        WebOfficeObj.ShowToolBar = 0;
        this.SetGraySkin(); //设置控件皮肤
        if (WebOfficeObj.WebOpen3(downloadLink)) {
          // 文件在服务器上的相对路径 FileName
          this.StatusMsg(WebOfficeObj.Status);
        }
      } catch (e) {
        this.StatusMsg(e.description);
      }
    },
    SaveDocument() {
      WebOfficeObj.FileName = "2.doc";
      WebOfficeObj.FileType = ".doc";
      if (WebOfficeObj.WebSave()) {
        //交互OfficeServer的OPTION="SAVEFILE"
        WebOfficeObj.WebClose();
        window.close();
      } else {
        WebOfficeObj.Alert(WebOfficeObj.Status);
        this.StatusMsg(WebOfficeObj.Status);
      }
    },
    StatusMsg(mValue) {
      try {
        document.getElementById("StatusBar").value = mValue;
      } catch (e) {
        return false;
      }
    },
    SetGraySkin() {
      //参数顺序依次为：控件标题栏颜色、自定义菜单开始颜色、自定义工具栏按钮开始颜色、自定义工具栏按钮结束颜色、
      //自定义工具栏按钮边框颜色、自定义工具栏开始颜色、控件标题栏文本颜色（默认值为：0x000000）
      if (
        !WebOfficeObj.WebSetSkin(
          0xdbdbdb,
          0xeaeaea,
          0xeaeaea,
          0xdbdbdb,
          0xdbdbdb,
          0xdbdbdb,
          0x000000
        )
      )
        WebOfficeObj.Alert(WebOfficeObj.Status);
    },
    OnUnLoad() {
      WebOfficeObj.WebClose();
    },
    SendMessage() {
      //如果非ie浏览器调用HidePlugin隐藏插件避免窗体被遮挡
      WebOfficeObj.HidePlugin(0);
      let info = window.prompt(
        "请输入要传到服务器处理页面上的内容:",
        "参数内容"
      );
      if (info == null) {
        return false;
      }
      WebOfficeObj.WebSetMsgByName("TESTINFO", info); //USERNAME在后获取
      if (WebOfficeObj.WebSendMessage()) {
        // 交互信息为INPORTTEXT
        WebOfficeObj.Alert(WebOfficeObj.WebGetMsgByName("RETURNINFO")); //USERNAME值为对应后台的key
      } else {
        WebOfficeObj.Alert("客户端Web发送数据包命令没有合适的处理函数");
      }
      WebOfficeObj.HidePlugin(1);
    }
  }
};
</script>
<style>
#WebOffice {
  margin-top: 20px;
}
</style>

