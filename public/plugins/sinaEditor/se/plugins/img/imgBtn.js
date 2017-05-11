
//上传图片
SinaEditor.plugins.add('imgUIBtn',function(args){
    var editor = this;

	var btnConf = {
		title:'插入图片',
        normalClass: 'ico_img_1',
        disabledClass: 'ico_img_4',
        clickedClass: 'ico_img_3',
        mouseoverClass: 'ico_img_2',
        state: SinaEditor.BUTTONSTATE.NORMAL,
        group: 'richdata'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.imgUI = btn;
    
    return {
		'events' : [{
			"element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.panels.imgUI.show();
					return false;
				}
            }
		}]
	};
});
