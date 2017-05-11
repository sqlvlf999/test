
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