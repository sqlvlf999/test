
//一些默认值
if (!window.SinaEditor) {
    SinaEditor = {};
}

SinaEditor.version = 1.0;

if (!SinaEditor.CONF) {
    SinaEditor.CONF = {};
}

//撤销重做的次数
SinaEditor.CONF.redoConf = 100;

//弹出的浮层按钮样式(style)
SinaEditor.CONF.bubbleStyles = ['.se_bubble {',
	'background-color:#E0ECFF;',
	'font-family:Arial,sans-serif,sans;',
	'font-size:13px;',
	'position:absolute;',
	'border:1px solid #99C0FF;',
	'padding:3px;',
	'z-index:1000;',
	'-moz-border-radius: 5px;',
	'-khtml-border-radius: 5px;',
	'-webkit-border-radius: 5px;',
	'border-radius: 5px;',
'}'].join('');
SinaEditor.CONF.bubbleClassName = 'se_bubble';

//需要在这里指明路径,下面的两句就可以不要了。
var href = window.location.href;
var loc = href.substring(0,href.lastIndexOf('/'));
SinaEditor.CONF.STYLELOC = loc+'/style/';
SinaEditor.CONF.transparentIMG = SinaEditor.CONF.STYLELOC+"imgs/SG_line.gif";
SinaEditor.CONF.fakeFLASH = SinaEditor.CONF.STYLELOC+"imgs/fake_flash.png";

//链接点击后弹出的URL
SinaEditor.CONF.aBubbleTemplete = ['<div class="se_bubble_a_panel">',
									'<div>',
										'<div>',
											'<span>转到链接：</span>',
											'<span style="color: black;">',
												'<a class="se_bubble_a_link" href="#{src}" target="_blank">',
													'#{srcstr}',
												'</a>',
											'</span>',
											'<span>',
												'&nbsp;&nbsp;',
												'<span class="se_bubble_a_link" id="#{modifyid}">更改</span>',
											'</span>',
											'<span>',
												'&nbsp;&nbsp;',
												'<span class="se_bubble_a_link" id="#{deleteid}">删除</span>',
											'</span>',
										'</div>',
									'</div>',
								'</div>'].join('');
SinaEditor.CONF.mailBubbleTemplete = ['<div class="se_bubble_a_panel">',
									'<div>',
										'<div>',
											'<span id="tr_link-text" style="color: black;">',
												'#{srcstr}',
											'</span>',
											'<span>',
												'&nbsp;&nbsp;',
												'<span class="se_bubble_a_link" id="#{modifyid}">更改</span>',
											'</span>',
											'<span>',
												'&nbsp;&nbsp;',
												'<span class="se_bubble_a_link" id="#{deleteid}">删除</span>',
											'</span>',
										'</div>',
									'</div>',
								'</div>'].join('');
SinaEditor.CONF.imgBubbleTemplete = ['<div class="se_bubble_a_panel">',
									'<div>',
										'<div>',
											'<span>',
												'<span class="se_bubble_a_link" id="#{modifyid}">更改图片</span>',
											'</span>',
											'<span>',
												'&nbsp;&nbsp;',
												'<span class="se_bubble_a_link" id="#{deleteid}">删除图片</span>',
											'</span>',
										'</div>',
									'</div>',
								'</div>'].join('');
SinaEditor.CONF.flashBubbleTemplete = ['<div class="se_bubble_a_panel">',
									'<div>',
										'<div style="float:left;">',
											'<span>',
												'<span class="se_bubble_a_link" id="#{seeid}">查看影片&nbsp;-&nbsp;</span>',
											'</span>',
											'<span>',
												'<span class="se_bubble_a_link" id="#{deleteid}">删除影片</span>',
											'</span>',
											'<div style="border:1px solid;display:none;" id="#{showflash}"></div>',
										'</div>',
										'<img id="#{closeid}" src="',SinaEditor.CONF.STYLELOC,'imgs/bubble_closebox.gif" style="padding:3px;float:left;">',
									'</div>',
								'</div>'].join('');

//拖放大小的CSS样式

//链接点击的样式
SinaEditor.CONF.aBubbleStyles = ['.se_bubble_a_panel{',
'}',
'.se_bubble_a_link{',
	'color:#0000CC;',
	'cursor:pointer;',
	'font-size:100%;',
'}'].join('');

if (!SinaEditor.STATE) {
    SinaEditor.STATE = {};
}

//编辑器的当前状态
SinaEditor.STATE.CREATING = 1;
SinaEditor.STATE.CREATED = 2;
SinaEditor.STATE.EDITING = 3;
SinaEditor.STATE.SHOWSOURCE = 4;


//节点的类型
if (!SinaEditor.NODETYPE) {
    SinaEditor.NODETYPE = {};
}
SinaEditor.NODETYPE.ELEMENT = 1;
SinaEditor.NODETYPE.TEXT = 3;
//CTRL+A：就造就了选中body的情况。
SinaEditor.NODETYPE.HTMLELEMENT = 9;


//鼠标点击事件
if (!SinaEditor.MOUSEKEY) {
    SinaEditor.MOUSEKEY = {};
}

SinaEditor.MOUSEKEY.LEFT = 1;
SinaEditor.MOUSEKEY.MID = 2;
SinaEditor.MOUSEKEY.RIGHT = 3;

//按钮的状态
if (!SinaEditor.BUTTONSTATE) {
    SinaEditor.BUTTONSTATE = {};
}
SinaEditor.BUTTONSTATE.NORMAL = 1;
SinaEditor.BUTTONSTATE.DISABLED = 2;
SinaEditor.BUTTONSTATE.CLICKED = 3;

//按钮响应的事件
if (!SinaEditor.BUTTON) {
    SinaEditor.BUTTON = {};
}

//默认的事件触发方式
SinaEditor.BUTTON['default'] = function(btn) {
	switch(this.getState()) {
		case SinaEditor.STATE.CREATING :
			btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
			break;
		case SinaEditor.STATE.EDITING :
			btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
			break;
		case SinaEditor.STATE.SHOWSOURCE :
			btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
			break;
		default :
			btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
	}
};

//一些Range要使用的定义
if (!SinaEditor.RANGE) {
    SinaEditor.RANGE = {};
}

//
SinaEditor.RANGE.BLOCKTAGS = {
    "DIV": "1",
    "P": "1",
    "TD": "1",
    "LI": "1",
    "OL": "1",
    "NOBR": "1",
	"BODY" : "1"
};

SinaEditor.RANGE.STYLEOBJECTELEMENTS = {
	"IMG":1,
	"HR":1,
	"LI":1,
	"TABLE":1,
	"TR":1,
	"TD":1,
	"TH":1,
	"EMBED":1,
	"OBJECT":1,
	"OL":1,
	"UL":1,
	"A":1,
	"INPUT":1,
	"FORM":1,
	"SELECT":1,
	"TEXTAREA":1,
	"BUTTON":1,
	"FIELDSET":1,
	"THREAD":1,
	"TFOOT":1
};

//range遍历时要跳过的节点
SinaEditor.RANGE.SKIPTAGS = {
    "IMG": "1",
    "BR": "1",
    "TABLE": "1",
    "CAPTION": "1",
    "COL": "1",
    "COLGROUP": "1",
    "TBODY": "1",
    "TFOOT": "1",
    "TH": "1",
    "THREAD": "1",
    "TR": "1",
    "UL": "1"
};

/*
 * Anything whose display computed style is block, list-item, table,
 * table-row-group, table-header-group, table-footer-group, table-row,
 * table-column-group, table-column, table-cell, table-caption, or whose node
 * name is hr, br (when enterMode is br only) is a block boundary.
 */
SinaEditor.RANGE.blockBoundaryDisplayMatch = {
	'block' : 1,
	'list-item' : 1,
	'table' : 1,
	'table-row-group' : 1,
	'table-header-group' : 1,
	'table-footer-group' : 1,
	'table-row' : 1,
	'table-column-group' : 1,
	'table-column' : 1,
	'table-cell' : 1,
	'table-caption' : 1
};

//一些工具的默认配置
if (!SinaEditor.TOOLCONF) {
    SinaEditor.TOOLCONF = {};
}

SinaEditor.TOOLCONF.COLOR = {
	'000000' : '黑',
	'800000' : '褐红',
	'8B4513' : '深褐',
	'2F4F4F' : '墨绿',
	'008080' : '绿松石',
	'000080' : '海军蓝',
	'4B0082' : '靛蓝',
	'696969' : '暗灰',
	'B22222' : '砖红',
	'A52A2A' : '褐',
	'DAA520' : '金黄',
	'006400' : '深绿',
	'40E0D0' : '蓝绿',
	'0000CD' : '中蓝',
	'800080' : '紫',
	'808080' : '灰',
	'F00' : '红',
	'FF8C00' : '深橙',
	'FFD700' : '金',
	'008000' : '绿',
	'0FF' : '青',
	'00F' : '蓝',
	'EE82EE' : '紫罗兰',
	'A9A9A9' : '深灰',
	'FFA07A' : '亮橙',
	'FFA500' : '橙',
	'FFFF00' : '黄',
	'00FF00' : '水绿',
	'AFEEEE' : '粉蓝',
	'ADD8E6' : '亮蓝',
	'DDA0DD' : '梅红',
	'D3D3D3' : '淡灰',
	'FFF0F5' : '淡紫红',
	'FAEBD7' : '古董白',
	'FFFFE0' : '淡黄',
	'F0FFF0' : '蜜白',
	'F0FFFF' : '天蓝',
	'F0F8FF' : '淡蓝',
	'E6E6FA' : '淡紫',
	'FFF' : '白'
};

//配置字体的样式
SinaEditor.TOOLCONF.FONTFAMILYDEF = '字体';
SinaEditor.TOOLCONF.FONTFAMILYCONF = [{
    'html': '宋体'
}, {
    'html': '黑体'
}, {
    'html': '隶书'
}, {
    'html': '楷体',
    'style': '楷体_GB2312,楷体'
}, {
    'html': '幼圆'
}, {
    'html': 'Arial'
}, {
    'html': 'Impact'
}, {
    'html': 'Georgia'
}, {
    'html': 'Verdana'
}, {
    'html': 'Courier New'
}, {
    'html': 'Times New Roman'
}];

//配置字体的大小
SinaEditor.TOOLCONF.FONTSIZEDEF = '字号';
SinaEditor.TOOLCONF.FONTSIZECONF = [{
    'html': '10px'
}, {
    'html': '12px'
}, {
    'html': '14px'
}, {
    'html': '16px'
}, {
    'html': '18px'
}, {
    'html': '20px'
}, {
    'html': '22px'
}, {
    'html': '24px'
}, {
    'html': '32px'
}, {
    'html': '56px'
}];

//链接的弹出浮层
SinaEditor.TOOLCONF.linkTemplate = ['<div class="linkItemContent">',
	'<div class="row1" id="#{hidden}" style="display:none">文字:',
		'<input class="fm1" id="#{text}">',
	'</div>',
	'<div class="row2">链接:',
		'<input value="http://" class="fm1" id="#{link}">',
	'</div>',
	'<div class="row3">',
		'<a onclick="return false" id="#{ok}" href="#" class="SG_aBtn SG_aBtnB"><cite>确定</cite></a>',
		'<a onclick="return false" id="#{cancel}" href="#" class="SG_aBtn SG_aBtnB"><cite>取消</cite></a>',
	'</div>',
'</div>'].join('');

//符合要求可直接添加进链接
SinaEditor.TOOLCONF.addLinkNow = /.*(http|ftp|https|mailto)\:\/\/.*/i;

//上传图片的类型
SinaEditor.TOOLCONF.imgType = /.*\.(gif|bmp|png|jpg)$/i;
//类型错误的MSG
SinaEditor.TOOLCONF.imgErrTypeMSG = '上传类型仅仅支持gif,bmp,png,jpg';

//图片上传的浮层
SinaEditor.TOOLCONF.imgTemplate = ['<div class="insetPhotoContent insetPhotoContent_l">',
	'<div id="headerTab" class="headerTab">',
	'<h4>图片来源：</h4>',
	'<ul><li class="cur" id="#{tabMy}"><a href="#" onclick="return false;">我的电脑</a></li><li id="#{tabWeb}" class=""><a href="#" onclick="return false;">网上图片</a></li></ul></div>',
	'<div style="display:none" id="#{errTips}" class="errTips"></div>',
	'<!--出错提示-->',
	'<div id="#{useClient}" class="urlPath">',
		'<div id="#{clientView}">',
			'<span>选择本地图片：</span>',
			'<div id="#{clientUploadDiv}" class="clientUploadDiv" >',
				'<iframe id="#{clientIframe}" name="#{clientIframe}" style="display:none" ></iframe>',
				//TODO 这里需要配置上传的地址。
				'<form target="#{clientIframe}" id="#{clientForm}" action="postImg.php" method="POST" enctype="multipart/form-data">',
					'<input type="file" name="imgFile" class="imgFile" id="#{clientFile}">',
					'<textarea name="imgValue" style="display:none" id="#{clientFileDrag}"></textarea>',
				'</form>',
				'<div>点击这里选择文件。请配置上传地址，否则上传会失败。<span id="#{clientMoreUp}" style="display:none;">你也可以拖拽上传</span></div>',
			'</div>',
		'</div>',
		'<div id="#{contentLoading}" style="display:none">',
			'<div class="loading"></div>',
			'<a class="SG_aBtn SG_aBtnB SG_aBtn_sub" href="#" onclick="return false;">',
				'<cite id="#{cancleClient}">取消上传</cite>',
			'</a>',
		'</div>',
		'<div id="#{clientResult}" style="display:none">',
			'<div class="clientImg">',
				'<img id="#{resultPic}">',
			'</div>',
			'<a class="SG_aBtn SG_aBtnB SG_aBtn_sub" href="#" onclick="return false;">',
				'<cite id="#{addClientPic}">添加</cite>',
			'</a>',
			'<a class="SG_aBtn SG_aBtnB SG_aBtn_sub" href="#" onclick="return false;">',
				'<cite id="#{resetClient}">重新上传</cite>',
			'</a>',
		'</div>',
	'</div>',
	'<div style="display: none;" id="#{webContent}" class="urlPath">',
		'<div>',
			'<span>输入图片地址：</span>',
			'<input type="text" class="fmTxt" value="http://" id="#{webUrl}" maxlength="400">',
			'<a id="#{webAdd}" style="display:none;" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;">',
				'<cite>添加</cite>',
			'</a>',
		'</div>',
		'<div class="webImg" style="display:none;">',
			'<img id="#{webPic}">',
		'</div>',
		'<div id="#{webPicLoading}" class="webImgLoad" style="display:none;"></div>',
	'</div>',
'</div>'].join('');

SinaEditor.TOOLCONF.flashTemplate = ['<div class="linkItemContent">',
	'<div class="row1">HTML代码:',
		'<input class="fm1" style="width:100%;margin-top:3px" id="#{flashSrc}">',
	'</div>',
	'<div class="row1">',
		'<span style="color:red;display:none" id="#{flashErrTip}">*请输入flash代码</span>',
	'</div>',
	'<div class="row3">',
		'<a onclick="return false" href="#" class="SG_aBtn SG_aBtnB"><cite id="#{ok}">确定</cite></a>',
		'<a onclick="return false" href="#" class="SG_aBtn SG_aBtnB"><cite id="#{cancel}">取消</cite></a>',
	'</div>',
'</div>'].join('');

SinaEditor.TOOLCONF.tableTemplate = ['<div id="#{panel}" class="se_tab_tableContent">',
	'<div id="#{eventContent}" class="se_tab_eventContent">',
		'<div style="width: 100%; height: 100%;">',
			'<div class="se_tab_mainContent"></div>',
			'<div id="#{baseContent}" class="se_tab_baseContent"></div>',
			'<div id="#{chooseContent}" class="se_tab_chooseContent"></div>',
		'</div>',
	'</div>',
	'<div class="num" id="#{tabNums}"> 0 x 0 </div>',
'</div>'].join('');

SinaEditor.TOOLCONF.faceTemplate = '<div class="se_face_bubble" id="#{panel}"></div>';

// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==

SinaEditor.TOOLCONF.faceSrc = [
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7400ZH00SIGG.gif' , 'title':'左哼哼'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7401ZH00SIGG.gif' , 'title': '右哼哼'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7402ZH00SIGG.gif' },
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7403ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7404ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7405ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7406ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7407ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7408ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7409ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7410ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7411ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7412ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7413ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7414ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7415ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7416ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7417ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7418ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7419ZH00SIGG.gif'},
	{'src':'http://www.sinaimg.cn/uc/myshow/blog/misc/gif/E___7420ZH00SIGG.gif'}
];

//历史数据编辑
//最多保存多少历史数据
SinaEditor.TOOLCONF.historyMax = 5;
SinaEditor.TOOLCONF.historyTemplate = '<div class="se_history_bubble" id="#{panel}"></div>';

if (!window.console) {
    console = {};
    console.log = function(){};
}

if(!window.SinaEditor) {
	SinaEditor = {};
}

if(!SinaEditor.env) {
	/**
	 * 对浏览器的检测和系统的检测
	 * @namespace
	 */
	SinaEditor.env = {};
}

//当前浏览器检测
(function(ns){
	var _ua = navigator.userAgent.toLowerCase();
	/**
	 * IE系列浏览器，并返回版本号
	 * @name SinaEditor.env.$IE
	 */
	var ieArr = /msie (\d+)\./.exec(_ua) || [];
	ns.$IE = ieArr[1];
	/**
	 * opear系列浏览器
	 * @name SinaEditor.env.$OPERA
	 */
	ns.$OPERA = /opera/.test(_ua);
	/**
	 * 使用gecko引擎的浏览器 
	 * @name SinaEditor.env.$GENKO
	 */
	ns.$GENKO = /gecko\//.test(_ua);
	/**
	 * 使用webkit引擎的浏览器 
	 * @name SinaEditor.env.$WEBKIT
	 */
	ns.$WEBKIT = /applewebkit/.test(_ua);
	/**
	 * IE6浏览器
	 * @name SinaEditor.env.$IE6
	 */
	ns.$IE6 = /msie 6/.test(_ua);
	/**
	 * IE7浏览器
	 * @name SinaEditor.env.$IE6
	 */
	ns.$IE7 = /msie 7/.test(_ua);
	/**
	 * IE8浏览器
	 * @name SinaEditor.env.$IE8
	 */
	ns.$IE8 = /msie 8/.test(_ua);
	/**
	 * IE9浏览器
	 * @name SinaEditor.env.$IE8
	 */
	ns.$IE9 = /msie 9/.test(_ua);
	/**
	 * XP系统
	 * @name SinaEditor.env.$winXP
	 */
	ns.$winXP=/windows nt 5.1/.test(_ua);
	/**
	 * vista 操作系统
	 * @name SinaEditor.env.$winVista
	 */
	ns.$winVista=/windows nt 6.0/.test(_ua);
	/**
	 * firefox系列浏览器
	 * @name SinaEditor.env.$FF
	 */
	ns.$FF = /firefox/i.test(_ua);
	/**
	 * chrome浏览器
	 * @name SinaEditor.env.$CHROME
	 */
	ns.$CHROME = /chrome\//i.test(_ua);
	/**
	 * safari浏览器
	 * @name SinaEditor.env.$SAFARI
	 */
	ns.$SAFARI = /safari/.test(_ua) && !ns.$CHROME;
	/**
	 * 腾讯TT浏览器
	 * @name SinaEditor.env.$TT
	 */
	ns.$TT=/tencenttraveler/.test(_ua);
	/**
	 * 360浏览器
	 * @name SinaEditor.env.$360
	 */
	ns.$360=/360se/.test(_ua);
	/**
	 * 遨游浏览器
	 * @name SinaEditor.env.$Maxthon
	 */
	ns.$Maxthon=false;
	try{
		var t=window.external;
		ns.$Maxthon=t.max_version?true:false;
	}catch(e){}
	/**
	 * 当前的域和当前的host是否相同，依此来决定是否需要为iframe设置domain
	 * @name SinaEditor.env.isCustomDomain
	 */
	ns.isCustomDomain = (function(){
		var domain = document.domain,
			hostname = window.location.hostname;

		return this.ie &&
			domain !== hostname &&
			domain !== ( '[' + hostname + ']' );
	}());
}(SinaEditor.env));
if(!window.SinaEditor) {
	SinaEditor = {};
}

/**
 * 事件的常用函数封装
 * @namespace
 */
SinaEditor.ev = {};

(function(ns){
	/**
	 * 自定义事件的列表
	 */
	var _customEventList = {};
	//window._customEventList = {};
	//自定义事件，公开,由editor初始化自己的事件机制，可以加载或者不加载
	ns.customEvent = {};
	
	/**
	 * 存储绑定事件的DOM节点和它的唯一ID，如果有的话。
	 * 形式：{唯一ID:DOM节点}
	 */
	var _domReferObj = {};
	
	/**
	 * 存储所有的事件的对象，结合_domReferObj来使用
	 * 形如：{唯一ID:{事件类型:[事件数组({id:唯一标识，func:执行函数})]}}
	 */
	var _eventsFunc = {};
	
	/**
	 * 存储所有的代理事件，使用addEvent，事件全部绑定在这里面
	 * 形如：{唯一ID:{代理的function}}
	 */
	var _proxyFuncs = {};
	
	/**
	 * 代理的事件函数,生成的函数处理所有的事件类型
	 * @param {String} uid 唯一的ID
	 * @param {Object} content 回调函数执行的上下文对象
	 * @param {Array} opt_args 可选参数，回调函数中的初始参数。
	 */
	var _getProxyFunc = function(uid,content,opt_args) {
		var funcs = _eventsFunc[uid];
		return function(e,args) {
			var funcArr = funcs[e.type] || [];
			var i=0;
			args = args || opt_args;
			args.unshift(ns.fixEvent(e));
			for(i=0; funcArr[i]; i++) {
				funcArr[i].func.apply(content, args);
			}
			args.pop();
		};
	};
	
	var _clearEvent = function(elm,type,fHandler,opt) {
		//原生事件
		if(_customEventList[type]) {
			return;
		}
		if(elm.removeEventListener) {
			elm.removeEventListener(type, fHandler ,false);
		} else if(elm.detachEvent) {
			elm.detachEvent('on'+type, fHandler ,false);
		} else {
			elm['on'+type] = null;
		}
	};
	
	/**
	 * 通过传递过来的DOM节点获取唯一ID
	 * @param {Object} elm 传递的DOM节点
	 * @return {String} 唯一ID，如果没有这个ID，将会返回null
	 */
	var _getUidByDom = function(elm) {
		var uid = null;
		for(uid in _domReferObj) {
			if(_domReferObj[uid] === elm) {
				return uid;
			}
		}
		return null;
	};
	
	/**
	 * 统一event事件，让众多浏览器返回的差异值基本保持一致。
	 * @function
	 * @name SinaEditor.ev.fixEvent
	 * @param {Object} e 事件的参数
	 * @return {Object} 修正后的事件
	 */
	ns.fixEvent = function(e) {
		if (!e.target) {
			try {
				//FIREFOX2.0不吃这一套啊，有木有！
				e.target = e.srcElement;
				//mouse事件的统一
				if(e.button) {
					switch(e.button) {
						case 1 :
							e.which = SinaEditor.MOUSEKEY.LEFT;
							break;
						case 4 :
							e.which = SinaEditor.MOUSEKEY.MID;
							break;
						case 2 :
							e.which = SinaEditor.MOUSEKEY.RIGHT;
							break;
					}
				}
			} catch(e){}
			e.pageX = e.x;
			e.pageY = e.y;
		}
		if (typeof e.layerX === 'undefined') {
			e.layerX = e.offsetX;
		}
		if (typeof e.layerY === 'undefined') {
			e.layerY = e.offsetY;
		}
		return e;
	};
	
	/**
	 * 停止事件冒泡和默认行为
	 * @function
	 * @name SinaEditor.ev.stopEvent
	 * @param {Object} ev 事件参数
	 */
	ns.stopEvent = function(ev){
		ev.preventDefault();
		ev.stopPropagation();
    };
	if (SinaEditor.env.$IE < 9) {
		ns.stopEvent = function(ev){
			ev.cancelBubble = true;
			ev.returnValue = false;
		};
	}
	
	/**
	 * 兼容的添加事件的方法。
	 * @function
	 * @name SinaEditor.ev.add
	 * @param {Object} elm 事件对象
	 * @param {Object} type 事件类型
	 * @param {Object} func 回调函数
	 * @param {Object} opt 可选参数 {once:true|false 是否只绑定一次(默认为false),content:执行环境,args:回调函数中的参数}
	 * @return {Integer} 当且仅当opt.once为true,且已经绑定依此后，返回-1。<br>
	 * 其它情况返回一个唯一正整数，可以通过此正整数删除匿名函数绑定的事件。
	 */
	ns.add = function(elm, type, func,opt) {
		//console.log('添加事件：'+type);
		opt = opt || {};
		opt.content = opt.content || elm;
		var uid =  _getUidByDom(elm);
		if(!uid) {
			uid = SinaEditor.util.uniqueKey();
			_domReferObj[uid] = elm;
			_eventsFunc[uid] = {};
		}
		
		var funcObj = _eventsFunc[uid];
			
		if(!funcObj[type]) {
			funcObj[type] = [];
			
			opt.args = opt.args || [];
			if(Object.prototype.toString.apply(opt.args) !== '[object Array]') {
				throw new Exception('opt.args 必须是数组');
			}
			_proxyFuncs[uid] = _getProxyFunc(uid,opt.content,opt.args);
			
			if(!_customEventList[type]) {
				//原生事件
				if(elm.addEventListener) {
					elm.addEventListener(type, _proxyFuncs[uid] ,false);
				} else if(elm.attachEvent) {
					elm.attachEvent('on'+type, _proxyFuncs[uid] ,false);
				} else {
					elm['on'+type] = _proxyFuncs[uid];
				}
			}
		}
		
		if(funcObj[type].length && opt.once) {
			return -1;
		}
		
		var eventId = SinaEditor.util.uniqueKey();
		funcObj[type].push({'func':func,'id':eventId});
		return eventId;
	};
	
	/**
	 * 移除事件
	 * @function
	 * @name SinaEditor.ev.remove
	 * @param {Object} elm 事件对象
	 * @param {Object} type 事件类型
	 * @param {Object|Integer} func 要移除回调函数。<br>
	 * 如果是使用{@link SinaEditor.ev.add}添加事件，可以传递此方法返回的ID进行删除。<br>
	 * 如果没有传递此参数或者传递为null，则清除通过{@link SinaEditor.ev.add}绑定在此节点的事件。
	 * @param {Object} opt 可选参数
	 */
	ns.remove = function(elm,type,fHandler,opt) {
		//console.log('清理事件：'+type);
		var uid =  _getUidByDom(elm);
		if(!uid) {
			//console.log('没有对应点：'+type);
			return;
		}
		
		var funcObj = _eventsFunc[uid];
		if(!fHandler) {
			//console.log('完全清理:'+type)
			delete funcObj[type];
			_clearEvent(elm,type,fHandler,opt);
			return;
		}
		var events = funcObj[type];
		
		if(events) {
			var val = typeof fHandler === 'function' ? 'func' : 'id';
			var i;
			for(i=0; events[i]; i++) {
				if(events[i][val] === fHandler) {
					funcObj[type].splice(i,1);
					break;
				}
			}
			
			//console.log('清理事件,剩下：'+funcObj[type].length);
			
			if(SinaEditor.util.isEmptyObject(funcObj[type])) {
				//console.log('完全清理:'+type)
				delete funcObj[type];
				_clearEvent(elm,type,fHandler,opt);
			}
		}

	};
	
	/**
	 * 执行事件
	 * @function
	 * @name SinaEditor.ev.fire
	 * @param {Object} elm 事件对象,自定义事件
	 * @param {Object} type 事件类型
	 * @param {Object} opt 可选参数，针对的是自定义事件。
	 */
	ns.fire = function(elm,type,opt) {
		//console.log('执行事件：'+type);
		if(_customEventList[type]) {
			//默认事件的触发
			opt = opt || {};
			var uid = _getUidByDom(elm);
			if(uid) {
				_proxyFuncs[uid]({'type':type},opt.args);
			}
		} else {
			//原生事件的触发
			if(elm.fireEvent) {
				elm.fireEvent('on' + type);  
			}
			else{
				var evt = elm.ownerDocument.createEvent('HTMLEvents');  
				evt.initEvent(type,true,true);  
				elm.dispatchEvent(evt);
			}
		}
	};
	/*
	[{
	    'enty' : document,
		'events' : {
			'keydown': function(e){}
		} 
	}]
	*/
	
	/**
	 * 注册自定义的事件
	 * @function
	 * @name SinaEditor.ev.fire
	 * @param {String} eventName 要注册的自定义事件名称。
	 * @param {Object} editor 要注册事件绑定的编辑器对象。
	 */
	ns.$regEvent = function(eventName,editor) {
		var whenTigger,eObj,events,i,ev;
		//console.log("装载:"+eventName);
		
		if(ns.customEvent[eventName]) {
			if(!_customEventList[eventName]) {
				_customEventList[eventName] = {};
			}
			if(!_customEventList[eventName][editor.option.id]) {
				_customEventList[eventName][editor.option.id] = [];
			}
			var uid = SinaEditor.util.uniqueKey();
		} else {
			//console.log('自定义事件:'+eventName+"没有找到");
			return;
		}
		whenTigger = ns.customEvent[eventName](editor);
		if(!whenTigger) {
			return;
		}
		for(i=0; whenTigger[i]; i++) {
			eObj = whenTigger[i];
			events = eObj.events;
			for(ev in events) {
				if(events.hasOwnProperty(ev)) {
					ns.add(eObj.enty , ev , events[ev]);
				}
			}
		}
	};
	
	
}(SinaEditor.ev));

if (!window.SinaEditor) {
    SinaEditor = {};
}

/**
 * @fileoverview 类和接口的定义
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-14
 * @example
 *
 * 类定义
 * var SuperClass=function(name){
 this.name=name;
 this.list=["a","b"];
 }.$define({
 show:function(){
 alert(this.name);
 }
 });
 
 var SubClass=function(name,age){
 this.age=age;
 }.$extends(SuperClass).$define({
 display:function(){
 alert(this.age);
 }
 });
 
 var Sub=function(name,age){
 
 }.$extends(SubClass).$define({
 show:function(){
 this.constructor.$super.show.call(this);
 alert("haahh");
 }
 });
 *
 * 接口实现
 * var IExampleInterface={
 show:function(){},
 hidden:function(){}
 };
 
 var Class1=function(){
 
 }.$implements(IExampleInterface).$define({
 show:function(){
 alert("show");
 },
 hidden:function(){
 alert("hidden");
 }
 });
 
 var Class1=function(){
 }.$extends(SuperClass).$implements(IExampleInterface).$define({
 show:function(){
 alert("show");
 },
 hidden:function(){
 alert("hidden");
 }
 });
 */
(function(){
    function object(o){
        function F(){
        }
        F.prototype = o;
        return new F();
    }
    
    /**
     * 类的定义
     */
    Function.prototype.$define = function(def){
        var k;
        for (k in def) {
			if(def.hasOwnProperty(k)) {
				this.prototype[k] = def[k];
			}
        }
        
        if (this.__interface__) {
            for (k in this.prototype) {
                if (this.prototype[k] === "NI") {
                    throw new Error("类定义错误，接口方法[" + k + "]未实现");
                }
            }
        }
        
        this.prototype.constructor = this;
        this.$extends = this.$define = this.$implements = function(){
            throw new Error("$define语句定义后面不能再作其它定义");
        };
        return this;
    };
    
    
    
    /**
     * 类继承的定义
     */
    Function.prototype.$extends = function(){
        var me = this, i = arguments.length, sup, fn;
        
        if (i === 0) {
            throw new Error("$extends语句错误：未指定父类");
        }
        
        sup = arguments[0];
        fn = function(){
            sup.apply(this, arguments);
            me.apply(this, arguments);
        };
        fn.prototype = object(sup.prototype);
        fn.prototype.constructor = fn;
        fn.$super = sup.prototype;
        
        return fn;
    };
    
    
    
    /**
     * 接口实现方法的定义，接口是以Object对象的空方法实现的
     */
    Function.prototype.$implements = function(){
        var arg = Array.prototype.slice.call(arguments, 0), fn, i = arg.length, k;
        
        while (i--) {
            if (typeof arg[i] !== "object") {
                throw new Error("$implements语句错误：参数必须为object类型");
            }
            
            for (k in arg[i]) {
                if(typeof this.prototype[k] === "undefined") {
					this.prototype[k] = "NI";
				}
            }
        }
        
        this.__interface__ = true;
        
        this.$extends = function(){
            throw new Error("$extends语句错误:$extends语句不能出现在$implements定义之后");
        };
        
        return this;
    };
})();



//

if(!window.SinaEditor) {
	SinaEditor = {};
}

/**
 * 在SinaEditor下建立子对象
 * @function
 * @param {String} ns 要设置的namespace
 * @param {Function} callBack 设置完命名空间后的回调函数,此函数会把设置的namespace作为参数传递进来
 * @author stan | chaoliang@staff.sina.com.cn
 * @example
 		SinaEditor.pkg("Core.Array");
 		alert(typeof Core.Array);	//[Object Object]
 */
SinaEditor.pkg = function(ns,callBack) {
	if (!ns || !ns.length){
		return null;
	}
    var levels = ns.split(".");
    var nsobj = SinaEditor;
	var i;
    for (i= (levels[0] == 'SinaEditor') ? 1 : 0; i< levels.length; ++ i) {
        nsobj[levels[i]] = nsobj[levels[i]] || {};
        nsobj = nsobj[levels[i]];
    }
	if(callBack) {
		callBack(nsobj);
	}
	return nsobj;
};


SinaEditor.pkg('SinaEditor.operation');
if(!SinaEditor.util) {
	/**
	 * 一些常用的js函数。
	 * @namespace
	 */
	SinaEditor.util = {};
}

SinaEditor.pkg('SinaEditor.util', function(ns){
	/**
	 * 是否是一个空的对象。
	 * @name SinaEditor.util.isEmptyObject
	 * @function
	 * @param {Object} obj 要判断的对象。
	 * @return {Boolean} 当obj={}时返回true;
	 */
    ns.isEmptyObject = function(obj){
		var name;
        for (name in obj) {
            return false;
        }
        return true;
    };
    
	/**
	 * 返回一个唯一整数值
	 * @name SinaEditor.util.uniqueKey
	 * @function
	 * @return {Intger} 返回一个唯一整数值
	 */
    ns.uniqueKey = function(){
        var dt = (+new Date()) + '';
        var len = dt.length;
        return parseInt(Math.random() * 10000, 10) + '' + dt.substring(len / 2, len - 1);
    };
    
    /**
     * 去字符串空格
     * @name SinaEditor.util.trim
	 * @function
     * @param {String} str 要去除空格的字符串
     * @return {String} 返回去首尾空格的字符串
     */
    ns.trim = function(str){
        str = str.replace(/^\s\s*/, '');
        var ws = /\s/;
        var i = str.length;
        while (ws.test(str.charAt(--i))){}
        return str.slice(0, i + 1);
    };
	
	/**
	 * 对象转换成JSON字符串
	 * @name SinaEditor.util.o2s
	 * @function
	 * @param {Object} o 要转换的对象。
	 * @return {String} 转换的字符串类型。
	 */
	ns.o2s = function(o) {
		var strs = [];
		var me = arguments.callee;
		var type = Object.prototype.toString.call(o);
		
		switch(type) {
			case '[object Array]' :
				strs.push('[');
				/*
				//在IE下不会完整的循环完毕
				var i;
				for(i=0,len=o.length; i<len; i++) {
					strs.push(me(o[i]));
					strs.push(',');
				}
				*/
				var tmp = o.shift();
				while(tmp) {
					strs.push(me(tmp));
					strs.push(',');
					tmp = o.shift();
				}
				if(strs[1]) {
					strs.pop();
				}
				strs.push(']');
				return strs.join('');
			case '[object Object]' :
				var key;
				strs.push('{');
				for(key in o) {
					strs.push(me(key));
					strs.push(':');
					strs.push(me(o[key]));
					strs.push(',');
				}
				if(strs[1]) {
					strs.pop();
				}
				strs.push('}');
				return strs.join('');
				
			case '[object String]' :
				strs.push('"');
				strs.push(o.replace(/\\/g,'\\\\')
							.replace(/'/g,'\\\'')
							.replace(/"/g,'\\"'));
				strs.push('"');
				return strs.join('');
			case '[object Number]':
			case '[object Boolean]':
				return o;
			default :
				return o.toString ? o.toString() : '[unsupported]';
		}
	};
	
	/**
	 * 混合对象，不考虑property里的方法
	 * @name SinaEditor.util.mix
	 * @function
	 * @param {Object} target 要混合的对象源。
	 * @param {Object} ref 新增的对象源。
	 * @return {Object} 返回包含新增对象源的对象
	 */
	ns.mix = function(target,ref) {
		if(ref) {
			var key;
			for(key in ref) {
				target[key] = ref[key];
			}
		}
		return target;
	};
	
	/**
	 * JSON字符串转换成对象
	 * @name SinaEditor.util.s2o
	 * @function
	 * @param {String} str 要转换成对象的string
	 * @return 返回转换后的对象，转换失败，那么将会返回null。
	 */
	ns.s2o = function(str) {
		try {
			//转对象
			return eval('('+str+')');
		} catch(e) {
			return null;
		}
	};
});/*

 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <elfz@laacz.lv>
    http://jsbeautifier.org


  You are free to use this in any way you want, in case you find this useful or working for you.

  Usage:
    style_html(html_source);

*/

SinaEditor.util.styleHTML = function(html_source, indent_size, indent_character, max_char) {
  //Wrapper function to invoke all the necessary constructors and deal with the output.
  var Parser, multi_parser;

  Parser = function() {
    this.pos = 0; //Parser position
    this.token = '';
    this.current_mode = 'CONTENT'; //reflects the current Parser mode: TAG/CONTENT
    this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
      parent: 'parent1',
      parentcount: 1,
      parent1: ''
    };
    this.tag_type = '';
    this.token_text = this.last_token = this.last_text = this.token_type = '';


    this.Utils = { //Uilities made available to the various functions
      whitespace: "\n\r\t ".split(''),
      single_token: 'br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed'.split(','), //all the single tags for HTML
      extra_liners: 'head,body,/html'.split(','), //for tags that need a line of whitespace before them
      in_array: function (what, arr) {
	  	var i;
        for (i=0; i<arr.length; i++) {
          if (what === arr[i]) {
            return true;
          }
        }
        return false;
      }
    };

    this.get_content = function () { //function to capture regular content between tags

      var input_char = '';
      var content = [];
      var space = false; //if a space is needed
      while (this.input.charAt(this.pos) !== '<') {
        if (this.pos >= this.input.length) {
          return content.length?content.join(''):['', 'TK_EOF'];
        }

        input_char = this.input.charAt(this.pos);
        this.pos++;
        this.line_char_count++;


        if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
          if (content.length) {
            space = true;
          }
          this.line_char_count--;
          continue; //don't want to insert unnecessary space
        }
        else if (space) {
          if (this.line_char_count >= this.max_char) { //insert a line when the max_char is reached
            content.push('\n');
			var i;
            for (i=0; i<this.indent_level; i++) {
              content.push(this.indent_string);
            }
            this.line_char_count = 0;
          }
          else{
            content.push(' ');
            this.line_char_count++;
          }
          space = false;
        }
        content.push(input_char); //letter at-a-time (or string) inserted to an array
      }
      return content.length?content.join(''):'';
    };

    this.get_script = function () { //get the full content of a script to pass to js_beautify

      var input_char = '';
      var content = [];
      var reg_match = new RegExp('\<\/script' + '\>', 'igm');
      reg_match.lastIndex = this.pos;
      var reg_array = reg_match.exec(this.input);
      var end_script = reg_array?reg_array.index:this.input.length; //absolute end of script
      while(this.pos < end_script) { //get everything in between the script tags
        if (this.pos >= this.input.length) {
          return content.length?content.join(''):['', 'TK_EOF'];
        }

        input_char = this.input.charAt(this.pos);
        this.pos++;


        content.push(input_char);
      }
      return content.length?content.join(''):''; //we might not have any content at all
    };

    this.record_tag = function (tag){ //function to record a tag and its parent in this.tags Object
      if (this.tags[tag + 'count']) { //check for the existence of this tag type
        this.tags[tag + 'count']++;
        this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
      }
      else { //otherwise initialize this tag type
        this.tags[tag + 'count'] = 1;
        this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
      }
      this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
      this.tags.parent = tag + this.tags[tag + 'count']; //and make this the current parent (i.e. in the case of a div 'div1')
    };

    this.retrieve_tag = function (tag) { //function to retrieve the opening tag to the corresponding closer
      if (this.tags[tag + 'count']) { //if the openener is not in the Object we ignore it
        var temp_parent = this.tags.parent; //check to see if it's a closable tag.
        while (temp_parent) { //till we reach '' (the initial value);
          if (tag + this.tags[tag + 'count'] === temp_parent) { //if this is it use it
            break;
          }
          temp_parent = this.tags[temp_parent + 'parent']; //otherwise keep on climbing up the DOM Tree
        }
        if (temp_parent) { //if we caught something
          this.indent_level = this.tags[tag + this.tags[tag + 'count']]; //set the indent_level accordingly
          this.tags.parent = this.tags[temp_parent + 'parent']; //and set the current parent
        }
        delete this.tags[tag + this.tags[tag + 'count'] + 'parent']; //delete the closed tags parent reference...
        delete this.tags[tag + this.tags[tag + 'count']]; //...and the tag itself
        if (this.tags[tag + 'count'] == 1) {
          delete this.tags[tag + 'count'];
        }
        else {
          this.tags[tag + 'count']--;
        }
      }
    };

    this.get_tag = function () { //function to get a full tag and parse its type
      var input_char = '';
	  var comment;
      var content = [];
      var space = false;

      do {
        if (this.pos >= this.input.length) {
          return content.length?content.join(''):['', 'TK_EOF'];
        }

        input_char = this.input.charAt(this.pos);
        this.pos++;
        this.line_char_count++;

        if (this.Utils.in_array(input_char, this.Utils.whitespace)) { //don't want to insert unnecessary space
          space = true;
          this.line_char_count--;
          continue;
        }

        if (input_char === "'" || input_char === '"') {
          if (!content[1] || content[1] !== '!') { //if we're in a comment strings don't get treated specially
            input_char += this.get_unformatted(input_char);
            space = true;
          }
        }

        if (input_char === '=') { //no space before =
          space = false;
        }

        if (content.length && content[content.length-1] !== '=' && input_char !== '>'
            && space) { //no space after = or before >
          if (this.line_char_count >= this.max_char) {
            this.print_newline(false, content);
            this.line_char_count = 0;
          }
          else {
            content.push(' ');
            this.line_char_count++;
          }
          space = false;
        }
        content.push(input_char); //inserts character at-a-time (or string)
      } while (input_char !== '>');

      var tag_complete = content.join('');
      var tag_index;
      if (tag_complete.indexOf(' ') != -1) { //if there's whitespace, thats where the tag name ends
        tag_index = tag_complete.indexOf(' ');
      }
      else { //otherwise go with the tag ending
        tag_index = tag_complete.indexOf('>');
      }
      var tag_check = tag_complete.substring(1, tag_index).toLowerCase();
      if (tag_complete.charAt(tag_complete.length-2) === '/' ||
          this.Utils.in_array(tag_check, this.Utils.single_token)) { //if this tag name is a single tag type (either in the list or has a closing /)
        this.tag_type = 'SINGLE';
      }
      else if (tag_check === 'script') { //for later script handling
        this.record_tag(tag_check);
        this.tag_type = 'SCRIPT';
      }
      else if (tag_check === 'style') { //for future style handling (for now it justs uses get_content)
        this.record_tag(tag_check);
        this.tag_type = 'STYLE';
      }
      else if (tag_check === 'a') { // do not reformat the <a> links
        comment = this.get_unformatted('</a>', tag_complete); //...delegate to get_unformatted function
        content.push(comment);
        this.tag_type = 'SINGLE';
      }
      else if (tag_check.charAt(0) === '!') { //peek for <!-- comment
        if (tag_check.indexOf('[if') != -1) { //peek for <!--[if conditional comment
          if (tag_complete.indexOf('!IE') != -1) { //this type needs a closing --> so...
            comment = this.get_unformatted('-->', tag_complete); //...delegate to get_unformatted
            content.push(comment);
          }
          this.tag_type = 'START';
        }
        else if (tag_check.indexOf('[endif') != -1) {//peek for <!--[endif end conditional comment
          this.tag_type = 'END';
          this.unindent();
        }
        else if (tag_check.indexOf('[cdata[') != -1) { //if it's a <[cdata[ comment...
          comment = this.get_unformatted(']]>', tag_complete); //...delegate to get_unformatted function
          content.push(comment);
          this.tag_type = 'SINGLE'; //<![CDATA[ comments are treated like single tags
        }
        else {
          comment = this.get_unformatted('-->', tag_complete);
          content.push(comment);
          this.tag_type = 'SINGLE';
        }
      }
      else {
        if (tag_check.charAt(0) === '/') { //this tag is a double tag so check for tag-ending
          this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
          this.tag_type = 'END';
        }
        else { //otherwise it's a start-tag
          this.record_tag(tag_check); //push it on the tag stack
          this.tag_type = 'START';
        }
        if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) { //check if this double needs an extra line
          this.print_newline(true, this.output);
        }
      }
      return content.join(''); //returns fully formatted tag
    };

    this.get_unformatted = function (delimiter, orig_tag) { //function to return unformatted content in its entirety

      if (orig_tag && orig_tag.indexOf(delimiter) != -1) {
        return '';
      }
      var input_char = '';
      var content = '';
      var space = true;
      do {


        input_char = this.input.charAt(this.pos);
        this.pos++;

        if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
          if (!space) {
            this.line_char_count--;
            continue;
          }
          if (input_char === '\n' || input_char === '\r') {
            content += '\n';
			var i;
            for (i=0; i<this.indent_level; i++) {
              content += this.indent_string;
            }
            space = false; //...and make sure other indentation is erased
            this.line_char_count = 0;
            continue;
          }
        }
        content += input_char;
        this.line_char_count++;
        space = true;


      } while (content.indexOf(delimiter) == -1);
      return content;
    };

    this.get_token = function () { //initial handler for token-retrieval
      var token;

      if (this.last_token === 'TK_TAG_SCRIPT') { //check if we need to format javascript
        var temp_token = this.get_script();
        if (typeof temp_token !== 'string') {
          return temp_token;
        }
        token = js_beautify(temp_token,
                {indent_size: this.indent_size, indent_char: this.indent_character, indent_level: this.indent_level}); //call the JS Beautifier
        return [token, 'TK_CONTENT'];
      }
      if (this.current_mode === 'CONTENT') {
        token = this.get_content();
        if (typeof token !== 'string') {
          return token;
        }
        else {
          return [token, 'TK_CONTENT'];
        }
      }

      if(this.current_mode === 'TAG') {
        token = this.get_tag();
        if (typeof token !== 'string') {
          return token;
        }
        else {
          var tag_name_type = 'TK_TAG_' + this.tag_type;
          return [token, tag_name_type];
        }
      }
    };

    this.printer = function (js_source, indent_character, indent_size, max_char) { //handles input/output and some other printing functions

      this.input = js_source || ''; //gets the input for the Parser
      this.output = [];
      this.indent_character = indent_character || ' ';
      this.indent_string = '';
      this.indent_size = indent_size || 2;
      this.indent_level = 0;
      this.max_char = max_char || 70; //maximum amount of characters per line
      this.line_char_count = 0; //count to see if max_char was exceeded
      
	  var i;
      for (i=0; i<this.indent_size; i++) {
        this.indent_string += this.indent_character;
      }

      this.print_newline = function (ignore, arr) {
        this.line_char_count = 0;
        if (!arr || !arr.length) {
          return;
        }
        if (!ignore) { //we might want the extra line
          while (this.Utils.in_array(arr[arr.length-1], this.Utils.whitespace)) {
            arr.pop();
          }
        }
        arr.push('\n');
		var i;
        for (i=0; i<this.indent_level; i++) {
          arr.push(this.indent_string);
        }
      };


      this.print_token = function (text) {
        this.output.push(text);
      };

      this.indent = function () {
        this.indent_level++;
      };

      this.unindent = function () {
        if (this.indent_level > 0) {
          this.indent_level--;
        }
      };
    };
    return this;
  };

  /*_____________________--------------------_____________________*/



  multi_parser = new Parser(); //wrapping functions Parser
  multi_parser.printer(html_source, indent_character, indent_size); //initialize starting values



  while (true) {
      var t = multi_parser.get_token();
      multi_parser.token_text = t[0];
      multi_parser.token_type = t[1];

    if (multi_parser.token_type === 'TK_EOF') {
      break;
    }


    switch (multi_parser.token_type) {
      case 'TK_TAG_START': case 'TK_TAG_SCRIPT': case 'TK_TAG_STYLE':
        multi_parser.print_newline(false, multi_parser.output);
        multi_parser.print_token(multi_parser.token_text);
        multi_parser.indent();
        multi_parser.current_mode = 'CONTENT';
        break;
      case 'TK_TAG_END':
        multi_parser.print_newline(true, multi_parser.output);
        multi_parser.print_token(multi_parser.token_text);
        multi_parser.current_mode = 'CONTENT';
        break;
      case 'TK_TAG_SINGLE':
        multi_parser.print_newline(false, multi_parser.output);
        multi_parser.print_token(multi_parser.token_text);
        multi_parser.current_mode = 'CONTENT';
        break;
      case 'TK_CONTENT':
        if (multi_parser.token_text !== '') {
          multi_parser.print_newline(false, multi_parser.output);
          multi_parser.print_token(multi_parser.token_text);
        }
        multi_parser.current_mode = 'TAG';
        break;
    }
    multi_parser.last_token = multi_parser.token_type;
    multi_parser.last_text = multi_parser.token_text;
  }
  return multi_parser.output.join('');
};
if(!SinaEditor.util) {
	SinaEditor.util = {};
	/**
	 * 各种对节点，样式的操作工具的集合。
	 * @namespace
	 */
	SinaEditor.util.dom = {};
}

SinaEditor.pkg('SinaEditor.util.dom',function(ns) {
	/**
	 * 创建一个dom节点
	 * @name SinaEditor.util.dom.createDom
	 * @function 
	 * @param {String} nodeName 节点名称
	 * @param {Object} option {ownerDocument:创建节点所属的document(默认为当前的document)，attributes:对应的属性，properties:设置属性}
	 * @return {Element} 创建的节点对象。
	 */
	ns.createDom = function(nodeName, option) {
		option = option || {};
		var ele = (option.ownerDocument||document).createElement(nodeName);
		var k;
		if(option.attributes) {
			for(k in option.attributes) {
				ele.setAttribute(k,option.attributes[k]);
			}
		}
		if(option.properties) {
			for(k in option.properties) {
				ele[k] = option.properties[k];
			}
		}
		return ele;
	};
	
	/**
	 * 判断两个节点的关系是否是包含或者相等的关系。
	 * @name SinaEditor.util.dom.containsNode
	 * @function 
	 * @param {Element} parent 判断的父节点。
	 * @param {Element} child 判断的子节点。
	 * @return {Boolean} 当且仅当两个节点相等，或者包含时返回true。
	 */
	ns.containsNode = function(parent,child) {
		if(parent == child) {
			return true;
		}
		if(parent.contains) {
			return parent.contains(child);
		} else {
			return !!(parent.compareDocumentPosition(child) & 16);
		}
	};
	
	/**
	 * 获取节点的第一个子节点。
	 * @name SinaEditor.util.dom.getFirst
	 * @function 
	 * @param {Element} elem 要获取子节点的父元素。
	 * @return {Element} 节点的第一个子节点
	 */
	ns.getFirst = function(elem) {
		elem = elem.firstChild;
		return elem && elem.nodeType != SinaEditor.NODETYPE.ELEMENT ? ns.getNext( elem ) : elem;
	};
	
	/**
	 * 获取节点的下一个兄弟节点。
	 * @name SinaEditor.util.dom.getNext
	 * @function 
	 * @param {Element} elem 要获取兄弟节点的上一兄弟元素。
	 * @return {Element} 节点的下一个兄弟节点
	 */
	ns.getNext = function(elem) {
		do {  
	        elem = elem.nextSibling;  
	    } while ( elem && elem.nodeType != 1 );  
	    return elem;
	};
	
	/**
	 * 查找节点的所有父节点，到HTML节点为止。
	 * @name SinaEditor.util.dom.parents
	 * @function 
	 * @param {Element} elem 节点元素
	 * @return {Array} 查找节点的父元素到	HTML节点之间所有的父元素
	 */
	ns.parents = function(elem) {
		var parents = [];
		var p = elem.parentNode;

		while(p.tagName.toUpperCase() != 'HTML') {
			parents[parents.length] = p;
			p = p.parentNode;
		}
		
		return parents;
	};
	
	/**
	 * 通过HTML String去创建一个dom节点
	 * @name SinaEditor.util.dom.createDomFromHTML
	 * @function 
	 * @param {String} html html内容
	 * @param {Object} ownerDocument 所属document
	 * @return {Element} 创建好的DOM节点。
	 */
	ns.createDomFromHTML = function(html, ownerDocument) {
		var div = ns.createDom('DIV',{'ownerDocument':ownerDocument});
		div.innerHTML = html;
		if(div.firstChild) {
			return div.removeChild(div.firstChild);
		} else {
			//IE下插入<object>或者<embed>么有效果，套一层
			div.innerHTML = '<div>' + html + '</div>';
			var refC = div.firstChild;
			return refC.removeChild(refC.firstChild);
		}
	};
	
	/**
	 * 获取节点的outHTML
	 * @name SinaEditor.util.dom.outerHTML
	 * @function 
	 * @param {Element} element 要获取的HTML string
	 * @return {String} 节点的outHTML
	 */
	ns.outerHTML = function(element){
		if (element.outerHTML) {
			console.log('原生outerHTML');
			return element.outerHTML;
		}
		//new XMLSerializer().serializeToString(oElement);??
		var div = element.ownerDocument.createElement('div');
		div.appendChild(element.cloneNode(true));
		return div.innerHTML;
	};
	
	if (SinaEditor.env.$IE) {
		/**
		 * 替换节点,把原有的节点替换成新的节点。并返回被替换的节点。
		 * @name SinaEditor.util.dom.replaceNode
		 * @function 
		 * @param {Element} newChild 新的节点 
		 * @param {Element} oldChild 要被替换的节点
		 * @return {Element} 被替换的节点
		 */
		ns.replaceNode = function(newChild,oldChild) {
			return oldChild.replaceNode(newChild); 
		};
	} else {
		ns.replaceNode = function(newChild,oldChild) {
			return oldChild.parentNode.replaceChild(newChild, oldChild);
		};
	}
	
	/**
	 * 删除指定节点
	 * @name SinaEditor.util.dom.delElement
	 * @function 
	 * @param {Element} element 要删除的节点元素
	 * @return {Element} 成功，是删除节点，失败则是null
	 */
	ns.delElement = function(element) {
		var parentNode = element.parentNode;
		if(parentNode) {
			return parentNode.removeChild(element);
		} else {
			return null;
		}
	};
	
	/**
	 * 移除当前节点,并保留节点内的文字。如果不是节点，将不会做任何操作。
	 * @name SinaEditor.util.dom.delElement
	 * @function 
	 * @param {Element} elm 要移除的节点
	 */
	ns.removeTag = function(elm){
		if(elm.nodeType != 1) {
			return;
		}
		var parent = elm.parentNode;
		var children = elm.childNodes;
		while(children[0]) {
			parent.insertBefore(children[0],elm);
		}
		parent.removeChild(elm);
		//有可能前面的节点是textNode,移出的第一个节点也是textNode,所以需要合并
		//有问题的，造成节点位置错乱
		//parent.normalize();
	};
	
	/**
	 * 获取离最近块状父元素最近的非块状父元素。
	 * @name SinaEditor.util.dom.getBlockParent
	 * @function 
	 * @param {Elment} dom 待传入的节点 
	 * @return {Elment} 举例如:
	 * @return {Elment} 举例如:
	 * &nbsp;&nbsp;&nbsp;&nbsp; (a)&lt;div&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;div&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;span&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;strong&gt;&lt;a&gt;test&lt;/a&gt;&lt;/strong&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;span&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/div&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp; &lt;/div&gt;,传入的节点是a标签,那么将会返回span节点;
	 * &nbsp;&nbsp;&nbsp;&nbsp;(b) &lt;div&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;div&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;a&gt;test&lt;/a&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/div&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp; &lt;/div&gt;,传入的节点是a标签,由于父节点就是块状元素,将会返回null;
	 */
	ns.getBlockParent = function(dom) {
		var ps = ns.parents(dom);
		var blockElm = null;
		var i;
		for(i=0; ps[i]; i++) {
			if(SinaEditor.RANGE.BLOCKTAGS[ps[i].tagName.toUpperCase()]) {
				break;
			}
			blockElm = ps[i];
		}
		return blockElm;
	};
	
	/**
	 * 把节点插入到指定节点之前
	 * @name SinaEditor.util.dom.insertBefore
	 * @function 
	 * @param {Object} newElem 新的节点
	 * @param {Object} reElem 参照节点
	 */
	ns.insertBefore = function(newElem,reElem) {
		reElem.parentNode.insertBefore(newElem,reElem);
	};
	
	/**
	 * 把节点插入到指定节点之后
	 * @name SinaEditor.util.dom.insertAfter
	 * @function 
	 * @param {Object} newElem 新的节点
	 * @param {Object} reElem 参照节点
	 */
	ns.insertAfter = function(newElem,reElem) {
		var parentEl = reElem.parentNode;
        if(parentEl.lastChild == reElem) {
            parentEl.appendChild(newElem);
        } else {
            parentEl.insertBefore(newElem,reElem.nextSibling);
        }
	};

	/**
	 * 获取滚动高度
	 * @name SinaEditor.util.dom.getScrollPos
	 * @function 
	 * @param {Object} oDocument 要获取的document对象。
	 * @return {Aarray} [scrollTop,scrollLeft,scrollWidth,scrollHeight]
	 */
	ns.getScrollPos = function(oDocument) {
		oDocument = oDocument || document;
		var _model = oDocument.compatMode;
		var ref = _model === 'BackCompat' ? oDocument.body : oDocument.documentElement;

		return [ref.scrollTop || oDocument.body.scrollTop,
				ref.scrollLeft || oDocument.body.scrollLeft,
				ref.scrollWidth,
				ref.scrollHeight];
	};
	
	/**
	 * getElementById的方法，duocument传递进去
	 * @name SinaEditor.util.dom.$E
	 * @function 
	 * @param {String | Element} id 传递的ID值或者指定的节点对象。
	 * @param {Object} doc 节点所在的document对象。默认为当前document。
	 * @return {Element} 当且仅当对应的document中存在时，返回此id的节点对象。
	 */
	ns.$E = function(id,doc) {
		var node = typeof id == "string"? (doc || document).getElementById(id): id;
		if(node) {
			return node;
		}
		return null;
	};
	
	/**
	 * 获取节点的X坐标的位置
	 * @param {Object} el
	 * @param {Object} noscoll
	 */
	function _pageX(el,noscoll) {
		var dx = el.scrollLeft;
		if(noscoll) {
			return el.offsetParent ? el.offsetLeft + _pageX(el.offsetParent,noscoll) - dx : el.offsetLeft - dx;
		}
		return el.offsetParent ? el.offsetLeft + _pageX(el.offsetParent,noscoll) : el.offsetLeft;
	}
	
	/**
	 * 获取节点Y坐标的位置
	 * @param {Object} el
	 * @param {Object} noscoll
	 */
	function _pageY(el,noscoll) {
		var dy = el.scrollTop;
		if(noscoll) {
			return el.offsetParent ? el.offsetTop + _pageY(el.offsetParent,noscoll) - dy: el.offsetTop -dy;
		}
		return el.offsetParent ? el.offsetTop + _pageY(el.offsetParent,noscoll) : el.offsetTop;
	}
	
	/**
	 * 获取节点的坐标位置
	 * @name SinaEditor.util.dom.getXY
	 * @function 
	 * @param {Element} el 要获取节点位置的节点
	 * @param {Boolen} inIframe  是否是在iframe内的节点对象。
	 * @return {Array} {坐标X,坐标Y}
	 */
	ns.getXY = function(el,inIframe) {
		if(!inIframe) {
			return [_pageX(el),_pageY(el)];
		}
		
		var doc;
		var frame;
		var pframe;
		var pos = [0,0];
		
		var ie = true;
		
		doc = el.ownerDocument;
		
		if(doc.parentWindow) {
			frame = doc.parentWindow.frameElement;
			pframe = frame && frame.ownerDocument.parentWindow.frameElement;
		} else {
			frame = doc.defaultView.frameElement;
			pframe = frame && frame.ownerDocument.defaultView.frameElement;
			ie = false;
		}
		
		while(frame) {
			pos[0] += ns.styleInteger(frame, "borderLeftWidth");
			pos[1] += ns.styleInteger(frame, "borderTopWidth");
			
			if(pframe) {
				pos[0] += _pageX(frame,true);
				pos[1] += _pageY(frame,true);
				frame = pframe;
				if(ie) {
					pframe = frame.ownerDocument.parentWindow.frameElement;
				} else {
					pframe = frame.ownerDocument.defaultView.frameElement;
				}
			} else {
				pos[0] += _pageX(frame);
				pos[1] += _pageY(frame);
				frame = pframe;
			}
		}

		return [pos[0]+_pageX(el,true),pos[1]+_pageY(el,true)];
	};
	
	/**
     * 返回所有的子节点,是正宗的array哦！
	 * @name SinaEditor.util.dom.getChildren
	 * @function 
     * @param {Object} elements 要返回子节点的元素
     * @param {Object} opts 可选参数:<br>
     * 					eleArr(Array) : 元素数组<br>
     * 					all(Boolean) : 包括子节点的子节点<br>
     * 					onlyElement(Boolen) : true为之返回nodeType为1的节点<br>
     * @return {Aarray} 所有的子节点
     */
    ns.getChildren = function(elements, opts){
        opts = opts || {};
        opts.eleArr = opts.eleArr || [];
        if (elements.nodeType == 3 && !opts.onlyElement) {
            opts.eleArr.push(elements);
        }
        else {
            var children = elements.childNodes;
            var i = 0;
            while (children[i]) {
                var ch = children[i];
                if (ch.nodeType == 1) {
                    if (opts.all && (ch.childNodes.length != 1 || (ch.childNodes.length == 1 && ch.childNodes[0].nodeType != 3))) {
                        opts.eleArr = ns.getChildren(ch, opts);
                    }
                    opts.eleArr.push(ch);
                }
                else {
                    if (!opts.onlyElement) {
                        opts.eleArr.push(ch);
                    }
                }
                i++;
            }
        }
        return opts.eleArr;
    };
});

SinaEditor.pkg('SinaEditor.util.dom', function(ns){
	
	/**
	 * 添加样式表，注意，添加的内容中不能包含<span style="color:red">@</span>等这样的特殊字符。<br>
	 * 否则会导致IE系列浏览器的崩溃。
	 * @name SinaEditor.util.dom.addStyles
	 * @function 
	 * @param {String} str 要添加的样式内容
	 * @param {Object} ownerDocument 添加到的指定document对象，不传递表示默认添加到当前document对象。
	 */
    ns.addStyles = function(str, ownerDocument){
        var style;
        var head;
        head = (ownerDocument || document).getElementsByTagName('head')[0];
        style = ns.createDom('style', {
            'ownerDocument': ownerDocument,
            'attributes': {
                'type': 'text/css'
            }
        });
        try {
            style.appendChild((ownerDocument || document).createTextNode(str));
        } 
        catch (ex) {
            style.styleSheet.cssText = str;
        }
        head.appendChild(style);
    };
    
	/**
	 * 添加外链样式
	 * @name SinaEditor.util.dom.addLink
	 * @function 
	 * @param {String} href 要添加的外链样式，建议使用绝对路径
	 * @param {Object} ownerDocument 添加到的指定document对象，不传递表示默认添加到当前document对象。
	 */
    ns.addLink = function(href, ownerDocument){
        var link;
        var head;
        head = (ownerDocument || document).getElementsByTagName('head')[0];
        link = ns.createDom('link', {
            'ownerDocument': ownerDocument,
            'attributes': {
                'rel': 'stylesheet',
                'type': 'text/css',
                'href': href
            }
        });
        head.appendChild(link);
    };
    
	/**
	 * 获取整数形式的样式值。例如：样式值中包含px,pt。但当我们只需要获取它的整数值时，可以使用此函数。
	 * @name SinaEditor.util.dom.styleInteger
	 * @function 
	 * @param {Element} el 要获取样式值得节点。
	 * @param {String} style 要获取的样式。<span style="color:red">使用js的样式取值形式(及不带'-'符号)</span>
	 * @return {Intger} 在不出现异常的情况下返回过滤后的样式整数值。
	 */
    ns.styleInteger = function(el, style){
        var val = ns.getStyle(el, style);
        try {
            return parseInt(val.replace(/[^\d]/g, ''),10) || 0;
        } 
        catch (e) {
            return 0;
        }
    };
	
    /**
	 * Gets the current computed value of one of the element CSS style
	 * properties.
	 * @param {String} propertyName The style property name.
	 * @returns {String} The property value.
	 * @example
	 * var element = new CKEDITOR.dom.element( 'span' );
	 * alert( <b>element.getComputedStyle( 'display' )</b> );  // "inline"
	 */
	/*
	getComputedStyle :
		CKEDITOR.env.ie ?
			function( propertyName )
			{
				return this.$.currentStyle[ CKEDITOR.tools.cssStyleToDomStyle( propertyName ) ];
			}
		:
			function( propertyName )
			{
				return this.getWindow().$.getComputedStyle( this.$, '' ).getPropertyValue( propertyName );
			}
	*/
	
	/**
	 * 获取样式值
	 * @name SinaEditor.util.dom.getStyle
	 * @function 
	 * @param {Element} el 要获取样式的节点
	 * @param {String} property 要获取的样式属性。<span style="color:red">使用js的样式取值形式(及不带'-'符号)</span>
	 * @return 当传递的节点为空，或者节点为body元素时，返回空字符串。
	 */
    ns.getStyle = function(el, property){
		if(!el) {
			return '';
		}
		switch(el.nodeType) {
			case SinaEditor.NODETYPE.HTMLELEMENT : 
				return '';
			case  SinaEditor.NODETYPE.TEXT : 
				el = el.parentNode;
		}
		if(!el || el.tagName.toUpperCase() === 'BODY') {
			return '';
		}
        switch (property) {
            // 透明度
            case "opacity":
                var val = 100;
                try {
					var key = 'DXImageTransform.Microsoft.Alpha';
                    val = el.filters[key].opacity;
                } 
                catch (e) {
                    try {
                        val = el.filters('alpha').opacity;
                    } 
                    catch (e) {
                    }
                }
                return val / 100;
            default:
				if(property === 'float') {
					property = "styleFloat";
				}
                var value = el.currentStyle ? el.currentStyle[property] : null;
                return (el.style[property] || value);
        }
    };
    if (!SinaEditor.env.$IE) {
        ns.getStyle = function(el, property){
			if(!el) {
				return '';
			}
			switch(el.nodeType) {
				case SinaEditor.NODETYPE.HTMLELEMENT : 
					return '';
				case  SinaEditor.NODETYPE.TEXT : 
					el = el.parentNode;
			}
			if(!el || el.tagName.toUpperCase() === 'BODY') {
				return '';
			}
            // 浮动
            if (property == "float") {
                property = "cssFloat";
            }
            var computed = el.ownerDocument.defaultView.getComputedStyle(el, "");
            return el.style[property] || computed ? computed[property] : null;
        };
    }
    
    var toStyleAttribute = function(styleName){
        var arr = styleName.split('-');
        var cc = arr[0];
		var i;
        for (i = 1; i < arr.length; i++) {
            cc += arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
        }
        return cc;
    };
	
	/**
	 * 移除指定样式，并返回节点的当前的自定义样式数
	 * @name SinaEditor.util.dom.removeStyle
	 * @function 
	 * @param {Object} elm 要删除样式的节点
	 * @param {String} styleName 样式的名称
	 * @return {Integer} currentLen 返回当前还有多少定义的样式
	 */
	ns.removeStyle = function(elm,styleName) {
		styleName = styleName.replace(/([A-Z])/,'-$1').toLowerCase();
		var cssTexts = elm.style.cssText.toLowerCase().split(';');
		var i;
		for(i=0; cssTexts[i]; i++) {
			if(cssTexts[i].indexOf(styleName) != -1) {
				cssTexts.splice(i,1);
				break;
			}
		}
		elm.style.cssText = cssTexts.join(';');
		return cssTexts.length-1;
	};
    
	/**
	 * 设置样式。
	 * @name SinaEditor.util.dom.setStyle
	 * @function
	 * @param {Element} el 要设置样式的节点。
	 * @param {String | Object} style 要设置的样式。当参数到此为止(2个)时，此参数可以设置多个:{style1:value1,style2:value2...}
	 * @param {String} opt_value 要设置的样式值。可选。 
	 */
    ns.setStyle = function(){
        var el = arguments[0];
        if (arguments.length == 2) {
            var styleAttr,name;
            var style = arguments[1];
            for (name in style) {
                styleAttr = toStyleAttribute(name);
                ns.setStyle(el, styleAttr, style[name]);
            }
        }
        else 
            if (arguments.length == 3) {
                var property = arguments[1];
                var val = arguments[2];
                if (!SinaEditor.env.$IE) {
                    if (property == "float") {
                        property = "cssFloat";
                    }
                    el.style[property] = val;
                }
                else {
                    switch (property) {
                        case "opacity":
                            el.style.filter = "alpha(opacity=" + (val * 100) + ")";
                            if (!el.currentStyle || !el.currentStyle.hasLayout) {
                                el.style.zoom = 1;
                            }
                            break;
                        case "float":
                            property = "styleFloat";
							break;
                        default:
                            el.style[property] = val;
                    }
                }
            }
    };
});

if(!SinaEditor.range) {
	/**
	 * 对浏览器实现range的扩充，对各浏览器进行了一定的兼容。
	 * @namespace
	 */
	SinaEditor.range = {};
}

SinaEditor.pkg('SinaEditor.range', function(ns){
	
    var domUtil = SinaEditor.util.dom;
	
	var _queryStateArr = {};

    var _createRange = function(editor){
        return editor.entyDoc.createRange();
    };
    
    /**
     * 获取当前选中的范围，返回range数组。<br>
     * 注意:此防范返回的range都做了一定的修正，可能会选中一个DOM对象。<br>
     * 例如:&lt;a&gt;<span style="background-color:blue;">|test|</span>&lt;/a&gt;这样正好完全按选中一个Dom对象的内容时，会向上选中此Dom对象。<br>
     * &nbsp;&nbsp;&nbsp;&nbsp;即被修正为<span style="background-color:blue;">|&lt;a&gt;test&lt;/a&gt;|</span>
     * @function
     * @name SinaEditor.range.getCurrentRanges
     * @param {Object} win 选中window对象
     * @return {Aarray} 包含所有已选区域的数组。
     */
    ns.getCurrentRanges = function(win){
        var selection = win.getSelection();
        if (!selection) {
            //在没有选中的情况下
            return [];
        }
        var rangeArr = [];
        var count = selection.rangeCount;
		if(!count) {
			var range = win.document.createRange();
			if(!win.document.body.firstChild) {
				win.document.body.innerHTML = '&#x200b;';
			}
			range.selectNode(win.document.body.firstChild);
			range.collapse(true);
			//selection.addRange();
			return [range];
		}
		var i,tmpRange;
        for (i = 0; i < count; i++) {
			tmpRange = _resetRange(selection.getRangeAt(i));
            rangeArr.push(tmpRange);
        }
        return rangeArr;
    };
	
	/**
	 * 修正range，有这种情况<span>abc</span>
	 * 在webkit内核下，选中abc，返回的range在span里面:
	 *   <span>[#text]|abc|[/#text]</span>
	 * 但是我们可能需要获得的range是:
	 *   |<span>[#text]abc[/#text]</span>|
	 * 所以需要对这些选区进行再修正。
	 * @param {Object} range 要修正的range
	 * @return {Object} range 修正后的range
	 */
	var _resetRange = function(range) {
		if(range.collapsed) {
			return range;
		}
		if(range._range && range._range.item) {
			//选中了图片或者表格
			return range;
		}
		
		if(range._range && range.startContainer && range.startContainer.nodeType === SinaEditor.NODETYPE.ELEMENT 
			&& (range.startContainer.tagName.toUpperCase() === 'IMG' || range.startContainer.tagName.toUpperCase() === 'table')) {
			return range;	
		}
		
		if(range._range && range.endContainer && range.endContainer.nodeType === SinaEditor.NODETYPE.ELEMENT 
			&& (range.endContainer.tagName.toUpperCase() === 'IMG' || range.endContainer.tagName.toUpperCase() === 'table')) {
			return range;	
		}
		
		var tmpRange = range.cloneRange();
		var oldStart = range.startContainer;
		var newStart = _whichOne(oldStart);
		while(newStart) {
			range.setStartBefore(newStart);
			if(range.toString() !== tmpRange.toString()) {
				break;
			}
			oldStart = newStart;
			newStart = _whichOne(oldStart);
		}
		if(oldStart === tmpRange.startContainer) {
			range.setStart(oldStart,tmpRange.startOffset);
		} else {
			range.setStartBefore(oldStart);
		}
		var oldEnd = range.endContainer;
		var newEnd = _whichOne(oldEnd);
		while(newEnd) {
			range.setEndAfter(newEnd);
			if(range.toString() !== tmpRange.toString()) {
				break;
			}
			oldEnd = newEnd;
			newEnd = _whichOne(oldEnd);
		}
		if(oldEnd === tmpRange.endContainer) {
			range.setEnd(oldEnd,tmpRange.endOffset);
		} else {
			range.setEndAfter(oldEnd);
		}
		tmpRange.detach();
		return range;
	};
	
	/**
	 * 在多标签包含的情况下(情况分为完全包含和部分包含)，到底要不要向上一级选中。
	 * 例如，完全包含的情况：
	 * <div>123<span><a>|test|</a></span>456</div>，选中了a标签内的所有内容.
	 * 但是a标签完全包含在span标签内，所以选区会被修正为:
	 * <div>123|<span><a>test</a></span>|456</div>
	 * @param {Object} elm 判断是否为完全包含的子节点。
	 * @return {Object} 当且仅当参数节点为父节点的全包含时，返回最上层的父节点。
	 */
	var _whichOne = function(elm) {
		var p,pp;
		p = elm.parentNode;
		//最上面到body就截止#webkit，问题出现。
		//遇到了HTML这个节点,#opera，出现问题。
		if(!p || p.nodeType === SinaEditor.NODETYPE.HTMLELEMENT || p.tagName.toUpperCase() === 'HTML' || p.tagName.toUpperCase() === 'BODY') {
			return null;
		}
		pp = p.parentNode;
		if(pp && p) {
			var cs = pp.childNodes;
			for(var i=0; cs[i]; i++) {
				if(cs[i] === p) {
					return p;
				}
			}
		}
		return null;
	};
    
    /**
     * 应用给定的range(s)对象。
     * @function
     * @name SinaEditor.range.applyRanges
     * @param {Object} win 选中window对象
     * @param {Object | Array} ranges range对象或者对象数组
     */
    ns.applyRanges = function(win, ranges){
        if (!ranges) {
            return;
        }
        var selection = win.getSelection();
        selection.removeAllRanges();
        if (ranges.push) {
			var i;
            for (i = 0; ranges[i]; i++) {
                selection.addRange(ranges[i]);
            }
        }
        else {
            selection.addRange(ranges);
        }
    };
    
    /**
     * 获取当前选区焦点的节点对象，在多选区的情况下，只对第一个选区进行处理。
     * @function
     * @name SinaEditor.range.focusNode
     * @param {Object} win 要查找的window对象
     * @param {boolean} opt_onlyEle 当且仅当opt_onlyEle=true时，保证返回的是DOM节点
     * @return {Object} 返回当前选区焦点的节点对象
     */
    ns.focusNode = function(win,opt_onlyEle){
		var node = null;
        if (SinaEditor.env.$IE) {
            var range = win.document.selection.createRange();
			node = range.item ? range.item(0) : range.parentElement();
			if(opt_onlyEle && node.nodeType != 1 ) {
				return node.parentNode;
			}
            return node;
        }
        var selection = win.getSelection();
        var rangeArr = [];
        var count = selection.rangeCount;
		var i;
        for (i = 0; i < count; i++) {
			node = selection.getRangeAt(i).commonAncestorContainer;
			if(opt_onlyEle && node.nodeType != 1 ) {
				return node.parentNode;
			}
            return node;
        }
        return null;
    };
	
	/**
	 * 获得当前range的状态参照节点，通常情况下，range会跨越多个节点。<br>
	 * 为了获取当前range的状态(如是否为加粗等状态)，需要有一个参照节点来确定状态。<br>
     * @function
     * @name SinaEditor.range.getReferNode
	 * @param {Object} win 要探测range的window对象。
	 * @param {Object} range 要获取参照节点的range对象。
	 * @return {Object} 返回选中range中的第一个节点，如果第一个节点为文本节点，会返回他的父节点。
	 */
	ns.getReferNode = function(win,range) {
		range = range || ns.getCurrentRanges(win)[0];
		if(!range) {
			return null;
		}
		if(range.item) {
			return range.item(0);
		}
		
		var referNode = range.startContainer;
		
		switch(referNode.nodeType) {
			case SinaEditor.NODETYPE.ELEMENT : 
				//到这里来有三种情况：
				//1.ctrl+a:选中了body
				//2.应用了一些点击，生成的range选中了节点。
				//3.选中了图片
				switch(referNode.tagName.toUpperCase()) {
					case 'BODY' : 
						return SinaEditor.util.dom.getFirst(referNode);
					default : return referNode.parentNode;
				}
			case SinaEditor.NODETYPE.TEXT : 
				console.log('SinaEditor.NODETYPE.TEXT');
				var parent = referNode.parentNode;
				try {
					//有可能被拆卸了
					parent.normalize();
				}  catch(e){}
				if(parent.childNodes.length == 1) {
					return parent;
				}
				return referNode;
		}
	};
    
    /**
     * 选中指定的节点。
     * @function
     * @name SinaEditor.range.focus
     * @param {Object} dom 要选中的节点
     * @param {Boolean} isContent 选中节点里的内容还是选中节点
     * @return {Object} 返回selection对象
     */
    ns.focus = function(dom, isContent){
        var win = dom.ownerDocument.parentWindow | dom.ownerDocument.defaultView;
        var selection = win.getSelection();
        var range = win.document.createRange();
        if (isContent) {
            range.selectNodeContents(dom);
        }
        else {
            range.selectNode(dom);
        }
        selection.removeAllRanges();
        selection.addRange(range);
        return selection;
    };
    
    /**
     * 设置选择区域在节点之前
     * @function
     * @name SinaEditor.range.setStartBefore
     * @param {Object} win 考虑到dom有可能是一个textnode，所以需要传递window对象
     * @param {Object} dom 要比较的节点
     * @return {Object} 返回selection对象
     */
    ns.setStartBefore = function(win, dom){
        var selection = win.getSelection();
        var range = win.document.createRange();
        
        range.setStartBefore(dom);
        
        selection.removeAllRanges();
        selection.addRange(range);
        return selection;
    };
    
    /**
     * 插入一个节点
     * @function
     * @name SinaEditor.range.insertNode
     * @param {Object} win 考虑到dom有可能是一个textnode，所以需要传递window对象
     * @param {Object} dom 要插入的节点
     * @return {Object} 返回selection对象
     */
    ns.insertNode = function(win, dom){
        var selection = win.getSelection();
        var range;
        if (selection.rangeCount > 0) {
            range = selection.getRangeAt(0);
        } else {
            range = win.document.createRange();
        }
        
        range.insertNode(dom);
        
        return selection;
    };
    
    /**
     * 比较两个边界的位置
     * @function
     * @name SinaEditor.range.compareBoundaryPoints
     * @param {Object} firstRange 第一个要比较的range,作为当前节点
     * @param {Object} secondRange 第二个要比较的range,作为比较节点
     * @param {Integer} how 如何比较,分为4种,默认为c情况：<br>
     * 							a.Range.START_TO_START - 比较两个 Range 节点的开始点<br>
     * 							b.Range.END_TO_END - 比较两个 Range 节点的结束点<br>
     * 							c.Range.START_TO_END - 用 secondRange 的开始点与firstRange的结束点比较<br>
     * 							d.Range.END_TO_START - 用 secondRange 的结束点与firstRange的开始点比较<br>
     * @return {Integer} -1,0,1分别表示第一个range在第二个range之前返回-1，相等，返回0，在之后，返回1
     */
    ns.compareBoundaryPoints = function(firstRange, secondRange, how){
        if (!firstRange) {
            return -1;
        }
        if (!secondRange) {
            return 1;
        }
        how = how || Range.START_TO_END;
        return firstRange.compareBoundaryPoints(how, secondRange);
    };
    
    /**
     * 使样式生效,用于添加节点或者添加样式:<br>
     * <ol>
     * 	<li>
     * 		当range闭合时，光标正好也是要添加的节点时，只会直接应用样式。
     * 		否则会创建要添加的节点，而后插入一个0宽度的空格字符(&amp;#x200b;)，这样可以后输入内容时，样式生效。
     *  </li>
     *  <li>
     *  	当range选取了内容后，会在选区的头部和尾部做标记，把range内的块标签拆散*。并使用深度优先算法遍历range内的节点，逐一的遍历，并添加上样式或者节点。
     *  </li>
     * </ol>
     * *块标签拆散：<br>
     * 自己是非块级元素，父元素也是非块级元素,那么就得把它拆开。这是防止出现非块级元素包裹非块级元素的情况(如:&lt;span&gt;&lt;div&gt;test&lt;/div&gt;&lt;/span&gt;)。<br>
     * @function
     * @name SinaEditor.range.applyStyle
     * @param {Object} editor 要应用样式的编辑器
     * @param {Object} styleConf 样式的配置，以下为需要的参数：<br>
     * <table class="summaryTable">
	 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 *  <tr><td>String</td><td>useTagName</td><td>用来包裹的节点，默认为<span style="color:red">span</span></td></tr>
	 *  <tr><td>String</td><td>style</td><td>要添加的样式名称</td></tr>
	 *  <tr><td>String</td><td>value</td><td>对应的样式值</td></tr>
	 * </table>
     */
    ns.applyStyle = function(editor, styleConf){
        styleConf.useTagName = styleConf.useTagName || 'span';
        var range = ns.getCurrentRanges(editor.entyWin)[0];

		try {
			editor.entyDoc.normalize();
		} catch(e){}

		if (range.collapsed) {
			var elm = null;
			var startContainer = range.startContainer;
			//注意，最后那个不是空字符串。是一个0宽度的空格
			if (startContainer.nodeType === SinaEditor.NODETYPE.ELEMENT //&& startContainer.tagName.toUpperCase() === styleConf['useTagName'].toUpperCase() 
			&&
			startContainer.tagName.toUpperCase() === styleConf.useTagName.toUpperCase() &&
			startContainer.innerHTML === '​') {
				//重复的选取
				elm = startContainer;
			}
			else {
				//elm = domUtil.createDom(styleConf['useTagName'], {
				elm = domUtil.createDom(styleConf.useTagName, {
					'ownerDocument': editor.entyDoc
				});
				elm.innerHTML = '&#x200b;';
				range.insertNode(elm);
			}
			
			//if (styleConf['style']) {
			if (styleConf.style) {
				//elm.style[styleConf['style']] = styleConf['value'];
				elm.style[styleConf.style] = styleConf.value;
			}
			range.selectNodeContents(elm);
			range.collapse(false);
			ns.applyRanges(editor.entyWin, range);
			editor.focus();
			return;
		}

		var marks = _createBookmark(editor, {
            'range': range
        });
		
		//拆分块状元素，判断放在了函数里
        if(marks.end){
			marks.end = _breakParent.call(editor, marks.end);
		}
        marks.start = _breakParent.call(editor, marks.start);
		
        //if (range.toString()) {
            //在多行情况下，firefox有可能会选上结尾的br节点
            _getNextNode(marks.start, marks.end, function(currEle){
                if (currEle.nodeType == 3 && currEle.data) {
                    currEle = _handleTextSelected(editor, currEle, {
						'useTagName': styleConf.useTagName.toUpperCase(),
                        'style': styleConf.style,
                        'value': styleConf.value
//                        'useTagName': styleConf['useTagName'].toUpperCase(),
//                        'style': styleConf['style'],
//                        'value': styleConf['value']
                    });
                }
                else 
                    if (currEle.nodeType == 1 && (currEle.textContent || currEle.innerText)) {
                        if (!SinaEditor.RANGE.SKIPTAGS[currEle.tagName.toUpperCase()]) {
                            currEle = _handleElementSelected(editor, currEle, {
								'useTagName': styleConf.useTagName.toUpperCase(),
                                'style': styleConf.style,
                                'value': styleConf.value
//                                'useTagName': styleConf['useTagName'].toUpperCase(),
//                                'style': styleConf['style'],
//                                'value': styleConf['value']
                            });
                        }
                    }
            });
        //}
		
		if (marks.end) {
            range.setEndBefore(marks.end);
            marks.end.parentNode.removeChild(marks.end);
        }
        
        range.setStartAfter(marks.start);
        marks.start.parentNode.removeChild(marks.start);
        
        ns.applyRanges(editor.entyWin, range);
		editor.focus();
    };
	
	/**
	 * 查询当前的选取内容编辑状态，可通过{@link SinaEditor.range.regQueryCommandState}来注册自定义的状态查询。
	 * @function
     * @name SinaEditor.range.queryCommandState
	 * @param {Object} doc 要查询状态的 document对象
	 * @param {String} queryStr 要查询的状态，可以参见<a href="http://msdn.microsoft.com/en-us/library/ms533049(v=vs.85).aspx" target="_blank">这里</a>
	 * @return {Boolean} 是否应用于此状态
	 */
	ns.queryCommandState = function(doc,queryStr) {
		if(!queryStr) {
			return false;
		}
		
		queryStr = queryStr.toLowerCase();
		
		if(_queryStateArr[queryStr]) {
			return _queryStateArr[queryStr](ns.getReferNode(doc.defaultView || doc.parentWindow));
		}
		
		return doc.queryCommandState(queryStr);
	};
	
	/**
	 * 注册自定义的查询编辑状态，通过此方法注册后，可以通过{@link SinaEditor.range.regQueryCommandState}来判断当前range的编辑状态。
	 * @function
     * @name SinaEditor.range.regQueryCommandState
	 * @param {String} queryStr 自定义的编辑状态
	 * @param {Function} callback 当执行{@link SinaEditor.range.regQueryCommandState}时的查询回调，会传递参照node进入函数，需要返回boolean类型的值来确定状态是否被应用。
	 */
	ns.regQueryCommandState = function(queryStr,callback) {
		
		queryStr = queryStr.toLowerCase();
		
		if(_queryStateArr[queryStr]) {
			return;
		}
		
		_queryStateArr[queryStr] = callback;
	};
    
    /**
     * 使样式失效,用于移除标签或者删除式:
     * <ol>
     * 	<li>
     * 		当range闭合时，不做任何操作。
     *  </li>
     *  <li>
     *  	当range选取了内容后，会在选区的头部和尾部做标记。使用深度优先算法遍历range内的节点，逐一的遍历，删除样式或者节点。
     *  </li>
     * </ol>
     * @function
     * @name SinaEditor.range.removeStyle
     * @param {Object} editor 要执行的编辑器对象
     * @param {Object} styleConf 样式的配置，以下为需要的参数：<br>
     * <table class="summaryTable">
	 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 *  <tr><td>String</td><td>useTagName</td><td>要删除的节点或者此节点的样式，默认为<span style="color:red">span</span></td></tr>
	 *  <tr><td>String|Array</td><td>style</td><td>要删除的样式名称或者名称列表。若无此值传递，则会删除该节点。</td></tr>
	 * </table>
     * @param {Boolean} noBreak 是否拆分块状元素，默认为不拆分。
     */
    ns.removeStyle = function(editor, styleConf,noBreak){
        styleConf.useTagName = styleConf.useTagName || 'span';
		var refTags = {};
		if(typeof styleConf.useTagName === 'string') {
			refTags[styleConf.useTagName.toUpperCase()] = '1';
		} else {
			var i;
			for(i=0; styleConf.useTagName[i]; i++) {
				refTags[styleConf.useTagName[i].toUpperCase()] = '1';
			}
		}
        var range = ns.getCurrentRanges(editor.entyWin)[0];
        
        //此方法仅针对于有选区的情况，没有选区就不做任何处理了
        if (range.collapsed) {
			editor.focus();
            return;
        }
        var marks = _createBookmark(editor, {
            'range': range
        });
        
        //if (range.toString()) {
			try {
				editor.entyDoc.normalize();
			} catch(e){}
			
			if(!noBreak) {
				//拆分块状元素，判断放在了函数里
                marks.end = _breakParent.call(editor, marks.end);
                marks.start = _breakParent.call(editor, marks.start);
			}
            
            _getNextNode(marks.start, marks.end, function(currEle){
                //如果是对应的节点
                if (currEle.nodeType === SinaEditor.NODETYPE.ELEMENT 
						&& refTags[currEle.tagName.toUpperCase()]) {
                    if(styleConf.style) {
						var len = SinaEditor.util.dom.removeStyle(currEle,styleConf.style);
						//没有样式，这个节点也可以去掉了
						if(len === 0) {
							domUtil.removeTag(currEle);
						}
					} else {
						domUtil.removeTag(currEle);
					}
                }
            });
			
            if (marks.end) {
                range.setEndBefore(marks.end);
                marks.end.parentNode.removeChild(marks.end);
            }
            
            range.setStartAfter(marks.start);
            marks.start.parentNode.removeChild(marks.start);
            
            ns.applyRanges(editor.entyWin, range);
			
			editor.focus();
        //}
    };
    
    /**
     * 深度优先遍历节点
     * @param {Object} begin 起始节点，肯定是BOOKMARK的起始点
     * @param {Object} end 结束节点，BOOKMARK的结束点
     * @param {Function} func 回调函数
     */
    var _getNextNode = function(begin, end, callBack){
        var current = __getNextElement(begin, true);
		//debugger;
        while (current && current != end) {
            //保留第一个元素，当它被摧毁时(如删除这个标签)，可以依然找到下一个节点
            var handleEle = current;
            current = __getNextElement(current);
			if(handleEle.nodeType === SinaEditor.NODETYPE.TEXT || (handleEle.nodeType === SinaEditor.NODETYPE.ELEMENT && !SinaEditor.util.dom.containsNode(handleEle,end))) {
				callBack(handleEle);
			}
        }
    };
    
    /**
     * 获得下一个可用的节点
     * 1.有子节点。返回第一个子节点。
     * 2.无子节点：
     * 	a.有下一个兄弟节点。返回下一个兄弟节点。
     * 	b.无下一个兄弟节点。向上到父节点，再进行判断。
     * @param {Object} elm 当前节点
     * @return {Element} 下一个可用的节点，出现问题直接抛出异常
     */
    var __getNextElement = function(elm, skipChildren){
        //首先检测是不是有子节点
        if (elm.hasChildNodes() && !skipChildren) {
            var firstEl = elm.firstChild;
            if (firstEl) {
                return firstEl;
            }
        }
        //查找兄弟节点
        var nextEl = elm.nextSibling;
        while (!nextEl) {
            nextEl = elm.parentNode;
            //父节点肯定有tagName
			if (nextEl.tagName.toUpperCase() == 'HTML') {
                //到达了最高级
                throw '确定在遍历节点时有结束标记的节点?';
            }
            //鸡肋
            elm = nextEl;
            nextEl = elm.nextSibling;
        }
        return nextEl;
    };
    
    /**
     * 创建一个包裹(自身不在内的)range的标记
     * @param {Object} opts
     * @return {Object} start : 开始位置 end : 结束位置
     */
    var _createBookmark = function(editor, opts){
        opts = opts || {};
        var spanHead,
			spanEnd,
			clone;
        spanHead = domUtil.createDom('span', {
            'ownerDocument': editor.entyDoc,
            properties: {
				'id':'start',
                'innerHTML': '&nbsp;'
				//调试的时候开启
				//'innerHTML': '开始'
            },
            attributies: {
                '_se_mark': 1
            }
        });
        //spanHead.style.display = 'none';
		spanHead.style.color = '#FF0000';
        
        opts.range = opts.range || _createRange(editor);
    
        //有选中
        spanEnd = domUtil.createDom('span', {
            'ownerDocument': editor.entyDoc,
            properties: {
				'id':'end',
                'innerHTML': '&nbsp;'
				//调试的时候开启
				//'innerHTML': '结束'
            },
            attributies: {
                '_se_mark': 2
            }
        });
        //spanEnd.style.display = 'none';
		spanEnd.style.color = '#FF0000';
		
		if(!opts.range._document) {
			clone = opts.range.cloneRange();
            clone.collapse(false);
			clone.insertNode(spanEnd);
			clone = opts.range.cloneRange();
	        clone.collapse(true);
	        clone.insertNode(spanHead);
		} else {
			//去掉节点后会选不对
			var start = opts.range.startContainer,
				startN = opts.range.startOffset,
				end = opts.range.endContainer,
				endN = opts.range.endOffset,
				refA = opts.range.__getRefA(),
				refEnd = end.nodeType === SinaEditor.NODETYPE.ELEMENT ? end.childNodes[endN] : null,
				refStart = start.nodeType === SinaEditor.NODETYPE.ELEMENT ? start.childNodes[startN] : null,prev;

			clone = opts.range.cloneRange();
            clone.collapse(false);
            clone.insertNode(spanEnd);
			
			//end要做一次修正，有可能出现：
			//<ul><li></li><span id="end"></span></ul>的情况。
			prev = spanEnd.previousSibling;
			
			if(prev && prev.tagName && 'LI OL'.indexOf(prev.tagName.toUpperCase() != -1)) {
				prev.appendChild(spanEnd);
			}
				
			if(refStart) {
				//DOM节点
				start.insertBefore(spanHead,refStart);
			} else {
				//文本节点
				clone = opts.range.cloneRange();
		        clone.collapse(true);
		        clone.insertNode(spanHead);
			}
		}
    
        opts.range.setStartAfter(spanHead);
        opts.range.setEndBefore(spanEnd);
        
        ns.applyRanges(editor.entyWin, opts.range);
        
        return {
            start: spanHead,
            end: spanEnd
        };
    };
    
    /**
     * 自己是非块级元素，父元素也是非块级元素,那么就得把它拆开,修改自：
     * CKEDITOR.dom.element.breakParent方法.
     * @param {Object} child 子节点,以它作为标杆，一般是标签节点
     * @return {Boolean} 是否进行了移除操作.
     */
    var _breakParent = function(child){
    
        var parent = domUtil.getBlockParent(child);
        if (!parent) {
            //父元素就是块状元素，没有必要拆分
            return child;
        }
        
        var range = _createRange(this);
		if(range._range) {
			//extractContents会严重导致startContainer或者endContainer丢失，但又不能及时更新通知
			//非常讨厌的textRange,当没有节点包裹时，标签节点也不会被包围住。所以得再套上一层。
			//bug:<strong>ab|cde|fg</strong> -> 去加粗操作，失败。
			//debugger;
			var doc = parent.document,
				rRange = range._range,
				pPar = parent.parentNode,
				cPar = child.parentNode,
				sRef = range.__getRefA(),
				sRef2 = range.__getRefA(),
				eRef = range.__getRefA(),
				eRef2 = range.__getRefA(),
				refNode = range.__getRefA(),
				dupMove = rRange.duplicate(),
				dupRef = rRange.duplicate(),
				frage = parent.document.createDocumentFragment(),
				tmp = doc.createElement('div'),refID;
				
			sRef.id = 'refStart';
			eRef.id = 'refEnd';
			refNode.id = 'refNode';

			if(child.id === 'start') {
				//开始部分
				pPar.insertBefore(sRef,parent);
				cPar.insertBefore(eRef,child);
				refID = 'start';
				
				sRef.parentNode.insertBefore(sRef2,sRef);
				range.__insertAfter(eRef2,eRef);
				
				sRef2.parentNode.insertBefore(refNode,sRef2);
			} else {
				//结束部分
				range.__insertAfter(sRef,child,cPar);
				range.__insertAfter(eRef,parent,pPar);
				refID = 'end';
				
				sRef.parentNode.insertBefore(sRef2,sRef);
				range.__insertAfter(eRef2,eRef);
				
				range.__insertAfter(refNode,eRef2);
			}
			
			dupRef.moveToElementText(sRef2);
			dupMove.moveToElementText(sRef2);
			dupRef.setEndPoint('StartToEnd',dupMove);
			dupMove.moveToElementText(eRef2);
			dupRef.setEndPoint('EndToStart',dupMove);
			
			sRef.parentNode.removeChild(sRef2);
			eRef.parentNode.removeChild(eRef2);
			
			tmp.innerHTML = dupRef.htmlText;
			frage.appendChild(tmp);
			while(tmp.childNodes[0]) {
				frage.appendChild(tmp.childNodes[0]);
			}
			frage.removeChild(tmp);
			dupRef.pasteHTML('');
			refNode.parentNode.insertBefore(frage,refNode);
			refNode.parentNode.removeChild(refNode);
			
			sRef = doc.getElementById('refStart');
			sRef.parentNode.removeChild(sRef);
			eRef = doc.getElementById('refEnd');
			eRef.parentNode.removeChild(eRef);
			
			if (refID === 'start') {
				//开始部分
				pPar.insertBefore(child,child.parentNode);
			} else {
				//结束部分
				range.__insertAfter(child,child.parentNode);
			}
			
			//修复Container和Offset
			range._refreshAll();
			
			return doc.getElementById(refID);
		}
        // We'll be extracting part of this element, so let's use our
        // range to get the correct piece.
        range.setStartAfter(child);
        range.setEndAfter(parent);
        // Extract it.
        var docFrag = range.extractContents();
        // Move the element outside the broken element.
        range.insertNode(domUtil.delElement(child));
        // Re-insert the extracted piece after the element.
        domUtil.insertAfter(docFrag, child);
		
		return child;
    };
    
    /**
     * 应用样式时调用，当遍历到textnode时执行的回调。
     * @param {Object} editor 对应的编辑器
     * @param {Object} element 遍历到的节点对象。是textnode
     * @param {Object} conf 配置信息可以参阅{@link SinaEditor.range.applyStyle}的styleConf参数
     */
    function _handleTextSelected(editor, element, conf){
        //var range = _createRange(editor);
        //var span = domUtil.createDom(conf['useTagName'], {
		var span = domUtil.createDom(conf.useTagName, {
            'ownerDocument': editor.entyDoc
        });
        //if (conf['style']) {
		if (conf.style) {
            //span.style[conf['style']] = conf['value'];
			span.style[conf.style] = conf.value;
        }
        var parent = element.parentNode;
        
        //if (parent.tagName.toUpperCase() == conf['useTagName']) {
		if (parent.tagName.toUpperCase() === conf.useTagName) {
            console.log("它的父节点是span!");
            if (SinaEditor.util.trim(parent.textContent || parent.innerText) != SinaEditor.util.trim(element.data)) {
                //range.selectNode(element);
                //range.surroundContents(span);
				element.parentNode.insertBefore(span,element);
				span.appendChild(element);
                return span;
            }
            //if (conf['style']) {
			if (conf.style) {
                //parent.style[conf['style']] = conf['value'];
				parent.style[conf.style] = conf.value;
            }
            return parent;
        }
        if (parent.tagName.toUpperCase() == 'BODY') {
            console.log("它的父节点是Body!");
            //range.selectNode(element);
            //range.surroundContents(span);
			element.parentNode.insertBefore(span,element);
			span.appendChild(element);
            return span;
        }
        else {
            //如果不是span，需要确认是什么标签,块级标签和非块级的就得分开进行
            if (SinaEditor.RANGE.BLOCKTAGS[element.parentNode.tagName.toUpperCase()]) {
                console.log("是块状标签");
                //块状，把span套在里面
                //range.selectNode(element);
	            //range.surroundContents(span);
				element.parentNode.insertBefore(span,element);
				span.appendChild(element);
                return span;
            }
            else {
                console.log("非块状标签");
                var pParent = parent.parentNode;
                //父节点是否是span
                //if (pParent && pParent.nodeType == 1 && pParent.tagName.toUpperCase() == conf['useTagName']) {
				if (pParent && pParent.nodeType === SinaEditor.NODETYPE.ELEMENT 
					&& pParent.tagName.toUpperCase() == conf.useTagName) {
                    console.log("它的父节点的父节点是span");
                    if (SinaEditor.util.trim(parent.textContent || parent.innerText) == SinaEditor.util.trim(element.data)) {
                        //if (conf['style']) {
						if (conf.style) {
                            //pParent.style[conf['style']] = conf['value'];
							pParent.style[conf.style] = conf.value;
                        }
                        return pParent;
                    }
                    else {
                        //range.selectNode(element);
			            //range.surroundContents(span);
						element.parentNode.insertBefore(span,element);
						span.appendChild(element);
                        return span;
                    }
                }
                else {
                    console.log("它的父节点的父节点不是span，是:");
                    console.log(pParent);
					element.parentNode.insertBefore(span,element);
                    if (SinaEditor.util.trim(parent.textContent || parent.innerText) == SinaEditor.util.trim(element.data)) {
                        //全部选中
                        //range.selectNode(parent);
						parent.parentNode.insertBefore(span,parent);
						span.appendChild(parent);
                    }
                    else {
                        //部分选中
                        //range.selectNode(element);
						element.parentNode.insertBefore(span,element);
						span.appendChild(element);
                    }
                    //range.surroundContents(span);
                    return span;
                }
            }
        }
    }
    
    /**
     * 应用样式时调用，当遍历到DOM时执行的回调。
     * @param {Object} editor 对应的编辑器
     * @param {Object} element 遍历到的节点对象。是DOM
     * @param {Object} conf 配置信息可以参阅{@link SinaEditor.range.applyStyle}的styleConf参数
     */
    function _handleElementSelected(editor, element, conf){
        //是一个DOM节点,可能还有DOM节点在里面!小心
        console.log('是一个DOM节点');
        console.log(element);
        if (SinaEditor.RANGE.SKIPTAGS[element.tagName.toUpperCase()]) {
            return element;
        }
        var retEle = element;
        var range = _createRange(editor);
        //var span = domUtil.createDom(conf['useTagName'], {
		var span = domUtil.createDom(conf.useTagName, {
            'ownerDocument': editor.entyDoc
        });
        //if (conf['style']) {
		if (conf.style) {
            //span.style[conf['style']] = conf['value'];
			span.style[conf.style] = conf.value;
        }
        var eles = domUtil.getChildren(element, {
            'all': true,
            'onlyElement': true
        });
        //暂时先关闭
        //            for (var i = 0; eles[i]; i++) {
        //                this.clearStyle(eles[i], 'font-size');
        //            }

        //if (element.tagName.toUpperCase() == 'SPAN') {
		if (element.tagName.toUpperCase() === conf.useTagName) {
            console.log("是span");
            var arr = domUtil.getChildren(element, {
                'all': true,
                'onlyElement': true
            });
            var num = 0;
            while (arr[num]) {
                //if (arr[num].tagName.toUpperCase() == conf['useTagName'] && !arr[num].style.cssText) {
				if (arr[num].tagName.toUpperCase() === conf.useTagName 
						&& !arr[num].style.cssText) {
                    var tmpRange = _createRange(editor);
                    tmpRange.selectNode(arr[num]);
                    var txtNode = editor.entyDoc.createTextNode(tmpRange.extractContents().textContent);
                    tmpRange.insertNode(txtNode);
                    tmpRange.detach();
                }
                num++;
            }
            //if (conf['style']) {
			if (conf.style) {
                //element.style[conf['style']] = conf['value'];
				element.style[conf.style] = conf.value;
            }
        }
        else {
            //是块状标签?
            if (SinaEditor.RANGE.BLOCKTAGS[element.tagName.toUpperCase()]) {
                console.log("是块状标签");
                //只有一个子节点?
                var children = element.childNodes;
                //if (children.length == 1 && children[0].nodeType == 1 && children[0].tagName.toUpperCase() == conf['useTagName']) {
				if (children.length === 1 && children[0].nodeType == SinaEditor.NODETYPE.ELEMENT 
					&& children[0].tagName.toUpperCase() == conf.useTagName) {
                    console.log("只有一个子节点,且为span");
                    //if (conf['style']) {
					if (conf.style) {
                        //children[0].style[conf['style']] = conf['value'];
						children[0].style[conf.style] = conf.value;
                    }
                }
                else {
                    console.log("无子节点或子节点不是span标签");
					element.insertBefore(span,children[0]);
					while(children[1]) {
						span.appendChild(children[1]);
					}
					retEle = span;
                }
            }
            else {
                console.log("非块状标签");
                //有无父节点
                var parent = element.parentNode;
                //if (parent && parent.tagName.toUpperCase() == conf['useTagName']) {
				if (parent && parent.tagName.toUpperCase() == conf.useTagName) {
                    console.log("有父节点且是span");
                    //if (conf['style']) {
					if (conf.style) {
                        //parent.style[conf['style']] = conf['value'];
						parent.style[conf.style] = conf.value;
                    }
                    retEle = parent;
                }
                else {
                    console.log("无父节点或不是span标签");
					parent.insertBefore(span,element);
					span.appendChild(element);
                    retEle = span;
                }
            }
        }
        return retEle;
    }
});

/**
 * 键盘ctrl+b的监听，监听在keydown上,可通过SinaEditor.ev.add(editor, "ctrlb", callback)来绑定。
 * 自定义的事件即可使用这样的格式绑定。
 * @name ctrlb
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.ctrlb = function(editor) {
	return [{
	    'enty' : editor.entyDoc,
		'events' : {
			'keydown': function(e){
				if(e.ctrlKey && e.keyCode == 66) {
					SinaEditor.ev.stopEvent(e);
					SinaEditor.ev.fire(editor, 'ctrlb');
				}
		    }
		}
	}];
};
/**
 * 键盘ctrl+i的监听，监听在keydown上,可通过SinaEditor.ev.add(editor, "ctrli", callback)来绑定。
 * 自定义的事件即可使用这样的格式绑定。
 * @name ctrli
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.ctrli = function(editor) {
	return [{
	    'enty' : editor.entyDoc,
		'events' : {
			'keydown': function(e){
				if(e.ctrlKey && e.keyCode == 73) {
					SinaEditor.ev.stopEvent(e);
					SinaEditor.ev.fire(editor, 'ctrli');
				}
		    }
		}
	}];
};
/**
 * 键盘ctrl+s的监听，监听在keydown上,可通过SinaEditor.ev.add(editor, "ctrls", callback)来绑定。
 * 自定义的事件即可使用这样的格式绑定。
 * @name ctrls
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.ctrls = function(editor) {
	return [{
	    'enty' : editor.entyDoc,
		'events' : {
			'keydown': function(e){
				if(e.ctrlKey && e.keyCode == 83) {
					SinaEditor.ev.stopEvent(e);
					SinaEditor.ev.fire(editor, 'ctrls');
				}
		    }
		}
	}];
};
/**
 * 键盘ctrl+y的监听，监听在keydown上,可通过SinaEditor.ev.add(editor, "ctrly", callback)来绑定。
 * 自定义的事件即可使用这样的格式绑定。
 * @name ctrly
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.ctrly = function(editor) {
	return [{
	    'enty' : editor.entyDoc,
		'events' : {
			'keydown': function(e){
				if(e.ctrlKey && e.keyCode == 89) {
					SinaEditor.ev.stopEvent(e);
					SinaEditor.ev.fire(editor, 'ctrly');
				}
		    }
		}
	}];
};
/**
 * 键盘ctrl+z的监听，监听在keydown上,可通过SinaEditor.ev.add(editor, "ctrlz", callback)来绑定。
 * 自定义的事件即可使用这样的格式绑定。
 * @name ctrlz
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.ctrlz = function(editor) {
	return [{
	    'enty' : editor.entyDoc,
		'events' : {
			'keydown': function(e){
				if(e.ctrlKey && e.keyCode == 90) {
					SinaEditor.ev.stopEvent(e);
					SinaEditor.ev.fire(editor, 'ctrlz');
				}
		    }
		}
	}];
};
/**
 * 是否出现了选区。
 * @name editorHasSelection
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.editorHasSelection = function(editor) {
	function doo() {
		editor.entyWin.clearTimeout(editor._.editorHasSelectionBufferTimmer);
        editor._.editorHasSelectionBufferTimmer = editor.entyWin.setTimeout(function(){
            console.log("空闲1秒检测");
            var ranges = SinaEditor.range.getCurrentRanges(editor.entyWin);
			var i;
			for(i=0; ranges[i]; i++) {
				if(!ranges[i].collapsed) {
					console.log('出现了选区');
					return;
				}
			}
			console.log('没有选区');
        }, 1000);
	}
	
	/*
	return [{
	    'enty' : editor.entyDoc,
		'events' : {
			'mouseup' : doo,
			'keyup' : doo
		}
	}];
	*/
};
/**
 * 当编辑器的插件加载完毕后，触发此事件。
 * @name editorHasSelection
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.editorOnladed = function(editor) {};
/**
 * 选区改变事件的监听。
 * 当光标位置改变以后，如果400毫秒以后光标没有发生变化，则以此选区和当前选区进行比较，不一样，则触发editorSelectionChange事件。
 * @name editorSelectionChange
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.editorSelectionChange = function(editor){
	var _listener = function(e){
		SinaEditor.ev.stopEvent(e);
	    editor.entyWin.clearTimeout(editor._.editorHasSelectionBufferTimmer);
	    editor._.editorHasSelectionBufferTimmer = editor.entyWin.setTimeout(function(){
            //虽然可以多选，但是只检测第一个
            var ranges = SinaEditor.range.getCurrentRanges(editor.entyWin);
            var current0 = ranges[0];
            var old0;
            
            if (!editor._.oldRange) {
				console.log('两个range不相等');
                _handleEvent.call(editor, e, current0);
            }
            else {
                old0 = editor._.oldRange[0];
                if (current0 || old0) {
                    if (SinaEditor.range.compareBoundaryPoints(current0, old0) !== 0) {
						console.log('两个range不相等');
                        _handleEvent.call(editor, e, current0);
                    }
                }
            }
            editor._.oldRange = ranges;
        }, 400);
		return false;
    };
    
    var _handleEvent = function(e, range){
        e = SinaEditor.ev.fixEvent(e);
        SinaEditor.ev.fire(editor, 'editorSelectionChange', {
            'args': [range, SinaEditor.range.getReferNode(this.entyWin, range)]
        });
    };

    return [{
        'enty': editor.entyDoc,
        'events': {
            'mouseup': _listener,
            'keyup': _listener
        }
    }];
};

/**
 * 编辑器的编辑状态改变的时候触发
 * @name editorStateChange
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.editorStateChange = function(editor) {
};
/**
 * 当出发了撤销和重做后，产生的一个回调
 * @name redoAndUndoChanged
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.redoAndUndoChanged = function(editor) {};
//基础的弹出浮层
/**
 * @namespace
 */
if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

//弹出提示
/**
 * 基础的弹出浮层。仅作为扩展用，不建议直接用于创建浮层实例。<br>
 * 如果需要扩展弹出的浮层，您可以考虑继承自它。<br>
 * 在创建时，它会生成一个隐藏的div节点作为浮层宿主，并添加到body上。<br>
 * 已知的子类实现：<br>
 * {@link SinaEditor.$abstract.BaseBubbleImpl}<br>
 * @class 基础的弹出浮层
 * @namespace SinaEditor.$abstract
 */
SinaEditor.$abstract.$BaseBubble = function(){
    this.enbad = SinaEditor.util.dom.createDom('div');
    this.enbad.style.display = 'none';
    var me = this;
	if(document.body) {
		//属于后加载。
		document.body.appendChild(me.enbad);
	} else {
		SinaEditor.ev.add(window, 'load', function(e){
	        document.body.appendChild(me.enbad);
	    });
	}
}
.$define({
	/**
	 * 定位浮层位置，<b>注意，这个方法并不包含显示或者隐藏的逻辑，仅仅是定位</b>。
	 * 它会忽略掉元素的padding，margin，border的值，以避免定位不准确。
	 * @memberOf SinaEditor.$abstract.$BaseBubble#
	 * @param {Element | String} content 节点或者HTML文本 
	 * @param {Object} option 可选参数，有以下参数：<br>
	 * <table class="summaryTable">
	 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 *  <tr><td>int</td><td>x<span style="color:red">(必要参数)</span></td><td>显示的X坐标位置</td></tr>
	 *  <tr><td>int</td><td>y<span style="color:red">(必要参数)</span></td><td>显示的Y坐标位置</td></tr>
	 * </table>
	 * @return {Element} 返回宿主节点。
	 */
    showBubble: function(content, option){
        if (typeof content == 'string') {
            this.enbad.innerHTML = content;
        }
        else {
            this.enbad.appendChild(content);
        }
        this.enbad.style.left = option.x + 'px';
        var dy = SinaEditor.util.dom.styleInteger(this.enbad, 'paddingTop') 
				+ SinaEditor.util.dom.styleInteger(this.enbad, 'paddingBottom') 
				+ SinaEditor.util.dom.styleInteger(this.enbad, 'marginTop') 
				+ SinaEditor.util.dom.styleInteger(this.enbad, 'marginBottom')
				+ SinaEditor.util.dom.styleInteger(this.enbad, 'borderTopWidth')
				+ SinaEditor.util.dom.styleInteger(this.enbad, 'borderBottomWidth');
        this.enbad.style.top = (option.y - dy) +'px';
		return this;
    },
	/**
	 * 隐藏浮层，<b>注意，这个方法会清掉宿主节点内的所有HTML代码，并影藏宿主</b>。
	 * @memberOf SinaEditor.$abstract.$BaseBubble#
	 * @return {Element} 返回宿主节点。
	 */
    hiddenBubble: function(){
        this.enbad.style.display = 'none';
        this.enbad.innerHTML = '';
		return this;
    },
	/**
	 * 即document.getElementById
	 * @memberOf SinaEditor.$abstract.$BaseBubble#
	 * @param {String} id 要查找的对象ID。
	 * @return {Element} 要查找的对象。
	 */
	id : function(id) {
		return this.enbad.ownerDocument.getElementById(id);
	}
});
//基础的按钮形态

if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

//1.不同时期展现不同的样式
/**
 * 编辑器按钮的基础类，并没有实现具体的节点展现，仅实现了状态转换的逻辑。建议按钮的实现可以基于此类。<br>
 * 按钮实现四种状态：<br>
 * 1.可用状态<br>
 * 2.不可用状态<br>
 * 3.鼠标移上去(这个分为不可以移上去还是可用移上去)<br>
 * 4.已使用状态<br>
 * @param {Object} option 一些配置参数信息。<br>
 * 包含以下可选参数:<br>
 * <table class="summaryTable">
 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
 * 	<tr>
 * 		<td>int</td>
 * 		<td>setState</td>
 * 		<td>
 * 			初始化后的按钮状态,目前有以下三种：<br>
 * 			<ul>
 * 				<li>SinaEditor.BUTTONSTATE.NORMAL，可用状态，值为1;</li>
 * 				<li>SinaEditor.BUTTONSTATE.DISABLED，不可用状态，值为2;</li>
 * 				<li>SinaEditor.BUTTONSTATE.CLICKED，按下状态，抑或是鼠标悬停在上面的状态，值为3;</li>
 * 			</ul>
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Object</td>
 * 		<td>editorChangeType</td>
 * 		<td>
 * 			按钮的改变状态定义。默认为'default'(可以参阅/core/iniy/default.js中的js配置)
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>function</td>
 * 		<td>init</td>
 * 		<td>
 * 			在初始化按钮时候执行的回调代码。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>Array</td>
 * 		<td>events</td>
 * 		<td>
 * 			还需要再绑定的扩展事件，形如:[{事件名称:对应回调函数},{事件名称:对应回调函数}]。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>Boolean</td>
 * 		<td>unselected</td>
 * 		<td>
 * 			是否可以选中图标。默认为true。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>Boolean</td>
 * 		<td>noEvent</td>
 * 		<td>
 * 			是否需要绑定事件。默认为false。
 * 			当noEvent为true时，调用setState时不触发按钮样式的改变和按钮状态改变的回调。
 * 			当noEvent为false时，调用setState时触发按钮样式的改变和按钮状态改变的回调。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>normalClass</td>
 * 		<td>
 * 			按钮通常状态下的样式名。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>disabledClass</td>
 * 		<td>
 * 			按钮不可点击状态下的样式名。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>clickedClass</td>
 * 		<td>
 * 			按钮按下的样式名。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>mouseoverClass</td>
 * 		<td>
 * 			鼠标悬停后的样式名，包含该方法会绑定<span style="color:red">mouseover、mouseout</span>事件。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>function</td>
 * 		<td>normal</td>
 * 		<td>
 * 			按钮切换到通常状态下的回调函数。传递当前按钮实体dom节点。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>disabled</td>
 * 		<td>
 * 			按钮切换到不可点击状态下的回调函数。传递当前按钮实体dom节点。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>clicked</td>
 * 		<td>
 * 			按钮切换到按下状态的回调函数。传递当前按钮实体dom节点。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>mouseover</td>
 * 		<td>
 * 			按钮切换到鼠标移上去的状态的回调函数。传递当前按钮实体dom节点。
 * 		</td>
 * 	</tr>
 * </table>
 * @param {Object} editor 按钮作用的编辑器对象。 
 * @class 编辑器按钮的基础类
 * @namespace SinaEditor.$abstract
 */
SinaEditor.$abstract.$BaseButton = function(option,editor){
	this.option = option;
	this._customSetStatus = option.setState;
}
.$define({
	/**
	 * 初始化事件的绑定，一般交由实现的类去调用，实体类不会去调用的方法。
	 * @memberOf SinaEditor.$abstract.$BaseButton#
	 * @param {Object} option 初始化传递过来的参数，即初始化类时的可选参数。
	 * @param {Object} editor 按钮作用的编辑器对象。
	 */
	eventInit : function(option,editor){
		var btn = this;
		var type = option.editorChangeType || 'default';
		var i=0;
		
		if(option.init) {
			option.init.call(this);
		}

		if(option.events) {
			for(i=0; option.events[i]; i++) {
				SinaEditor.ev.add(this.$, option.events[i].name, option.events[i].callback);
			}
		}
		//鼠标移上去的效果添加
        if (option.mouseoverClass) {
            var me = this;
            SinaEditor.ev.add(this.$, 'mouseover', function(){
                if (me._state == SinaEditor.BUTTONSTATE.CLICKED) {
                    return;
                }
				if (me._state == SinaEditor.BUTTONSTATE.DISABLED) {
                    return;
                }
                me.$.className = me.option.mouseoverClass;
				if(me.option.mouseover) {
					me.option.mouseover(me.$);
				}
            });
            SinaEditor.ev.add(this.$, 'mouseout', function(){
                me.setState(me._state);
            });
        }
		//是否可以选中
		if(!option.unselected) {
			if(SinaEditor.env.$GENKO) {
				this.$.style.MozUserSelect = 'none';
			} else if(SinaEditor.env.$WEBKIT) {
				this.$.style.WebkitUserSelect = 'none';
			} else {
				this.$.setAttribute('unselectable','on');
			}
		}
        this.setState(option.state || SinaEditor.BUTTONSTATE.NORMAL);
		SinaEditor.ev.add(editor, 'editorStateChange', function() {
			SinaEditor.BUTTON[type].call(this,btn);
		});
	},
	/**
	 * 设置按钮的状态，响应的，也会修改按钮的样式和执行对应样式状态的回调。
	 * @memberOf SinaEditor.$abstract.$BaseButton#
	 * @param {Integer} state 切换到的对应状态。具体值可以参见SinaEditor.BUTTONSTATE下的可选值。
	 */
    setState: function(state){
		this._state = state;
		if(this._customSetStatus) {
			this._customSetStatus.apply(this,arguments);
		}
        var option = this.option;
		if(option.noEvent) {
			return;
		}
        var key,s;
        for (s in SinaEditor.BUTTONSTATE) {
            if (SinaEditor.BUTTONSTATE[s] == state) {
                key = s.toLowerCase();
                this.$.className = option[key + 'Class'];
				if(option[key]) {
					option[key](this.$);
				}
                break;
            }
        }
    },
	/**
	 * 获得按钮的当前状态。
	 * @memberOf SinaEditor.$abstract.$BaseButton#
	 * @return {Integer} 放回的状态值可参见SinaEditor.BUTTONSTATE下的可选值。
	 */
	getState : function() {
		return this._state;
	}
});
if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

/**
 * 提供兼容的存储方法的类。兼容老版本的本地存储及IE的本地存储。
 * 该对象首先查找window中是否有localStorage或者globalStorage，对其进行合并兼容。<a href="https://developer.mozilla.org/en/storage" target="_blank">这里</a>可以查看更多内容
 * 如果都不存在这两个对象，则会判断为IE内核浏览器。创建userData(其中创建了名为'SinaEditor'的文件作为基本存储文件)，并创建标准的接口。<a href="http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx" target="_blank">这里</a>可以查看更多内容
 * @type Object
 * @class Storage
 * @namespace SinaEditor.$abstract
 */
SinaEditor.$abstract.Storage = (function(){
	var proxyObj = {};
	
	//包含的方法：
	/**
	 * 保存对象，map的数据格式保存
	 * @requires SinaEditor.util.o2s 可以直接存入对象，内部会转换成字符串存入。
	 * @memberOf SinaEditor.$abstract.Storage
	 * @param {String} key 要保存数据的key
	 * @param {String | Object} value 要保存的数据
	 * @return {Boolean} 当且仅当存储成功时返回true。
	 */
	var setItem = function(){};
	/**
	 * 返回包含保存内容的长度。
	 * @memberOf SinaEditor.$abstract.Storage
	 * @return {Integer} 返回包含保存内容的长度。
	 */
	var length = function(){};
	/**
	 * 通过索引返回唯一的key。
	 * @requires SinaEditor.util.s2o 由于读取出来的是字符串，需要转换成对象。
	 * @memberOf SinaEditor.$abstract.Storage
	 * @param {Integer} index 以0开始的正整数。
	 * @return {Object} 当要找的索引长度小于内容总长度时返回key，否则返回null
	 */
	var key = function(){};
	/**
	 * 通过指定的key来查找要返回的内容。
	 * @requires SinaEditor.util.s2o 由于读取出来的是字符串，需要转换成对象。
	 * @memberOf SinaEditor.$abstract.Storage
	 * @param {String} key 要查找数据的唯一key
	 * @return {Object} 当且仅当存在次key时返回内容。否则返回null
	 */
	var getItem = function(){};
	/**
	 * 通过指定的key来查找要删除对应的内容。
	 * @memberOf SinaEditor.$abstract.Storage
	 * @param {String} key 要删除内容的唯一key
	 */
	var removeItem = function(){};
	/**
	 * 清除所有的保存的内容。注意，在IE中，仅仅清掉了"SinaEditor"为key的内容。
	 * @requires SinaEditor.util.s2o 由于读取出来的是字符串，需要转换成对象。
	 * @memberOf SinaEditor.$abstract.Storage
	 */
	var clear = function(){};
	
	var saveObj = window.localStorage || (window.globalStorage && globalStorage[location.host]);
	if(saveObj) {
		proxyObj.setItem = function(key,value) {
			try {
				saveObj.setItem(key,SinaEditor.util.o2s(value));
				return true;
			} catch(e) {
				return false;
			}
		};
		proxyObj.length = function() {
			return saveObj.length;
		};
		proxyObj.key = function(index) {
			var str = saveObj.key(index);
			return str ? SinaEditor.util.s2o(str) : str;
		};
		proxyObj.getItem = function(key) {
			var str = saveObj.getItem(key);
			return str ? SinaEditor.util.s2o(str) : str;
		};
		proxyObj.removeItem = function(key) {
			saveObj.removeItem(key);
		};
		proxyObj.clear = function() {
			if(saveObj.clear) {
				saveObj.clear();
			} else {
				while(saveObj.length) {
					proxyObj.removeItem(proxyObj.key(0));
				}
			}
		};
	} else {
		saveObj = document.createElement('div');
		saveObj.addBehavior("#default#userData");
		if(document.body) {
			document.body.appendChild(saveObj);
		} else {
			//在head中引用，body有可能还没有被初始化
			document.getElementsByTagName('head')[0].appendChild(saveObj);
		}
		saveObj.load('SinaEditor');
		
		proxyObj.setItem = function(key,value) {
			try {
				var added = false;
				var tmp = SinaEditor.util.s2o(saveObj.getAttribute('saveObj')) || [];
				var i;
				for(i=0; tmp[i]; i++) {
					if(tmp[i][key]) {
						tmp[i][key] = value;
						added = true;
					}
				}
				
				if(!added) {
					var obj = {};
					obj[key] = value;
					tmp.push(obj);
				}
				
				saveObj.setAttribute('saveObj',SinaEditor.util.o2s(tmp));
				saveObj.save('SinaEditor');
				return true;
			} catch(e) {
				return false;
			}
		};
		proxyObj.length = function() {
			var tmp = SinaEditor.util.s2o(saveObj.getAttribute('saveObj')) || [];
			return tmp.length;
		};
		proxyObj.key = function(index) {
			var tmp = SinaEditor.util.s2o(saveObj.getAttribute('saveObj')) || [];
			if(tmp[index]) {
				var ret;
				for(ret in tmp[index]) {
					return ret;
				}
			}
			return null;
		};
		proxyObj.getItem = function(key) {
			var tmp = SinaEditor.util.s2o(saveObj.getAttribute('saveObj')) || [];
			var i;
			for(i=0; tmp[i]; i++) {
				if(tmp[i][key]) {
					return tmp[i][key];
				}
			}
			return null;
		};
		proxyObj.removeItem = function(key) {
			var tmp = SinaEditor.util.s2o(saveObj.getAttribute('saveObj')) || [];
			var i;
			for(i=0; tmp[i]; i++) {
				if(tmp[i][key]) {
					tmp.splice(i,1);
					saveObj.setAttribute('saveObj',SinaEditor.util.o2s(tmp));
					saveObj.save('SinaEditor');
					return;
				}
			}
		};
		proxyObj.clear = function() {
			saveObj.setAttribute('saveObj',SinaEditor.util.o2s([]));
			saveObj.save('SinaEditor');
		};
	}
	return proxyObj;
})();

/**
 * @namespace
 */
if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

/**
 * 创建模板，模板通常是纯HTML的骨架，填充内容后生成最终的重复HTML代码。<br>
 * 所有要替换的内容用#{唯一ID}作为标记,在传入数据时进行替换。<br>
 * 通过以下实例可以理解它的使用方法：<br>
 * @class 创建模板
 * @param {String} tmpl 模板的骨架
 * @example
 * var tpl = 'this is a #{vo}.';
 * var temp = new SinaEditor.$abstract.Template(tpl);
 * alert(temp.evaluate({'vo':'cat'}));//this is a cat.
 */
SinaEditor.$abstract.Template = function(tmpl){
    this.tmpl = tmpl;
    this.pattern = /(#\{([^\}]+)(?=\})})/g;
};

SinaEditor.$abstract.Template.prototype = {
    /**
     * 通过指定的数据生成最终要渲染的内容。
     * @param {Object} data 渲染模板所需要的数据,对应与模板中需要的数据,形如:{'key':'value'}
     * @return {String} 最终需要的模板
     */
    evaluate: function(data){
        return this.tmpl.replace(this.pattern, function(a, b, c){
            return data[c] || "";
        });
    },
    /**
     * 渲染多条数据的方法
     * @param {Array} data 渲染模板所需要的数据(多条),形如:[{'key':'value1'},{'key':'value2'}]
     * @param {Boolean} opt_reverse	是否进行反向渲染，即第一条被置换到最后一条，依次置换。默认不反向输出。
     * @example
     * var tpl = 'this is a #{vo}.';
     * var temp = new SinaEditor.$abstract.Template(tpl);
     * alert(temp.evaluate([{'vo':'cat'},{'vo':'dog'}]));//this is a cat.this is a dog.
     * @return {String} 最终需要的多条数据模板
     */
    evaluateMulti: function(data, reverse){
        var _buffer = [];
        var __this = this;
        this.__foreach(data, function(v, i){
            i = reverse ? data.length - i : i;
            _buffer[i] = __this.evaluate(v);
        });
        return _buffer.join("");
    },
	/**
	 * @inner 遍历数组
	 * @param {Object} ar
	 * @param {Object} insp
	 */
    __foreach: function(ar, insp){
        if (ar === null && ar.constructor !== Array) {
            return [];
        }
        var i = 0, len = ar.length, r = [];
        while (i < len) {
            var x = insp(ar[i], i);
            if (x !== null) {
                r[r.length] = x;
            }
            i++;
        }
        return r;
    }
};

if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

/**
 * 基本的弹出浮层实体类，继承自{@link SinaEditor.$abstract.$BaseBubble}。<br>
 * 全局配置：<br>
 * SinaEditor.CONF.bubbleStyles {String} 可选的。基础浮层的样式，如果使用动态插入方式的话。<br>
 * SinaEditor.CONF.bubbleClassName {String} 基础浮层的样式名。<br>
 * SinaEditor.baseBubble就是SinaEditor.$abstract.BaseBubbleImpl的一个实例。
 * @namespace SinaEditor.$abstract
 * @class 基础的弹出浮层实现
 * @param styles {String} 可选的，传入的动态样式。
 */
SinaEditor.$abstract.BaseBubbleImpl = function(styles){
    if (styles) {
        SinaEditor.util.dom.addStyles(styles);
    }
    this.enbad.className = SinaEditor.CONF.bubbleClassName;
}.$extends(SinaEditor.$abstract.$BaseBubble).$define({
	/**
	 * 显示浮层，相对于抽象类的对应方法，仅增加了对实体的隐藏后重定位再显示。
	 * @memberOf SinaEditor.$abstract.BaseBubbleImpl#
	 * @param {Object} content
	 * @param {Object} option
	 * @return {Object} 本实体类.
	 */
    showBubble: function(content, option){
		this.enbad.style.display = 'none';
		this.constructor.$super.showBubble.call(this,content, option);
        this.enbad.style.display = '';
		return this;
    },
	/**
	 * 仅实现父类方法。
	 * @memberOf SinaEditor.$abstract.BaseBubbleImpl#
	 */
    hiddenBubble: function(){
        this.constructor.$super.hiddenBubble.call(this);
		return this;
    },
	/**
	 * 仅实现父类方法。
	 * @memberOf SinaEditor.$abstract.BaseBubbleImpl#
	 * @param {Object} id
	 */
	id : function(id) {
		return this.constructor.$super.id.call(this,id);
	}
});
SinaEditor.baseBubble = new SinaEditor.$abstract.BaseBubbleImpl(SinaEditor.CONF.bubbleStyles);

//当绑定多个显示时出现混乱
(function(){
    var tagArr = {};
    var inited = {};
    /**
	 * 具体弹出浮层的调用，依赖于{@link SinaEditor.$abstract.BaseBubbleImpl}。以静态方法的形式作为调用。只需要通过option参数来配置。<br>
	 * 具体的使用，可以参见：<br>
	 * flashBubble、imgBubble、linkBubble。
	 * @namespace SinaEditor.$abstract
	 * @static
	 * @param option {Object} 配置参数，具体配置参数如下：<br>
	 * <table class="summaryTable">
	 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>tagName<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			鼠标选中到哪个节点，弹出此浮层。
	 * 		</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>applyStyles<span style="color:red">(可选的)</span></td>
	 * 		<td>
	 * 			弹出浮层依赖的样式，动态写入，可以参考SinaEditor.CONF.aBubbleStyles。
	 * 		</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<td>function</td>
	 * 		<td>showBubble<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			弹出浮层的回调函数，调用时传递两个参数给此回调：<br>
	 * 			node {Object} 当前选中或者焦点位置，要弹出浮层的节点。
	 * 			editor {Object} 焦点所在的编辑器对象。
	 * 		</td>
	 * 	</tr>
	 * </table>
	 */
    SinaEditor.$abstract.BaseBubblePlugin = function(option){
    
        tagArr[option.tagName.toUpperCase()] = option.showBubble;
        
        return function(args){
			var editor = this;
            
            if (inited[editor.option.id]) {
                return {
                    'initialize': function(){
                    },
                    "events": []
                };
            }
            else {
                inited[editor.option.id] = 1;
                return {
                    'initialize': function(){
                        //if (!args.customCss) {
						if (option.applyStyles) {
                            SinaEditor.util.dom.addStyles(option.applyStyles);
                        }
                    },
                    "events": [{
                        "element": editor.entyDoc,
                        "events": {
                            'mouseup': function(e){
                                e = SinaEditor.ev.fixEvent(e);
                                var node = e.target;
                                if (node.nodeType == 3) {
                                    node = node.parentNode;
                                }
                                while (node && node.tagName) {
                                    if (tagArr[node.tagName.toUpperCase()]) {
										if(node.getAttribute('_se_flash')) {
											//tagArr["FLASH"](node, editor);
											(tagArr.FLASH)(node, editor);
										} else {
											tagArr[node.tagName.toUpperCase()](node, editor);
										}
                                        return;
                                    }
                                    node = node.parentNode;
                                }
                                SinaEditor.baseBubble.hiddenBubble();
                            },'keydown': function(){
                                SinaEditor.baseBubble.hiddenBubble();
                            }
                        }
                    }, {
                        "element": editor.entyWin,
                        "events": {
                            'scroll': function(e){
                                SinaEditor.baseBubble.hiddenBubble();
                            }
                        }
                    }, {
                        "element": editor,
                        "events": {
                            'editorStateChange': function(){
                                if (this.getState() != SinaEditor.STATE.EDITING) {
                                    SinaEditor.baseBubble.hiddenBubble();
                                }
                            }
                        }
                    }]
                };
            }
        };
    };
    
})();

if(!SinaEditor.$abstract) {
	SinaEditor.$abstract = {};
}

//编辑器的基类
/**
 * 基础的编辑器，负责插件的装载。您也可以直接使用SinaEditor.createEditor来创建一个编辑器。它需要以下参数：<br>
 * <table class="summaryTable">
 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
 * 	<tr>
 * 		<td>String</td>
 * 		<td>id<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			当前创建编辑器的ID
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>String|Element</td>
 * 		<td>toolBase<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			编辑器的按钮放置的父节点的base dom id 或者dom
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Object</td>
 * 		<td>initType<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			用哪个插件初始化编辑器，可以参阅{@link initFromStatic}这个插件。接受的格式形如：<br>
 * 			{'name':插件名称,'args':插件需要的参数}。
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Object</td>
 * 		<td>filter<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			当编辑器粘贴入外来内容时，进行的过滤<span style="color:red">(在常见浏览器中，不包含opera的粘贴过滤)</span>。<br>
 * 			或者当编辑器状态从编辑状态切换到显示源代码状态(反之亦然)时，一些特殊节点的过滤。<br>
 * 			可以参阅{@link pasteFilter}这个插件。接受的格式形如：<br>
 * 			{'name':插件名称,'args':插件需要的参数}。
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>String</td>
 * 		<td>editorName<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			用哪个编辑器来初始化。使用类名即可。如：SinaEditor.$abstract.baseEditor，或者SinaEditor._.entyimpl.normalEditor
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>String</td>
 * 		<td>styles<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			编辑器内的样式，动态写入的形式。<br>
 * 			<span style="color:red">注意，像IE这样的浏览器，动态样式不能够包含'@'这样的特殊字符，会导致浏览器的崩溃。</span>
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Array</td>
 * 		<td>styleLinks<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			编辑器内的外链样式数组，可以引入多个样式表。
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Array</td>
 * 		<td>plugns<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			编辑器的插件。形如：<br>
 * 			[{'name':插件名称,'args':插件需要的参数},...]
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>function</td>
 * 		<td>onStart<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			当编辑器开始执行加入插件操作前的回调函数。
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Array</td>
 * 		<td>eventBlackList<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			编辑器不监听的全局自定义事件的列表。
 * 		</td>
 * 	</tr>
 * </table>
 * @namespace SinaEditor.$abstract
 * @class 编辑器的基础类
 * @param {Object} oOption 配置参数，可以参考上表的配置。
 */
SinaEditor.$abstract.baseEditor = function(oOption){
    this._state = SinaEditor.STATE.CREATING;
	/**
	 * 传递进来的参数。
	 */
    this.option = oOption || {};
	this.option.eventBlackList = this.option.eventBlackList || '';
	//编辑器的插件。
    this._jobTable = [];
	//已有插件列表
	this._jobTableIndex = {};
	/**
	 * 实体对象，即编辑器的iframe节点。
	 */
	this.enty = null;
	/**
	 * iframe的window对象引用。
	 */
	this.entyWin = null;
	/**
	 * iframe的document对象引用。
	 */
	this.entyDoc = null;
	/**
	 * iframe的body节点引用。
	 */
	this.entyBody = null;
	/**
	 * 编辑器的textarea节点引用。
	 */
	this.entyArea = null;
	this.hasAddEvent = false;
	/**
	 * 编辑器的所有按钮。
	 */
	this.btns = {};
	/**
	 * 编辑器的所有的浮层。
	 */
	this.panels = {};
	this._ = {};
	this.errorMsg = [];
	/**
	 * 编辑器的所有的操作。
	 */
	this.operation = {};
	//记录可选编辑的操作
	this.operateState = {};
}.$define({
	/**
	 * @inner
	 * @param {Object} sMsg
	 */
    error: function(sMsg){ // 记录错误信息
        console.error(sMsg);
        this.errorMsg.push(sMsg);
    },
    /**
     * 添加插件，但并不会立即执行，当触发start函数时，添加的插件才会执行。
     * @memberOf SinaEditor.$abstract.baseEditor#
     * @param {Object} pluginConf 插件参数。参见：<br>
     * <table class="summaryTable">
     * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>name<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			插件的名称。
	 * 		</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>args<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			插件的参数，这个参数具体视插件参数而定。
	 * 		</td>
	 * 	</tr>
     * </table>
     */
    add: function(pluginConf){
        this._jobTable.push(pluginConf);
    },
	/**
     * 执行注册好的插件。如果需要后注册，可以使用callPlugin，可以在编辑器初始化后继续添加插件。
     * @memberOf SinaEditor.$abstract.baseEditor#
     */
    start: function(){
        if (this.option.onStart) {
            this.option.onStart();
        }
        this.queue(this._jobTable);
    },
    /**
     * 依次执行插件。
     * @inner
     * @param {Object} jobs 插件实体
     * @param {function} callback 执行完毕的回调函数。
     */
    queue: function(jobs, callback){
        var _this = this;
        var joblen = jobs.length;
        var i = 0;
		_this.callPlugin(jobs[i]);
        var interNum = window.setInterval(function(){
			i++;
            if (i >= joblen) {
                clearInterval(interNum);
                interNum = null;
                SinaEditor.ev.fire(_this, 'editorOnladed');
                return;
            }
			if(_this.entyWin) {
				
				if(!_this.hasAddEvent) {
					_this.hasAddEvent = true;
					var ev = null;
					//这里来初始化事件
					for(ev in SinaEditor.ev.customEvent) {
						if(_this.option.eventBlackList.indexOf(ev) < 0) {
							SinaEditor.ev.$regEvent(ev,_this);
						} else {
							console.log(_this.option.id+'在黑名单中：'+ev);
						}
					}
				}
				
				_this.callPlugin(jobs[i]);
				
				_this.setState(SinaEditor.STATE.CREATED);
				_this.setState(SinaEditor.STATE.EDITING);
			} else {
				console.log("等一下");
				i--;
			}
        }, 10);
    },
    /**
     * 单独后执行某个插件。
     * @memberOf SinaEditor.$abstract.baseEditor#
     * @param {Object} pluginConf 插件参数。参见：<br>
     * <table class="summaryTable">
     * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>name<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			插件的名称。
	 * 		</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>args<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			插件的参数，这个参数具体视插件参数而定。
	 * 		</td>
	 * 	</tr>
     * </table>
     */
    callPlugin: function(pluginConf){
		var getTime = function(){
            return new Date().valueOf();
        };
		//var jobObj = SinaEditor.plugins[pluginConf.name].call(this,pluginConf.args || {}) || {};
		var plugnFuc = SinaEditor.plugins.get(pluginConf.name);
		if(!plugnFuc) {
			//console.clear();
			console.log(pluginConf);
			console.log("---------------------------plugin not found:");
			return;
		}
		var jobObj = plugnFuc.call(this,pluginConf.args || {}) || {};
		//var jobObj = SinaEditor.plugins[pluginConf.name](this,pluginConf.args);
		console.log(this.option.id+'添加job:'+pluginConf.name);
        //var job = jobObj['initialize'];
		var job = jobObj.initialize;
		//var jEvents = jobObj['events'];
		var jEvents = jobObj.events;
        if (typeof jobObj == 'undefined') {
            this.error("<b>Job[" + pluginConf.name + "] is undefiend!!!</b>");
            return;
        }
        var _try = true;
        var _start = getTime();
        try {
			if(jEvents) {
				var num = 0;
				for(num=0; jEvents[num]; num++) {
					var eObj = jEvents[num];
					var target = eObj.element;
					//var events = eObj['events'];
					var events = eObj.events;
					var ev = null;
					
					if(!target) {
						console.error('!!!!!+'+ev+'+绑定失败...');
					}
					for(ev in events) {
						console.log(target + '绑定' + ev);
						SinaEditor.ev.add(target , ev , events[ev],{'srcEditor':this});
					}
				}
			}
			if(job) {
				job.call(this);
			}
        } 
        catch (e) {
            this.error("<b>Job[" + pluginConf.name + "] failed!!!</b>" + e.message + "");
//            if (callback != null) {
//                callback();
//            } // 如果任何一个 Job 失败，立即回调 onEnd
            _try = false;
            throw e;
        }
        finally {
            if (_try) {
                var _end = getTime();
                //console.log("<b>Job[" + pluginConf.name + "] done in " + (_end - _start) + "ms.</b>");
            }
        }
    }
	/**
     * 焦点集中到编辑器中。
     * @memberOf SinaEditor.$abstract.baseEditor#
     */
	,focus : function() {
		this.entyWin.focus();
	}
	/**
     * 设置编辑器的状态。设置后，会触发自定义事件editorStateChange。
     * @memberOf SinaEditor.$abstract.baseEditor#
     * @param state {int} 要设置的编辑器的状态可以设置：<br>
     * 编辑器在创建中：SinaEditor.STATE.CREATING或者1;<br>
     * 编辑器在创完毕：SinaEditor.STATE.CREATED或者2;<br>
     * 编辑器处于编辑状态：SinaEditor.STATE.EDITING或者3;<br>
     * 编辑器处于显示源码状态：SinaEditor.STATE.SHOWSOURCE或者4;<br>
     */
	,setState : function(state) {
		this._state = state;
		SinaEditor.ev.fire(this, 'editorStateChange');
	}
	/**
     * 获得编辑器的当前状态。
     * @memberOf SinaEditor.$abstract.baseEditor#
     * @return {int} 返回编辑器的状态，可以参见SinaEditor.STATE下的属性。
     */
	,getState : function() {
		return this._state;
	}
});

/*
 * 创建编辑器。此方法提供编辑器的创建。
 * @param {Object} conf 创建编辑器的配置文件：
 */
SinaEditor.createEditor = function(conf){
    //var job = new (eval('(' + conf['editorName'] + ')'))(conf);
    //var pName = conf['plugns'],i;
    //job.add(conf['initType']);
    //if (conf['filter']) {
    //    job.add(conf['filter']);
    //}
	var job = new (eval('(' + conf.editorName + ')'))(conf);
	var pName = conf.plugns,i;
	job.add(conf.initType);
	if (conf.filter) {
        job.add(conf.filter);
    }
    for (i = 0; pName[i]; i++) {
        job.add(pName[i]);
    }
    job.start();
    return job;
};



if(!SinaEditor.plugins) {
	/**
	 * 编辑器的插件存放位置
	 * @class
	 */
	SinaEditor.plugins = {};
	
	/**
	 * 添加一个编辑器的插件
	 * @param {String} pluginName 插件的名称
	 * @param {function} func 插件的执行函数。
	 */
	SinaEditor.plugins.add = function(pluginName,func) {
		if(!this._pluginObj) {
			this._pluginObj = {};
		}
		this._pluginObj[pluginName] = func;
	};
	/**
	 * 获得指定插件的执行函数。
	 * @param {String} pluginName 查找的插件名称
	 * @return {function} 当且仅当添加了指定的插件时，返回要查询的插件函数，否则为undefined。
	 */
	SinaEditor.plugins.get = function(pluginName) {
		return this._pluginObj[pluginName];
	};
}


if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

//一些按钮点击后弹出的浮层
/**
 * 一些按钮用到的弹出浮层，继承自{@link SinaEditor.$abstract.$BaseBubble}。<br>
 * 可以直接通过SinaEditor.btnBubble来进行配置调用，当需要显示浮层时，可以在showBubble的option里设置对应的option即可。
 * @class 部分按钮点击后弹出的浮层
 * @namespace SinaEditor.$abstract
 */
SinaEditor.$abstract.BtnBubble = function(){
	this.isHidden = true;
}.$extends(SinaEditor.$abstract.$BaseBubble).$define({
	/**
	 * 显示浮层。
	 * @memberOf SinaEditor.$abstract.BtnBubble#
	 * @param {String|Element} content 要显示的HTML内容或者节点。
	 * @param {Object} option 具体的参数可以参见{@link SinaEditor.$abstract.$BaseBubble}
	 * 中对应的方法参数，并增加了：<br>
	 * <table class="summaryTable">
	 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 *  <tr><td>String</td><td>className</td><td>最外层浮层的样式名称</td></tr>
	 * </table>
	 * @return {Object} 返回这个浮层对象。
	 */
    showBubble: function(content, option){
		if(option.className) {
			this.enbad.className = option.className;
		}
        this.enbad.style.display = 'none';
        this.constructor.$super.showBubble.call(this,content, option);
        this.enbad.style.display = '';
		SinaEditor.ev.add(document,'mouseup',this._handleClick);
		this.isHidden = false;
		return this;
    },
	/**
	 * 隐藏浮层。
	 * @memberOf SinaEditor.$abstract.BtnBubble#
	 * @return {Object} 返回这个浮层对象。
	 */
    hiddenBubble: function(){
        this.constructor.$super.hiddenBubble.call(this);
		SinaEditor.ev.remove(document,'mouseup',this._handleClick);
		this.isHidden = true;
		return this;
    },
	_handleClick : function(e) {
		e = SinaEditor.ev.fixEvent(e);
		var src = e.target;
		if(SinaEditor.util.dom.containsNode(SinaEditor.btnBubble.enbad,src)) {
			return;
		}
		if (!SinaEditor.btnBubble.isHidden) {
			SinaEditor.btnBubble.hiddenBubble();
		}
	},
	/**
	 * 通过id查找对应节点。直接继承自{@link SinaEditor.$abstract.$BaseBubble}中对应的方法。
	 * @memberOf SinaEditor.$abstract.BtnBubble#
	 * @param {String} id 要查找的节点ID
	 * @return {Element} 当且仅当页面中存在次ID时，返回此对象。
	 */
	id : function(id) {
		return this.enbad.ownerDocument.getElementById(id);
	}
});
SinaEditor.btnBubble = new SinaEditor.$abstract.BtnBubble();

if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

/**
 * 按钮的生成由它负责，这里不用关心具体的创建过程，仅需要给他们分组即可。<br>
 * <span style="color:red">注意：每个分组是一个div节点，使用se_ico_group样式。</span><br>
 * <span style="color:red">您可以通过SinaEditor.ButtonFactory来直接访问它的实例。</span><br>
 * @class 直接提供按钮的类
 */
SinaEditor.$abstract.ButtonFactory = function(){
    this.buttonObjs = {};
}
.$define({
	/**
	 * 创建按钮。格式：{rditorID:[{groupid:[btns]}]}
	 * @memberOf SinaEditor.$abstract.ButtonFactory#
	 * @param {Object} option 生成按钮所需要的参数。<br>
	 * 目前实现的按钮有用div实现的按钮{@link SinaEditor.$abstract.divButton}(默认的)和自定义的按钮{@link SinaEditor.$abstract.customButton}，如果需要继续扩展，可以对此放方法进行简单的扩展。<br>
	 * 参数中包含{@link SinaEditor.$abstract.$BaseButton}的参数，还增加了以下参数：
	 * <table class="summaryTable">
	 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>btnType</td>
	 * 		<td>
	 * 			创建按钮的类型，可选：'div'(默认)或者'custom'。<br>
	 * 			那么更近一步的参数可以参考{@link SinaEditor.$abstract.divButton}或者{@link SinaEditor.$abstract.customButton}
	 * 		</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>group</td>
	 * 		<td>
	 * 			按钮的所选分组。这将会作为ID的一部分，请满足能做ID的格式进行书写。<br>
	 * 			当没有提供group时，会取系统时间，也就是说，它会自己成为一个分组。
	 * 		</td>
	 * 	</tr>
	 * </table>
	 * 注意，如果要修改分组的样式，请修改se_ico_group样式。
	 * @param {Object} editor 应用于此按钮的编辑器对象。
	 * @return {Object} 此按钮的实例
	 */
	createButton : function(option,editor) {
		if(!this.buttonObjs[editor.option.id]) {
			this.buttonObjs[editor.option.id] = [];
		}
		var btn = null;
		switch(option.btnType || 'div') {
			case 'div' :
				btn = new SinaEditor.$abstract.divButton(option,editor);
				break;
			case 'custom' :
				btn = new SinaEditor.$abstract.customButton(option,editor);
				break;
		}
		if(!btn.noAppend) {
			this._addBtn(btn,option,editor);
		}
		return btn;
	},
	_addBtn : function(btn,option,editor) {
		var groupid = editor.option.id + '_' + (option.group || 'g'+(new Date().getTime()));
		
		var added = false;
		var groupArr = this.buttonObjs[editor.option.id],i;
		for(i=0; groupArr[i]; i++) {
			if(groupArr[i][groupid]) {
				added = true;
				groupArr[i][groupid].push(btn);
			}
		}
		if(!added) {
			var obj = {};
			obj[groupid] = [btn];
			this.buttonObjs[editor.option.id].push(obj);
		}
		var me = this;
		if(editor.getState() <= SinaEditor.STATE.CREATED) {
			SinaEditor.ev.add(editor, 'editorOnladed', function() {
				var groups = me.buttonObjs[this.option.id];
				var group,gid,i,j;
				for(i=0; groups[i]; i++) {
					group = groups[i];
					var gSpan = SinaEditor.util.dom.createDom('div',{'properties':{'className':'se_ico_group','id':groupid}});
					for(id in group) {
						for(j=0; group[id][j]; j++) {
							gSpan.appendChild(group[id][j].$);
						}
					}
					document.getElementById(this.option.toolBase).appendChild(gSpan);
				}
			},{once:true});
		} else {
			var group = document.getElementById(groupid) || SinaEditor.util.dom.createDom('div',{'properties':{'className':'se_ico_group','id':groupid}});
			group.appendChild(btn.$);
			document.getElementById(editor.option.toolBase).appendChild(group);
		}
	}
});
SinaEditor.ButtonFactory = new SinaEditor.$abstract.ButtonFactory();

if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

/**
 * 自定义的按钮，继承自{@link SinaEditor.$abstract.$BaseButton}
 * @class 自定义的按钮
 * @param {Object} option 生成按钮所需要的参数。可以参考{@link SinaEditor.$abstract.$BaseButton}
 * @param {Object} editor 应用于此按钮的编辑器对象。
 * 
 */
SinaEditor.$abstract.customButton = function(option,editor){
	/**
	 * {Element} 按钮节点的实体。
	 */
    this.$ = this.option.entyBtn;
	this.noAppend = true;
	if(!option.noEvent) {
		this.eventInit(option,editor);
	}
}.$extends(SinaEditor.$abstract.$BaseButton).$define({});

if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

/**
 * 以div作为节点的按钮。继承自{@link SinaEditor.$abstract.$BaseButton}。
 * @class 以div作为节点的按钮
 * @param {Object} option 按钮的配置参数，可以参考{@link SinaEditor.$abstract.$BaseButton}中的参数，这里还增加了：<br>
 * <table class="summaryTable">
 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
 * 	<tr>
 * 		<td>Object</td>
 * 		<td>attributes</td>
 * 		<td>
 * 			div节点的属性，将会使用setAttribute的方法设置入div中。结构形如：{'key1':'value',..}
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Object</td>
 * 		<td>properties</td>
 * 		<td>
 * 			div节点的属性，将会使用'.'操作符设置入div中。结构形如：{'key1':'value',..}
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>String</td>
 * 		<td>title</td>
 * 		<td>
 * 			div节点的title。
 * 		</td>
 * 	</tr>
 * </table>
 * @param {Object} editor 应用于此按钮的编辑器对象。
 */
SinaEditor.$abstract.divButton = function(option,editor){
    option.attributes = option.attributes || {};
	option.properties = option.properties || {};
    if (!option.attributes.id) {
        option.attributes.id = 'b_' + new Date().getTime();
    }
	if (!option.properties.innerHTML) {
        option.properties.innerHTML = '&nbsp;';
    }
    this.$ = SinaEditor.util.dom.createDom('div', {
        attributes: option.attributes,
        properties: option.properties
    });
	if(option.title) {
		this.$.title = option.title;
	}
	if(!option.noEvent) {
		this.eventInit(option,editor);
	}
	this.noAppend = false;
}.$extends(SinaEditor.$abstract.$BaseButton).$define({});

if(!SinaEditor.$abstract) {
	SinaEditor.$abstract = {};
}

//处理重做和撤销
/**
 * 处理重做和撤销,依赖的全局参数<span style="color:red">SinaEditor.CONF.redoConf</span>，表示最大可重做，撤销的次数。可以在default.js文件修改其默认参数。<br>
 * 如果没有把'<span style="color:red">redoAndUndoChanged</span>'事件列入黑名单的情况下，重做，撤销操作都会触发此事件。<br>
 * SinaEditor.redoManager是它的一个实例。
 * @class 处理重做和撤销的类
 */
SinaEditor.$abstract.redoManager = function(){
    this.maxLan = SinaEditor.CONF.redoConf || 100;
    //{对应编辑器:指针位置,和数组下标一致}
    this.points = {};
    //{对应编辑器:[缓存数据{html:当时的html,ranges:当时的selection}]}
    this.cache = {};
}
.$define({
    /**
     * 给要添加撤销和重做操作的编辑器添加此管理操作。一般是在编辑器出事完成后进行。即SinaEditor.STATE.CREATED之后。
     * @memberOf SinaEditor.$abstract.redoManager#
     * @param {Object} editor 要添加管理的编辑器。
     */
    addEditor: function(editor){
		SinaEditor.ev.remove(editor,'redoAndUndoChanged');
		SinaEditor.ev.$regEvent('redoAndUndoChanged',editor);
        this.points[editor.option.id] = 0;
        this.cache[editor.option.id] = [{
            "html": editor.entyBody.innerHTML
        }];
        this.save(editor);
    }
	/**
     * 保存当前编辑器的内容。
     * @memberOf SinaEditor.$abstract.redoManager#
     * @param {Object} editor 要保存内容的编辑器。
     */
    ,save: function(editor){
		//return
        console.log("保存:" + editor.option.id);
        var len = this.cache[editor.option.id].length;
        //当前游标
        var i = this.points[editor.option.id];
        
        var oldHTML = this.cache[editor.option.id][i].html;
        var newHTML = editor.entyBody.innerHTML;
		
		var ranges,bookmarks;
		
		if (!SinaEditor.env.$IE) {
			ranges = SinaEditor.range.getCurrentRanges(editor.entyWin);
			bookmarks = this._converToBookMark(ranges);
		}
		
        if (oldHTML !== newHTML) {
            console.log("数据不一样，保存");
            
            if ((i + 1) != len) {
                console.log("清除历史分支");
                this.cache[editor.option.id].splice(i + 1, len);
                len = this.cache[editor.option.id].length;
            }
            
            if (len == this.maxLan) {
                console.log("到达最后记录点");
                this.cache[editor.option.id].shift();
                len--;
            }
			
            this.cache[editor.option.id].push({
                "html": newHTML,
				"ranges": bookmarks
            });
            this.points[editor.option.id] = len;
        } else {
			//更新range
			console.log('更新当前range');
			this.cache[editor.option.id][i].ranges = bookmarks;
		}
		this._fireEvent(editor);
    },
	/**
	 * 重做当前编辑器的内容。
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} editor 要重做的编辑器。
	 */
    redo: function(editor){
		//return;
        console.log("重做:" + editor.option.id);
        var i = this.points[editor.option.id];
        var len = this.cache[editor.option.id].length;
        if ((i + 1) == len) {
            console.log("已经重做到尽头");
            return;
        }
        this.points[editor.option.id] = ++i;
        var cache = this.cache[editor.option.id][i];
		var me = this;
		//阻止滚动条滚动
        setTimeout(function(){
            editor.entyBody.innerHTML = cache.html;
			if(!SinaEditor.env.$IE) {
				SinaEditor.range.applyRanges(editor.entyWin,me._converToRange(editor.entyDoc,cache.ranges));
			}
            editor.focus();
			me._fireEvent(editor);
        }, 0);
    },
	/**
	 * 撤销当前编辑器的内容。
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} editor 要撤销的编辑器。
	 */
    undo: function(editor){
		//return;
        //当前游标回退
        console.log("回退:" + editor.option.id);
        var i = this.points[editor.option.id];
        if (i <= 0) {
            console.log("已经回退到尽头");
            return;
        }
		
        this.points[editor.option.id] = --i;
		
        var cache = this.cache[editor.option.id][i];
		var me = this;
		
        setTimeout(function(){
            editor.entyBody.innerHTML = cache.html;
			if(!SinaEditor.env.$IE) {
				SinaEditor.range.applyRanges(editor.entyWin,me._converToRange(editor.entyDoc,cache.ranges));
			}
            editor.focus();
			me._fireEvent(editor);
        }, 0);
    },
	/**
	 * 存储编辑器范围，必须得同步保存编辑器的范围，所以会以json的形式进行保存。
	 * 记录格式形如：{start:起始节点,startOffset:起始位置,end:结束节点,endOffset:结束位置}
	 * @inner
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} ranges 当前选区的范围。
	 */
	_converToBookMark : function(ranges) {
		//{start:起始节点,startOffset:起始位置,end:结束节点,endOffset:结束位置}
		var arr = [];
		var i;
		for(i=0; ranges[i]; i++) {
			var obj = {};
			obj.startOffset = ranges[i].startOffset;
			obj.endOffset = ranges[i].endOffset;
			obj.start = this._setPath(ranges[i].startContainer);
			obj.end = this._setPath(ranges[i].endContainer);
			arr.push(obj);
		}
		return arr;
	},
	/**
	 * 把存储的编辑器范围，转换成range显示出来。
	 * @inner
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} doc 对应的document对象。
	 * @param {Object} bookmarks 存储的记录格式。参见_converToBookMark提及的存储格式。
	 */
	_converToRange : function(doc,bookmarks) {
		var i=0;
		var rangse = [];
		while(bookmarks[i]) {
			var bookmark = bookmarks[i];
			var r = doc.createRange();
			console.log(this._getPath(doc.body,bookmark.start));
			console.log(bookmark.startOffset);
			r.setStart(this._getPath(doc.body,bookmark.start), bookmark.startOffset);
			r.setEnd(this._getPath(doc.body,bookmark.end), bookmark.endOffset);
			rangse.push(r);
			i++;
		}
		return rangse;
	},
	/**
	 * 存储range时，获取startContainer或者endContainer的节点路径，以便在读取时能找回对应的节点。
	 * @inner
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} element startContainer或者endContainer，即选区的开始节点和结束节点。
	 */
	_setPath : function(element) {
		var locArr = [];
		
		var curr = element;
		var parent = element.parentNode;
		while(parent && parent.nodeType !== SinaEditor.NODETYPE.HTMLELEMENT) {
			
			var ch = parent.childNodes;
			var i;
			for(i=0; ch[i]; i++) {
				if(ch[i] == curr) {
					locArr.push(i);
					break;
				}
			}
			
			curr = parent;
			parent = parent.parentNode;
		}
		
		return locArr;
	},
	/**
	 * 把记录的startContainer或者endContainer的节点路径，转换成对应的节点。
	 * @inner
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} body 编辑器的body对象。
	 * @param {Object} locArr 寻找startContainer或者endContainer的节点路径。
	 */
	_getPath : function(body,locArr) {
		var element = body;
		var i= locArr.length - 1;
		while(i >= 0) {
			element = element.childNodes[locArr[i]];
			i--;
		}
		return element;
	},
	/**
	 * 触发'redoAndUndoChanged'事件
	 * @inner
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} editor
	 */
	_fireEvent : function(editor) {
		var index = this.points[editor.option.id];
		//重做
		editor._.hasRedo = index == (this.cache[editor.option.id].length - 1) ? false : true;
		//回退
		//editor._.hasUndo = index == 0 ? false : true; 
		editor._.hasUndo = index === 0 ? false : true;
		SinaEditor.ev.fire(editor,'redoAndUndoChanged');
	}
});
SinaEditor.redoManager = new SinaEditor.$abstract.redoManager();

//添加内容
SinaEditor.plugins.add('addContent',function(args){
	var editor = this;
	
	/**
	 * 添加节点
	 * @param {Element} node 要添加的节点。
	 * @param {Booelan} focus 是否把焦点集中到新添的节点中
	 */
	editor.operation.addNode = function(node,focus){
		editor.focus();
		
		editor.operation.save(editor);
		var range = SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
		if(!range.collapsed) {
			range.deleteContents();
		}
		range.insertNode(node);
		if(!focus) {
			_focusAfter(node,range);
		}
		editor.operation.save(editor);
	};
	
	/**
	 * 添加文本
	 * @param {String} str 要添加的字符串
	 * @param {Booelan} focus 是否把焦点集中到新添的字符串中
	 */
	editor.operation.addContent = function(str,focus){
		editor.focus();
		
		editor.operation.save(editor);
		var range = SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
		if(!range.collapsed) {
			range.deleteContents();
		}
		var textNode = editor.entyDoc.createTextNode(str);
		range.insertNode(textNode);
		if(!focus) {
			_focusAfter(textNode,range);
		}
		editor.operation.save(editor);
	};
	
	var _focusAfter = function(node,range) {
		range.selectNode(node);
		range.collapse(false);
		SinaEditor.range.applyRanges(editor.entyWin,range);
		editor.focus();
	};
});
//背景颜色的获取逻辑
//在span里加color来实现这一目的
SinaEditor.plugins.add('backcolor',function(args){
	var editor = this;
	editor.btns.backcolor = null;
	editor.panels.backcolor = null;
	if(!args.customerPanel) {
		editor.callPlugin({
			'name' : 'backcolorPanel',
			'args' : args
		});
	}
	
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'backcolorBtn',
			'args' : args
		});
	}
	
	//注册查询的状态
	SinaEditor.range.regQueryCommandState('backcolor',function(refNode){
		return SinaEditor.util.dom.getStyle(refNode, 'backgroundColor');
	});
	
	/**
	 * 文字颜色修改
	 * #BLOGBUG-12268 在safari4下,设置背景色，回车，背景色的span标签丢失
	 * @param {String} color 要修改的文字颜色。
	 */
	editor.operation.backcolor = function(color){
        editor.operation.save(editor);
		console.log('背景颜色修改');
		SinaEditor.range.applyStyle(editor, {
            'useTagName': 'span',
			'style': 'backgroundColor',
	        'value': color
        });
		editor.btns.backcolor.setState(SinaEditor.BUTTONSTATE.NORMAL,color);
        editor.operation.save(editor);
    };
});
//背景颜色的按钮
SinaEditor.plugins.add('backcolorBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'背景颜色',
		normalClass : 'ico_hilitecolor_1'
		,disabledClass : 'ico_hilitecolor_4'
		,clickedClass : 'ico_hilitecolor_3'
		,mouseoverClass : 'ico_hilitecolor_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'common'
		,setState : function(state,color){
			switch(state) {
				case SinaEditor.BUTTONSTATE.DISABLED : 
					this.$.style.backgroundColor = '#FFFFFF';
					break;
				default :
					this.$.style.backgroundColor = color;
			}
		}
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.backcolor = btn;
	
	return {
		"events": [{
            "element": btn.$,
            "events": {
                'click' : function() {
					if(editor.btns.backcolor.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.panels.backcolor.show(this);
					return false;
				}
            }
        },{
            "element": editor,
            "events": {
				'editorSelectionChange' : function(e,range,refNode) {
					var color = SinaEditor.range.queryCommandState(this.entyDoc,'backColor');
					if(color === 'transparent') {
						color = '#FFFFFF';
					}
					editor.btns.backcolor.setState(SinaEditor.BUTTONSTATE.NORMAL,color);
				}
            }
        }]
	};
});
//背景颜色的弹出浮层
SinaEditor.plugins.add('backcolorPanel',function(args){
	var editor = this;
	
	var outerDiv = SinaEditor.util.dom.createDom('div',{
		properties : {
			'className' : 'se_forecolor_bubble'
		}
	});
	
	editor.panels.backcolor = (function(){
		var colors = args.colors || SinaEditor.TOOLCONF.COLOR;
		outerDiv.style.display = 'none';
		
		document.body.appendChild(outerDiv);
		
		var selArr = [];
		var color;
		for(color in colors) {
			selArr.push('<span onmouseover="this.className=\'color_focus\'" onmouseout="this.className=\'\'"><span class="j_single_color" title="');
			selArr.push(colors[color]);
			selArr.push('" style="background-color:#');
			selArr.push(color);
			selArr.push(';"></span></span>');
		}
		
		outerDiv.innerHTML = selArr.join('');
		
		return {
			show : function(elm) {
				var loc = SinaEditor.util.dom.getXY(elm);
				outerDiv.style.display = '';
				outerDiv.style.top = loc[1]+editor.btns.backcolor.$.offsetHeight+'px';
				outerDiv.style.left = loc[0]+'px';
			},
			hidden : function() {
				outerDiv.style.display = 'none';
			}
		};
	})();
	
    return {
        "events": [{
            "element": editor,
            "events": {
                'editorSelectionChange' : function() {
					editor.panels.backcolor.hidden();
				}
            }
        },{
            "element": outerDiv,
            "events": {
                'click' : function(e) {
					SinaEditor.ev.stopEvent(e);
					editor.focus();
					var target = e.target;
					if(target.className === 'j_single_color') {
						editor.operation.backcolor(SinaEditor.util.dom.getStyle(target, 'backgroundColor'));
						editor.panels.backcolor.hidden();
					}
					return false;
				}
            }
        },{
            "element": document,
            "events": {
                'click' : function(e) {
					var target = e.target;
					if(SinaEditor.util.dom.containsNode(editor.btns.backcolor.$,target)) {
						return false;
					}
					if(!SinaEditor.util.dom.containsNode(outerDiv,target)) {
						editor.panels.backcolor.hidden();
					}
					return false;
				}
            }
        }]
    };
});
//用于加粗
//通过添加strong标签和移除strong标签来达到
SinaEditor.plugins.add('bold',function(args){
	var editor = this;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'boldBtn',
			'args' : args
		});
	}
	
	var btn = editor.btns.bold;
	
	/**
	 * 加粗，isAdd可能是参照节点，也可能是一个boolean值
	 * @param {element} refNode 参照节点，决定是否加粗。
	 */
	editor.operation.bold = function(refNode){
		var ranges = SinaEditor.range.getCurrentRanges(editor.entyWin);
		//TODO 和IE统一，暂时只支持第一个选区
		ranges = ranges[0];
		if(!ranges) {
			return;
		}
        editor.operation.save(editor);
		
		//var isBold = editor.operateState['bold'];
		var isBold = editor.operateState.bold;
		
		if(isBold) {
			console.log('执行去加粗操作');
			SinaEditor.range.removeStyle(editor, {
	            'useTagName': ['strong','b']
	        });
			btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
		} else {
			console.log('执行加粗操作');
			SinaEditor.range.applyStyle(editor, {
	            'useTagName': 'strong'
	        });
			btn.setState(SinaEditor.BUTTONSTATE.CLICKED);
		}
        
		//editor.operateState['bold'] = !isBold;
		editor.operateState.bold = !isBold;
        editor.operation.save(editor);
    };
	
	
    return {
        "events": [{
            "element": editor,
            "events": {
				'editorSelectionChange' : function(e,range,refNode) {
					var isBold = SinaEditor.range.queryCommandState(this.entyDoc,'bold');
					
					if(isBold) {
						btn.setState(SinaEditor.BUTTONSTATE.CLICKED);
					} else {
						btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
					}
					
					//this.operateState['bold'] = isBold;
					this.operateState.bold = isBold;
				}
				,'ctrlb' : function() {
					editor.operation.bold(this);
				}
            }
        }]
    };
});
//用于加粗
//通过添加strong标签和移除strong标签来达到
SinaEditor.plugins.add('boldBtn',function(args){
	var editor = this;
	
	var btnConf = {
		title:'加粗',
		normalClass : 'ico_bold_1'
		,disabledClass : 'ico_bold_4'
		,clickedClass : 'ico_bold_3'
		,mouseoverClass : 'ico_bold_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'common'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.bold = btn;
	
    return {
        "events": [{
			'element' : btn.$,
			'events' : {
				'click' : function(e) {
					SinaEditor.ev.stopEvent(e);
					editor.operation.bold(editor);
					return false;
				}
			}
		}]
    };
});
//插入表情
SinaEditor.plugins.add('faceUI',function(args){
	var editor = this;
	
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'faceUIBtn',
			'args' : args
		});
	}
	
	if (!args.customerPanel) {
		editor.callPlugin({
			'name': 'faceUIPanel',
			'args': args
		});
	}
	
	/**
	 * 添加表情
	 * @param {String} src 要添加表情的src
	 */
	editor.operation.addFace = function(src){
		if(!src) {
			return;
		}
		
		editor.operation.save(editor);
		
		var img = SinaEditor.util.dom.createDom('img',{
			ownerDocument : editor.entyDoc,
			attributes : {
				'_se_type' : 'face'
			},
			properties : {
				'src' : src
			}
		});
		
		editor.operation.addNode(img);
		
		editor.operation.save(editor);
	};

});
//插入表情
SinaEditor.plugins.add('faceUIBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'表情'
		,normalClass : 'ico_face_1'
		,disabledClass : 'ico_face_4'
		,clickedClass : 'ico_face_3'
		,mouseoverClass : 'ico_face_2'
		,state : SinaEditor.BUTTONSTATE.NORMAL
		,group : 'richdata'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.faceUI = btn;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function(){
					var facePanel = editor.panels.faceUI;
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					var pos = SinaEditor.util.dom.getXY(btn.$);
					facePanel.setPosition({x:pos[0],y:(pos[1]+btn.$.offsetHeight)});
					facePanel.show();
				}
            }
        }]
    };
});
//插入表情
SinaEditor.plugins.add('faceUIPanel',function(args){
	var editor = this;

	var facePanel = new SinaEditor._.Panel();
	facePanel.setTemplate(SinaEditor.TOOLCONF.faceTemplate);
	
	var panel = facePanel.nodes.panel;
	var faceArr = args.faceSrc || SinaEditor.TOOLCONF.faceSrc;
	
	var htmls = [];
	var i,key;
	for(i=0; faceArr[i]; i++) {
		htmls.push('<img ');
		for(key in faceArr[i]) {
			htmls.push(key);
			htmls.push('="');
			htmls.push(faceArr[i][key]);
			htmls.push('"');
		}
		htmls.push('" onmouseout="this.className=\'\'" onmouseover="this.className=\'face_focus\'" ');
		htmls.push('/>');
	}
	panel.innerHTML = htmls.join('');
	
	editor.panels.faceUI = facePanel;
	
    return {
        "events": [{
            "element": editor,
            "events": {
				'editorSelectionChange' : function(){
					facePanel.hidden();
				}
            }
        },{
            "element": panel,
            "events": {
				'click' : function(e){
					var target = e.target;
					if(target.tagName.toUpperCase() == 'IMG') {
						editor.operation.addFace(target.src);
						facePanel.hidden();
					}
				}
            }
        },{
            "element": document,
            "events": {
				'click' : function(e){
					var target = e.target;
					if(SinaEditor.util.dom.containsNode(editor.btns.faceUI.$,target)) {
						return;
					}
					if(!SinaEditor.util.dom.containsNode(panel,target)) {
						facePanel.hidden();
					}
				}
            }
        }]
    };
});//当鼠标链接在IMG标签内时
SinaEditor.plugins.add('flashBubble', function(){
    return SinaEditor.$abstract.BaseBubblePlugin({
        tagName: 'FLASH',
        applyStyles: SinaEditor.CONF.aBubbleStyles,
        showBubble: function(node, editor){
        
            var t = new Date().getTime();
            var html, data;
            var seid = 'f_se_b_' + t;
            var did = 'f_d_b_' + t;
            var sid = 'f_s_b_' + t;
            var cid = 'f_c_b_' + t;
            data = {
                seeid: seid,
                deleteid: did,
                showflash: sid,
                closeid: cid
            };
            var href = node.href;
            html = new SinaEditor.$abstract.Template(SinaEditor.CONF.flashBubbleTemplete);
            
            var pos = SinaEditor.util.dom.getXY(node,true);
            var iframePos = SinaEditor.util.dom.getXY(editor.enty);
            if (iframePos[1] > pos[1]) {
                pos[1] = iframePos[1];
            }
            var bubble = SinaEditor.baseBubble.showBubble(html.evaluate(data), {
                x: pos[0],
                y: pos[1]
            });
            bubble.id(seid).onclick = function(){
                var snode = bubble.id(sid);
                bubble.id(seid).style.display = 'none';
                snode.innerHTML = decodeURIComponent(node.getAttribute('_se_flash'));
                //chrome下看不到部分flash
                if (SinaEditor.env.$CHROME) {
                    var embed = snode.getElementsByTagName('embed')[0];
                    embed.setAttribute('wmode', 'transparent');
                    snode.innerHTML = SinaEditor.util.dom.outerHTML(embed);
                    
                }
                snode.style.display = '';
            };
            bubble.id(cid).onclick = function(){
                SinaEditor.baseBubble.hiddenBubble();
                editor.focus();
            };
            bubble.id(did).onclick = function(){
                editor.operation.save(editor);
				
                var children = node;
				editor.focus();
				SinaEditor.range.setStartBefore(editor.entyWin, node);
                node.parentNode.removeChild(node);
                SinaEditor.baseBubble.hiddenBubble();
                
                editor.operation.save(editor);
            };
        }
    });
}());

//插入flash
SinaEditor.plugins.add('flashUI', function(args){
    var editor = this;
    
    if (!args.customerBtn) {
        editor.callPlugin({
            'name': 'flashUIBtn',
            'args': args
        });
    }
    
    if (!args.customerPanel) {
        editor.callPlugin({
            'name': 'flashUIPanel',
            'args': args
        });
    }
    
    /**
     * 插入flash
     * @param {String | Element} node 当前的节点html字符串，或者是节点。
     * @param {Boolean} focus 是否选中添加的flash
     */
    editor.operation.insertFlash = function(node, focus){
        if (typeof node === 'string') {
            node = SinaEditor.util.dom.createDomFromHTML(node, editor.entyDoc);
        }
        var img = SinaEditor.util.dom.createDomFromHTML('<img src="' + SinaEditor.CONF.transparentIMG + '" _se_flash="' + encodeURIComponent(SinaEditor.util.dom.outerHTML(node)) + '" width="' + (node.width || 480) + '" height="' + (node.height || 370) + '" style="background:url(\'' + SinaEditor.CONF.fakeFLASH + '\') no-repeat scroll center center transparent;border:1px solid #A9A9A9;" >', editor.entyDoc);
        editor.operation.addNode(img, focus);
    };
});

//插入flash
SinaEditor.plugins.add('flashUIBtn',function(args){
    var editor = this;
	
	var btnConf = {
		title:'插入flash',
        normalClass: 'ico_video_1',
        disabledClass: 'ico_video_4',
        clickedClass: 'ico_video_3',
        mouseoverClass: 'ico_video_2',
        state: SinaEditor.BUTTONSTATE.DISABLED,
        group: 'richdata'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.flashUI = btn;
    
    return {
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.panels.flashUI.show();
					return false;
				}
            }
        }]
    };
});

//插入flash
SinaEditor.plugins.add('flashUIPanel',function(args){
    var editor = this;
    
    var flashPanel = SinaEditor.winDialog.create({
        title: '添加flash',
        content: SinaEditor.TOOLCONF.flashTemplate,
        funcClose: function(){
			_back();
        }
    });
	
	var flashSrc = flashPanel.nodes.flashSrc;
	var ok = flashPanel.nodes.ok;
	var cancel = flashPanel.nodes.cancel;
	var flashErrTip = flashPanel.nodes.flashErrTip;
	
	var _back = function(){
		flashSrc.value = '';
		flashErrTip.style.display = 'none';
	};
	
	editor.panels.flashUI = flashPanel;
    
    return {
        "events": [{
            "element": cancel,
            "events": {
				'click' : function() {
					_back();
					flashPanel.hidden();
				}
            }
        },{
            "element": ok,
            "events": {
				'click' : function() {
					flashErrTip.style.display = 'none';
					var src = SinaEditor.util.trim(flashSrc.value);
					if(!src) {
						//_back();
						flashErrTip.style.display = '';
						//flashPanel.hidden();
						return;
					}
					editor.operation.insertFlash(src);
					_back();
					flashPanel.hidden();
				}
            }
        }]
    };
});

//字体的大小
SinaEditor.plugins.add('fontSize',function(args){
	var editor = this;

	//注册查询的状态
	SinaEditor.range.regQueryCommandState('fontsize',function(refNode){
		return SinaEditor.util.dom.getStyle(refNode, 'fontSize');
	});
    
    if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'fontSizeBtn',
			'args' : args
		});
    }
	
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'fontSizePanel',
			'args' : args
		});
    }
    var btn = editor.btns.fontSize;
	
	/**
	 * 设置字体大小
	 * @param {String} fontSize 要设置的字体大小
	 */
    editor.operation.setFontSize = function(fontSize){
		editor.focus();
		
        editor.operation.save(editor);
        
        //添加
        SinaEditor.range.applyStyle(editor, {
            'useTagName': 'span',
            'style': 'fontSize',
            'value': fontSize
        });
        
        editor.operation.save(editor);
    };
});

//字体的大小
SinaEditor.plugins.add('fontSizeBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'文字大小',
        normalClass: 'ico_fontsize_1',
        properties: {
            'innerHTML': '<span>' + SinaEditor.TOOLCONF.FONTSIZEDEF + '</span>'
        },
        disabledClass: 'ico_fontsize_4',
        clickedClass: 'ico_fontsize_3',
        mouseoverClass: 'ico_fontsize_2',
        state: SinaEditor.BUTTONSTATE.NORMAL,
        group: 'common'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.fontSize = btn;
});

//字体的大小
SinaEditor.plugins.add('fontSizePanel',function(args){
	var editor = this;
    var btn = editor.btns.fontSize;

    var _fontSizeConf = args.conf || SinaEditor.TOOLCONF.FONTSIZECONF;
	
	var _createDomHTML = function(eid){
        var sizes = _fontSizeConf;
        var str = ['<div class="fontItemTitle">字号</div>'];
        var size, style,i;
        for (i = 0; sizes[i]; i++) {
            size = sizes[i].html;
            style = sizes[i].style || size;
            str.push('<div class="fontItem" style="font-size:');
            str.push(style);
            str.push('">');
            str.push(size);
            str.push('</div>');
        }
        return str.join('');
    };
    
    var _bindEvent = function(children){
		var i,cn;
        for (i = 0; children[i]; i++) {
            cn = children[i].className;
            if (cn && cn == 'fontItem') {
                children[i].onclick = function(e){
                    e = e || window.event;
                    var target = SinaEditor.ev.fixEvent(e).target;
                    var family = target.style.fontSize;
                    btn.$.innerHTML = '<span>' + target.innerHTML + '</span>';
                    editor.operation.setFontSize(family);
                    SinaEditor.btnBubble.hiddenBubble();
                    return false;
                };
            }
        }
    };
    
    return {
        "events": [{
            "element": editor,
            "events": {
                'editorSelectionChange': function(){
                    SinaEditor.btnBubble.hiddenBubble();
                }
				,'editorSelectionChange': function(e, range, refNode){
                    var style = SinaEditor.range.queryCommandState(this.entyDoc,'fontsize');
                    var family = _fontSizeConf;
                    console.log(style);
                    var html = '<span>' + SinaEditor.TOOLCONF.FONTSIZEDEF + '</span>';
                    var tmp,i;
                    for (i = 0; family[i]; i++) {
                        //tmp = family[i]['style'] || family[i]['html'];
						tmp = family[i].style || family[i].html;
                        if (style.indexOf(tmp) != -1) {
                            //html = '<span>' + family[i]['html'] + '</span>';
							html = '<span>' + family[i].html + '</span>';
                            break;
                        }
                        
                    }
                    btn.$.innerHTML = html;
                }
            }
        },{
            'element': btn.$,
            'events': {
                'click': function(){
                    if (editor.getState() != SinaEditor.STATE.EDITING) {
                        return;
                    }
                    var loc = SinaEditor.util.dom.getXY(btn.$);
                    var div = SinaEditor.util.dom.createDom('div');
                    div.innerHTML = _createDomHTML(editor.option.id);
                    _bindEvent(div.childNodes);
                    SinaEditor.btnBubble.showBubble(div, {
                        x: loc[0],
                        y: loc[1] + btn.$.offsetHeight + SinaEditor.util.dom.styleInteger(btn.$, 'paddingTop') + SinaEditor.util.dom.styleInteger(btn.$, 'marginTop'),
                        'className': 'se_fontfamily_bubble'
                    });
                    return false;
                }
            }
        }]
    };
});

//字体选择
SinaEditor.plugins.add('fontFamily',function(args){
	var editor = this;
    var btn = null;
    if (!SinaEditor._fontConf) {
        SinaEditor._fontConf = {};
    }
    
    if (!args.customerBtn) {
        editor.callPlugin({
			'name' : 'fontFamilyBtn',
			'args' : args
		});
    }
	
	if (!args.customerPanel) {
        editor.callPlugin({
			'name' : 'fontFamilyPanel',
			'args' : args
		});
    }
    
	/**
	 * 设置字体
	 * @param {String} fontFamily 要设置的字体值
	 */
    editor.operation.setFontFamily = function(fontFamily){
        editor.operation.save(editor);
        
        //添加
        SinaEditor.range.applyStyle(editor, {
            'useTagName': 'span',
            'style': 'fontFamily',
            'value': fontFamily
        });
        
        editor.operation.save(editor);
    };
});

//字体选择
SinaEditor.plugins.add('fontFamilyBtn',function(args){
	var editor = this;
	
	var _fontConf = args.conf || SinaEditor.TOOLCONF.FONTFAMILYCONF;

	var btnConf = {
		title:'字体',
        normalClass: 'ico_family_1',
        properties: {
            'innerHTML': '<span>' + SinaEditor.TOOLCONF.FONTFAMILYDEF + '</span>'
        },
        disabledClass: 'ico_family_4',
        clickedClass: 'ico_family_3',
        mouseoverClass: 'ico_family_2',
        state: SinaEditor.BUTTONSTATE.NORMAL,
        group: 'common'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.fontFamily = btn;
	
	
	var _createDomHTML = function(eid){
        var str = ['<div class="fontItemTitle">字体</div>'];
        var family, style,i;
        for (i = 0; _fontConf[i]; i++) {
            family = _fontConf[i].html;
            style = _fontConf[i].style || family;
            str.push('<div class="fontItem" style="font-family:');
            str.push(style);
            str.push('">');
            str.push(family);
            str.push('</div>');
        }
        return str.join('');
    };
	
	var _bindEvent = function(children){
		var i;
        for (i = 0; children[i]; i++) {
            var cn = children[i].className;
            if (cn && cn == 'fontItem') {
                children[i].onclick = function(e){
					editor.focus();
                    e = e || window.event;
                    var target = SinaEditor.ev.fixEvent(e).target;
                    var family = target.style.fontFamily;
                    btn.$.innerHTML = '<span style="font-family:' + family + '">' + target.innerHTML + '</span>';
                    editor.operation.setFontFamily(family);
                    SinaEditor.btnBubble.hiddenBubble();
                    return false;
                };
            }
        }
    };
	
	return {
		'events' : [{
            'element': btn.$,
            'events': {
                'click': function(){
                    if (editor.getState() != SinaEditor.STATE.EDITING) {
                        return;
                    }
                    var loc = SinaEditor.util.dom.getXY(btn.$);
                    var div = SinaEditor.util.dom.createDom('div');
                    div.innerHTML = _createDomHTML(editor.option.id);
                    _bindEvent(div.childNodes);
                    SinaEditor.btnBubble.showBubble(div, {
                        x: loc[0],
                        y: loc[1] + btn.$.offsetHeight + SinaEditor.util.dom.styleInteger(btn.$, 'paddingTop') + SinaEditor.util.dom.styleInteger(btn.$, 'marginTop'),
                        'className': 'se_fontfamily_bubble'
                    });
                    return false;
                }
            }
        }, {
            'element': editor,
            'events': {
                'editorSelectionChange': function(e,range,refNode){
                    var style = SinaEditor.util.dom.getStyle(refNode, 'fontFamily');
                    var family = _fontConf;
                    var html = '<span>' + SinaEditor.TOOLCONF.FONTFAMILYDEF + '</span>';
                    var tmp,i;
                    for (i = 0; family[i]; i++) {
                        //tmp = family[i]['style'] || family[i]['html'];
						tmp = family[i].style || family[i].html;
                        if (style.indexOf(tmp) != -1) {
                            //html = '<span style="font-family:' + tmp + '">' + family[i]['html'] + '</span>';
							html = '<span style="font-family:' + tmp + '">' + family[i].html + '</span>';
                            break;
                        }
                        
                    }
                    btn.$.innerHTML = html;
                }
            }
        }]
	};
});
//字体选择
SinaEditor.plugins.add('fontFamilyPanel',function(args){
	var editor = this;
    var btn = editor.btns.fontFamily;
	var _fontConf = args.fontConf || SinaEditor.TOOLCONF.FONTFAMILYCONF;
    
    var _bindEvent = function(children){
		var i;
        for (i = 0; children[i]; i++) {
            var cn = children[i].className;
            if (cn && cn == 'fontItem') {
                children[i].onclick = function(e){
                    e = e || window.event;
                    var target = SinaEditor.ev.fixEvent(e).target;
                    var family = target.style.fontFamily;
                    btn.$.innerHTML = '<span style="font-family:' + family + '">' + target.innerHTML + '</span>';
                    editor.operation.setFontFamily(family);
                    SinaEditor.btnBubble.hiddenBubble();
                    return false;
                };
            }
        }
    };
    
    return {
		'events' : [{
            "element": editor,
            "events": {
                'editorSelectionChange': function(){
                    SinaEditor.btnBubble.hiddenBubble();
                }
            }
        }]
	}
});

//文字颜色的获取
//在span里加color来实现这一目的
SinaEditor.plugins.add('forecolor',function(args){
	var editor = this;
	
	if (!args.customerPanel) {
       editor.callPlugin({
			'name' : 'forecolorPanel',
			'args' : args
		});
    }
	
	if (!args.customerBtn) {
       editor.callPlugin({
			'name' : 'forecolorBtn',
			'args' : args
		});
    }
	
	var btn = editor.btns.forecolor;
	var panel = editor.panels.forecolor;
	
	//注册查询的状态
	SinaEditor.range.regQueryCommandState('forecolor',function(refNode){
		console.log(SinaEditor.util.dom.getStyle(refNode, 'color') || '#CCC');
		return SinaEditor.util.dom.getStyle(refNode, 'color');
	});
	
	/**
	 * 文字颜色修改
	 * @param {String} color 要修改的文字颜色。
	 */
	editor.operation.forecolor = function(color){
		editor.focus();

        editor.operation.save(editor);
		
		console.log('文字颜色修改');
		SinaEditor.range.applyStyle(editor, {
            'useTagName': 'span',
			'style': 'color',
	        'value': color
        });
		btn.setState(SinaEditor.BUTTONSTATE.NORMAL,color);
        
        editor.operation.save(editor);
    };
});
//文字颜色的获取
//在span里加color来实现这一目的
SinaEditor.plugins.add('forecolorBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'文字颜色',
		normalClass : 'ico_forecolor_1'
		,disabledClass : 'ico_forecolor_4'
		,clickedClass : 'ico_forecolor_3'
		,mouseoverClass : 'ico_forecolor_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'common'
		,setState : function(state,color){
			switch(state) {
				case SinaEditor.BUTTONSTATE.DISABLED :
					this.$.style.backgroundColor = '#000000';
					break;
				default :
					this.$.style.backgroundColor = color;
			}
		}
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.forecolor = btn;
	
    return {
        "events": [{
            "element": editor,
            "events": {
                'editorSelectionChange' : function(e,range,refNode) {
					var color = SinaEditor.range.queryCommandState(this.entyDoc,'forecolor');
					if(!color) {
						color = '#000000';
					}
					btn.setState(SinaEditor.BUTTONSTATE.NORMAL,color);
				}
            }
        },{
            "element": btn.$,
            "events": {
                'click' : function(e,range,refNode) {
					if(editor.btns.backcolor.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.panels.forecolor.show(this);
					return false;
				}
            }
        }]
    };
});
//文字颜色的获取
//在span里加color来实现这一目的
SinaEditor.plugins.add('forecolorPanel',function(args){
	var editor = this;
	//var colorPanel = editor.panels.forecolor;
	var outerDiv = SinaEditor.util.dom.createDom('div',{
		properties : {
			'className' : 'se_forecolor_bubble'
		}
	});
	var colorPanel = (function(){
		var colors = args.colors || SinaEditor.TOOLCONF.COLOR;
		outerDiv.style.display = 'none';
		
		document.body.appendChild(outerDiv);
		
		var selArr = [];
		var color;
		for(color in colors) {
			selArr.push('<span onmouseover="this.className=\'color_focus\'" onmouseout="this.className=\'\'"><span class="j_single_color" title="');
			selArr.push(colors[color]);
			selArr.push('" style="background-color:#');
			selArr.push(color);
			selArr.push(';"></span></span>');
		}
		
		outerDiv.innerHTML = selArr.join('');
		
		return {
			show : function(elm) {
				var loc = SinaEditor.util.dom.getXY(elm);
				outerDiv.style.display = '';
				outerDiv.style.top = loc[1]+editor.btns.forecolor.$.offsetHeight+'px';
				outerDiv.style.left = loc[0]+'px';
			},
			hidden : function() {
				outerDiv.style.display = 'none';
			}
		};
	})();

	editor.panels.forecolor = colorPanel;
	
	return {
		'events' : [{
			"element": outerDiv,
            "events": {
                'click' : function(e) {
					var target = e.target;
					if(target.className === 'j_single_color') {
						editor.operation.forecolor(SinaEditor.util.dom.getStyle(target, 'backgroundColor'));
						colorPanel.hidden();
					}
				}
            }
		},{
			"element": document,
            "events": {
                'click' : function(e) {
					var target = e.target;
					if(SinaEditor.util.dom.containsNode(editor.btns.forecolor.$,target)) {
						return;
					}
					if(!SinaEditor.util.dom.containsNode(outerDiv,target)) {
						colorPanel.hidden();
					}
				}
            }
		},{
			"element": editor,
            "events": {
                'editorSelectionChange' : function(e) {
					colorPanel.hidden();
				}
            }
		}]
	};
});
//历史版本
SinaEditor.plugins.add('historyUI',function(args){
	var editor = this;
	
	var oldData = '';
	
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'historyUIBtn',
			'args' : args
		});
	}
	
	if (!args.customerPanel) {
		editor.callPlugin({
			'name': 'historyUIPanel',
			'args': args
		});
	}
	
	var sid = args.id || 0;
	var storage = SinaEditor.$abstract.Storage;
	
	/**
	 * 保存当前的文本内容到本地存储,没10分钟自动保存一次。
	 * @return  {Boolean} 存储成功或者失败
	 */
	editor.operation.saveData = function(){
//debugger;
		var newData = editor.entyBody.innerHTML;
		if(oldData === newData) {
			return false;
		}
		var datas = storage.getItem('SinaEditorData'+sid) || [];
		var keyTime = +new Date();
		datas.unshift(keyTime);
		if(datas.length > SinaEditor.TOOLCONF.historyMax) {
			var tmpArr = datas.splice(0,SinaEditor.TOOLCONF.historyMax);
			var i;
			for(i=0; datas[i]; i++) {
				storage.removeItem('data_'+sid+'_'+datas[i]);
			}
			datas = tmpArr;
		}
		if(storage.setItem('data_'+sid+'_'+keyTime,encodeURIComponent(newData)) && storage.setItem('SinaEditorData'+sid,datas)) {
			oldData = newData;
			editor.panels.historyUI.updataData();
			return true;
		} else {
			storage.removeItem('data_'+sid+'_'+datas[0]);
			datas.shift();
			storage.setItem('SinaEditorData'+sid,datas);
			return false;
		}
	};
	
	/**
	 * 获取数据文本数据。
	 * @param {Integer} time 获取的对应时间。
	 * @return {String} 如果没有次参数，返回最新的内容。
	 */
	editor.operation.loadData = function(time) {
		if(!time) {
			return storage.getItem('SinaEditorData'+sid);
		}
		return decodeURIComponent(storage.getItem('data_'+sid+'_'+time));
	};
	
	/**
	 * 把存储的内容放到编辑器内。
	 * @param {integer} time 要放入的时间，如果没有传递，则放入最新的时间。
	 */
	editor.operation.putData = function(time) {
		var data = this.loadData(time);
		if(!data) {
			return;
		}
		if(data.join) {
			data = this.loadData(data[0]);
		}
		editor.entyBody.innerHTML = data;
		editor.operation.clearRU();
	};
	
	var save = function(){};
	var clear = function(){};
	if(!args.closeAutoSave) {
		var histroyKey;
		save = function(){
			histroyKey = setInterval(function(){
				editor.operation.saveData();
			},600000);
		};
		clear = function(){
			clearInterval(histroyKey);
		};
	}
	
    return {
        "events": [{
            "element": editor,
            "events": {
				'editorStateChange' : function() {
					switch(this.getState()) {
						case SinaEditor.STATE.CREATED :
							editor.panels.historyUI.updataData();
							editor.operation.putData(0);
							save();
							break;
						case SinaEditor.STATE.EDITING :
							clearInterval(histroyKey);
							save();
							break;
						case SinaEditor.STATE.SHOWSOURCE :
							clear();
							break;
					}
				},'ctrls' : function(){
					editor.operation.saveData();
				}
            }
        }]
    };
});
//历史版本
SinaEditor.plugins.add('historyUIBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'历史版本',
		normalClass : 'ico_quicksave_1'
		,disabledClass : 'ico_quicksave_4'
		,clickedClass : 'ico_quicksave_3'
		,mouseoverClass : 'ico_quicksave_2'
		,state : SinaEditor.BUTTONSTATE.NORMAL
		,group : 'richdata'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.historyUI = btn;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
                'click' : function(){
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					var historyPanel = editor.panels.historyUI;
					
					var pos = SinaEditor.util.dom.getXY(btn.$);
					historyPanel.setPosition({x:pos[0],y:(pos[1]+btn.$.offsetHeight)});
					historyPanel.show();
				}
            }
        }]
    };
});
//历史版本
SinaEditor.plugins.add('historyUIPanel',function(args){
	var editor = this;
	var btn = null;
	
	var sid = args.id || 0;
	var storage = SinaEditor.$abstract.Storage;
	
	var historyPanel = new SinaEditor._.Panel();
	historyPanel.setTemplate(SinaEditor.TOOLCONF.historyTemplate);
	
	var panel = historyPanel.nodes.panel;
	
	var _addZero = function(data) {
		return data < 10 ? '0'+data : data;
	};
	
	editor.panels.historyUI = historyPanel;
	editor.panels.historyUI.updataData = function() {
		var datas = editor.operation.loadData() || [];
		if(!datas.length) {
			return;
		}
		var htmls = [];
		var d,i;
		for(i=0; datas[i]; i++) {
			d = new Date(datas[i]);
			htmls.push('<div time="');
			htmls.push(datas[i]);
			htmls.push('" >');
			htmls.push(d.getFullYear());
			htmls.push('-');
			htmls.push(_addZero(d.getMonth()+1));
			htmls.push('-');
			htmls.push(_addZero(d.getDate()));
			htmls.push('&nbsp;');
			htmls.push(_addZero(d.getHours()));
			htmls.push(':');
			htmls.push(_addZero(d.getMinutes()));
			htmls.push(':');
			htmls.push(_addZero(d.getSeconds()));
			htmls.push('</div>');
		}
		panel.innerHTML = htmls.join('');
	};
	
    return {
        "events": [{
            "element": editor,
            "events": {
				'editorSelectionChange' : function(){
					historyPanel.hidden();
				}
            }
        },{
            "element": panel,
            "events": {
				'click' : function(e){
					var target = e.target;
					var time = target.getAttribute('time');
					if(target.tagName.toUpperCase() == 'DIV' && time) {
						editor.operation.putData(time);
						historyPanel.hidden();
					}
				}
            }
        },{
            "element": document,
            "events": {
				'click' : function(e){
					var btn = editor.btns.historyUI;
					var target = e.target;
					if(target === btn.$) {
						return;
					}
					if(!SinaEditor.util.dom.containsNode(panel,target)) {
						historyPanel.hidden();
					}
				}
            }
        }]
    };
});//当鼠标链接在IMG标签内时
SinaEditor.plugins.add('imgBubble',function(){
	return SinaEditor.$abstract.BaseBubblePlugin({
        tagName: 'IMG',
        applyStyles: SinaEditor.CONF.aBubbleStyles,
        showBubble: function(node, editor) {
			
			if(node.getAttribute('_se_type')) {
				return;
			}
			
            var t = new Date().getTime();
			var html,data;
            var mid = 'i_m_b_' + t;
            var did = 'i_d_b_' + t;
			data = {
                modifyid: mid,
                deleteid: did
            };
			var href = node.href;
			html = new SinaEditor.$abstract.Template(SinaEditor.CONF.imgBubbleTemplete);
            var pos = SinaEditor.util.dom.getXY(node,true);
			var iframePos = SinaEditor.util.dom.getXY(editor.enty,true);
			if(iframePos[1] > pos[1]) {
				pos[1] = iframePos[1];
			}
            var bubble = SinaEditor.baseBubble.showBubble(html.evaluate(data), {
                x: pos[0],
                y: pos[1]
            });
			
			if(!SinaEditor.CONF.imgBubbleModify) {
				bubble.id(mid).style.display = 'none';
			} else {
				bubble.id(mid).onclick = function(){
					if (!SinaEditor.CONF.imgBubbleModify(node)) {
						SinaEditor.baseBubble.hiddenBubble();
					}
					return false;
				};
			}
			if(!SinaEditor.CONF.imgBubbleDelete) {
				bubble.id(did).style.display = 'none';
			} else {
				bubble.id(did).onclick = function(){
					if(!SinaEditor.CONF.imgBubbleDelete(node)) {
						SinaEditor.baseBubble.hiddenBubble();
					}
					return false;
				};
			}
        }
    });
}());

//上传图片
SinaEditor.plugins.add('imgUI',function(args){
    var editor = this;
    
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'imgUIBtn',
			'args' : args
		});
	}
	
	if (!args.customerPanel) {
		editor.callPlugin({
			'name' : 'imgUIPanel',
			'args' : args
		});
	}
	
	if(!SinaEditor.CONF.imgBubbleModify) {
		SinaEditor.CONF.imgBubbleModify = function(node){
			var panel = editor.panels.imgUI;
			panel.fromBubble = true;
			panel.tmpNode = node;
			editor.panels.imgUI.show();
		};
	}
	
	if(!SinaEditor.CONF.imgBubbleDelete) {
		SinaEditor.CONF.imgBubbleDelete = function(node){
			editor.operation.save(editor);
			node.parentNode.removeChild(node);
			editor.operation.save(editor);
			editor.focus();
		};
	}
});

//上传图片
SinaEditor.plugins.add('imgUIBtn',function(args){
    var editor = this;

	var btnConf = {
		title:'插入图片',
        normalClass: 'ico_img_1',
        disabledClass: 'ico_img_4',
        clickedClass: 'ico_img_3',
        mouseoverClass: 'ico_img_2',
        state: SinaEditor.BUTTONSTATE.NORMAL,
        group: 'richdata'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.imgUI = btn;
    
    return {
		'events' : [{
			"element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.panels.imgUI.show();
					return false;
				}
            }
		}]
	};
});

//上传图片
SinaEditor.plugins.add('imgUIPanel',function(args){
    var editor = this;
    var MAX_HEIGHT = 442;
    var MAX_WIDTH = 630;
    
    var imgPanel = SinaEditor.winDialog.create({
        title: '添加图片',
        content: SinaEditor.TOOLCONF.imgTemplate,
        funcClose: function(){
			if(showMy) {
				_backMy();
			} else {
				_backWeb();
			}
        }
    });
    
    var useClient = imgPanel.nodes.useClient;
    var clientView = imgPanel.nodes.clientView;
    var clientFile = imgPanel.nodes.clientFile;
    var contentLoading = imgPanel.nodes.contentLoading;
    var cancleClient = imgPanel.nodes.cancleClient;
    var resultPic = imgPanel.nodes.resultPic;
    var addClientPic = imgPanel.nodes.addClientPic;
    var webContent = imgPanel.nodes.webContent;
    var webUrl = imgPanel.nodes.webUrl;
    var clientResult = imgPanel.nodes.clientResult;
	var errTips = imgPanel.nodes.errTips;
	var clientIframe = imgPanel.nodes.clientIframe;
	var resetClient = imgPanel.nodes.resetClient;
	var clientUploadDiv = imgPanel.nodes.clientUploadDiv;
	var clientMoreUp = imgPanel.nodes.clientMoreUp;
	var clientForm = imgPanel.nodes.clientForm;
	var tabMy = imgPanel.nodes.tabMy;
	var tabWeb = imgPanel.nodes.tabWeb;
	var webAdd = imgPanel.nodes.webAdd;
	var webPic = imgPanel.nodes.webPic;
	var webPicContainer = webPic.parentNode;
	var webPicLoading = imgPanel.nodes.webPicLoading;
	var clientFileDrag = imgPanel.nodes.clientFileDrag;
	var showMy = true;
	var _defaultUrlVal = 'http://';
	var _inputInterval = null;
	var _oldVal = _defaultUrlVal;
	imgPanel.fromBubble = false;
	imgPanel.tmpNode = null;
	
	var switchTab = function(isMy) {
		if(showMy === !!isMy) {
			return;
		}
		if(isMy) {
			_backMy(true);
			tabMy.className = 'cur';
			webContent.style.display = 'none';
			tabWeb.className = '';
			useClient.style.display = '';
		} else {
			_backWeb(true);
			tabMy.className = '';
			useClient.style.display = 'none';
			tabWeb.className = 'cur';
			webContent.style.display = '';
		}
		showMy = !showMy;
	};
	
    var _showClient = function(elm){
        contentLoading.style.display = 'none';
        clientView.style.display = 'none';
        clientResult.style.display = 'none';
        elm.style.display = '';
    };
	
	var _errLogic = {
		showErr : function(str,time) {
			errTips.innerHTML = str;
			errTips.style.display = '';
	        if(time) {
				var me = this;
				setTimeout(function(){
					me.hiddenErr();
				},time*1000);
			}
	    },
		hiddenErr : function() {
			errTips.style.display = 'none';
		}
	};
	
	var resizeIMG = function(img) {
		if (!img.src) {
            return;
        }
		img.removeAttribute('width');
        img.removeAttribute('height');
        var width = img.width;
        var height = img.height;
        if (width < MAX_WIDTH && height < MAX_HEIGHT) {
            return;
        }
		if(MAX_WIDTH / MAX_HEIGHT < width / height) {
			img.width = MAX_WIDTH;
		} else {
			img.height = MAX_HEIGHT;
		}
	};
	
	var _backMy = function(noRest){
		//resultPic.src = '';
		_showClient(clientView);
		_errLogic.hiddenErr();
		if(!noRest) {
			imgPanel.fromBubble = false;
			imgPanel.tmpNode = null;
		}
		resultPic.src = '';
	};
	
	var _backWeb = function(noRest){
		_oldVal = _defaultUrlVal;
		webUrl.value = _defaultUrlVal;
		webAdd.style.display = 'none';
		webPicContainer.style.display = 'none';
		webPicLoading.style.display = 'none';
		_errLogic.hiddenErr();
		if(!noRest) {
			imgPanel.fromBubble = false;
			imgPanel.tmpNode = null;
		}
		webAdd.src = '';
	};
	
	var _isImg = function(type) {
		type = type || '';
		if(!SinaEditor.TOOLCONF.imgType.test(type)) {
			_errLogic.showErr(SinaEditor.TOOLCONF.imgErrTypeMSG,3);
			return false;
		}
		return true;
	};

	//给支持拖拽的浏览器绑定事件
	SinaEditor.ev.add(clientUploadDiv, 'dragenter', function(e){
		clientMoreUp.style.display = '';
		clientUploadDiv.style.borderStyle = 'dashed';
	});
	
	SinaEditor.ev.add(clientUploadDiv, 'dragover', function(e){
		SinaEditor.ev.stopEvent(e);
	});
	
	SinaEditor.ev.add(clientUploadDiv, 'drop', function(e){
		SinaEditor.ev.stopEvent(e);
		clientUploadDiv.style.borderStyle = 'solid';
		clientMoreUp.style.display = 'none';
		var file = e.dataTransfer.files;
		if(file.length) {
			file = file[0];
		}
		if(!_isImg(file.name)) {
			return;
		}
		var reader = new FileReader();
		reader.onload = function (e) {
			clientFileDrag.value = e.target.result;
			clientForm.submit();
			_showClient(contentLoading);
			clientFileDrag.value = '';
		};
		reader.readAsDataURL(file);
	});
	
	SinaEditor.ev.add(clientUploadDiv, 'dragleave', function(e){
		clientUploadDiv.style.borderStyle = 'solid';
		clientMoreUp.style.display = 'none';
	});

	
	editor.panels.imgUI = imgPanel;
	
	return {
		"events": [{
            "element": webUrl,
            "events": {
				'focus' : function() {
					_inputInterval = setInterval(function(){
						var newVal = webUrl.value;
						if(newVal != _oldVal) {
							_oldVal = newVal;
							webPicContainer.style.display = 'none';
							webPicLoading.style.display = '';
							var img = new Image();
							img.onload = function() {
								webPic.src = img.src;
								setTimeout(function(){
									resizeIMG(webPic);
									_errLogic.hiddenErr();
									webPicLoading.style.display = 'none';
									webPicContainer.style.display = '';
									webAdd.style.display = '';
								},1);
							};
							img.onerror = function() {
								webAdd.style.display = 'none';
								//TODO 放到配置里
								_errLogic.showErr('您输入的图片不是正确的地址，请重新输入。');
								webPicContainer.style.display = 'none';
								webPicLoading.style.display = 'none';
							};
							img.src = webUrl.value;
						}
					},1000);
				}
				,'blur' : function() {
					clearInterval(_inputInterval);
				}
            }
        },{
            "element": tabMy,
            "events": {
				'click' : function() {
					switchTab(true);
				}
            }
        },{
            "element": tabWeb,
            "events": {
				'click' : function() {
					switchTab(false);
				}
            }
        },{
            "element": addClientPic,
            "events": {
				'click' : function() {
					if(imgPanel.fromBubble) {
						imgPanel.tmpNode.src = resultPic.src;
						imgPanel.hidden();
						_backMy();
						return;
					}
					var img = SinaEditor.util.dom.createDom('img',{
						'ownerDocument' : editor.entyDoc,
						properties : {
							src : resultPic.src
						}
					});
					editor.operation.addNode(img,true);
					imgPanel.hidden();
					_backMy();
				}
            }
        },{
            "element": webAdd,
            "events": {
				'click' : function() {
					if(imgPanel.fromBubble) {
						imgPanel.tmpNode.src = webPic.src;
						imgPanel.hidden();
						_backWeb();
						return;
					}
					var img = SinaEditor.util.dom.createDom('img',{
						ownerDocument : editor.entyDoc,
						properties : {
							src : webPic.src
						}
					});
					editor.operation.addNode(img,true);
					imgPanel.hidden();
					_backWeb();
				}
            }
        },{
            "element": resetClient,
            "events": {
				'click' : function() {
					resultPic.src = '';
					_showClient(clientView);
				}
            }
        },{
            "element": clientUploadDiv,
            "events": {
				'mousemove' : function(e) {
					var pos = SinaEditor.util.dom.getXY(clientUploadDiv),
						scroll = SinaEditor.util.dom.getScrollPos(),
						//[LEFT,TOP]的偏差值
						ps = [10,15];
					if(SinaEditor.env.$IE) {
						ps[0] = 200;
					}
					clientFile.style.left = (e.clientX - pos[0] - ps[0] + scroll[1]) + 'px';
					clientFile.style.top = (e.clientY - pos[1] -ps[1] + scroll[0]) + 'px';
				}
            }
        },/*{
            "element": resultPic,
            "events": {
				'load' : function() {
					resizeIMG(resultPic);
				}
            }
        },{
            "element": webPic,
            "events": {
				'load' : function() {
					resizeIMG(webPic);
					_errLogic.hiddenErr();
					webPicContainer.style.display = '';
					webPicLoading.style.display = 'none';
					webAdd.style.display = '';
				},'error' : function() {
					webAdd.style.display = 'none';
					//TODO 放到配置里
					_errLogic.showErr('您输入的图片不是正确的地址，请重新输入。');
					webPicContainer.style.display = 'none';
					webPicLoading.style.display = 'none';
				}
            }
        },*/{
            "element": cancleClient,
            "events": {
				'click' : function() {
					clientIframe.src = '';
					_showClient(clientView);
				}
            }
        },{
            "element": clientIframe,
            "events": {
				'load' : function() {
					console.log('.......客户端的华丽家在！！！');
					try {
						var val = clientIframe.contentWindow.document.body.innerHTML;
						if(!val) {
							console.log('没有加载东西！虚报');
							return;
						}
						_showClient(clientResult);
						clientIframe.contentWindow.document.body.innerHTML = '';
						var img = new Image();
						img.onload = function() {
							resultPic.src = val;
							setTimeout(function(){
								resizeIMG(resultPic);
							},1);
						};
						img.src = val;
					} catch(e) {}
				}
            }
        },{
            "element": clientFile,
            "events": {
				'change' : function() {
					if(!_isImg(clientFile.value)) {
						return;
					}
					clientForm.submit();
					_showClient(contentLoading);
				}
            }
        }]
	};
});
//增加缩进
SinaEditor.plugins.add('indent',function(args){
	var editor = this;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'indentBtn',
			'args' : args
		});
	}
	
	/**
	 * #BLOGBUG-12323 在表格内使用此方法，使用并取消，在webkit下会在table的顶上生成一个br标签。
	 * #BLOGBUG-12324 在webkit下输入一行文字，全选(非全选不存在此缺陷)，设置背景色，再使用此方法，颜色丢失，span标签丢失。
	 * 增加缩进
	 */
	editor.operation.indent = function(){
		editor.focus();
        editor.operation.save(editor);
		
		editor.entyDoc.execCommand("indent",false,'');
		
        editor.operation.save(editor);
		editor.focus();
    };
});
//增加缩进
SinaEditor.plugins.add('indentBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'增加缩进',
		normalClass : 'ico_indent_1'
		,disabledClass : 'ico_indent_4'
		,clickedClass : 'ico_indent_3'
		,mouseoverClass : 'ico_indent_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.indent = btn;
	
    return {
        'initialize': function(){
        },
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.indent();
					return false;
				}
            }
        }]
    };
});
/**
 * 初始化编辑器的方法
 */
SinaEditor.plugins.add('initFromStatic',function(args){
	var editor = this;
    function init(){
        editor.entyWin = editor.enty.contentWindow;
        editor.entyDoc = editor.entyWin.document;
        editor.entyBody = editor.entyDoc.body;
        
        editor.entyBody.spellcheck = !!editor.option.disableNativeSpellChecker;
        if (SinaEditor.env.$IE) {
            editor.entyBody.hideFocus = true;
            editor.entyBody.disabled = true;
            editor.entyBody.contentEditable = true;
            editor.entyBody.removeAttribute('disabled');
        }
        else {
            setTimeout(function(){
                if (SinaEditor.env.$GENKO) {
					//editor.entyDoc.designMode = 'on';
                    editor.entyBody.contentEditable = true;
                    var fFocus = false;
                    //修正在FF下，iframe样式修改造成的不能再编辑问题。
                    SinaEditor.ev.add(editor.enty, 'DOMAttrModified', function(e){
                        var an = e.attrName.toUpperCase();
                        if (an == 'CLASS' || an == 'STYLE') {
                            editor.entyBody.contentEditable = false;
                            editor.entyBody.contentEditable = true;
                            editor.entyWin.blur();
                            editor.entyWin.focus();
                        }
                    });
                }
                else 
                    if (SinaEditor.env.$WEBKIT) {
                        editor.entyBody.parentNode.contentEditable = true;
                    }
                    else {
                        editor.entyDoc.designMode = 'on';
                    }
            }, 0);
        }
        
        setTimeout(function(){
            try {
                editor.entyDoc.execCommand('enableObjectResizing', false, !editor.option.disableObjectResizing);
            } 
            catch (e) {
            }
            try {
                editor.entyDoc.execCommand('enableInlineTableEditing', false, !editor.option.disableNativeTableHandles);
            } 
            catch (e) {
            }
			
            if (SinaEditor.env.$IE <= 6) {
				try{
					//图标被重复的请求
					document.execCommand("BackgroundImageCache", false, true);
				}catch(e){}
                setTimeout(function(){
                    var doc = editor.entyDoc;
                    if (doc) {
                        var $body = doc.body;
                        $body.runtimeStyle.marginBottom = '0px';
                        $body.runtimeStyle.marginBottom = '';
                    }
                }, 1000);
            }
        }, 0);
		
		if(SinaEditor.env.$IE) {
			var sc = SinaEditor.util.dom.createDom('script', {
	            'ownerDocument': editor.entyDoc,
	            'attributes': {
					'type':'text/javascript',
	                'src':window.location.href.substring(0,window.location.href.lastIndexOf('/')+1)+'ierange-m2.js?'+SinaEditor.version
	            }
	        });
			
			editor.entyDoc.getElementsByTagName('head')[0].appendChild(sc);
		}
        
        if (editor.option.styleLinks) {
            var links = editor.option.styleLinks;
			var i;
            for (i = 0; links[i]; i++) {
                SinaEditor.util.dom.addLink(links[i], editor.entyDoc);
            }
        }
		
        if (editor.option.styles) {
            SinaEditor.util.dom.addStyles(editor.option.styles, editor.entyDoc);
        }
    }
    
    var func = 'document.open();' +
			    (SinaEditor.env.isCustomDomain ? 'document.domian="' + document.domain + '";' : '') +
			    'document.close();';
    
    var iframe = SinaEditor.util.dom.createDomFromHTML('<iframe' +
			    ' style="width:100%;height:100%;z-index:999;"' +
			    ' frameBorder="0"' +
			    ' src="' +
			    (SinaEditor.env.$IE ? 'javascript:void(function(){' + encodeURIComponent(func) + '}())' : '') +
			    '"' +
			    ' allowTransparency="true"' +
			    '></iframe>');
    editor.enty = iframe;
    SinaEditor.ev.add(iframe, 'load', init);
    args.parent.appendChild(iframe);
});

//用于斜体字
//通过添加strong标签和移除strong标签来达到
SinaEditor.plugins.add('italic',function(args){
	var editor = this;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'italicBtn',
			'args' : args
		});
	}
	
	var btn = editor.btns.italic;
	
	/**
	 * 斜体，isAdd可能是参照节点，也可能是一个boolean值
	 * @param {Object} isAdd
	 */
	editor.operation.italic = function(){
		var ranges = SinaEditor.range.getCurrentRanges(editor.entyWin);
		//TODO 和IE统一，暂时只支持第一个选区
		ranges = ranges[0];
		if(!ranges) {
			return;
		}
		var text = ranges.toString();
        editor.operation.save(editor);
		
		//var isItalic = editor.operateState['italic'];
		var isItalic = editor.operateState.italic;
		
		if(isItalic) {
			console.log('执行去斜体操作');
			SinaEditor.range.removeStyle(editor, {
	            'useTagName': ['i','em']
	        });
			//#BLOGBUG-12284 safari 4.0竟然会在操作对齐时把它转化成样式的形式。
			SinaEditor.range.removeStyle(editor, {
	            'useTagName': 'span',
				'style': 'fontStyle'
	        });
			btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
		} else {
			console.log('执行斜体操作');
			SinaEditor.range.applyStyle(editor, {
	            'useTagName': 'em'
	        });
			btn.setState(SinaEditor.BUTTONSTATE.CLICKED);
		}
        
		//editor.operateState['italic'] = !isItalic;
		editor.operateState.italic = !isItalic;
        editor.operation.save(editor);
    };
	
	
    return {
        "events": [{
            "element": editor,
            "events": {
				'editorSelectionChange' : function(e,range,refNode) {
					var isItalic = SinaEditor.range.queryCommandState(this.entyDoc,'italic');
					
					if(isItalic) {
						btn.setState(SinaEditor.BUTTONSTATE.CLICKED);
					} else {
						btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
					}
					
					//this.operateState['italic'] = isItalic;
					this.operateState.italic = isItalic;
				}
				,'ctrli' : function() {
					editor.operation.italic(this);
				}
            }
        }]
    };
});
//用于斜体字
//通过添加strong标签和移除strong标签来达到
SinaEditor.plugins.add('italicBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'斜体',
		normalClass : 'ico_italic_1'
		,disabledClass : 'ico_italic_4'
		,clickedClass : 'ico_italic_3'
		,mouseoverClass : 'ico_italic_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'common'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.italic = btn;
	
    return {
        "events": [{
			'element' : btn.$,
			'events' : {
				'click' : function() {
					if(editor.btns.italic.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.italic();
					return false;
				}
			}
		}]
    };
});
//居中
SinaEditor.plugins.add('justifycenter',function(args){
	var editor = this;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'justifycenterBtn',
			'args' : args
		});
	}
	
	/**
	 * #BLOGBUG-12277 在对多行文字进行对齐操作时，某行设置以后，再修改，这一行的span标签会被删去。
	 * 添加项目符号
	 */
	editor.operation.justifycenter = function(){
        editor.operation.save(editor);
		
		editor.entyDoc.execCommand("Justifycenter",'','');
		
        editor.operation.save(editor);
    };
});
//居中
SinaEditor.plugins.add('justifycenterBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'居中',
		normalClass : 'ico_justifycenter_1'
		,disabledClass : 'ico_justifycenter_4'
		,clickedClass : 'ico_justifycenter_3'
		,mouseoverClass : 'ico_justifycenter_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.justifycenter = btn;
	
    return {
        'initialize': function(){
        },
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.justifycenter();
					return false;
				}
            }
        }]
    };
});
//居左
SinaEditor.plugins.add('justifyleft',function(args){
	var editor = this;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'justifyleftBtn',
			'args' : args
		});
	}
	
	/**
	 * 添加项目符号
	 */
	editor.operation.justifyleft = function(){
        editor.operation.save(editor);
		
		editor.entyDoc.execCommand("Justifyleft",'','');
		
        editor.operation.save(editor);
    };
});
//居左
SinaEditor.plugins.add('justifyleftBtn',function(args){
	var editor = this;
	
	var btnConf = {
		title:'居左',
		normalClass : 'ico_justifyleft_1'
		,disabledClass : 'ico_justifyleft_4'
		,clickedClass : 'ico_justifyleft_3'
		,mouseoverClass : 'ico_justifyleft_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.justifyleft = btn;
	
    return {
        'initialize': function(){
        },
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.justifyleft();
					return false;
				}
            }
        }]
    };
});
//减少缩进
SinaEditor.plugins.add('justifyright',function(args){
	var editor = this;
	var btn = null;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'justifyrightBtn',
			'args' : args
		});
	}
	
	/**
	 * 添加项目符号
	 */
	editor.operation.justifyright = function(){
        editor.operation.save(editor);
		
		editor.entyDoc.execCommand("justifyright",'','');
		
        editor.operation.save(editor);
    };
});
//减少缩进
SinaEditor.plugins.add('justifyrightBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'居右',
		normalClass : 'ico_justifyright_1'
		,disabledClass : 'ico_justifyright_4'
		,clickedClass : 'ico_justifyright_3'
		,mouseoverClass : 'ico_justifyright_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.justifyright = btn;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.justifyright();
					return false;
				}
            }
        }]
    };
});
(function () {
    //当鼠标链接在A标签内时
    SinaEditor.plugins.add('linkBubble',SinaEditor.$abstract.BaseBubblePlugin({
        tagName: 'A',
        applyStyles: SinaEditor.CONF.aBubbleStyles,
        showBubble: function(node, editor){
			var href = node.href;
			if(!href) {
				return;
			}
            var t = new Date().getTime();
			var html,data;
            var mid = 'a_m_b_' + t;
            var did = 'a_d_b_' + t;
			data = {
                modifyid: mid,
                deleteid: did
            };
			var mailTo = href.match(/^mailto:(.*$)/i);
			if(mailTo) {
				html = new SinaEditor.$abstract.Template(SinaEditor.CONF.mailBubbleTemplete);
				data.srcstr = subStr(mailTo[1]);
			} else {
				html = new SinaEditor.$abstract.Template(SinaEditor.CONF.aBubbleTemplete);
				data.src = decodeURI(href);
				data.srcstr = subStr(decodeURI(href));
			}
            var pos = SinaEditor.util.dom.getXY(node,true);
			var iframePos = SinaEditor.util.dom.getXY(editor.enty,true);
			pos[1] -= node.offsetHeight;
			if(iframePos[1] > pos[1]) {
				pos[1] = iframePos[1];
			}
			//#BLOGBUG-12252 链接文字折行后，定位会不准确
            var bubble = SinaEditor.baseBubble.showBubble(html.evaluate(data), {
                x: pos[0],
                y: pos[1]
            });
			if(!SinaEditor.CONF.aBubbleModify) {
				bubble.id(mid).style.display = 'none';
			} else {
				bubble.id(mid).onclick = function(){
					if (!SinaEditor.CONF.aBubbleModify(node)) {
						SinaEditor.baseBubble.hiddenBubble();
					}
					return false;
				};
			}
			if(!SinaEditor.CONF.aBubbleDelete) {
				bubble.id(did).style.display = 'none';
			} else {
				bubble.id(did).onclick = function(){
					if(!SinaEditor.CONF.aBubbleDelete(node)) {
						SinaEditor.baseBubble.hiddenBubble();
					}
					return false;
				};
			}
			/*
			SinaEditor.CONF.aBubbleDelete = SinaEditor.CONF.aBubbleDelete || function(){
                
				editor.operation.save(editor);
			
				var children = node.childNodes;
				SinaEditor.range.setStartBefore(editor.entyWin,node);
				node.parentNode.removeChild(node);
				var len = children.length - 1;
				
				for(var i=len; i>=0; i--) {
					SinaEditor.range.insertNode(editor.entyWin,children[i]);
				}
				
                SinaEditor.baseBubble.hiddenBubble();
				editor.focus();
				
				editor.operation.save(editor);
            };
            */
            
        }
    }));
	
	function subStr(str){
        var newStr = [];
        var len = str.length;
        if (len > 30) {
            newStr.push(str.substring(0, 15));
            newStr.push(str.substring(len - 15, len));
            return newStr.join('...');
        }
        else {
            return str;
        }
    }
}());

//插入链接
SinaEditor.plugins.add('link',function(args){
    var editor = this;
    var btn = null;
    
    if (!args.customerPanel) {
       editor.callPlugin({
			'name' : 'linkPanel',
			'args' : args
		});
    }
	
	if (!args.customerBtn) {
       editor.callPlugin({
			'name' : 'linkBtn',
			'args' : args
		});
    }
    
    /**
     * 添加链接，根据参数传递的情况决定如何操作
     * 1.有选中文字：首先会清理掉里面所有的A标签
     * 	a.不传递：检测选区中的a标签，全部清除。
     * 	b.传递link：选区包裹上以A标签作为链接。
     * 	c.传递link,str：忽略str,同操作1b。
     * 2.没有选中文字：
     * 	a.不传递：不做任何操作。
     * 	b.传递link:以link作为str来生成链接
     * 	c.传递link,str:添加链接。
     * @param {Object} opt_obj 包含多种可选参数：
     * 	link 链接
     * 	str 文字
     * 	range 当前的选区
     * 	elm 传递的节点，一定是A标签，如果包含有link，那么则替换elm的地址，没有，那么删除A标签的地址
     */
    editor.operation.link = function(optObj){
		editor.focus();
        var range = optObj.range || SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
		var link = optObj.link;
		var str = optObj.str || link;
		
        if (!link && !range) {
            //2a.不传递：不做任何操作。
			console.log("2a.不传递：不做任何操作。");
            return;
        }
        
        editor.operation.save(editor);
		
		if(optObj.elm) {
			var elm = optObj.elm;
			if(optObj.link) {
				elm.href = encodeURI(optObj.link);
				range.selectNodeContents(elm);
				SinaEditor.range.applyRanges(editor.entyWin, range);
			} else {
				SinaEditor.util.dom.removeTag(elm);
			}
		} else {
			var a = SinaEditor.util.dom.createDom('a', {
				ownerDocument: editor.entyDoc,
	            properties: {
	                'target': '_blank'
	            }
	        });

	        if (!range || range && range.collapsed) {
	            //2b,c.添加链接。 
				a.innerHTML = str;
				a.href = encodeURI(link);
	            //range ? range.insertNode(a) : editor.entyBody.appendChild(a);
				if(range) {
					range.insertNode(a);
				} else {
					editor.entyBody.appendChild(a);
				}
				range.selectNodeContents(a);
				SinaEditor.range.applyRanges(editor.entyWin, range);
	        } else {
				//1a：检测选区中的a标签，全部清除。
//				SinaEditor.range.removeStyle(editor, {
//	                'useTagName': 'a'
//	            });
				editor.entyDoc.execCommand('unlink',false,'');
				
		        if(link) {
					//1bc:选区包裹上以A标签作为链接。
					a.href = encodeURI(link);
					//#BLOGBUG-12256
					//之前的操作破坏了选区，需要重新获取(有些浏览器的currentRange不是同一个引用)
					range = SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
					try {
						//在跨节点时会报错
						range.surroundContents(a);
					} catch(e) {
						var content = range.extractContents();
						a.appendChild(content);
						range.insertNode(a);
					}
					range.selectNodeContents(a);
					SinaEditor.range.applyRanges(editor.entyWin, range);
					//#BLOGBUG-12345 转中文不给力啊。
					//editor.entyDoc.execCommand('createLink',false,encodeURIComponent(link));
				}
	        }
		}
        
        editor.operation.save(editor);
    };
});

//插入链接的按钮
SinaEditor.plugins.add('linkBtn',function(args){
    var editor = this;
	var linkPanel = editor.panels.link;
	var hidden = linkPanel.nodes.hidden;
	
	var btnConf = {
		title:' 插入链接',
        normalClass: 'ico_link_1',
        disabledClass: 'ico_link_4',
        clickedClass: 'ico_link_3',
        mouseoverClass: 'ico_link_2',
        state: SinaEditor.BUTTONSTATE.DISABLED,
        group: 'common'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.link = btn;
	
	return {
		"events": [{
            "element": btn.$,
            "events": {
                'click' : function() {
					if(editor.btns.link.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					var range = SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
					var str = range.toString();
					if(SinaEditor.TOOLCONF.addLinkNow && SinaEditor.TOOLCONF.addLinkNow.test(str)) {
						editor.operation.link({'link':str,'range':range});
					} else {
						if(range.collapsed) {
							hidden.style.display = '';
						}
						linkPanel.show();
					}
                    return false;
				}
            }
        }]
	};
});

//插入链接的弹出浮层
SinaEditor.plugins.add('linkPanel',function(args){
    var editor = this;
	
    var linkPanel = SinaEditor.winDialog.create({
        title: '添加链接',
        content: SinaEditor.TOOLCONF.linkTemplate,
		funcClose:function(){
			_back();
		}
    });
	
    linkPanel.setMiddle();
    linkPanel.setFixed(true);
    
    var okNode = linkPanel.nodes.ok;
    var cancelNode = linkPanel.nodes.cancel;
    var textNode = linkPanel.nodes.text;
	var hiddNode = linkPanel.nodes.hidden;
    var linkNode = linkPanel.nodes.link;
	var _tmpNode;
    
	var _back = function() {
		hiddNode.style.display = 'none';
		_tmpNode = null;
        textNode.value = '';
		linkNode.value = 'http://';
	};
	
	editor.panels.link = linkPanel;
	
	//link浮层的代码
    SinaEditor.CONF.aBubbleModify = function(node) {
		linkNode.value = decodeURI(node.href);
		_tmpNode = node;
		linkPanel.show();
	};
	
	SinaEditor.CONF.aBubbleDelete = function(node) {
		editor.operation.link({'elm':node});
	};
	
    return {
        "events": [{
            "element": okNode,
            "events": {
                'click': function(){
					editor.operation.link({
						'link' : linkNode.value,
						'str' : textNode.value,
						'elm' : _tmpNode
					});
					_back();
					linkPanel.hidden();
                }
            }
        },{
            "element": cancelNode,
            "events": {
                'click': function(){
                    _back();
        			linkPanel.hidden();
                }
            }
        }]
    };
});

//项目符号
//添加ul标签
SinaEditor.plugins.add('markList',function(args){
	var editor = this;
	var btn = null;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'markListBtn',
			'args' : args
		});
	}
	
	/**
	 * 添加项目符号
	 */
	editor.operation.markList = function(){
        editor.operation.save(editor);
		
		editor.entyDoc.execCommand("insertunorderedlist",'','');
		editor.focus();
		
        editor.operation.save(editor);
    };
});
//项目符号
//添加ul标签
SinaEditor.plugins.add('markListBtn',function(args){
	var editor = this;
	
	var btnConf = {
		title:'项目符号',
		normalClass : 'ico_marklist_1'
		,disabledClass : 'ico_marklist_4'
		,clickedClass : 'ico_marklist_3'
		,mouseoverClass : 'ico_marklist_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.markList = btn;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.markList();
					return false;
				}
            }
        }]
    };
});
//数字符号
//添加ol标签
SinaEditor.plugins.add('numberList',function(args){
	var editor = this;
	var btn = null;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'numberListBtn',
			'args' : args
		});
	}
	
	/**
	 * 添加项目符号
	 */
	editor.operation.numberList = function(){
        editor.operation.save(editor);
		
		editor.focus();
		editor.entyDoc.execCommand("insertorderedlist",'','');
		
        editor.operation.save(editor);
    };
});
//数字符号
//添加ol标签
SinaEditor.plugins.add('numberListBtn',function(args){
	var editor = this;
	
	var btnConf = {
		title:'数字符号',
		normalClass : 'ico_numberlist_1'
		,disabledClass : 'ico_numberlist_4'
		,clickedClass : 'ico_numberlist_3'
		,mouseoverClass : 'ico_numberlist_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.numberList = btn;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.numberList();
					return false;
				}
            }
        }]
    };
});
//减少缩进
SinaEditor.plugins.add('outdent',function(args){
	var editor = this;
	
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'outdentBtn',
			'args' : args
		});
	}
	
	/**
	 * 添加项目符号
	 */
	editor.operation.outdent = function(){
		editor.focus();
        editor.operation.save(editor);
		
		editor.entyDoc.execCommand("outdent",'','');
		
        editor.operation.save(editor);
		editor.focus();
    };
});
//减少缩进
SinaEditor.plugins.add('outdentBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'减少缩进',
		normalClass : 'ico_outdent_1'
		,disabledClass : 'ico_outdent_4'
		,clickedClass : 'ico_outdent_3'
		,mouseoverClass : 'ico_outdent_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.outdent = btn;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.outdent();
					return false;
				}
            }
        }]
    };
});
//粘贴过滤

SinaEditor.plugins.add('pasteFilter', function(args){
    var editor = this;
    editor.operation.pasteFilter = function(){
        var argus = editor.option.filter.args;
		var i=0;
        //var tags = argus['tagName'];
		var tags = argus.tagName;
        if (tags) {
            tags = tags.split('|');
            var tag, eles;
            while (tags[i]) {
                eles = editor.entyDoc.getElementsByTagName(tags[i]);
                while (eles[0]) {
                    SinaEditor.util.dom.delElement(eles[0]);
                }
                i++;
            }
        }
        //var atts = argus['attribute'];
		var atts = argus.attribute;
        if (atts) {
            atts = atts.split('|');
            walkElment(editor.entyDoc.body, atts);
        }
		i=0;
		var imgs = editor.entyDoc.getElementsByTagName('img');
		for(;imgs[i]; i++ ) {
			if(imgs[i].src.indexOf('file:///') === 0) {
				SinaEditor.util.dom.delElement(imgs[i]);
				i--;
			}
		}
    };
    
    var walkElment = function(elmens, atts){
        if (elmens.nodeType !== SinaEditor.NODETYPE.ELEMENT) {
            return;
        }
        var i = 0;
        while (atts[i]) {
            elmens.removeAttribute(atts[i]);
            i++;
        }
        i = 0;
        if (elmens.hasChildNodes()) {
            var childNodes = elmens.childNodes;
            while (childNodes[i]) {
                walkElment(childNodes[i], atts);
                i++;
            }
        }
    };
    
    //自定义事件之后才执行到
    
    var exChangeObject = function(objects){
        var img, i = 0;
        while (objects[i]) {
            img = SinaEditor.util.dom.createDomFromHTML('<img src="'+SinaEditor.CONF.transparentIMG+'" _se_flash="' + encodeURIComponent(SinaEditor.util.dom.outerHTML(objects[i])) + '" width="' + objects[i].width + '" height="' + objects[i].height + '" style="background:url(\''+SinaEditor.CONF.fakeFLASH+'\') no-repeat scroll center center transparent;border:1px solid #A9A9A9;" >', editor.entyDoc);
            objects[i].parentNode.replaceChild(img, objects[i]);
        }
    };
    
    var exChangeObjectBack = function(){
        var imgs = editor.entyDoc.getElementsByTagName('img');
        var attStr, flash, i = 0;
        while (imgs[i]) {
            attStr = imgs[i].getAttribute('_se_flash');
            if (attStr) {
                flash = SinaEditor.util.dom.createDomFromHTML(decodeURIComponent(attStr), editor.entyDoc);
                imgs[i].parentNode.replaceChild(flash, imgs[i]);
            }
            else {
                i++;
            }
        }
    };
    
    return {
        "events": [{
            "element": editor.entyBody,
            "events": {
                'paste': function(e){
					//#BLOGBUG-12321 safari下，焦点在table内，从word粘贴会跳出，原因是粘贴出了和<tr>标签并列的<p>标签。延迟。
                    setTimeout(function(){
						var i=0,tds;
						editor.operation.pasteFilter();
						exChangeObject(editor.entyDoc.getElementsByTagName('object'));
                        exChangeObject(editor.entyDoc.getElementsByTagName('embed'));
						//#BLOGBUG-12333 从word粘贴无内容的table，缩成一团。
						tds = editor.entyDoc.getElementsByTagName('td');
						for(i=0; tds[i]; i++) {
							var val = tds[i].textContent || tds[i].textContent;
							if(!val) {
								tds[i].innerHTML = '&nbsp;';
							}
						}
                    }, 10);
                }
            }
        }, {
            "element": editor,
            "events": {
                'editorStateChange': function(){
                    var state = this.getState();
                    if (state == SinaEditor.STATE.EDITING) {
                        exChangeObject(this.entyDoc.getElementsByTagName('object'));
                        exChangeObject(this.entyDoc.getElementsByTagName('embed'));
                    } else if (state == SinaEditor.STATE.SHOWSOURCE) {
                        exChangeObjectBack();
                    }
                }
            }
        }]
    };
});


SinaEditor.plugins.add('redoManager', function(args){
    var editor = this;
    
    SinaEditor.redoManager.addEditor(editor);
    
    editor._.doManagerBuffer = 500;
    
	/**
	 * 重做刚才撤销的操作。
	 * @param {Object} e
	 */
    editor.operation.redo = function(e){
        SinaEditor.redoManager.redo(editor);
    };
	/**
	 * 撤销刚才的操作
	 * @param {Object} e
	 */
    editor.operation.undo = function(e){
        SinaEditor.redoManager.undo(editor);
    };
	/**
	 * 记录刚才的操作
	 * @param {Object} e
	 */
    editor.operation.save = function(e){
        SinaEditor.redoManager.save(editor);
    };
	/**
	 * 清理所有的历史记录信息。
	 * @param {Object} e
	 */
    editor.operation.clearRU = function(e){
        SinaEditor.redoManager.addEditor(editor);
    };
	
	if(!args.customerBtnU) {
		editor.callPlugin({
			'name' : 'undoBtn',
			'args' : args
		});
	}
	
	if(!args.customerBtnR) {
		editor.callPlugin({
			'name' : 'redoBtn',
			'args' : args
		});
	}
    
    return {
        "events": [{
            "element": editor,
            "events": {
                'ctrly': function(e){
                    SinaEditor.redoManager.redo(editor);
                },
                'ctrlz': function(e){
                    SinaEditor.redoManager.undo(editor);
                }
            }
        }, {
            "element": editor.entyDoc,
            "events": {
                'keydown': function(e){
                    setTimeout(function(){
                        editor.entyWin.clearTimeout(editor._.doManagerBufferTimmer);
                        editor._.doManagerBufferTimmer = editor.entyWin.setTimeout(function(){
                            console.log("空闲" + editor._.doManagerBuffer + "毫秒就保存");
                            SinaEditor.redoManager.save(editor);
                        }, editor._.doManagerBuffer);
                    }, 0);
                }
            }
        }]
    };
});

//重做
SinaEditor.plugins.add('redoBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'重做',
		normalClass : 'ico_redo_1'
		,disabledClass : 'ico_redo_4'
		,clickedClass : 'ico_redo_3'
		//,mouseoverClass : 'ico_redo_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'redoAndUndo'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.redo = btn;
	
    return {
        "events": [{
            "element": editor,
            "events": {
                'redoAndUndoChanged': function(){
                    if(editor._.hasRedo) {
						btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
					} else {
						btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
					}
                }
            }
        },{
			'element' : btn.$,
			'events' : {
				'click' : function() {
					if(editor.getState() == SinaEditor.STATE.EDITING) {
						SinaEditor.redoManager.redo(editor);
					}
				},'mouseover' : function() {
					if(editor._.hasRedo && btn.getState() === SinaEditor.BUTTONSTATE.NORMAL) {
						this.className = 'ico_redo_2';
					}
				},'mouseout' : function() {
					this.className = 'ico_redo_4';
					if(editor._.hasRedo && btn.getState() === SinaEditor.BUTTONSTATE.NORMAL) {
						this.className = 'ico_redo_1';
					}
				}
			}
		}]
    };
});


SinaEditor.plugins.add('showSource', function(args){
    var editor = this;
    //创建textarea
    editor.entyArea = args.entyArea;
    if (!editor.entyArea) {
        var area = SinaEditor.util.dom.createDom('textarea', {
            'attributes': {
                'id': editor.option.id + '_area_' + (+(new Date()))
            }
        });
        area.style.cssText = "width:100%;height:100%;display:none;resize:none;";
        editor.entyArea = area;
        editor.enty.parentNode.appendChild(area);
    }
	
	if(SinaEditor.env.$IE) {
		editor.entyArea.style.height = editor.enty.offsetHeight + 'px';
	}
    
    if (!editor.customerBtn) {
        editor.callPlugin({
            'name': 'showSourceBtn',
            'args': args
        });
    }
    
	/**
	 * 查看源代码。或者把源代码迁移到iframe中
	 * @param {Boolean} toArea true时为从iframe到textarea
	 */
    editor.operation.swapData = function(toArea){
        var type;
        var filter = editor.operation.pasteFilter ||
        function(){
        };
        if (toArea) {
            editor.setState(SinaEditor.STATE.SHOWSOURCE);
            filter();
            //if(args.formatter) {
			
			if (!SinaEditor.env.$IE >= 9) {
				//IE6它受不起啊。。。有木有
				editor.entyArea.value = SinaEditor.util.styleHTML(editor.entyBody.innerHTML, 1, '\t');
			} else {
				editor.entyArea.value = editor.entyBody.innerHTML;
			}
			
            //

            //} else {
            //	editor.entyArea.value = editor.entyBody.innerHTML;
            //}
            //防止flash自动播放
            editor.entyBody.innerHTML = '';
        }
        else {
            editor.entyBody.innerHTML = (editor.entyArea.value).replace(/\u200B|\t|\n|\r/g, '');
            filter();
            editor.setState(SinaEditor.STATE.EDITING);
        }
    };
    
    return {
        'initialize': function(){
            editor.entyArea.style.display = 'none';
            editor.enty.style.display = '';
            editor.focus();
            SinaEditor.redoManager.addEditor(editor);
        }
    };
});


SinaEditor.plugins.add('showSourceBtn',function(args){
	var editor = this;
	//在源代码模式下开启
	SinaEditor.BUTTON['source'] = function(btn) {
		switch(this.getState()) {
			case SinaEditor.STATE.CREATING :
				btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
				break;
			default :
				btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
		}
	};

	var btnConf = {
		title:'查看源代码',
        normalClass: 'ico_showsrc_1',
        disabledClass: 'ico_showsrc_4',
        clickedClass: 'ico_showsrc_3',
        mouseoverClass: 'ico_showsrc_2',
        state: SinaEditor.BUTTONSTATE.DISABLED,
		editorChangeType:'source',
        group: 'common'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.showSource = btn;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
                'click': function(){
					var state = editor.getState();
					if(state === SinaEditor.STATE.EDITING) {
						editor.operation.save(editor);
						editor.enty.style.display = 'none';
						editor.entyArea.style.display = '';
						editor.operation.swapData(true);
						editor.entyArea.focus();
					} else if(state === SinaEditor.STATE.SHOWSOURCE) {
						editor.operation.swapData(false);
						editor.entyArea.style.display = 'none';
						editor.enty.style.display = '';
						editor.focus();
						editor.operation.save(editor);
					}
                }
            }
        }]
    };
});
//获取最终编辑的内容
SinaEditor.plugins.add('submit',function(args){
	var editor = this;
	
	/**
	 * 获取最终编辑的内容
	 * @return {String} 最终的html字符串
	 */
	editor.operation.submit = function(){
		var str = '',
			filter = editor.operation.pasteFilter || function(){};
			swapData = editor.operation.swapData || function(){};
		swapData(true);
		str = editor.entyArea.value;
		swapData(false);
		return str;
	};
});
//插入表格
SinaEditor.plugins.add('tableUI',function(args){
	var editor = this;
	
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'tableUIBtn',
			'args' : args
		});
	}
	
	if (!args.customerPanel) {
		editor.callPlugin({
			'name' : 'tableUIPanel',
			'args' : args
		});
	}
	
	/**
	 * 添加表格
	 * @param {Interget} x 行数
	 * @param {Object} y 列数
	 * @param {Object} option 可选参数，目前没有用到
	 */
	editor.operation.tableCreate = function(x,y,option){
		
		if(x<=0 || y<=0) {
			return;
		}
		
        editor.operation.save(editor);
		
		var tabHTMLs = ['<table cellspacing="1" cellpadding="3" style="width:80%;text-align:center;" border="1" >'];
		var i,j;
		for(i=0; i<y; i++) {
			tabHTMLs.push('<tr>');
			for (j = 0; j < x; j++) {
				tabHTMLs.push('<td>&nbsp;</td>');
			}
			tabHTMLs.push('</tr>');
		}
		tabHTMLs.push('</table>');
		var table = SinaEditor.util.dom.createDomFromHTML(tabHTMLs.join(''),editor.entyDoc);
		editor.operation.addNode(table);
        
        editor.operation.save(editor);
    };
});
//插入表格
SinaEditor.plugins.add('tableUIBtn',function(args){
	var editor = this;
	
	var btnConf = {
		title:'插入表格',
		normalClass : 'ico_table_1'
		,disabledClass : 'ico_table_4'
		,clickedClass : 'ico_table_3'
		,mouseoverClass : 'ico_table_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'richdata'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.tableUI	= btn;
	editor.btns.tableUI.PANELX = 0;
	editor.btns.tableUI.PANELY = 0;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
                'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					var panel = editor.panels.tableUI;
					var scroll = SinaEditor.util.dom.getScrollPos();
					var pos = SinaEditor.util.dom.getXY(btn.$);
					panel.setPosition({x:pos[0],y:(pos[1]+btn.$.offsetHeight)});
					panel.nodes.chooseContent.style.width = '0em';
					panel.nodes.chooseContent.style.height = '0em';
					panel.show();
					var palPos = SinaEditor.util.dom.getXY(panel.nodes.panel);
					editor.btns.tableUI.PANELX = palPos[0];
					editor.btns.tableUI.PANELY = palPos[1];
					return false;
				}
            }
        }]
    };
});
//插入表格
SinaEditor.plugins.add('tableUIPanel',function(args){
	var editor = this;
	var btn = null;
	
	var colors = args.colors || SinaEditor.TOOLCONF.COLOR;
	var tablePanel = new SinaEditor._.Panel();
	tablePanel.setTemplate(SinaEditor.TOOLCONF.tableTemplate);
	
	var panel = tablePanel.nodes.panel;
	var eventContent = tablePanel.nodes.eventContent;
	var baseContent = tablePanel.nodes.baseContent;
	var chooseContent = tablePanel.nodes.chooseContent;
	var tabNums = tablePanel.nodes.tabNums;
	
	editor.panels.tableUI = tablePanel;
	
	return {
        "events": [{
            "element": eventContent,
            "events": {
                'mousemove' : function(e) {
					var btn = editor.btns.tableUI;
					var scroll = SinaEditor.util.dom.getScrollPos();
					var xLoc = parseInt((e.clientX-btn.PANELX+scroll[1])/16,10) || 1;
					var yLoc = parseInt((e.clientY-btn.PANELY+scroll[0])/16,10) || 1;
					
					xLoc = xLoc > 20 ? 20 : xLoc;
					yLoc = yLoc > 20 ? 20 : yLoc;
					
					chooseContent.style.width = xLoc + 'em';
					chooseContent.style.height = yLoc + 'em';
					
					var tmpWidth = (xLoc < 5 ? 5 : xLoc) + 'em';
					baseContent.style.width = tmpWidth;
					baseContent.style.height = (yLoc < 5 ? 5 : yLoc) + 'em';
					eventContent.style.width = tmpWidth;
					tabNums.innerHTML = [xLoc,' * '+yLoc].join('');
				}
            }
        },{
            "element": document,
            "events": {
                'click' : function(e) {
					var target = e.target;
					if(SinaEditor.util.dom.containsNode(editor.btns.tableUI.$,target)) {
						return;
					}
					if(!SinaEditor.util.dom.containsNode(panel,target)) {
						tablePanel.hidden();
					}
				}
            }
        },{
            "element": chooseContent,
            "events": {
                'click' : function(e) {
					var matrix = tabNums.innerHTML;
					var arr = matrix.split('*');
					editor.operation.tableCreate(parseInt(arr[0],10),parseInt(arr[1],10));
					tablePanel.hidden();
				}
            }
        },{
            "element": editor,
            "events": {
                'editorSelectionChange' : function(){
					tablePanel.hidden();
				}
            }
        }]
    };
});
//用于加粗
//通过添加strong标签和移除strong标签来达到
SinaEditor.plugins.add('underline',function(args){
	var editor = this;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'underlineBtn',
			'args' : args
		});
	}
	
	var btn = editor.btns.underline;
	
	/**
	 * 加粗，isAdd可能是参照节点，也可能是一个boolean值
	 * @param {Object} isAdd
	 */
	editor.operation.underline = function(refNode){
		
		var ranges = SinaEditor.range.getCurrentRanges(editor.entyWin);
		//TODO 和IE统一，暂时只支持第一个选区
		ranges = ranges[0];
		if(!ranges) {
			return;
		}
        editor.operation.save(editor);
		
		//var isUnderline = editor.operateState['underline'];
		var isUnderline = editor.operateState.underline;
		
		if(isUnderline) {
			console.log('执行去下划线操作');
			SinaEditor.range.removeStyle(editor, {
	            'useTagName': 'span',
	            'style': 'textDecoration'
	        });
			btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
		} else {
			console.log('执行加下划线操作');
			SinaEditor.range.applyStyle(editor, {
	            'useTagName': 'span',
	            'style': 'textDecoration',
	            'value': 'underline'
	        });
			btn.setState(SinaEditor.BUTTONSTATE.CLICKED);
		}
        
		//editor.operateState['underline'] = !isUnderline;
		editor.operateState.underline = !isUnderline;
        editor.operation.save(editor);
    };
	
	
    return {
        "events": [{
            "element": editor,
            "events": {
				'editorSelectionChange' : function(e,range,refNode) {
					var isUnderline = SinaEditor.range.queryCommandState(this.entyDoc,'underline');
					
					if(isUnderline) {
						btn.setState(SinaEditor.BUTTONSTATE.CLICKED);
					} else {
						btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
					}
					
					//this.operateState['underline'] = isUnderline;
					this.operateState.underline = isUnderline;
				}
				,'ctrlu' : function() {
					editor.operation.isUnderline(this);
				}
            }
        }]
    };
});
//下划线
//通过添加strong标签和移除strong标签来达到
SinaEditor.plugins.add('underlineBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'下划线',
		normalClass : 'ico_underline_1'
		,disabledClass : 'ico_underline_4'
		,clickedClass : 'ico_underline_3'
		,mouseoverClass : 'ico_underline_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'common'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.underline = btn;

    return {
        "events": [{
			'element' : btn.$,
			'events' : {
				'click' : function() {
					editor.operation.underline(editor);
				}
			}
		}]
    };
});
//撤销
SinaEditor.plugins.add('undoBtn',function(args){
    var editor = this;

	var btnConf = {
		title:'撤销',
		normalClass : 'ico_undo_1'
		,disabledClass : 'ico_undo_4'
		,clickedClass : 'ico_undo_3'
		//,mouseoverClass : 'ico_undo_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'redoAndUndo'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.undo = btn;
	
    return {
        "events": [{
            "element": editor,
            "events": {
                'redoAndUndoChanged': function(){
                    if(editor._.hasUndo) {
						btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
					} else {
						btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
					}
                }
            }
        },{
			'element' : btn.$,
			'events' : {
				'click' : function() {
					if(editor.getState() == SinaEditor.STATE.EDITING) {
						SinaEditor.redoManager.undo(editor);
					}
				},'mouseover' : function() {
					console.log('112233');
					if(editor._.hasUndo && btn.getState() === SinaEditor.BUTTONSTATE.NORMAL) {
						this.className = 'ico_undo_2';
					}
				},'mouseout' : function() {
					this.className = 'ico_undo_4';
					if(editor._.hasUndo && btn.getState() === SinaEditor.BUTTONSTATE.NORMAL) {
						this.className = 'ico_undo_1';
					}
				}
			}
		}]
    };
});

if(!SinaEditor.$abstract) {
	SinaEditor.$abstract = {};
}

//编辑器的基类
/**
 * 基础的编辑器，负责插件的装载。您也可以直接使用SinaEditor.createEditor来创建一个编辑器。它需要以下参数：<br>
 * <table class="summaryTable">
 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
 * 	<tr>
 * 		<td>String</td>
 * 		<td>id<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			当前创建编辑器的ID
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>String|Element</td>
 * 		<td>toolBase<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			编辑器的按钮放置的父节点的base dom id 或者dom
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Object</td>
 * 		<td>initType<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			用哪个插件初始化编辑器，可以参阅{@link initFromStatic}这个插件。接受的格式形如：<br>
 * 			{'name':插件名称,'args':插件需要的参数}。
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Object</td>
 * 		<td>filter<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			当编辑器粘贴入外来内容时，进行的过滤<span style="color:red">(在常见浏览器中，不包含opera的粘贴过滤)</span>。<br>
 * 			或者当编辑器状态从编辑状态切换到显示源代码状态(反之亦然)时，一些特殊节点的过滤。<br>
 * 			可以参阅{@link pasteFilter}这个插件。接受的格式形如：<br>
 * 			{'name':插件名称,'args':插件需要的参数}。
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>String</td>
 * 		<td>editorName<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			用哪个编辑器来初始化。使用类名即可。如：SinaEditor.$abstract.baseEditor，或者SinaEditor._.entyimpl.normalEditor
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>String</td>
 * 		<td>styles<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			编辑器内的样式，动态写入的形式。<br>
 * 			<span style="color:red">注意，像IE这样的浏览器，动态样式不能够包含'@'这样的特殊字符，会导致浏览器的崩溃。</span>
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Array</td>
 * 		<td>styleLinks<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			编辑器内的外链样式数组，可以引入多个样式表。
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Array</td>
 * 		<td>plugns<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			编辑器的插件。形如：<br>
 * 			[{'name':插件名称,'args':插件需要的参数},...]
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>function</td>
 * 		<td>onStart<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			当编辑器开始执行加入插件操作前的回调函数。
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Array</td>
 * 		<td>eventBlackList<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			编辑器不监听的全局自定义事件的列表。
 * 		</td>
 * 	</tr>
 * </table>
 * @namespace SinaEditor.$abstract
 * @class 编辑器的基础类
 * @param {Object} oOption 配置参数，可以参考上表的配置。
 */
SinaEditor.$abstract.baseEditor = function(oOption){
    this._state = SinaEditor.STATE.CREATING;
	/**
	 * 传递进来的参数。
	 */
    this.option = oOption || {};
	this.option.eventBlackList = this.option.eventBlackList || '';
	//编辑器的插件。
    this._jobTable = [];
	//已有插件列表
	this._jobTableIndex = {};
	/**
	 * 实体对象，即编辑器的iframe节点。
	 */
	this.enty = null;
	/**
	 * iframe的window对象引用。
	 */
	this.entyWin = null;
	/**
	 * iframe的document对象引用。
	 */
	this.entyDoc = null;
	/**
	 * iframe的body节点引用。
	 */
	this.entyBody = null;
	/**
	 * 编辑器的textarea节点引用。
	 */
	this.entyArea = null;
	this.hasAddEvent = false;
	/**
	 * 编辑器的所有按钮。
	 */
	this.btns = {};
	/**
	 * 编辑器的所有的浮层。
	 */
	this.panels = {};
	this._ = {};
	this.errorMsg = [];
	/**
	 * 编辑器的所有的操作。
	 */
	this.operation = {};
	//记录可选编辑的操作
	this.operateState = {};
}.$define({
	/**
	 * @inner
	 * @param {Object} sMsg
	 */
    error: function(sMsg){ // 记录错误信息
        console.error(sMsg);
        this.errorMsg.push(sMsg);
    },
    /**
     * 添加插件，但并不会立即执行，当触发start函数时，添加的插件才会执行。
     * @memberOf SinaEditor.$abstract.baseEditor#
     * @param {Object} pluginConf 插件参数。参见：<br>
     * <table class="summaryTable">
     * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>name<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			插件的名称。
	 * 		</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>args<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			插件的参数，这个参数具体视插件参数而定。
	 * 		</td>
	 * 	</tr>
     * </table>
     */
    add: function(pluginConf){
        this._jobTable.push(pluginConf);
    },
	/**
     * 执行注册好的插件。如果需要后注册，可以使用callPlugin，可以在编辑器初始化后继续添加插件。
     * @memberOf SinaEditor.$abstract.baseEditor#
     */
    start: function(){
        if (this.option.onStart) {
            this.option.onStart();
        }
        this.queue(this._jobTable);
    },
    /**
     * 依次执行插件。
     * @inner
     * @param {Object} jobs 插件实体
     * @param {function} callback 执行完毕的回调函数。
     */
    queue: function(jobs, callback){
        var _this = this;
        var joblen = jobs.length;
        var i = 0;
		_this.callPlugin(jobs[i]);
        var interNum = window.setInterval(function(){
			i++;
            if (i >= joblen) {
                clearInterval(interNum);
                interNum = null;
                SinaEditor.ev.fire(_this, 'editorOnladed');
                return;
            }
			if(_this.entyWin) {
				
				if(!_this.hasAddEvent) {
					_this.hasAddEvent = true;
					var ev = null;
					//这里来初始化事件
					for(ev in SinaEditor.ev.customEvent) {
						if(_this.option.eventBlackList.indexOf(ev) < 0) {
							SinaEditor.ev.$regEvent(ev,_this);
						} else {
							console.log(_this.option.id+'在黑名单中：'+ev);
						}
					}
				}
				
				_this.callPlugin(jobs[i]);
				
				_this.setState(SinaEditor.STATE.CREATED);
				_this.setState(SinaEditor.STATE.EDITING);
			} else {
				console.log("等一下");
				i--;
			}
        }, 10);
    },
    /**
     * 单独后执行某个插件。
     * @memberOf SinaEditor.$abstract.baseEditor#
     * @param {Object} pluginConf 插件参数。参见：<br>
     * <table class="summaryTable">
     * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>name<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			插件的名称。
	 * 		</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>args<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			插件的参数，这个参数具体视插件参数而定。
	 * 		</td>
	 * 	</tr>
     * </table>
     */
    callPlugin: function(pluginConf){
		var getTime = function(){
            return new Date().valueOf();
        };
		//var jobObj = SinaEditor.plugins[pluginConf.name].call(this,pluginConf.args || {}) || {};
		var plugnFuc = SinaEditor.plugins.get(pluginConf.name);
		if(!plugnFuc) {
			//console.clear();
			console.log(pluginConf);
			console.log("---------------------------plugin not found:");
			return;
		}
		var jobObj = plugnFuc.call(this,pluginConf.args || {}) || {};
		//var jobObj = SinaEditor.plugins[pluginConf.name](this,pluginConf.args);
		console.log(this.option.id+'添加job:'+pluginConf.name);
        //var job = jobObj['initialize'];
		var job = jobObj.initialize;
		//var jEvents = jobObj['events'];
		var jEvents = jobObj.events;
        if (typeof jobObj == 'undefined') {
            this.error("<b>Job[" + pluginConf.name + "] is undefiend!!!</b>");
            return;
        }
        var _try = true;
        var _start = getTime();
        try {
			if(jEvents) {
				var num = 0;
				for(num=0; jEvents[num]; num++) {
					var eObj = jEvents[num];
					var target = eObj.element;
					//var events = eObj['events'];
					var events = eObj.events;
					var ev = null;
					
					if(!target) {
						console.error('!!!!!+'+ev+'+绑定失败...');
					}
					for(ev in events) {
						console.log(target + '绑定' + ev);
						SinaEditor.ev.add(target , ev , events[ev],{'srcEditor':this});
					}
				}
			}
			if(job) {
				job.call(this);
			}
        } 
        catch (e) {
            this.error("<b>Job[" + pluginConf.name + "] failed!!!</b>" + e.message + "");
//            if (callback != null) {
//                callback();
//            } // 如果任何一个 Job 失败，立即回调 onEnd
            _try = false;
            throw e;
        }
        finally {
            if (_try) {
                var _end = getTime();
                //console.log("<b>Job[" + pluginConf.name + "] done in " + (_end - _start) + "ms.</b>");
            }
        }
    }
	/**
     * 焦点集中到编辑器中。
     * @memberOf SinaEditor.$abstract.baseEditor#
     */
	,focus : function() {
		this.entyWin.focus();
	}
	/**
     * 设置编辑器的状态。设置后，会触发自定义事件editorStateChange。
     * @memberOf SinaEditor.$abstract.baseEditor#
     * @param state {int} 要设置的编辑器的状态可以设置：<br>
     * 编辑器在创建中：SinaEditor.STATE.CREATING或者1;<br>
     * 编辑器在创完毕：SinaEditor.STATE.CREATED或者2;<br>
     * 编辑器处于编辑状态：SinaEditor.STATE.EDITING或者3;<br>
     * 编辑器处于显示源码状态：SinaEditor.STATE.SHOWSOURCE或者4;<br>
     */
	,setState : function(state) {
		this._state = state;
		SinaEditor.ev.fire(this, 'editorStateChange');
	}
	/**
     * 获得编辑器的当前状态。
     * @memberOf SinaEditor.$abstract.baseEditor#
     * @return {int} 返回编辑器的状态，可以参见SinaEditor.STATE下的属性。
     */
	,getState : function() {
		return this._state;
	}
});

/*
 * 创建编辑器。此方法提供编辑器的创建。
 * @param {Object} conf 创建编辑器的配置文件：
 */
SinaEditor.createEditor = function(conf){
    //var job = new (eval('(' + conf['editorName'] + ')'))(conf);
    //var pName = conf['plugns'],i;
    //job.add(conf['initType']);
    //if (conf['filter']) {
    //    job.add(conf['filter']);
    //}
	var job = new (eval('(' + conf.editorName + ')'))(conf);
	var pName = conf.plugns,i;
	job.add(conf.initType);
	if (conf.filter) {
        job.add(conf.filter);
    }
    for (i = 0; pName[i]; i++) {
        job.add(pName[i]);
    }
    job.start();
    return job;
};
/**
 * @namespace
 */
SinaEditor._ = {};if(!SinaEditor._) {
	SinaEditor._ = {};
}

SinaEditor._.entyimpl = {};

/**
 * 通常的编辑器类，继承自{@link SinaEditor.$abstract.baseEditor}
 * @class 通常用的编辑器
 */
SinaEditor._.entyimpl.normalEditor = function(){
}.$extends(SinaEditor.$abstract.baseEditor).$define({});/**
 * IRenderer,呈现器接口,实现对象的呈现方式
 * @class IRenderer,呈现器接口,实现对象的呈现方式
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-15
 */
SinaEditor._.IRenderer={
	
	/**
	 * 是否允许显示对象
	 */
	setCanShow:function(state){},
	
	/**
	 * 是否允许隐藏对象
	 */
	setCanHidden:function(state){},
	
	/**
	 * 对象的显示
	 * @param {Object} node
	 */
	show:function(node){},
	
	/**
	 * 对象的隐藏
	 * @param {Object} node
	 */
	hidden:function(node){},
	
	/**
	 * 添加事件
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){},
	
	/**
	 * 移除事件
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){}
};
/**
 * 透明度渐变的呈现类,实现了IRenderer接口
 * 		事件：<br>
 * 			beforeShow 开始显示之前被触发,
 * 			show 显示完成后被触发,
 * 			beforeHidden 开始隐藏前被触发,
 * 			hidden 隐藏完成后被触发
 * @class 透明度渐变的呈现类,实现了IRenderer接口
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-29
 */
SinaEditor._.OpacityRenderer=function(){
	/**
	 * 是否允许显示对象
	 */
	this.__canShow=true;
	
	/**
	 * 是否允许隐藏对象
	 */
	this.__canHidden=true;
	
	this.__node=null;
	this.__tween=new SinaEditor._.TweenStrategy(0,0,0.6,SinaEditor._.Transition.strongEaseOut);
	this.__state="";
	this.__lastState="";
	this.__value=0;
	this.__node=null;
	
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
	
	this.__initTweenEvent();
}.$implements(SinaEditor._.IRenderer).$define({
	
	/**
	 * 是否允许显示对象
	 * @memverOf SinaEditor._.OpacityRenderer#
	 */
	setCanShow:function(state){
		this.__canShow=!!state;
	},
	
	/**
	 * 是否允许隐藏对象
	 * @memverOf SinaEditor._.OpacityRenderer#
	 */
	setCanHidden:function(state){
		this.__canHidden=!!state;
	},
	
	/**
	 * 显示对象
	 * @memverOf SinaEditor._.OpacityRenderer#
	 * @param {Object} node
	 */
	show:function(node){
		var tn=this.__tween;
		tn.stop();
		SinaEditor.util.dom.setStyle(node,"opacity",this.__value);
		node.style.display="";
		this.__node=node;
		this.__state="show";
		this.__eventDispatcher.dispatchEvent("beforeShow");
		if(this.__canShow){
			tn.startValue=this.__value;
			tn.endValue=1;
			tn.start();
		}
		return this;
	},
	
	/**
	 * 隐藏对象
	 * @memverOf SinaEditor._.OpacityRenderer#
	 * @param {Object} node
	 */
	hidden:function(node){
		var tn=this.__tween;
		
		tn.stop();
		this.__node=node;
		this.__state="hidden";
		this.__eventDispatcher.dispatchEvent("beforeHidden");
		if(this.__canHidden){
			tn.startValue=this.__value;
			tn.endValue=0;
			tn.start();
		}
		return this;
	},
	
	/**
	 * 添加事件
	 * @memverOf SinaEditor._.OpacityRenderer#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		this.__eventDispatcher.addEventListener(type,handle);
		return this;
	},
	
	/**
	 * 移除事件
	 * @memverOf SinaEditor._.OpacityRenderer#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		this.__eventDispatcher.removeEventListener(type,handle);
		return this;
	},
	
	/**
	 * @inner
	 * @memverOf SinaEditor._.OpacityRenderer#
	 */
	__initTweenEvent:function(){
		var me=this;
		this.__tween.addEventListener("tween",function(v){
			me.__value=v;
			SinaEditor.util.dom.setStyle(me.__node,"opacity",v);
		});
		this.__tween.addEventListener("end",function(){
			if (me.__node && me.__node.style.filter) {
				me.__node.style.filter="";
			}
			if(me.__state!=="" && me.__state!==me.__lastState){
				me.__lastState=me.__state;
				me.__eventDispatcher.dispatchEvent(me.__state);
			}
			if(me.__state==="hidden") {
				me.__node.style.display="none";
			}
		});
	}
});/**
 * SimpleRenderer,简单的呈现类,实现了IRenderer接口
 * 		事件：<br>
 * 			beforeShow 开始显示之前被触发
 * 			show 显示完成后被触发
 * 			beforeHidden 开始隐藏前被触发
 * 			hidden 隐藏完成后被触发
 * @class SimpleRenderer,简单的呈现类,实现了IRenderer接口	
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-15			
 */
SinaEditor._.SimpleRenderer=function(){
	/**
	 * 是否允许显示对象
	 */
	this.__canShow=true;
	
	/**
	 * 是否允许隐藏对象
	 */
	this.__canHidden=true;
	
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
}.$implements(SinaEditor._.IRenderer).$define({
	
	/**
	 * 是否允许显示对象
	 * @memberOf SinaEditor._.SimpleRenderer#
	 */
	setCanShow:function(state){
		this.__canShow=!!state;
	},
	
	/**
	 * 是否允许隐藏对象
	 * @memberOf SinaEditor._.SimpleRenderer#
	 */
	setCanHidden:function(state){
		this.__canHidden=!!state;
	},
	
	/**
	 * 显示对象
	 * @memberOf SinaEditor._.SimpleRenderer#
	 * @param {Object} node
	 */
	show:function(node){
		this.__eventDispatcher.dispatchEvent("beforeShow");
		if(this.__canShow){
			node.style.display="";
			this.__eventDispatcher.dispatchEvent("show");
		}
		return this;
	},
	
	/**
	 * 隐藏对象
	 * @memberOf SinaEditor._.SimpleRenderer#
	 * @param {Object} node
	 */
	hidden:function(node){
		this.__eventDispatcher.dispatchEvent("beforeHidden");
		if(this.__canHidden){
			node.style.display="none";
			this.__eventDispatcher.dispatchEvent("hidden");
		}
		return this;
	},
	
	/**
	 * 添加事件
	 * @memberOf SinaEditor._.SimpleRenderer#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		this.__eventDispatcher.addEventListener(type,handle);
		return this;
	},
	
	/**
	 * 移除事件
	 * @memberOf SinaEditor._.SimpleRenderer#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		this.__eventDispatcher.removeEventListener(type,handle);
		return this;
	}
});

/**
 * 缓动公式
 * @class 缓动公式
 * @param {Number} t 当前运行的时间点(ms)
 * @param {Number} b 起始值
 * @param {Number} c 空间距离
 * @param {Number} d 时间距离
 */
SinaEditor._.Transition={
	/**
	 * 简单的变化
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	simple:function(t,b,c,d){
		return c*t/d+b;
	},
	/**
	 * 缓和进入
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	backEaseIn: function(t, b, c, d){
		var s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
		
	},
	/**
	 * 缓和出去
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	backEaseOut: function(t, b, c, d){
		var s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	/**
	 * 缓和进入和缓和移除
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	backEaseInOut: function(t, b, c, d){
		var s = 1.70158;
		if ((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	/**
	 * 反弹移除
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	bounceEaseOut: function(t, b, c, d){
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		}
		else 
			if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
			}
			else 
				if (t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
				}
				else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
				}
	},
	/**
	 * 反弹移近
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	bounceEaseIn: function(t, b, c, d){
		return c - Transition.bounceEaseOut(d - t, 0, c, d) + b;
	},
	/**
	 * 反弹移近和移除
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	bounceEaseInOut: function(t, b, c, d){
		if (t < d / 2) {
			return Transition.bounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
		}
		else {
			return Transition.bounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
		}
		
	},
	/**
	 * 定期的移近
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	regularEaseIn: function(t, b, c, d){
		return c * (t /= d) * t + b;
	},
	/**
	 * 定期的移出
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	regularEaseOut: function(t, b, c, d){
		return -c * (t /= d) * (t - 2) + b;
	},
	/**
	 * 定期的移进和移出
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	regularEaseInOut: function(t, b, c, d){
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	/**
	 * 强力移进
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	strongEaseIn: function(t, b, c, d){
		return c * (t /= d) * t * t * t * t + b;
	},
	/**
	 * 强力移出
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	strongEaseOut: function(t, b, c, d){
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	/**
	 * 强力移进和移出
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	strongEaseInOut: function(t, b, c, d){
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t * t * t * t + b;
		}
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	},
	/**
	 * 弹性移进
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	elasticEaseIn: function(t, b, c, d){
		var a,p,s;
		if (t === 0) {
			return b;
		}
		if ((t /= d) == 1) {
			return b + c;
		}
	
		p = d * 0.3;
		
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	/**
	 * 弹性移出
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	elasticEaseOut: function(t, b, c, d){
		var a,p,s;
		if (t === 0) {
			return b;
		}
		if ((t /= d) == 1) {
			return b + c;
		}
		if (!p) {
			p = d * 0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
		
	},
	/**
	 * 弹性移进和移出
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	elasticEaseInOut: function(t, b, c, d){
		var a,p,s;
		if (t === 0) {
			return b;
		}
		if ((t /= d / 2) == 2) {
			return b + c;
		}
		if (!p) {
			p = d * (0.3 * 1.5);
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if (t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	}
};/**
 * 缓动策略类
 * @class 缓动策略类
 * @param {Number} startValue 起始值
 * @param {Number} endValue 结束值
 * @param {Number} duration 缓动持续时间(s)
 * @param {Function} motion 缓动公式
 */
SinaEditor._.TweenStrategy=function(startValue,endValue,duration,motion){
	this.startValue=startValue || 0;
	this.endValue=endValue || 0;
	this.duration=duration || 0;
	this.motion=motion || SinaEditor._.Transition.simple;
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
}.$define({
	
	/**
	 * 缓动公式
	 */
	motion:null,
	
	/**
	 * 缓动持续时间
	 */
	duration:0,
	
	/**
	 * 起始值
	 */
	startValue:0,
	
	/**
	 * 结束值
	 */
	endValue:0,
	
	_itvID:0,
	
	_isTweenning:false,
	
	/**
	 * 添加事件
	 * @memberOf SinaEditor._.TweenStrategy#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		this.__eventDispatcher.addEventListener(type,handle);
		return this;
	},
	
	/**
	 * 移除事件
	 * @memberOf SinaEditor._.TweenStrategy#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		this.__eventDispatcher.removeEventListener(type,handle);
		return this;
	},
	
	/**
	 * 开始缓动效果
	 * @memberOf SinaEditor._.TweenStrategy#
	 */
	start:function(){
		if(this._isTweenning){
			return;
		}
		this._isTweenning=true;
		
		var me=this,
			t,
			sv=this.startValue,
			ev=this.endValue,
			d=this.duration,
			value,
			startTime=(new Date()).getTime();
			
		this._itvID=window.setInterval(function(){
			t=((new Date()).getTime()-startTime)/1000;
			if(t>me.duration) {
				t=me.duration;
			}
			value=me.motion(t,sv,ev-sv,d);
			if(me.onTween) {
				me.onTween(value);
			}
			me.__eventDispatcher.dispatchEvent("tween",value);
			if(t===me.duration) {
				me.stop();
			}
		},25);
		return this;
	},
	
	/**
	 * 停止缓动
	 * @memberOf SinaEditor._.TweenStrategy#
	 */
	stop:function(){
		window.clearInterval(this._itvID);
		this._isTweenning=false;
		if(this.onEnd) {
			this.onEnd();
		}
		this.__eventDispatcher.dispatchEvent("end");
		return this;
	},
	
	/**
	 * 在缓动期间触发
	 * @memberOf SinaEditor._.TweenStrategy#
	 * @param {Number} value 当前返回的缓动值
	 */
	onTween:function(value){},
	
	/**
	 * 缓动结束时触发
	 * @memberOf SinaEditor._.TweenStrategy#
	 */
	onEnd:function(){}
});/**
 * 拖拽器接口
 * @class 拖拽器接口
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-25
 * @event
 * 		afterDrag 在托拽完成后触发
 * 
 */
SinaEditor._.IDragger={
	/**
	 * 添加事件监听
	 * @memberOf SinaEditor._.IDragger#
	 * @param {String} type
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){},
	
	/**
	 * 移除事件监听
	 * @memberOf SinaEditor._.IDragger#
	 * @param {String} type
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){},
	
	/**
	 * 设置要拖拽的节点
	 * @memberOf SinaEditor._.IDragger#
	 * @param {Object} node 捕获拖拽的节点
	 * @param {Object} attachNodes 被拖拽的节点
	 * @param {Boolean}
	 */
	setDrag:function(node,attachNodes,isDragCapureNode){},
	
	/**
	 * 设置是否锁定拖拽区域
	 * @memberOf SinaEditor._.IDragger#
	 * @param {Boolean} state
	 */
	setLock:function(state){},
	
	/**
	 * 设置锁定的拖拽区域的范围
	 * @memberOf SinaEditor._.IDragger#
	 * @param {Object} area{
	 * 					left:左边界坐标,
	 *					top:上边界坐标,
	 *					right:右边界坐标,
	 *					bottom:下边界坐标
	 * 				}
	 */
	setArea:function(area){},
	
	/**
	 * 销毁对象
	 * @memberOf SinaEditor._.IDragger#
	 */
	destroy:function(){}
};

/**
 * 边框拖拽的拖拽器类,实现了IDragger接口
 * 边框形式的拖拽器
 * event:
 * 		fterDrag 在托拽完成后触发<br>
 * @class 边框形式的拖拽器
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-11-04
 */
SinaEditor._.BorderDragger=function(){
	this.__drag=null;
	this.__isBindEvent=false;
	this.__border=null;
	this.__dragNode=null;
	this.__isCreated=false;
	this.__tweenX=new SinaEditor._.TweenStrategy(0,0,0.5,SinaEditor._.Transition.strongEaseOut);
	this.__tweenY=new SinaEditor._.TweenStrategy(0,0,0.5,SinaEditor._.Transition.strongEaseOut);
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
	
}.$implements(SinaEditor._.IDragger).$define({
	
	/**
	 * 添加事件监听
	 * @memberof SinaEditor._.BorderDragger#
	 * @param {String} type
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		if(type.toLowerCase()==="afterdrag"){
			this.__eventDispatcher.addEventListener(type,handle);
		}else{
			this.__drag.addEventListener(type,handle);
		}
		return this;
	},
	
	/**
	 * 移除事件监听
	 * @memberof SinaEditor._.BorderDragger#
	 * @param {String} type
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		if(type.toLowerCase()==="afterdrag"){
			this.__eventDispatcher.removeEventListener(type,handle);
		}else{
			this.__drag.removeEventListener(type,handle);
		}
		return this;
	},
	
	/**
	 * 设置要拖拽的节点
	 * @memberof SinaEditor._.BorderDragger#
	 * @param {Object} node 获取鼠标捕获事件的节点
	 * @param {Object} attachNode 跟随鼠标移动的节点
	 * @param {Boolean} isDragCapureNode 是否拖拽获取鼠标捕获事件的节点
	 */
	setDrag:function(node,attachNode,isDragCapureNode){
		if(!this.__isCreated){
			this.__createBorder(attachNode);
			this.__initTweenEvent(attachNode);
		}
		
		this.__drag=new SinaEditor._.Drag(node,this.__border,isDragCapureNode);
		this.__dragNode=attachNode;
		this.__initDragEvent();
		return this;
	},
	
	/**
	 * 设置是否锁定拖拽区域
	 * @memberof SinaEditor._.BorderDragger#
	 * @param {Boolean} state
	 */
	setLock:function(state){
		this.__drag.isLock=!!state;
		return this;
	},
	
	/**
	 * 设置锁定的拖拽区域的范围
	 * @memberof SinaEditor._.BorderDragger#
	 * @param {Object} area{
	 * 					left:左边界坐标,
	 *					top:上边界坐标,
	 *					right:右边界坐标,
	 *					bottom:下边界坐标
	 * 				}
	 */
	setArea:function(area){
		this.__drag.lockArea=area;
		return this;
	},
	
	/**
	 * 清除节点。
	 * @memberof SinaEditor._.BorderDragger#
	 */
	destroy:function(){
		this.__drag.destroy();
	},
	
	/**
	 * @inner
	 * @memberof SinaEditor._.BorderDragger#
	 * @param {Object} node
	 */
	__createBorder:function(node){
		this.__border=SinaEditor.util.dom.createDom("div");
		var st=this.__border.style;
		st.border="2px dashed #BCC4D0";
		st.position="absolute";
		st.display="none";
		st.backgroundColor="transparent";
		st.MozUserSelect="none";
		document.body.appendChild(this.__border);
		this.__isCreated=true;
	},
	
	/**
	 * @inner
	 * @memberof SinaEditor._.BorderDragger#
	 */
	__initDragEvent:function(){
		if(this.__isBindEvent){
			return;
		}
		
		var me=this,
			bst=this.__border.style,
			nst=this.__dragNode.style,
			twX=this.__tweenX,
			twY=this.__tweenY;
			
		this.__drag.addEventListener("beforeDrag",function(){
			bst.zIndex=nst.zIndex+1;
			bst.position=nst.position;
			bst.width=me.__dragNode.offsetWidth-4+"px";
			bst.height=me.__dragNode.offsetHeight-4+"px";
			bst.left=parseInt(nst.left,10)+"px";
			bst.top=parseInt(nst.top,10)+"px";
			bst.display="";
		});
		
		this.__drag.addEventListener("afterDrag",function(){
			if (SinaEditor.env.$IE6) {
				nst.left = parseInt(bst.left,10) + "px";
				nst.top = parseInt(bst.top,10) + "px";
				bst.display="none";
				me.__eventDispatcher.dispatchEvent("afterDrag");
			}
			else {
				twX.startValue=parseInt(nst.left,10);
				twX.endValue=parseInt(bst.left,10);
				
				twY.startValue=parseInt(nst.top,10);
				twY.endValue=parseInt(bst.top,10);
				
				twX.start();
				twY.start();
			}
		
		});
		this.__isBindEvent=true;
	},
	
	/**
	 * @inner
	 * @memberof SinaEditor._.BorderDragger#
	 * @param {Object} node
	 */
	__initTweenEvent:function(node){
		var nst=node.style,
			bst=this.__border.style,
			me=this;
			
		this.__tweenX.addEventListener("tween",function(v){
			nst.left=v+"px";
		});
		
		this.__tweenY.addEventListener("tween",function(v){
			nst.top=v+"px";
		});
		
		this.__tweenX.addEventListener("end",function(){
			bst.display="none";
			me.__eventDispatcher.dispatchEvent("afterDrag");
		});
	}
});

/**
 * 一般的拖拽器类,实现了IDragger接口
 * event
 * 		afterDrag 在托拽完成后触发
 * @class 简单的拖拽器
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-25
 */
SinaEditor._.SimpleDragger=function(){
	this.__drag=null;
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
}.$implements(SinaEditor._.IDragger).$define({
	
	/**
	 * 添加事件监听
	 * @memberOf SinaEditor._.SimpleDragger#
	 * @param {String} type
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		if(type.toLowerCase()==="afterdrag"){
			this.__eventDispatcher.addEventListener(type,handle);
		}else{
			this.__drag.addEventListener(type,handle);
		}
		return this;
	},
	
	/**
	 * 移除事件监听
	 * @memberOf SinaEditor._.SimpleDragger#
	 * @param {String} type
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		if(type.toLowerCase()==="afterdrag"){
			this.__eventDispatcher.removeEventListener(type,handle);
		}else{
			this.__drag.removeEventListener(type,handle);
		}
		return this;
	},
	
	/**
	 * 设置要拖拽的节点
	 * @memberOf SinaEditor._.SimpleDragger#
	 * @param {Object} node 获取鼠标捕获事件的节点
	 * @param {Object} attachNode 跟随鼠标移动的节点
	 * @param {Boolean} isDragCapureNode 是否拖拽获取鼠标捕获事件的节点
	 */
	setDrag:function(node,attachNode,isDragCapureNode){
		var me=this;
		
		this.__drag=new SinaEditor._.Drag(node,attachNode,isDragCapureNode);
		this.__drag.addEventListener("afterDrag",function(){
			me.__eventDispatcher.dispatchEvent("afterDrag");
		});
		return this;
	},
	
	/**
	 * 设置是否锁定拖拽区域
	 * @memberOf SinaEditor._.SimpleDragger#
	 * @param {Boolean} state
	 */
	setLock:function(state){
		this.__drag.isLock=!!state;
		return this;
	},
	
	/**
	 * 设置锁定的拖拽区域的范围
	 * @memberOf SinaEditor._.SimpleDragger#
	 * @param {Object} area{
	 * 					left:左边界坐标,
	 *					top:上边界坐标,
	 *					right:右边界坐标,
	 *					bottom:下边界坐标
	 * 				}
	 */
	setArea:function(area){
		this.__drag.lockArea=area;
		return this;
	},
	
	/**
	 * 销毁对象
	 * @memberOf SinaEditor._.SimpleDragger#
	 */
	destroy:function(){
		this.__drag.destroy();
	}
});
/**
 * @fileoverview 给对象定义getter的方法
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-14
 * @example
 * 
 * 		Ui.DisplayObject=function(){
			Core.Function.defineGetter(this,["x","y"],[this.__getX,this.__getY]);
			Core.Function.defineGetter(this,"z",this.__getZ);
		}.$define({
			__getX:function(){
				return 123;
			},
			__getY:function(){
				return "asdf";
			},
			
			__getZ:function(){
				return "lalal"
			}
			
		});
		
		var a = new Ui.DisplayObject();
		alert(a.x);
		alert(a.y);
		alert(a.z);
 */
(function(){
	/**
	 * 给对象定义getter的方法，只能返回Number和String类型的数据
	 * @class 给对象定义getter的方法，只能返回Number和String类型的数据
	 * @param {Object} obj 要定义getter的对象
	 * @param {Object} p 定义的属性
	 * @param {Object} fn 操作的function
	 */
	SinaEditor._.defineGetter = function(obj, p, fn){
		if (p instanceof Array && fn instanceof Array) {
			var i = Math.min(p.length, fn.length);
			while (i--) {
				if (typeof p[i] === "string" && __checkFunction(fn[i])) {
					obj[p[i]] = {
						valueOf: (function(j){
							return function(){
								return __getValue(obj, fn[j]);
							};
						})(i),
						toString: this.valueOf
					};
				}
			}
		}
		else if (typeof p === "string" && __checkFunction(fn)) {
			obj[p] = {
				valueOf: function(){
					return __getValue(obj, fn);
				},
				toString: this.valueOf
			};
		}
	};
	
	function __checkFunction(fn){
		return typeof fn !== "string" && String.prototype.slice.call(fn, 0, 8) == "function";
	}
	
	function __getValue(obj, fn){
		var ret = fn.call(obj);
		return typeof ret==="string" || typeof ret ==="number" ? ret : null;
	}
})();
/**
 * 显示对象类
 * 		事件：
 * 			beforeShow 开始显示之前被触发
 * 			show 显示完成后被触发
 * 			beforeHidden 开始隐藏前被触发
 * 			hidden 隐藏完成后被触发
 * @class 显示的对象类，可作为绝对定位的对象的基类
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-14
 */
SinaEditor._.DisplayObject=function(parent,node){
	/**
	 * 定义getter的属性 x,y,z,width,height
	 */
	SinaEditor._.defineGetter(this,
		["x","y","z","width","height"],
		[this.__getX,this.__getY,this.__getZ,this.__getWidth,this.__getHeight]);
	
	this.__renderer=null;
	this.__entity=node;
	this.__isInited=false;
	this.__parent=parent || document.body;
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
	
	//renderer的事件配置
	var ed=this.__eventDispatcher;
	this.__onBeforeShow=function(){
		ed.dispatchEvent("beforeShow");
	};
	this.__onShow=function(){
		ed.dispatchEvent("show");
	};
	this.__onBeforeHidden=function(){
		ed.dispatchEvent("beforeHidden");
	};
	this.__onHidden=function(){
		ed.dispatchEvent("hidden");
	};
	
	this.__updateRenderer(SinaEditor._.SimpleRenderer);
}.$define({
	
	/**
	 * 设置位置
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {Object} p
	 * 					x:Number
	 * 					y:Number
	 * 					z:Number
	 */
	setPosition:function(p){
		if(!this.__isInited) {
			this.__initEntity();
		}
		
		if(typeof p.x!=="undefined") {
			this.__entity.style.left=p.x+"px";
		}
		if(typeof p.y!=="undefined") {
			this.__entity.style.top=p.y+"px";
		}
		if(typeof p.z!=="undefined") {
			this.__entity.style.zIndex=p.z;
		}
		return this;
	},
	
	/**
	 * 设置大小
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {Object} p
	 * 					width:Number
	 * 					height:Number
	 */
	setSize:function(p){
		if(!this.__isInited){
			this.__initEntity();
		}
		
		if(typeof p.width!=="undefined") {
			this.__entity.style.width=p.width+"px";
		}
		
		if(typeof p.height!=="undefined") {
			this.__entity.style.height=p.height+"px";
		}
		return this;
	},
	
	setRenderer:function(rendererConstructor){
		if(!this.__isInited) {
			this.__initEntity();
		}
		this.__updateRenderer(rendererConstructor);
		return this;
	},
	
	/**
	 * 显示对象
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {IRenderer} rendererConstructor
	 */
	show:function(rendererConstructor){
		if(!this.__isInited) {
			this.__initEntity();
		}
		this.__updateRenderer(rendererConstructor);
		this.__renderer.show(this.__entity);
		return this;
	},
	
	/**
	 * 隐藏对象
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {IRenderer} renderer
	 */
	hidden:function(rendererConstructor){
		if(!this.__isInited) {
			this.__initEntity();
		}
		
		this.__updateRenderer(rendererConstructor);
		this.__renderer.hidden(this.__entity);
		return this;
	},
	
	/**
	 * 设置是否允许显示对象
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {Boolean} state
	 */
	setCanShow:function(state){
		this.__renderer.setCanShow(state);
		return this;
	},
	
	/**
	 * 设置是否允许隐藏对象
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {Boolean} state
	 */
	setCanHidden:function(state){
		this.__renderer.setCanHidden(state);
		return this;
	},
	
	/**
	 * 添加事件
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		this.__eventDispatcher.addEventListener(type,handle);
		return this;
	},
	
	/**
	 * 移除事件
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		this.__eventDispatcher.removeEventListener(type,handle);
		return this;
	},
	
	/**
	 * 清除节点
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	destroy:function(){
		if(!this.__entity){
			return;
		}
		if(!this.__isInited) {
			this.__initEntity();
		}
		
		if(this.__entity.parentNode) {
			this.__entity.parentNode.removeChild(this.__entity);
		}
		this.__entity=null;
	},
	
	/**
	 * 初始化节点对象
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	__initEntity:function(){
		var st;

		if(!this.__entity) {
			this.__entity=SinaEditor.util.dom.createDom("div");
		}
		st=this.__entity.style;
		
		st.position="absolute";
		st.left=0;
		st.top=0;
		st.zIndex=0;

		if(!this.__entity.parentNode) {
			this.__parent.appendChild(this.__entity);
		}

		this.__isInited=true;
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {Object} rendererConstructor
	 */
	__updateRenderer:function(rendererConstructor){
		if(!rendererConstructor){
			return;
		}
		
		var addEvent=function(){
			this.__renderer.addEventListener("beforeShow",this.__onBeforeShow)
				.addEventListener("show",this.__onShow)
				.addEventListener("beforeHidden",this.__onBeforeHidden)
				.addEventListener("hidden",this.__onHidden);
		};
		
		if(!this.__renderer){
			this.__renderer=new rendererConstructor();
			addEvent.call(this);
		}else if(this.__renderer.constructor!==rendererConstructor){
			this.__renderer.removeEventListener("beforeShow", this.__onBeforeShow)
				.removeEventListener("show", this.__onShow)
				.removeEventListener("beforeHidden", this.__onBeforeHidden)
				.removeEventListener("hidden", this.__onHidden);
				
			this.__renderer=new rendererConstructor();
			addEvent.call(this);
		}
	},
	
	/**
	 * 获取X坐标
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	__getX:function(){
		if(!this.__isInited) {
			this.__initEntity();
		}
		return parseInt(this.__entity.style.left,10);
	},
	
	/**
	 * 获取Y坐标
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	__getY:function(){
		if(!this.__isInited) {
			this.__initEntity();
		}
		return parseInt(this.__entity.style.top,10);
	},
	
	/**
	 * 获取对象深度(z坐标)
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	__getZ:function(){
		if(!this.__isInited) {
			this.__initEntity();
		}
		return parseInt(this.__entity.style.zIndex,10);
	},
	
	/**
	 * 获取宽度
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	__getWidth:function(){
		if(!this.__isInited) {
			this.__initEntity();
		}
		return this.__getSize(this.__entity,"offsetWidth");
	},
	
	/**
	 * 获取高度
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	__getHeight:function(){
		if(!this.__isInited) {
			this.__initEntity();
		}
		return this.__getSize(this.__entity,"offsetHeight");
	},
	
	/**
	 * 获取尺寸，对象在不可见状态下也能获取到真实的尺寸
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {String} p
	 */
	__getSize:function(node,p){
		var et=node,
			v,
			ov=et.style.visibility;
			
		if(et.style.display=="none"){
			et.style.visibility="hidden";
			et.style.display="";
			v=et[p];
			et.style.display="none";
			et.style.visibility=ov;
		}else{
			v=et[p];
		}
		
		return v;
	}
	
});
/**
 * 托拽类
 * event<br>
 * 		beforeDrag 在准备托拽前触发,
 * 		afterDrag 在托拽完成后触发,
 * 		drag 托拽时触发
 * @class 托拽类
 * @created 2010-10-21
 * @author Random | YangHao@staff.sina.com.cn
 * @example
 * 	var a=new Ui.Drag($p.nodes.panel,[p2.nodes.panel,p3.nodes.panel]);
 *		a.addEventListener("beforeDrag",function(){
 *			trace("beforeDrag");
 *		}).addEventListener("afterDrag",function(){
 *			trace("afterDrag");
 *		}).addEventListener("drag",function(){
 *			trace("draging");
 *		});
 *		a.isLock=true;
 *		a.lockArea={
 *			left:0,
 *			top:0,
 *			right:500,
 *			bottom:500
 *		};
 * @param {Object} captureNode 捕获拖拽的节点
 * @param {Array} attachNodes 被拖拽的节点,可传入数组,也可传入单独的节点,不传些参数时,为捕获拖拽的节点
 * @param {Boolean} isDragCapureNode 是否拖拽捕获拖拽的节点(默认为true)
 */
SinaEditor._.Drag=function(captureNode,attachNodes,isDragCapureNode){
	var me=this;
	
	this.canDrag=true;
	this.isLock=false;
	this.lockArea={
		left:0,
		right:0,
		top:0,
		bottom:0
	};
	
	this.__captureNode=captureNode;
	this.__dragNodes=[];
	this.__deltaX=[];
	this.__deltaY=[];
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
	this.__isDraging=false;
	this.__canDragX=true;
	this.__canDragY=true;
	
	this.__dragHandle=function(){
		me.__drag();
	};
	this.__mouseDownHandle=function(){
		me.__isDraging=true;
		me.__eventDispatcher.dispatchEvent("beforeDrag");
		me.__setCapture(true);
	};
	this.__mouseUpHandle=function(){
		if(me.__isDraging) {
			me.__eventDispatcher.dispatchEvent("afterDrag");
		}
		me.__isDraging=false;
		me.__setCapture(false);
	};
	
	this.__initNodes(captureNode,attachNodes,isDragCapureNode);
	this.__initCaputerNode();
	
}.$define({
	
	/**
	 * 添加事件监听
	 * @memberOf SinaEditor._.Drag#
	 * @param {String} type
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		this.__eventDispatcher.addEventListener(type,handle);
		return this;
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.Drag#
	 */
	__getEvent : function() {
		if (window.event) {
			return window.event;
		}
		var o = arguments.callee.caller;
		var e;
		var n = 0;
		while(o !== null && n < 40){
			e = o.arguments[0];
			if (e && (e.constructor == Event || e.constructor == MouseEvent)) {
				return e;
			}
			n ++;
			o = o.caller;
		}
		return e;
	},
	
	/**
	 * 移除事件监听
	 * @memberOf SinaEditor._.Drag#
	 * @param {String} type
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		this.__eventDispatcher.removeEventListener(type,handle);
		return this;
	},
	
	/**
	 * 清除节点
	 * @memberOf SinaEditor._.Drag#
	 */
	destroy:function(){
		SinaEditor.ev.remove(this.__captureNode, 'mousedown', this.__mouseDownHandle);
		SinaEditor.ev.remove(document, 'mouseup', this.__mouseUpHandle);
		this.__captureNode=null;
		this.__dragNodes=null;
	},
	
	/**
	 * 初始化托拽的节点
	 * @inner
	 * @memberOf SinaEditor._.Drag#
	 * @param {Object} captureNode
	 * @param {Object} attachNodes
	 * @param {Boolean} isDragCapureNode
	 */
	__initNodes:function(captureNode,attachNodes,isDragCapureNode){
		if(attachNodes){
			if(attachNodes instanceof Array) {
				this.__dragNodes=attachNodes;
			} else {
				this.__dragNodes.push(attachNodes);
			}
			if((typeof isDragCapureNode ==="undefined" || isDragCapureNode)) {
				this.__dragNodes.push(this.__captureNode);
			}
		}else{
			this.__dragNodes.push(this.__captureNode);
		}
		
		var dns=this.__dragNodes,
			i=dns.length;

		while(i--){
			if(!dns[i].style.position) {
				dns[i].style.position="absolute";
			}
			if(!dns[i].style.left) {
				dns[i].style.left=0;
			}
			if(!dns[i].style.top) {
				dns[i].style.top=0;
			}
		}
	},
	
	/**
	 * 初始化可捕获的节点
	 * @inner
	 * @memberOf SinaEditor._.Drag#
	 */
	__initCaputerNode:function(){
		var cn=this.__captureNode,
			me=this;
		
		SinaEditor.ev.add(cn, 'mousedown', this.__mouseDownHandle);
		SinaEditor.ev.add(document, 'mouseup', this.__mouseUpHandle);
	},
	
	/**
	 * 设置捕获状态
	 * @inner
	 * @memberOf SinaEditor._.Drag#
	 * @param {Boolean} isCapture
	 */
	__setCapture:function(isCapture){
		
		var cn=this.__captureNode,
			dns=this.__dragNodes,
			evt=this.__getEvent(),
			i=dns.length;
		
		while(i--){
			this.__deltaX[i]=evt.clientX-parseInt(dns[i].style.left,10);
			this.__deltaY[i]=evt.clientY-parseInt(dns[i].style.top,10);
		}
		
		if(isCapture){
			if(SinaEditor.env.$IE){
				cn.setCapture();
				SinaEditor.ev.add(cn, 'mousemove', this.__dragHandle);
			}else{
				SinaEditor.ev.add(document, 'mousemove', this.__dragHandle);
			}
		}else{
			if(SinaEditor.env.$IE){
				cn.releaseCapture();
				SinaEditor.ev.remove(cn, 'mousemove', this.__dragHandle);
			}else{
				SinaEditor.ev.remove(document, 'mousemove', this.__dragHandle);
			}
		}
	},
	
	/**
	 * 拖拽
	 * @inner
	 * @memberOf SinaEditor._.Drag#
	 */
	__drag:function(){
		if(!this.canDrag){
			return;
		}
		
		var dns=this.__dragNodes,
			evt=this.__getEvent(),
			i=dns.length,
			la=this.lockArea,
			dX=0,
			dY=0;
			
		this.__eventDispatcher.dispatchEvent("drag");
		
		while(i--){
			dX=evt.clientX - this.__deltaX[i];
			dY=evt.clientY - this.__deltaY[i];
			
			if (this.isLock) {
				dX = Math.min(Math.max(dX, la.left),la.right);
				dY = Math.min(Math.max(dY, la.top),la.bottom);
			}
			
			dns[i].style.left=dX+"px";
			dns[i].style.top=dY+"px";
		}
	}
});
/**
 * 事件分发类,以实现自定义事件
 * @class 事件分发类
 * @created 2010-10-14
 * @author Random | YangHao@staff.sina.com.cn
 * @param {Object} target 使用该类的对象
 */
SinaEditor._.EventDispatcher = function(target){
	this.__target=target;
	this.__events={};
}.$define({
		
	/**
	 * 添加事件
	 * @memberOf SinaEditor._.EventDispatcher#
	 * @param {String} type 事件名称
	 * @param {Function} handle 事件触发后执行的function
	 */
	addEventListener:function(type,handle){
		if (!this.__checkFunction(handle)) {
			return;
		}
		
		var evts=this.__events;
		type=type.toLowerCase();
		
		if(!evts[type]) {
			evts[type]=[];
		}
		evts[type].push(handle);
	},
	
	/**
	 * 移除事件
	 * @memberOf SinaEditor._.EventDispatcher#
	 * @param {String} type 事件名称
	 * @param {Function} handle 事件触发后执行的function的引用
	 */
	removeEventListener:function(type,handle){
		var evts=this.__events[type];
		type=type.toLowerCase();
		
		if (!this.__checkFunction(handle) || !evts || !evts.length) {
			return;
		}
		var i=0;
		for(i=evts.length-1;i>=0;i--){
			if (evts[i] === handle) {
				evts.splice(i, 1);
			}
		}
	},
	
	/**
	 * 触发事件,一个事件如果对应多个执行的function,则按添加的顺序都被触发
	 * @memberOf SinaEditor._.EventDispatcher#
	 * @param {String} type 事件名称
	 */
	dispatchEvent: function(type){
		type = type.toLowerCase();
		var evts = this.__events[type];
		if (!evts || !evts.length) {
			return;
		}
		
		var args = Array.prototype.slice.call(arguments, 0);
		var i=0;
		args.shift();
		for (i = 0, l = evts.length; i < l; i++) {
			evts[i].apply(this.__target, args);
		}
	},
	
	/**
	 * 检测对象是否为function类型的方法,
	 * 		其实,从美学的角度讲，这个方法不应该出现在这里,
	 * 		但现在没有想好对单独的方法的归并处理方式,就先放这里吧,
	 * 		原谅我吧........
	 * @inner
	 * @memberOf SinaEditor._.EventDispatcher#
	 * @param {Object} func
	 */
	__checkFunction:function(func){
		return typeof func !=="string" && String.prototype.slice.call(func, 0, 8) == "function";
	}
});/**
 * IE6下的fixed控制器，实现在IE6下当滚动条滚动时，固定住对象的功能
 * @class IE6下的fixed控制器，实现在IE6下当滚动条滚动时，固定住对象的功能
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-20
 */
SinaEditor._.IE6FixedController=function(){
	var me=this;
	
	this.node=null;
	this.iframeNode=null;
	this.__orgX=0;
	this.__orgY=0;
	this.__isBindScroll=false;
	
	this.__fixedHandle=function(){
		if(me.node){
			me.node.style.left = document.documentElement.scrollLeft + me.__orgX + "px";
			me.node.style.top = document.documentElement.scrollTop + me.__orgY + "px";
		}
		
		if (me.iframeNode) {
			me.iframeNode.style.left = me.node.style.left;
			me.iframeNode.style.top = me.node.style.top;
		}
	};
	
}.$define({
	
	/**
	 * 设置对象是否为fixed状态
	 * @memberOf SinaEditor._.IE6FixedController#
	 * @param {Object} node
	 * @param {Boolean} state
	 */
	setFixed:function(node,state){
		this.updateOrgPosition();
		if(state && !this.__isBindScroll){
			SinaEditor.ev.add(window, 'scroll', this.__fixedHandle);
			this.__isBindScroll=true;
		}
		if(!state && this.__isBindScroll){
			SinaEditor.ev.remove(window, 'scroll', this.__fixedHandle);
			this.__isBindScroll=false;
		}
	},
	
	/**
	 * 设置对话框位置。
	 * @memberOf SinaEditor._.IE6FixedController#
	 * @param {Object} node
	 * @param {Object} fixedState
	 * @param {Object} p
	 */
	setPosition:function(node,fixedState,p){
		if(typeof p.x!=="undefined"){
			if(fixedState){
				node.style.left=p.x + document.documentElement.scrollLeft+"px";
				this.__orgX=parseInt(this.node.style.left,10)-document.documentElement.scrollLeft;
			}else{
				node.style.left=p.x+"px";
			}
		}
		
		if(typeof p.y!=="undefined"){
			if (fixedState) {
				node.style.top=p.y + document.documentElement.scrollTop+"px";
				this.__orgY=parseInt(this.node.style.top,10)-document.documentElement.scrollTop;
			}else{
				node.style.top=p.y+"px";
			}
		}

		if(typeof p.z!=="undefined") {
			node.style.zIndex=p.z;
		}
	},
	
	/**
	 * 获取X的位置。
	 * @memberOf SinaEditor._.IE6FixedController#
	 * @param {Object} node
	 * @param {Object} fixedState
	 */
	getX:function(node,fixedState){
		if(fixedState){
			return parseInt(node.style.left,10)-document.documentElement.scrollLeft;
		}else{
			return parseInt(node.style.left,10);
		}
	},
	
	/**
	 * 获取Y的位置。
	 * @memberOf SinaEditor._.IE6FixedController#
	 * @param {Object} node
	 * @param {Object} fixedState
	 */
	getY:function(node,fixedState){
		if(fixedState){
			return parseInt(node.style.top,10)-document.documentElement.scrollTop;
		}else{
			return parseInt(node.style.top,10);
		}
	},
	
	/**
	 * 更新iframe
	 * @memberOf SinaEditor._.IE6FixedController#
	 * @param {Object} isFixed
	 */
	updateIframe:function(isFixed){
		this.setFixed(this.iframeNode,isFixed);
		if(isFixed) {
			this.__fixedHandle();
		}
	},
	
	/**
	 * 更新原始坐标
	 * @memberOf SinaEditor._.IE6FixedController#
	 */
	updateOrgPosition:function(){
		if(!this.node){
			return;
		}
		
		this.__orgX=parseInt(this.node.style.left,10)-document.documentElement.scrollLeft;
		this.__orgY=parseInt(this.node.style.top,10)-document.documentElement.scrollTop;
	},
	
	/**
	 * 清除节点。
	 * @memberOf SinaEditor._.IE6FixedController#
	 */
	destroy:function(){
		SinaEditor.ev.remove(window, 'scroll', this.__fixedHandle);
		this.__isBindScroll=false;
		this.node=null;
		this.iframeNode=null;
	}
});
/**
 * 面板类,继承于DisplayObject类
 * @class 面板类,继承于DisplayObject类
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-18
 */
SinaEditor._.Panel = function(parent, node){

    /**
     * 通过模板配置的节点
     */
    this.nodes = {};
    
    this.uniqueID = this.__getUniqueID();
    
    this.entity = null;
    
    this.__iframe = null;
    this.__isSetAdamant = false;
    this.__templateNodesIDs = [];
    this.__isFixed = false;
    if(SinaEditor.env.$IE6) {
		this.__ie6FixedController = new SinaEditor._.IE6FixedController();
	}
}
.$extends(SinaEditor._.DisplayObject).$define({

    /**
     * 设置模板
     * @memberOf SinaEditor._.Panel#
     * @param {String} tpl
     */
    setTemplate: function(tpl){
        var nd = SinaEditor.util.dom.createDom('div',{
			properties : {
				'innerHTML' : new SinaEditor.$abstract.Template(tpl).evaluate(this.__getNodes(tpl, "i"))
			}
		});
        nd.style.display = "none";
        this.__parent.appendChild(nd);
        this.__updateTemplate(nd);
        this.nodes = this.__getNodes(tpl);
        
        //兼容之前的版本，以后可去掉
        this.entity = this.__entity;
        this.nodes.panel = this.entity;
        
        return this;
    },
    
    /**
     * 设置当滚动条滚动时，是否固定住对象的功能
     * @memberOf SinaEditor._.Panel#
     * @param {Boolean} state
     */
    setFixed: function(state){
        if(!this.__isInited) {
			this.__initEntity();
		}
        
        var x = parseInt(this.__entity.style.left,10), y = parseInt(this.__entity.style.top,10);
        
        if (SinaEditor.env.$IE6) {
            this.__ie6FixedController.setFixed(this.__entity, state);
			if(this.__isSetAdamant) {
				this.__ie6FixedController.setFixed(this.__iframe, state);
			}
        }
        else {
        
            //设置为fixed状态
            if (state && !this.__isFixed) {
                this.setPosition({
                    x: x - Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
                    y: y - Math.max(document.documentElement.scrollTop, document.body.scrollTop)
                });
                this.__entity.style.position = "fixed";
            }
            
            //取消fixed状态
            if (!state && this.__isFixed) {
                this.setPosition({
                    x: x + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
                    y: y + Math.max(document.documentElement.scrollTop, document.body.scrollTop)
                });
                this.__entity.style.position = "absolute";
            }
            
        }
        this.__isFixed = !!state;
        this.__updateIframe();
        
        return this;
    },
    
    /**
     * 设置是否避免被select和flash之类的东东给遮挡
     * @memberOf SinaEditor._.Panel#
     * @param {Boolean} state
     */
    setAdamant: function(state){
        this.__isSetAdamant = !!state;
		if(this.__isSetAdamant && !this.__iframe) {
			this.__createIframe();
		}
        this.__updateIframe();
        return this;
    },
    
	/**
	 * @memberOf SinaEditor._.Panel#
	 */
    destroy: function(){
        if (!this.__entity) {
            return;
        }
        SinaEditor._.Panel.$super.destroy.call(this);
		if(this.__ie6FixedController) {
			this.__ie6FixedController.destroy();
		}
		if(this.__iframe) {
			this.__iframe.parentNode.removeChild(this.__iframe);
		}
    },
    
    /**
     * 设置位置,重写了父类的setPosition方法
     * @memberOf SinaEditor._.Panel#
     * @param {Object} p
     * 					x:Number
     * 					y:Number
     * 					z:Number
     */
    setPosition: function(p){
		if(!this.__isInited) {
			this.__initEntity();
		}
        if (SinaEditor.env.$IE6) {
            this.__ie6FixedController.setPosition(this.__entity, this.__isFixed, p);
        }
        else {
            SinaEditor._.Panel.$super.setPosition.call(this, p);
        }
        this.__updateIframe();
        return this;
    },
    
    /**
     * 设置大小,重写了父类的setSize方法
     * @memberOf SinaEditor._.Panel#
     * @param {Object} p
     * 					width:Number
     * 					height:Number
     */
    setSize: function(p){
        SinaEditor._.Panel.$super.setSize.call(this, p).__updateIframe();
        return this;
    },
    
    /**
     * 显示对象,重写了父类的show方法
     * @memberOf SinaEditor._.Panel#
     * @param {IRenderer} renderer
     */
    show: function(renderer){
        SinaEditor._.Panel.$super.show.call(this, renderer).__updateIframe();
        return this;
    },
    
    /**
     * 隐藏对象,重写了父类的hidden方法
     * @memberOf SinaEditor._.Panel#
     * @param {IRenderer} renderer
     */
    hidden: function(renderer){
        SinaEditor._.Panel.$super.hidden.call(this, renderer).__updateIframe();
        return this;
    },
    
    /**
     * 重写父类的获取x坐标方法，如果是fixed状态，返回的是相对可见区域的x坐标
     * @inner
     * @memberOf SinaEditor._.Panel#
     */
    __getX: function(){
        if(!this.__isInited) {
			this.__initEntity();
		}
        if (SinaEditor.env.$IE6) {
            return this.__ie6FixedController.getX(this.__entity, this.__isFixed);
        }
        else {
            return parseInt(this.__entity.style.left,10);
        }
    },
    
    /**
     * 重写父类的获取y坐标方法，如果是fixed状态，返回的是相对可见区域的y坐标
     * @inner
     * @memberOf SinaEditor._.Panel#
     */
    __getY: function(){
        if(!this.__isInited) {
			this.__initEntity();
		}
        if (SinaEditor.env.$IE6) {
            return this.__ie6FixedController.getY(this.__entity, this.__isFixed);
        }
        else {
            return parseInt(this.__entity.style.top,10);
        }
    },
    
	/**
	 * @inner
	 * @memberOf SinaEditor._.Panel#
	 */
    __createIframe: function(){
        this.__iframe = SinaEditor.util.dom.createDom("iframe", {
            attributes: {
                'frameBorder': 'none'
            }
        });
        this.__parent.insertBefore(this.__iframe, this.__entity);
        SinaEditor.util.dom.setStyle(this.__iframe, "opacity", 0);
        if(this.__ie6FixedController) {
			this.__ie6FixedController.iframeNode = this.__iframe;
		}
        this.__updateIframe();
    },
    
	/**
	 * @inner
	 * @memberOf SinaEditor._.Panel#
	 */
    __updateIframe: function(){
        if (this.__iframe) {
            var st = this.__iframe.style;
            st.backgroundColor = "#ffffff";
            st.left = this.x + "px";
            st.top = this.y + "px";
            st.width = this.width + "px";
            st.height = this.height + "px";
            st.position = this.__entity.style.position;
            st.display = this.__entity.style.display;
            st.zIndex = this.__entity.style.zIndex;
			if(SinaEditor.env.$IE6) {
				this.__ie6FixedController.updateIframe(this.__isFixed);
			}
        }
    },
    
    /**
     * 更新IE6Fixed控制器设置的原始坐标
     * @inner
     * @memberOf SinaEditor._.Panel#
     */
    __updateIE6FCOrgPosition: function(){
        if(this.__ie6FixedController) {
			this.__ie6FixedController.updateOrgPosition();
		}
    },
    
    /**
     * 更新设置的模板数据
     * @inner
     * @memberOf SinaEditor._.Panel#
     * @param {Object} nd
     */
    __updateTemplate: function(nd){
        var l, t, z, p, d, et = this.__entity;
        
        if (et) {
            if(et.parentNode) {
				et.parentNode.removeChild(et);
			}
            l = et.style.left;
            t = et.style.top;
            z = et.style.zIndex;
            p = et.style.position;
            d = et.style.display;
        }
        else {
            d = "none";
        }
        
        et = this.__entity = SinaEditor.util.dom.$E("_" + this.uniqueID + "_panel");
        
        //加上entity的节点，以兼容老版本的模板，以后不用entity的模板后可以去掉
        if (!et) {
            et = this.__entity = SinaEditor.util.dom.$E("_" + this.uniqueID + "_entity");
        }
        if (!et) {
            //如果模板内没有指定#{panel}则抛出异常
            throw new Error("[Panel Error]there missing identifier #{panel} in panel template");
        }
        
        et.style.left = l || 0;
        et.style.top = t || 0;
        et.style.zIndex = z || 0;
        et.style.position = p || "absolute";
        et.style.display = d;
        
        this.__parent.replaceChild(et, nd);
		if(this.__ie6FixedController) {
			this.__ie6FixedController.node = this.__entity;
		}
    },
    
    /**
     * 根据模板获取所有可用节点(模板中以{nodeID}这种形式的节点将会被获取到)
     * @inner
     * @memberOf SinaEditor._.Panel#
     * @param {String} tempalte 模板HTML
     * @param {String} mode "o":返回对象的属性为dom对象(默认)
     *                      "i":返回对象的属性为dom对象的ID
     */
    __getNodes: function(template, mode){
        var m = mode || "o", p = /\{[^\}]+(?=\})/g, i, nodes = {}, rets, r;
        
        //if(m==="i" || !this.__templateNodesIDs.length){
        this.__templateNodesIDs = template.match(p);
        //}
        rets = this.__templateNodesIDs;
        
        if (rets) {
            i = rets.length;
            while (i--) {
                r = rets[i].replace("{", "");
                switch (m) {
                    case "o":
                        nodes[r] = SinaEditor.util.dom.$E("_" + this.uniqueID + "_" + r);
                        break;
                    case "i":
                        nodes[r] = "_" + this.uniqueID + "_" + r;
                        break;
                }
            }
        }
        return nodes;
    },
    
    /**
     * 获取唯一ID
     * @inner
     * @memberOf SinaEditor._.Panel#
     */
    __getUniqueID: function(){
        return parseInt(Math.random() * 1000,10).toString() + (new Date()).getTime().toString();
    },
    
    /**
     * 兼容老版本layer的方法
     * @memberOf SinaEditor._.Panel#
     */
    setContent: function(str){
		if(this.nodes.content) {
			this.nodes.content.innerHTML = str;
		}
    }
});
/**
 * 对话框，继承自{@link SinaEditor._.Panel}
 * event:
 * 		beforeDrag,
 * 		drag,
 * 		afterDrag,
 * 		beforeShow,
 * 		show,
 * 		beforeHidden,
 * 		hidden,
 * @class 对话框类
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-25
 */
SinaEditor._.Dialog=function(parent,node){
	var me=this;
	
	this.__dragger=null;
	this.__isBindUpadateAreaEvent=false;
	this.__isBindUpdateIE6AreaEvent=false;
	
	//拖拽时的事件句柄
	this.__beforeDragHandle=function(){
		me.__updateDraggerArea();
		me.__eventDispatcher.dispatchEvent("beforedrag");
	};
	this.__dragHandle=function(){
		if(me.__isSetAdamant) {
			me.__updateIframe();
		}
		me.__eventDispatcher.dispatchEvent("drag");
	};
	this.__afterDragHandle=function(){
		if(me.__isFixed && SinaEditor.env.$IE6) {
			me.__updateIE6FCOrgPosition();
		}
		me.__eventDispatcher.dispatchEvent("afterdrag");
	};
	
	this.__updateDraggerAreaHandle=function(){
		setTimeout(function(){
			me.__updateDraggerArea();
		},1);
	};
	
	this.__setMiddleHandle=function(){
		me.setMiddle();
	};
	
	
}.$extends(SinaEditor._.Panel).$define({
	
	/**
	 * 设置模板
	 * @param {Object} tpl 要设置模板的key:value对应object
	 * @memberOf SinaEditor._.Dialog#
	 */
	setTemplate:function(tpl){
		SinaEditor._.Dialog.$super.setTemplate.call(this,tpl);
		this.__initTitleBar();
		this.setDragger(SinaEditor._.SimpleDragger);
		return this;
	},
	
	/**
	 * 设置内容
	 * @param {String} content
	 * @memberOf SinaEditor._.Dialog#
	 */
	setContent:function(content){
		if(!this.nodes.content){
			return this;
		}
		
		this.nodes.content.innerHTML=new SinaEditor.$abstract.Template(content).evaluate(this.__getNodes(content,"i"));
		this.__addContentNodes(this.__getNodes(content));
		
		return this;
	},
	/**
	 * 对窗口的缩放，遮罩层的修正。
	 * @param {boolean} state 是否对resize事件的监听
	 * @memberOf SinaEditor._.Dialog#
	 */
	setFixed:function(state){
		SinaEditor._.Dialog.$super.setFixed.call(this,state);
		if(state){
			SinaEditor.ev.add(window, 'resize', this.__setMiddleHandle);
		}else{
			SinaEditor.ev.remove(window,'resize',this.__setMiddleHandle);
		}
		this.__updateDraggerArea();
		return this;
	},
	
	/**
	 * 设置居中，对话框会以y轴的黄金分割率来居中显示
	 * @memberOf SinaEditor._.Dialog#
	 */
	setMiddle:function(){
		var areaHeight=this.__getDocumentSize().height - this.height,
			goldenSection=(Math.sqrt(5)-1)/2,
			totalSection=1,
			goldenSectionY=areaHeight * goldenSection / (goldenSection + totalSection),
			middleX=this.__getDocumentSize().width/2-this.width/2;
			
			if(!this.__isFixed){
				goldenSectionY+=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
				middleX+=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
			}

		this.setPosition({
			x:Math.max(middleX,0),
			y:Math.max(goldenSectionY,0)
		});
		
		return this;
	},
	
	/**
	 * 锁定在窗口内拖动。
	 * @param {boolean} state 是否锁定。
	 * @memberOf SinaEditor._.Dialog#
	 */
	setAreaLocked:function(state){
		if(!this.__dragger){
			return this;
		}
		
		this.__dragger.setLock(state);
		return this;
	},
	
	/**
	 * 设置对话框大小
	 * @memberOf SinaEditor._.Dialog#
	 * @param {Object} p
	 * 					width:Number
	 * 					height:Number
	 */
	setSize:function(p){
		if(!this.__isInited) {
			this.__initEntity();
		}
		
		if(this.nodes.content){
			if(typeof p.width!=="undefined") {
				this.nodes.content.style.width=p.width+"px";
			}
			if(typeof p.height!=="undefined") {
				this.nodes.content.style.height=p.height+"px";
			}
		}else{
			if(typeof p.width!=="undefined") {
				this.__entity.style.width=p.width+"px";
			}
			if(typeof p.height!=="undefined") {
				this.__entity.style.height=p.height+"px";
			}
		}
		
		return this;
	},
	
	/**
	 * 设置拖拽器,以通过标题栏拖拽对话框
	 * @memberOf SinaEditor._.Dialog#
	 * @param {IDragger} draggerConstructor
	 */
	setDragger:function(draggerConstructor){
		if(!this.nodes.titleBar || !draggerConstructor){
			return this;
		}
		
		if(!this.__dragger){
			this.__dragger=new draggerConstructor();
		}else if(this.__dragger.constructor===draggerConstructor){
			return this;
		}

		this.__updateDragger(draggerConstructor);
		return this;
	},
	/**
	 * 清除对话框
	 * @memberOf SinaEditor._.Dialog#
	 */
	destroy:function(){
		if(!this.__entity){
			return;
		}
		SinaEditor._.Dialog.$super.destroy.call(this);
		SinaEditor.ev.remove(window,'resize',this.__updateDraggerAreaHandle);
		SinaEditor.ev.remove(window,'resize',this.__setMiddleHandle);
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.Dialog#
	 * @param {Object} nodes
	 */
	__addContentNodes:function(nodes){
		var nds=this.nodes,
			k;
		
		for(k in nodes){
			nds[k]=nodes[k];
		}
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.Dialog#
	 * @param {Object} draggerConstructor
	 */
	__updateDragger:function(draggerConstructor){
		
		if (this.__dragger.constructor !== draggerConstructor) {
			this.__dragger.removeEventListener("beforedrag", this.__beforeDragHandle)
				.removeEventListener("drag", this.__dragHandle)
				.removeEventListener("afterdrag", this.__afterDragHandle);
			
			this.__dragger.destroy();
			this.__dragger=new draggerConstructor();
		}
		
		this.__dragger.setDrag(this.nodes.titleBar,this.__entity,false);
		this.__dragger.addEventListener("beforedrag", this.__beforeDragHandle)
				.addEventListener("drag", this.__dragHandle)
				.addEventListener("afterdrag", this.__afterDragHandle);
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.Dialog#
	 */
	__updateDraggerArea:function(){
		var l,t,r,b;
		if(this.__isFixed){
			l=SinaEditor.env.$IE6?document.documentElement.scrollLeft:0;
			t=SinaEditor.env.$IE6?document.documentElement.scrollTop:0;
			r=SinaEditor.env.$IE6?document.documentElement.scrollLeft + this.__getDocumentSize().width-this.width
				:this.__getDocumentSize().width-this.width;
				
			b=SinaEditor.env.$IE6?document.documentElement.scrollTop + this.__getDocumentSize().height-this.height
				:this.__getDocumentSize().height-this.height;
		}else{
			l=0;
			t=0;
			r=document.documentElement.scrollWidth-this.width;
			b=document.documentElement.scrollHeight-this.height;
		}
		this.__dragger.setArea({
			left:l,
			top:t,
			right:r,
			bottom:b
		});
	},
	
	/**
	 * 初始化标题栏
	 * @inner
	 * @memberOf SinaEditor._.Dialog#
	 */
	__initTitleBar:function(){
		if(!this.nodes.titleBar){
			return;
		}
		var tb=this.nodes.titleBar;
			tb.style.cursor = "move";
			if(SinaEditor.env.$IE){
				SinaEditor.ev.add(tb, 'selectstart', function(){
					return false;
				});
			}else{
				tb.style.MozUserSelect="none";
			}
	},
	
	/**
	 * 获取当前可见区域的尺寸
	 * @inner
	 * @memberOf SinaEditor._.Dialog#
	 */
	__getDocumentSize:function(){
		var w=document.documentElement.clientWidth || document.body.clientWidth,
			h=document.documentElement.clientHeight || document.body.clientHeight;
			
		return {width:w,height:h};
	}
});
/**
 * @class 模态对话框
 * @namespace SinaEditor._
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-26
 */
SinaEditor._.ModuleDialog=function(tplConfig,iconSet,cfg){
	this.__bgShadow=null;
	this.__dialog=null;
	this.__isInitBgShadow=false;
	this.__tplConfig=tplConfig;
	this.__iconSet=iconSet;
	this.__dialogQueue=[];
	this.__zIndex=1024;
	this.__cfg=cfg || {};
}.$define({
	
	/**
	 * alert显示的对话框
	 * @memberOf SinaEditor._.ModuleDialog#
	 * @param {String}  text 对话框显示的文本
	 * @param {Object}  cfg 对话框的配置参数
	 * 						funcOk {Function} "确定"按钮执行的方法
	 * 						textOk {String} "确定"按钮的文本
	 * 						funcClose {Function} "关闭"按钮执行的方法
	 * 						funcBeforeClose {Function} 点"关闭"按钮后,对话框在关闭前执行的方法
	 * 						title {String} 标题
	 * 						icon {String} 显示图标 ["01","01","03","04"]
	 * 						width {Number} 宽度
	 * 						height {Number} 高度
	 * 						subText {String} 次级文本
	 * 						bgShadowOpacity {Number} 背景阴影层的透明度 0-1,小于0为不显示
	 * 						renderer {IRenderer} 实现呈现方式接口的类
	 * 						dragger {IDragger} 实现拖拽方式接口的类
	 * 						isAdamant {Boolean} 是否显示背景iframe以挡住select/flash之类的讨厌的东东
	 */
	alert:function(text,cfg){
		cfg=cfg || {};
		var dlg=this.__createMessageDialog(this.__tplConfig.alert,cfg);
		if(dlg.nodes.text) {
			dlg.nodes.text.innerHTML=text || "";
		}
		
		dlg.show(cfg.renderer || this.__cfg.renderer)
			.addEventListener("hidden",function(){
				this.destroy();
			});
		if(dlg.nodes.linkOk && dlg.nodes.linkOk.style.display!=="none") {
			dlg.nodes.linkOk.focus();
		}
		return dlg;
	},
	
	/**
	 * 确认型对话框
	 * @memberOf SinaEditor._.ModuleDialog#
	 * @param {String}  text 对话框显示的文本
	 * @param {Object}  cfg 对话框的配置参数
	 * 						funcOk {Function} 点击"确定"按钮执行的方法
	 * 						textOk {String} "确定"按钮的文本
	 * 						funcCancel {Function} 点击"取消"按钮执行的方法
	 * 						textCancel {String} "取消"按钮的文本
	 * 						funcClose {Function} "关闭"按钮执行的方法
	 * 						funcBeforeClose {Function} 点"关闭"按钮后,对话框在关闭前执行的方法 
	 * 						defaultButton {Number} 要聚焦的按钮，1 表示"确定"按钮默认聚焦，0 表示"取消"按钮默认聚焦，默认是"确定"按钮聚焦
	 * 						title {String} 标题
	 * 						icon {String} 显示图标 ["01","01","03","04"]
	 * 						width {Number} 宽度
	 * 						height {Number} 高度
	 * 						subText {String} 次级文本
	 * 						bgShadowOpacity {Number} 背景阴影层的透明度 0-1,小于0为不显示
	 * 						renderer {IRenderer} 实现呈现方式接口的类
	 * 						dragger {IDragger} 实现拖拽方式接口的类
	 * 						isAdamant {Boolean} 是否显示背景iframe以挡住select/flash之类的讨厌的东东
	 */
	confirm:function(text,cfg){
		cfg=cfg || {};
		
		var dlg=this.__createMessageDialog(this.__tplConfig.confirm,cfg),
			me=this;
			
		if(dlg.nodes.text) {
			dlg.nodes.text.innerHTML=text || "";
		}
		
		if(dlg.nodes.btnCancel){
			dlg.nodes.btnCancel.innerHTML=cfg.textCancel || "取消";
			SinaEditor.ev.add(dlg.nodes.btnCancel,'click',function(ev){
				if(cfg.funcCancel) {
					cfg.funcCancel.call(dlg);
				}
				dlg.hidden(cfg.renderer || me.__cfg.renderer);
				SinaEditor.ev.stopEvent(ev);
			});
			if(dlg.nodes.linkCancel) {
				SinaEditor.ev.add(dlg.nodes.linkCancel,'keydown',function(){
					var e = me.__getEvent();
					if (e.keyCode == "13") {
						if(cfg.funcCancel) {
							cfg.funcCancel.call(dlg);
						}
						dlg.hidden(cfg.renderer || me.__cfg.renderer);
					}
				});
			}
		}
		
		dlg.show(cfg.renderer || me.__cfg.renderer)
			.addEventListener("hidden",function(){
				this.destroy();
			});
			
		if(parseInt(cfg.defaultButton,10)===0) {
			if(dlg.nodes.linkCancel && dlg.nodes.linkCancel.style.display!=="none") {
				dlg.nodes.linkCancel.focus();
			}
		}else{
			if(dlg.nodes.linkOk && dlg.nodes.linkOk.style.display!=="none") {
				dlg.nodes.linkOk.focus();
			}
		}
		return dlg;
	},
	
	/**
	 * 创建自定义对话框
	 * @memberOf SinaEditor._.ModuleDialog#
	 * @param {Object} cfg
	 * 					content 对话框的内容(支持模板方式)
	 * 					funcBeforeClose {Function} 点"关闭"按钮后,对话框在关闭前执行的方法
	 * 					funcClose {Function} "关闭"按钮执行的方法
	 * 					title 标题
	 * 					width 宽度
	 * 					height 高度
	 * 					bgShadowOpacity {Number} 背景阴影层的透明度 0-1,小于0为不显示
	 * 					tpl 对话框的模板
	 * 					isAdamant {Boolean} 是否显示背景iframe以挡住select/flash之类的讨厌的东东
	 * @param {String} name 对话框的名称
	 */
	create:function(cfg){
		var me=this;
		
		cfg=cfg || {};
		var dlg=new SinaEditor._.Dialog();
		dlg.setTemplate(cfg.tpl || this.__tplConfig.customs);
		if(cfg.content) {
			dlg.setContent(cfg.content);
		}
		if(cfg.width && !isNaN(cfg.width)) {
			dlg.setSize({width:cfg.width});
		}
		if(cfg.height && !isNaN(cfg.height)) {
			dlg.setSize({height:cfg.height});
		}
		return this.__initDialog(dlg,cfg);
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.ModuleDialog#
	 * @param {Object} tpl
	 * @param {Object} cfg
	 */
	__createMessageDialog:function(tpl,cfg){
		var dlg=new SinaEditor._.Dialog(),
			me=this,
			i;

		dlg.setTemplate(tpl);
		
		if(cfg.width && !isNaN(cfg.width)) {
			dlg.setSize({width:cfg.width});
		}
		if(cfg.height && !isNaN(cfg.height)) {
			dlg.setSize({height:cfg.height});
		}
		if(dlg.nodes.subText) {
			dlg.nodes.subText.innerHTML=cfg.subText || "";
		} 
		if(dlg.nodes.icon){
			dlg.nodes.icon.className=this.__iconSet[cfg.icon || "01"]["class"];
			//dlg.nodes.icon.alt=this.__iconSet[cfg.icon || "01"]["alt"];
			dlg.nodes.icon.alt=this.__iconSet[cfg.icon || "01"].alt;
		}
		if(dlg.nodes.btnOk){
			dlg.nodes.btnOk.innerHTML=cfg.textOk || "确定";
			SinaEditor.ev.add(dlg.nodes.btnOk,'click',function(ev){
				dlg.hidden(cfg.renderer || me.__cfg.renderer);
				if(cfg.funcOk) {
					cfg.funcOk.call(dlg);
				}
				SinaEditor.ev.stopEvent(ev);
			});
		}
		
		if(dlg.nodes.linkOk) {
			SinaEditor.ev.add(dlg.nodes.linkOk,'keydown',function(){
				var e = me.__getEvent();
				if (e.keyCode == "13") {
					dlg.hidden(cfg.renderer || me.__cfg.renderer);
					if(cfg.funcOk) {
						cfg.funcOk.call(dlg);
					}
				}
			});
		}
		
		dlg.setDragger(cfg.dragger || me.__cfg.dragger)
			.setFixed(true)
			.setAreaLocked(true);
		
		return this.__initDialog(dlg,cfg);
	},
	
	/**
	 * 初始化对话框，初始化标题栏、关闭按钮、显示的位置和模式及拖拽的模式
	 * @inner
	 * @memberOf SinaEditor._.ModuleDialog#
	 */
	__initDialog:function(dlg,cfg){
		var me=this;
		
		if(dlg.nodes.titleName) {
			dlg.nodes.titleName.innerHTML=cfg.title || "提示";
		}
		
		if(dlg.nodes.btnClose){
			SinaEditor.ev.add(dlg.nodes.btnClose,'click',function(){
				var isCanHidden=true;
				if(cfg.funcBeforeClose) {
					isCanHidden=cfg.funcBeforeClose.call(dlg) !== false;
				}
				if(cfg.funcClose) {
					cfg.funcClose.call(dlg);
				}
				if(isCanHidden) {
					dlg.hidden();
				}
			});
			SinaEditor.ev.add(dlg.nodes.btnClose,'mousedown',function(ev){
				SinaEditor.ev.stopEvent(ev);
			});
		}
		
		dlg.setPosition({z:me.__zIndex})
			.setRenderer(cfg.renderer || this.__cfg.renderer)
			.setDragger(cfg.dragger || this.__cfg.dragger)
			.setMiddle()
			.addEventListener("beforeHidden",function(){
				me.__updateDialogQueue(this,"remove");
			})
			.addEventListener("beforeShow",function(){
				var that=this;
				if(!me.__isInitBgShadow){
					me.__initBGShadow(this,cfg.isAdamant || me.__cfg.isAdamant);
				}
				me.__setBGShadowOpacity(cfg.bgShadowOpacity!==0?cfg.bgShadowOpacity || 0.4:cfg.bgShadowOpacity);
				window.setTimeout(function(){
					me.__bgShadow.show();
					me.__updateDialogQueue(that,"add");
				},1);
			});
			
			
		//动态绑定一些方法，兼容之前的版本，以后可去掉
		dlg.setTitle=function(title){
			if(this.nodes.titleName) {
				this.nodes.titleName.innerHTML=title;
			}
		};
		dlg.setHelp=function(url){
			if(this.nodes.btnHelp) {
				this.nodes.btnHelp.href=url;
			}
		};
		dlg.close=function(){
			this.hidden();
		};
		dlg.getNodes=function(){
			return this.nodes;
		};
		dlg.getX=function(){
			return this.x;
		};
		dlg.getY=function(){
			return this.y;
		};
		dlg.getWidth=function(){
			return this.width;
		};
		dlg.getHeight=function(){
			return this.height;
		};
		
		return dlg;
	},
	
	/**
	 * 初始化背景阴影层
	 * @inner
	 * @memberOf SinaEditor._.ModuleDialog#
	 */
	__initBGShadow:function(dlg,isAdamant){
		var w=this.__getDocumentSize().width,
			h=this.__getDocumentSize().height,
			me=this;
			
		this.__bgShadow=new SinaEditor._.Panel();
		this.__bgShadow.setTemplate('<div id="#{panel}" style="background-color:black"></div>')
			.setSize({
				width:w,
				height:h
			})
			.setAdamant(isAdamant)
			.setFixed(true)
			.setPosition({x:0,y:0,z:me.__zIndex});
		SinaEditor.ev.add(window,'resize',function(){
			me.__bgShadow.setPosition({
				x:0,y:0
			})
			.setSize({
				width:me.__getDocumentSize().width,
				height:me.__getDocumentSize().height
			});
		});
		
		this.__bgShadow.nodes.panel.parentNode.insertBefore(this.__bgShadow.nodes.panel,dlg.nodes.panel);
		
		this.__isInitBgShadow=true;
	},
	
	/**
	 * 更新对话框的显示队列,并且会更新阴影层到当前的对话框后面
	 * @inner
	 * @memberOf SinaEditor._.ModuleDialog#
	 */
	__updateDialogQueue:function(dialog,op){
		var i,
			dlg;
		
		if(op==="add"){
			this.__dialogQueue.push(dialog);
		}else if(op==="remove"){
			i=this.__dialogQueue.length;
			while(i--){
				if(this.__dialogQueue[i]===dialog) {
					this.__dialogQueue.splice(i,1);
				} 
			}
		}
		
		if(this.__dialogQueue.length===0){
			this.__bgShadow.hidden();
		}else{
			dlg=this.__dialogQueue[this.__dialogQueue.length-1];
			dlg.nodes.panel.parentNode.appendChild(dlg.nodes.panel);			
			this.__bgShadow.nodes.panel.parentNode.insertBefore(this.__bgShadow.nodes.panel,dlg.nodes.panel);
			if(this.__bgShadow.__iframe) {
				this.__bgShadow.__iframe.parentNode.insertBefore(this.__bgShadow.__iframe,this.__bgShadow.nodes.panel);
			}
			if(dlg.nodes.linkOk && dlg.nodes.linkOk.style.display!=="none") {
				dlg.nodes.linkOk.focus();
			}
		}
	},
	
	/**
	 * 设置背景阴影层的透明度
	 * @inner
	 * @memberOf SinaEditor._.ModuleDialog#
	 * @param {Number} v
	 */
	__setBGShadowOpacity:function(v){
		v=isNaN(v)?0:Math.max(Math.min(v,1),0);
		SinaEditor.util.dom.setStyle(this.__bgShadow.nodes.panel,"opacity",v);
	},
	
	/**
	 * 获取可见区域的尺寸
	 */
	__getDocumentSize:function(){
		var w=document.documentElement.clientWidth || document.body.clientWidth,
			h=document.documentElement.clientHeight || document.body.clientHeight;
			
		return {width:w,height:h};
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.ModuleDialog#
	 */
	__getEvent : function() {
		if (window.event) {
			return window.event;
		}
		var o = arguments.callee.caller;
		var e;
		var n = 0;
		while(o !== null && n < 40){
			e = o.arguments[0];
			if (e && (e.constructor == Event || e.constructor == MouseEvent)) {
				return e;
			}
			n ++;
			o = o.caller;
		}
		return e;
	}
	
});
/**
 * 对话框的配置文件
 * @class 对话框的配置文件
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-11-11
 */
SinaEditor.winDialog={};
(function(){
	var dialogTemplates={
		alert:[
			'<table id="#{panel}" class="CP_w">',
				'<thead id="#{titleBar}">',
					'<tr>',
						'<th class="tLeft"><span></span></th>',
						'<th class="tMid"><div class="bLyTop"><strong id="#{titleName}">提示标题</strong><cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite></div></th>',
						'<th class="tRight"><span></span></th>',
					'</tr>',
				'</thead>',
				'<tfoot>',
					'<tr>',
						'<td class="tLeft"><span></span></td>',
						'<td class="tMid"><span></span></td>',
						'<td class="tRight"><span></span></td>',
					'</tr>',
				'</tfoot>',
				'<tbody>',
					'<tr>',
						'<td class="tLeft"><span></span></td>',
						'<td class="tMid">',
						'<div id="#{content}" class="CP_layercon1">',	
							'<div class="CP_prompt">',
							'<img id="#{icon}" class="SG_icon SG_icon201" width="50" height="50" align="absmiddle"/>',
							'<table class="CP_w_ttl"><tr><td id="#{text}"></td></tr></table>',
							'<div id="#{subText}" class="CP_w_cnt SG_txtb"></div>',
							'<p class="CP_w_btns_Mid"><a id="#{linkOk}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnOk}"> </cite></a></p>',
							'</div>',
						'</div>',
						'</td>',
						'<td class="tRight"><span></span></td>',
					'</tr>',
				'</tbody>',
			'</table>'
		].join(""),
				
				
		confirm:[
			'<table id="#{panel}" class="CP_w">',
				'<thead id="#{titleBar}">',
					'<tr>',
						'<th class="tLeft"><span></span></th>',
						'<th class="tMid"><div class="bLyTop"><strong id="#{titleName}">提示标题</strong><cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite></div></th>',
						'<th class="tRight"><span></span></th>',
					'</tr>',
				'</thead>',
				'<tfoot>',
					'<tr>',
						'<td class="tLeft"><span></span></td>',
						'<td class="tMid"><span></span></td>',
						'<td class="tRight"><span></span></td>',
					'</tr>',
				'</tfoot>',
				'<tbody>',
					'<tr>',
						'<td class="tLeft"><span></span></td>',
						'<td class="tMid">',
						'<div id="#{content}" class="CP_layercon1">',	
							'<div class="CP_prompt">',
							'<img id="#{icon}" class="SG_icon SG_icon201" src="',SinaEditor.CONF.transparentIMG,'" width="50" height="50" align="absmiddle"/>',
							'<table class="CP_w_ttl"><tr><td id="#{text}"></td></tr></table>',
							'<div id="#{subText}" class="CP_w_cnt SG_txtb"></div>',
							'<p class="CP_w_btns">',
								'<a  id="#{linkOk}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnOk}"></cite></a>',
								'<a style="margin-left:5px;" id="#{linkCancel}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnCancel}"> <span id="#{cancel}"></span> </cite></a></p>',
							'</div>',
						'</div>',
						'</td>',
						'<td class="tRight"><span></span></td>',
					'</tr>',
				'</tbody>',
			'</table>'
		].join(""),
				
				
		customs:[
			'<table id="#{panel}" class="CP_w">',
				'<thead id="#{titleBar}">',
					'<tr>',
						'<th class="tLeft"><span></span></th>',
						'<th class="tMid">',
							'<div class="bLyTop">',
								'<strong id="#{titleName}">提示标题</strong>',
								'<cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite>',
							'</div>',
						'</th>',
						'<th class="tRight"><span></span></th>',
					'</tr>',
				'</thead>',
				'<tfoot>',
					'<tr>',
						'<td class="tLeft"><span></span></td>',
						'<td class="tMid"><span></span></td>',
						'<td class="tRight"><span></span></td>',
					'</tr>',
				'</tfoot>',
				'<tbody>',
					'<tr>',
						'<td class="tLeft"><span></span></td>',
						'<td class="tMid" id="#{content}">',
						'</td>',
						'<td class="tRight"><span></span></td>',
					'</tr>',
				'</tbody>',
			'</table>'
		].join("")
	};
	
	/**
	 * 显示图标配置
	 * "01":[!]
	 * "02":[×]
	 * "03":[√]
	 * "04":[?]
	 */
	var	iconSet={
		"01":{"class":"SG_icon SG_icon201","alt":"警告"},
		"02":{"class":"SG_icon SG_icon202","alt":"失败"},
		"03":{"class":"SG_icon SG_icon203","alt":"成功"},
		"04":{"class":"SG_icon SG_icon204","alt":"询问"}
	};

	SinaEditor.winDialog = new SinaEditor._.ModuleDialog(dialogTemplates, iconSet,{
		renderer:SinaEditor._.OpacityRenderer,
		dragger:SinaEditor._.BorderDragger,
		isAdamant:SinaEditor.env.$IE6
	});
	
})();
