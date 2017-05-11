
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
