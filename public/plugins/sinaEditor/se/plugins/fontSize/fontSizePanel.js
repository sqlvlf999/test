
//字体的大小
SinaEditor.plugins.add('fontSizePanel',function(args){
	var editor = this;
    var btn = editor.btns.fontSize;

    var _fontSizeConf = args.conf || SinaEditor.TOOLCONF.FONTSIZECONF;
	
	var _createDomHTML = function(eid){
        var sizes = _fontSizeConf;
        var str = ['<div class="fontItemTitle">字号</div>'];
        var size, style,i;
        for (i = 0; sizes[i]; i++) {
            size = sizes[i].html;
            style = sizes[i].style || size;
            str.push('<div class="fontItem" style="font-size:');
            str.push(style);
            str.push('">');
            str.push(size);
            str.push('</div>');
        }
        return str.join('');
    };
    
    var _bindEvent = function(children){
		var i,cn;
        for (i = 0; children[i]; i++) {
            cn = children[i].className;
            if (cn && cn == 'fontItem') {
                children[i].onclick = function(e){
                    e = e || window.event;
                    var target = SinaEditor.ev.fixEvent(e).target;
                    var family = target.style.fontSize;
                    btn.$.innerHTML = '<span>' + target.innerHTML + '</span>';
                    editor.operation.setFontSize(family);
                    SinaEditor.btnBubble.hiddenBubble();
                    return false;
                };
            }
        }
    };
    
    return {
        "events": [{
            "element": editor,
            "events": {
                'editorSelectionChange': function(){
                    SinaEditor.btnBubble.hiddenBubble();
                }
				,'editorSelectionChange': function(e, range, refNode){
                    var style = SinaEditor.range.queryCommandState(this.entyDoc,'fontsize');
                    var family = _fontSizeConf;
                    console.log(style);
                    var html = '<span>' + SinaEditor.TOOLCONF.FONTSIZEDEF + '</span>';
                    var tmp,i;
                    for (i = 0; family[i]; i++) {
                        //tmp = family[i]['style'] || family[i]['html'];
						tmp = family[i].style || family[i].html;
                        if (style.indexOf(tmp) != -1) {
                            //html = '<span>' + family[i]['html'] + '</span>';
							html = '<span>' + family[i].html + '</span>';
                            break;
                        }
                        
                    }
                    btn.$.innerHTML = html;
                }
            }
        },{
            'element': btn.$,
            'events': {
                'click': function(){
                    if (editor.getState() != SinaEditor.STATE.EDITING) {
                        return;
                    }
                    var loc = SinaEditor.util.dom.getXY(btn.$);
                    var div = SinaEditor.util.dom.createDom('div');
                    div.innerHTML = _createDomHTML(editor.option.id);
                    _bindEvent(div.childNodes);
                    SinaEditor.btnBubble.showBubble(div, {
                        x: loc[0],
                        y: loc[1] + btn.$.offsetHeight + SinaEditor.util.dom.styleInteger(btn.$, 'paddingTop') + SinaEditor.util.dom.styleInteger(btn.$, 'marginTop'),
                        'className': 'se_fontfamily_bubble'
                    });
                    return false;
                }
            }
        }]
    };
});
