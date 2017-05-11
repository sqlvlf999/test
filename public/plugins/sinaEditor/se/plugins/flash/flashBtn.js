
//插入flash
SinaEditor.plugins.add('flashUIBtn',function(args){
    var editor = this;
	
	var btnConf = {
		title:'插入flash',
        normalClass: 'ico_video_1',
        disabledClass: 'ico_video_4',
        clickedClass: 'ico_video_3',
        mouseoverClass: 'ico_video_2',
        state: SinaEditor.BUTTONSTATE.DISABLED,
        group: 'richdata'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.flashUI = btn;
    
    return {
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.panels.flashUI.show();
					return false;
				}
            }
        }]
    };
});
