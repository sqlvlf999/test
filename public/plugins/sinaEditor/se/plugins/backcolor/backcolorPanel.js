
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