
//居中
SinaEditor.plugins.add('justifycenterBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'居中',
		normalClass : 'ico_justifycenter_1'
		,disabledClass : 'ico_justifycenter_4'
		,clickedClass : 'ico_justifycenter_3'
		,mouseoverClass : 'ico_justifycenter_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.justifycenter = btn;
	
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
					editor.operation.justifycenter();
					return false;
				}
            }
        }]
    };
});