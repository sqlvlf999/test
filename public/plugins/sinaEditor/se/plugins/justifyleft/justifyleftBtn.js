
//居左
SinaEditor.plugins.add('justifyleftBtn',function(args){
	var editor = this;
	
	var btnConf = {
		title:'居左',
		normalClass : 'ico_justifyleft_1'
		,disabledClass : 'ico_justifyleft_4'
		,clickedClass : 'ico_justifyleft_3'
		,mouseoverClass : 'ico_justifyleft_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.justifyleft = btn;
	
    return {
        'initialize': function(){
        },
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.justifyleft();
					return false;
				}
            }
        }]
    };
});