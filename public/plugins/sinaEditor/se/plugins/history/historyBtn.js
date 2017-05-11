
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
		,group : 'redoAndUndo'
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