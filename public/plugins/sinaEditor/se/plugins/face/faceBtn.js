
//插入表情
SinaEditor.plugins.add('faceUIBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'表情'
		,normalClass : 'ico_face_1'
		,disabledClass : 'ico_face_4'
		,clickedClass : 'ico_face_3'
		,mouseoverClass : 'ico_face_2'
		,state : SinaEditor.BUTTONSTATE.NORMAL
		,group : 'richdata'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.faceUI = btn;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function(){
					var facePanel = editor.panels.faceUI;
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					var pos = SinaEditor.util.dom.getXY(btn.$);
					facePanel.setPosition({x:pos[0],y:(pos[1]+btn.$.offsetHeight)});
					facePanel.show();
				}
            }
        }]
    };
});