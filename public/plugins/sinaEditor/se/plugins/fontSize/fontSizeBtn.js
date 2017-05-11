
//字体的大小
SinaEditor.plugins.add('fontSizeBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'文字大小',
        normalClass: 'ico_fontsize_1',
        properties: {
            'innerHTML': '<span>' + SinaEditor.TOOLCONF.FONTSIZEDEF + '</span>'
        },
        disabledClass: 'ico_fontsize_4',
        clickedClass: 'ico_fontsize_3',
        mouseoverClass: 'ico_fontsize_2',
        state: SinaEditor.BUTTONSTATE.NORMAL,
        group: 'common'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.fontSize = btn;
});
