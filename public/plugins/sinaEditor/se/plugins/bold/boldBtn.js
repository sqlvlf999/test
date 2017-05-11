
//用于加粗
//通过添加strong标签和移除strong标签来达到
SinaEditor.plugins.add('boldBtn',function(args){
	var editor = this;
	
	var btnConf = {
		title:'加粗',
		normalClass : 'ico_bold_1'
		,disabledClass : 'ico_bold_4'
		,clickedClass : 'ico_bold_3'
		,mouseoverClass : 'ico_bold_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'common'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.bold = btn;
	
    return {
        "events": [{
			'element' : btn.$,
			'events' : {
				'click' : function(e) {
					SinaEditor.ev.stopEvent(e);
					editor.operation.bold(editor);
					return false;
				}
			}
		}]
    };
});