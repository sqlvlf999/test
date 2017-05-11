
//背景颜色的按钮
SinaEditor.plugins.add('backcolorBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'背景颜色',
		normalClass : 'ico_hilitecolor_1'
		,disabledClass : 'ico_hilitecolor_4'
		,clickedClass : 'ico_hilitecolor_3'
		,mouseoverClass : 'ico_hilitecolor_2'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'common'
		,setState : function(state,color){
			switch(state) {
				case SinaEditor.BUTTONSTATE.DISABLED : 
					this.$.style.backgroundColor = '#FFFFFF';
					break;
				default :
					this.$.style.backgroundColor = color;
			}
		}
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.backcolor = btn;
	
	return {
		"events": [{
            "element": btn.$,
            "events": {
                'click' : function() {
					if(editor.btns.backcolor.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.panels.backcolor.show(this);
					return false;
				}
            }
        },{
            "element": editor,
            "events": {
				'editorSelectionChange' : function(e,range,refNode) {
					var color = SinaEditor.range.queryCommandState(this.entyDoc,'backColor');
					if(color === 'transparent') {
						color = '#FFFFFF';
					}
					editor.btns.backcolor.setState(SinaEditor.BUTTONSTATE.NORMAL,color);
				}
            }
        }]
	};
});