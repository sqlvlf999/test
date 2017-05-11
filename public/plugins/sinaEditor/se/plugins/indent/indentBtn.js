
//增加缩进
SinaEditor.plugins.add('indentBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'增加缩进',
		normalClass : 'ico_indent_1'
		,disabledClass : 'ico_indent_4'
		,clickedClass : 'ico_indent_3'
		,mouseoverClass : 'ico_indent_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.indent = btn;
	
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
					editor.operation.indent();
					return false;
				}
            }
        }]
    };
});