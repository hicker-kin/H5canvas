var xmlHttp = null;
function myAjax(){
	if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(xmlHttp != null){
		xmlHttp.open("get","2.html",true);
		xmlHttp.send();
		xmlHttp.onreadystatechange = callFn;//回调函数
		xmlHttp.error = errorFn;
	}
}

function callFn(){
	alert("ajax的请求状态=== "+xmlHttp.readyState);
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
		document.write(xmlHttp.responseText);
   	}
}


function errorFn(XMLHttpRequest, textStatus, errorThrown) {
    alert("请求创建调用控件失败,错误状态=="+XMLHttpRequest.status);
}