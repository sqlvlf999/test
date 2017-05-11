
//文字颜色的获取
//在span里加color来实现这一目的
SinaEditor.plugins.add('forecolorBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'文字颜色',
		normalClass : 'ico_forecolor_1'
		,disabledClass : 'ico_forecolor_4'
		,clickedClass : 'ico_forecolor_3'
		,mouseoverClass : 'ico_forecolor_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'common'
		,setState : function(state,color){
			switch(state) {
				case SinaEditor.BUTTONSTATE.DISABLED :
					this.$.style.backgroundColor = '#000000';
					break;
				default :
					this.$.style.backgroundColor = color;
			}
		}
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.forecolor = btn;
	
    return {
        "events": [{
            "element": editor,
            "events": {
                'editorSelectionChange' : function(e,range,refNode) {
					var color = SinaEditor.range.queryCommandState(this.entyDoc,'forecolor');
					if(!color) {
						color = '#000000';
					}
					btn.setState(SinaEditor.BUTTONSTATE.NORMAL,color);
				}
            }
        },{
            "element": btn.$,
            "events": {
                'click' : function(e,range,refNode) {
					if(editor.btns.backcolor.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.panels.forecolor.show(this);
					return false;
				}
            }
        }]
    };
});