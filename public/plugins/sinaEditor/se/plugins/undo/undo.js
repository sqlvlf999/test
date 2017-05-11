
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
