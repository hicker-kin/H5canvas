	//add by wangtao on 20130603 ��ӿ��ƿؼ���ʾ��Ⱥ͸߶ȵĲ���
	var sbImageType;
	var width,height;
	function setDIv(){
		width = window.screen.availWidth-390;//��ȡ�ֱ���-��
		height = window.screen.availHeight-90;//��ȡ�ֱ���-��
		//�������DIV�Ŀ�͸�
		var temp = document.getElementById("_ldiv");
		temp.style.height = height;
		
		//�����Ҳ�DIV�Ŀ�͸�
		var temp = document.getElementById("info");
		temp.style.left = "206px";
		temp.style.width = (width-2);
		temp.style.height = (height);
		//alert(temp.outerHTML);
		
		//���ÿؼ�DIV�ĸߺͿ�
		var tempObj = document.getElementById("zwgd");
		tempObj.style.left = "206px";
		tempObj.style.width = (width-2);
		tempObj.style.height = (height);
		
		//���������λ��
		var tempRX = document.getElementById("rx");
		tempRX.style.left = width/2;
		
		$("#_ldiv").show(1);
		$("#info").show(1);
	}
	
	//�����Ҳ�DIV�Ŀ�͸�
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
			// ���¿�ʼ��ɾ������Ĵ������
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
		//add by jianglei on 20130311 ��������ֵ
		//document.frminput.NATIONALITY.value=document.frminput.aNATIONALITY.CodeVal;
		//end
		var BARCODE =document.frminput.BARCODE;
		var otherkeyid= document.frminput.otherkeyid;
		var otherkeyfld=document.frminput.otherkeyfld;
		var maptbl=document.frminput.maptbl;
		var weight = document.frminput.WEIGHT.value; 
		if(weight.length > 5){
			alert("�����������5���ַ�");
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
			if(IfValidDate(document.frminput.fBIRTHDATE.value,"��������")==-1)	
				return(false);		
				document.frminput.BIRTHDATE.value=document.frminput.fBIRTHDATE.value;	
			}else{
		 	document.frminput.BIRTHDATE.value="";
		}
		if(document.frminput.fCOLLECTDATE.value!=""){	
			if(IfValidDate(document.frminput.fCOLLECTDATE.value,"��ӡ����")==-1)	
				return(false);		
				document.frminput.COLLECTDATE.value=document.frminput.fCOLLECTDATE.value;	
		}else{
			document.frminput.COLLECTDATE.value="";
		}
		if(IfValidnumb(document.frminput.HEIGHT.value,0,0,0,"���")==-1){	
			return false;	
		}
		if(IfValidnumb(document.frminput.FOOTLENGTH.value,0,0,0,"�㳤")==-1){	
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
			alert("��������Ϊ��");
			return false;
		}
		if(document.frminput.SEX.value==""){
			alert("�Ա���Ϊ��");
			return false;
		}
		if(document.frminput.BIRTHDATE.value==""){
			alert("�������ڲ���Ϊ��");
			return false;
		}
		if(document.getElementById("nNATIONALITY").value=="�й�"&&document.frminput.HOUSEREGCODE.value==""){
			alert("��������������Ϊ��");
			return false;
		}
		if(document.getElementById("nNATIONALITY").value=="�й�"&&document.frminput.HOUSEREG.value==""){
			alert("��������ַ����Ϊ��");
			return false;
		}
		if(document.frminput.ADDRESSCODE.value==""){
			alert("��סַ��������Ϊ��");
			return false;
		}
		if(document.frminput.ADDRESS.value==""){
			alert("��סַ��ַ����Ϊ��");
			return false;
		}
		if (document.frminput.HEIGHT.value != "" && (document.frminput.HEIGHT.value < 50 || document.frminput.HEIGHT.value > 300)){
			alert("��߱�����50������300����֮��");
			return false;
		}
		if (document.frminput.FOOTLENGTH.value != "" && (document.frminput.FOOTLENGTH.value < 50 || document.frminput.FOOTLENGTH.value > 500)){
			alert("�㳤������50������500����֮��");
			return false;
		}
		 
        if(document.frminput.COLLECTUNITNAME.value==""){
        	alert("��ӡ��λ����Ϊ��");
			return false;
		}
		if(document.frminput.COLLECTPSN.value==""){
			alert("��ӡ�˲���Ϊ��");
			return false;
		}
		if(document.frminput.COLLECTDATE.value==""){
			alert("��ӡʱ�䲻��Ϊ��");
			return false;
		}	 
			
		if (!CheckObjLen(document.frminput.NAME,"����",30))
			return;
		if (!CheckObjLen(document.frminput.ALIASNAME,"����/�º�",30))
			return;	
		if (!CheckObjLen(document.frminput.USEREDNAME,"������",20))
			return;
		if (!CheckObjLen(document.frminput.HOUSEREG,"��������ַ",100))
			return;
		if (!CheckObjLen(document.frminput.ADDRESS,"��סַ��ַ",100))
			return;
		//edited by wangtao on 20141218 ��������λ�������������������Ȱ���4.1���еĳ�������
		if (!CheckObjLen(document.frminput.WORKUNIT,"������λ",40))
			return;
		if (!CheckObjLen(document.frminput.CASEDETAILS,"��������",256))
			return;
		//end edited by wangtao on 20141218
		if (!CheckObjLen(document.frminput.COLLECTPSN,"��ӡ��",30))
			return;
		if (!CheckObjLen(document.frminput.REMARK,"��ע",512))
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
			alert("�Ǳ���λ��Ϣ�����޸�");
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
		//TASK#638 �Զ�����������ĵ���Ϣ�༭ҳ��δ��Լ�����á�
		//if(validateRequire()){	// update by baoyx on 20150924 �����Զ��������ķǿ���֤
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
			var k = 0;//�������� xuzhongxiao 2011-12-31
			var muster = "<tr>";
			for ( var i = 0; i < codearr.length - 1; i++) {
				if(codearr[i] != "" && codearr[i] != null&&statearr[i]=="0"){//update by xuzhongxiao 2011-12-31 Ϊ�ղ���ʾ
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
			//muster += "<tr><td width='50%' align='center' colspan='4'><input type='button' class='lib' value = 'ȷ ��' onclick='getName()'/></td>";
			//muster += "<td width='50%' align='center' colspan='4'><input type='button' class='lib' value = 'ȡ ��' onclick='hideOption()'/></td></tr>";
			muster += "<tr align='center'><td colspan='8' width=100%' ><input type='button' class='lib' value = ' ȷ  �� ' onclick='getName()'/>&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' class='lib' value = ' ȡ  �� ' onclick='hideOption()'/></td>";
			muster += "</tr>";
			$("#tabs").append(muster);
			clickcount = 1;
		}
	}
		
	function hideOption(){
		$("#optiondiv").hide();
	}
		
	function getName(){
		/*update by xuzhongxiao 2011-12-31 �޸���Ա����Ա�����ֶ�ֵ������������
			�������������Ա���ͣ�����ǴӺ���ǰ���еģ���ǰ�������û�п��ǣ���ֻ���ǵ��˴�
			ǰ�����������У����Ǹ�����Ա���ͱ����ж������ͣ�ҳ����ʾ�������ͣ�����ѡ������Щ
			���Ƚϣ�ʵ���ϵ���Ա���ͱ�û��32��������Ա��������;ͻ������⣬ǰ��Ĵ�λ�������ȫ��Ϊ0��
			���磺��Ա���ͱ���1��2��3��4��5��23��24��ҳ��ѡ��1��3��4��5��23��24��
			��Ա����Ա����ֵΪ 10111110000000000000000000000000,
			��ȷֵӦΪ	   10111000000000000000001100000000
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
				var id_value = muster[i].value;//��ȡѡ����Ա���͵�ֵ���Ǵ�1��ʼ�ġ�
					names += (namearr[id_value-1]+"  ");//�����Ǵ�0��ʼ�ģ�������Ա����id-1���������Ӧ��Ա��������ֵ��
					//update by xuzhongxiao 2011-12-31 start
					var befcount = count.substring(0,muster[i].value-1);
					var aftcount = count.substring(muster[i].value);
					count = befcount+"1"+aftcount;
					//end
					//ע��by xuzhongxiao
				//result += "1";
			//}else{
			//	result += "0";
			}
		}
		result = count;
		//ע��by xuzhongxiao
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
		//edited by wangtao on 20141229 ���5484ʱ���������⣬ԭ����ӷ�Υ��Ա����ʱδ�ӱ���
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
		//};//Mozilla��window.eval������IE��window.execScript����������ͬ
		var oHead = document.getElementsByTagName('HEAD').item(0); 
		var oScript= document.createElement("script"); 
		oScript.type = "text/javascript"; 
		oScript.src=u; 
		oHead.appendChild(oScript);  
	}     
	function clearOcxmerory(){
		// �����ؼ�
		for(var i=1;i<=10;i++){
			var obj=document.getElementById("IImageController"+i);
			if(obj!=null){
				obj.ClearData(1,1);
			}
		}
		// ƽ��ؼ�
		for(var i=1;i<=10;i++){
			var obj=document.getElementById("IImageControllerPFP"+i);
			if(obj!=null){
				obj.ClearData(1,1);
			}
		}
		// ���ƿؼ�
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
				alert("����ָ��û������");
				n = -1;
			}
		}else if(n == 3){
			var pfpbar = document.getElementById("PFPBARCODE").value;
			if(pfpbar != ""){
				showDiv("PMZW",defaultFinger);
			}else{
				alert("ƽ��ָ��û������");
				n = -1;
			}
		}else if(n == 4){
			var plpbar = document.getElementById("PLPBARCODE").value;
			if(plpbar != ""){
				showDiv("ZW",defaultFinger);
			}else{
				alert("����û������");
				n = -1;
			}
		}else if(n == 5){ // �㼣
			showDiv("ZJ");
		}else if(n == 6){ // �ؿ�
			showDiv("CKINFO");
			m = 5;
		}else if(n == 7){ // �����ֳ�ָ��
			showDiv("GLXC");
			m = 6;
		}else if(n == 8){ // DNA
			n=0;
			showDNA("DNA");
		}else if(n == 9){ // �����־
			showDiv("XGRZ");
			m = 7;
		}
		if(n != -1){
			// ������CSS����
			for(i=0;i<secTable.cells.length;i++){
				if(secTable.cells[i].className=="sec3"){
				
				} else {
					secTable.cells[i].className="sec1";
				}
			}
			secTable.cells[m].className="sec2";
			// �ұ���ʾ���ݿ���
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
	
	// add by baoyx on 20140806 ������ʾ����ָ��ͼ���js����������Ϊ��ͼ����ʾ�ؼ���ҳ���·����ָλ�����ݿ�������Ա��š�dbid���������ѹ�����롢ͼ���ȡ�ͼ��߶ȡ�ԭͼ��С��ѹ��ͼ��С
	function showRfp(image,path,rfpIndex,pfp,pid,dbid,random,rfpcodetype,width,height,imgSize,compressImgSize){
		var imgurl="";
		var strXml="";
		if(rfpcodetype==0){	// ��ѹ��ͼ
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
	
	// add by baoyx on 20140806 ������ʾƽ��ָ��ͼ���js����������Ϊ��ͼ����ʾ�ؼ���ҳ���·����ָλ�����ݿ�������Ա��š�dbid���������ѹ�����롢ͼ���ȡ�ͼ��߶ȡ�ԭͼ��С��ѹ��ͼ��С
	function showPfp(image,path,pfpIndex,pfp,pid,dbid,random,pfpcodetype,width,height,imgSize,compressImgSize){
		var imgurl="";
		var strXml="";
		if(pfpcodetype==0){	// ��ѹ��ͼ
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
	
	// add by baoyx on 20140806 ������ʾ����ͼ���js����������Ϊ��ͼ����ʾ�ؼ���ҳ���·����ָλ�����ݿ�������Ա��š�dbid���������ѹ�����롢ͼ���ȡ�ͼ��߶ȡ�ԭͼ��С��ѹ��ͼ��С
	function showPlp(image,path,plpIndex,plp,pid,dbid,random,plpcodetype,width,height,imgSize,compressImgSize){
		var imgurl="";
		var strXml="";
		if(plpcodetype==0){	// ��ѹ��ͼ
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
		//��ȡ�ؼ�����༭ҳ�淵��XML�ļ�   added by  zerppen at 11:21 8/15/2016
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
	
	//ì������������񡱺�ԭ��ì������ͼƬ   added by  zerppen at 11:21 8/16/2016
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
				url,//�༭ͼ������������
				mnttype,
				editunit,edituser);

				window.clearInterval(timer1);
		}
	}
	//ì������������񡱺�ԭ��ì������ͼƬ   added by  zerppen at 11:21 8/16/2016
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
	//ì������������񡱺�ԭ��ì������ͼƬ   added by  zerppen at 11:21 8/16/2016
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
	// update by baoyx on 20140806 Ϊ��Ӧ�°汾ͼ����ʾ�ؼ�����Ҫ��ָ��ͼ����ʾ��js�����޸ģ�����js�����Ż��������������  
	var rfp_timer;
	function showDiv(rs,defaultFinger){
		var b = document.getElementById("barcode").value;
		var pfp = document.getElementById("pfp").value;
	   	var plp = document.getElementById("plp").value;
		var sdiv = document.getElementById(rs+"DIV");
		var pid=document.getElementById("pid").value;
		var dbid=document.getElementById("dbid").value;
		var path=document.getElementById("basePath").value;
		var random=Math.random();//���������������������
		if(rs=="GDZW"){ // ����ָ��
			if(document.getElementById("gdzw_td").innerHTML == ""){
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_gdzw.jsp",
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("��ȡ����ָ��ʧ��,����ţ�"+b);
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
	    } else if(rs == "PMZW"){ // ƽ��ָ��
	    	if(document.getElementById("pmzw_td").innerHTML == ""){
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_pmzw.jsp",
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("��ȡƽ��ָ��ʧ��,����ţ�"+b);
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
						var pfpcodetype = document.getElementById("pfpcodetype").value;//ѹ������
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
		} else if( rs == "ZW" ){ // ����
			if(document.getElementById("zw_td").innerHTML == ""){
				$.ajax({
				    url:document.getElementById("basePath").value+"edit/get_personedit_zw.jsp?barcode="+b,
				    async:false,
				    error:function(XMLHttpRequest, textStatus, errorThrown) {
						alert("��ȡ����ʧ��,����ţ�"+b);
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
						// ����ʾ��2ö����ΪĬ����ʾ���ǵڶ�ö����
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
						alert("��ȡ����ʧ��,����ţ�"+b);
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
						alert("��ȡ�ؿ�ʧ��,����ţ�"+b);
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
						alert("��ȡ�ֳ�����ʧ��,����ţ�"+b);
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
						alert("��ȡ�����־ʧ��,����ţ�"+b);
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
		oXmlHttp.open('GET', url, false);//ͬ������  
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
	
	//update by xuzhongxiao 2011-08-26 ���Ƶ��ͼƬ�߿���ɫ
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
		
		//���Ӵ���ת��
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
						alert("��ȡ�����ֳ�����ʧ��,����ţ�"+b);
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
						alert("��ȡ�����־ʧ��,����ţ�"+b);
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
						alert("��ȡ�ؿ�����ʧ��,����ţ�"+b);
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
		//dataType ��ǰ���ڱ༭���ͣ�Ϊ1�������ָ�ƣ�2����ƽ��ָ�ƣ�3�������ơ�
		if(barcode != "undefined" && barcode != null && barcode != "" && barcode != undefined){
			var bflag_cur = "";
			var groupid = document.getElementById("groupid").value;
			var bflag = document.getElementById("bflag").value;//��0��1�����6λ�����ַ���
		    var barcodes = barcode+"?"+bflag+"@"+groupid+",";
		    var strInfo = "";//ʵ�ʱ༭����������ʵ�ʴ��������ж϶���
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
			//�Ӳ���ƽ̨���յ����ݱ༭����ѯ
			var seqnoPk = document.getElementById("seqnoPk").value;
			//end added by wangtao on 20160314
		    
			window.showModalDialog("../edit/to_query_edit.jsp?flag_ent=edit&strInfo="+strInfo+"&barcodes="+barcodes+'&seqnoPk='+seqnoPk,window,"dialogHeight:900px;dialogWidth:1020px;edge:Raised;center:yes;Help:No;resizable:No;status:no;");
		}else{
			alert("��������");
			return;
		}
	}
	var afishtmloader;
	function synMnt(MntStr){
		/* MntStr������XML��ʽ�������ڵ���庬������
		<?xml version='1.0' encoding='GBK'?>
		<MNTPARAM>
	    	<PERSONORCASEFLAG>--��Ա���߰�����־��Ϊ�ˣ�Ϊ��
		  		1
			</PERSONORCASEFLAG>
			<BARCODE>--�����
		  		A5308220000002013071301
			</BARCODE>
			<MNTPOSITION>--ָλ
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
			alert("4.1�ⲻ���ڴ���Ա��");
		}else if(rs == "-1"){
			alert("�༭ͬ����4.1�����쳣��");
		}
	}
	function changepic(nVal){
		var i=nVal;
		if(i<11){//����ָ��
			showDiv('GDZW');
		}else if(i>10&&i<21){//ƽ��ָ��
			showDiv('PMZW');
		}else if(i>30){//����
			showDiv('ZW');
		}else{
			alert("�����ָλ��������");
		}
	}
	//��Ӳ���a����������ì�ܣ��������������0��������ѭ�������ؼ�   edited by zerppen 11:10 8/16/2016
	function showMNT_OCX(a){
		if(document.getElementById("zwgd").innerHTML == ""){
			document.getElementById("zwgd").innerHTML = "<OBJECT ID=\"CMntEditor\" CLASSID=\"CLSID:BC56AAB5-E79A-42B9-816E-5E2B90E8FFA2\" width=\"100%\" height=\"99%\"></OBJECT>";
  			//add by xuzhongxiao 2011-08-23 ����ؼ���ѯ��ť����ѯ
			var obj = document.getElementById("CMntEditor");
			obj.attachEvent( "PersonQuery", to_query_only );
			obj.attachEvent( "PutMntParam", synMnt );
  			//add by jianglei on 20121105 ��ӱ��水ť��ͬ���¼���ʹ�ñ༭���ͼƬ��ͬ����ʾ�ڽ���
			obj.attachEvent("SavePicSuccess",changepic);
			//end 
			//alert("obj="+obj);
			if(a!="0"){
				
			    obj.attachEvent("getOcx_XML", getOcx_XML);
			}
		}
	}
	//��Ӳ���ifnocontinue����������ì�ܣ��������������0��������ѭ�������ؼ�   edited by zerppen 11:10 8/16/2016
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
			alert("������Ϊ��ǰ�༭����");
			return false;
		}else if(editBar != "" && editBar.length>8){
		    var	len_num = editBar.substring(editBar.length-8,editBar.length);
			parent.addTab('��Ա�༭['+len_num+']','edit/edit.jsp?MODEL=TMFY&BARCODE='+editBar);
		}else{
			alert("����ų��Ȳ���ȷ");
			return false;
		}
	}
	
	function toCaseEdit(editBar){
		if(editBar != "" && editBar.length>8){
		    var	len_num = editBar.substring(editBar.length-8,editBar.length);
			parent.addTab('�����༭['+len_num+']','caseedit/caseedit.jsp?MODEL=TMFY&BARCODE='+editBar);
		}else{
			alert("����ų��Ȳ���ȷ");
			return false;
		}
	}
	
	// add by baoyx on 20130814 ͨ��ajax��ʽ��ȡҳ�������
		var myHtmloader;
		function getRequireField(){
			var dbid=document.getElementById("dbnum").value; // ��ȡѡ���߼��ֿ��id
			 var tableName="person_logic_db";   // ��������Ա��
			 var parm = "dbid="+dbid+"&tablename="+tableName;
			 myHtmloader = new net.ContentLoader("../query/getRequireField.jsp",showRequireField,null,"post",parm,"application/x-www-form-urlencoded;charset=utf-8");
		}
		var requireFields;	//����������(����Ϊȫ�ֱ���)
		function showRequireField(){    // �����ݿ��ȡ��������Ա����Ԫ�ؽ��к�ɫ��ʶ
			var rs = myHtmloader.req.responseText;
		    rs = rs.replace(/^\s+|\s+$/g,"");
		    requireFields=rs.split("@");  // ��ȡ����������
		    if(requireFields != ""){
				for(var i = 0; i < requireFields.length; i++){
					var requireGroup=requireFields[i].split(",");
					var requireField=requireGroup[0];	//ȡ�ñ������ֶ���
					var staticObj=document.getElementById(requireField+"_STATIC");  // ��ȡ������ľ�̬��ǩ
					if(staticObj!=null){
						staticObj.className="td_inputRed";   // �Ѿ�̬��ǩ��ʶΪ��ɫ
					}
					
				}
			}
		}
		
		// �߼��ֿ�ѡ����仯���ػ�����ҳ�棨��oncahange�������Ա�����������±�ʶ��
		function changeRequireField(){
		    var lastRequireFields=requireFields;  // ͨ��ȫ�ֱ�����ȡ����һ�α�����ϵ�У�ҳ���ػ�֮ǰ��
		    if(lastRequireFields != ""){
				for(var i = 0; i < lastRequireFields.length; i++){
					var lastRequireFieldGroup=lastRequireFields[i].split(",");
					var lastRequireField=lastRequireFieldGroup[0];	//ȡ�ñ������ֶ���
					var staticObj=document.getElementById(lastRequireField+"_STATIC");  // ��ȡ������ľ�̬��ǩ
					if(staticObj!=null){
						staticObj.className="td_input1";   // �Ѿ�̬��ǩ��ʶΪ��ɫ
					}
					
				}
			}
				getRequireField();  // ���¶Ա�������м��أ�����ҳ������ػ�	
		}
		
		// �Ա�������зǿ���֤
		function validateRequire(){
			 var flag="true";
			 if(requireFields != ""){
				for(var i = 0; i < requireFields.length; i++){
					var requireGroup=requireFields[i].split(",");
					var requireField=requireGroup[0];	//ȡ�ñ������ֶ���
					var requireForm=document.getElementById(requireField);  // ��ȡ�������Ԫ��
					var staticObj=document.getElementById(requireField+"_STATIC"); // ��ñ����̬��ǩ
					if(requireForm!=null){
					    if(trim(requireForm.value)=="") {
						  if(staticObj!=null){
						       staticObj.className="td_inputBlue";
						     }
						 alert(requireGroup[1]+"����Ϊ�գ�");
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
		//TASK#638 �Զ�����������ĵ���Ϣ�༭ҳ��δ��Լ�����á� 
		function checkempty2(){
			if(document.frminput.NAME.value==""){
				alert("��������Ϊ��");
				return false;
			}
			if(document.frminput.SEX.value==""){
				alert("�Ա���Ϊ��");
				return false;
			}
	        if(document.frminput.COLLECTUNITNAME.value==""){
	        	alert("��ӡ��λ����Ϊ��");
				return false;
			}
			/*if(document.frminput.COLLECTPSN.value==""){
				alert("��ӡ�˲���Ϊ��");
				return false;
			}*/
			//add by qinzhijin on 20180127 ��ϵ���ӡ��ֻ���Ǻ���
	        var nyrXm = document.frminput.COLLECTPSN.value;
	        var BARCODE =document.frminput.BARCODE;
	        //alert("BARCODE11==="+BARCODE.value.substring(0,2));
			if(nyrXm==""){
				alert("��ӡ�˲���Ϊ��");
				return false;
			}
			regExp =  /^[\u4e00-\u9fa5]+$/;
			var m = regExp.test(nyrXm);
			if( !m && (BARCODE.value.substring(0,2)=="53")) {
				alert("��ӡ�����������Ǻ���");
				return false;
			}
			
			if(document.frminput.COLLECTDATE.value==""){
				alert("��ӡʱ�䲻��Ϊ��");
				return false;
			}	 
				
			if (!CheckObjLen(document.frminput.NAME,"����",30))
				return false;
			if (!CheckObjLen(document.frminput.COLLECTPSN,"��ӡ��",30))
				return false;
			if (!CheckObjLen(document.frminput.DNABARCODE,"DNA���",24))
				return false;
			if (!CheckObjLen(document.frminput.ALIASNAME,"����",30))
				return false;
			if (!CheckObjLen(document.frminput.USEREDNAME,"������",30))
				return false;
			if (!CheckObjLen(document.frminput.HOUSEREG,"��������ַ",70))
				return false;
			if (!CheckObjLen(document.frminput.ADDRESS,"��������ַ",70))
				return false;
			if (!CheckObjLen(document.frminput.IDNUMBERCODE,"֤������",24))
				return false;
			if (!CheckObjLen(document.frminput.COMMUNITY,"��ס������",60))
				return false;
			if (!CheckObjLen(document.frminput.WORKUNIT,"������λ",100))
				return false;
			if (!CheckObjLen(document.frminput.FTPBARCODE,"�㼣���",24))
				return false;
			if (!CheckObjLen(document.frminput.CASEDETAILS,"��������",250))
				return false;
			if (!CheckObjLen(document.frminput.REMARK,"��ע",600))
				return false;
			if (!CheckObjLen(document.frminput.CRIMINALREC,"ǰ�����",1024))
				return false;
			if (!CheckObjLen(document.frminput.COLLECTPSN,"��ӡ��",30))
				return false;
			if (!CheckObjLen(document.frminput.MISBARCODE,"���۱��",36))
				return false;
			
			return true;
		}
		
		//��ҳ�����Ѽ��ص�Ԫ��ֵ����
		function setEditData(){
			var old_misbarcode = document.frminput.MISBARCODE.value;//���۱��
			var old_dnabarcode = document.frminput.DNABARCODE.value; //DNA���
			var old_birthaddcode = document.frminput.nBIRTHADDCODE.value; //����
			var old_idnumber = document.frminput.IDNUMBER.value; //���֤��
			var old_aliasname = document.frminput.ALIASNAME.value; //����
			var old_useredname = document.frminput.USEREDNAME.value; //������
			var old_birthdate = document.frminput.BIRTHDATE.value; //��������
			var old_houseregcode = document.frminput.nHOUSEREGCODE.value; //����������
			var old_housereg = document.frminput.HOUSEREG.value; //��������ַ
			var old_nationality = document.frminput.nNATIONALITY.value; //����
			var old_naddresscode = document.frminput.nADDRESSCODE.value; //��ס������
			var old_address = document.frminput.ADDRESS.value; //��ס��ַ
			var old_nation = document.frminput.nNATION.value; //����
			var old_identity = document.frminput.nIDENTITY.value; //���
			var old_profession = document.frminput.nPROFESSION.value; //ְҵ
			var old_voice = document.frminput.nVOICE.value; //����
			var old_idnumbertype = document.frminput.nIDNUMBERTYPE.value; //֤������
			var old_idnumbercode = document.frminput.IDNUMBERCODE.value; //֤������
			var old_politicsstatus = document.frminput.nPOLITICSSTATUS.value; //������ò
			var old_phone1 = document.frminput.PHONE1.value; //�绰1
			var old_phone2 = document.frminput.PHONE2.value; //�绰2
			var old_deucation = document.frminput.nDEUCATION.value; //�Ļ��̶�
			var old_community = document.frminput.COMMUNITY.value; //��ס������
			var old_workunit = document.frminput.WORKUNIT.value; //������λ
			var old_height = document.frminput.HEIGHT.value; //���
			var old_habitus = document.frminput.nHABITUS.value; //����
			var old_weight = document.frminput.WEIGHT.value; //�����ͣ�ǧ��
			var old_feature = document.frminput.nFEATURE.value; //����
			var old_footlength = document.frminput.FOOTLENGTH.value; //�㳤
			var old_specialty = document.frminput.nSPECIALTY.value; //ר��
			var old_bloodtype = document.frminput.nBLOODTYPE.value; //Ѫ��
			var old_ftpbarcode = document.frminput.FTPBARCODE.value; //�㼣���
			var old_fingermnt = document.frminput.nFINGERMNT.value; //ָ������������
			var old_signalement1 = document.frminput.nSIGNALEMENT1.value; //��������1
			var old_signalement2 = document.frminput.nSIGNALEMENT2.value; //��������2
			var old_signalement3 = document.frminput.nSIGNALEMENT3.value; //��������3
			var old_casetype1 = document.frminput.nCASETYPE1.value; //�������1
			var old_casetype2 = document.frminput.nCASETYPE2.value; //�������2
			var old_casetype3 = document.frminput.nCASETYPE3.value; //�������3
			var old_casedetails = document.frminput.CASEDETAILS.value; //��������
			var old_remark = document.frminput.REMARK.value; //��ע
			var old_criminalrec = document.frminput.CRIMINALREC.value; //ǰ�����
			
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
