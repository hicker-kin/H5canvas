var base64Util = (function(){
   var  _table = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
    ],
    encodeArr = arrToBs64,//byte arr to base64
    encodeStr = strToBs64,//str to bs64
    decodeBs64 = bs64ToArr,//bs64 to byte arr
    bs64Tostr = decodeBase64;
    
    handleFormat = {//定义函数名对应的函数
        'utf-8':toUTF8Binary,
        'unicode':stringToBinary
    };
    function stringToBinary(str , size , encodeType ){
        //  str-字符串 , size - 转换后的二进制位数 ,encodeType - 采用什么格式去保存二进制编码
        var i,
            len,
            binary = '';
        for ( i = 0 , len = str.length ; i < len ; i++ ){
            binary = binary + handleFormat[encodeType.toLowerCase()](str.charCodeAt(i));
        }
        return binary;
    }
    // 转换为以UTF-8格式的二进制数据
    function toUTF8Binary(unicode){
        var len,
            binary = '',
            star = 0,
            bitStream = unicode.toString(2), // 转换为二进制比特流
            bitLen = bitStream.length,
            i;
        if( unicode >= 0x000000 && unicode <= 0x00007F ){
            binary = bitStream;
            for( i = 0 , len = 8 ; i　< len-bitLen ; i ++ ){
                binary = 0 +binary; // 不足8位补0
            }
        }else if( unicode >=0x000080 && unicode <=0x0007FF ){
            binary = bitStream;
            for( i = 0 , len = 11 ; i　< len-bitLen ; i ++ ){
                binary = 0 +binary; // 不足11位补0
            }
            binary = '110'+binary.substr(0,5) + '10' + binary.substr(5,6);
        }
        else if( unicode >=0x000800 && unicode <=0x00FFFF ){
            binary = bitStream;
            for( i = 0 , len = 16 ; i　< len-bitLen ; i ++ ){
                binary = 0 +binary; // 不足16位补0
            };
            binary = '1110' + 
                     binary.substr(0,4) + 
                     '10' + 
                     binary.substr(4,6) + 
                     '10' + 
                     binary.substr(10,6);
        }
        else if( unicode >=0x010000 && unicode <=0x10FFFF ){
            binary = bitStream;
            for( i = 0 , len = 21 ; i　< len-bitLen ; i ++ ){
                binary = 0 +binary; // 不足21位补0
            }
            binary = '11110' + 
                     binary.substr(0,3) + 
                     '10' + 
                     binary.substr(3,6) + 
                     '10' + 
                     binary.substr(9,6) +
                     '10' + 
                     binary.substr(15,6);
        }
        return binary;
    }
    // 编码成base64格式
    function base64Parse(binary24,flag){
        var i,
            len,
            result = '',
            decode;
        if(flag == 1){
            for( i = 0 ; i < 4 ; i++){
                decode = parseInt(binary24.substr(i*6,6),2);
                result = result + _table[decode];
            }
        }
        else{
            for ( i=0 , len = Math.floor(flag/6) ;i<len+1; i++){
                decode = parseInt(binary24.substr(i*6,6),2);
                result = result + _table[decode];
            }
            for( i = 0; i < 3-len ;i ++){
                result = result + '=';
            }
        }
        return result;
    }
    
    function arrToBs64(arr_) {
        var codes = [];
        var un = 0;
        un = arr_.length % 3;
        if (un == 1)
            arr_.push(0, 0);
        else if (un == 2)
            arr_.push(0);
        for (var i = 2; i < arr_.length; i += 3) {
            var c = arr_[i - 2] << 16;
            c |= arr_[i - 1] << 8;
            c |= arr_[i];
            codes.push(_table[c >> 18 & 0x3f]);
            codes.push(_table[c >> 12 & 0x3f]);
            codes.push(_table[c >> 6 & 0x3f]);
            codes.push(_table[c & 0x3f]);
        }
        if (un >= 1) {
            codes[codes.length - 1] = "=";
            arr_.pop();
        }
        if (un == 1) {
            codes[codes.length - 2] = "=";
            arr_.pop();
        }
        var ret = codes.join("");
        return ret;
    }
    
    function arrayToBase64(arry) {//作用同上  arr to bs64
	    var binary = '';
	    var bytes = new Uint8Array( arry );
	    var len = bytes.byteLength;
	    for (var i = 0; i < len; i++) {
	        binary += String.fromCharCode( bytes[ i ] );
	    }
	    return window.btoa( binary );
	}
    
    // str编码为base64格式的二进制数据
    //function codeBase64(str){
     function strToBs64(str) {
        var i,
            len,
            rem,
            mer,
            result = '',
            strBinaryAry = [],
            binary = stringToBinary(str , 8 , 'utf-8'); // base64是基于utf-8格式保存的二进制数据转换的
        len = binary.length;
        mer = Math.floor(len / 24);
        rem = len % 24;
        for( i = 0 ; i < mer ; i++){
            result = result +  base64Parse(binary.substr(i*24,24),1);
        }
        remCode = binary.substr(len-rem,rem);
        if( rem > 0 ){
            for( i =0 ; i < 24-rem ; i++){
                remCode = remCode + 0;
            }
            result = result +  base64Parse(remCode,rem)
        }
        return result;

    }
     
     // 解码base64格式的数据为str
    function decodeBase64(str){
        var i,
            j,
            k,
            len,
            t = 0,
            curbinary,
            start  = 0 ,
            flag = [
                {
                    str:'0',
                    len:8
                },
                {
                    str:'110',
                    len:11
                },
                {
                    str:'1110',
                    len:16
                },
                {
                    str:'11110',
                    len:21
                }],
            binary= '',
            newStr = '';
        for( i = 0 , len = str.length ; i < len ; i++){
            var curbinary  = _table.indexOf(str.charAt(i)).toString(2);
            if( curbinary != '-1'){

                for( j = 0 ; curbinary.length <6 ; j++){
                    curbinary = 0 + curbinary;
                }
                binary = binary + curbinary;
            }
            if( i >= len-2 && str.charAt(i) == '='){
                ++t;
            }
        }
        if( t == 0 ){
            len = binary.length;
        }
        else{
            len = binary.length - (6-2*t)
        }

        for( ; start < len ;){
            for( j  = 0 ; j < 4 ; j++){

                if(binary.indexOf( flag[j].str ,start) == start){
                    if(flag[j].len == 8){
                        newStr = newStr +  String.fromCharCode(parseInt(binary.substr(start,8),2));
                    }
                    else if(flag[j].len == 11){
                        newStr = newStr + 
                                 String.fromCharCode(parsetInt(binary.substr(start+3,5) + 
                                 binary.substr(start+10,6),2));
                    }
                    else if(flag[j].len == 16){
                        newStr = newStr + 
                                 String.fromCharCode(parsetInt(binary.substr(start+4,4) + 
                                 binary.substr(start+10,6) + 
                                 binary.substr(start+18,6),2));
                    }
                    else if(flag[j].len == 21){
                        newStr = newStr + 
                                 String.fromCharCode(parseInt(binary.substr(start+5,3) + 
                                 binary.substr(start+10,6) + binary.substr(start+18,6) +
                                 binary.substr(start+26,6),2));
                    }
                    start  =  start  + flag[j].len;
                    break;
                }
            }
        }
        binary = null;
        return newStr;
    }
    
    function bs64ToArr(bs64str) {
        var i = 0;
        var bin = [];
        var x = 0, code = 0, eq = 0;
        while (i < bs64str.length) {
            var c = bs64str.charAt(i++);
            var idx = _table.indexOf(c);
            if (idx == -1) {
                switch (c) {
                    case '=': idx = 0; eq++; break;
                    case ' ':
                    case '\n':
                    case "\r":
                    case '\t':
                        continue;
                    default:
                        throw { "message": "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u65E0\u6548\u7F16\u7801\uFF1A" + c };
                }
            }
            if (eq > 0 && idx != 0)
                throw { "message": "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u683C\u5F0F\u9519\u8BEF\uFF01" };
  
            code = code << 6 | idx;
            if (++x != 4)
                continue;
            bin.push(code >> 16);
            bin.push(code >> 8 & 0xff);
            bin.push(code & 0xff)
            code = x = 0;
        }
        if (code != 0)
            throw { "message": "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u6570\u636E\u957F\u5EA6\u9519\u8BEF" };
        if (eq == 1)
            bin.pop();
        else if (eq == 2) {
            bin.pop();
            bin.pop();
        } else if (eq > 2)
            throw { "message": "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u683C\u5F0F\u9519\u8BEF\uFF01" };
  
        return bin;
    }
    
    return {
        encodeArr:function(arr_){//byte arr to bs64 
        	var ret = encodeArr(arr_);
            return ret;
        },
        encodeStr:function(str){//str to bs64
        	var ret = encodeStr(str);
            return ret;
        },
        decodeBs64:function(bs64str){//bs64 to byte arr
            return decodeBs64(bs64str);
        },
        bs64Tostr:function(bs64str){//bs64 to str
            return bs64Tostr(bs64str);
        }
    };

})();                                  