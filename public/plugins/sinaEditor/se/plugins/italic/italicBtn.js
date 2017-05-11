
//用于斜体字
//通过添加strong标签和移除strong标签来达到
SinaEditor.plugins.add('italicBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'斜体',
		normalClass : 'ico_italic_1'
		,disabledClass : 'ico_italic_4'
		,clickedClass : 'ico_italic_3'
		,mouseoverClass : 'ico_italic_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'common'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.italic = btn;
	
    return {
        "events": [{
			'element' : btn.$,
			'events' : {
				'click' : function() {
					if(editor.btns.italic.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.italic();
					return false;
				}
			}
		}]
    };
});