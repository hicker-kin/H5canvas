var testFn = function(){
	console.log("我被其他js文件引入！");
}


function checkIdNo( idNo ) {
   		var len = idNo.length,
   		p = /\D/g,
   		y,m,d;
   		if( len == 0 )
      		return 0
      	alert("ss1==="+len);	
      	alert("ss2==="+len != 18);	
      	alert("ss3==="+len != 15);	
		if( len != 18 && len != 15 ) {//==>等价于 len == 18 || len == 15
			//身份证号长度不对 -> %u8EAB%u4EFD%u8BC1%u53F7%u957F%u5EA6%u4E0D%u5BF9
      		alert( unescape( "%u8EAB%u4EFD%u8BC1%u53F7%u957F%u5EA6%u4E0D%u5BF9" )/**"身份证号长度不对"*/ );
      		return -1
   		}
		if( len == 15 ) {
			//15位的身份证号码必须为0到9的数字. -> 15%u4F4D%u7684%u8EAB%u4EFD%u8BC1%u53F7%u7801%u5FC5%u987B%u4E3A0%u52309%u7684%u6570%u5B57.
			if( p.test( idNo ) ) {
				alert( unescape( "15%u4F4D%u7684%u8EAB%u4EFD%u8BC1%u53F7%u7801%u5FC5%u987B%u4E3A0%u52309%u7684%u6570%u5B57." ) );
				return -1;
			}
         	y = "19" + idNo.substring( 6, 8 );
      		m = idNo.substring( 8, 10 );
      		d = idNo.substring( 10, 12 );
		}
   		if( len == 18 ) {
   			var tmp = idNo.substring( 0, 17 );
   			//18位的身份证号码前17位必须为0到9的数字. -> 18%u4F4D%u7684%u8EAB%u4EFD%u8BC1%u53F7%u7801%u524D17%u4F4D%u5FC5%u987B%u4E3A0%u52309%u7684%u6570%u5B57.
   			if( p.test( tmp ) ) {
   				alert( unescape( "18%u4F4D%u7684%u8EAB%u4EFD%u8BC1%u53F7%u7801%u524D17%u4F4D%u5FC5%u987B%u4E3A0%u52309%u7684%u6570%u5B57." ) );
   				return -1;
   			}
   				
         	var lastChar = idNo.substring( 17, 18 ),
         	p1 = /[0-9]|X/;
         	if( !p1.test( lastChar ) ) {
         		//身份证最后一位必须是0到9的数字或者大写的X. -> %u8EAB%u4EFD%u8BC1%u6700%u540E%u4E00%u4F4D%u5FC5%u987B%u662F0%u52309%u7684%u6570%u5B57%u6216%u8005%u5927%u5199%u7684X.
         		alert( unescape( "%u8EAB%u4EFD%u8BC1%u6700%u540E%u4E00%u4F4D%u5FC5%u987B%u662F0%u52309%u7684%u6570%u5B57%u6216%u8005%u5927%u5199%u7684X." ) );
         		return -1;
         	}
         	y = idNo.substring( 6, 10 );
      		m = idNo.substring( 10, 12 );
      		d = idNo.substring( 12,14 );
   		}
   		var p1 = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
   		if( !p1.test( ( y + "-" + m + "-" + d ) ) ) {
   			//身份证号码中出生日期部分有误！ -> %u8EAB%u4EFD%u8BC1%u53F7%u7801%u4E2D%u51FA%u751F%u65E5%u671F%u90E8%u5206%u6709%u8BEF%uFF01
   			alert( unescape( "%u8EAB%u4EFD%u8BC1%u53F7%u7801%u4E2D%u51FA%u751F%u65E5%u671F%u90E8%u5206%u6709%u8BEF%uFF01" ) );
   			return -1;
   		}
   		return 1
}