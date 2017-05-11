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
