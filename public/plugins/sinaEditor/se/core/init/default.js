
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
