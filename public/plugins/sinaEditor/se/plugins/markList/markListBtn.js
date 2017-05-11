
//项目符号
//添加ul标签
SinaEditor.plugins.add('markListBtn',function(args){
	var editor = this;
	
	var btnConf = {
		title:'项目符号',
		normalClass : 'ico_marklist_1'
		,disabledClass : 'ico_marklist_4'
		,clickedClass : 'ico_marklist_3'
		,mouseoverClass : 'ico_marklist_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.markList = btn;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.markList();
					return false;
				}
            }
        }]
    };
});