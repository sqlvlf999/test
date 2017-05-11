
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