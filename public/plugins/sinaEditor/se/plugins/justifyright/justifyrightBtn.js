
//减少缩进
SinaEditor.plugins.add('justifyrightBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'居右',
		normalClass : 'ico_justifyright_1'
		,disabledClass : 'ico_justifyright_4'
		,clickedClass : 'ico_justifyright_3'
		,mouseoverClass : 'ico_justifyright_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.justifyright = btn;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.justifyright();
					return false;
				}
            }
        }]
    };
});