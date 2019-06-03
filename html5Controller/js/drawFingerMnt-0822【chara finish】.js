//数据类型【{x0,y0,x1,y1,angle,cvsId}】 
var centerCon = [];//中心点Type=A
var characCon = [];//细节特征Type=B  
var lTriCon = [];//左三角Type=C  【obj】  obj.x,obj,y
var rTriCon = [];//右三角Type=D  【obj】  obj.x,obj,y
var downCenterCon = [];//下中心Type=E  【obj】  obj.x,obj,y
var fingerDirCon = [361];//指纹方向Type=F 【angle】 默认不确定
//案件
var imptAreaCon = [];//重要区域 G

//类型
var DATATYPE = "";// 0:案     1：人
var Type;
var ALL_MNT_DATA = [];//所有的特征数据


var AcenterConId = "";//页面保存特征数据html元素的id


var BcharacterConId = "";


var ClTriConId = "";


var DrTriConId = "";


var EdownCenterConId = "";


var FfingerDriConId = "";


/*=========画布初始化参数========================================*/
var WIDTH_ = 0;
var HEIGHT_ = 0;
var CVSCONT_WIDTH = 0;
var CVSCONT;//画布容器
var INITID = "character";
var MNT_CVS_CONTAINER_ID = 'AFIS_FINGER_DIV';//存放图像和特征画布
var ICON_CONT_WIDTH = '168';//调节图标栏的宽度。
var ICON_SIZE = 40;//css中图标的宽高
var IFSAVE = true;//true 默认是 可以保存特征

/*=========画笔参数=================================================*/
var tmp_x = 0;//存放画笔起始点
var tmp_y = 0;
var mntIdIndex = 0;//细节特征id下标
var angle;
var precvsId;
var R_Color = "#FF0000";//红
var Y_Color = "#FFFF00";//黄
var Left_Color = "#0000FF";//蓝
var Right_Color = "#009944";
var FingerDir_Color = "#00FF00";//绿
var ImptArea_Color = "#03A89E";
var unUsedColor = "#D3D3D3";
var VR_CharacterLen = 15;
var VR_CenterLen = 25;
var VR_AngleLen = 25;//三角形边长
var VR_DownCenLen = 30;
var VR_FingerDirLen = 40;

//案件估计区域半径
var VR_CharacterAra = 20;
var VR_CharacterAraMax = 80;
var VR_ImptAreaRad = 20;//重要区域半径
var VR_maxImptAreaRad = 80;


/*========捺印、现场指纹特征参数=====================================*/
var TRI_LENGTH = 1652;//【捺印平面或者滚动指纹的特征数据长度是1652】
var FINGER_MINUTIA_NUM = 200;
var MNTVERSION = 'M';//0默认是人工提取
var FINGER_WIDTH = 640;//2-4 0-缺指
var FINGER_HEIGHT = 640;//4-6 0-缺指
var TCD = [0,0,0,0,0,0,0,0,0,0];//6-16
var POSITION = 0;
var REGION = 0;//指纹区域
var QUALITY = 0;
var MINUTIA_NUM = 0;//19细节特征的有效数   0表示缺指
var IMPTAREA_NUM = 0;//【现场】重要区域特征的有效数   0表示缺指

var CI = 10 //细节特征置信度 Confidence interval
var FINGER_MNT_TYPE = 0;// 特征点类型或其它 保留

//var	FORT = 0;	//20-22 指纹方向-与指纹根基线垂直并指向指尖方向，坐标系同上  361-完全无法确定  直接存储在fingerDirCon中
var	CFORT = 0;	//22  指纹方向置信度
var	CFRP = 0;	//23  纹型置信度
var	CFRP0 = 0;	//24  副纹型置信度
var	CFC = 0;	//25  中心置信度
var	CFE = 0;	//26  下中心置信度	
var	CFL = 0;	//27  左三角置信度	
var	CFR = 0;	//28  右三角置信度	

var RP = -1;//指纹纹型
var WHORLTYPE = "";//斗型旋转方向
var RP0 = "";//指纹副纹型
var WHORLTYPE0 = "";
var SCAR = 2;//默认无伤疤
// 0-不定
// 1-有伤疤
// 2-无伤疤

//纹型
var	FINGER_MNTRP_UNDET = 0;		    /* 不确定 */
var	FINGER_MNTRP_ARCH = 1;		    /* 弓型  */
var	FINGER_MNTRP_LEFTLOOP = 2;		/* 左箕 */
var	FINGER_MNTRP_RIGHTLOOP = 3;		/* 右箕 */
var	FINGER_MNTRP_WHORL = 4;	        /* 斗  */

//页面其他参数
var BARCODE;


/*=========功能函数==========================================*/

String.prototype.endWith=function(endStr){
  var d=this.length-endStr.length;
  return (d>=0&&this.lastIndexOf(endStr)==d);
}
 
//在开始下一次鼠标点击事件前，解除鼠标事件的绑定
var mousedownFn;
var mouseupFn; 
var mouseoverFn; 
var isMouseDown = false;
var isMouseUp = false; 
var isMouseOver = false; 
function unbindKey(){
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

function intToByte(val){
	var reg= /^[A-Za-z]+$/;
	var res ;
	if (reg.test(val)){
		res = val.charCodeAt();
	}else{
		res = parseInt(val);
	}
	var targets = new Array(2);
	targets[0] = (res & 0xff);// 最低位
	targets[1] = ((res >> 8) & 0xff);// 次低位
	return targets;
}

var browserVersion = function(){
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    if (userAgent.indexOf("Chrome") > -1){  
 		return "Chrome";  
   }  
  	if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {  
      return "IE";  
  	}  
    var isOpera = userAgent.indexOf("Opera") > -1;  
    if (isOpera) {  
      return "Opera"  
    };   
    if (userAgent.indexOf("Firefox") > -1) {  
      return "FF";  
    }   
  	if (userAgent.indexOf("Safari") > -1) {  
      return "Safari";  
  	}   
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


var getCvsRelativeX = function(e,cvsId){
	return getPos(e).x-document.getElementById(cvsId).offsetLeft;
}

var getCvsRelativeY = function(e,cvsId){
	return getPos(e).y-document.getElementById(cvsId).offsetTop;
}

var getPos = function(e) {
    var mouse={x:0,y:0}
    var e=e||event;
    if(e.pageX||e.pageY){
        mouse.x=e.pageX;
        mouse.y=e.pageY;
    }else{
        mouse.x=e.pageX+document.body.scrollLeft+document.documentElement.scrollLeft;
        mouse.y=e.pageY+document.body.scrollTop+document.documentElement.scrollTop;
    }
    if(browserVersion() == "IE" || browserVersion() == "Edge"){
    	 mouse.y = eval( mouse.y)-30;//IE与实际值会差30
    }
    return mouse;
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

/** 
 * byte数组中取int数值，本方法适用于(低位在前，高位在后)的顺序，和和intToBytes（）配套使用
 *  
 * @param src 
 *            byte数组 
 * @param offset 
 *            从数组的第offset位开始 
 * @return int数值 
 */ 
var bytesToInt = function(src, offset) {
	var  value;	
	value = (src[offset] & 0xFF) 
		| ((src[offset+1] & 0xFF)<<8) 
		/*| ((src[offset+2] & 0xFF)<<16) 
		| ((src[offset+3] & 0xFF)<<24);*/
	return value;
}


var byteEleToInt = function(arg1,arg2) {//byte arr to int
	var  value;	
	if(!arg2){
		value = (arg1 & 0xFF);
	}else{
		value = (arg1 & 0xFF) | ((arg2 & 0xFF)<<8) ;
	}
	return value;
}

var subByte = function(arr,begin,end,t){//截取完数组并转换完数据类型  t表示转型的数据占字节数  默认为1 
	if (end > arr.length){
		begin = arr.length;
	}else if (end < 0){
		begin = 0;
	}
	var len = end - begin;
	var arr_;
	if(t==2){
		len /= 2; 
		arr_ = new Array(len);
		var index = 0;
		for (var i = begin; i < end; i++) {
			arr_[index] = byteEleToInt(arr[i],arr[i+1]);
			index ++;
			i++;
		}
	}else{
		arr_ = new Array(len);
		for (var i = begin; i < end; i++) {
			arr_[i - begin] = byteEleToInt(arr[i]);
		}
	}
	return arr_;
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

var getXY = function(x0,y0,len,angle){
	var obj = new Object();
	if(angle ==0 || angle ==180 ||angle ==360){
		if(angle == 180){
			obj.x1 = x0-len;
		}else{
			obj.x1 = x0+len;
		}
		obj.y1 = y0;
	}else if(angle ==90 || angle == 270){
		if(angle == 90){
			obj.y1 = y0+len;
		}else{
			obj.y1 = y0-len;
		}
		obj.x1 = x0;
	}else if(0<angle<90){
		obj.x1 = x0 + len*Math.cos(angle*Math.PI/180);
		obj.y1 = y0 + len*Math.sin(angle*Math.PI/180);
	}else if(90<angle<180){
		angle = 180 - angle;
		obj.x1 = x0 - len*Math.cos(angle*Math.PI/180);
		obj.y1 = y0 + len*Math.sin(angle*Math.PI/180);
	}else if(180<angle<270){
		angle = 270 - angle;
		obj.x1 = x0 - len*Math.sin(angle*Math.PI/180);
		obj.y1 = y0 - len*Math.cos(angle*Math.PI/180);
	}else if(270<angle<360){
		angle = 360 - angle;
		obj.x1 = x0 + len*Math.sin(angle*Math.PI/180);
		obj.y1 = y0 - len*Math.cos(angle*Math.PI/180);
	}
    return obj;
}

var validNum = 0;
var removeCvsAndEle = function(x,y,objCon){
	var ifR = false;
	for(var i = 0; i < objCon.length;i++) {
		var obj = objCon[i];
		var tempX = obj.x0;
		var tempY = obj.y0;
		var btn = document.getElementById(obj.cvsId);
		if(btn == null){
			continue;
		}
		var ctx = btn.getContext("2d");
		if( (tempX>=(x-20) && tempX<=(x+20))&&(tempY>=(y-20) && tempY<=(y+20))){
			ctx.clearRect(0,0,this.WIDTH_,this.HEIGHT_);
			removeObjFromArr(objCon,obj);
			//if(btnNum == 2){//删除元素
			removeEle(obj.cvsId);
			//}
			ifR = true;
			break;
		}
	}
	return ifR;
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

/*====================构造函数=================================
/*
 * 各类特征构造函数
 * 特征类型：坐标原点x0,y0,坐标末点x1,y1,角度,置信度，数据类型,画布ID，画笔颜色 
 */
 var characObj = function (x0,y0,x1,y1,angle,cvsId,c,type,color,r){
	this.x0 = x0;
	this.y0 = y0;
	this.x1 = x1;
	this.y1 = y1; 
	this.angle =  angle;
	this.cvsId = cvsId;
	this.c = c;//细节特征置信度
	this.type = type;
	this.color = color;
	this.r = r;//估计区域半径
}

//绘制空心圆构造函数
var hollowCir= function(cvsId,x0,y0,r,color){
	this.cvsId = cvsId;
	this.x0 = x0;
	this.y0 = y0;
	this.r = r;
	this.color = color;
}

//两点之间的距离
var getDist = function(x0,y0,x,y,min,max){
	var d = 0;
	d = Math.sqrt((x0-x)*(x0-x)+(y0-y)*(y0-y));
	if(d>max){
		d = max;
	}else if(d<min){
		d = min;
	}
	return d;
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
	$("#"+MNT_CVS_CONTAINER_ID).append("<img id='"+cvsId+"' width='"+this.WIDTH_+"' height='"+this.HEIGHT_+"'"
	 +"style='' />");
	 return e;
}

var createCav = function(parentDivId,Type){
	var eleId = "";
	if(Type == "B" || Type == "G"){
		eleId = mntIdIndex; 
	}
	var id = Type+INITID+eleId;
	//$("#"+parentDivId).append("<canvas id='"+id+"' class = 'character' width='"+this.WIDTH_+"px' height='"+this.HEIGHT_+"px'"
	$("#"+parentDivId).append("<canvas id='"+id+"' class = 'character' width='"+this.WIDTH_+"px' height='"+this.HEIGHT_+"px'"
	 //+"style='margin-left:-"+this.WIDTH_+"px;'></canvas>");
	 +"></canvas>");
}

//清除单个元素的画布内容,并重置对应的容器值
var clearCvsContentById = function(cvsId){
	var btn = document.getElementById(cvsId);
	var ctx = btn.getContext("2d");
	ctx.clearRect(0,0,this.WIDTH_,this.HEIGHT_);
	if(cvsId.substring(0,1)=="A"){ centerCon = []; return;}
	if(cvsId.substring(0,1)=="C"){ lTriCon = [];return;}
	if(cvsId.substring(0,1)=="D"){ rTriCon = [];return;}
	if(cvsId.substring(0,1)=="E"){ downCenterCon = [];return;}
	if(cvsId.substring(0,1)=="F"){ fingerDirCon = [];return;}
}

//获取当前画布【将画布移到最上层】
var getPrevCav = function(cavId){
	var tempId = "#"+cavId;
    var prev = $(tempId);
    var last = $("canvas:last-child");
    if(prev.html()!=undefined){  
        last.after(prev);
    }
    /*else{
        //alert("到达最底部了");  
    } */ 
}

//只留一个元素
function onlyOne(obj){
	if(obj.length == 0){
		return true;
	}else{
		return false;
	}
}

/**=================画布初始化==========================**/
var initCvsArg = function(bs64ImgStr,mntJsonData,type){
	DATATYPE = type;  
	var barcode = "";
	var imgUrl = "img/1.bmp";
	//测试注销
	//var imgUrl = "data:image/png;base64,"+bs64ImgStr;//实际使用：eval("document."+ocxname+index+".ImageStream") 是base64的数据格式
	var cvscontIdName = "afis-mnt-cvsCont";
	var dbid = "";			
	var pid = "";			
	var index = "";			
	var mnttype = "";	
	var saveLimit  = true;//默认允许保存特征
   	initCanvas(barcode,imgUrl,mntJsonData,cvscontIdName);
}

var initCanvas = function(barcode,imgUrl,mntUrl,cavConId){
	document.getElementById(cavConId).className = 'cvsCont_AFIS_Css';
	var cvsCon = document.getElementById(cavConId);
	var cssVal = document.defaultView.getComputedStyle(cvsCon,null);
	this.CVSCONT_WIDTH  = cssVal.width;
	this.HEIGHT_ = cssVal.height;
	this.WIDTH_  = this.HEIGHT_;
	
	var imgId = "my_finger_mnt";
	var ef = addFingerImgCvs(cavConId,imgId);
	if(!ef){
		return;
	}
	var img = document.getElementById(imgId);
	img.src = imgUrl;
	
	//TODO 初始化画布参数
  initMntArg(img.width,img.height,cavConId,mntUrl);
};


var initMntArg = function(w,h,cvscontId,mntJsonData){
	this.WIDTH_ = w;
	this.HEIGHT_ = h;
	this.CVSCONT = cvscontId;
	ALL_MNT_DATA = mntJsonData;
	document.getElementById(this.CVSCONT).oncontextmenu = function(e){
	　　return false;
	}
	//初始化数据容器    先加载初始化数据再绘制图标
	if(DATATYPE == 0){
		parseLatMnt(mntJsonData);		
	}else{
		parsePFMnt(mntJsonData);
	}
	
	createIconDiv();
	
	initStyle();
	
	showAllTrait();
}

//初始化样式
var initStyle = function(){
	if(DATATYPE == 0){
		document.getElementById("priRidgePat").disabled = "disabled";
		document.getElementById("subRidgePat").disabled = "disabled";
		document.getElementById("typeIconDivId2").style.display="none";
		
	}else{
		var imptObj  = document.getElementById("drawImptAreaId");
		imptObj.disabled=true;
		imptObj.style.borderColor = unUsedColor;		
	
	}
}

var createIconDiv = function(){
    var div = document.createElement("div");
	var divattr = document.createAttribute("class");
	divattr.value = "IconContainer_AFIS_Class";
	
	var divIdattr = document.createAttribute("id");
	divIdattr.value = "IconContainer_AFIS_Id";
	
	div.setAttributeNode(divattr);
	div.setAttributeNode(divIdattr);
	
	var style = document.createAttribute("style");
	div.setAttributeNode(style);
	div.style.width = this.ICON_CONT_WIDTH + "px";
	div.style.height = this.HEIGHT_+ "px";
	div.style.float = "right";
	div.style.display = "block";
	div.style.padding = "0px";
	div.style.border = "solid 1px #C0C0C0";

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
	
	//第一组  主纹型
	var btn1 = '<button id ="finerTpye1"    class = "afis_button_class" onclick="getType(this,1) "title="弓型" value="1" />';
	$("#"+div1Id).append(btn1);
	
	var btn2 = '<button id ="finerTpye2"  class = "afis_button_class" onclick="getType(this,1) "title="左箕" value="2" />';
	$("#"+div1Id).append(btn2);
	
	var btn3 = '<button id ="finerTpye3"  class = "afis_button_class" onclick="getType(this,1) "title="右箕" value="3" />';
	$("#"+div1Id).append(btn3);
	
	var btn4 = '<button id ="finerTpye4"  class = "afis_button_class" onclick="getType(this,1) "title="斗" value="4" />';
	$("#"+div1Id).append(btn4);
	
	var btn41 = '<button id ="finerTpye0" class = "afis_button_class" onclick="getType(this,1) "title="杂型" value="0" />';
	$("#"+div1Id).append(btn41);
	
	var div1End = "</div>";
	$("#"+divId).append(div1End);
	
	//第二组  副纹型
	var div2Id = 'typeIconDivId2';
	var div2 = "<div id = '"+div2Id+"'>";
	$("#"+divId).append(div2);
	
	var btn5 = '<button id ="_finerTpye1"   class = "afis_button_class" onclick="getType(this,2) "title="弓型" value="1" />';  
	$("#"+div2Id).append(btn5);                                                                                             
	                                                                                                                        
	var btn6 = '<button id ="_finerTpye2" class = "afis_button_class" onclick="getType(this,2) "title="左箕" value="2" />';    
	$("#"+div2Id).append(btn6);                                                                                             
	                                                                                                                        
	var btn7 = '<button id ="_finerTpye3" class = "afis_button_class" onclick="getType(this,2) "title="右箕" value="3" />';    
	$("#"+div2Id).append(btn7);                                                                                             
	                                                                                                                        
	var btn8 = '<button id ="_finerTpye4" class = "afis_button_class" onclick="getType(this,2) "title="斗" value="4" />';     
	$("#"+div2Id).append(btn8);                                                                                             
	                                                                                                                        
  	var btn81 = '<button id ="_finerTpye0"  class = "afis_button_class" onclick="getType(this,2) "title="杂型" value="0" />';   
	$("#"+div2Id).append(btn81);
	
	var div2End = "</div>";
	$("#"+divId).append(div2End);
	
	//纹型
	var div2Id = 'ridgeIconDivId';
	var div1 = "<div id = '"+div2Id+"'>";
	$("#"+divId).append(div1);
	
	$("#"+div2Id).append('主纹型:<input type="checkbox" id="priRidgePat" onclick="getRPVal(this,1)" value="10"/><label>10</label>');
	$("#"+div2Id).append('<br>副纹型:<input type="checkbox" id="subRidgePat" onclick="getRPVal(this,2)" value="10"/><label>10</label>');
	$("#"+div2Id).append('<br>伤'+getNB()+'疤:<input type="checkbox" id="scar" onclick="getScarVal('+SCAR+',true)" value = '+SCAR+'/><label id = "scarLable">无伤疤</label>');
	
	var div2End = "</div>";
	$("#"+divId).append(div2End);
	
}

var showWhorlType = function(id){
	var div1Id = "typeIconDivId"+id;
	var btn2 = '<button id ="whorl'+id+'0" name = "whorlName'+id+'" class = "afis_button_class" onclick="getWhorlType(this,'+id+') "title="不确定斗" value="0" />';
	$("#"+div1Id).append(btn2);
	
	var btn3 = '<button id ="whorl'+id+'1" name = "whorlName'+id+'" class = "afis_button_class" onclick="getWhorlType(this,'+id+') "title="正旋斗" value="1" />';
	$("#"+div1Id).append(btn3);
	
	var btn4 = '<button id ="whorl'+id+'2" name = "whorlName'+id+'" class = "afis_button_class" onclick="getWhorlType(this,'+id+') "title="反旋斗" value="2" />';
	$("#"+div1Id).append(btn4);
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
	if(t == 1){//主纹型
		RP = val;
		if(val == 4){//显示斗的方向
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
	}else if(t == 2){//副纹型
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
			childrenNodes[i].style.borderColor=unUsedColor;
		}else{
			childrenNodes[i].style.borderColor="#808080";//恢复原来的样式
		}
	}
}

var scarCou = -1;//初始化

var getScarVal = function(t,ifClick){
	var chkbox = document.getElementById("scar");
	var sclb = document.getElementById("scarLable");
	if(scarCou == -1){
		scarCou = t;
	}
	if(ifClick){
		if(scarCou > 1){
			scarCou = 0;//置0
		}else{
			scarCou+=1;	
		}
	}
	if(scarCou == 0){//--不确定 
   		chkbox.indeterminate = true;
   		sclb.innerHTML="不确定";
   		SCAR = 0;
   		chkbox.value = 0;
	}else if(scarCou == 1){//--有伤疤
		chkbox.indeterminate = false;
   		chkbox.checked = true;
    	sclb.innerHTML="有伤疤";
    	SCAR = 1;
    	chkbox.value = 1;
	}else{//--无伤疤
		chkbox.indeterminate = false;
    	chkbox.checked = false;
    	sclb.innerHTML="无伤疤";
    	SCAR = 2;
    	chkbox.value = 2;
	}
}

var showDrawMntIcon = function(divId){
	var div1Id = 'characterIconDivId';
	var div1 = "<div id = '"+div1Id+"'>";
	$("#"+divId).append(div1);
	
	var centerIconEle = '<button id ="drawCenter" class = "afis_button_class" onclick="drawCenterFn() "title="中   心" />';
	$("#"+div1Id).append(centerIconEle);
	
	var downCenterEle = '<button id="drawDownCen" class = "afis_button_class" onclick="drawDownCenFn()" title="下中心"/>';
	$("#"+div1Id).append(downCenterEle);
	
	var LtriIconEle = '<button id="drawLTri" class = "afis_button_class" onclick="drawLeftTriFn()" title="左三角"/>';
	$("#"+div1Id).append(LtriIconEle);
	
	var RtriIconEle = '<button id="drawRTri" class = "afis_button_class" onclick="drawRightTriFn()" title="右三角"/>';
	$("#"+div1Id).append(RtriIconEle);
	
	var imptAreaIconEle = '<button id ="drawImptAreaId" class = "afis_button_class" onclick="drawImptAreaFn()" title="重要区域"/>';
	$("#"+div1Id).append(imptAreaIconEle);
	
	var characterIconEle = '<button id ="drawCharacter" class = "afis_button_class" onclick="drawCharacterFn()" title="细节特征"/>';
	$("#"+div1Id).append(characterIconEle);
	
	var fingerDirEle = '<button id="drawFingerDir" class = "afis_button_class" onclick="drawFingerDirFn()" title="指纹方向"/>';
	$("#"+div1Id).append(fingerDirEle);
	
	var div1End = "</div>";
	$("#"+divId).append(div1End);
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

/*=====================解析人员特征数据=============================*/

var parsePFMnt = function(all_mntData){
	if(all_mntData.length < 1652){
		//测试注销
		//alert("特征数据不正确!");
		//return;
	}

	MNTVERSION = byteEleToInt(all_mntData[0]);
	FINGER_WIDTH = byteEleToInt(all_mntData[2],all_mntData[3]);
	FINGER_HEIGHT = byteEleToInt(all_mntData[4],all_mntData[5]);
	TCD = subByte(all_mntData,6,16);//6-16
	POSITION = byteEleToInt(all_mntData[16]);//16
	REGION = byteEleToInt(all_mntData[17]);
	QUALITY = byteEleToInt(all_mntData[18]);
	MINUTIA_NUM = byteEleToInt(all_mntData[19]);
	fingerDirCon[0] = byteEleToInt(all_mntData[20],all_mntData[21]);
	CFORT = byteEleToInt(all_mntData[22]);
	CFRP = byteEleToInt(all_mntData[23]);
	CFRP0 = byteEleToInt(all_mntData[24]);
	CFC = byteEleToInt(all_mntData[25]);
	CFE = byteEleToInt(all_mntData[26]);
	CFL = byteEleToInt(all_mntData[27]);
	CFR = byteEleToInt(all_mntData[28]);
	RP = byteEleToInt(all_mntData[29]);
	WHORLTYPE = byteEleToInt(all_mntData[30]);
	RP0 = byteEleToInt(all_mntData[31]);
	WHORLTYPE0 = byteEleToInt(all_mntData[32]);
	SCAR = byteEleToInt(all_mntData[33]);

	getCenterCon(all_mntData);
	getDownCenterCon(all_mntData);
	getLTriCon(all_mntData);
	getRTriCon(all_mntData);
	getCharacterCon(all_mntData);
	
}

/*=====================解析案件指纹特征数据=============================*/

var parseLatMnt = function(all_mntData){
	/*if(all_mntData.length < 1652){
		//测试注销
		//alert("特征数据不正确!");
		//return;
	}*/

	MNTVERSION = byteEleToInt(all_mntData[0]);
	FINGER_WIDTH = byteEleToInt(all_mntData[2],all_mntData[3]);
	FINGER_HEIGHT = byteEleToInt(all_mntData[4],all_mntData[5]);
	TCD = subByte(all_mntData,6,16);//6-16
	POSITION = byteEleToInt(all_mntData[16]);//16
	REGION = byteEleToInt(all_mntData[17]);
	QUALITY = byteEleToInt(all_mntData[18]);
	MINUTIA_NUM = byteEleToInt(all_mntData[19]);
	fingerDirCon[0] = byteEleToInt(all_mntData[20],all_mntData[21]);
	CFORT = byteEleToInt(all_mntData[22]);
	CFRP = byteEleToInt(all_mntData[23]);
	CFRP0 = byteEleToInt(all_mntData[24]);
	CFC = byteEleToInt(all_mntData[25]);
	CFE = byteEleToInt(all_mntData[26]);
	CFL = byteEleToInt(all_mntData[27]);
	CFR = byteEleToInt(all_mntData[28]);
	RP = byteEleToInt(all_mntData[29]);
	WHORLTYPE = byteEleToInt(all_mntData[30]);
	RP0 = byteEleToInt(all_mntData[31]);
	WHORLTYPE0 = byteEleToInt(all_mntData[32]);
	SCAR = byteEleToInt(all_mntData[33]);

	getCenterCon(all_mntData);
	getDownCenterCon(all_mntData);
	getLTriCon(all_mntData);
	getRTriCon(all_mntData);
	getCharacterCon(all_mntData);
	
	showAllTrait();
}

var getCenterCon = function(e){
	var obj = new characObj();
	obj.x0 = byteEleToInt(e[34],e[35]);
	obj.y0 = byteEleToInt(e[36],e[37]);
	obj.angle = byteEleToInt(e[38],e[39]);
	centerCon.push(obj);
}

var getDownCenterCon = function(e){
	var obj = new characObj();
	obj.x0 = byteEleToInt(e[40],e[41]);
	obj.y0 = byteEleToInt(e[42],e[43]);
	downCenterCon.push(obj);
}

var getLTriCon = function(e){
	var obj = new characObj();
	obj.x0 = byteEleToInt(e[44],e[45]);
	obj.y0 = byteEleToInt(e[46],e[47]);
	lTriCon.push(obj);
}

var getRTriCon = function(e){
	var obj = new characObj();
	obj.x0 = byteEleToInt(e[48],e[49]);
	obj.y0 = byteEleToInt(e[50],e[51]);
	rTriCon.push(obj);
}

var getCharacterCon = function(e){//应该存储前面的有效数
	for (var i = 52; i < MINUTIA_NUM; i++) {
		var obj = new characObj();
		obj.x0 = byteEleToInt(e[i],e[i+1]);
		obj.y0 = byteEleToInt(e[i+2],e[i+3]);
		obj.angle = byteEleToInt(e[i+4],e[i+5]);
		obj.c = byteEleToInt(e[i+6]);
		obj.type = byteEleToInt(e[i+7]);
		i = i+7;//变量长度是8 但是下一次循环加1,所以此处+7即可
		characCon.push(obj);
	}
}

/*=====================显示特征数据=============================*/

var showAllTrait = function(){
	//中心特征	
	showCenter();
	//细节特征	
	showCharac();
	//左三角
	showLTri();
	//右三角
	showRTri();
	//下中心	
	showDownCenter();
	//指纹方向
	showFingerDir();
	//显示纹型
	showFingerType()
	
}

var showCenter = function(){
	Type = "A";
	 var id = Type+INITID;
	 precvsId = "#"+id;
	 var el = document.getElementById(id);
	 if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	 }
	for (var i = 0; i < centerCon.length; i++) {
		var obj = centerCon[i];
		var xy = getXY(obj.x0,obj.y0,VR_CenterLen,obj.angle);//根据原点坐标,长度,角度,获取末端坐标
		//测试
		//drawCir(id,obj.x0,obj.y0,3,"#0000FF",3);
		//drawLine_arg(id,obj.x0,obj.y0,xy.x1,xy.y1,4,"#0000FF");
		drawCir(id,obj.x0,obj.y0,3,R_Color,3);
		drawLine_arg(id,obj.x0,obj.y0,obj.x1,obj.y1,4,R_Color);
	}
	
}

var showCharac = function(){
	Type = "B";
	mntIdIndex = 0;
	if(mntIdIndex== 0){
	 	mntIdIndex = 1;
	 	firstCharacFlag = true;
	}
	for(var i = 0; i < characCon.length; i++) {
		var id = Type+INITID+mntIdIndex;
		precvsId = "#"+id;
		var el = document.getElementById(id);
		if(el == null || el == undefined){
		 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
		}
		var obj = characCon[i];
		var xy = getXY(obj.x0,obj.y0,VR_CharacterLen,obj.angle);//根据原点坐标,长度,角度,获取末端坐标
		//测试
		//drawCir(id,obj.x0,obj.y0,2,"#0000FF",3);
		//drawLine_arg(id,obj.x0,obj.y0,xy.x1,xy.y1,3,"#0000FF");
		drawCir(id,obj.x0,obj.y0,2,Y_Color,2);
		drawLine_arg(id,obj.x0,obj.y0,obj.x1,obj.y1,3,Y_Color);
		mntIdIndex++;
	}
}


var showLTri = function(){
	Type = "C";
	var id = Type+INITID;
	precvsId = "#"+id;
	var el = document.getElementById(id);
	if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	}
	 isMouseDown = true;
	for(var i = 0; i < lTriCon.length; i++) {
		var obj = lTriCon[i];
		//测试
		//drawLAngle(obj.x,obj.y,id,VR_AngleLen,2,"#FF00FF");
		//drawLAngle(obj.x,obj.y,id,VR_AngleLen,2,Left_Color);
		var length = VR_AngleLen;
	  angleObj.x = obj.x;
	  angleObj.y = obj.y;
	  angleObj.length = length;
	  angleObj.cvsId = id;
	  angleObj.color = Left_Color;
	  draw_Angle_fram();//初始化
		
	}
}

var showRTri = function(){
	Type = "D";
	var id = Type+INITID;
	precvsId = "#"+id;
	var el = document.getElementById(id);
	if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	}
	isMouseDown = true;
	for(var i = 0; i < rTriCon.length; i++) {
		var obj = rTriCon[i];
		//测试
		drawRAngle(obj.x,obj.y,id,VR_AngleLen,2,"#FFAABB");
		//drawRAngle(obj.x,obj.y,id,VR_AngleLen,2,Right_Color);
	}
}

var showDownCenter=function(){
	Type = "E";
	var id = Type+INITID;
	precvsId = "#"+id;
	var el = document.getElementById(id);
	if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	}
	for(var i = 0; i < downCenterCon.length; i++) {
		var obj = downCenterCon[i];
		//测试
		//drawDown_Cen(obj.x,obj.y,VR_DownCenLen,id,"#FFFF00");
		drawDown_Cen(obj.x,obj.y,VR_DownCenLen,id,R_Color);
	}
}


var showFingerDir = function(){
	Type = "F";
	var id = Type+INITID;
	precvsId = "#"+id;
	var el = document.getElementById(id);
	if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	}
	getPrevCav(id);
	var canvas = document.getElementById(id);
	var ctx = canvas.getContext("2d");
	fingerDir = new arrow();
    fingerDir.cvsId = id;
	fingerDir.x = WIDTH_/2;
  fingerDir.y = HEIGHT_-100;
    
  //TODO 测试数据
  //fingerDirCon[0] = 225;
  if(fingerDirCon[0] == 361){
   	fingerDir.rolation = (-90/180)*Math.PI+Math.PI/2; //初始化时,方向垂直向上
  }else{
  	fingerDir.rolation = (fingerDirCon[0]/180)*Math.PI+Math.PI/2;
  }
	fingerDir.drawDir(ctx,FingerDir_Color);
	//测试
	//fingerDir.drawDir(ctx,"#FF0000");
    
  //给画布特征绑定鼠标事件
  var isMouseDown = false;
	canvas.addEventListener('mousedown',function(e) {
	    isMouseDown=true;
	    if(isMouseDown==true){
	        c_x=getCvsRelativeX(event,id);
	        c_y=getCvsRelativeY(event,id);
	        requestAnimationFrame(drawFram)
	    }
	},false)
	canvas.addEventListener('mousemove',function(e) {
	    if(isMouseDown==true){
	        c_x=getCvsRelativeX(event,id);
	        c_y=getCvsRelativeY(event,id);
	        requestAnimationFrame(drawFram)
	    }
	},false)
	canvas.addEventListener('mouseup',function(e) {
	    isMouseDown=false;
	},false)
}


var showFingerType = function(){
	if(RP != -1){
		var id0 = "finerTpye"+RP;//主纹型
		exchangeStyle(document.getElementById(id0));
		//TODO 显示斗型方向
		if(RP == 4){
			if(WHORLTYPE !== ""){
				showWhorlType(1);
				var wId = "whorl1"+WHORLTYPE;
				exchangeStyle(document.getElementById(wId));
			}
		}
	}
	if(RP0 != -1){
		var id1 = "_finerTpye"+RP0;
		exchangeStyle(document.getElementById(id1));
		//TODO 显示斗型方向
		if(RP == 4){
			if(WHORLTYPE0 !== ""){
				showWhorlType(2);
				var wId = "whorl2"+WHORLTYPE0;
				exchangeStyle(document.getElementById(wId));
			}
		}
	}
	//显示纹型置信度
	if(CFRP != 0){
		document.getElementById("priRidgePat").checked = true;
	}
	if(CFRP0 != 0){
		document.getElementById("subRidgePat").checked = true;
	}
	getScarVal(SCAR);
	
}

/*==========================绑定点击事件==============================================*/

function drawCenterFn(){
	var icoUrl = "img/center.ico";
	var centerData = drawCenter(icoUrl);
}

function drawCharacterFn(){
	var icoUrl = "img/character.ico";
	var characterData = drawCharacter(icoUrl);
}

function drawLeftTriFn(){
	var icoUrl = "img/Ltri.ico";
	var characterData = drawLAnglele(icoUrl);
}

function drawRightTriFn(){
	var icoUrl = "img/Rtri.ico";
	var characterData = drawLAngleFn(icoUrl);
}

function drawImptAreaFn(){
	var icoUrl = "img/imptera.ico";
	var characterData = drawImptArea(icoUrl);
}

function drawDownCenFn(){
	var icoUrl = "img/downCenter.ico";
	var characterData = drawDownCen(icoUrl);
}

function drawFingerDirFn(){
	var icoUrl = "img/fingerDir.ico";
	var characterData = drawFingerDir(icoUrl);
}


/*=========设计绘制函数==================================================*/

// A global object is should be created to store the parameters in the process of rendering animation

var drawCenter = function (icnUrl){
	 Type = "A";
	 var id = Type+INITID;
	 showIco(icnUrl);
	 precvsId = "#"+id;
	 unbindKey();
	 var el = document.getElementById(id);
	 if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	 }
	 getPrevCav(id);//最后一次绘制的画布
	 $(precvsId).bind("mousedown",mousedownFn = function(){
	 	isMouseDown = true;
	    drawCh(event,"center",R_Color,id);
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
	 precvsId = "#"+id;
	 unbindKey();
	var el = document.getElementById(id);
	 if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	 }
	getPrevCav(id);
	$(precvsId).bind("mousedown",mousedownFn = function(){
		isMouseDown = true;
	    drawCh(event,"null",Y_Color,id);
	});
}

var drawLAnglele = function (icnUrl){
	showIco(icnUrl);
	Type = "C";
	var id = Type+INITID;
	 precvsId = "#"+id;
	 unbindKey();
	 var el = document.getElementById(id);
	 if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	 }
	getPrevCav(id);
	$(precvsId).bind("mousedown",mousedownFn = function(){
		isMouseDown = true;
		cnvs_getTriAngle(event,"left",Left_Color,id);
	});	
}

var drawLAngleFn = function (icnUrl){
	showIco(icnUrl);
	Type = "D";
	var id = Type+INITID;
	precvsId = "#"+id;
	unbindKey();
	var el = document.getElementById(id);
	if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	}
	getPrevCav(id);
	$(precvsId).bind("mousedown",mousedownFn = function(){
		isMouseDown = true;
		cnvs_getTriAngle(event,"right",Right_Color,id);
	});	
}

var firstImptAreaFlag = false;
var drawImptArea = function(icnUrl){
	showIco(icnUrl);
	Type = "G";
	mntIdIndex = 0;//置0  重新画,和细节特征分离
	if(mntIdIndex== 0){
		mntIdIndex = 1;//第一次绘制特征时,id置1
	 	firstImptAreaFlag = true;
	}
	var id = Type+INITID+mntIdIndex;
	precvsId = "#"+id;
	unbindKey();
	var el = document.getElementById(id);
	if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	}
	getPrevCav(id);
	$(precvsId).bind("mousedown",mousedownFn = function(){
		cnvs_getImptArea(event,ImptArea_Color,id);
	});	
}


var drawDownCen = function (icnUrl){
	showIco(icnUrl);
	Type = "E";
	var id = Type+INITID;
	precvsId = "#"+id;
	unbindKey();
	var el = document.getElementById(id);
	if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	}
	getPrevCav(id);
	$(precvsId).bind("mousedown",mousedownFn = function(){
		isMouseDown = true;
		cnvs_getCenter(event,R_Color,id);
	});	
}


var drawFingerDir = function (icnUrl){
	showIco(icnUrl);
	Type = "F";
	var id = Type+INITID;
	 precvsId = "#"+id;
	 unbindKey();
	 var el = document.getElementById(id);
	 if(el == null || el == undefined){
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
	 }
	getPrevCav(id);
	cnvs_getDir(event,FingerDir_Color,id);
}


var drawCir = function(cvsId,x0,y0,lineWith,color,r){//实心圆
	var b = document.getElementById(cvsId);
	var ctx0=b.getContext("2d");
	ctx0.beginPath();
	ctx0.arc(x0,y0,r,0,2*Math.PI);
	ctx0.fillStyle = color;
	ctx0.fill();//填充颜色
	ctx0.strokeStyle = color;
	ctx0.lineWidth = lineWith;
	ctx0.stroke();
	ctx0.closePath();
}

var drawLine_arg = function (cvsId,x0,y0,x1,y1,lineWith,color){
	var b = document.getElementById(cvsId);
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

var draw_Hollow_Cir = function(){//空心圆
	var b = document.getElementById(hollowCir.cvsId);
	var ctx0=b.getContext("2d");
	ctx0.beginPath();
	ctx0.arc(hollowCir.x0,hollowCir.y0,hollowCir.r,0,2*Math.PI);
	ctx0.strokeStyle = hollowCir.color;
	ctx0.lineWidth = 2;
	ctx0.stroke();
	ctx0.closePath();
}

var characObj;
function drawCh(e,arg,color,cvsId){//获取起始位置跑【绘制点击图像界面的起点原点】
	tmp_x = getCvsRelativeX(e,cvsId);
	tmp_y = getCvsRelativeY(e,cvsId);
	characObj = new Object();
	var lineWith;
	if(arg=="center"){
		lineWith = 3 ;
		Type = "A";
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
			if(characCon.length == 0 ){
				alert("已无细节特征需要删除!");
				return;
			}
			var flag = removeCvsAndEle(tmp_x,tmp_y,characCon);
			if(flag){
				MINUTIA_NUM --;
				validNum = MINUTIA_NUM;
				document.getElementById("xycoordinates").innerHTML="Coordinates: (有效特征个数:"+validNum+")";
			}
		}else{
			return;
		}
	}
	if (btnNum!=0){
	   return;
	}
	characObj.c = CI;
	characObj.x0 = tmp_x;
	characObj.y0 = tmp_y;
	characObj.type = FINGER_MNT_TYPE;
	characObj.cvsId = cvsId;
	characObj.color = color;
	characObj.lineWidth = lineWith;
  //判断画布是否存在
  if(Type == "B" && !firstCharacFlag ){
		mntIdIndex+=1;
		var id1 = Type+INITID+mntIdIndex;
		cvsId = getNewId(id1);
		precvsId = "#"+cvsId;
		createCav(this.MNT_CVS_CONTAINER_ID,Type);
		getPrevCav(cvsId);
		//保存新的画布id  并给其绑定事件
		characObj.cvsId = cvsId;
		$(precvsId).bind("mousedown",mousedownFn = function(){
			isMouseDown = true;
		    drawCh(event,"null",Y_Color,cvsId);
		});
   }
  	isMouseOver = false;
  	var tmpId = "#"+cvsId;
	if(isMouseDown == true){
		$(tmpId).bind("mousemove",mouseoverFn = function(){
		isMouseOver = true;
	    if(isMouseOver==true && isMouseDown == true){
	        characObj.x1=getCvsRelativeX(event,cvsId);
	        characObj.y1=getCvsRelativeY(event,cvsId);
	        //requestAnimationFrame(draw_Chara_Fram);
	        draw_Chara_Fram();
	    }
	});
	}
	$(tmpId).bind("mouseup",mouseupFn = function(){
		$(".character").unbind("mouseup",mouseupFn);//解绑上次的mouseup
		$(".character").unbind("mousemove",mouseoverFn);
	 	isMouseOver = false;
	 	isMouseDown = false;
	 	if(centerCon.length != 0 && Type == "A"){
	 		centerCon = [];
	 	}
	 	firstCharacFlag = false;
	 	if(!(characObj.r>0)){//防止单击原地但为实际画特征
	 		return;
	 	}
	 	if(Type == "A"){
	 		centerCon.push(characObj);
	 	}else if(Type == "B"){
	 		characCon.push(characObj);
	 		MINUTIA_NUM ++;
	 	}
	 	document.getElementById("xycoordinates").innerHTML="Coordinates: (角度是:" +characObj.angle+
	 	",末端坐标:"+ characObj.x1 + "," + characObj.y1 +", 特征点个数:"+MINUTIA_NUM+" . characCon的len="+characCon.length+")";
	 	/*console.log("细节特征的长度===="+characCon.length);
	 	console.log("细节特征mntIdIndex===="+mntIdIndex);
	 	console.log("细节特征的div===="+characCon[mntIdIndex-1].cvsId);*/
	});	
  
}


var draw_Chara_Fram = function(){
	var r = 2;
	var length;
	if(Type=="A"){
		r = 3;
		length = VR_CenterLen;
		characObj.lineWith = 4 ;
	}else{
		length = VR_CharacterLen;
		characObj.lineWith = 3 ;
	}
	var d = getDist(tmp_x,tmp_y,characObj.x1,characObj.y1);
	if(d<VR_CharacterAra){
		d = VR_CharacterAra;
	}else if(d>VR_CharacterAraMax){
		d = VR_CharacterAraMax;
	}
	characObj.r = d;
	angle = getAngle(characObj.x0,characObj.y0,characObj.x1,characObj.y1);
	characObj.angle = angle;
	characObj.x1 = characObj.x0+length*Math.cos(angle/180*Math.PI).toPrecision(2);
	characObj.y1 = characObj.y0+length*Math.sin(angle/180*Math.PI).toPrecision(2);
	
	var canvas = document.getElementById(characObj.cvsId);//保证每幁画布就一个元素
	var ctx0=canvas.getContext("2d");
	ctx0.clearRect(0,0,canvas.width,canvas.height);
	drawCir(characObj.cvsId,characObj.x0,characObj.y0,r,characObj.color,r);
	drawLine_arg(characObj.cvsId,characObj.x0,characObj.y0,characObj.x1,characObj.y1,characObj.lineWith,characObj.color);
	
	if(DATATYPE == 1 || Type == "B"){//人和细节特征都不画区域
		return;
	}
	hollowCir.x0 = characObj.x0;
	hollowCir.y0 = characObj.y0;
	hollowCir.color = characObj.color;
	hollowCir.cvsId = characObj.cvsId;
	
	hollowCir.r = d;
	draw_Hollow_Cir();

}

//===============================绘制[左,右]三角==========================================
var angleObj;
var cnvs_getTriAngle = function(e,dir,color,cvsId) {//画三角特征
	if(!onlyOne(lTriCon) && dir == "left"){ 
			clearCvsContentById(cvsId);
	}
	if(!onlyOne(rTriCon) && dir == "right"){ 
			clearCvsContentById(cvsId);
	}
	var btnNum = event.button;
    if (btnNum!=0){
    	return;
    }
  angleObj = new Object();
	var x = getCvsRelativeX(e,cvsId);
	var y = getCvsRelativeY(e,cvsId);
	//由于图标的原因,欲绘制特征基于图标的中心点,应将原来基于左上角的坐标移到右下角中心点   有2的误差值
	x = x + ICON_SIZE/2-2; 
	y = y + ICON_SIZE/2-2;
	document.getElementById("xycoordinates").innerHTML="Coordinates: (坐标是:"+ x + "," + y +")";
  var length = VR_AngleLen;
  angleObj.x = x;
  angleObj.y = y;
  angleObj.length = length;
  angleObj.cvsId = cvsId;
  angleObj.color = color;
  draw_Angle_fram();//初始化
  var cirWidth = 2;
  if(dir=="left"){
    drawLAngle(x,y,cvsId,length,cirWidth,color);
  }else if(dir=="right"){
    drawRAngle(x,y,cvsId,length,cirWidth,color);
  }
}

var drawLAngle = function(x,y,cvsId,length,cirWidth,color){
	if(!onlyOne(lTriCon)){ 
		clearCvsContentById(cvsId);
	}
	if(isMouseDown == true){
		$("#"+cvsId).bind("mousemove",mouseoverFn = function(){
		isMouseOver = true;
	    if(isMouseOver==true && isMouseDown == true){
				angleObj.x1=getCvsRelativeX(event,cvsId);
				angleObj.y1=getCvsRelativeY(event,cvsId);
	      draw_Angle_fram();
	    }
	});
	}
	$("#"+cvsId).bind("mouseup",mouseupFn = function(){
		$(".character").unbind("mouseup",mouseupFn);
		$(".character").unbind("mousemove",mouseoverFn);
	 	isMouseOver = false;
	 	isMouseDown = false;
	 	if(lTriCon.length != 0 && Type == "C"){
	 		lTriCon = [];
	 	}
	 	lTriCon.push(angleObj);
	});	
    
}


var draw_Angle_fram = function(){
	var d = getDist(angleObj.x,angleObj.y,angleObj.x1,angleObj.y1);
	if(d<VR_CharacterAra){
		d = VR_CharacterAra;
	}else if(d>VR_CharacterAraMax){
		d = VR_CharacterAraMax;
	}
	angleObj.r = d;
	
	var canvas = document.getElementById(angleObj.cvsId);//保证每幁画布就一个元素
	var ctx0=canvas.getContext("2d");
	ctx0.clearRect(0,0,canvas.width,canvas.height);
	
	drawCir(angleObj.cvsId,angleObj.x,angleObj.y,2,angleObj.color,2);
	if(Type == "C"){
		draw_LAngle(angleObj.cvsId);
	}else{
		draw_RAngle(angleObj.cvsId);
	}
	if(DATATYPE ==1 ){
		return;		
	}
	hollowCir.x0 = angleObj.x;
	hollowCir.y0 = angleObj.y;
	hollowCir.color = angleObj.color;
	hollowCir.cvsId = angleObj.cvsId;
	hollowCir.r = d;
  draw_Hollow_Cir();
}


var draw_LAngle = function(cvsId){
	var b = document.getElementById(cvsId);
	var cxt = b.getContext("2d");
	var length = angleObj.length;
	cxt.beginPath();
	cxt.moveTo(angleObj.x-(Math.sqrt(3))*length/6, angleObj.y-length/2);
	cxt.lineTo(angleObj.x+(Math.sqrt(3))*length/3, angleObj.y);
	cxt.lineTo(angleObj.x-(Math.sqrt(3))*length/6, angleObj.y+length/2);
	cxt.lineWidth = 3;
	cxt.strokeStyle= angleObj.color;
	cxt.closePath();
	cxt.stroke();//绘图
}

var drawRAngle = function(x,y,cvsId,length,cirWidth,color){
	if(!onlyOne(rTriCon)){ 
		clearCvsContentById(cvsId);
	}

	if(isMouseDown == true){
		$("#"+cvsId).bind("mousemove",mouseoverFn = function(){
		isMouseOver = true;
	    if(isMouseOver==true && isMouseDown == true){
				angleObj.x1=getCvsRelativeX(event,cvsId);
				angleObj.y1=getCvsRelativeY(event,cvsId);
	    	draw_Angle_fram();
	    }
	});
	}
	$("#"+cvsId).bind("mouseup",mouseupFn = function(){
		$(".character").unbind("mouseup",mouseupFn);
		$(".character").unbind("mousemove",mouseoverFn);
	 	isMouseOver = false;
	 	isMouseDown = false;
	 	if(rTriCon.length != 0 && Type == "D"){
	 		rTriCon = [];
	 	}
	 	rTriCon.push(angleObj);
	});	
	
}

var draw_RAngle = function(cvsId){
	var b = document.getElementById(cvsId);
	var cxt = b.getContext("2d");
	var length = angleObj.length;
	cxt.beginPath();
	cxt.moveTo(angleObj.x-(Math.sqrt(3))*length/3, angleObj.y);
	cxt.lineTo(angleObj.x+(Math.sqrt(3))*length/6, angleObj.y-length/2);
	cxt.lineTo(angleObj.x+(Math.sqrt(3))*length/6, angleObj.y+length/2);
	cxt.lineWidth = 3;
	cxt.strokeStyle= angleObj.color;
	cxt.closePath();
	cxt.stroke();
}


//===============================重要区域==========================================
var imptAreaMsDn = false;
var cnvs_getImptArea = function(e,color,cvsId) {
	var btnNum = event.button;
	var x = getCvsRelativeX(e,cvsId);
  var y = getCvsRelativeY(e,cvsId);
  x = x + ICON_SIZE/2 -3; 
	y = y + ICON_SIZE/2 -3;
	if (btnNum==2){
		//右击删除细节特征
		if(Type == "G"){
			//alert("your operation is character!");
			if(imptAreaCon.length == 0 ){
				alert("已无重要区域需要删除!");
				return;
			}
			var flag = removeCvsAndEle(x,y,imptAreaCon);
			if(flag){
				IMPTAREA_NUM --;
				validNum = IMPTAREA_NUM;
				document.getElementById("xycoordinates").innerHTML="Coordinates: (重要区域有效特征个数:"+validNum+")";
			}
		}
	}
  if (btnNum!=0){
    return;
  }
  imptAreaMsDn = true;//必须放在左击事件后面  防止右击也可以绘制
  if(!firstImptAreaFlag){//不是第一次创建
   	mntIdIndex+=1;
	  var id1 = Type+INITID+mntIdIndex;//构建新画布的id
	  cvsId = getNewId(id1);
	 	precvsId = "#"+cvsId;
	 	createCav(this.MNT_CVS_CONTAINER_ID,Type);
		getPrevCav(cvsId);
		$(precvsId).bind("mousedown",mousedownFn = function(){
			cnvs_getImptArea(event,ImptArea_Color,cvsId);
		});	
  }
  
	var r = VR_ImptAreaRad;
	drawImptAra(x,y,r,cvsId,color);
	
	//绘制完成后,置为false
	firstImptAreaFlag = false;
}

//===============================绘制下中心(副中心)==========================================
var isMouseOver = false;
var cnvs_getCenter = function (e,color,cvsId) {//下中心
	if(!onlyOne(downCenterCon)){ 
		clearCvsContentById(cvsId);
	}
	var btnNum = event.button;
	if (btnNum!=0){
		return;
	}
	//var y = (e||event).clientY;
	var x = getCvsRelativeX(e,cvsId);
  var y = getCvsRelativeY(e,cvsId);
  x = x + ICON_SIZE/2 -3; 
	y = y + ICON_SIZE/2 -3;
	var len = VR_DownCenLen;
	drawDown_Cen(x,y,len,cvsId,color);
  document.getElementById("xycoordinates").innerHTML="Coordinates: (坐标是:"+ x + "," + y +")";
}

//定义一个全局的变量来存储各个形参
var imptAreaObj;
var drawImptAra = function(x,y,r,cvsId,color){
	var canvas = document.getElementById(cvsId);
	//var ctx = canvas.getContext("2d");
	var lineWith = 2;
	drawCir(cvsId,x,y,lineWith,color,1);
	imptAreaObj = new Object();
	imptAreaObj.cvsId = cvsId;
	imptAreaObj.x0 = x;
	imptAreaObj.y0 = y;
	imptAreaObj.r = r;
	imptAreaObj.color = color;
	imptAreaObj.lineWith = lineWith;
	imptAreaObj.impt_x = -1;//初始化
	draw_ImptCir_Fram();
	
	var isMouseOver = false;
	canvas.addEventListener('mousemove',function(e) {
		isMouseOver = true;
    if(isMouseOver==true && imptAreaMsDn == true){
        imptAreaObj.impt_x=getCvsRelativeX(event,cvsId);
        imptAreaObj.impt_y=getCvsRelativeY(event,cvsId);
        requestAnimationFrame(draw_ImptCir_Fram);
    }
	},false)
	//鼠标起来,终止绘图
	canvas.addEventListener('mouseup',function(e) {
		var btn = e.button;//0 :左击    2 右击 
		if(btn == 0){
			imptAreaCon.push(imptAreaObj);
		};
		imptAreaMsDn = false;
		isMouseOver = false;
	},false)
}

var draw_ImptCir_Fram = function(){
		var d = 0;
		if(imptAreaObj.impt_x != -1){//有移动
			d = getDist(imptAreaObj.impt_x,imptAreaObj.impt_y,imptAreaObj.x0,imptAreaObj.y0,
					VR_ImptAreaRad,VR_maxImptAreaRad);
			imptAreaObj.r = d;
			imptAreaObj.impt_x = -1;//使用完后初始化
			imptAreaObj.impt_y = 0;
		}
		var canvas = document.getElementById(imptAreaObj.cvsId);
		var ctx0=canvas.getContext("2d");
		ctx0.clearRect(0,0,canvas.width,canvas.height);
		
		hollowCir.x0 = imptAreaObj.x0;
		hollowCir.y0 = imptAreaObj.y0;
		hollowCir.color = imptAreaObj.color;
		hollowCir.cvsId = imptAreaObj.cvsId;
		
		hollowCir.r = 2;//先绘制小圆
		draw_Hollow_Cir();
		hollowCir.r = imptAreaObj.r;//再绘制大圆
		draw_Hollow_Cir();
		
}

var downCenObj;
var drawDown_Cen = function(x,y,len,cvsId,color){
	if(!onlyOne(downCenterCon)){ 
		clearCvsContentById(cvsId);
	}
	downCenObj = new Object();
	downCenObj.x=x;
	downCenObj.y=y;
	downCenObj.len=len;
	downCenObj.color=color;
	downCenObj.cvsId=cvsId;
	draw_dcenCir_Fram()//初始化
  if(isMouseDown == true){
		$("#"+cvsId).bind("mousemove",mouseoverFn = function(){
		isMouseOver = true;
	    if(isMouseOver==true && isMouseDown == true){
				downCenObj.x1=getCvsRelativeX(event,cvsId);
				downCenObj.y1=getCvsRelativeY(event,cvsId);
	    	draw_dcenCir_Fram();
	    }
	});
	}
	$("#"+cvsId).bind("mouseup",mouseupFn = function(){
		$(".character").unbind("mouseup",mouseupFn);
		$(".character").unbind("mousemove",mouseoverFn);
	 	isMouseOver = false;
	 	isMouseDown = false;
	 	if(downCenterCon.length != 0){
	 		downCenterCon = [];
	 	}
	 	downCenterCon.push(downCenObj);
	});	
}


var draw_dcenCir_Fram = function(){
	var d = getDist(downCenObj.x,downCenObj.y,downCenObj.x1,downCenObj.y1);
	if( !(d>0)){
		d = VR_CharacterAra;
	}
	if(d<VR_CharacterAra){
		d = VR_CharacterAra;
	}else if(d>VR_CharacterAraMax){
		d = VR_CharacterAraMax;
	}
	downCenObj.r = d;
	
	var canvas = document.getElementById(downCenObj.cvsId);//保证每幁画布就一个元素
	var ctx0=canvas.getContext("2d");
	ctx0.clearRect(0,0,canvas.width,canvas.height);
	
	drawCir(downCenObj.cvsId,downCenObj.x,downCenObj.y,2,downCenObj.color,2);

	hollowCir.x0 = downCenObj.x;
	hollowCir.y0 = downCenObj.y;
	hollowCir.color = downCenObj.color;
	hollowCir.cvsId = downCenObj.cvsId;
	hollowCir.r = d;
	drawdowncen();
	if(DATATYPE ==1 ){
		return;		
	}
  draw_Hollow_Cir();
}


var drawdowncen = function(){
	var b = document.getElementById(downCenObj.cvsId);
	var cxt = b.getContext("2d");
	cxt.beginPath();
  cxt.lineWidth = 3;
	cxt.strokeStyle= downCenObj.color;
	cxt.moveTo(downCenObj.x-downCenObj.len/2, downCenObj.y);
  cxt.lineTo(downCenObj.x+downCenObj.len/2, downCenObj.y);
  cxt.closePath();
	cxt.moveTo(downCenObj.x, downCenObj.y-downCenObj.len/2);
  cxt.lineTo(downCenObj.x, downCenObj.y+downCenObj.len/2);
  cxt.stroke();//绘图
}

//===============================绘制指纹方向==========================================
var fingerDir ;
var c_x,c_y; //相对于canvas坐标的位置；
var arrow=function () {
    this.x=0; 
    this.y=0;
    this.color=FingerDir_Color;
    this.rolation=0;
    this.cvsId = "";
} 
var cnvs_getDir = function (e,color,cvsId) {//指纹方向
	/*var btnNum = event.button;
	if (btnNum!=0){
		return;
	}*/
	var canvas = document.getElementById(cvsId);
	var ctx = canvas.getContext("2d");
    fingerDir = new arrow();
    fingerDir.cvsId = cvsId;
    fingerDir.color = color;
	  fingerDir.x = WIDTH_/2;
    fingerDir.y = HEIGHT_-100;
    /*if(!fingerDirCon.length>0){
    	fingerDir.drawDir(ctx,color);//初始化时,若已有指纹方向,则不初始化
    }*/
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
    var rola = Math.atan2(dy,dx);//弧度
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
    //测试注销
    fingerDir.rolation = rola;
    //fingerDir.rolation = (angle/180)*Math.PI+Math.PI/2; 
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fingerDir.drawDir(ctx,fingerDir.color);
}

arrow.prototype.drawDir = function (ctx,color){
	ctx.beginPath();
	ctx.save();
	ctx.translate(fingerDir.x,fingerDir.y);
	ctx.rotate(fingerDir.rolation);
	ctx.fillStyle = color;
	
	var len = VR_FingerDirLen;
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



/*=========保存所有特征==================================================*/
function saveMntFn(){
	/*var Id1 = "AcenterConId"; 
	var Id2 = "BcharacterConId"; 
	var Id3 = "ClTriConId"; 
	var Id4 = "DrTriConId"; 
	var Id5 = "EdownCenterConId"; 
	var Id6 = "FfingerDriConId"; 
	saveMntContId(Id1,Id2,Id3,Id4,Id5,Id6);*/
	//保存当前画布的编辑完的特征
	return saveMnt();
}

/*var saveMntContId = function(A,B,C,D,E,F){//初始化页面保存特征数据的html元素的id
	this.AcenterConId = A;
	this.BcharacterConId = B;
	this.ClTriConId = C;
	this.DrTriConId = D;
	this.EdownCenterConId = E;
	this.FfingerDriConId = F;
}*/

var saveMnt = function(){//保存特征的时候应该全部保存下来==>转为byte数组==>再转为base64数据
	if(!IFSAVE){//false 不让保存
		document.getElementById("saveMnt").setAttribute("disabled", false);
		document.getElementById("saveMnt").style.borderColor="#D3D3D3";
		alert("没有保存权限!");
		return;	
	}
	//测试数据  显示特征
	showCenter();
	showCharac();
	showLTri();
	showRTri();
	showDownCenter();
	showFingerDir();
	showFingerType();
	
	/* 
	 * TODO 临时存储特征在页面
	 document.getElementById(this.AcenterConId).innerHTML = centerCon;
	document.getElementById(this.BcharacterConId).innerHTML = characCon;
	document.getElementById(this.ClTriConId).innerHTML = lTriCon;
	document.getElementById(this.DrTriConId).innerHTML = rTriCon;
	document.getElementById(this.EdownCenterConId).innerHTML = downCenterCon;
	document.getElementById(this.FfingerDriConId).innerHTML = fingerDirCon;*/
	
	
	//保存所有编辑的人员指纹特征
	if(DATATYPE == 0){
		ALL_MNT_DATA = getLatFingerMnt();
	}else{
		ALL_MNT_DATA = getFingerMntByte();
	}
	
	/*//TODO  ajax调用后端,写入数据库
	var param = "";
	var flag = false;
	$.ajax({
		type:"POST",//数据量大,不可用get
		url:"<%=basePath%>/ShowPic",
		data:param,
		async:false,
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			alert("特征入库出现异常  = "+errorThrown);
		},
		success:function(data){
			data = data.replace(/^\s+|\s+$/g,"");
			flag = true;
		}
	})
	if(flag != "success"){
		alert(" failed to save editor mnt!");
		return "";
	}*/
	return ALL_MNT_DATA;
}

//获取编辑的案件捺印指纹
var latFingerMntData;
var getLatFingerMnt = function(){
	latFingerMntData = new LATFINGER_MNTSTRUCT();
	latFingerMntData.MntVersion = MNTVERSION;
	latFingerMntData.cfc = CFC;
	
}	




var fingerMntData;
var getFingerMntByte = function(){
	fingerMntData = new FINGER_MNTSTRUCT();
	fingerMntData.MntVersion = MNTVERSION;
	fingerMntData.width_2 = FINGER_WIDTH;
	fingerMntData.height_2 = FINGER_HEIGHT;
	fingerMntData.tcd = TCD;
	fingerMntData.f_position = POSITION;
	fingerMntData.region = REGION;
	fingerMntData.quality = QUALITY;
	fingerMntData.minutiae_num = MINUTIA_NUM;
	
	//待定 TODO
	if(fingerDirCon.length == 1){
		fingerMntData.fort_2 = fingerDirCon[0];
	}else{
		fingerMntData.fort_2 = 0;
	}
	fingerMntData.cfort = CFORT;
	fingerMntData.cfrp = CFRP;
	fingerMntData.cfrp0 = CFRP0;
	fingerMntData.cfc = CFC;
	fingerMntData.cfe = CFE;
	fingerMntData.cfl = CFL;
	fingerMntData.cfr = CFR;
	
   /* 纹型, ridge pattern , can be the following values:
	   MNTRP_UNDET, MNTRP_ARCH, MNTRP_LEFTLOOP, MNTRP_RIGHTLOOP, MNTRP_WHORL.
	*/
	if(RP==-1){
		alert("请先选择纹型!");
		return;
	}
	fingerMntData.rp = RP;	//指纹纹型
	fingerMntData.whorltype = WHORLTYPE;//斗型纹旋转方向
	fingerMntData.rp0 = RP0;//副纹型
	fingerMntData.whorltype0 = WHORLTYPE0;//副纹型旋转方向
	fingerMntData.scar = SCAR;//伤疤
	// 0-不定
	// 1-有伤疤
	// 2-无伤疤
	//上中心
	if(centerCon.length == 1){
		fingerMntData.cx_2 = centerCon[0].x0;//上中心[中心点]
		fingerMntData.cy_2 = centerCon[0].y0;				
		fingerMntData.ca_2 = centerCon[0].angle;//指纹中心点_特征方向
	}else{
		fingerMntData.cx_2 = 0;//上中心[中心点]
		fingerMntData.cy_2 = 0;				
		fingerMntData.ca_2 = 0;
	}
	//下中心
	if(downCenterCon.length == 1){
		fingerMntData.ex_2 = downCenterCon[0].x;//下中心【副中心】
		fingerMntData.ey_2 = downCenterCon[0].y;//上中心
	}else{
		fingerMntData.ex_2 = 0;
		fingerMntData.ey_2 = 0;
	}
	// 左三角
	if(lTriCon.length == 1){
		fingerMntData.ldx_2 = lTriCon[0].x;//44  左三角
		fingerMntData.ldy_2 = lTriCon[0].y;
	}else{
		fingerMntData.ldx_2 = 0;
		fingerMntData.ldy_2 = 0;
	}
	//右三角
	if(rTriCon.length == 1){
		fingerMntData.rdx_2 = rTriCon[0].x;	//48  右三角
		fingerMntData.rdy_2 = rTriCon[0].y;  //50-52
	}else{
		fingerMntData.rdx_2 = 0;
		fingerMntData.rdy_2 = 0;
	}
	//获取编辑好的细节特征
	var fingerMntArr = new Array();
	for (var i = 0; i < characCon.length; i++) {
		var fingerMinutia = new FingerMinutia(); 
		fingerMinutia.x = characCon[i].x0;
		fingerMinutia.y = characCon[i].y0;
		fingerMinutia.a = characCon[i].angle;
		fingerMinutia.c = characCon[i].c;
		fingerMinutia.type = characCon[i].type;
		fingerMntArr.push(fingerMinutia);
	}
	fingerMntData.fingerMinutiaArr = fingerMntArr;//有效数最多200个特征数据
	var byteData = getFingerMntByteArr(fingerMntData);//byte数组
	//测试数据
    /**var arry  = [-1, -40, -1, -32, 0, 16, 74, 70, 73, 70, 0, 1, 2, 0, 0, 1, 0, 1, 0, 0, -1, -37, 0, 67, 0, 8, 6, 6, 7, 6, 5, 8, 7, 7, 7, 9, 9, 8, 10, 12, 20, 13, 12, 11, 11, 12, 25, 18, 19, 15, 20, 29, 26, 31, 30, 29, 26, 28, 28, 32, 36, 46, 39, 32, 34, 44, 35, 28, 28, 40, 55, 41, 44, 48, 49, 52, 52, 52, 31, 39, 57, 61, 56, 50, 60, 46, 51, 52, 50, -1, -37, 0, 67, 1, 9, 9, 9, 12, 11, 12, 24, 13, 13, 24, 50, 33, 28, 33, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, -1, -64, 0, 17, 8, 0, 26, 0, 80, 3, 1, 34, 0, 2, 17, 1, 3, 17, 1, -1, -60, 0, 31, 0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, -1, -60, 0, -75, 16, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125, 1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, -127, -111, -95, 8, 35, 66, -79, -63, 21, 82, -47, -16, 36, 51, 98, 114, -126, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, -125, -124, -123, -122, -121, -120, -119, -118, -110, -109, -108, -107, -106, -105, -104, -103, -102, -94, -93, -92, -91, -90, -89, -88, -87, -86, -78, -77, -76, -75, -74, -73, -72, -71, -70, -62, -61, -60, -59, -58, -57, -56, -55, -54, -46, -45, -44, -43, -42, -41, -40, -39, -38, -31, -30, -29, -28, -27, -26, -25, -24, -23, -22, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -1, -60, 0, 31, 1, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, -1, -60, 0, -75, 17, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119, 0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, -127, 8, 20, 66, -111, -95, -79, -63, 9, 35, 51, 82, -16, 21, 98, 114, -47, 10, 22, 36, 52, -31, 37, -15, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, -126, -125, -124, -123, -122, -121, -120, -119, -118, -110, -109, -108, -107, -106, -105, -104, -103, -102, -94, -93, -92, -91, -90, -89, -88, -87, -86, -78, -77, -76, -75, -74, -73, -72, -71, -70, -62, -61, -60, -59, -58, -57, -56, -55, -54, -46, -45, -44, -43, -42, -41, -40, -39, -38, -30, -29, -28, -27, -26, -25, -24, -23, -22, -14, -13, -12, -11, -10, -9, -8, -7, -6, -1, -38, 0, 12, 3, 1, 0, 2, 17, 3, 17, 0, 63, 0, -9, -6, 40, -94, -128, 25, 28, -79, -52, -91, -94, -111, 93, 67, 50, -110, -89, 35, 32, -112, 71, -44, 16, 65, -9, 20, -6, -55, -16, -25, -4, -125, 38, -1, 0, -81, -5, -49, -3, 41, -106, -99, -81, -53, 36, 90, 88, -14, -92, 104, -52, -73, 54, -16, -77, 33, -38, -37, 30, 100, 70, 0, -114, 65, 42, -60, 100, 114, 58, -126, 13, 79, 55, -69, -52, 110, -24, -2, -1, 0, -40, -89, -42, -33, -115, -117, 48, 106, -70, 117, -43, -28, -74, 118, -9, -10, -77, 93, 69, -97, 50, 24, -26, 86, 116, -63, -63, -54, -125, -111, -125, -59, 88, -110, 88, -31, 80, -46, -56, -88, -91, -107, 65, 99, -127, -110, 64, 3, -22, 73, 0, 123, -102, -55, -15, 12, 81, -38, 120, 90, -14, 91, 104, -42, 23, -80, -74, 121, -83, 12, 99, 111, -110, -24, -121, 105, 80, 58, 14, -40, -24, 65, 32, -126, 9, 20, -1, 0, 17, -1, 0, -56, 50, 31, -6, -1, 0, -77, -1, 0, -46, -104, -87, 57, 52, -99, -6, 23, 26, 48, -100, -95, -53, -76, -99, -65, 47, -13, 52, -28, -106, 56, 84, 52, -78, 42, 41, 101, 80, 88, -32, 100, -112, 0, -6, -110, 64, 30, -26, -97, 89, 62, 35, -1, 0, -112, 100, 63, -11, -1, 0, 103, -1, 0, -91, 49, 86, -75, 85, -11, -79, -117, -123, -87, -87, -9, 109, 125, -42, -1, 0, 48, -94, -118, 41, -103, -123, 20, 81, 64, 24, -47, -24, 51, 64, 101, 22, -38, -26, -93, 4, 82, 77, 36, -34, 82, 45, -71, 85, 46, -27, -37, 5, -94, 39, 25, 99, -44, -102, -42, -106, 40, -25, -123, -31, -102, 53, -110, 41, 20, -85, -93, -116, -85, 3, -63, 4, 30, -94, -97, 69, 74, -118, 91, 26, 78, -84, -26, -17, 45, -3, 18, -4, -116, -72, -76, 80, -77, 33, -97, 80, -68, -69, -126, 38, 13, 21, -67, -61, 35, 34, 17, -9, 73, 33, 67, 57, 94, -37, -39, -71, -61, 28, -80, 4, 94, -70, -75, -122, -14, -35, -32, -99, 55, 70, -40, -56, -55, 4, 16, 114, 8, 35, -112, 65, 0, -126, 57, 4, 2, 57, -87, -88, -90, -94, -106, -127, 42, -77, -109, 82, 111, 85, -14, 50, -30, -47, -33, -50, 71, -68, -44, -17, 47, -110, 54, 14, -111, 92, 8, -126, 7, 28, -122, 33, 17, 114, 71, 81, -100, -128, 112, 113, -112, 8, -44, -94, -118, 18, 72, 83, -87, 41, -17, -2, 95, -112, 81, 69, 20, -56, 63, -1, -39];
    var str12 = arrayBufferToBase64(arry);//转换字符串
    var outputImg = document.createElement('img');
    outputImg.src = 'data:image/png;base64,'+str12;
    document.body.appendChild(outputImg);*/
	return byteData;
}

var getFingerMntByteArr = function(fingerObj){//定义长度及对应的下标
		var arr = new Array(TRI_LENGTH);
		var co = 0;
		for(var Key in fingerObj){
			if(co==52){
				break;//最后退出当前for循环
			}
			var val = fingerObj[Key];
			if(Key.endWith('_2')){
				if(co%2 != 0){//不是偶数下标+1
					co=co+1;
				}
				arr[co] = intToByte(val)[0];
				arr[co+1] = intToByte(val)[1];
				co ++;
			}else if(co == 6){//6-16的连指纹型
				for (var i = 0; i < val.length; i++) {
					arr[co] = intToByte(val[i])[0];
					co++;
				}
				continue;
			}else{
				arr[co] = intToByte(val)[0];
			}
			co ++;
			continue;
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











/*var sub_RetByte = function(arr,begin,end){//截取完数组但不并转换数据类型 
	if (end > arr.length){
		begin = arr.length;
	}else if (end < 0){
		begin = 0;
	}
	var len = end - begin;
	var arr_ = new Array(len);
	for (var i = begin; i < end; i++) {
		arr_[i - begin] = arr[i];
	}
	return arr_;
}*/


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

/*var getBase64ByByte = function(arry){
	return arrayBufferToBase64(arry);
}

function arrayBufferToBase64( arry ) {
    var binary = '';
    var bytes = new Uint8Array( arry );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}*/

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
 var str0 = 'M';
var byte = intToByte(str0);
console.log("1===="+byte)
console.log("2===="+str0.charCodeAt());

var str = [5,1];//[67,0] == 67
var byte2 = bytesToInt(str,0);
console.log("3===="+byte2);

var sss;
alert(sss);//uundefined
alert(!sss);//true
var aa = 66;
alert(aa);//66
alert(!aa);//false

var str = [5,1];//261 [67] == 67
var intdata = byteEleToInt(67);
console.log("4===="+intdata);

var arr = [4,0,4,1,3,1,0,0,0,1];
var arrdata = subByte(arr,0,10,2);
console.log("5===="+arrdata);
*/

/*
 * 
 var arrToBs64 = function(array){
	var arr = base64Util.encodeArr(array);
	return arr;
}	

var strTobs64 = function(str){
	var bs64str = base64Util.encodeStr(str);
	return bs64str;
}

var bs64ToArr = function(bs64){
	var arr = base64Util.decodeBs64(bs64);
	return arr;
}
	
var bs64ToStr = function(bs64){
	var bs64str = base64Util.bs64Tostr(bs64);
	return bs64str;
}

var arry = [4,0,4,1,3,1,0,54,0,1,77];
console.log("arr is=== "+arry)
var bsStr =  arrToBs64(arry);
console.log("arr to bs64=== "+bsStr)

var newArr_1 =  bs64ToArr(bsStr);
console.log("bs64 to arr=== "+newArr_1)

var str1 = "Man is distinguished, not only by his reason,";
console.log("str1 is=== "+str1)
var bs64 = strTobs64(str1);
console.log("str to bs64=== "+bs64);
var str2 = bs64ToStr(bs64);
console.log("bs64 to str=== "+str2);
*/

	
	
