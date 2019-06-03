//数据类型【{x0,y0,x1,y1,angle,cvsId}】 
var centerCon = [];//中心点Type=A
var characCon = [];//细节特征Type=B  
var lTriCon = [];//左三角Type=C  【obj】  obj.x,obj,y
var rTriCon = [];//右三角Type=D...【obj】  obj.x,obj,y
var downCenterCon = [];//下中心Type=E  【obj】  obj.x,obj,y
var fingerDirCon = [];//指纹方向Type=F 【angle】

var AcenterConId = "";//页面保存特征数据html元素的id
var BcharacterConId = "";
var ClTriConId = "";
var DrTriConId = "";
var EdownCenterConId = "";
var FfingerDriConId = "";
var Type;

/*=========画布初始化参数========================================*/
var WIDTH_ = 0;
var HEIGHT_ = 0;
var CVSCONT_WIDTH = 0;
var CVSCONT;//画布容器
var INITID;
var MNT_CVS_CONTAINER_ID = 'AFIS_FINGER_DIV';
var ICON_CONT_WIDTH = '168';//调节图标栏的宽度。
var ICON_SIZE = 40;//css中图标的宽高
var IFSAVE = true;//true 默认是 可以保存特征

/*=========画笔==================================================*/
var tmp_x = 0;//存放画笔起始点
var tmp_y = 0;
var mntIdIndex = 0;//细节特征id下标
var angle;
var preCanvasId;

/*========特征参数===============================================*/
var TRI_LENGTH = 1652;//【捺印平面或者滚动指纹的特征数据长度是1652】
var FINGER_MINUTIA_NUM = 200;
var CI = 10 //置信度 Confidence interval
var FINGER_MNT_TYPE = 0;// 特征点类型或其它 保留
var POSITION = 0;
var MINUTIA_NUM = 0;
var MNTVERSION = 0;
var FINGER_WIDTH = 640;
var FINGER_HEIGHT = 640;
//纹型
var	FINGER_MNTRP_UNDET = 0;		/* 不确定 */
var	FINGER_MNTRP_ARCH = 1;		/* 弓型  */
var	FINGER_MNTRP_LEFTLOOP = 2;		/* 左箕 */
var	FINGER_MNTRP_RIGHTLOOP = 3;		/* 右箕 */
var	FINGER_MNTRP_WHORL = 4;	    /* 斗  */

var RP = 0;//指纹纹型
var WHORLTYPE = 0;//斗型旋转方向
var RP0 = 0;//指纹副纹型
var WHORLTYPE0 = 0;
var SCAR = 0;
// 0-不定
// 1-有伤疤
// 2-无伤疤
var CFRP = 0;//纹型置信度
var CFRP0 = 0;

/*=========功能函数==================================================*/

function initCvsArg(){
   /*原控件参数
   	*dbid,pid,barcode,pid,index,
	*eval("document."+ocxname+index+".ImageStream"),//显示控件的图像参数，将图像显示到编辑控件
	*type,
	*url,//编辑图像特征的链接
	*mnttype,
	*editunit,
	* edituser
	* */
	//web端页面需要初始化的画布参数
	var barcode = "";			
	var imgUrl = "img/1.bmp";//实际使用：eval("document."+ocxname+index+".ImageStream")
	var mntUrl = "";
	var cvscontIdName = "afis-mnt-cvsCont";//将原来的zwgd修改为自己的id ="afis-mnt-cvsCont"
	var dbid = "";			
	var pid = "";			
	var index = "";			
	var mnttype = "";	
	var saveLimit  = true;//默认允许保存特征
   	initCanvas(barcode,imgUrl,mntUrl,cvscontIdName);
}

/**
 *编辑控件web端personEdit.js初始化画布参数:::
 * barcode：
 * imgUrl:图片数据来源【显示控件拿到到的是后端的byte数组，通过显示控件eval("document."+ocxname+index+".ImageStream")获得base64字符串】
 * mntUrl：特征数据【后端返回的是byte数组】
 * cavConId:画布id 原zwgd的div id名 
 * dbid：
 * pid：
 * index：
 * mnttype:
 * saveLimit：
 */
var initCanvas = function(barcode,imgUrl,mntUrl,cavConId){
	document.getElementById(cavConId).className = 'cvsCont_AFIS_Css';
	var cvsCon = document.getElementById(cavConId);
	var cssVal = document.defaultView.getComputedStyle(cvsCon,null);
	this.CVSCONT_WIDTH  = cssVal.width;
	this.HEIGHT_ = cssVal.height;
	this.WIDTH_  = this.HEIGHT_;
	
	/*var tempObj = document.getElementById(cavConId);
	var width = window.screen.availWidth-390;//获取分辨率-宽
	var height = window.screen.availHeight-90;//获取分辨率-高
	tempObj.style.left = "206px";
	tempObj.style.width = (width-2);
	tempObj.style.height = (height);*/
	
	var imgId = "my_finger_mnt";
	var ef = addFingerImgCvs(cavConId,imgId);
	if(!ef){
		return;
	}
	var canvas = document.getElementById(imgId);//获取指纹画布
    var cxt0 = canvas.getContext("2d");
    var img = new Image();
	img.src = imgUrl;
	/*img.crossOrigin = '';
    imgUrl = getBase64Image(img);
    img.src = imgUrl;//添加编辑的指纹图像【实际环境为从控件获取的base64的字符串数据】*/
	img.onload=function() {
        cxt0.drawImage(img, 0, 0);
    };

	//TODO 初始化画布参数
    var allData = mntUrl;
    var initIdName = "character";//用于构建特征画布id值
    initMntArg(canvas.width,canvas.height,cavConId,initIdName,allData);
    //创建图标
    createIconDiv();
};

//初始化画布参数
var initMntArg = function(w,h,cvscontId,initIdName,alldata){
	this.WIDTH_ = w;
	this.HEIGHT_ = h;
	this.CVSCONT = cvscontId;
	this.INITID = initIdName;
	for(var i = 0 ;i < alldata.length;i++){
		var obj = alldata[i];
		//TODO 由于接收到的展示数据格式和自定义的不一致，待设计  //alldata:【[A,centerCon],[B,characterCon]...】
		/*if(obj[0]=="A"){
			this.centerCon = obj[1];
		}
		if(obj[0]=="B"){
			this.characCon = obj[1];
		}
		if(obj[0]=="C"){
			this.lTriCon = obj[1];
		}
		if(obj[0]=="D"){
			this.rTriCon = obj[1];
		}
		if(obj[0]=="E"){
			this.downCenterCon = obj[1];
		}
		if(obj[0]=="F"){
			this.fingerDirCon = obj[1];
		}*/
	}
	//取消画布的右击事件
	document.getElementById(this.CVSCONT).oncontextmenu = function(e){
	　　return false;
	}
}

var createIconDiv = function(){
    var div = document.createElement("div");
	
	//为div创建属性class = "test"
	var divattr = document.createAttribute("class");
	divattr.value = "IconContainer_AFIS_Class";
	
	//为div创建属性id = "IconContainer_AFIS"
	var divIdattr = document.createAttribute("id");
	divIdattr.value = "IconContainer_AFIS_Id";
	
	//把属性class = "test"添加到div
	div.setAttributeNode(divattr);
	div.setAttributeNode(divIdattr);
	
	//为div添加样式
	var style = document.createAttribute("style");
	div.setAttributeNode(style);
	div.style.width = this.ICON_CONT_WIDTH + "px";
	div.style.height = this.HEIGHT_+ "px";
	div.style.float = "right";
	div.style.display = "block";
	div.style.padding = "0px";
	div.style.border = "solid 1px #C0C0C0";
	//把div追加到父级
	var fingerEle = document.getElementById(CVSCONT);
	fingerEle.appendChild(div);
	addIcon("IconContainer_AFIS_Id");
}

var addIcon = function(divId){
	showType(divId);
	
	showDrawMntIcon(divId);
	
	showAuxiIcon(divId);
	
	var showPos = '<label style="float:left;">X：<span id="mp_x"></span> </label>   <label style="float:left; margin-left:6px;">Y：<span id="mp_y"></span></label>';
	$("#"+divId).append(showPos);
}

var showType = function(divId){
	var div1Id = 'typeIconDivId1';
	var div1 = "<div id = '"+div1Id+"'>";
	$("#"+divId).append(div1);
	
	var btn1 = '<button id ="arc_Id"    class = "afis_button_class" onclick="getType(this,1) "title="弓型" value="1" />';
	$("#"+div1Id).append(btn1);
	
	var btn2 = '<button id ="lloop_Id"  class = "afis_button_class" onclick="getType(this,1) "title="左箕" value="2" />';
	$("#"+div1Id).append(btn2);
	
	var btn3 = '<button id ="rloop_Id"  class = "afis_button_class" onclick="getType(this,1) "title="右箕" value="3" />';
	$("#"+div1Id).append(btn3);
	
	var btn4 = '<button id ="whorl_Id"  class = "afis_button_class" onclick="getType(this,1) "title="斗" value="4" />';
	$("#"+div1Id).append(btn4);
	
	var btn41 = '<button id ="sundry_Id" class = "afis_button_class" onclick="getType(this,1) "title="杂型" value="0" />';
	$("#"+div1Id).append(btn41);
	
	var div1End = "</div>";
	$("#"+divId).append(div1End);
	
	//第二组
	var div2Id = 'typeIconDivId2';
	var div2 = "<div id = '"+div2Id+"'>";
	$("#"+divId).append(div2);
	
	var btn5 = '<button id ="arc_Id1"   class = "afis_button_class" onclick="getType(this,2) "title="弓型" value="1" />';  
	$("#"+div2Id).append(btn5);                                                                                             
	                                                                                                                        
	var btn6 = '<button id ="lloop_Id1" class = "afis_button_class" onclick="getType(this,2) "title="左箕" value="2" />';    
	$("#"+div2Id).append(btn6);                                                                                             
	                                                                                                                        
	var btn7 = '<button id ="rloop_Id1" class = "afis_button_class" onclick="getType(this,2) "title="右箕" value="3" />';    
	$("#"+div2Id).append(btn7);                                                                                             
	                                                                                                                        
	var btn8 = '<button id ="whorl_Id1" class = "afis_button_class" onclick="getType(this,2) "title="斗" value="4" />';     
	$("#"+div2Id).append(btn8);                                                                                             
	                                                                                                                        
  	var btn81 = '<button id ="sundry_Id1"  class = "afis_button_class" onclick="getType(this,2) "title="杂型" value="0" />';   
	$("#"+div2Id).append(btn81);
	
	var div2End = "</div>";
	$("#"+divId).append(div2End);
	
	//纹型
	var div2Id = 'ridgeIconDivId';
	var div1 = "<div id = '"+div2Id+"'>";
	$("#"+divId).append(div1);
	
	$("#"+div2Id).append('主纹型:<input type="checkbox" id="priRidgePat" onclick="getRPVal(this,1)" value="10"/><label>10</label>');
	$("#"+div2Id).append('<br>副纹型:<input type="checkbox" id="subRidgePat" onclick="getRPVal(this,2)" value="10"/><label>10</label>');
	$("#"+div2Id).append('<br>伤'+getNB()+'疤:<input type="checkbox" id="scar" onclick="getScarVal()"/><label id = "scarLable">无伤疤</label>');
	
	var div2End = "</div>";
	$("#"+divId).append(div2End);
	
}

var getNB = function(){
	if(browserVersion() == "IE" || browserVersion() == "Edge"){
    	return "&nbsp;&nbsp;&nbsp;&nbsp;";
    }else{
    	return "&nbsp;";
    }
}

var getRPVal = function(obj,t){
	var val = obj.value;
	if(t == 1){
		CFRP = val;
	}else{
		CFRP0 = val;
	}
}

var scarCou = 0;
var getScarVal = function(){
	var chkbox = document.getElementById("scar");
	var sclb = document.getElementById("scarLable");
	if(scarCou == 0){//--有伤疤
		chkbox.indeterminate = false;
   		chkbox.checked = true;
   		sclb.innerHTML="有伤疤";
   		SCAR = 1;
	}else if(scarCou == 1){//--不确定 
    	chkbox.indeterminate = true;
    	sclb.innerHTML="不确定";
    	SCAR = 0;
	}else{//--无伤疤
		chkbox.indeterminate = false;
    	chkbox.checked = false;
    	sclb.innerHTML="无伤疤";
    	SCAR = 2;
	}
	if(scarCou > 1){
		scarCou = 0;//置0
	}else{
		scarCou+=1;	
	}
}

var showDrawMntIcon = function(divId){
	var div1Id = 'characterIconDivId';
	var div1 = "<div id = '"+div1Id+"'>";
	$("#"+divId).append(div1);
	
	var centerIconEle = '<button id ="drawCenter" class = "afis_button_class" onclick="drawCenterFn() "title="标注中心" />';
	$("#"+div1Id).append(centerIconEle);
	
	var downCenterEle = '<button id="drawDownCen" class = "afis_button_class" onclick="drawDownCenFn()" title="下中心"/>';
	$("#"+div1Id).append(downCenterEle);
	
	var LtriIconEle = '<button id="drawLTri" class = "afis_button_class" onclick="drawLeftTriFn()" title="左三角"/>';
	$("#"+div1Id).append(LtriIconEle);
	
	var RtriIconEle = '<button id="drawRTri" class = "afis_button_class" onclick="drawRightTriFn()" title="右三角"/>';
	$("#"+div1Id).append(RtriIconEle);
	
	var characterIconEle = '<button id ="drawCharacter" class = "afis_button_class" onclick="drawCharacterFn()" title="细节特征"/>';
	$("#"+div1Id).append(characterIconEle);
	
	var fingerDirEle = '<button id="drawFingerDir" class = "afis_button_class" onclick="drawFingerDirFn()" title="指纹方向"/>';
	$("#"+div1Id).append(fingerDirEle);
	
	var div1End = "</div>";
	$("#"+divId).append(div1End);
}

var showWhorlType = function(id){
	var div1Id = "typeIconDivId"+id;
	var btn2 = '<button id ="n_whorl" name = "whorlName'+id+'" class = "afis_button_class" onclick="getWhorlType(this,'+id+') "title="不确定斗" value="0" />';
	$("#"+div1Id).append(btn2);
	
	var btn3 = '<button id ="l_whorl" name = "whorlName'+id+'" class = "afis_button_class" onclick="getWhorlType(this,'+id+') "title="正旋斗" value="1" />';
	$("#"+div1Id).append(btn3);
	
	var btn4 = '<button id ="r_whorl" name = "whorlName'+id+'" class = "afis_button_class" onclick="getWhorlType(this,'+id+') "title="反旋斗" value="2" />';
	$("#"+div1Id).append(btn4);
}

var hideWhorlType = function(id){
	var name = "whorlName"+id;
	var obj = document.getElementsByName(name);
	for (var i = obj.length-1; i >=0;i--){
		var obj_  = obj[i];
		if(document.body.contains(obj_)){
			obj_.parentNode.removeChild(obj_);	
		}
	}
}

var getType = function(obj,t){
	var val = obj.value;
	if(t == 1){
		RP = val;
		if(val == 4){
			var name = "whorlName"+t;
			var obj_ = document.getElementsByName(name);//多个button
			var len = obj_.length;
			if(len<=0){
				showWhorlType(t);
			}else{
				hideWhorlType(t);
			}
		}else{
			hideWhorlType(t);
		}
	}else if(t == 2){
		RP0 = val;
		if(val == 4){
			var name = "whorlName"+t;
			var obj_ = document.getElementsByName(name);//多个button
			var len = obj_.length;
			if(len<=0){
				showWhorlType(t);
			}else{
				hideWhorlType(t);
			}
		}else{
			hideWhorlType(t);
		}
	}
	exchangeStyle(obj);
}

var getWhorlType  = function(obj,t){
	var val = obj.value;
	if(t == 1){
		WHORLTYPE = val;
	}else if(t == 2){
		WHORLTYPE0 = val;
	}
	exchangeStyle(obj);
}

var exchangeStyle = function(obj){
	var childrenNodes = obj.parentNode.childNodes;
	for (var i = 0; i <childrenNodes.length; i++) {
		if(childrenNodes[i] == obj){
			childrenNodes[i].style.borderColor="#D3D3D3";
		}else{
			childrenNodes[i].style.borderColor="#808080";//恢复原来的样式
		}
	}
}

var showAuxiIcon = function(divId){
	var div1Id = 'auxiliaryIconDivId';
	var div1 = "<div id = '"+div1Id+"'>";
	$("#"+divId).append(div1);
	
	var saveMntIconEle = '<button id="saveMnt" class = "afis_button_class" onclick="saveMntFn()" title="保  存" />';
	$("#"+div1Id).append(saveMntIconEle);
	
	var div1End = "</div>";
	$("#"+divId).append(div1End);
}

function intToByte(val){//int 转 bytes数组
	var reg= /^[A-Za-z]+$/;
	var res ;
	if (reg.test(val)){//判断是否符合正则表达式
		res = val.charCodeAt();
	}else{
		res = parseInt(val);
	}
	var targets = new Array(2);
	targets[0] = (res & 0xff);// 最低位
	targets[1] = ((res >> 8) & 0xff);// 次低位
	return targets;
}

 String.prototype.endWith=function(endStr){
  var d=this.length-endStr.length;
  return (d>=0&&this.lastIndexOf(endStr)==d);
}
 
//在开始下一次鼠标点击事件前，解除鼠标事件的绑定
var mousedownFn; //鼠标按下句柄
var mouseupFn; 
var mouseoverFn; 
function unbindKey(){
	//$(canvId).unbind(event,method);
	//console.log("解除所有特征画布的绑定！")
	$(".character").unbind("mousedown",mousedownFn);
	$(".character").unbind("mouseup",mouseupFn);
	$(".character").unbind("mouseup",mouseoverFn);
}

//画布显示鼠标的图标样式
var showIco = function(icnUrl){
	/*$("#"+this.MNT_CVS_CONTAINER_ID).attr({style:"cursor:url("+icnUrl+"),auto"});*/
	$("#"+this.MNT_CVS_CONTAINER_ID).css("cursor",'url('+icnUrl+'),auto');
}

var pasXml = function(xmlStr){
	//创建文档对象
	var parserStr=new DOMParser();
	var xmlDoc=parserStr.parseFromString(str,"text/xml");
	//TODO 根据实际的参数解析
	var country = xmlDoc.getElementsByTagName('country')[0].textContent;//xmlDoc.getElementsByTagName('country')得到的是该节点所有的元素.单个元素时是有下标0来取值
	var director = xmlDoc.getElementsByTagName('director')[0].textContent;
	var name = xmlDoc.getElementsByTagName('name')[0].textContent;
	tis.IFSAVE = xmlDoc.getElementsByTagName('ifsave')[0].textContent;
	
	
	console.log("country=="+country);
	console.log("director=="+director);
	console.log("name=="+country);
	/*var countrys = xmlDoc.getElementsByTagName('country');
	var arr = [];
	for (var i = 0; i < countrys.length; i++) {
		arr.push(countrys[i].textContent);
	};*/
}

//==========================点击事件==============================================

function drawCenterFn(){
	var icoUrl = "img/center1.ico";
	/*if(ifPalm){
		return;
	}*/
	var centerData = drawCenter(icoUrl);
}

function drawCharacterFn(){
	var icoUrl = "img/character1.ico";
	var characterData = drawCharacter(icoUrl);
}

function drawLeftTriFn(){
	var icoUrl = "img/Ltri1.ico";
	var characterData = drawLeftAngle(icoUrl);
}

function drawRightTriFn(){
	var icoUrl = "img/Rtri1.ico";
	var characterData = drawRightAngle(icoUrl);
}

function drawDownCenFn(){
	var icoUrl = "img/downCenter1.ico";
	var characterData = drawDownCen(icoUrl);
}

function drawFingerDirFn(){
	var icoUrl = "img/fingerDir1.ico";
	var characterData = drawFingerDir(icoUrl);
}

//==========================创建新画布==============================================
var addFingerImgCvs = function(divId,cvsId){
	var e = true;
	var w = CVSCONT_WIDTH.substring(0,CVSCONT_WIDTH.lastIndexOf('px'));
	var ws = eval(ICON_CONT_WIDTH)+eval(this.WIDTH_.substring(0,WIDTH_.lastIndexOf('px')));
	var mnt_off_set ;//画布居中
	if(w>ws){
		mnt_off_set = Math.round((w-(ws))/2);
	}else{
		alert("编辑特征界面的宽度不够,请重新加载!");
		e = false;
		return e;
	}
	var fingerDiv = '<div id="'+MNT_CVS_CONTAINER_ID+'" onmousemove="DisplayCoord(event)" style="width:'+this.WIDTH_+'; height:'+this.HEIGHT_+'; margin-left:'+mnt_off_set+'px; padding:0px; float:left;" ></div>';
	$("#"+divId).append(fingerDiv);
	$("#"+MNT_CVS_CONTAINER_ID).append("<canvas id='"+cvsId+"' class = 'afis_class' width='"+this.WIDTH_+"' height='"+this.HEIGHT_+"'"
	 +"style=''></canvas>");
	 return e;
}

var createCav = function(divId,Type){
	var eleId = "";
	if(Type == "B"){
		eleId = mntIdIndex; 
	}
	var id = Type+INITID+eleId;
	//$("#"+divId).append("<canvas id='"+id+"' class = 'character' width='"+this.WIDTH_+"px' height='"+this.HEIGHT_+"px'"
	$("#"+divId).append("<canvas id='"+id+"' class = 'character' width='"+this.WIDTH_+"px' height='"+this.HEIGHT_+"px'"
	 //+"style='margin-left:-"+this.WIDTH_+"px;'></canvas>");
	 +"></canvas>");
}

//清除单个元素的画布内容
var clearCvsContentById = function(casId){
	var btn = document.getElementById(casId);
	var ctx = btn.getContext("2d");
	ctx.clearRect(0,0,this.WIDTH_,this.HEIGHT_);
	if(casId.substring(0,1)=="A"){ centerCon = [];}
	if(casId.substring(0,1)=="C"){ lTriCon = [];}
	if(casId.substring(0,1)=="D"){ rTriCon = [];}
	if(casId.substring(0,1)=="E"){ downCenterCon = [];}
	if(casId.substring(0,1)=="F"){ fingerDirCon = [];}
}

//获取当前画布【将画布移到最上层】
var getPrevCav = function(cavId,arg){
	var tempId = "#"+cavId;
    var prev = $(tempId);//当前画布 
    var last = $("canvas:last-child");//最后一张画布
    if(prev.html()!=undefined){  
        last.after(prev);//最后一个画布之后插入当前画布
    }
    /*else{
        //alert("到达最底部了");  
    } */ 
}

/*
 * 细节特征构造函数
 * 特征类型：坐标原点x0,y0,坐标末点x1,y2,斜率 ,角度,画布ID 
 */
 var characObj = function (x0,y0,x1,y1,angle,canvasId){
	this.x0 = x0;
	this.y0 = y0;
	this.x1 = x1;
	this.y1 = y1; 
	this.angle =  angle;
	this.canvasId = canvasId;
}
 
//只留一个元素
function onlyOne(obj,arg1,arg2){
	if(obj.length == 0){
		return true;
	}else{
		return false;
	}
}

var saveMntContId = function(A,B,C,D,E,F){//初始化页面保存特征数据的html元素的id
	this.AcenterConId = A;
	this.BcharacterConId = B;
	this.ClTriConId = C;
	this.DrTriConId = D;
	this.EdownCenterConId = E;
	this.FfingerDriConId = F;
}

var getBase64ByByte = function(arry){
	return arrayBufferToBase64(arry);
}

function arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

/*=========保存所有画布特征==================================================*/
var fingerMntData;
var saveMnt = function(){//保存特征的时候应该全部保存下来==>转为byte数组==>再转为base64数据
	if(!IFSAVE){//false 不让保存
		document.getElementById("saveMnt").setAttribute("disabled", false);
		document.getElementById("saveMnt").style.borderColor="#D3D3D3";
		alert("没有保存权限!");
		return;	
	}
	alert(" editor mnt!");
	document.getElementById(this.AcenterConId).innerHTML = centerCon;
	document.getElementById(this.BcharacterConId).innerHTML = characCon;
	document.getElementById(this.ClTriConId).innerHTML = lTriCon;
	document.getElementById(this.DrTriConId).innerHTML = rTriCon;
	document.getElementById(this.EdownCenterConId).innerHTML = downCenterCon;
	document.getElementById(this.FfingerDriConId).innerHTML = fingerDirCon;
	//保存跑【获取】指纹特征
	getFingerMntByte();
	// TODO 保存其他特征
}

var getFingerMntByte = function(){
	fingerMntData = new FINGER_MNTSTRUCT();
	fingerMntData.MntVersion = MNTVERSION;
	fingerMntData.width_2 = FINGER_WIDTH;
	fingerMntData.height_2 = FINGER_HEIGHT;
	fingerMntData.tcd = [0,0,0,0,0,0,0,0,0,0];//待定
	fingerMntData.f_position = POSITION;
	fingerMntData.region = 0;//待定
	fingerMntData.qualitity = 0;//待定
	fingerMntData.minutiae_num = MINUTIA_NUM;
	
	//待定 TODO
	if(fingerDirCon.length ==1){
		fingerMntData.fort_2 = fingerDirCon[0];//TODO 指纹方向[值待确认]
	}else{
		fingerMntData.fort_2 = 0;
	}
	fingerMntData.cfort = 0;
	fingerMntData.cfrp = CFRP;
	fingerMntData.cfrp0 = CFRP0;
	fingerMntData.cfc = 10; //中心置信度
	fingerMntData.cfe = 10;	//下中心置信度
	fingerMntData.cfl = 10;	//左三角置信度
	fingerMntData.cfr = 10;  //右三角置信度
	
   /* 纹型, ridge pattern , can be the following values:
	   MNTRP_UNDET, MNTRP_ARCH, MNTRP_LEFTLOOP, MNTRP_RIGHTLOOP, MNTRP_WHORL.
	*/
	fingerMntData.rp = RP;	//指纹纹型
	fingerMntData.whorltype = WHORLTYPE;	//斗型纹旋转方向
	fingerMntData.rp0 = RP0;	//副纹型
	fingerMntData.whorltype0 = WHORLTYPE0;  //副纹型旋转方向
	fingerMntData.scar = SCAR;	//伤疤
	// 0-不定
	// 1-有伤疤
	// 2-无伤疤
	if(centerCon.length == 1){
		fingerMntData.cx_2 = centerCon[0].x0;	 //上中心[中心点]
		fingerMntData.cy_2 = centerCon[0].y0;				
		fingerMntData.ca_2 = centerCon[0].angle;	//指纹中心点_特征方向
	}else{
		fingerMntData.cx_2 = 0;	  //上中心[中心点]
		fingerMntData.cy_2 = 0;				
		fingerMntData.ca_2 = 0;
	}
	if(downCenterCon.length == 1){
		fingerMntData.ex_2 = downCenterCon[0].x;	 //下中心【副中心】
		fingerMntData.ey_2 = downCenterCon[0].y;	 //上中心
	}else{
		fingerMntData.ex_2 = 0;
		fingerMntData.ey_2 = 0;
	}
	if(lTriCon.length == 1){
		fingerMntData.ldx_2 = lTriCon[0].x;	 //44  左三角
		fingerMntData.ldy_2 = lTriCon[0].y;
	}else{
		fingerMntData.ldx_2 = 0;
		fingerMntData.ldy_2 = 0;
	}
	if(rTriCon.length == 1){
		fingerMntData.rdx_2 = rTriCon[0].x;	//48  右三角
		fingerMntData.rdy_2 = rTriCon[0].y;  //50-52
	}else{
		fingerMntData.rdx_2 = 0;
		fingerMntData.rdy_2 = 0;
	}
	var fingerMntArr = new Array();
	for (var i = 0; i < characCon.length; i++) {
		var fingerMinutia = new FingerMinutia(); 
		fingerMinutia.x = characCon[i].x0;
		fingerMinutia.y = characCon[i].y0;
		fingerMinutia.a = characCon[i].angle;
		fingerMinutia.c = CI;
		fingerMinutia.type = FINGER_MNT_TYPE;
		fingerMntArr.push(fingerMinutia);
	}
	fingerMntData.fingerMinutiaArr = fingerMntArr;//200个特征数据
	var byteData = getFingerMntByteArr(fingerMntData);//byte数组
    /*var arry  = [-1, -40, -1, -32, 0, 16, 74, 70, 73, 70, 0, 1, 2, 0, 0, 1, 0, 1, 0, 0, -1, -37, 0, 67, 0, 8, 6, 6, 7, 6, 5, 8, 7, 7, 7, 9, 9, 8, 10, 12, 20, 13, 12, 11, 11, 12, 25, 18, 19, 15, 20, 29, 26, 31, 30, 29, 26, 28, 28, 32, 36, 46, 39, 32, 34, 44, 35, 28, 28, 40, 55, 41, 44, 48, 49, 52, 52, 52, 31, 39, 57, 61, 56, 50, 60, 46, 51, 52, 50, -1, -37, 0, 67, 1, 9, 9, 9, 12, 11, 12, 24, 13, 13, 24, 50, 33, 28, 33, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, -1, -64, 0, 17, 8, 0, 26, 0, 80, 3, 1, 34, 0, 2, 17, 1, 3, 17, 1, -1, -60, 0, 31, 0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, -1, -60, 0, -75, 16, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125, 1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, -127, -111, -95, 8, 35, 66, -79, -63, 21, 82, -47, -16, 36, 51, 98, 114, -126, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, -125, -124, -123, -122, -121, -120, -119, -118, -110, -109, -108, -107, -106, -105, -104, -103, -102, -94, -93, -92, -91, -90, -89, -88, -87, -86, -78, -77, -76, -75, -74, -73, -72, -71, -70, -62, -61, -60, -59, -58, -57, -56, -55, -54, -46, -45, -44, -43, -42, -41, -40, -39, -38, -31, -30, -29, -28, -27, -26, -25, -24, -23, -22, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -1, -60, 0, 31, 1, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, -1, -60, 0, -75, 17, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119, 0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, -127, 8, 20, 66, -111, -95, -79, -63, 9, 35, 51, 82, -16, 21, 98, 114, -47, 10, 22, 36, 52, -31, 37, -15, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, -126, -125, -124, -123, -122, -121, -120, -119, -118, -110, -109, -108, -107, -106, -105, -104, -103, -102, -94, -93, -92, -91, -90, -89, -88, -87, -86, -78, -77, -76, -75, -74, -73, -72, -71, -70, -62, -61, -60, -59, -58, -57, -56, -55, -54, -46, -45, -44, -43, -42, -41, -40, -39, -38, -30, -29, -28, -27, -26, -25, -24, -23, -22, -14, -13, -12, -11, -10, -9, -8, -7, -6, -1, -38, 0, 12, 3, 1, 0, 2, 17, 3, 17, 0, 63, 0, -9, -6, 40, -94, -128, 25, 28, -79, -52, -91, -94, -111, 93, 67, 50, -110, -89, 35, 32, -112, 71, -44, 16, 65, -9, 20, -6, -55, -16, -25, -4, -125, 38, -1, 0, -81, -5, -49, -3, 41, -106, -99, -81, -53, 36, 90, 88, -14, -92, 104, -52, -73, 54, -16, -77, 33, -38, -37, 30, 100, 70, 0, -114, 65, 42, -60, 100, 114, 58, -126, 13, 79, 55, -69, -52, 110, -24, -2, -1, 0, -40, -89, -42, -33, -115, -117, 48, 106, -70, 117, -43, -28, -74, 118, -9, -10, -77, 93, 69, -97, 50, 24, -26, 86, 116, -63, -63, -54, -125, -111, -125, -59, 88, -110, 88, -31, 80, -46, -56, -88, -91, -107, 65, 99, -127, -110, 64, 3, -22, 73, 0, 123, -102, -55, -15, 12, 81, -38, 120, 90, -14, 91, 104, -42, 23, -80, -74, 121, -83, 12, 99, 111, -110, -24, -121, 105, 80, 58, 14, -40, -24, 65, 32, -126, 9, 20, -1, 0, 17, -1, 0, -56, 50, 31, -6, -1, 0, -77, -1, 0, -46, -104, -87, 57, 52, -99, -6, 23, 26, 48, -100, -95, -53, -76, -99, -65, 47, -13, 52, -28, -106, 56, 84, 52, -78, 42, 41, 101, 80, 88, -32, 100, -112, 0, -6, -110, 64, 30, -26, -97, 89, 62, 35, -1, 0, -112, 100, 63, -11, -1, 0, 103, -1, 0, -91, 49, 86, -75, 85, -11, -79, -117, -123, -87, -87, -9, 109, 125, -42, -1, 0, 48, -94, -118, 41, -103, -123, 20, 81, 64, 24, -47, -24, 51, 64, 101, 22, -38, -26, -93, 4, 82, 77, 36, -34, 82, 45, -71, 85, 46, -27, -37, 5, -94, 39, 25, 99, -44, -102, -42, -106, 40, -25, -123, -31, -102, 53, -110, 41, 20, -85, -93, -116, -85, 3, -63, 4, 30, -94, -97, 69, 74, -118, 91, 26, 78, -84, -26, -17, 45, -3, 18, -4, -116, -72, -76, 80, -77, 33, -97, 80, -68, -69, -126, 38, 13, 21, -67, -61, 35, 34, 17, -9, 73, 33, 67, 57, 94, -37, -39, -71, -61, 28, -80, 4, 94, -70, -75, -122, -14, -35, -32, -99, 55, 70, -40, -56, -55, 4, 16, 114, 8, 35, -112, 65, 0, -126, 57, 4, 2, 57, -87, -88, -90, -94, -106, -127, 42, -77, -109, 82, 111, 85, -14, 50, -30, -47, -33, -50, 71, -68, -44, -17, 47, -110, 54, 14, -111, 92, 8, -126, 7, 28, -122, 33, 17, 114, 71, 81, -100, -128, 112, 113, -112, 8, -44, -94, -118, 18, 72, 83, -87, 41, -17, -2, 95, -112, 81, 69, 20, -56, 63, -1, -39];
    var str12 = arrayBufferToBase64(arry);//转换字符串
    var outputImg = document.createElement('img');
    outputImg.src = 'data:image/png;base64,'+str12;
    document.body.appendChild(outputImg);*/
	return byteData;
}

/*=========设计绘制函数==================================================*/

var drawCenter = function (icnUrl){
	 Type = "A";
	 var id = Type+INITID;
	 showIco(icnUrl,id);
	 preCanvasId = "#"+id;
	 unbindKey();
	 var el = document.getElementById(id);
	 if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	 }
	 getPrevCav(id);//最后一次绘制的画布
	 $(preCanvasId).bind("mousedown",mousedownFn = function(){
	    cnvs_getStartPos(event,"center","#FF0000",id);
	 });
	 $(preCanvasId).bind("mouseup",mouseupFn = function(){
	    cnvs_getAngle(event,"center","#FF0000",id);
	 });
}

var firstCharacFlag = false;
var drawCharacter = function(icnUrl){
	showIco(icnUrl);
	 Type = "B";
	 if(mntIdIndex== 0){
	 	mntIdIndex = 1;//第一次绘制特征时,id置1
	 	firstCharacFlag = true;
	 }
	 var id = Type+INITID+mntIdIndex;
	 preCanvasId = "#"+id;
	 unbindKey();
	var el = document.getElementById(id);
	 if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	 }
	getPrevCav(id);
	$(preCanvasId).bind("mousedown",mousedownFn = function(){
	    cnvs_getStartPos(event,"null","#FFFF00",id);
	 });
	$(preCanvasId).bind("mouseup",mouseupFn = function(){ 
	 	cnvs_getAngle(event,"null","#FFFF00",id);
	});	
}


var drawLeftAngle = function (icnUrl){
	showIco(icnUrl);
	Type = "C";
	var id = Type+INITID;
	 preCanvasId = "#"+id;
	 unbindKey();
	 var el = document.getElementById(id);
	 if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	 }
	getPrevCav(id);
	$(preCanvasId).bind("mousedown",mousedownFn = function(){
		cnvs_getTriAngle(event,"left","#0000FF",id);
	});	
}


var drawRightAngle = function (icnUrl){
	showIco(icnUrl);
	Type = "D";
	var id = Type+INITID;
	 preCanvasId = "#"+id;
	 unbindKey();
	 var el = document.getElementById(id);
	 if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	 }
	getPrevCav(id);
	$(preCanvasId).bind("mousedown",mousedownFn = function(){
		cnvs_getTriAngle(event,"right","#009944",id);
	});	
}


var drawDownCen = function (icnUrl){
	showIco(icnUrl);
	Type = "E";
	var id = Type+INITID;
	 preCanvasId = "#"+id;
	 unbindKey();
	 var el = document.getElementById(id);
	 if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	 }
	getPrevCav(id);
	$(preCanvasId).bind("mousedown",mousedownFn = function(){
		cnvs_getCenter(event,"#FF0000",id);
	});	
}


var drawFingerDir = function (icnUrl){
	showIco(icnUrl);
	Type = "F";
	var id = Type+INITID;
	 preCanvasId = "#"+id;
	 unbindKey();
	 var el = document.getElementById(id);
	 if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	 }
	getPrevCav(id);
	//$(preCanvasId).bind("mousedown",mousedownFn = function(){
		cnvs_getDir(event,"#00FF00",id);
	//}
}


var drawCir = function(canvasId,x0,y0,lineWith,color){
	var b = document.getElementById(canvasId);
	var ctx0=b.getContext("2d");
	ctx0.beginPath();
	ctx0.arc(x0,y0,lineWith,0,2*Math.PI);
	ctx0.fillStyle = color;
	ctx0.fill();//填充颜色
	ctx0.strokeStyle = color;
	ctx0.lineWidth = lineWith;
	ctx0.stroke();
	ctx0.closePath();
}


function cnvs_getStartPos(e,arg,color,cvsId){//获取起始位置跑【绘制点击图像界面的起点原点】
	//tmp_y = (e||event).clientY ;
	//var ob = document.getElementById(cvsId);
	//tmp_x = getX(ob,e);
	//tmp_y = getY(ob,e);
	tmp_x = getCvsRelativeX(e,cvsId);
	tmp_y = getCvsRelativeY(e,cvsId);
	var lineWith;
	if(arg=="center"){
		lineWith = 3 ;
		if(!onlyOne(centerCon)){ 
			clearCvsContentById(cvsId);
		}
	}else{
		lineWith = 2 ;
	}
	var btnNum = event.button;
	if (btnNum==2){
		//右击删除细节特征
		if(Type == "B"){
			//alert("your operation is character!");
			if(mntIdIndex == 0 ){
				alert("已无细节特征需要删除!");
				return;
			}
			removeCharacter(tmp_x,tmp_y,characCon,btnNum);
		}
	}
    if (btnNum!=0){//非左击事件不让画
    	return;
    }
  
   //判断画布是否存在,画的是细节特征时创建新的画布,并绑定鼠标事件
   if(Type == "B" && !firstCharacFlag ){//且不是第一次创建
   		mntIdIndex+=1;
	   	var id1 = Type+INITID+mntIdIndex;//构建新画布的id
	   	cvsId = getNewId(id1);
	 	preCanvasId = "#"+cvsId;
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
		getPrevCav(cvsId);//最后一次绘制的画布,并绑定鼠标点击事件，以便下一次绘制细节特征
		$(preCanvasId).bind("mousedown",mousedownFn = function(){
		    cnvs_getStartPos(event,"null","#FFFF00",cvsId);
		 });
		$(preCanvasId).bind("mouseup",mouseupFn = function(){ //赋给函数变量
		 	cnvs_getAngle(event,"null","#FFFF00",cvsId);
		});	
    }
   drawCir(cvsId,tmp_x,tmp_y,lineWith,color);
}


function cnvs_getAngle(e,arg,color,cvsId) {//画直线特征
	var btnNum = event.button;
    if (btnNum!=0){
    	return;
    }
    //var y = (e||event).clientY;
    var x = getCvsRelativeX(e,cvsId);
    var y = getCvsRelativeY(e,cvsId);
    //var ob = document.getElementById(cvsId);
	//var y = getY(ob,e);
    if(x == tmp_x && y == tmp_y){
    	mntIdIndex --;
    	removeCvs(cvsId);
    	removeEle(cvsId);
    	return;
    }
    
    var length;
    var lineWith;
    if (tmp_x == 0 && tmp_y == 0) {
        alert("特征终点和原点不可以重复!");
        return;
    }
    angle = getAngle(tmp_x,tmp_y,x,y);
    //document.getElementById("xycoordinates").innerHTML="Angle: " + angle;
    var tempk;
	if(angle==0 || angle==180){
		tempk = 0;
	}else if(angle==90 || angle==270){
		tempk = "null";
	}else{
		tempk  = Math.tan(angle/180*Math.PI).toPrecision(4);
	}
	
	var tempType;
	if(arg=="center"){
		tempType = "A";
		length = 25;
		lineWith = 4 ;
	}else{
		tempType = "B";
		length = 15;
		lineWith = 3 ;
	}
	x1 = tmp_x+length*Math.cos(angle/180*Math.PI).toPrecision(2);
	y1 = tmp_y+length*Math.sin(angle/180*Math.PI).toPrecision(2);
	var obj = new characObj(tmp_x,tmp_y,x1,y1,angle,cvsId);
	//将单个特征点添加到数组
    if(arg=="center"){
		centerCon.push(obj);
    }else{
    	if(MINUTIA_NUM > 200){
    		alert("特征点个数不能大于200");
    		return ;
    	}
    	MINUTIA_NUM++;
		characCon.push(obj);
    }
    document.getElementById("xycoordinates").innerHTML="Coordinates: (角度是:" +angle+",末端坐标:"+ x1 + "," + y1 +","+tempk+ ",特征点个数:"+MINUTIA_NUM+")";
	drawLine(cvsId,tmp_x,tmp_y,x1,y1,lineWith,color);
    firstCharacFlag = false;
}


var getAngle = function(x0,y0,x,y){
	var angle = Math.atan((y - y0) / (x - x0)) * (180/Math.PI);
    if (x > x0 && y > y0) {
    	angle = 0 + angle;
    }
    else if (x < x0 && y > y0) {
        angle = 90 + Math.abs(angle + 90);
    }
    else if (x < x0 && y <= y0) {
        angle = 180 + angle;
    }
    else if (x >= x0 && y < y0) {
        angle = 360 + angle;
    }
    return angle;
}


var drawLine = function (canvasId,x0,y0,x1,y1,lineWith,color){
	var b = document.getElementById(canvasId);
	var cxt=b.getContext("2d");
	cxt.beginPath();
    cxt.moveTo(x0, y0);
    cxt.lineTo(x1, y1);
    cxt.fill();
    cxt.lineWidth = lineWith;
    cxt.strokeStyle= color;
    cxt.stroke();
    cxt.closePath();
}

var removeCharacter = function(x,y,objCon,btnNum){
	for (var i = 0; i < objCon.length;i++) {
		var obj = objCon[i];
		var tempX = obj.x0;
		var tempY = obj.y0;
		var btn = document.getElementById(obj.canvasId);
		if(btn == null){
			continue;
		}
		var ctx = btn.getContext("2d");
		if( (tempX>=(x-20) && tempX<=(x+20))&&(tempY>=(y-20) && tempY<=(y+20))){
			//getPrevCav(obj.canvasId);
			ctx.clearRect(0,0,this.WIDTH_,this.HEIGHT_);
			removeObjFromArr(objCon,obj);
			if(btnNum == 2){//删除元素
				removeEle(obj.canvasId);
			}
			MINUTIA_NUM --;//有效特征点个数减一
			break;
		}
	}
	document.getElementById("xycoordinates").innerHTML="Coordinates: (有效特征个数:"+MINUTIA_NUM+")";
}

var removeEle = function(id){
	var m = document.getElementById(id);
	m.parentNode.removeChild(m);
}

var removeCvs = function(cvsId){
	var btn = document.getElementById(cvsId);
	var ctx = btn.getContext("2d");
	ctx.clearRect(0,0,this.WIDTH_,this.HEIGHT_);
}

var removeObjFromArr = function (_arr,_obj) {
    var length = _arr.length;
    for(var i = 0; i < length; i++){
        if(_arr[i] == _obj){
            if(i == 0){
                _arr.shift();
                return;
            }else if(i == length-1){
                _arr.pop();
                return;
            }else{
                _arr.splice(i,1);
                return;
            }
        }
    }
};

var getNewId = function(id){
	var id1 ;
	var el = document.getElementById(id);
   	var unEixtFlag = (el == null || el == undefined);
   	if(!unEixtFlag){//存在,加1判断
   		mntIdIndex+=1;
   		id1 = Type+INITID+mntIdIndex;
   		getNewId(id1);
   	}else{
   		id1 = Type+INITID+mntIdIndex;
   	}
   	return id1;
}

//===============================绘制[左,右]三角==========================================
var cnvs_getTriAngle = function(e,dir,color,cvsId) {//画三角特征
	var btnNum = event.button;
    if (btnNum!=0){
    	return;
    }
	var b = document.getElementById(cvsId);
	var cxt = b.getContext("2d");
	//var y = (e||event).clientY;
	var x = getCvsRelativeX(e,cvsId);
	var y = getCvsRelativeY(e,cvsId);
	//由于图标的原因,欲绘制特征基于图标的中心点,应将原来基于左上角的坐标移到右下角中心点   3是误差值
	x = x + ICON_SIZE/2 -3; 
	y = y + ICON_SIZE/2 -3;
	document.getElementById("xycoordinates").innerHTML="Coordinates: (坐标是:"+ x + "," + y +")";
    cxt.beginPath();
    var length = 20;
    var cirWidth = 2;
    if(dir=="left"){
    	if(!onlyOne(lTriCon)){ 
			clearCvsContentById(cvsId);
		}
	 	drawCir(cvsId,x,y,cirWidth,color);
        cxt.moveTo(x+length/(Math.cos(length/180*Math.PI)), y);
        cxt.lineTo(x-length*Math.tan(length/180*Math.PI), y+length);
        cxt.lineTo(x-length*Math.tan(length/180*Math.PI), y-length);
        cxt.lineWidth = 3;
    	cxt.strokeStyle= color;
    	cxt.closePath();
	    var triAngleData = new Object();
	    triAngleData.x = x;
	    triAngleData.y = y;
	    lTriCon.push(triAngleData);
    }else if(dir=="right"){
    	if(!onlyOne(rTriCon)){ 
			clearCvsContentById(cvsId);
		}
    	drawCir(cvsId,x,y,cirWidth,color);
    	cxt.moveTo(x-length/(Math.cos(length/180*Math.PI)), y);
        cxt.lineTo(x+length*Math.tan(length/180*Math.PI), y+length);
        cxt.lineTo(x+length*Math.tan(length/180*Math.PI), y-length);
        cxt.lineWidth = 3;
    	cxt.strokeStyle= color;
    	cxt.closePath();
    	 var triAngleData = new Object();
	    triAngleData.x = x;
	    triAngleData.y = y;
    	rTriCon.push(triAngleData);
    }
    cxt.stroke();//绘图
}

//===============================绘制下中心【副中心】==========================================
var cnvs_getCenter = function (e,color,cvsId) {//下中心
	var btnNum = event.button;
    if (btnNum!=0){
    	return;
    }
	if(!onlyOne(downCenterCon)){ 
		clearCvsContentById(cvsId);
	}
    var b = document.getElementById(cvsId);
	var cxt = b.getContext("2d");
	//var y = (e||event).clientY;
	var x = getCvsRelativeX(e,cvsId);
    var y = getCvsRelativeY(e,cvsId);
    x = x + ICON_SIZE/2 -3; 
	y = y + ICON_SIZE/2 -3;
    cxt.beginPath();
    cxt.lineWidth = 3;
	cxt.strokeStyle= color;
	var len = 30;
    if(downCenterCon.length==0){
		cxt.moveTo(x-len/2, y);
	    cxt.lineTo(x+len/2, y);
	    //cxt.beginPath();
	    cxt.closePath();
		cxt.moveTo(x, y-len/2);
	    cxt.lineTo(x, y+len/2);
	    cxt.stroke();//绘图
	    //var fingerData = b.toDataURL();
	    var downCenter = new Object();
	    downCenter.x = x;
	    downCenter.y = y;
	    downCenterCon.push(downCenter);
	    //document.getElementById("previewImg").src = fingerData;
    }
   document.getElementById("xycoordinates").innerHTML="Coordinates: (坐标是:"+ x + "," + y +")";
}

//===============================绘制指纹方向==========================================
var fingerDir ;
var c_x,c_y; //相对于canvas坐标的位置；
var arrow=function () {
    this.x=0; 
    this.y=0;
    this.color="#f90";
    this.rolation=0;
    this.cvsId = "";
} 
var cnvs_getDir = function (e,color,cvsId) {//指纹方向
	var btnNum = event.button;
    if (btnNum!=0){
    	return;
    }
	if(!onlyOne(fingerDirCon)){ 
		clearCvsContentById(cvsId);
	}
	var canvas = document.getElementById(cvsId);
	var ctx = canvas.getContext("2d");
    fingerDir = new arrow();
    fingerDir.cvsId = cvsId;
    fingerDir.color = color;
	fingerDir.x = WIDTH_/2;
    fingerDir.y = HEIGHT_-100;
	fingerDir.drawDir(ctx,color);
	var isMouseDown=false;
    canvas.addEventListener('mousedown',function(e) {
        isMouseDown=true;
        if(isMouseDown==true){
            c_x=getCvsRelativeX(e,cvsId);
            c_y=getCvsRelativeY(e,cvsId);
            //setInterval(drawFram,1000/60)
            requestAnimationFrame(drawFram)
            //drawFram();
        }
    },false)
    canvas.addEventListener('mousemove',function(e) {
        if(isMouseDown==true){
            c_x=getCvsRelativeX(e,cvsId);
            c_y=getCvsRelativeY(e,cvsId);
            //setInterval(drawFram,1000/60)
            requestAnimationFrame(drawFram)
        }
    },false)
    canvas.addEventListener('mouseup',function(e) {
        isMouseDown=false;
    },false)
}

var drawFram = function (){
    var canvas = document.getElementById(fingerDir.cvsId);
    var ctx = canvas.getContext('2d');
    var dx=c_x-fingerDir.x;
    var dy=c_y-fingerDir.y;
    var rola = Math.atan2(dy,dx);
    if(Type == "F"){
    	rola = rola + Math.PI/2;
    }
    var angle = getAngle(fingerDir.x,fingerDir.y,c_x,c_y);
    if(fingerDirCon.length==1){
    	fingerDirCon = [];
    }
    fingerDirCon.push(angle);
    document.getElementById("xycoordinates").innerHTML="Coordinates: (指纹方向角度==" +angle+", x0="+
            fingerDir.x+", y0="+fingerDir.y+", x1="+c_x + ", y1=" + c_y +")";
    fingerDir.rolation = rola;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fingerDir.drawDir(ctx,fingerDir.color);
}

arrow.prototype.drawDir = function (ctx,color){
	ctx.save();
	ctx.translate(fingerDir.x,fingerDir.y);
    ctx.rotate(fingerDir.rolation);
    ctx.fillStyle = color;
    ctx.beginPath();
    
	/*ctx.moveTo(0, 15);
    ctx.lineTo(-50, 15);
    ctx.lineTo(-50, -15);
    ctx.lineTo(0,-15);
    ctx.lineTo(0,-35);
    ctx.lineTo(50,0);
    ctx.lineTo(0,35);*/
   
    var len = 40;
    var witdh = 2;
    ctx.lineWidth = witdh;
    ctx.moveTo(-witdh/2, witdh/2);
    ctx.lineTo(-len,witdh/2);
    ctx.lineTo(-len,-witdh/2);
    ctx.lineTo(-witdh/2,-witdh/2);
    ctx.lineTo(-witdh/2,-len*2);//y直线
    ctx.lineTo(witdh/2,-len*2);
    ctx.lineTo(witdh/2,-witdh/2);
    ctx.lineTo(len,-witdh/2);
    ctx.lineTo(len,witdh/2);

    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

var getFingerMntByteArr = function(fingerObj){//定义长度及对应的下标
		var arr = new Array(TRI_LENGTH);
		var co = 0;
		for(var Key in fingerObj){
			if(co >=52){
				break;
			}
			var val = fingerObj[Key];
			if(Key.endWith('_2')){
				if(co%2 != 0){//不是偶数下标+1
					co=co+1;
				}
				arr[co] = intToByte(val)[0];
				arr[co+1] = intToByte(val)[1];
				co ++;
			}else if(co == 6){
				for (var i = 0; i < val.length; i++) {
					arr[co] = intToByte(val[i])[0];
					co++;
				}
				continue;
			}else{
				arr[co] = intToByte(val)[0];
			}
			co ++;
			continue;//最后退出当前for循环
		}
		var mntData = fingerObj.fingerMinutiaArr;
		var mntArr = getMinutiaByte(mntData);
		for (var j = 0; j < mntArr.length; j++) {
			arr[52+j] = mntArr[j];//TODO 细节特征存放到从52开始的byte数组
		}
		return arr;
	}

var getMinutiaByte = function(mntData){
	var mntArr = new Array();
	for (var i = 0; i < mntData.length; i++) {
		var _arr = new Array();
		var x = mntData[i].x; 
		var y = mntData[i].y;
		var a = mntData[i].a;
		var c = mntData[i].c;
		var type = mntData[i].type;
		_arr = getArr(x,y,a,c,type);
		for (var j = 0; j < _arr.length; j++) {
			mntArr.push(_arr[j]);
		}
	}
	return mntArr;
}

var getArr = function(x,y,a,c,type){
	var mntArr = new Array();
 	mntArr.push(intToByte(x)[0]);
 	mntArr.push(intToByte(x)[1]);
 	mntArr.push(intToByte(y)[0]);
 	mntArr.push(intToByte(y)[1]);
 	mntArr.push(intToByte(a)[0]);
 	mntArr.push(intToByte(a)[1]);
 	mntArr.push(intToByte(c)[0]);
 	mntArr.push(intToByte(type)[0]);
 	return mntArr;
} 

var getPos = function(e) {
    var mouse={x:0,y:0}
    var e=e||event;
    if(e.pageX||e.pageY){
        mouse.x=e.pageX;
        mouse.y=e.pageY;
    }else{
        //mouse.x=e.pageX+document.body.scrollLeft+document.document.documentElement.scrollLeft;
        //mouse.y=e.pageY+document.body.scrollTop+document.document.documentElement.scrollTop;
        mouse.x=e.pageX+document.body.scrollLeft+document.documentElement.scrollLeft;
        mouse.y=e.pageY+document.body.scrollTop+document.documentElement.scrollTop;
    }
    if(browserVersion() == "IE" || browserVersion() == "Edge"){
    	 mouse.y = eval( mouse.y)-30;//IE与实际值会差30
    }
    return mouse;
}

var getCvsRelativeX = function(e,cvsId){
	return getPos(e).x-document.getElementById(cvsId).offsetLeft;
}

var getCvsRelativeY = function(e,cvsId){
	return getPos(e).y-document.getElementById(cvsId).offsetTop;
}

var getX = function(obj,e){ 
	var parObj=obj; 
	var left=obj.offsetLeft; 
	while(parObj=parObj.offsetParent){ 
		left+=parObj.offsetLeft; 
	} 
	//return left; 
	return (e.clientX-left+document.documentElement.scrollLeft) -2; 
} 

var getY = function(obj,e){ 
	var parObj=obj; 
	var top=obj.offsetTop; 
	while(parObj = parObj.offsetParent){ 
		top+=parObj.offsetTop; 
	} 
	return (e.clientY-top+document.documentElement.scrollTop) -2; 
} 

DisplayCoord = function(event){ 
	var top,left,oDiv; 
	oDiv=document.getElementById(MNT_CVS_CONTAINER_ID); 
	//var x=getX(oDiv,event); //测试可以
	//var y=getY(oDiv,event); 
	var x=getCvsRelativeX(event,MNT_CVS_CONTAINER_ID); 
	var y=getCvsRelativeY(event,MNT_CVS_CONTAINER_ID); 
	x = Math.round(x);
	y = Math.round(y);
	document.getElementById("mp_x").innerHTML = x; 
	document.getElementById("mp_y").innerHTML = y; 
	var browserVer  = browserVersion();
	//console.log("your browser is "+browserVer);

}

var browserVersion = function(){
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isOpera = userAgent.indexOf("Opera") > -1;  
    //判断是否Opera浏览器  
    if (isOpera) {  
      return "Opera"  
    };   
    //判断是否Firefox浏览器  
    if (userAgent.indexOf("Firefox") > -1) {  
      return "FF";  
    }   
    //判断是否chorme浏览器  
    if (userAgent.indexOf("Chrome") > -1){  
 		return "Chrome";  
   }  
  	//判断是否Safari浏览器  
  	if (userAgent.indexOf("Safari") > -1) {  
      return "Safari";  
  	}   
  	//判断是否IE浏览器  
  	if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {  
      return "IE";  
  	}  
  	//判断是否Edge浏览器  
  	if (userAgent.indexOf("Trident") > -1) {  
      return "Edge";  
  	};  
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    img.width = img.width ? img.width : "640px";
    img.height = img.height ? img.height: "640px";
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}

/*var img = "img/arc.jpg";
var image = new Image();
image.src = img;
image.onload = function(){
  var base64 = getBase64Image(image);
  console.log(base64);
}*/

//var str = "<?xml version='1.0' encoding='utf-8'?> <movies><name>四大金刚</name> <country>中国</country> <director>徐克</director></movies>";
//pasXml(str);

/*
 * 
 *document.onmousedown = function(event){
    if(event.ctrlKey == true){
    	alert(111)
    	unbindKey("#Acharacter","mousedown",mousedownFn);
    	unbindKey("#Acharacter","mouseup",mouseupFn);
    }
    var btnNum = event.button;
	if (btnNum==2){
		//alert("您点击了鼠标右键！")
	}else if(btnNum==0){
		//alert("您点击了鼠标左键！")
	}else if(btnNum==1){
		alert("您点击了鼠标中键！");
	}else{
		alert("您点击了" + btnNum+ "号键，我不能确定它的名称。");
	}
}
 
function cnvs_clearCoordinates(){
    tmp_x = 0;
    tmp_y = 0;
    document.getElementById("xycoordinates").innerHTML="";
}

document.onkeydown=function(event){ 
	var event = event || window.event || arguments.callee.caller.arguments[0]; 
	if(event && event.keyCode==13){ // 按  
		//要做的事情 
		alert('你按下了Enter键'); 
	}
    if (event.ctrlKey == true && event.keyCode == 90) {//Ctrl+Z
        event.returnvalue = false;
        alert("Ctrl+Z")
    }
    if (event.ctrlKey == true && event.keyCode == 89) {//Ctrl+Y
        event.returnvalue = false;
        //alert("Ctrl+Y");
    }
    if (event.ctrlKey == true && event.shiftKey == true) {//Ctrl+shiftKey
        //event.returnvalue = false;
        //alert("Ctrl+shift");
    }
} 
 
 //拖拽画布上的绘图
var dragFn = function(canEl,ev){
	canEl.onmousedown = function(ev){  
	    var e = ev||event;  
	    var x = e.clientX;  
	    var y = e.clientY;  
	    drag(canEl,x,y);  
	}; 
}

//拖拽 
function drag(canEl,x,y){  
    // 按下鼠标判断鼠标位置是图像上，当画布上有多个路径时，isPointInPath只能判断最后那一个绘制的路径  
    if(canEl.getContext("2d").isPointInPath(x,y)){  
        //路径正确，鼠标移动事件  
        canEl.onmousemove = function(ev){  
            var e = ev||event;  
            var ax = e.clientX;  
            var ay = e.clientY;  
            //鼠标移动每一帧都清楚画布内容，然后重新画圆  
            canEl.getContext().clearRect(0,0,canEl.width,canEl.height);  
            createBlock(ax,ay);  
        };  
        //鼠标移开事件  
        canEl.onmouseup = function(){  
            canEl.onmousemove = null;  
            canEl.onmouseup = null;  
        };  
    };  
}  
*/
 

/*var str = 'M';
var byte2 = intToByte(str);
console.log("1===="+byte2)
console.log("2===="+str.charCodeAt());*/