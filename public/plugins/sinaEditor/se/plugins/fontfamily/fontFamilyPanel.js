
//字体选择
SinaEditor.plugins.add('fontFamilyPanel',function(args){
	var editor = this;
    var btn = editor.btns.fontFamily;
	var _fontConf = args.fontConf || SinaEditor.TOOLCONF.FONTFAMILYCONF;
    
    var _bindEvent = function(children){
		var i;
        for (i = 0; children[i]; i++) {
            var cn = children[i].className;
            if (cn && cn == 'fontItem') {
                children[i].onclick = function(e){
                    e = e || window.event;
                    var target = SinaEditor.ev.fixEvent(e).target;
                    var family = target.style.fontFamily;
                    btn.$.innerHTML = '<span style="font-family:' + family + '">' + target.innerHTML + '</span>';
                    editor.operation.setFontFamily(family);
                    SinaEditor.btnBubble.hiddenBubble();
                    return false;
                };
            }
        }
    };
    
    return {
		'events' : [{
            "element": editor,
            "events": {
                'editorSelectionChange': function(){
                    SinaEditor.btnBubble.hiddenBubble();
                }
            }
        }]
	}
});
