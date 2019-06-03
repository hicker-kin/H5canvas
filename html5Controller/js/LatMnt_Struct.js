//现场手纹的特征结构
/*
    0┌───────→ X(COLUMN)
        │╲↙θ∈[0,359]
        │     ╲
        │         ╲
        │              ↘
	 ↓
     Y(ROW)
*/
//常量的定义   在未赋值但必须要存储时可以使用默认是常量值

/**
 *人员指掌纹【FINGER_MNTSTRUCT，PALM_MNTSTRUCT】、案件指掌纹【LAT_MNTSTRUCT】的特征数据构造函数
 * 
 */

//人
//var FINGER_TRI_LENGTH = 1652;//【捺印平面或者滚动指纹的特征数据长度】
//var PALM_TRI_LENGTH = 16198;//【全掌或者侧掌掌纹的特征数据长度】
//案
//var LAT_TRI_LENGTH = 16192;//【案件指、掌纹的特征数据长度】
var FINGER_MINUTIA_NUM = 200;
var FingerMinutia = function(){
	var x=0;// 			
	var y=0;//	
	var a=0;// 细节角度【特征方向】
	var c=0;//1 可信度【特征质量】
	var type=0;//1 特征点类型或其它 保留
}
	
//人员=====
var LAT_MNTSTRUCT = function(){//只定义属性
	//console.log("被调用了");
	var MntVersion=0;		//0 特征提取版本 0-人工提取
	var width_2=0;			//2-4 0-缺指
	var height_2=0;			//4-6 0-缺指
	var tcd = new Array(10);//6-16 十指联指纹型
	var f_position=0;		//16-17 指位 1-10，0-未知
	var region = 0;			//指纹区域
	var quality = 0;    	//质量
	var minutiae_num = 0; 	//特征点有效数
	
	var fort_2 = 0;			//20-22指纹方向-与指纹根基线垂直并指向指尖方向
	var cfort = 0;			//22指纹方向置信度
	var cfrp = 0;			//23纹型置信度
	var cfrp0 = 0;			//24副纹型置信度
	var cfc = 0;			//25中心置信度
	var cfe = 0;			//26下中心置信度
	var cfl = 0;			//27左三角置信度
	var cfr = 0;			//28右三角置信度
/* 纹型, ridge pattern , can be the following values:
	MNTRP_UNDET, MNTRP_ARCH, MNTRP_LEFTLOOP, MNTRP_RIGHTLOOP, MNTRP_WHORL.
*/
	var rp = 0;				//29指纹纹型
	var whorltype = 0;		//30斗型纹旋转方向
	var rp0	= 0;			//31副纹型
	var whorltype0 = 0;		//32副纹型旋转方向
	var scar = 0;			//33伤疤
	// 0-不定
	// 1-有伤疤
	// 2-无伤疤
	var cx_2 = 0;				//34上中心
	var cy_2 = 0;				
	var ca_2 = 0;				//指纹中心点_特征方向
	var ex_2 = 0;				//下中心【副中心】
	var ey_2 = 0;				//上中心
	var	ldx_2 = 0;				//44  左三角
	var	ldy_2 = 0;
	var	rdx_2 = 0;				//48  右三角
	var	rdy_2 = 0;       		 //50-52
	var fingerMinutiaArr = new Array(FINGER_MINUTIA_NUM);
}

//人员掌纹
var PALM_MNTSTRUCT = function(){


}



//案件指掌纹
var PALM_MNTSTRUCT = function(type){// 0 指纹    1掌纹


}