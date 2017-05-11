

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
        group: 'viewSource'
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