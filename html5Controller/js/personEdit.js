	//add by wangtao on 20130603 添加控制控件显示宽度和高度的参数
	var sbImageType;
	var width,height;
	function setDIv(){
		width = window.screen.availWidth-390;//获取分辨率-宽
		height = window.screen.availHeight-90;//获取分辨率-高
		//设置左侧DIV的宽和高
		var temp = document.getElementById("_ldiv");
		temp.style.height = height;
		
		//设置右侧DIV的宽和高
		var temp = document.getElementById("info");
		temp.style.left = "206px";
		temp.style.width = (width-2);
		temp.style.height = (height);
		//alert(temp.outerHTML);
		
		//设置控件DIV的高和宽
		var tempObj = document.getElementById("zwgd");
		tempObj.style.left = "206px";
		tempObj.style.width = (width-2);
		tempObj.style.height = (height);
		
		//设置人像的位置
		var tempRX = document.getElementById("rx");
		tempRX.style.left = width/2;
		
		$("#_ldiv").show(1);
		$("#info").show(1);
	}
	
	//设置右侧DIV的宽和高
	function setRDivX_Y(){
		var temp = document.getElementById("info");
		temp.style.left = "206px";
		temp.style.width = (width-20);
		temp.style.height = (height-23);
		$("#info").show(1);
	}
	//end
	
	function callAtlFun(itype){
		document.CMntEditor.ExtractFingerMnt();
	}
		
	function formkeypress(){
		var etype = document.activeElement.type
		var ename = document.activeElement.name
		if (window.event.keyCode == 13){
			if(etype != "submit" && etype != "button" && etype != "file" && etype != "reset" && etype != "textarea"){
				window.event.keyCode = 9;
			}
		}
		if (window.event.keyCode == 27){
			if(etype != "submit" && etype != "button" && etype != "file"){
				window.event.keyCode = 9;
			}
		}
		if (window.event.keyCode == 8||window.event.keyCode == 46){
			// 以下开始把删除代码的处理加上
			if(ename=="nSEX"){
				ResetValue(document.frminput.nSEX,document.frminput.aSEX);
		    }
		    if(ename=="nNATIONALITY"){
		    	ResetValue(document.frminput.nNATIONALITY,document.frminput.aNATIONALITY);
		    }
		    if(ename=="nNATION"){
		    	ResetValue(document.frminput.nNATION,document.frminput.aNATION);
		    }
		    if(ename=="nBIRTHADDCODE"){
		    	ResetValue(document.frminput.nBIRTHADDCODE,document.frminput.aBIRTHADDCODE);
		    }
		    if(ename=="nDEUCATION"){
		    	ResetValue(document.frminput.nDEUCATION,document.frminput.aDEUCATION);
		    }
		    if(ename=="nPOLITICSSTATUS"){
		    	ResetValue(document.frminput.nPOLITICSSTATUS,document.frminput.aPOLITICSSTATUS);
		    }
		    if(ename=="nIDENTITY"){
		    	ResetValue(document.frminput.nIDENTITY,document.frminput.aIDENTITY);
		    }
		    if(ename=="nPROFESSION"){
		    	ResetValue(document.frminput.nPROFESSION,document.frminput.aPROFESSION);
		    }
		    if(ename=="nHOUSEREGCODE"){
		    	ResetValue(document.frminput.nHOUSEREGCODE,document.frminput.aHOUSEREGCODE);
		    }
		    if(ename=="nADDRESSCODE"){
		    	ResetValue(document.frminput.nADDRESSCODE,document.frminput.aADDRESSCODE);
		    }
		    if(ename=="nCOMMUNITY"){
		    	ResetValue(document.frminput.nCOMMUNITY,document.frminput.aCOMMUNITY);
		    }
		    if(ename=="nHABITUS"){
		    	ResetValue(document.frminput.nHABITUS,document.frminput.aHABITUS);
		    }
		    if(ename=="nFEATURE"){
		    	ResetValue(document.frminput.nFEATURE,document.frminput.aFEATURE);
		    }
		    
		    if(ename=="nSPECIALTY"){
		    	ResetValue(document.frminput.nSPECIALTY,document.frminput.aSPECIALTY);
		    }
		    if(ename=="nBLOODTYPE"){
		    	ResetValue(document.frminput.nBLOODTYPE,document.frminput.aBLOODTYPE);
		    }
		    if(ename=="nSIGNALEMENT1"){
		    	ResetValue(document.frminput.nSIGNALEMENT1,document.frminput.aSIGNALEMENT1);
		    }
		    if(ename=="nSIGNALEMENT2"){
		    	ResetValue(document.frminput.nSIGNALEMENT2,document.frminput.aSIGNALEMENT2);
		    }
		    if(ename=="nSIGNALEMENT3"){
		    	ResetValue(document.frminput.nSIGNALEMENT3,document.frminput.aSIGNALEMENT3);
		    }
		    if(ename=="nCOLLECTUNITNAME"){
		    	ResetValue(document.frminput.nCOLLECTUNITNAME,document.frminput.aCOLLECTUNITNAME);
		    }
		}		    
	}
		 
	function send(){
		//add by jianglei on 20130311 给国籍赋值
		//document.frminput.NATIONALITY.value=document.frminput.aNATIONALITY.CodeVal;
		//end
		var BARCODE =document.frminput.BARCODE;
		var otherkeyid= document.frminput.otherkeyid;
		var otherkeyfld=document.frminput.otherkeyfld;
		var maptbl=document.frminput.maptbl;
		var weight = document.frminput.WEIGHT.value; 
		if(weight.length > 5){
			alert("体重最多输入5个字符");
			return false;
		}
		var value=0;
		var misCheck = document.getElementsByName("misCheck");
		var policeCheck = document.getElementsByName("policeCheck");
		for(var i=0;i<misCheck.length;i++){
			if(misCheck[i].checked){
				if(value==0){
					value=parseInt(misCheck[i].value);
				}else{
					value=value+parseInt(misCheck[i].value);
				}
			}
		}
		for(var i=0;i<policeCheck.length;i++){
			if(policeCheck[i].checked){
				if(value==0){
					value=parseInt(policeCheck[i].value);
				}else{
					value=value+parseInt(policeCheck[i].value);
				}
			}
		}
		
		if(document.frminput.fBIRTHDATE.value!=""){	
			if(IfValidDate(document.frminput.fBIRTHDATE.value,"出生日期")==-1)	
				return(false);		
				document.frminput.BIRTHDATE.value=document.frminput.fBIRTHDATE.value;	
			}else{
		 	document.frminput.BIRTHDATE.value="";
		}
		if(document.frminput.fCOLLECTDATE.value!=""){	
			if(IfValidDate(document.frminput.fCOLLECTDATE.value,"捺印日期")==-1)	
				return(false);		
				document.frminput.COLLECTDATE.value=document.frminput.fCOLLECTDATE.value;	
		}else{
			document.frminput.COLLECTDATE.value="";
		}
		if(IfValidnumb(document.frminput.HEIGHT.value,0,0,0,"身高")==-1){	
			return false;	
		}
		if(IfValidnumb(document.frminput.FOOTLENGTH.value,0,0,0,"足长")==-1){	
			return false;	
		}
		if(document.frminput.IDNUMBER.value != ""){
			if (IfValidCarid(document.frminput.IDNUMBER.value) == -1){
				return false;
			}
		}	
		return true;
	}
		
	function checkempty(){
		if(document.frminput.NAME.value==""){
			alert("姓名不能为空");
			return false;
		}
		if(document.frminput.SEX.value==""){
			alert("性别不能为空");
			return false;
		}
		if(document.frminput.BIRTHDATE.value==""){
			alert("出生日期不能为空");
			return false;
		}
		if(document.getElementById("nNATIONALITY").value=="中国"&&document.frminput.HOUSEREGCODE.value==""){
			alert("户籍地区划不能为空");
			return false;
		}
		if(document.getElementById("nNATIONALITY").value=="中国"&&document.frminput.HOUSEREG.value==""){
			alert("户籍地详址不能为空");
			return false;
		}
		if(document.frminput.ADDRESSCODE.value==""){
			alert("现住址区划不能为空");
			return false;
		}
		if(document.frminput.ADDRESS.value==""){
			alert("现住址详址不能为空");
			return false;
		}
		if (document.frminput.HEIGHT.value != "" && (document.frminput.HEIGHT.value < 50 || document.frminput.HEIGHT.value > 300)){
			alert("身高必须在50厘米至300厘米之间");
			return false;
		}
		if (document.frminput.FOOTLENGTH.value != "" && (document.frminput.FOOTLENGTH.value < 50 || document.frminput.FOOTLENGTH.value > 500)){
			alert("足长必须在50毫米至500毫米之间");
			return false;
		}
		 
        if(document.frminput.COLLECTUNITNAME.value==""){
        	alert("捺印单位不能为空");
			return false;
		}
		if(document.frminput.COLLECTPSN.value==""){
			alert("捺印人不能为空");
			return false;
		}
		if(document.frminput.COLLECTDATE.value==""){
			alert("捺印时间不能为空");
			return false;
		}	 
			
		if (!CheckObjLen(document.frminput.NAME,"姓名",30))
			return;
		if (!CheckObjLen(document.frminput.ALIASNAME,"别名/绰号",30))
			return;	
		if (!CheckObjLen(document.frminput.USEREDNAME,"曾用名",20))
			return;
		if (!CheckObjLen(document.frminput.HOUSEREG,"户籍地详址",100))
			return;
		if (!CheckObjLen(document.frminput.ADDRESS,"现住址详址",100))
			return;
		//edited by wangtao on 20141218 “工作单位”、“犯罪描述”长度按照4.1库中的长度限制
		if (!CheckObjLen(document.frminput.WORKUNIT,"工作单位",40))
			return;
		if (!CheckObjLen(document.frminput.CASEDETAILS,"犯罪描述",256))
			return;
		//end edited by wangtao on 20141218
		if (!CheckObjLen(document.frminput.COLLECTPSN,"捺印人",30))
			return;
		if (!CheckObjLen(document.frminput.REMARK,"备注",512))
			return;
		
		return true;
	}
	function checkUnitBybarcode(usergrade,limitcode,pbarcode){
		if(pbarcode==""){
			return false;
		}
		if(pbarcode.substring(0,1) == "R"){
			pbarcode = pbarcode.substring(1,pbarcode.length);
		}
		if(usergrade == "S"){
			if(!(limitcode == pbarcode.substring(0,2))){
				return false;
			}
		}else if(usergrade == "D"){
			if(!(limitcode == pbarcode.substring(0,4))){
				return false;
			}
		}else if(usergrade == "X"){
			if(!(limitcode == pbarcode.substring(0,6))){
				return false;
			}
		}else{
			if(!(limitcode == pbarcode.substring(0,12))){
				return false;
			}
		}
		return true;
	}
	function dsubmit(){
		var b = document.getElementById("barcode").value;
		var grade = document.getElementById("usergrade").value;
		var limitcode = document.getElementById("limitcode").value;
		if(!checkUnitBybarcode(grade,limitcode,b)){
			alert("非本单位信息不能修改");
			return;
		}
		document.frminput.baocun1.disabled="disabled";
		document.getElementById("COLLECTUNITNAME").value=document.getElementById("nCOLLECTUNITCODE").value;
		if(send()==false){
			document.frminput.baocun1.disabled="";
			return;
		}
		//checkempty2
		//start added by wangtao on 20151019
		//TASK#638 自定义必填项在文档信息编辑页面未起到约束作用。
		//if(validateRequire()){	// update by baoyx on 20150924 调用自定义必填项的非空验证
		if(checkempty2()){
			divcenter();
			document.frminput.submit();
		}else{
			document.frminput.baocun1.disabled="";
		}
	}
	
	var clickcount = 0;
	function showOption(){
		if(!$("#optiondiv").is(":hidden")){
			$("#optiondiv").hide();
			return;
		}
		$("#optiondiv").show();
		if(clickcount == 0){
			var	ids = document.getElementById("ids").value;
			var names = document.getElementById("names").value;
			
			var states = document.getElementById("status").value;
			var statearr = states.split("}");
			
			var psn = document.getElementById("PSNTYPE").value;
				
			var psnarr = psn.split("");
			var codearr = ids.split("}");
			var namearr = names.split("}");
				
			$("#tabs").empty();
			var k = 0;//换行数量 xuzhongxiao 2011-12-31
			var muster = "<tr>";
			for ( var i = 0; i < codearr.length - 1; i++) {
				if(codearr[i] != "" && codearr[i] != null&&statearr[i]=="0"){//update by xuzhongxiao 2011-12-31 为空不显示
					if( k == 0 ){
						if(psnarr[i] == 1){
							if(statearr[i] == 0){
								muster += "<td width='10%' height='30px;' align='left'><input type='checkbox' checked='checked' name ='hide' id='hide"+ i +"' value="+codearr[i]+"><font size='2'>" + namearr[i] + "</font></td>";
							}else{
								muster += "<td width='10%' height='30px;' align='left'><input type='checkbox' disabled='disabled' checked='checked' name ='hide' id='hide"+ i +"' value="+codearr[i]+"><font size='2'>" + namearr[i] + "</font></td>";
							}
						}else{
							if(statearr[i] == 0){
								muster += "<td width='10%' height='30px;' align='left'><input type='checkbox' name ='hide' id='hide"+ i +"' value="+codearr[i]+"><font size='2'>" + namearr[i] + "</font></td>";
							}else{
								muster += "<td width='10%' height='30px;' align='left'><input type='checkbox' disabled='disabled' name ='hide' id='hide"+ i +"' value="+codearr[i]+"><font size='2'>" + namearr[i] + "</font></td>";
							}
						}
					}else if( (k+1)%8 != 0){
						if(psnarr[i] == 1){
							if(statearr[i] == 0){
								muster += "<td width='10%' height='30px;' align='left'><input type='checkbox' checked='checked' name ='hide' id='hide"+ i +"' value="+codearr[i]+"><font size='2'>" + namearr[i] + "</font></td>";
							}else{
								muster += "<td width='10%' height='30px;' align='left'><input type='checkbox' disabled='disabled' checked='checked' name ='hide' id='hide"+ i +"' value="+codearr[i]+"><font size='2'>" + namearr[i] + "</font></td>";
							}
						}else{
							if(statearr[i] == 0){
								muster += "<td width='10%' height='30px;' align='left'><input type='checkbox' name ='hide' id='hide"+ i +"' value="+codearr[i]+"><font size='2'>" + namearr[i] + "</font></td>";
							}else{
								muster += "<td width='10%' height='30px;' align='left'><input type='checkbox' disabled='disabled' name ='hide' id='hide"+ i +"' value="+codearr[i]+"><font size='2'>" + namearr[i] + "</font></td>";
							}
						}
					}else{
						if(psnarr[i] == 1){
							if(statearr[i] == 0){
								muster += "<td width='10%' height='30px;' align='left'><input type='checkbox' checked='checked' name ='hide' id='hide"+ i +"' value="+codearr[i]+"><font size='2'>" + namearr[i] + "</font></td>";
							}else{
								muster += "<td width='10%' height='30px;' align='left'><input type='checkbox' disabled='disabled' checked='checked' name ='hide' id='hide"+ i +"' value="+codearr[i]+"><font size='2'>" + namearr[i] + "</font></td>";
							}
						}else{
							if(statearr[i] == 0){
								muster += "<td width='10%' height='30px;' align='left'><input type='checkbox' name ='hide' id='hide"+ i +"' value="+codearr[i]+"><font size='2'>" + namearr[i] + "</font></td>";
							}else{
								muster += "<td width='10%' height='30px;' align='left'><input type='checkbox' disabled='disabled' name ='hide' id='hide"+ i +"' value="+codearr[i]+"><font size='2'>" + namearr[i] + "</font></td>";
							}
						}
						muster += "</tr>";
					}
					k++;
				}
			}
			//muster += "<tr><td width='50%' align='center' colspan='4'><input type='button' class='lib' value = '确 定' onclick='getName()'/></td>";
			//muster += "<td width='50%' align='center' colspan='4'><input type='button' class='lib' value = '取 消' onclick='hideOption()'/></td></tr>";
			muster += "<tr align='center'><td colspan='8' width=100%' ><input type='button' class='lib' value = ' 确  定 ' onclick='getName()'/>&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' class='lib' value = ' 取  消 ' onclick='hideOption()'/></td>";
			muster += "</tr>";
			$("#tabs").append(muster);
			clickcount = 1;
		}
	}
		
	function hideOption(){
		$("#optiondiv").hide();
	}
		
	function getName(){
		/*update by xuzhongxiao 2011-12-31 修改人员表人员类型字段值，现在增加了
			公安部定义的人员类型，序号是从后向前排列的，以前程序代码没有考虑，他只考虑到了从
			前到后依次排列，他是根据人员类型表里有多少类型，页面显示多少类型，并与选中了哪些
			做比较，实际上当人员类型表没有32个类型人员表里的类型就会有问题，前面的错位，后面的全部为0。
			比如：人员类型表有1、2、3、4、5、23、24，页面选中1、3、4、5、23、24，
			人员表人员类型值为 10111110000000000000000000000000,
			正确值应为	   10111000000000000000001100000000
		*/
		var count = "00000000000000000000000000000000";
		var namemuster = document.getElementById("names").value;
		
		var namearr = namemuster.split("}");
		var result = "";
			
		var muster = document.getElementsByName("hide");
		var names = "";
		for(var i=0;i<muster.length;i++){
			if(muster[i].checked == true){
				var data = "hide"+i;
				var id_value = muster[i].value;//获取选中人员类型的值，是从1开始的。
					names += (namearr[id_value-1]+"  ");//数组是从0开始的，正好人员类型id-1等于数组对应人员类型名称值。
					//update by xuzhongxiao 2011-12-31 start
					var befcount = count.substring(0,muster[i].value-1);
					var aftcount = count.substring(muster[i].value);
					count = befcount+"1"+aftcount;
					//end
					//注释by xuzhongxiao
				//result += "1";
			//}else{
			//	result += "0";
			}
		}
		result = count;
		//注释by xuzhongxiao
		//var rslength = (count - result.length);
		//for ( var j = 0; j < rslength; j++) {
		//	result += "0";
		//}
		
		document.getElementById("namemuster").innerText = names;
		document.getElementById("PSNTYPE").value = result;
		hideOption();
	}
	
	function showPsnType(){
		var psn = document.getElementById("PSNTYPE").value;
		var psnarr = psn.split("");
		
		var ids = document.getElementById("ids").value;
		var names = document.getElementById("names").value;
		
		var codearr = ids.split("}");
		var namearr = names.split("}");
		var names = "";
		
		for ( var i = 0; i < psnarr.length; i++) {
			if(psnarr[i] == 1){
				names += (namearr[i]+"  ");
			}
		}
		document.getElementById("namemuster").innerText += names;
	}
		
	function getParam(sName,sValue){
		if (sValue.length>0){
			if (param==""){
				param = sName+"="+sValue;
		    }else{
		    	param = param+"&"+sName+"="+sValue;
			}
		}
	}
		
	function showwdxx(){
		//setRDivX_Y();
		//edited by wangtao on 20141229 解决5484时遇到的问题，原因：添加非违人员操作时未加保护
		var noillegal = document.getElementById("NOILLEGAL").value;
		if(noillegal == "0"){
			showPsnType();
		}
		//end edited by wangtao on 20141229
		$('.GLXCINFO').hide(1);
		$('.jbxx').show(1);
		$('.rx').hide(1);
		$('.zwgd').hide(1);
		$('.DNA').hide(1);
		$('.xgrz').hide(1);
		$('.CKINFO').hide(1);
		if(!isInclude("selectLayer.js")){
			var path = document.getElementById("basePath").value;
			dynload(path+"code/selectLayer.js");
			//convert(-1);
		}
	}
	function dynload(u) {     
		//var x=window.ActiveXObject?new ActiveXObject("MSXML2.XMLHTTP"):new XMLHttpRequest();     
		//x.open("GET",u,false);     
		//x.send(null);     
		//s=x.responseText;
		//try {
		//	window.execScript(s)
		//}catch(ex){
		//	eval(s);
		//};//Mozilla下window.eval大致与IE的window.execScript方法功能相同
		var oHead = document.getElementsByTagName('HEAD').item(0); 
		var oScript= document.createElement("script"); 
		oScript.type = "text/javascript"; 
		oScript.src=u; 
		oHead.appendChild(oScript);  
	}     
	function clearOcxmerory(){
		// 滚动控件
		for(var i=1;i<=10;i++){
			var obj=document.getElementById("IImageController"+i);
			if(obj!=null){
				obj.ClearData(1,1);
			}
		}
		// 平面控件
		for(var i=1;i<=10;i++){
			var obj=document.getElementById("IImageControllerPFP"+i);
			if(obj!=null){
				obj.ClearData(1,1);
			}
		}
		// 掌纹控件
		for(var i=1;i<=4;i++){
			var obj=document.getElementById("IImageControllerPLP"+i);
			if(obj!=null){
				obj.ClearData(1,1);
			}
		}
	}
	function secBoard(n,defaultFinger){
		var m = n;
		var b = document.getElementById("barcode").value;
		if(n == 0){
			if(defaultFinger == 1){
				showwdxx();
			}
		}else if(n == 1){
			showDiv("RX");
		}else if(n == 2){
			var rfpbar = document.getElementById("RFPBARCODE").value;
			if(rfpbar != ""){
				showDiv("GDZW",defaultFinger);
			}else{
				alert("滚动指纹没有数据");
				n = -1;
			}
		}else if(n == 3){
			var pfpbar = document.getElementById("PFPBARCODE").value;
			if(pfpbar != ""){
				showDiv("PMZW",defaultFinger);
			}else{
				alert("平面指纹没有数据");
				n = -1;
			}
		}else if(n == 4){
			var plpbar = document.getElementById("PLPBARCODE").value;
			if(plpbar != ""){
				showDiv("ZW",defaultFinger);
			}else{
				alert("掌纹没有数据");
				n = -1;
			}
		}else if(n == 5){ // 足迹
			showDiv("ZJ");
		}else if(n == 6){ // 重卡
			showDiv("CKINFO");
			m = 5;
		}else if(n == 7){ // 关联现场指纹
			showDiv("GLXC");
			m = 6;
		}else if(n == 8){ // DNA
			n=0;
			showDNA("DNA");
		}else if(n == 9){ // 相关日志
			showDiv("XGRZ");
			m = 7;
		}
		if(n != -1){
			// 属性项CSS控制
			for(i=0;i<secTable.cells.length;i++){
				if(secTable.cells[i].className=="sec3"){
				
				} else {
					secTable.cells[i].className="sec1";
				}
			}
			secTable.cells[m].className="sec2";
			// 右边显示内容控制
			for(i=0;i<mainTable.tBodies.length;i++){
				mainTable.tBodies[i].style.display="none";
			}
			mainTable.tBodies[n].style.display="block";
		}
	}
		
	var dnastr;
	function showDNA(){
		var dnabarcode = document.frminput.DNABARCODE.value;
		$('.rx').hide(1);
		$('.jbxx').hide(1);
		$('.zwgd').hide(1);
		$(".xgrz").hide(1);
		$('.CKINFO').hide(1);
		$('.DNA').show(1);
		
		document.frminput.pageNumber.value=1;
		parm = "DNABARCODE="+dnabarcode;
		dnastr = new net.ContentLoader("get_DNASTR.jsp?DNABARCODE="+dnabarcode,showDNAStr,null,"post",parm,"application/x-www-form-urlencoded;charset=utf-8");
	}
		
	function showDNAStr(){
		var rs = dnastr.req.responseText;
	    rs=rs.replace(/^\s+|\s+$/g,"");
	    if(rs!=""){
	    	DNA.innerHTML = rs;
	    }
	}
	
	// add by baoyx on 20140806 用于显示滚动指纹图像的js，参数依次为：图像显示控件、页面根路径、指位、数据库名、人员编号、dbid、随机数、压缩代码、图像宽度、图像高度、原图大小、压缩图大小
	function showRfp(image,path,rfpIndex,pfp,pid,dbid,random,rfpcodetype,width,height,imgSize,compressImgSize){
		var imgurl="";
		var strXml="";
		if(rfpcodetype==0){	// 无压缩图
			image.ImageType=0;
			imgurl=path+"ShowPic?TNAME=ROLL_ORG&DBID="+dbid+"&PID="+pid+"&TYPE=ORG&BLOB="+rfpIndex+"&DBName="+pfp+"&random="+random;
			strXml = getIAImageControllerParam("","1",width,height,imgurl,imgSize,"","1","","","");
		}else{
			image.ImageType=1;
			imgurl=path+"ShowPic?TNAME=ROLL_COMPRESS&DBID="+dbid+"&PID="+pid+"&TYPE=CPR&BLOB="+rfpIndex+"&DBName="+pfp+"&random="+random;
			strXml = getIAImageControllerParam("","1",width,height,imgurl,compressImgSize,rfpcodetype,"1","","","");
		}
		image.SetImgInfo(strXml);
	}
	
	// add by baoyx on 20140806 用于显示平面指纹图像的js，参数依次为：图像显示控件、页面根路径、指位、数据库名、人员编号、dbid、随机数、压缩代码、图像宽度、图像高度、原图大小、压缩图大小
	function showPfp(image,path,pfpIndex,pfp,pid,dbid,random,pfpcodetype,width,height,imgSize,compressImgSize){
		var imgurl="";
		var strXml="";
		if(pfpcodetype==0){	// 无压缩图
			image.ImageType=0;
			imgurl=path+"ShowPic?TNAME=PLAIN_ORG&DBID="+dbid+"&PID="+pid+"&TYPE=ORG&BLOB="+pfpIndex+"&DBName="+pfp+"&random="+random;
			strXml = getIAImageControllerParam("","2",width,height,imgurl,imgSize,"","1","","","");
		}else{
			image.ImageType=1;
			imgurl=path+"ShowPic?TNAME=PLAIN_COMPRESS&DBID="+dbid+"&PID="+pid+"&TYPE=CPR&BLOB="+pfpIndex+"&DBName="+pfp+"&random="+random;
			strXml = getIAImageControllerParam("","2",width,height,imgurl,compressImgSize,pfpcodetype,"1","","","");
		}
		image.SetImgInfo(strXml);
	}
	
	// add by baoyx on 20140806 用于显示掌纹图像的js，参数依次为：图像显示控件、页面根路径、指位、数据库名、人员编号、dbid、随机数、压缩代码、图像宽度、图像高度、原图大小、压缩图大小
	function showPlp(image,path,plpIndex,plp,pid,dbid,random,plpcodetype,width,height,imgSize,compressImgSize){
		var imgurl="";
		var strXml="";
		if(plpcodetype==0){	// 无压缩图
			image.ImageType=0;
			imgurl=path+"ShowPic?TNAME=PALM_ORG&DBID="+dbid+"&PID="+pid+"&TYPE=ORG&BLOB="+plpIndex+"&DBName="+plp+"&random="+random;
			strXml = getIAImageControllerParam("","3",width,height,imgurl,imgSize,"","1","","","");
		}else{
			image.ImageType=1;
			imgurl=path+"ShowPic?TNAME=PALM_COMPRESS&DBID="+dbid+"&PID="+pid+"&TYPE=CPR&BLOB="+plpIndex+"&DBName="+plp+"&random="+random;
			strXml = getIAImageControllerParam("","3",width,height,imgurl,compressImgSize,plpcodetype,"1","","","");
		}
		image.SetImgInfo(strXml);
	}
		//获取控件点击编辑页面返回XML文件   added by  zerppen at 11:21 8/15/2016
	function getOcx_XML(xmlfile){
		//alert("getOCX!!="+xmlfile);
//		var xmlfile;
		try{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(xmlfile);
			//alert("XMLloading");  
		}catch(e){
			try{
				
				getOcxXML = new DOMParser();
				xmlDoc = getOcxXML.parseFromString(text,"text/xml"); 
			}catch(ee){
				alert("error"+ee.message);
				return;
			}
		}
	
		var ifReturn = xmlDoc.getElementsByTagName("IGNORECONTRADICTMNT")[0].childNodes[0].nodeValue;
		
		if(ifReturn=="0"){
			var retCondition = xmlDoc.getElementsByTagName("CONTRADICTMNTPOSITION")[0].childNodes[0].nodeValue;
			if(retCondition<11){
				
				rfpClick(retCondition,ifReturn);
			}else if(retCondition<21){
			
				findex = retCondition - 10 ;
				
				pfpClick(findex,ifReturn);
		   }else if(retCondition>30&&retCondition<37){
			   findex = retCondition - 30 ;
			   
			   plpClick(findex,ifReturn);
		   }
		}
	}
	
	//矛盾特征点击“否”后还原至矛盾特征图片   added by  zerppen at 11:21 8/16/2016
	var timer1
	function rfpClick(index,retcon){
		if(rfp_timer){window.clearTimeout(rfp_timer);rfp_timer=null;}
		if(index == undefined) return ;
		var pfp = document.getElementById("pfp").value;
		var pid = document.getElementById("pid").value;
		var dbid = document.getElementById("dbid").value;
		var barcode = document.getElementById("barcode").value;
			
		var path = document.getElementById("basePath").value;
		var url=path+"ShowPic?TNAME=ROLL_TRAIT&DBID="+dbid+"&PID="+pid+"&TYPE=MNT&BLOB=RFP"+index+"&DBName="+pfp;
		changecolor("RFP"+index);
		if(retcon!=null&&retcon!=""){
			showFinger("RFP",retcon);
		}else{
		showFinger("RFP");
		}
		if(eval("document.IImageController"+index+".ImageStream") != ""){
			showEdit_MNT(dbid,pid,barcode,pid,index,url,"IImageController",1);
			
		} else {
			timer1 = window.setInterval(function(){showEdit_MNT(dbid,pid,barcode,pid,index,url,"IImageController",1);},1000);
		}
	}
	function showEdit_MNT(dbid,pid,barcode,pid,index,url,ocxname,mnttype,sbImageType){
		if(eval("document."+ocxname+index+".ImageStream") == ""){
			
		} else {
			var type = eval("document."+ocxname+index+".ImageType");
			if(sbImageType != null) {
				if(sbImageType == 1429) {
					type = 4;
				} else if ("1".indexOf(sbImageType) != -1) {
					type = 3;
				}
			}
			document.CMntEditor.SetPersonPicMnt(dbid,pid,barcode,pid,index,
				eval("document."+ocxname+index+".ImageStream"),
				type,
				url,//编辑图像特征的链接
				mnttype,
				editunit,edituser);

				window.clearInterval(timer1);
		}
	}
	//矛盾特征点击“否”后还原至矛盾特征图片   added by  zerppen at 11:21 8/16/2016
	function pfpClick(index,retcon){
		if(index == undefined) return ;
		var pfp = document.getElementById("pfp").value;
		var pid = document.getElementById("pid").value;
		var dbid = document.getElementById("dbid").value;
		var barcode = document.getElementById("barcode").value;
		var path = document.getElementById("basePath").value;
		var url=path+"ShowPic?TNAME=PLAIN_TRAIT&DBID="+dbid+"&PID="+pid+"&TYPE=MNT&BLOB=PFP"+index+"&DBName="+pfp;
		changecolor("PFP"+index);
		if(retcon!=null&&retcon!=""){
			showFinger("RFP",retcon);
		}else{
		showFinger("PFP");
		}
		if(eval("document.IImageControllerPFP"+index+".ImageStream") != ""){
			showEdit_MNT(dbid,pid,barcode,pid,index,url,"IImageControllerPFP",2);
		} else {
			timer1 = window.setInterval(function(){showEdit_MNT(dbid,pid,barcode,pid,index,url,"IImageControllerPFP",2);},1000);
		}
	}
	//矛盾特征点击“否”后还原至矛盾特征图片   added by  zerppen at 11:21 8/16/2016
	function plpClick(index,retcon,imageType){
		if(index == undefined) return ;
		var plpcodetype = document.getElementById("plpcodetype").value;
		plpcodetype = plpcodetype.replace(/^\s+|\s+$/g,"");
		var plp = document.getElementById("plp").value;
		var pid = document.getElementById("pid").value;
		var dbid = document.getElementById("dbid").value;
		var barcode = document.getElementById("barcode").value;
			
		var path = document.getElementById("basePath").value;
		var url=path+"ShowPic?TNAME=PALM_TRAIT&DBID="+dbid+"&PID="+pid+"&TYPE=MNT&BLOB=PLP"+index+"&DBName="+plp;
		changecolor("PLP"+index);
		if(retcon!=null&&retcon!=""){
			showFinger("RFP",retcon);
		}else{
			showFinger("PLP");
		}
		if(eval("document.IImageControllerPLP"+index+".ImageStream") != ""){
			showEdit_MNT(dbid,pid,barcode,pid,index,url,"IImageControllerPLP",3,imageType);
		} else {
			timer1 = window.setInterval(function(){showEdit_MNT(dbid,pid,barcode,pid,index,url,"IImageControllerPLP",3,imageType);},1000);
		}
	}
	// update by baoyx on 20140806 为适应新版本图像显示控件的需要对指纹图像显示的js进行修改，并对js进行优化，减少冗余代码  
	var rfp_timer;
	function showDiv(rs,defaultFinger){
		var b = document.getElementById("barcode").value;
		var pfp = document.getElementById("pfp").value;
	   	var plp = document.getElementById("plp").value;
		var sdiv = document.getElementById(rs+"DIV");
		var pid=document.getElementById("pid").value;
		var dbid=document.getElementById("dbid").value;
		var path=document.getElementById("basePath").value;
		var random=Math.random();//添加随机数来处理缓存的问题
		if(rs=="GDZW"){ // 滚动指纹
			if(document.getElementById("gdzw_td").innerHTML == ""){
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_gdzw.jsp",
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("获取滚动指纹失败,条码号："+b);
					},
				    success:function(data){
						data = data.replace(/^\s+|\s+$/g,"");
						document.getElementById("gdzw_td").innerHTML = data;
						document.getElementById("IImageController1").attachEvent("OnLBtnClick",function(){rfpClick(1)});
						document.getElementById("IImageController2").attachEvent("OnLBtnClick",function(){rfpClick(2)});
						document.getElementById("IImageController3").attachEvent("OnLBtnClick",function(){rfpClick(3)});
						document.getElementById("IImageController4").attachEvent("OnLBtnClick",function(){rfpClick(4)});
						document.getElementById("IImageController5").attachEvent("OnLBtnClick",function(){rfpClick(5)});
						document.getElementById("IImageController6").attachEvent("OnLBtnClick",function(){rfpClick(6)});
						document.getElementById("IImageController7").attachEvent("OnLBtnClick",function(){rfpClick(7)});
						document.getElementById("IImageController8").attachEvent("OnLBtnClick",function(){rfpClick(8)});
						document.getElementById("IImageController9").attachEvent("OnLBtnClick",function(){rfpClick(9)});
						document.getElementById("IImageController10").attachEvent("OnLBtnClick",function(){rfpClick(10)});
						var rfpcodetype = document.getElementById("rfpcodetype").value;
						rfpcodetype = rfpcodetype.replace(/^\s+|\s+$/g,"");
						rfpcodetype = (rfpcodetype == null || rfpcodetype=="") ? 0 : parseInt(rfpcodetype);
						var rfpWidth=document.getElementById("rfpWidth").value;
						var rfpHeight=document.getElementById("rfpHeight").value;
						var rfpSize=document.getElementById("rfpSize").value;
						showRfp(document.IImageController6,path,"RFP6",pfp,pid,dbid,random,rfpcodetype,rfpWidth,rfpHeight,rfpSize,document.getElementById("rfp6Size").value);   			
						showRfp(document.IImageController1,path,"RFP1",pfp,pid,dbid,random,rfpcodetype,rfpWidth,rfpHeight,rfpSize,document.getElementById("rfp1Size").value);
						showRfp(document.IImageController2,path,"RFP2",pfp,pid,dbid,random,rfpcodetype,rfpWidth,rfpHeight,rfpSize,document.getElementById("rfp2Size").value);				
						showRfp(document.IImageController3,path,"RFP3",pfp,pid,dbid,random,rfpcodetype,rfpWidth,rfpHeight,rfpSize,document.getElementById("rfp3Size").value);		  		
						showRfp(document.IImageController4,path,"RFP4",pfp,pid,dbid,random,rfpcodetype,rfpWidth,rfpHeight,rfpSize,document.getElementById("rfp4Size").value);				
						showRfp(document.IImageController5,path,"RFP5",pfp,pid,dbid,random,rfpcodetype,rfpWidth,rfpHeight,rfpSize,document.getElementById("rfp5Size").value); 		
						showRfp(document.IImageController7,path,"RFP7",pfp,pid,dbid,random,rfpcodetype,rfpWidth,rfpHeight,rfpSize,document.getElementById("rfp7Size").value); 
						showRfp(document.IImageController8,path,"RFP8",pfp,pid,dbid,random,rfpcodetype,rfpWidth,rfpHeight,rfpSize,document.getElementById("rfp8Size").value); 
						showRfp(document.IImageController9,path,"RFP9",pfp,pid,dbid,random,rfpcodetype,rfpWidth,rfpHeight,rfpSize,document.getElementById("rfp9Size").value); 
						showRfp(document.IImageController10,path,"RFP10",pfp,pid,dbid,random,rfpcodetype,rfpWidth,rfpHeight,rfpSize,document.getElementById("rfp10Size").value);
				    	rfp_timer = window.setTimeout(function(){rfpClick(defaultFinger)},400);
				    }
				});
			}		
	    } else if(rs == "PMZW"){ // 平面指纹
	    	if(document.getElementById("pmzw_td").innerHTML == ""){
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_pmzw.jsp",
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("获取平面指纹失败,条码号："+b);
					},
				    success:function(data){
						data = data.replace(/^\s+|\s+$/g,"");
						document.getElementById("pmzw_td").innerHTML = data;
						document.getElementById("IImageControllerPFP1").attachEvent("OnLBtnClick",function(){pfpClick(1)});
						document.getElementById("IImageControllerPFP2").attachEvent("OnLBtnClick",function(){pfpClick(2)});
						document.getElementById("IImageControllerPFP3").attachEvent("OnLBtnClick",function(){pfpClick(3)});
						document.getElementById("IImageControllerPFP4").attachEvent("OnLBtnClick",function(){pfpClick(4)});
						document.getElementById("IImageControllerPFP5").attachEvent("OnLBtnClick",function(){pfpClick(5)});
						document.getElementById("IImageControllerPFP6").attachEvent("OnLBtnClick",function(){pfpClick(6)});
						document.getElementById("IImageControllerPFP7").attachEvent("OnLBtnClick",function(){pfpClick(7)});
						document.getElementById("IImageControllerPFP8").attachEvent("OnLBtnClick",function(){pfpClick(8)});
						document.getElementById("IImageControllerPFP9").attachEvent("OnLBtnClick",function(){pfpClick(9)});
						document.getElementById("IImageControllerPFP10").attachEvent("OnLBtnClick",function(){pfpClick(10)});
						var pfpcodetype = document.getElementById("pfpcodetype").value;//压缩方法
			   			pfpcodetype = pfpcodetype.replace(/^\s+|\s+$/g,"");
			   			pfpcodetype = (pfpcodetype == null || pfpcodetype=="") ? 0 : parseInt(pfpcodetype);
						var pfpWidth=document.getElementById("pfpWidth").value;
						var pfpHeight=document.getElementById("pfpHeight").value;
						var pfpSize=document.getElementById("pfpSize").value;
						// update by baoyx on 20140806
						showPfp(document.IImageControllerPFP6,path,"PFP6",pfp,pid,dbid,random,pfpcodetype,pfpWidth,pfpHeight,pfpSize,document.getElementById("pfp6Size").value);	
						showPfp(document.IImageControllerPFP1,path,"PFP1",pfp,pid,dbid,random,pfpcodetype,pfpWidth,pfpHeight,pfpSize,document.getElementById("pfp1Size").value);		
						showPfp(document.IImageControllerPFP2,path,"PFP2",pfp,pid,dbid,random,pfpcodetype,pfpWidth,pfpHeight,pfpSize,document.getElementById("pfp2Size").value);	
						showPfp(document.IImageControllerPFP3,path,"PFP3",pfp,pid,dbid,random,pfpcodetype,pfpWidth,pfpHeight,pfpSize,document.getElementById("pfp3Size").value);	
						showPfp(document.IImageControllerPFP4,path,"PFP4",pfp,pid,dbid,random,pfpcodetype,pfpWidth,pfpHeight,pfpSize,document.getElementById("pfp4Size").value);	
						showPfp(document.IImageControllerPFP5,path,"PFP5",pfp,pid,dbid,random,pfpcodetype,pfpWidth,pfpHeight,pfpSize,document.getElementById("pfp5Size").value);	
						showPfp(document.IImageControllerPFP7,path,"PFP7",pfp,pid,dbid,random,pfpcodetype,pfpWidth,pfpHeight,pfpSize,document.getElementById("pfp7Size").value);	
						showPfp(document.IImageControllerPFP8,path,"PFP8",pfp,pid,dbid,random,pfpcodetype,pfpWidth,pfpHeight,pfpSize,document.getElementById("pfp8Size").value);	
						showPfp(document.IImageControllerPFP9,path,"PFP9",pfp,pid,dbid,random,pfpcodetype,pfpWidth,pfpHeight,pfpSize,document.getElementById("pfp9Size").value);	
						showPfp(document.IImageControllerPFP10,path,"PFP10",pfp,pid,dbid,random,pfpcodetype,pfpWidth,pfpHeight,pfpSize,document.getElementById("pfp10Size").value);	
				    	pfpClick(defaultFinger);
				    }
				});
			}
		} else if( rs == "ZW" ){ // 掌纹
			if(document.getElementById("zw_td").innerHTML == ""){
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_zw.jsp?barcode="+b,
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("获取掌纹失败,条码号："+b);
					},
				    success:function(data){
						data = data.replace(/^\s+|\s+$/g,"");
						document.getElementById("zw_td").innerHTML = data;
						
						var plpcodetype = document.getElementById("plpcodetype").value;
						plpcodetype = plpcodetype.replace(/^\s+|\s+$/g,"");
						plpcodetype = (plpcodetype == null || plpcodetype=="") ? 0 : parseInt(plpcodetype);
						var plpWidth=document.getElementById("plpWidth").value;
						var plpHeight=document.getElementById("plpHeight").value;
						var plpSize=document.getElementById("plpSize").value;
						var plp1Size=document.getElementById("plp1Size").value;
						var plp2Size=document.getElementById("plp2Size").value;
						if(plpcodetype != null) {
							sbImageType = plpcodetype;
						}
						document.getElementById("IImageControllerPLP1").attachEvent("OnLBtnClick",function(){plpClick(1,null,sbImageType)});
						document.getElementById("IImageControllerPLP2").attachEvent("OnLBtnClick",function(){plpClick(2,null,sbImageType)});
						//document.getElementById("IImageControllerPLP3").attachEvent("OnLBtnClick",function(){plpClick(3)});
						//document.getElementById("IImageControllerPLP4").attachEvent("OnLBtnClick",function(){plpClick(4)});
						
						// update by baoyx on 20140806
						// 先显示第2枚，因为默认显示的是第二枚掌纹
						showPlp(document.IImageControllerPLP2,path,"PLP2",plp,pid,dbid,random,plpcodetype,plpWidth,plpHeight,plpSize,plp2Size);
						showPlp(document.IImageControllerPLP1,path,"PLP1",plp,pid,dbid,random,plpcodetype,plpWidth,plpHeight,plpSize,plp1Size);		
						//showPlp(document.IImageControllerPLP3,path,"PLP3",plp,pid,dbid,random,plpcodetype,plpWidth,plpHeight,plpSize,plp1Size);			
						//showPlp(document.IImageControllerPLP4,path,"PLP4",plp,pid,dbid,random,plpcodetype,plpWidth,plpHeight,plpSize,plp2Size);
						plpClick(defaultFinger,null,sbImageType);
				    }
				});
			}
		} else if(rs == "RX"){
			if(document.getElementById("rx_td").innerHTML ==""){
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_rx.jsp?barcode="+b+"&r="+random,
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("获取人像失败,条码号："+b);
					},
				    success:function(data){
						data = data.replace(/^\s+|\s+$/g,"");
						document.getElementById("rx_td").innerHTML = data;
				    }
				});
			}
		} else if(rs == "CKINFO"){
			if(document.getElementById("ck_td").innerHTML ==""){
				var seriesbarcode = document.getElementById("SERIESBARCODE").value 
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_ck.jsp?seriesbarcode="+seriesbarcode+"&r="+random,
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("获取重卡失败,条码号："+b);
					},
				    success:function(data){
						data = data.replace(/^\s+|\s+$/g,"");
						document.getElementById("ck_td").innerHTML = data;
				    }
				});
			}
		} else if(rs == "GLXC"){
			if(document.getElementById("glxc_td").innerHTML ==""){
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_glxc.jsp?barcode="+b+"&r="+random,
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("获取现场关联失败,条码号："+b);
					},
				    success:function(data){
						data = data.replace(/^\s+|\s+$/g,"");
						document.getElementById("glxc_td").innerHTML = data;
				    }
				});
			}
		} else if(rs == "XGRZ"){
			if(document.getElementById("xgrz_td").innerHTML ==""){
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_xgrz.jsp?barcode="+b+"&r="+random,
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("获取相关日志失败,条码号："+b);
					},
				    success:function(data){
						data = data.replace(/^\s+|\s+$/g,"");
						document.getElementById("xgrz_td").innerHTML = data;
				    }
				});
			}
		}
	}

	function isInclude(name){
	    var js= /js$/i.test(name);
	    var es=document.getElementsByTagName(js?'script':'link');
	    for(var i=0;i<es.length;i++) 
	    if(es[i][js?'src':'href'].indexOf(name)!=-1)return true;
	    return false;
	}
	////
	function GetHttpRequest() {
		if( window.XMLHttpRequest ) // Gecko  
			return new XMLHttpRequest() ;  
		else if ( window.ActiveXObject ) // IE  
			return new ActiveXObject("MsXml2.XmlHttp") ;  
	}
	function ajaxPage(url){  
		var oXmlHttp = GetHttpRequest() ;  
		oXmlHttp.onreadystatechange = function() {  
			if (oXmlHttp.readyState == 4){  
				includeJS( url, oXmlHttp.responseText );  
 			}
 		}
		oXmlHttp.open('GET', url, false);//同步操作  
		oXmlHttp.send(null);  
	}
	function includeJS( fileUrl, source) {  
		if ( source != null ){  
			var oHead = document.getElementsByTagName('HEAD').item(0);  
			var oScript = document.createElement( "script" );  
			oScript.type = "text/javascript";  
			oScript.text = source;  
			oScript.src = fileUrl;  
			oHead.appendChild( oScript );  
		}  
	}  

	
	////
	
	//update by xuzhongxiao 2011-08-26 控制点击图片边框颜色
	function changecolor(data){
		if(lastpic == "RFP"){
			document.getElementById(data).style.border="solid 2px red";
		}else{
			if(document.getElementById(lastpic).id == document.getElementById(data).id){
				document.getElementById(data).style.border="solid 2px red";
			}else{
				document.getElementById(data).style.border="solid 2px red";
				document.getElementById(lastpic).style.border="solid 2px #779955";
			}
		}
		lastpic=data;
	}
	function showxgrz(){
		$('.rx').hide(1);
		$('.jbxx').hide(1);
		$('.zwgd').hide(1);
		$('.DNA').hide(1);
		$('.CKINFO').hide(1);
		$(".GLXCINFO").hide(1);
		showdetail("xgrz");
		$(".xgrz").show(1);
	}
	
	function showCKinfo(){
		$('.rx').hide(1);
		$('.jbxx').hide(1);
		$('.zwgd').hide(1);
		$('.DNA').hide(1);
		$(".xgrz").hide(1);
		$(".GLXCINFO").hide(1);
		showdetail("CKINFO");
		$(".CKINFO").show(1);
	}
	
	function showGLXCinfo(){
		$('.rx').hide(1);
		$('.jbxx').hide(1);
		$('.zwgd').hide(1);
		$('.DNA').hide(1);
		$(".xgrz").hide(1);
		$(".CKINFO").hide(1);
		showdetail("GLXCINFO");
		$(".GLXCINFO").show(1);
		
		//增加代码转换
		code2Name();
	}
	function showdetail(divid){
		var b = document.getElementById("barcode").value;
		if(divid == "GLXCINFO"){
			if(document.getElementById("GLXCINFO").innerHTML == ""){
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_glxc_detail.jsp?barcode="+b,
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("获取关联现场详情失败,条码号："+b);
					},
				    success:function(data){
						data = data.replace(/^\s+|\s+$/g,"");
						document.getElementById("GLXCINFO").innerHTML = data;
				    }
				});
			}
		} else if(divid == "xgrz"){
			if(document.getElementById("xgrz").innerHTML == ""){
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_xgrz_detail.jsp?barcode="+b,
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("获取相关日志失败,条码号："+b);
					},
				    success:function(data){
						data = data.replace(/^\s+|\s+$/g,"");
						document.getElementById("xgrz").innerHTML = data;
				    }
				});
			}
		} else if(divid == "CKINFO"){
			if(document.getElementById("CKINFO").innerHTML == ""){
				var seriesbarcode = document.getElementById("SERIESBARCODE").value ;
				document.getElementById("CKINFO").innerHTML = "<img src=\"images/loading.gif\">";
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_ck_detail.jsp?barcode="+b+"&seriesbarcode="+seriesbarcode,
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("获取重卡详情失败,条码号："+b);
					},
				    success:function(data){
						data = data.replace(/^\s+|\s+$/g,"");
						document.getElementById("CKINFO").innerHTML = data;
				    }
				});
			}
		}
	}
	
	function to_query_only(barcode,dataType,rfpMnt,pfpMnt,plpMnt){
		//dataType 当前所在编辑类型，为1代表滚动指纹，2代表平面指纹，3代表掌纹。
		if(barcode != "undefined" && barcode != null && barcode != "" && barcode != undefined){
			var bflag_cur = "";
			var groupid = document.getElementById("groupid").value;
			var bflag = document.getElementById("bflag").value;//以0和1代表的6位数字字符串
		    var barcodes = barcode+"?"+bflag+"@"+groupid+",";
		    var strInfo = "";//实际编辑数据类型由实际传入特征判断而来
		    if(rfpMnt.length > 1000){
		    	document.getElementById("rfpMnt").value = rfpMnt;
		    	strInfo+= "1,";
		    }else{
		    	document.getElementById("rfpMnt").value = "";
		    }
		    if(pfpMnt.length > 1000){
		    	document.getElementById("pfpMnt").value = pfpMnt;
		    	strInfo+= "2,";
		    }else{
		    	document.getElementById("pfpMnt").value = "";
		    }
		    if(plpMnt.length > 1000){
		    	document.getElementById("plpMnt").value = plpMnt;
		    	strInfo+= "3,";
		    }else{
		    	document.getElementById("plpMnt").value = "";
		    }
		    
		    //start added by wangtao on 20160314
			//从查重平台接收的数据编辑发查询
			var seqnoPk = document.getElementById("seqnoPk").value;
			//end added by wangtao on 20160314
		    
			window.showModalDialog("../edit/to_query_edit.jsp?flag_ent=edit&strInfo="+strInfo+"&barcodes="+barcodes+'&seqnoPk='+seqnoPk,window,"dialogHeight:900px;dialogWidth:1020px;edge:Raised;center:yes;Help:No;resizable:No;status:no;");
		}else{
			alert("参数错误！");
			return;
		}
	}
	var afishtmloader;
	function synMnt(MntStr){
		/* MntStr参数是XML形式，各个节点具体含义如下
		<?xml version='1.0' encoding='GBK'?>
		<MNTPARAM>
	    	<PERSONORCASEFLAG>--人员或者案件标志，为人，为案
		  		1
			</PERSONORCASEFLAG>
			<BARCODE>--条码号
		  		A5308220000002013071301
			</BARCODE>
			<MNTPOSITION>--指位
		 		1
			</MNTPOSITION>
	  	</MNTPARAM>
		*/
		if(MntStr!= "undefined"&&MntStr!= null&&MntStr!= ""){
			var parm = "str="+MntStr;
			var path = document.getElementById("basePath").value;
			afishtmloader = new net.ContentLoader(path+"edit/sendPsnToAfis.jsp",showAfishtml,null,"post",parm,"application/x-www-form-urlencoded;charset=utf-8");
		}
	}
	
	function showAfishtml(){
		var rs = afishtmloader.req.responseText;
		rs = rs.replace(/^\s+|\s+$/g,"");
		if(rs == "0"){
			alert("4.1库不存在此人员！");
		}else if(rs == "-1"){
			alert("编辑同步到4.1出现异常！");
		}
	}
	function changepic(nVal){
		var i=nVal;
		if(i<11){//滚动指纹
			showDiv('GDZW');
		}else if(i>10&&i<21){//平面指纹
			showDiv('PMZW');
		}else if(i>30){//掌纹
			showDiv('ZW');
		}else{
			alert("传入的指位参数出错");
		}
	}
	//添加参数a，当特征有矛盾，点击否后传入参数“0”，避免循环触发控件   edited by zerppen 11:10 8/16/2016
	function showMNT_OCX(a){
		if(document.getElementById("zwgd").innerHTML == ""){
			document.getElementById("zwgd").innerHTML = "<OBJECT ID=\"CMntEditor\" CLASSID=\"CLSID:BC56AAB5-E79A-42B9-816E-5E2B90E8FFA2\" width=\"100%\" height=\"99%\"></OBJECT>";
  			//add by xuzhongxiao 2011-08-23 点击控件查询按钮发查询
			var obj = document.getElementById("CMntEditor");
			obj.attachEvent( "PersonQuery", to_query_only );
			obj.attachEvent( "PutMntParam", synMnt );
  			//add by jianglei on 20121105 添加保存按钮的同步事件来使得编辑后的图片能同步显示在界面
			obj.attachEvent("SavePicSuccess",changepic);
			//end 
			//alert("obj="+obj);
			if(a!="0"){
				
			    obj.attachEvent("getOcx_XML", getOcx_XML);
			}
		}
	}
	//添加参数ifnocontinue，当特征有矛盾，点击否后传入参数“0”，避免循环触发控件   edited by zerppen 11:10 8/16/2016
	function showFinger(data,ifnocontinue){
		if(data == "RFP"){
			$(".jbxx").hide(1);
			$(".rx").hide(1);
			$(".DNA").hide(1);
			$(".xgrz").hide(1);
			$('.CKINFO').hide(1);
			$(".GLXCINFO").hide(1);
			$(".zwgd").show(1);
			if(ifnocontinue=="0"){
				showMnt_OCX(ifnocontinue);
			}else{
			showMNT_OCX();
			}
		}else if(data == "PFP"){
			$(".jbxx").hide(1);
			$(".rx").hide(1);
			$(".DNA").hide(1);
			$(".xgrz").hide(1);
			$('.CKINFO').hide(1);
			$(".GLXCINFO").hide(1);
			$(".zwgd").show(1);
			if(ifnocontinue=="0"){
				showMnt_OCX(ifnocontinue);
			}else{
			showMNT_OCX();
			}
		}else if(data == "PLP"){
			$(".jbxx").hide(1);
			$(".rx").hide(1);
			$(".DNA").hide(1);
			$(".xgrz").hide(1);
			$('.CKINFO').hide(1);
			$(".GLXCINFO").hide(1);
			$(".zwgd").show(1);
			if(ifnocontinue=="0"){
				showMnt_OCX(ifnocontinue);
			}else{
			showMNT_OCX();
			}
		}
	}
	
	function toEdit(editBar,bar){
		if(editBar == bar){
			alert("此条码为当前编辑条码");
			return false;
		}else if(editBar != "" && editBar.length>8){
		    var	len_num = editBar.substring(editBar.length-8,editBar.length);
			parent.addTab('人员编辑['+len_num+']','edit/edit.jsp?MODEL=TMFY&BARCODE='+editBar);
		}else{
			alert("条码号长度不正确");
			return false;
		}
	}
	
	function toCaseEdit(editBar){
		if(editBar != "" && editBar.length>8){
		    var	len_num = editBar.substring(editBar.length-8,editBar.length);
			parent.addTab('案件编辑['+len_num+']','caseedit/caseedit.jsp?MODEL=TMFY&BARCODE='+editBar);
		}else{
			alert("条码号长度不正确");
			return false;
		}
	}
	
	// add by baoyx on 20130814 通过ajax方式获取页面必填项
		var myHtmloader;
		function getRequireField(){
			var dbid=document.getElementById("dbnum").value; // 获取选中逻辑分库的id
			 var tableName="person_logic_db";   // 表名（人员表）
			 var parm = "dbid="+dbid+"&tablename="+tableName;
			 myHtmloader = new net.ContentLoader("../query/getRequireField.jsp",showRequireField,null,"post",parm,"application/x-www-form-urlencoded;charset=utf-8");
		}
		var requireFields;	//必填项数组(定义为全局变量)
		function showRequireField(){    // 从数据库读取必填项，并对必填表单元素进行红色标识
			var rs = myHtmloader.req.responseText;
		    rs = rs.replace(/^\s+|\s+$/g,"");
		    requireFields=rs.split("@");  // 获取必填项数组
		    if(requireFields != ""){
				for(var i = 0; i < requireFields.length; i++){
					var requireGroup=requireFields[i].split(",");
					var requireField=requireGroup[0];	//取得必填项字段名
					var staticObj=document.getElementById(requireField+"_STATIC");  // 获取必填项的静态标签
					if(staticObj!=null){
						staticObj.className="td_inputRed";   // 把静态标签标识为红色
					}
					
				}
			}
		}
		
		// 逻辑分库选项发生变化后重绘新增页面（由oncahange触发，对必填项进行重新标识）
		function changeRequireField(){
		    var lastRequireFields=requireFields;  // 通过全局变量获取到上一次必填项系列（页面重绘之前）
		    if(lastRequireFields != ""){
				for(var i = 0; i < lastRequireFields.length; i++){
					var lastRequireFieldGroup=lastRequireFields[i].split(",");
					var lastRequireField=lastRequireFieldGroup[0];	//取得必填项字段名
					var staticObj=document.getElementById(lastRequireField+"_STATIC");  // 获取必填项的静态标签
					if(staticObj!=null){
						staticObj.className="td_input1";   // 把静态标签标识为黑色
					}
					
				}
			}
				getRequireField();  // 重新对必填项进行加载，并对页面进行重绘	
		}
		
		// 对必填项进行非空验证
		function validateRequire(){
			 var flag="true";
			 if(requireFields != ""){
				for(var i = 0; i < requireFields.length; i++){
					var requireGroup=requireFields[i].split(",");
					var requireField=requireGroup[0];	//取得必填项字段名
					var requireForm=document.getElementById(requireField);  // 获取必填项表单元素
					var staticObj=document.getElementById(requireField+"_STATIC"); // 获得必填项静态标签
					if(requireForm!=null){
					    if(trim(requireForm.value)=="") {
						  if(staticObj!=null){
						       staticObj.className="td_inputBlue";
						     }
						 alert(requireGroup[1]+"不能为空！");
						 flag="false";
						 return ;
						}else{
						     if(staticObj!=null){
						       staticObj.className="td_inputRed";
						     }
						}
					}
				}
			}
			return flag;
		}
		// end add by baoyx on 20130814
		
		//start added by wangtao on 20151019
		//TASK#638 自定义必填项在文档信息编辑页面未起到约束作用。 
		function checkempty2(){
			if(document.frminput.NAME.value==""){
				alert("姓名不能为空");
				return false;
			}
			if(document.frminput.SEX.value==""){
				alert("性别不能为空");
				return false;
			}
	        if(document.frminput.COLLECTUNITNAME.value==""){
	        	alert("捺印单位不能为空");
				return false;
			}
			/*if(document.frminput.COLLECTPSN.value==""){
				alert("捺印人不能为空");
				return false;
			}*/
			//add by qinzhijin on 20180127 雲南的捺印人只能是汉字
	        var nyrXm = document.frminput.COLLECTPSN.value;
	        var BARCODE =document.frminput.BARCODE;
	        //alert("BARCODE11==="+BARCODE.value.substring(0,2));
			if(nyrXm==""){
				alert("捺印人不能为空");
				return false;
			}
			regExp =  /^[\u4e00-\u9fa5]+$/;
			var m = regExp.test(nyrXm);
			if( !m && (BARCODE.value.substring(0,2)=="53")) {
				alert("捺印人姓名必须是汉字");
				return false;
			}
			
			if(document.frminput.COLLECTDATE.value==""){
				alert("捺印时间不能为空");
				return false;
			}	 
				
			if (!CheckObjLen(document.frminput.NAME,"姓名",30))
				return false;
			if (!CheckObjLen(document.frminput.COLLECTPSN,"捺印人",30))
				return false;
			if (!CheckObjLen(document.frminput.DNABARCODE,"DNA编号",24))
				return false;
			if (!CheckObjLen(document.frminput.ALIASNAME,"别名",30))
				return false;
			if (!CheckObjLen(document.frminput.USEREDNAME,"曾用名",30))
				return false;
			if (!CheckObjLen(document.frminput.HOUSEREG,"户籍地详址",70))
				return false;
			if (!CheckObjLen(document.frminput.ADDRESS,"户籍地详址",70))
				return false;
			if (!CheckObjLen(document.frminput.IDNUMBERCODE,"证件号码",24))
				return false;
			if (!CheckObjLen(document.frminput.COMMUNITY,"居住地社区",60))
				return false;
			if (!CheckObjLen(document.frminput.WORKUNIT,"工作单位",100))
				return false;
			if (!CheckObjLen(document.frminput.FTPBARCODE,"足迹编号",24))
				return false;
			if (!CheckObjLen(document.frminput.CASEDETAILS,"犯罪描述",250))
				return false;
			if (!CheckObjLen(document.frminput.REMARK,"备注",600))
				return false;
			if (!CheckObjLen(document.frminput.CRIMINALREC,"前科情况",1024))
				return false;
			if (!CheckObjLen(document.frminput.COLLECTPSN,"捺印人",30))
				return false;
			if (!CheckObjLen(document.frminput.MISBARCODE,"警综编号",36))
				return false;
			
			return true;
		}
		
		//将页面中已加载的元素值备份
		function setEditData(){
			var old_misbarcode = document.frminput.MISBARCODE.value;//警综编号
			var old_dnabarcode = document.frminput.DNABARCODE.value; //DNA编号
			var old_birthaddcode = document.frminput.nBIRTHADDCODE.value; //籍贯
			var old_idnumber = document.frminput.IDNUMBER.value; //身份证号
			var old_aliasname = document.frminput.ALIASNAME.value; //别名
			var old_useredname = document.frminput.USEREDNAME.value; //曾用名
			var old_birthdate = document.frminput.BIRTHDATE.value; //出生日期
			var old_houseregcode = document.frminput.nHOUSEREGCODE.value; //户籍地区划
			var old_housereg = document.frminput.HOUSEREG.value; //户籍地详址
			var old_nationality = document.frminput.nNATIONALITY.value; //国籍
			var old_naddresscode = document.frminput.nADDRESSCODE.value; //现住地区划
			var old_address = document.frminput.ADDRESS.value; //现住详址
			var old_nation = document.frminput.nNATION.value; //民族
			var old_identity = document.frminput.nIDENTITY.value; //身份
			var old_profession = document.frminput.nPROFESSION.value; //职业
			var old_voice = document.frminput.nVOICE.value; //口音
			var old_idnumbertype = document.frminput.nIDNUMBERTYPE.value; //证件类型
			var old_idnumbercode = document.frminput.IDNUMBERCODE.value; //证件号码
			var old_politicsstatus = document.frminput.nPOLITICSSTATUS.value; //政治面貌
			var old_phone1 = document.frminput.PHONE1.value; //电话1
			var old_phone2 = document.frminput.PHONE2.value; //电话2
			var old_deucation = document.frminput.nDEUCATION.value; //文化程度
			var old_community = document.frminput.COMMUNITY.value; //居住地社区
			var old_workunit = document.frminput.WORKUNIT.value; //工作单位
			var old_height = document.frminput.HEIGHT.value; //身高
			var old_habitus = document.frminput.nHABITUS.value; //体型
			var old_weight = document.frminput.WEIGHT.value; //（体型）千克
			var old_feature = document.frminput.nFEATURE.value; //脸型
			var old_footlength = document.frminput.FOOTLENGTH.value; //足长
			var old_specialty = document.frminput.nSPECIALTY.value; //专长
			var old_bloodtype = document.frminput.nBLOODTYPE.value; //血型
			var old_ftpbarcode = document.frminput.FTPBARCODE.value; //足迹编号
			var old_fingermnt = document.frminput.nFINGERMNT.value; //指掌纹特殊特征
			var old_signalement1 = document.frminput.nSIGNALEMENT1.value; //特殊特征1
			var old_signalement2 = document.frminput.nSIGNALEMENT2.value; //特殊特征2
			var old_signalement3 = document.frminput.nSIGNALEMENT3.value; //特殊特征3
			var old_casetype1 = document.frminput.nCASETYPE1.value; //案件类别1
			var old_casetype2 = document.frminput.nCASETYPE2.value; //案件类别2
			var old_casetype3 = document.frminput.nCASETYPE3.value; //案件类别3
			var old_casedetails = document.frminput.CASEDETAILS.value; //犯罪描述
			var old_remark = document.frminput.REMARK.value; //备注
			var old_criminalrec = document.frminput.CRIMINALREC.value; //前科情况
			
			document.getElementById("EDIT_DNABARCODE").value = old_dnabarcode;
			document.getElementById("EDIT_BIRTHADDCODE").value = old_birthaddcode;
			document.getElementById("EDIT_IDNUMBER").value = old_idnumber;
			document.getElementById("EDIT_ALIASNAME").value = old_aliasname;
			document.getElementById("EDIT_USEREDNAME").value = old_useredname;
			document.getElementById("EDIT_BIRTHDATE").value = old_birthdate;
			document.getElementById("EDIT_HOUSEREGCODE").value = old_houseregcode;
			document.getElementById("EDIT_HOUSEREG").value = old_housereg;
			document.getElementById("EDIT_NATIONALITY").value = old_nationality;
			document.getElementById("EDIT_ADDRESSCODE").value = old_naddresscode;
			document.getElementById("EDIT_ADDRESS").value = old_address;
			document.getElementById("EDIT_NATION").value = old_nation;
			document.getElementById("EDIT_IDENTITY").value = old_identity;
			document.getElementById("EDIT_PROFESSION").value = old_profession;
			document.getElementById("EDIT_VOICE").value = old_voice;
			document.getElementById("EDIT_IDNUMBERTYPE").value = old_idnumbertype;
			document.getElementById("EDIT_IDNUMBERCODE").value = old_idnumbercode;
			document.getElementById("EDIT_POLITICSSTATUS").value = old_politicsstatus;
			document.getElementById("EDIT_PHONE1").value = old_phone1;
			document.getElementById("EDIT_PHONE2").value = old_phone2;
			document.getElementById("EDIT_DEUCATION").value = old_deucation;
			document.getElementById("EDIT_COMMUNITY").value = old_community;
			document.getElementById("EDIT_WORKUNIT").value = old_workunit;
			document.getElementById("EDIT_HEIGHT").value = old_height;
			document.getElementById("EDIT_HABITUS").value = old_habitus;
			document.getElementById("EDIT_WEIGHT").value = old_weight;
			document.getElementById("EDIT_FEATURE").value = old_feature;
			document.getElementById("EDIT_FOOTLENGTH").value = old_footlength;
			document.getElementById("EDIT_SPECIALTY").value = old_specialty;
			document.getElementById("EDIT_BLOODTYPE").value = old_bloodtype;
			document.getElementById("EDIT_FTPBARCODE").value = old_ftpbarcode;
			document.getElementById("EDIT_FINGERMNT").value = old_fingermnt;
			document.getElementById("EDIT_SIGNALEMENT1").value = old_signalement1;
			document.getElementById("EDIT_SIGNALEMENT2").value = old_signalement2;
			document.getElementById("EDIT_SIGNALEMENT3").value = old_signalement3;
			document.getElementById("EDIT_CASETYPE1").value = old_casetype1;
			document.getElementById("EDIT_CASETYPE2").value = old_casetype2;
			document.getElementById("EDIT_CASETYPE3").value = old_casetype3;
			document.getElementById("EDIT_CASEDETAILS").value = old_casedetails;
			document.getElementById("EDIT_REMARK").value = old_remark;
			document.getElementById("EDIT_CRIMINALREC").value = old_criminalrec;
		}
		//end added by wangtao on 20151019
