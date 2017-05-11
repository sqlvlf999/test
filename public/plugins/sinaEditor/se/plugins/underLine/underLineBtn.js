
//下划线
//通过添加strong标签和移除strong标签来达到
SinaEditor.plugins.add('underlineBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'下划线',
		normalClass : 'ico_underline_1'
		,disabledClass : 'ico_underline_4'
		,clickedClass : 'ico_underline_3'
		,mouseoverClass : 'ico_underline_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'common'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.underline = btn;

    return {
        "events": [{
			'element' : btn.$,
			'events' : {
				'click' : function() {
					editor.operation.underline(editor);
				}
			}
		}]
    };
});