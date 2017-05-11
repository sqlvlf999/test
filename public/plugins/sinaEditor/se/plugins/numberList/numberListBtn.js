
//数字符号
//添加ol标签
SinaEditor.plugins.add('numberListBtn',function(args){
	var editor = this;
	
	var btnConf = {
		title:'数字符号',
		normalClass : 'ico_numberlist_1'
		,disabledClass : 'ico_numberlist_4'
		,clickedClass : 'ico_numberlist_3'
		,mouseoverClass : 'ico_numberlist_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'composing'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.numberList = btn;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.numberList();
					return false;
				}
            }
        }]
    };
});