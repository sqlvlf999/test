
//插入链接的按钮
SinaEditor.plugins.add('linkBtn',function(args){
    var editor = this;
	var linkPanel = editor.panels.link;
	var hidden = linkPanel.nodes.hidden;
	
	var btnConf = {
		title:' 插入链接',
        normalClass: 'ico_link_1',
        disabledClass: 'ico_link_4',
        clickedClass: 'ico_link_3',
        mouseoverClass: 'ico_link_2',
        state: SinaEditor.BUTTONSTATE.DISABLED,
        group: 'richdata'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.link = btn;
	
	return {
		"events": [{
            "element": btn.$,
            "events": {
                'click' : function() {
					if(editor.btns.link.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					var range = SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
					var str = range.toString();
					if(SinaEditor.TOOLCONF.addLinkNow && SinaEditor.TOOLCONF.addLinkNow.test(str)) {
						editor.operation.link({'link':str,'range':range});
					} else {
						if(range.collapsed) {
							hidden.style.display = '';
						}
						linkPanel.show();
					}
                    return false;
				}
            }
        }]
	};
});
