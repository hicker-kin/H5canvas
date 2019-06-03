//本文档为根据4.0已存在的C++特征数据结构体，重新设计类似数据格式，以便使用前端重写特征数据的相关编辑工作。

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
	var a=0;//细节角度【特征方向】
	var c=0;//1可信度【特征质量】
	var type=0;//1特征点类型或其它 保留
}
	
//===================人员=========================================================//

//指纹
var FINGER_MNTSTRUCT = function(){//只定义属性
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

//掌纹
var PALM_MNTSTRUCT = function(){


}


//==================================案件====================================//

//指纹
var LATFINGER_MNTSTRUCT = function(){
	var MntVersion = 0;    //  特征提取版本 A-自动提取 U-自动提取需要人工编辑  E-自动提取已经人工编辑 M-人工提取 O-其他 //  [Feng Jufu 7/18/2012]
    var width = 0;
    var height = 0;

    // 1-..弓形
    // 2-..左箕
    // 3-..右箕
    // 4-..斗
    // 5-..缺指   //  [Feng Jufu 7/18/2012]
    // 6-..未知   //  [Feng Jufu 7/18/2012]
    // 9-..其他   //  [Feng Jufu 7/18/2012]
    var RpCode = [];      //  候选纹型
    var position = [];    //  候选指位
    var region = 0;           //指纹遗留部位区域
    var quality = 0;          // 质量
    var minutiae_num = 0;     // 有效特征点数
    var fort = 0;    // 指纹方向-与指纹根基线垂直并指向指尖方向，坐标系同上  361-完全无法确定
    var cfort = 0;    // 指纹方向置信度(0-FINGER_CREDIT_MAX 0-完全无法确定 FINGER_CREDIT_MAX-确定)
    var dfort = 0;    //　估计指纹方向角度变化范围
    var whorltype = 0;
    var scar = 0;

    var cfc = 0;    //  中心置信度
    //	FINGER_CREDIT_MAX-可靠中心
    //	0 且cx>0 cy>0-估计中心
    //	其他-无中心
    var cfe = 0;    //	下中心置信度
    //	FINGER_CREDIT_MAX-可靠下中心
    //	0 且ex>0 ey>0-估计中心
    //	其他-无中心
    var cfl = 0;    //	左三角置信度
    //	FINGER_CREDIT_MAX-可靠左三角
    //	0 且ldx>0 ldy>0-虚拟左三角
    //	其他-无左三角
    var cfr = 0;    //	右三角置信度
    //	FINGER_CREDIT_MAX-可靠右三角
    //	0 且ldx>0 ldy>0-虚拟右三角
    //	其他-无右三角

    var cx = 0;     // 上中心
    var cy = 0;
    var ca = 0;
    var dcr = 0;    //  估计上中心区域半径
    var dca = 0;    //  估计上中心角度变化范围　
	
    var ex = 0;     //  下中心
    var ey = 0;
    var der = 0;    //  估计下中心区域半径

    var ldx = 0;    //  左三角
    var ldy = 0;
    var dlr = 0;    //  估计左三角区域半径

    var rdx = 0;    //  右三角
    var rdy = 0;
    var drr = 0;    //  估计右三角区域半径

    var valid = 0;

    //BIT256 global_mnt;  //256bit的向量，表示该捺印指纹

    var finger_minutia = new Array(FINGER_MINUTIA_NUM);// 类型是 FingerMinutia

    var impregionnum = 0;    //重要区域个数 
    
    //var impx = 0;
    //var impy = 0;  //重要区域位置
    //var impr = 0;  //重要区域半径
} 


//掌纹
var LATPALM_MNTSTRUCT = function(){


}






