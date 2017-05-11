
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